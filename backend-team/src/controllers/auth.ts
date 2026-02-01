import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.ts";
import api from "../lib/api.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { userRegister } from "../types/api-responses/register.ts";
import type { userLogout } from "../types/api-responses/logout.ts";

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
}

export default new AuthController();
