// src/components/ProtectedRoute.tsx
// Renders no UI of its own — it only decides whether the guarded child
// route is allowed to render.
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
