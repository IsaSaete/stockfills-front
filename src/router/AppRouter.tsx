import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../components/Layouts/Auth-layout";
import AuthLandingPage from "../pages/AuthLandingPage/AuthLandingPage";
import AuthRoute from "../features/auth/components/AuthRoute/AuthRoute";
import DashboardLayout from "../features/dashboard/components/DashboardLayout/DashboardLayout";

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
        <DashboardLayout />
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
