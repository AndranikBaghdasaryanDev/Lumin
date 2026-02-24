import axios, { type InternalAxiosRequestConfig } from "axios";
import logger from "./logger.ts";
import env from "../config/env.ts";
import type { ApiResponse } from "../types/api-responses/api.ts";

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
      query: config.params,
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

  const apiResponse: ApiResponse<any> = {
    success: response.data.status === "success",
    data: response.data.data,
  };

  if (response.data.status !== "success" && response.data.error) {
    apiResponse.error = {
      code: response.data.error.code,
      message: response.data.error.message,
    };
  }

  return {
    ...response,
    data: apiResponse,
  };
});

export default api;
