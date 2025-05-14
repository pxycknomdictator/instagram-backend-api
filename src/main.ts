import { createServer } from "node:http";
import { Server } from "socket.io";

import { app } from "./app.js";
import { database } from "./db/db.js";
import { UserInfo } from "./types/token.types.js";
import { cronJob } from "./helpers/cronJob.helper.js";
import { configs, ioCorsOption } from "./constant.js";
import { parseCookie, tokenDecoder } from "./helpers/token.helper.js";

const PORT = +configs.PORT;
const server = createServer(app);
const io = new Server(server, ioCorsOption);

io.use((socket, next) => {
  let token;
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

  const user = tokenDecoder(token) as UserInfo;
  socket.user = user;

  next();
});

const users = new Map();

io.on("connection", (socket) => {
  const socketId = socket.id;
  const user = socket.user.username;
  users.set(user, socketId);
  console.log(`${user} connected`);

  socket.on("disconnect", (reason) => {
    users.delete(user);
    console.log(`${user} is disconnected: ${reason}`);
  });
});

(async () => {
  await database();
  cronJob();
  server.listen(PORT, () => console.log(`SERVER: http://localhost:${PORT} 🖥️`));
})();
