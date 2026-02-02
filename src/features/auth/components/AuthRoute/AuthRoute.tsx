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
  const { token, isInitialized, isLoading } = useAuth();

  if (!isInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (requiresAuth && !token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!requiresAuth && token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
