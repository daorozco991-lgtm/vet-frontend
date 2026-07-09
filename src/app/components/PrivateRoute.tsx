import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../hooks/token";

export function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}