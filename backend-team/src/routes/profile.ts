import express from "express";
import { validate } from "../middlewares/validate.middleware.ts";
import controller from "../controllers/profile.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { profileSchema } from "../schemas/profile.ts";

const profileRouter = express.Router();

profileRouter.patch(
  "/profile",
  auth,
  validate(profileSchema),
  controller.updateProfile,
);

export default profileRouter;
