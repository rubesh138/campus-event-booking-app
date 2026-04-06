import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      setIsAdmin(false);
      return;
    }

    try {
      const user = JSON.parse(userData);
      setIsAdmin(user?.role === "admin");
    } catch {
      setIsAdmin(false);
    }
  }, []);

  // ⏳ Wait until check completes
  if (isAdmin === null) return null;

  // ❌ Not admin → redirect
  if (!isAdmin) return <Navigate to="/" replace />;

  // ✅ Admin → allow access
  return children;
}