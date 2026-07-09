import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./app/components/error/ErrorPage";
import ErrorBoundary from "./app/components/error/ErrorBoundary";
import Layout from "./app/components/layout/Layout";
import { PrivateRoute } from "./app/components/PrivateRoute";
import { PublicRoute } from "./app/components/PublicRoute";
import LoginPage from "./app/components/login/Login";
import RegisterPage from "./app/components/login/Register";
import { DuenosPage } from "./app/components/duenos/Duenos";
import { CitasPage } from "./app/components/citas/Citas";
import { MascotasPage } from "./app/mascotas/Mascotas";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "/",
            element: <DuenosPage />,
          },

          { path: "/mascotas", element: <MascotasPage /> },
          { path: "/duenos", element: <DuenosPage /> },
          { path: "/citas", element: <CitasPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);
