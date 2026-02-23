import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import controller from "../controllers/course.ts";
import { paginationValidate } from "../middlewares/pagination.middlewate.ts";
import { paginationSchema } from "../schemas/pagination.ts";

const courseRouter = Router();

courseRouter.get("/:id", auth, controller.getCourseById);
courseRouter.get(
  "/:courseId/lessons/:lessonId",
  auth,
  controller.getLessonById,
);

export default courseRouter;
