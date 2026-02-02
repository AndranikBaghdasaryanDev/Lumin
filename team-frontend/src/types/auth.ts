export interface AuthState {
    user: null | object;
    accessToken: string | null;
    refreshToken:string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hasHydrated?: boolean;
    login: (email:string,password:string) => Promise<void>;
    logout: () => void;
    register: (userData:object) => void;
    setAuth:(user:object,accessToken:string,refreshToken:string) => void;
    checkAuth: () => Promise<void>;
    setHasHydrated: (state: boolean) => void;
}