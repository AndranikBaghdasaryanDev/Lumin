import express from "express";
import { validate } from "../middlewares/validate.middleware.ts";
import controller from "../controllers/profile.ts";
import { profileSchema } from "../schemas/auth.ts";
import { auth } from "../middlewares/auth.middleware.ts";

const profileRouter = express.Router();

profileRouter.put(
  "/profile",
  auth,
  validate(profileSchema),
  controller.updateProfile,
);

export default profileRouter;
