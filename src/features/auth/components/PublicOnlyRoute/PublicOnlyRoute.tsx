// features/auth/components/PublicOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";

const PublicOnlyRoute = () => {
  const { token, isInitialized, isLoading } = useAppSelector(
    (state) => state.auth,
  );

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

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
