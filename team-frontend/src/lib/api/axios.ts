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
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
        const store = useAuthStore.getState();
        const api = useAuthStore;
        api.setState({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false
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
