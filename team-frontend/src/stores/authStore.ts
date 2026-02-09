import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../lib/api/service/authService";
import type { AuthState } from "../types/auth";
import type { User } from "../types/user";


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user:null,
            accessToken:null,
            refreshToken:null,
            isLoading:false,
            isAuthenticated:false,
            hasHydrated:false,
            login: async (email:string,password:string) => {
                try{
                    set({isLoading:true});
                    const response = await authService.login(email,password);
                    set(
                        {   
                            user:response.data.user,
                            accessToken:response.data.accessToken,
                            refreshToken:response.data.refreshToken,
                            isLoading:false,
                            isAuthenticated:true
                        }
                    );
                }catch(error){
                    set({isLoading:false});
                    throw error;
                }
            },
            logout: () => {
                set({isLoading:true});
                authService.logout()
                .then(() => {
                    set({user:null,accessToken:null,refreshToken:null,isLoading:false,isAuthenticated:false});
                })
                .catch(error => {
                    set({isLoading:false});
                    throw error;
                })
            },
            register: async (userData:User) => {
                console.log()
                set({isLoading:true});
                authService.register(userData)
                .then((response) => {
                    console.log("Registration successful:", response.data);
                    set({   
                        user:response.data.user,
                        accessToken:response.data.accessToken,
                        refreshToken:response.data.refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    })
                })
                .catch(error => {
                    console.log("Registration failed:", error.response.data);
                    set({isLoading:false});
                    throw error;
                })
            },
            setAuth: async (user:User,accessToken:string,refreshToken:string) => {
                set(
                    {
                        user:user,
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    }
                )
            },
            checkAuth: () => {
                set({isLoading:true});
                authService.checkAuth()
                .then(() => {
                    set({
                        isAuthenticated:true,
                    })
                })
                .catch(() => {
                    set({
                        isAuthenticated:false,
                    })          
                })
                .finally(() => {
                    set({isLoading:false});
                })
            },
            setHasHydrated: (state: boolean) => {
                set({ hasHydrated: state });
            },
        }),
        {
            name:"auth-storage",
            onRehydrateStorage: () => (state: any) => {
                state?.setHasHydrated(true);
            }
        }
    )
)