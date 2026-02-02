import type { User } from "../../../types/user";
import { Axios } from "../axios";

export const authService = {
    login: async (email: string, password: string) => {

        //Mock Api call for delegation 
        return {
            user: { id: 1, name: "John Doe", email: email, password: password },
            accessToken: "dummyAccessToken",
            refreshToken: "dummyRefreshToken"
        }
    },
    register: async (userData: User) => {
        return {
            user: { ...userData, id: userData.id || Date.now() },
            accessToken: "dummyAccessToken",
            refreshToken: "dummyRefreshToken",
        };
    },
    logout: () => {
        return Axios.post("/api/auth/logout");
    },
    checkAuth: () => {
        return Axios.get("/api/auth/me");
    }

}