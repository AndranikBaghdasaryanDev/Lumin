import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { Profile } from "../types/api-responses/profile.ts";

class ProfileController {
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = {
        authorization: `${req.headers.authorization}`,
      };

      const response = await api.patch<ApiResponse<Profile>>(
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
