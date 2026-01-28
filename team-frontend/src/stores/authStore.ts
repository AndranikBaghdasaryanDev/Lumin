import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            user:null,
            isLoading:false,
            isAuthenticated:false,
            login:(userData:any) => {
                set({user:userData,isLoading: false,isAuthenticated:true})
            },
            logout: () => {
                set({user:null,isLoading:false,isAuthenticated:false})
            },
            register: (userData:any) => {
                set({user:userData,isLoading:false,isAuthenticated:true})
            }
        }),
        {
            name:"auth-storage"
        }
    )
)