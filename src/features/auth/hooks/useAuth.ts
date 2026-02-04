import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import AuthClient from "../client/AuthClient";
import { useAppSelector } from "../../../store/hooks";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";
import {
  authFailureCreator,
  authStartCreator,
  authSuccessCreator,
  logoutCreator,
} from "../slice/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authClient = useMemo(() => new AuthClient(), []);
  const authState = useAppSelector((state) => state.auth);

  const loginUser = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponse> => {
      dispatch(authStartCreator());

      try {
        const loginUserData = await authClient.loginUser(credentials);

        localStorage.setItem("token", loginUserData.token);
        localStorage.setItem("user", JSON.stringify(loginUserData.user));

        dispatch(authSuccessCreator(loginUserData));

        return loginUserData;
      } catch (error) {
        dispatch(
          authFailureCreator(
            error instanceof Error ? error.message : "Error al iniciar sesión",
          ),
        );
        throw error;
      }
    },
    [authClient, dispatch],
  );

  const registerUser = useCallback(
    async (credentials: RegisterCredentials) => {
      dispatch(authStartCreator());

      try {
        const registerUserData = await authClient.registerUser(credentials);

        localStorage.setItem("token", registerUserData.token);
        localStorage.setItem("user", JSON.stringify(registerUserData.user));

        dispatch(authSuccessCreator(registerUserData));

        return registerUserData;
      } catch (error) {
        dispatch(
          authFailureCreator(
            error instanceof Error ? error.message : "Error al registrarse",
          ),
        );
        throw error;
      }
    },
    [authClient, dispatch],
  );

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logoutCreator());
  };

  return {
    ...authState,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated: authState.token !== null && authState.userInfo !== null,
  };
};
