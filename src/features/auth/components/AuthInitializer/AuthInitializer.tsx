import { useDispatch } from "react-redux";
import { useEffect, type ReactNode } from "react";
import type { AppDispatch, RootState } from "../../../../store/store";
import { authFailureCreator } from "../../slice/authSlice";
import { useAppSelector } from "../../../../store/hooks";
import verifyToken from "../../thunks/verifyToken";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isInitialized = useAppSelector(
    (state: RootState) => state.auth.isInitialized,
  );

  useEffect(() => {
    if (isInitialized) return;

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(verifyToken(token));
    } else {
      dispatch(authFailureCreator("no-token"));
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-primary/20" />
          <span className="text-2xl font-bold tracking-wide">STOCKFILS</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Cargando tu espacio de trabajo...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
