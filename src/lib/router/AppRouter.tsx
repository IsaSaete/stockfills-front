import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../../components/Layouts/Auth-layout";
import AuthLandingPage from "../../pages/AuthLandingPage/AuthLandingPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute/ProtectedRoute";
import PublicOnlyRoute from "../../features/auth/components/PublicOnlyRoute/PublicOnlyRoute";

const AppRouter = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [{ index: true, element: <AuthLandingPage /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        // element: <DashboardLayout />,
        // children: [{ index: true, element: <DashboardPage /> }],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
