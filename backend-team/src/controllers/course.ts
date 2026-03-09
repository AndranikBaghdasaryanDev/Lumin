import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { transformCourse } from "../utils/courseTransformar.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { Lesson } from "../types/api-responses/lesson.ts";
import type { CoursesCoreQuery } from "../types/query/listCoursesQuery.ts";
import type { Course } from "../types/api-responses/course.ts";
import { redis } from "../utils/cache.ts";
import logger from "../lib/logger.ts";
import env from "../config/env.ts";
class CourseController {
  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorResponse(
          res,
          "COURSE_ID_REQUIRED",
          "Course id is required",
          400,
        );
      }

      const key = `course:${id}`;
      const cachedCourse = await redis.get(key);
      if (cachedCourse) {
        logger.info("Returning course from cache");
        return successResponse(res, JSON.parse(cachedCourse));
      }

      const response = await api.get(`/courses/${id}`);

      const course = response.data.data;
      const transformedCourse = transformCourse(course);

      await redis.set(
        key,
        JSON.stringify(transformedCourse),
        "EX",
        env.COURESES_CACHE_TIME,
      );

      return successResponse(res, transformedCourse);
    } catch (error) {
      return errorResponse(
        res,
        "COURSE_FETCH_FAILED",
        "Failed to fetch course",
        500,
      );
    }
  }

  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId, lessonId } = req.params;
      if (!lessonId) {
        return errorResponse(res, "LESSON_ID_REQUIRED", "Lesson id required");
      }

      const response = await api.get<ApiResponse<Lesson>>(
        `/lessons/${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        },
      );

      if (response.data.success) {
        return successResponse(res, response.data.data);
      } else {
        return errorResponse(
          res,
          "ENROLLMENT_REQUIRED",
          "Enrollment required",
          403,
        );
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, categoryId, level, search, sort, isFree } =
        req.validated?.query;

      const coreQuery: CoursesCoreQuery = {
        page,
        limit,
        ...(categoryId !== undefined && { categoryId }),
        ...(level !== undefined && { level }),
        ...(search !== undefined && { search }),
        ...(sort !== undefined && { sort }),
        ...(isFree !== undefined && { isFree }),
      };

      const key = JSON.stringify(coreQuery);
      logger.info(key);

      const cached = await redis.get(key);
      if (cached) {
        logger.info("Returning courses from cache");
        return successResponse(res, JSON.parse(cached));
      }

      const response = await api.get("/courses", {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
        params: coreQuery,
      });

      if (!response.data.success) {
        return errorResponse(
          res,
          response.data.error?.code ?? "CORE_BACKEND_ERROR",
          response.data.error?.message ??
            "An error occurred while fetching courses from Core Backend",
          400,
        );
      }

      const dataToCache = response.data.data;

      await redis.set(
        key,
        JSON.stringify(dataToCache),
        "EX",
        env.COURESES_CACHE_TIME,
      );

      return successResponse(res, dataToCache);
    } catch (err) {
      next(err);
    }
  }
  async getRelatedCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return errorResponse(
          res,
          "COURSE_ID_REQUIRED",
          "Course id is required",
          400,
        );
      }

      const key = `course:${id}/related`;
      const cachedRelatedCourses = await redis.get(key);
      if (cachedRelatedCourses) {
        logger.info("Returning courses from cache");
        return successResponse(res, JSON.parse(cachedRelatedCourses));
      }

      let course: Course | null = null;

      const cached = await redis.get(`course:${id}`);
      if (cached) {
        logger.info("Course found in cache");
        course = JSON.parse(cached) as Course;
      } else {
        const courseInfo = await api.get<ApiResponse<Course>>(`/courses/${id}`);

        if (!courseInfo.data.success || !courseInfo.data.data) {
          return errorResponse(
            res,
            courseInfo.data.error?.code ?? "COURSE_FETCH_FAILED",
            courseInfo.data.error?.message ?? "Failed to fetch course",
            400,
          );
        }

        course = courseInfo.data.data;

        await redis.set(
          `course:${id}`,
          JSON.stringify(course),
          "EX",
          env.COURESES_CACHE_TIME,
        );
      }
      if (!course) {
        return errorResponse(res, "COURSE_NOT_FOUND", "Course not found", 404);
      }

      const categories = course.categories;
      if (!categories || categories.length === 0) {
        return errorResponse(
          res,
          "COURSE_CATEGORY_NOT_FOUND",
          "Course has no categories",
          400,
        );
      }

      const categoryId = categories[0]?.id;

      const coursesResponse = await api.get<ApiResponse<{ courses: Course[] }>>(
        `/courses?categoryId=${categoryId}&limit=6`,
      );

      if (!coursesResponse.data.success || !coursesResponse.data.data) {
        return errorResponse(
          res,
          coursesResponse.data.error?.code ?? "RELATED_COURSES_FETCH_FAILED",
          coursesResponse.data.error?.message ??
            "Failed to fetch related courses",
          400,
        );
      }

      const filteredCourses = coursesResponse.data.data.courses.filter(
        (c: Course) => c.id !== Number(id),
      );

      await redis.set(
        key,
        JSON.stringify(filteredCourses),
        "EX",
        env.COURESES_CACHE_TIME,
      );

      return successResponse(res, filteredCourses);
    } catch (err) {
      next(err);
    }
  }
}

export default new CourseController();
