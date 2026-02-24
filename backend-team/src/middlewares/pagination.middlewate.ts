import { ZodError, ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.ts";

export function paginationValidate<T extends ZodType<any, any, any>>(
  schema: T,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = schema.parse({
        query: req.query,
      });

      req.validated = req.validated || {};
      req.validated.query = {
        ...parsed.query,
      };
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return errorResponse(
          res,
          "VALIDATION_ERROR",
          err.issues.map((e) => e.message).join(", "),
          400,
        );
      }

      return errorResponse(res, "UNKNOWN_ERROR", "Something went wrong", 500);
    }
  };
}
