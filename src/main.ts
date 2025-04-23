import { createServer } from "node:http";

import { app } from "./app.js";
import { configs } from "./constant.js";
import { database } from "./db/db.js";

(async () => {
  await database();
  const PORT = +configs.PORT;
  const server = createServer(app);
  server.listen(PORT, () => console.log(`SERVER: http://localhost:${PORT} 🖥️`));
})();
