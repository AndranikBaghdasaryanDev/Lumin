import express from "express";
import controller from "../controllers/cart.ts";
import { auth } from "../middlewares/auth.middleware.ts";
const cartRouter = express.Router();

cartRouter.get("", auth, controller.getCart);
cartRouter.post("", auth, controller.addToCart);
cartRouter.delete("", auth, controller.deleteCart);
cartRouter.delete("/:courseId", auth, controller.deleteCourseFromCart);

export default cartRouter;
