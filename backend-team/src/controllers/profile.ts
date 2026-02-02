import type { NextFunction, Request, Response } from "express";
import api from "../lib/api.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { UserProfile } from "../types/api-responses/profile.ts";
import { errorResponse, successResponse } from "../utils/response.ts";

class ProfileController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.get<ApiResponse<UserProfile>>("/profile", {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      });
      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
      return errorResponse(
        res,
        response.data.error?.code??"GET_PROFILE_FAILED",
        response.data.error?.message??"Failed to get profile",
      )
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
