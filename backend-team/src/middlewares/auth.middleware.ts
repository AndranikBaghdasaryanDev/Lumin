import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.ts";
import { errorResponse } from "../utils/response.ts";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return errorResponse(
      res,
      "INVALID_OR_MISSING_TOKEN",
      "Token is missing",
      401,
    );
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return errorResponse(
      res,
      "INVALID_OR_MISSING_TOKEN",
      "Token is missing",
      401,
    );
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload === "string") {
      return errorResponse(
        res,
        "INVALID_OR_MISSING_TOKEN",
        "Token is missing",
        401,
      );
    }

    req.user = payload;
    next();
  } catch {
    return errorResponse(
      res,
      "INVALID_TOKEN",
      "Invlalid token",
      401
    )
  }
}
