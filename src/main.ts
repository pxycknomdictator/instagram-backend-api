import { createServer } from "node:http";

import { app } from "./app.js";
import { database } from "./db/db.js";
import { configs } from "./constant.js";
import { Logger } from "./utils/logger.js";
import { cronJob } from "./helpers/cronJob.helper.js";

(async () => {
  await database();
  cronJob();

  const PORT = +configs.PORT;
  const server = createServer(app);
  server.listen(PORT, () =>
    Logger.magenta(`SERVER: http://localhost:${PORT} 🖥️`),
  );
})();
