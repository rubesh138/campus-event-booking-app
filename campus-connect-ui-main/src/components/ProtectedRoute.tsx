import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const userData = localStorage.getItem("user");

  // ❌ Not logged in → go to login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}