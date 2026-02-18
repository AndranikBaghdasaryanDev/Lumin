import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import controller from "../controllers/course.ts";

const courseRouter = Router();

courseRouter.get("/:id", auth, controller.getCourseById);
courseRouter.get(
  "/:courseId/lessons/:lessonId",
  auth,
  controller.getLessonById,
);

export default courseRouter;
