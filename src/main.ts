import { createServer } from "node:http";

import { app } from "./app.js";
import { database } from "./db/db.js";
import { configs } from "./constant.js";
import { cronJob } from "./helpers/cronJob.helper.js";

(async () => {
  await database();
  cronJob();

  const PORT = +configs.PORT;
  const server = createServer(app);
  server.listen(PORT, () => console.log(`SERVER: http://localhost:${PORT} 🖥️`));
})();
