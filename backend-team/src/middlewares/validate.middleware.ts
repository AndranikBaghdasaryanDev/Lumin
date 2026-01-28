import { type AnyZodObject, ZodError } from "zod/v3";
import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.ts";

export function validate(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return errorResponse(
          res,
          "VALIDATION_ERROR",
          err.errors.map((e) => e.message).join(", "),
          400,
        );
      }

      return errorResponse(res, "UNKNOWN_ERROR", "Something went wrong", 500);
    }
  };
}
