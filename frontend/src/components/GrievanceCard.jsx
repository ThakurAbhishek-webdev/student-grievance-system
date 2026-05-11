// ============================================================
// src/components/GrievanceCard.jsx — Single grievance card UI
// ============================================================

import React from "react";

// Category color map
const categoryColors = {
  Academic:  "bg-blue-500/20   text-blue-300   border-blue-500/30",
  Hostel:    "bg-purple-500/20 text-purple-300  border-purple-500/30",
  Transport: "bg-orange-500/20 text-orange-300  border-orange-500/30",
  Other:     "bg-slate-500/20  text-slate-300   border-slate-500/30",
};

// Category icon map
const categoryIcons = {
  Academic:  "🎓",
  Hostel:    "🏠",
  Transport: "🚌",
  Other:     "📋",
};

/**
 * GrievanceCard — Displays a single grievance in a card layout
 *
 * Props:
 * - grievance: the grievance object from MongoDB
 * - onEdit: called with grievance when Edit is clicked
 * - onDelete: called with grievance._id when Delete is clicked
 */
const GrievanceCard = ({ grievance, onEdit, onDelete }) => {
  const { _id, title, description, category, status, date, createdAt } = grievance;

  // Format date nicely
  const formattedDate = new Date(date || createdAt).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div className="glass-card p-5 hover:border-indigo-500/40 transition-all duration-300 animate-slide-up group">

      {/* ── Header Row ───────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base leading-snug truncate group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-xs mt-1">{formattedDate}</p>
        </div>

        {/* Status Badge */}
        <span className={status === "Resolved" ? "badge-resolved" : "badge-pending"}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === "Resolved" ? "bg-emerald-400" : "bg-amber-400"}`} />
          {status}
        </span>
      </div>

      {/* ── Description ──────────────────────────────────── */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {description}
      </p>

      {/* ── Footer Row ───────────────────────────────────── */}
      <div className="flex items-center justify-between">
        {/* Category badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[category] || categoryColors.Other}`}>
          <span>{categoryIcons[category] || "📋"}</span>
          {category}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            id={`edit-btn-${_id}`}
            onClick={() => onEdit(grievance)}
            className="text-xs font-semibold text-indigo-400 hover:text-white
                       bg-indigo-500/10 hover:bg-indigo-600
                       px-3 py-1.5 rounded-lg border border-indigo-500/20 hover:border-indigo-600
                       transition-all duration-200"
          >
            ✏️ Edit
          </button>
          <button
            id={`delete-btn-${_id}`}
            onClick={() => onDelete(_id)}
            className="text-xs font-semibold text-rose-400 hover:text-white
                       bg-rose-500/10 hover:bg-rose-600
                       px-3 py-1.5 rounded-lg border border-rose-500/20 hover:border-rose-600
                       transition-all duration-200"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrievanceCard;
