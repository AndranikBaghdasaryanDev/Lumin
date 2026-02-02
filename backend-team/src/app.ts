import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./middlewares/httpLogger.ts";
import healthRoute from "./health/health.route.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import authRouter from "./routes/auth.ts";
import profileRouter from "./routes/profile.ts";

export const app = express();
app.use(httpLogger);
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", healthRoute);
app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use(errorHandler);
