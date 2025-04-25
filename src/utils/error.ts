import { Request, Response, NextFunction } from "express";
import { ApiRes } from "./response.js";
import { configs } from "../constant.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = error.message || "Something went wrong";
  const statusCode = 5000;
  const stack = configs.NODE_ENV !== "production" ? error.stack : null;

  res.status(statusCode).json(new ApiRes(statusCode, message, stack));
};
