import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import controller from "../controllers/course.ts";
import { queryValidate } from "../middlewares/queryValidation.middlewate.ts";
import { querySchema } from "../schemas/query.ts";

const courseRouter = Router();

courseRouter.get("/:id", auth, controller.getCourseById);
courseRouter.get(
  "/:courseId/lessons/:lessonId",
  auth,
  controller.getLessonById,
);

courseRouter.get(
  "/",
  auth,
  queryValidate(querySchema),
  controller.getAllCourses,
);

export default courseRouter;
