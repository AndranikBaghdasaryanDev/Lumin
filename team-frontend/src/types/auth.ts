import type { User, UserProfile } from "./user";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken:string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasHydrated: boolean;
    login: (email:string,password:string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData:RegisterData) => Promise<void>;
    setAuth:(user:User,accessToken:string,refreshToken:string) => void;
    checkAuth: () => Promise<void>;
    setHasHydrated: (state: boolean) => void;
    updateUserProfile: (profile: UserProfile) => void;
    clearUserProfile: () => void;
}