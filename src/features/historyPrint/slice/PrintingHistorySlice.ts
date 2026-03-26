import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PrintingHistoryState } from "./types";
import type { PrintingHistoryDto, PrintingHistoryResponses } from "../types";

const initialState: PrintingHistoryState = {
  printingHistory: [],
  isLoading: false,
  error: null,
  pagination: {
    totalItems: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
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
    loadPrintingHistory(
      state,
      action: PayloadAction<PrintingHistoryResponses>,
    ) {
      state.printingHistory = action.payload.printingEntries;
      state.pagination = action.payload.pagination;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  printingHistoryAdd,
  printingHistoryFailed,
  printingHistoryLoading,
  loadPrintingHistory,
} = printingHistorySlice.actions;

export const printingHistoryReducer = printingHistorySlice.reducer;
