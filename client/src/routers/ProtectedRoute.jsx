import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  return !localStorage.getItem("accessToken") ? (
    <Navigate to='/login' />
  ) : (
    <Outlet />
  );
}
