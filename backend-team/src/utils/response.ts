import type { ApiError, ApiResponse } from "../types/api-responses/api.ts";
import type { Response } from "express";

export function successResponse<T>(
  res: Response,
  data: T,
  statusCode = 200
): Response<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  return res.status(statusCode).send(response);
}

export function errorResponse(
  res: Response,
  code: string,
  message: string,
  statusCode = 400
): Response<ApiResponse<null>> {
  const error: ApiError = {
    code,
    message,
  };

  const response: ApiResponse<null> = {
    success: false,
    error,
  };

  return res.status(statusCode).send(response);
}
