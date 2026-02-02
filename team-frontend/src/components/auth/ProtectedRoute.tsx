import { Loading } from "../ui/Loading.tsx";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, hasHydrated }: any = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      navigate("/login");
    }
  }, [hasHydrated, isAuthenticated, navigate]);

  if (!hasHydrated) return <Loading />;
  if (!isAuthenticated) return null;


  return <>{children}</>;
};
