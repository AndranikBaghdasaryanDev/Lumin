import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import { categoryTransform } from "../utils/catergoryTransformer.ts";
import type { TransformedCategory } from "../types/api-responses/category.ts";
import { redis } from "../utils/cache.ts";
import logger from "../lib/logger.ts";
import env from "../config/env.ts";

class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const key = "categories";
      const cachedCategories = await redis.get(key);
      if (cachedCategories) {
        logger.info("Returning categories from cache");
        return successResponse(res, JSON.parse(cachedCategories));
      }

      const response = await api.get("/categories");

      if (!response.data.success) {
        return errorResponse(
          res,
          response.data.error?.code ?? "CATEGORIES_FETCH_FAILED",
          response.data.error?.message ?? "Failed to fetch categories",
        );
      }

      const transformedCategory: TransformedCategory =
        response.data.data.map(categoryTransform);

      await redis.set(key, JSON.stringify(transformedCategory), "EX", env.CATEGORIES_CACHE_TIME);
      return successResponse(res, transformedCategory);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
