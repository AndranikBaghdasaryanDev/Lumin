import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.ts";
import { setAuthToken } from "../lib/api.ts";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    throw {
      code: "INVALID_OR_MISSING_TOKEN",
      message: "Unauthorized",
      statusCode: 401,
    };
  }

  const [type, token] = authHeader.split(" ");
  
  if (type !== "Bearer" || !token) {
    throw {
      code: "INVALID_OR_MISSING_TOKEN",
      message: "Unauthorized",
      statusCode: 401,
    };
  }
  setAuthToken(token);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload === "string") {
      throw {
        code: "INVALID_OR_MISSING_TOKEN",
        message: "Unauthorized",
        statusCode: 401,
      };
    }

    req.user = payload;
    next();

  } catch {
    throw {
      code: "INVALID_OR_MISSING_TOKEN",
      message: "Unauthorized",
      statusCode: 401,
    };
  }
}
