import axios from "axios";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_REACT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

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
        localStorage.removeItem("token");
        window.location.href = "/login";
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
