import { Loading } from "../ui/Loading.tsx";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";
export const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {isAuthenticated,isLoading}:any = useAuthStore();
    const navigate = useNavigate();
    if(isLoading)return <Loading/>

    
    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated,navigate])
    return <>
        {children}
    </>
}