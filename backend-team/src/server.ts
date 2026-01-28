import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.ts";
import logger from "./lib/logger.ts";

const PORT = process.env.PORT || 3000;

function start() {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

start();
