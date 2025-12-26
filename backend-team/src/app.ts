import express from "express";
import cors from "cors";
import helmet from "helmet";

export const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
