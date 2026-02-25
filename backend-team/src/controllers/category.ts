import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import { categoryTransform } from "../utils/catergoryTransformer.ts";
import type { TransformedCategory } from "../types/api-responses/category.ts";

class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await api.get("/categories");

      if (!response.data.success) {
        return errorResponse(
          res,
          response.data.error?.code ?? "CATEGORIES_FETCH_FAILED",
          response.data.error?.message ?? "Failed to fetch categories",
        );
      }

      const transformed : TransformedCategory= response.data.data.map(categoryTransform);

      return successResponse(res, transformed);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
