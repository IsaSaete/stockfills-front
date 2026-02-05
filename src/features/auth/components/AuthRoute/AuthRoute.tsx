import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";

interface AuthRouteProps {
  children: ReactNode;
  requiresAuth?: boolean;
  redirectPath?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
  requiresAuth = false,
  redirectPath = "/",
}) => {
  const { token } = useAuth();

  if (requiresAuth && !token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!requiresAuth && token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
