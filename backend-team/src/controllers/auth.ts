import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.ts";
import api from "../lib/api.ts";
import type { ApiError, ApiResponse } from "../types/api-responses/api.ts";
import type { userRegister } from "../types/api-responses/register.ts";
import type { userLogout } from "../types/api-responses/logout.ts";
import type { currentUser } from "../types/api-responses/currentUser.ts";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.post<ApiResponse<userRegister>>(
        "/auth/register",
        req.body,
      );

      if (response.data.success) {
        return successResponse(res, response.data.data, 201);
      }
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.post<ApiResponse<userLogout>>("/auth/logout");

      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.get<ApiResponse<currentUser>>("/internal/auth/me");
      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController();
