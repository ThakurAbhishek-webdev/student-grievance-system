// ============================================================
// src/components/Navbar.jsx — Top navigation bar
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo / Brand ─────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">GrievanceMS</p>
              <p className="text-indigo-400 text-xs font-medium">Student Portal</p>
            </div>
          </div>

          {/* ── Right Side ───────────────────────────────── */}
          <div className="flex items-center gap-4">
            {/* User avatar + name */}
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-300 text-sm font-medium truncate max-w-[120px]">
                  {user.name}
                </span>
              </div>
            )}

            {/* Logout button */}
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30
                         text-rose-400 hover:text-rose-300 text-sm font-semibold
                         px-4 py-2 rounded-xl transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
