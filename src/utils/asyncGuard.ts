import { Request, Response, NextFunction } from "express";
import { Fn } from "../types/types.js";

export const asyncGuard =
  (fn: Fn) => async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
