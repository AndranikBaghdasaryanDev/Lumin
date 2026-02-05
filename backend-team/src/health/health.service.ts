import Axios from "../lib/api.ts";
import logger from "../lib/logger.ts";
import axios from "axios";
import env from "../config/env.ts";

export async function checkCoreBackend(): Promise<boolean> {
  try {
    const url = env.CORE_BACKEND_URL.split("/api/internal")[0];
    await axios.get(`${url}/health`);
    return true;
  } catch (error) {
    logger.error(
      {
        err: error,
      },
      "Failed to check core-backend health",
    );
    return false;
  }
}
