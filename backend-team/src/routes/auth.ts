import express from "express";
import controller from "../controllers/auth.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { registerSchema } from "../schemas/auth.ts";

const authRouter = express.Router();

authRouter.post(
  "/auth/register",
  validate(registerSchema),
  controller.register,
);

export default authRouter;
