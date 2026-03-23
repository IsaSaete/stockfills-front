import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/slice/authSlice";
import { stockReducer } from "../features/stock/slice/stockSlice";
import { printingHistoryReducer } from "../features/historyPrint/slice/PrintingHistorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
    printingHistory: printingHistoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
