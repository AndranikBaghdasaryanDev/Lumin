import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { UserProfile } from "../types/api-responses/profile.ts";

class ProfileController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.get<ApiResponse<UserProfile>>("/profile", {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      });
      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
      return errorResponse(
        res,
        response.data.error?.code ?? "GET_PROFILE_FAILED",
        response.data.error?.message ?? "Failed to get profile",
      );
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = {
        authorization: `${req.headers.authorization}`,
      };

      const response = await api.patch<ApiResponse<UserProfile>>(
        "/profile",
        req.body,
        { headers: authHeader },
      );
      if (response.data.success) {
        return successResponse(res, response.data.data, 200);
      } else {
        return errorResponse(
          res,
          response.data.error?.code ?? "PROFILE_UPDATE_FAILED",
          response.data.error?.message ?? "Failed to update profile",
        );
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
