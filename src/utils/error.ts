import { Request, Response, NextFunction } from "express";
import { configs, HTTP_STATUS } from "../constant.js";
import { ApiRes } from "./response.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = error.message || "Something went wrong";
  const statusCode = HTTP_STATUS.internal_server_error;
  const stack = configs.NODE_ENV !== "production" ? error.stack : null;

  res.status(statusCode).json(new ApiRes(statusCode, message, stack));
};
