import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../lib/api/service/authService";
import type { AuthState, RegisterData } from "../types/auth";
import type { User, UserProfile } from "../types/user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,
      hasHydrated: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(email, password);
          const { user, accessToken, refreshToken } = response.data.data;
          localStorage.setItem("access_token", accessToken);
          
          set({
            user,
            accessToken,
            refreshToken,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          
          // Մաքրում ենք token-ը localStorage-ից
          localStorage.removeItem("access_token");
          
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isLoading: false,
            isAuthenticated: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },
      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          const { user, accessToken, refreshToken } = response.data;
          
          // Պահում ենք token-ը localStorage-ում
          localStorage.setItem("access_token", accessToken);
          
          set({
            user,
            accessToken,
            refreshToken,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      setAuth: async (
        user: User,
        accessToken: string,
        refreshToken: string,
      ) => {
        set({
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isLoading: false,
          isAuthenticated: true,
        });
      },
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await authService.checkAuth();
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },
      updateUserProfile: (profile: UserProfile) => {
        set((state) => ({
          user: state.user ? { ...state.user, profile } : null
        }));
      },
      clearUserProfile: () => {
        set((state) => ({
          user: state.user ? { ...state.user, profile: undefined } : null
        }));
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state: AuthState | undefined) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
