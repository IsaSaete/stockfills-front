import type { AppDispatch } from "../../../store/store";
import AuthClient from "../client/AuthClient";
import {
  authFailureCreator,
  authStartCreator,
  authSuccessCreator,
} from "../slice/authSlice";

const authClient = new AuthClient();

const verifyToken = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(authStartCreator());

  try {
    const data = await authClient.verifyToken(token);

    dispatch(authSuccessCreator(data));
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(authFailureCreator("invalid-token"));
  }
};

export default verifyToken;
