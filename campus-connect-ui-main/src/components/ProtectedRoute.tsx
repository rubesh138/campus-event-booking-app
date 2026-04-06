import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const userData = localStorage.getItem("user");
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 IMPORTANT: Do NOT block admin routes here
  if (location.pathname.startsWith("/admin")) {
    return children;
  }

  return children;
}