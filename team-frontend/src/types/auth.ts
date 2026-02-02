import type { User } from "./user";

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken:string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasHydrated: boolean;
    login: (email:string,password:string) => Promise<void>;
    logout: () => void;
    register: (userData:User) => void;
    setAuth:(user:User,accessToken:string,refreshToken:string) => void;
    checkAuth: () => Promise<void>;
    setHasHydrated: (state: boolean) => void;
}