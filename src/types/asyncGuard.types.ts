import { Request, Response, NextFunction } from "express";

type Fn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response | void>;

export { Fn };
