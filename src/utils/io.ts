import type { Server as HTTPServer } from "node:http";
import { Server as SocketServer } from "socket.io";
import { ioCorsOption } from "../constant.js";
import { UserInfo } from "../types/token.types.js";
import { setUserOffline, setUserOnline } from "./status.js";
import { parseCookie, tokenDecoder } from "../helpers/token.helper.js";

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

    socket.on("send_private_message", (message: string, to: string) => {
      const receiver = users.get(to);
      const sender = socket.user.username;

      if (!receiver) return console.log(`⚠️  User ${to} is not online.`);

      io.to(receiver.socketId).emit("receive_private_message", {
        from: sender,
        message,
      });
    });

    socket.on("disconnect", async () => {
      users.delete(username);
      if (_id) await setUserOffline(_id);
    });
  });

  return io;
}
