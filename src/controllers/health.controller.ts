import { Request, Response } from "express";
import { ApiRes } from "../utils/response.js";
import { asyncGuard } from "../utils/asyncGuard.js";

export const healthCheck = asyncGuard(async (_: Request, res: Response) => {
  return res.status(200).json(new ApiRes(200, "Server is Running..."));
});
