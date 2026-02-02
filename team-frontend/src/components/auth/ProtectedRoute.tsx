import { Loading } from "../ui/Loading";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";
export const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {isAuthenticated,hasHydrated}:any = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated,navigate])
    
    if(!hasHydrated)return <Loading/>

    
    return <>
        {children}
    </>
}