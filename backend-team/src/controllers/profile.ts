import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { profile } from "../types/api-responses/profile.ts";

class ProfileController {
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.put<ApiResponse<profile>>(
        "/api/internal/profile",
        req.body,
      );
      if (response.data.success) {
        return successResponse(res, response.data.data, 200);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
