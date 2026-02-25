import express from "express";
import api from "../lib/api.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import controller from "../controllers/category.ts";

const categoryRouter = express.Router();

categoryRouter.get("/", auth, controller.getAllCategories);

export default categoryRouter;
