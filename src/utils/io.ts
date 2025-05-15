import { Server as HTTPServer } from "node:http";
import { Server as SocketServer } from "socket.io";
import { ioCorsOption } from "../constant.js";
import { UserInfo } from "../types/token.types.js";
import { setUserOffline, setUserOnline } from "./status.js";
import { parseCookie, tokenDecoder } from "../helpers/token.helper.js";
import { sendMessage } from "../controllers/message.controller.js";
import { Message } from "../models/message.model.js";

const users = new Map<string, { socketId: string; _id: string }>();

export function IO(server: HTTPServer): SocketServer {
  const io = new SocketServer(server, ioCorsOption);

  io.use((socket, next) => {
    let token: string | undefined;
    const cookieHeader = socket.handshake.headers.cookie;
    const authHeader = socket.handshake.headers.authorization;

    if (cookieHeader) {
      const parsedCookies = parseCookie(cookieHeader);
      token = parsedCookies.token;
    }

    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
    }

    if (!token) {
      console.error("❌ Token not found in cookie or header.");
      return next(new Error("Authentication failed. Token missing."));
    }

    try {
      const user = tokenDecoder(token) as UserInfo;
      socket.user = user;
      next();
    } catch (err) {
      console.error("❌ Invalid token.");
      return next(new Error("Authentication failed. Invalid token."));
    }
  });

  io.on("connection", async (socket) => {
    const socketId = socket.id;
    const { username, _id } = socket.user;

    if (users.has(username)) {
      const oldSocketId = users.get(username)!.socketId;
      io.sockets.sockets.get(oldSocketId)?.disconnect(true);
    }

    users.set(username, { socketId, _id });
    if (_id) await setUserOnline(_id);

    const pendingMessages = await Message.find({
      receiver: _id,
      delivered: false,
    });

    if (pendingMessages.length > 0) {
      pendingMessages.forEach((msg) => {
        io.to(socketId).emit("receive_private_message", {
          from: msg.sender,
          message: msg.message,
        });

        msg.delivered = true;
      });
      await Promise.all(pendingMessages.map((msg) => msg.save()));
    }

    socket.on("send_private_message", async (message: string, to: string) => {
      const sender = socket.user.username;
      const msg = await sendMessage(message, sender, to);

      const receiver = users.get(to);
      if (!receiver) {
        return console.log(`📦 Message saved. but User ${to} is offline.`);
      }

      io.to(receiver.socketId).emit("receive_private_message", {
        from: sender,
        message,
      });

      msg.delivered = true;
      await msg.save();
    });

    socket.on("disconnect", async () => {
      users.delete(username);
      if (_id) await setUserOffline(_id);
    });
  });

  return io;
}
