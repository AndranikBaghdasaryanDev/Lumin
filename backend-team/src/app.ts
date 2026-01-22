import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./middlewares/httpLogger";
import healthRoute from "./health/health.route";

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
app.use('/api', healthRoute)