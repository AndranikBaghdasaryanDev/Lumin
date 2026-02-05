import axios, { type InternalAxiosRequestConfig } from "axios";
import logger from "./logger.ts";
import env from "../config/env.ts";

const api = axios.create({
  baseURL: `${env.CORE_BACKEND_URL}`,
  headers: {
    "x-api-key": env.INTERNAL_API_KEY,
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as any).metadata = { startTime: new Date() };

  logger.info(
    {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
    },
    "Outgoing Core Backend request",
  );
  return config;
});

api.interceptors.response.use((response) => {
  const startTime = (response.config as any).metadata.startTime;

  logger.info(
    {
      method: response.config.method,
      url: response.config.url,
      status: response.status,
      responseTime: Date.now() - startTime,
    },
    "Core Backend response",
  );

  return response;
});

export default api;