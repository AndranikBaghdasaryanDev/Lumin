import Axios from "../lib/api.ts";
import logger from "../lib/logger.ts";

export async function checkCoreBackend(): Promise<boolean> {
  try {
    await Axios.get("/api/health");
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