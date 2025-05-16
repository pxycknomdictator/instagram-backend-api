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

const templateLocation = path.resolve(__dirname, "..", "views");
const staticFileLocation = path.resolve(__dirname, "..", "public");
const tempFileLocation = path.resolve(__dirname, "..", "public", "temp");
const emailLocation = path.resolve(
  __dirname,
  "..",
  "emails",
  "reset-password.mjml",
);
const verifyEmailLocation = path.resolve(
  __dirname,
  "..",
  "emails",
  "verify-email.mjml",
);

app.set("view engine", "ejs");
app.set("views", templateLocation);

app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(staticFileLocation));
app.use(express.json({ limit: jsonLimit }));
app.use(express.urlencoded({ limit: jsonLimit, extended: true }));

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import likeRouter from "./routes/like.routes.js";
import storyRouter from "./routes/story.routes.js";
import healthRouter from "./routes/health.routes.js";
import commentRouter from "./routes/comment.routes.js";
import messageRouter from "./routes/message.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stories", storyRouter);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/comments", commentRouter);

app.use(errorHandler);

export { app, tempFileLocation, emailLocation, verifyEmailLocation };
