import express from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import controller from "../controllers/profile.ts";

const profileRouter = express.Router();

profileRouter.get("/profile", auth, controller.get);

export default profileRouter;
