import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StockState } from "./types";
import type { FilamentDto } from "../types/types";

const initialState: StockState = {
  filaments: [],
  isLoading: false,
  error: null,
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
  },
});

export const { stockLoading, stockLoaded, stockFailed } = stockSlice.actions;

export const stockReducer = stockSlice.reducer;
