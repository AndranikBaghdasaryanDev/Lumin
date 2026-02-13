import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./middlewares/httpLogger.ts";
import healthRoute from "./health/health.route.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import authRouter from "./routes/auth.ts";
import profileRouter from "./routes/profile.ts";
import { swaggerSpec, swaggerUiOptions } from "./config/swagger.ts";
import swaggerUi from "swagger-ui-express";
import courseRouter from "./routes/courses.ts";

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

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API Routes
app.use("/api", healthRoute);
app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api/courses", courseRouter);
app.use(errorHandler);
