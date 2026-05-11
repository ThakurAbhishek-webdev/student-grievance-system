// ============================================================
// src/components/Spinner.jsx — Loading spinner component
// ============================================================

import React from "react";

/**
 * Spinner — Animated loading indicator
 * @param {string} size   - Tailwind size class, default "h-8 w-8"
 * @param {string} color  - Tailwind border color class, default indigo
 */
const Spinner = ({ size = "h-8 w-8", color = "border-indigo-500" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} ${color} border-4 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Spinner;
