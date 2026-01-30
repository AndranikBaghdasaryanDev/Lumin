import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.response?.data) {
    const coreErrorResponse = err.response.data as ApiResponse<null>;
    
    if (coreErrorResponse.error) {
      return errorResponse(
        res,
        coreErrorResponse.error.code,
        coreErrorResponse.error.message,
        err.response?.status,
      );
    }
  }

  if (err.code && err.message) {
    return errorResponse(res, err.code, err.message, err?.statusCode);
  }

  return errorResponse(
    res,
    "INTERNAL_SERVER_ERROR",
    "Something went wrong",
    500,
  );
}
