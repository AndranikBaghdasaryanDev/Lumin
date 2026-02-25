import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { transformCourse } from "../utils/courseTransformar.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { Lesson } from "../types/api-responses/lesson.ts";
import type { CoursesCoreQuery } from "../types/query/listCoursesQuery.ts";
import type { Category, Course } from "../types/api-responses/course.ts";

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

      const response = await api.get(`/courses/${id}`);

      const course = response.data.data;
      const transformedCourse = transformCourse(course);

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
        return successResponse(res, response);
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
    const response = await api.get("/courses", {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
      params: coreQuery,
    });

    if (response.data.success) {
      if (response.data.data.courses.length === 0) {
        return successResponse(res, response.data.data);
      }

      return successResponse(res, response.data.data);
    } else {
      errorResponse(
        res,
        response.data.error?.code ?? "CORE_BACKEND_ERROR",
        response.data.error?.message ??
          "An error occurred while fetching courses from Core Backend",
        400,
      );
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

      const courseInfo = await api.get<ApiResponse<Course>>(`/courses/${id}`);

      if (!courseInfo.data.success) {
        return errorResponse(
          res,
          courseInfo.data.error?.code ?? "COURSE_FETCH_FAILED",
          courseInfo.data.error?.message ?? "Failed to fetch course",
        );
      }

      const categories = courseInfo.data.data?.categories;

      if (!categories || categories.length === 0) {
        return errorResponse(
          res,
          "COURSE_CATEGORY_NOT_FOUND",
          "Course has no categories",
          400,
        );
      }

      const categoryId = categories[0]?.id;

      const coursesResponse = await api.get(
        `/courses?categoryId=${categoryId}&limit=6`,
      );

      if (!coursesResponse.data.success || !coursesResponse.data.data) {
        return errorResponse(
          res,
          coursesResponse.data.error?.code ?? "RELATED_COURSES_FETCH_FAILED",
          coursesResponse.data.error?.message ??
            "Failed to fetch related courses",
        );
      }
      const filteredCourse = coursesResponse.data.data.courses.filter(
        (course: Course) => course.id !== Number(id),
      );

      return successResponse(res, filteredCourse);
    } catch (err) {
      next(err);
    }
  }
}

export default new CourseController();
