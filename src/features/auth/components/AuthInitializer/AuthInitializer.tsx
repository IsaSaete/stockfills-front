import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "../../../../store/store";
import { authFailureCreator } from "../../slice/authSlice";
import { verifyToken } from "../../thunks/verifyToken";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(verifyToken(token));
    } else {
      dispatch(authFailureCreator("no-token"));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
