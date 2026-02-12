import { configureStore } from "@reduxjs/toolkit";
import type { StockState } from "../features/stock/slice/types";
import { stockReducer } from "../features/stock/slice/stockSlice";

type RootState = { stock: StockState };

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: { stock: stockReducer },
    preloadedState,
  });
};

export default setupStore;
