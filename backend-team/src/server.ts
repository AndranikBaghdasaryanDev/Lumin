import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.ts";
import logger from "./lib/logger.ts";
import { setupGracefulShutdown } from "./lib/graceful-Shutdown.ts";

const PORT = process.env.PORT || 3000;

function start() {
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });

  setupGracefulShutdown(server);
}

start();
