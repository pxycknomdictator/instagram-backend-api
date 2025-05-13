import { createServer } from "node:http";
import { Server } from "socket.io";

import { app } from "./app.js";
import { database } from "./db/db.js";
import { cronJob } from "./helpers/cronJob.helper.js";
import { configs, ioCorsOption } from "./constant.js";

const PORT = +configs.PORT;
const server = createServer(app);
const io = new Server(server, ioCorsOption);

(async () => {
  await database();
  cronJob();
  server.listen(PORT, () => console.log(`SERVER: http://localhost:${PORT} 🖥️`));
})();
