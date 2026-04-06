import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  // Extra safety check
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}