import axios from "axios";
import { useAuthStore } from "../../stores/authStore";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_REACT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token") ?? useAuthStore.getState().accessToken;
    console.log("Token from localStorage/store:", token);
    console.log("Request URL:", config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization);
    } else {
      console.log("No token found - request without Authorization");
    }

    return config;
  },
  (error) => Promise.reject(error)
);


Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized – token expired");
        localStorage.removeItem("access_token");
        // Clear auth state directly without calling logout API to avoid loop
        useAuthStore.setState({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false
        });
      }

      if (status >= 500) {
        console.error("Server error");
      }
    } else {
      console.error("Network error");
    }

    return Promise.reject(error);
  }

  
);
