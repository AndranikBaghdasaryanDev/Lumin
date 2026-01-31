import type { NextFunction, Request, Response } from "express";
import api from "../lib/api.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { userProfile } from "../types/api-responses/profile.ts";
import { successResponse } from "../utils/response.ts";

class ProfileController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.get<ApiResponse<userProfile>>("/profile");
      if (response.data.success) {
        return successResponse(res, response.data.data);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
