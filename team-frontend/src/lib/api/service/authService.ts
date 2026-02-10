import type { RegisterData } from "../../../types/auth";
import { Axios } from "../axios";

export const authService = {
    login: async (email: string, password: string) => {
        return Axios.post("/api/auth/login", { email, password });
    },
    register: async (userData: RegisterData) => {
        return Axios.post("/api/auth/register", userData);
    },
    logout: () => {
        return Axios.post("/api/auth/logout");
    },
    checkAuth: () => {
        return Axios.get("/api/auth/me");
    }
}