import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { configs } from "../constant.js";
import { ApiRes } from "../utils/response.js";
import { UserInfo } from "../types/token.types.js";

export async function validateAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ticket = req.cookies?.access_token || req.headers?.authorization;

  if (!ticket) {
    res.status(401).json(new ApiRes(401, "Unauthorized User"));
    return;
  }
  const token = ticket.replace("Bearer ", "");
  let user: UserInfo;

  try {
    user = jwt.verify(token, configs.JWT_ACCESS_TOKEN_SECRET_KEY!) as UserInfo;
  } catch (error) {
    res.status(401).json(new ApiRes(401, "Token is Expired"));
    return;
  }

  if (Object.keys(user).length <= 0) {
    res.status(401).json(new ApiRes(401, "Token is Expired"));
    return;
  }

  req.user = user;

  next();
}
