import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import store from "./store/store";
import AuthInitializer from "./features/auth/components/AuthInitializer/AuthInitializer";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={AppRouter} />
      </AuthInitializer>
    </Provider>
  </StrictMode>,
);
