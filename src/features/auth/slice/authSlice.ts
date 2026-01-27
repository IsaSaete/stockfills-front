import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import type { AuthResponse } from "../types";

const initialState: AuthState = {
  isLoading: false,
  isInitialized: false,
  userInfo: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<AuthResponse>) {
      state.isLoading = false;
      state.isInitialized = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isInitialized = true;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userInfo = null;
      state.error = null;
      state.isInitialized = true;
    },
  },
});

export const {
  authStart: authStartCreator,
  authSuccess: authSuccessCreator,
  authFailure: authFailureCreator,
  logout: logoutCreator,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
