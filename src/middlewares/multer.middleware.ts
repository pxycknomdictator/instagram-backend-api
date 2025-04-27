import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

import { __static_location } from "../app.js";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, __static_location);
  },
  filename: function (_, file, cb) {
    const fileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
