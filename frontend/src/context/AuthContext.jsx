// ============================================================
// src/context/AuthContext.jsx — Global Authentication State
// ============================================================

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context object
const AuthContext = createContext(null);

// 2. AuthProvider wraps the whole app and shares auth state
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage so the session persists on refresh
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("grievanceUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("grievanceToken") || null);

  // ─── Login: Save user + token to state AND localStorage ────
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("grievanceUser", JSON.stringify(userData));
    localStorage.setItem("grievanceToken", jwtToken);
  };

  // ─── Logout: Clear everything ───────────────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("grievanceUser");
    localStorage.removeItem("grievanceToken");
  };

  // Value object shared with all child components via useAuth()
  const value = { user, token, login, logout, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom hook — usage: const { user, login, logout } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
