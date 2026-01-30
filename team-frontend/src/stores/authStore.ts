import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../lib/api/service/authService";


export const useAuthStore = create(
    persist(
        (set,get) => ({
            user:null,
            accessToken:null,
            refreshToken:null,
            isLoading:false,
            isAuthenticated:false,
            login: async (email:string,password:string) => {
                set({isLoading:true});
                const response = await authService.login(email,password);
                
                set(
                    {
                        user:response.user,
                        accessToken:response.accessToken,
                        refreshToken:response.refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    }
                )
            },
            logout: async () => {
                set(
                    {
                        user:null,
                        accessToken:null,
                        refreshToken:null,
                        isLoading:false,
                        isAuthenticated:false
                    }
                )
            },
            register: async (userData:any) => {
                set({isLoading:true});
                let response = await authService.register(userData);
                set(
                    {   
                        user:response.user,
                        accessToken:response.accessToken,
                        refreshToken:response.refreshToken,
                        isLoading:false,
                        isAuthenticated:true
                    }
                )
            },
            setAuth: async (user:object,accessToken:string,refreshToken:string) => {
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
            checkAuth: async () => {
                set({isLoading:true});
                const accessToken = (get() as any).accessToken;
                if(accessToken){
                    set({
                        isAuthenticated:true,
                        isLoading:false
                    })
                } else {
                    set({
                        isAuthenticated:false,
                        isLoading:false
                    })
                }
            }
        }),
        {
            name:"auth-storage"
        }
    )
)