import type { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../utils/response.ts";
import { redis } from "../utils/cache.ts";
import api from "../lib/api.ts";
import { getCourseByIdInternal } from "../utils/course.utils.ts";
import type { TransformedCourse } from "../types/api-responses/course.ts";
import { getUserId } from "../utils/auth.utils.ts";

class Cart {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await getUserId(req.token!);

      const courses = await redis.hgetall(`cart:${userId}`);

      const items = await Promise.all(
        Object.entries(courses).map(async ([courseId, value]) => {
          const { addedAt } = JSON.parse(value);

          const course: TransformedCourse = await getCourseByIdInternal(
            Number(courseId),
          );
          return {
            courseId: Number(courseId),
            course: {
              title: course.title,
              thumbnail: course.thumbnail,
              instructor: course.instructor.name,
              price: course.price,
              discountPrice: course.discountPrice,
            },
            addedAt,
          };
        }),
      );

      const subtotal: number =
        Math.round(
          items.reduce((sum, item) => sum + (item.course.price ?? 0), 0) * 100,
        ) / 100;

      const discount: number =
        Math.round(
          items.reduce(
            (sum, item) =>
              sum +
              ((item.course.price ?? 0) -
                (item.course.discountPrice ?? item.course.price ?? 0)),
            0,
          ) * 100,
        ) / 100;

      const total: number = Math.round((subtotal - discount) * 100) / 100;

      return successResponse(res, {
        items,
        summary: {
          itemCount: items.length,
          subtotal,
          discount,
          total,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await getUserId(req.token!);

      const { courseId } = req.body;
      if (!courseId) {
        return errorResponse(
          res,
          "COURSE_ID_REQUIRED",
          "Course ID is required in request body",
          400,
        );
      }

      const course = await getCourseByIdInternal(courseId);
      if (!course) {
        return errorResponse(
          res,
          "COURSE_NOT_FOUND",
          `Course with ID ${courseId} does not exist`,
          404,
        );
      }
      const enrollmentResponse = await api.get(
        `/enrollments/check/${courseId}`,
        { headers: { "x-user-id": userId } },
      );

      if (
        enrollmentResponse.data.success &&
        enrollmentResponse.data.data.isEnrolled
      ) {
        return errorResponse(
          res,
          "COURSE_ALREADY_ENROLLED",
          `You are already enrolled in course ${courseId}`,
          409,
        );
      }

      const alreadyInCart = await redis.hexists(`cart:${userId}`, courseId);
      if (alreadyInCart) {
        return errorResponse(
          res,
          "COURSE_ALREADY_IN_CART",
          `Course ${courseId} is already in your cart`,
          409,
        );
      }

      await redis.hset(
        `cart:${userId}`,
        courseId,
        JSON.stringify({ addedAt: new Date().toISOString() }),
      );

      return successResponse(res, {
        message: `Course ${courseId} successfully added into the cart`,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCourseFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await getUserId(req.token!);

      const { courseId } = req.params;
      if (!courseId) {
        return errorResponse(
          res,
          "COURSE_ID_REQUIRED",
          "Course ID is required in request params",
          400,
        );
      }

      const deleteResult: number = await redis.hdel(`cart:${userId}`, courseId);
      if (!deleteResult) {
        return errorResponse(
          res,
          "COURSE_NOT_IN_CART",
          `Course ${courseId} is not present in your cart`,
          404,
        );
      }

      return successResponse(res, {
        message: `Course ${courseId} successfully removed from the cart`,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await getUserId(req.token!);

      const deleted = await redis.del(`cart:${userId}`);
      if (!deleted) {
        return errorResponse(
          res,
          "CART_EMPTY",
          "Your cart is already empty",
          404,
        );
      }

      return successResponse(res, {
        message: "Your cart has been cleared successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new Cart();
