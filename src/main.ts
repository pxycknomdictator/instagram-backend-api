import { createServer } from "node:http";

import { app } from "./app.js";
import { IO } from "./utils/io.js";
import { database } from "./db/db.js";
import { configs } from "./constant.js";
import { cronJob } from "./helpers/cronJob.helper.js";

const PORT = +configs.PORT;
const server = createServer(app);
IO(server);

(async () => {
  await database();
  cronJob();

  server.listen(PORT, () => console.log(`SERVER: http://localhost:${PORT} 🖥️`));
})();
