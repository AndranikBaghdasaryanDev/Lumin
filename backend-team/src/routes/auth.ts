import express from "express";
import controller from "../controllers/auth.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { registerSchema } from "../schemas/auth.ts";
import { auth } from "../middlewares/auth.middleware.ts";

const authRouter = express.Router();

authRouter.post(
  "/auth/register",
  validate(registerSchema),
  controller.register,
);

authRouter.post("/auth/logout",auth, controller.logout);
authRouter.get('/auth/me', auth, controller.getCurrentUser)
authRouter.post("/auth/refresh", controller.refreshToken)

export default authRouter;
