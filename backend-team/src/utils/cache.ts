import { Redis } from "ioredis";
import logger from "../lib/logger.ts";

export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (err: any) => {
  logger.error("Redis error", err);
});
