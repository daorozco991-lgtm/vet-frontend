import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const token = localStorage.getItem("token"); 
  const isAuthenticated = !!token;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/mascotas" replace />;
};