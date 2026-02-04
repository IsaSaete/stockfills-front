import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/slice/authSlice";
import { stockReducer } from "../features/stock/slice/stockSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
