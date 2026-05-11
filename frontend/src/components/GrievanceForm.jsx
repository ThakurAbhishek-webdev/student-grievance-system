// ============================================================
// src/components/GrievanceForm.jsx — Create / Edit Grievance Form
// ============================================================

import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const CATEGORIES = ["Academic", "Hostel", "Transport", "Other"];
const STATUSES   = ["Pending", "Resolved"];

/**
 * GrievanceForm — Shared form for both creating and editing grievances
 *
 * Props:
 * - initialData: if editing, pass existing grievance data; null for new
 * - onSubmit(formData): called when form is submitted
 * - onCancel(): called when Cancel is clicked
 * - loading: boolean — show spinner on submit button while API call is in progress
 */
const GrievanceForm = ({ initialData = null, onSubmit, onCancel, loading }) => {
  const isEditing = !!initialData;

  // ── Form state ────────────────────────────────────────────
  const [formData, setFormData] = useState({
    title:       "",
    description: "",
    category:    "Academic",
    status:      "Pending",
    date:        new Date().toISOString().split("T")[0], // today in YYYY-MM-DD
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title:       initialData.title       || "",
        description: initialData.description || "",
        category:    initialData.category    || "Academic",
        status:      initialData.status      || "Pending",
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  // ── Handlers ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim() || formData.title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (!formData.description.trim() || formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (!formData.category)
      newErrors.category = "Please select a category.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">
          Grievance Title <span className="text-rose-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Wi-Fi not working in hostel block B"
          className={`input-field ${errors.title ? "border-rose-500 focus:ring-rose-500" : ""}`}
        />
        {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">
          Description <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your grievance in detail..."
          className={`input-field resize-none ${errors.description ? "border-rose-500 focus:ring-rose-500" : ""}`}
        />
        {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Category + Status row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1.5">
            Category <span className="text-rose-400">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`input-field ${errors.category ? "border-rose-500" : ""}`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-rose-400 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1.5">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1.5">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          id="submit-grievance-btn"
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <><Spinner size="h-4 w-4" color="border-white" /> Saving...</>
          ) : (
            isEditing ? "✅ Update Grievance" : "📤 Submit Grievance"
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default GrievanceForm;
