import axios from "axios";

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

api.interceptors.request.use((config) => {
  //here should be request logging
  //WIE-5
  return config;
});

api.interceptors.response.use((response) => {
  //here should be response logging
  //WIE-5
  return response;
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
