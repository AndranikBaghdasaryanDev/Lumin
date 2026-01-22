import type { Request, Response } from "express"
import { checkCoreBackend } from "./health.service"
import { successResponse } from "../utils/response"

export async function healthCheck(req: Request, res: Response) {
    const isConnected = await checkCoreBackend()

    return successResponse(res, {
        status: "ok",
        timestamp: new Date().toISOString(),
        coreBackend: isConnected ? "connected" : "disconnected"
    })
}