import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

import { tempFileLocation } from "../app.js";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, tempFileLocation);
  },
  filename: function (_, file, cb) {
    const fileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
