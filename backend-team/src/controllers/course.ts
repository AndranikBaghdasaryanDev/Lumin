import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { transformCourse } from "../utils/courseTransformar.ts";
import { errorResponse, successResponse } from "../utils/response.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";
import type { Lesson } from "../types/api-responses/lesson.ts";

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
      const authHeader = {
        authorization: `${req.headers.authorization}`,
      };

      const response = await api.get<ApiResponse<Lesson>>(
        `/lessons/${lessonId}`,
        {
          headers: authHeader,
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
}

export default new CourseController();
