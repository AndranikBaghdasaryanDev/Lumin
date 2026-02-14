import type { Request, Response, NextFunction } from "express";
import api from "../lib/api.ts";
import { transformCourse } from "../utils/courseTransformar.ts";
import { errorResponse, successResponse } from "../utils/response.ts";

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
}

export default new CourseController();
