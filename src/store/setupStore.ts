import { configureStore } from "@reduxjs/toolkit";
import type { StockState } from "../features/stock/slice/types";
import { stockReducer } from "../features/stock/slice/stockSlice";
import { printingHistoryReducer } from "../features/historyPrint/slice/PrintingHistorySlice";

type RootState = { stock: StockState };

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: { stock: stockReducer, printingHistory: printingHistoryReducer },
    preloadedState,
  });
};

export default setupStore;
