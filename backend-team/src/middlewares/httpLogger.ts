import { pinoHttp } from "pino-http";
import logger from "../lib/logger.ts";

export const httpLogger = pinoHttp({ logger });
