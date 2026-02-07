import type { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response.ts";
import api from "../lib/api.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { UserRegister } from "../types/api-responses/register.ts";
import type { UserLogout } from "../types/api-responses/logout.ts";
import type { CurrentUser } from "../types/api-responses/currentUser.ts";
import type { Login } from "../types/api-responses/login.ts";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.post<ApiResponse<UserRegister>>(
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
      const response = await api.post<ApiResponse<UserLogout>>("/auth/logout", {}, { 
        headers: { Authorization: `Bearer ${req.token}` }
       });

      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization
      const response = await api.get<ApiResponse<CurrentUser>>("/auth/me", authHeader ? { headers: { Authorization: authHeader } } : {});
      if (response.data.success) {
        return successResponse(res, response.data.data);
      } else {
        return errorResponse(
          res,
          response.data?.error?.code || "AUTH_FAILED",
          response.data?.error?.message || "Failed to fetch the current user",
          401
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body

      if(!refreshToken) {
        return errorResponse(
          res,
          "REFRESH_TOKEN_MISSING",
          "Refresh token is required"
        )
      }

      const response = await api.post<ApiResponse<{ accessToken: string, refreshToken: string }>>("/auth/refresh-token", { refreshToken })
      if(!response.data.success) {
        return errorResponse(
          res,
          response.data.error?.code ?? "REFRESH_FAILED",
          response.data.error?.message ?? "Failed to refresh token",
          401
        )
      }

      return successResponse(res, response.data.data)
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      if(!email || !password) {
        return errorResponse(
          res,
          "MISSING_CREDENTIALS",
          "Email and Password is required"
        )
      }

      console.log("Login failed:", email, password);
      const response = await api.post<ApiResponse<Login>>('/auth/login', { email, password })
      if(!response.data.success) {
        return errorResponse(
          res,
          response.data.error?.code ?? "LOGIN_FAILED",
          response.data.error?.message ?? "Invalid email or login"
        )
      }

      return successResponse(res, response.data.data)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController();
