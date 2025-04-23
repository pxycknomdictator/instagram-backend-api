import url from "node:url";
import path from "node:path";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import { corsOptions, jsonLimit } from "./constant.js";
import { errorHandler } from "./utils/error.js";

const app = express();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __static_location = path.resolve(__dirname, "..", "public");

app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(__static_location));
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ limit: jsonLimit, extended: true }));

app.use(errorHandler);

export { app };
