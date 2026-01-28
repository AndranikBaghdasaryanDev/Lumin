import axios, { type InternalAxiosRequestConfig } from "axios";
import logger from "./logger.ts";

const api = axios.create({
  baseURL: `${process.env.CORE_BACKEND_URL}`,
  headers: {
    "API-Key": process.env.INTERNAL_API_KEY,
  },
});

let authToken: string | null = null;

export const setAuthToken = (newToken: string | null) => {
  authToken = newToken;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as any).metadata = { startTime: new Date() };

  logger.info(
    { method: config.method, url: config.url, data: config.data },
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

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
