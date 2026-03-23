import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PrintingHistoryState } from "./types";
import type { PrintingHistoryDto } from "../types";

const initialState: PrintingHistoryState = {
  printingHistory: [],
  isLoading: false,
  error: null,
};

const printingHistorySlice = createSlice({
  name: "printingHistory",
  initialState,
  reducers: {
    printingHistoryLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    printingHistoryAdd(state, action: PayloadAction<PrintingHistoryDto>) {
      const newPrintingEntry = action.payload;

      state.printingHistory.push(newPrintingEntry);
      state.error = null;
      state.isLoading = false;
    },
    printingHistoryFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  printingHistoryAdd,
  printingHistoryFailed,
  printingHistoryLoading,
} = printingHistorySlice.actions;

export const printingHistoryReducer = printingHistorySlice.reducer;
