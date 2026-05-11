// ============================================================
// src/components/PrivateRoute.jsx — Protects authenticated routes
// ============================================================

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute — Wraps a component that requires login
 * If the user is NOT authenticated, redirect them to /login
 * If they ARE authenticated, render the wrapped component
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Not logged in → send to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → show the protected page
  return children;
};

export default PrivateRoute;
