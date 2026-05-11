// ============================================================
// src/api/axios.js — Axios instance with auth header injection
// ============================================================

import axios from "axios";

// Create a reusable axios instance pointing to our backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to deployed URL in production
});

// ─── Request Interceptor ─────────────────────────────────────
// Before every request, automatically attach the JWT token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("grievanceToken");
    if (token) {
      // Standard Authorization header for JWT
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────
// If the server returns 401 (Unauthorized), auto-logout the user
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored session data
      localStorage.removeItem("grievanceToken");
      localStorage.removeItem("grievanceUser");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
