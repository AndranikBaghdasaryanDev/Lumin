import type { Request, Response } from "express";
import { checkCoreBackend } from "./health.service.ts";
import { successResponse } from "../utils/response.ts";
import logger from "../lib/logger.ts";

export async function healthCheck(req: Request, res: Response) {
  let startTime = Date.now();
  logger.info(
    {
      method: req.method,
      url: req.url,
      headers: req.headers,
    },
    "Outgoing Core Backend request",
  );
  const isConnected = await checkCoreBackend();
  logger.info(
    {
      method: req.method,
      url: req.url,
      status: 200,
      responseTime: Date.now() - startTime,
    },
    "Core Backend response",
  );
  return successResponse(res, {
    status: "ok",
    timestamp: new Date().toISOString(),
    coreBackend: isConnected ? "connected" : "disconnected",
  });
}