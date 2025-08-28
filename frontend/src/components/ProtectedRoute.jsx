import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;

  // Hierarchical roles: admin >= manager >= user
  const roleRank = { user: 1, manager: 2, admin: 3 };
  if (role) {
    const userRank = roleRank[user.role] ?? 0;
    const requiredRank = roleRank[role] ?? 99;
    if (userRank < requiredRank) return <Navigate to="/unauthorized" />;
  }
  return children;
}
