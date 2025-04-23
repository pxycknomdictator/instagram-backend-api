import { Request, Response } from "express";
import { ApiRes } from "../utils/response.js";

export async function healthCheck(_: Request, res: Response) {
  res.status(200).json(new ApiRes(200, "Server is Running..."));
}
