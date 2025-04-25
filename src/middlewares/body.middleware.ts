import { Request, Response, NextFunction } from "express";
import { ApiRes } from "../utils/response.js";
import { validateRegisterBody } from "../helpers/auth.helper.js";

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const [success, user] = validateRegisterBody(req.body);

  if (!success) {
    res.status(400).json(new ApiRes(400, "Fields required", user));
    return;
  }

  next();
}
