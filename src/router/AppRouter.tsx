import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import AuthRoute from "../features/auth/components/AuthRoute/AuthRoute";
import AuthLandingPage from "../pages/AuthLandingPage/AuthLandingPage";
import StockPage from "../pages/StockPage/StockPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { AuthLayout } from "../components/Layout/AuthLayout";
import StockNewPage from "../pages/StockPage/StockNewPage";
import FilamentDetailPage from "../pages/FilamentDetailPage/FilamentDetailPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRoute requiresAuth={false} redirectPath="/dashboard">
            <AuthLandingPage />
          </AuthRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthRoute requiresAuth={true} redirectPath="/">
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/stock",
    element: (
      <AuthRoute requiresAuth={true} redirectPath="/">
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <StockPage />,
      },
      { path: "nuevo", element: <StockNewPage /> },
      { path: "filamento/:id", element: <FilamentDetailPage /> },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
