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

  return <>{children}</>;
};

export default AuthInitializer;
