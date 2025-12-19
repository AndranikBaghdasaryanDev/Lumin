import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_PORT,
    credentials: true,
  })
);
