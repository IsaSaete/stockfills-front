import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StockState } from "./types";
import type { FilamentDto } from "../types/types";

const initialState: StockState = {
  filaments: [],
  isLoading: false,
  error: null,
  isCreating: false,
  createError: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    stockLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    stockLoaded(state, action: PayloadAction<FilamentDto[]>) {
      state.isLoading = false;
      state.error = null;
      state.filaments = action.payload;
    },
    stockFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addFilamentLoading(state) {
      state.isCreating = true;
      state.createError = null;
    },
    addFilamentSuccess(state, action: PayloadAction<FilamentDto>) {
      const newFilament = action.payload;

      state.isCreating = false;
      state.createError = null;
      state.filaments.push(newFilament);
    },
    addFilamentFailed(state, action: PayloadAction<string>) {
      state.isCreating = false;
      state.createError = action.payload;
    },
  },
});

export const {
  stockLoading,
  stockLoaded,
  stockFailed,
  addFilamentFailed,
  addFilamentLoading,
  addFilamentSuccess,
} = stockSlice.actions;

export const stockReducer = stockSlice.reducer;
