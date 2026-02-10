import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Loading } from './ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth state
  if (!hasHydrated) {
    return <Loading />;
  }

  // Redirect to login with intended destination
  if (hasHydrated && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow access if authenticated
  return <>{children}</>;
};
