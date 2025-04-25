import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiRes } from "../utils/response.js";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.body);

    if (!success) {
      const object = error.formErrors.fieldErrors;

      const response = Object.entries(object).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          acc[key] = value?.[0] || "Invalid input";
          return acc;
        },
        {},
      );

      res.status(400).json(new ApiRes(400, "Fields Error", response));
      return;
    }

    next();
  };
}
