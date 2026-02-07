import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.ts";
import logger from "./lib/logger.ts";
import { setupGracefulShutdown } from "./lib/graceful-Shutdown.ts";

const PORT = process.env.PORT || 4000;

function start() {
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`📚 Swagger Documentation: http://localhost:${PORT}/api-docs`);
    logger.info(`🔧 API JSON Spec: http://localhost:${PORT}/api-docs.json`);
    
    // Open Swagger in browser
    // import('open').then(open => {
    //   open.default(`http://localhost:${PORT}/api-docs`);
    // }).catch(() => {
    //   logger.info('Could not open browser automatically. Please open the URL manually.');
    // });
  });

  setupGracefulShutdown(server);
}

start();
