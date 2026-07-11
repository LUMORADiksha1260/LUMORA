import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Supabase needs a moment on first page load to check for an existing
  // session (cookie/localStorage). Without this check, a logged-in user
  // hitting refresh would flash-redirect to /login before the session
  // finishes loading.
  if (loading) return <LoadingScreen label="Checking your session…" />;

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
