import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  console.log(["ProtectedRoute"], "Running");
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
    return;
  }

  return <Outlet />;
}
