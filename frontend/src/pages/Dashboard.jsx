// ============================================================
// src/pages/Dashboard.jsx — Main protected dashboard
// ============================================================

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import GrievanceCard from "../components/GrievanceCard";
import GrievanceForm from "../components/GrievanceForm";
import Spinner from "../components/Spinner";

// ─── Stats Card ──────────────────────────────────────────────
const StatCard = ({ label, value, icon, color }) => (
  <div className={`glass-card p-5 border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

// ─── Delete Confirmation Modal ────────────────────────────────
const DeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="glass-card p-6 max-w-sm w-full animate-slide-up">
      <div className="text-center">
        <div className="w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗑️</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Delete Grievance?</h3>
        <p className="text-slate-400 text-sm mb-6">
          This action cannot be undone. The grievance will be permanently removed.
        </p>
        <div className="flex gap-3 justify-center">
          <button id="confirm-delete-btn" onClick={onConfirm} className="btn-danger px-6">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="btn-secondary px-6">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Dashboard Component ─────────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();

  // ── State ─────────────────────────────────────────────────
  const [grievances, setGrievances]       = useState([]);
  const [loading, setLoading]             = useState(true);
  const [formLoading, setFormLoading]     = useState(false);
  const [showForm, setShowForm]           = useState(false);
  const [editingGrievance, setEditing]    = useState(null);   // null = creating new
  const [searchQuery, setSearchQuery]     = useState("");
  const [isSearching, setIsSearching]     = useState(false);
  const [deleteTargetId, setDeleteTarget] = useState(null);
  const [filterStatus, setFilterStatus]   = useState("All");  // All / Pending / Resolved
  const [filterCategory, setFilterCategory] = useState("All");

  // ── Fetch all grievances ──────────────────────────────────
  const fetchGrievances = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/grievances");
      setGrievances(data.data || []);
    } catch (err) {
      toast.error("Failed to load grievances.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGrievances(); }, [fetchGrievances]);

  // ── Search handler ────────────────────────────────────────
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) { fetchGrievances(); return; }
    setIsSearching(true);
    setLoading(true);
    try {
      const { data } = await API.get(`/grievances/search?title=${searchQuery.trim()}`);
      setGrievances(data.data || []);
    } catch {
      toast.error("Search failed.");
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchGrievances();
  };

  // ── Create / Update submission ────────────────────────────
  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingGrievance) {
        // UPDATE existing
        await API.put(`/grievances/${editingGrievance._id}`, formData);
        toast.success("Grievance updated successfully! ✅");
      } else {
        // CREATE new
        await API.post("/grievances", formData);
        toast.success("Grievance submitted! 📤");
      }
      setShowForm(false);
      setEditing(null);
      fetchGrievances();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Edit handler ──────────────────────────────────────────
  const handleEdit = (grievance) => {
    setEditing(grievance);
    setShowForm(true);
    // Smooth scroll to top so form is visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Delete handler ────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      await API.delete(`/grievances/${deleteTargetId}`);
      toast.success("Grievance deleted.");
      setDeleteTarget(null);
      fetchGrievances();
    } catch {
      toast.error("Delete failed.");
      setDeleteTarget(null);
    }
  };

  // ── Cancel form ───────────────────────────────────────────
  const handleFormCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  // ── Client-side filtering (status + category) ─────────────
  const filteredGrievances = grievances.filter((g) => {
    const statusMatch   = filterStatus   === "All" || g.status   === filterStatus;
    const categoryMatch = filterCategory === "All" || g.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  // ── Stats ─────────────────────────────────────────────────
  const total    = grievances.length;
  const pending  = grievances.filter((g) => g.status === "Pending").length;
  const resolved = grievances.filter((g) => g.status === "Resolved").length;

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

      {/* Top Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Welcome Banner ────────────────────────────── */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {user?.name?.split(" ")[0]}!
            </span>
          </h1>
          <p className="text-slate-400 mt-1">Manage and track all your grievances from here.</p>
        </div>

        {/* ── Stats Row ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Grievances" value={total}    icon="📋" color="border-indigo-500" />
          <StatCard label="Pending"           value={pending}  icon="⏳" color="border-amber-500"  />
          <StatCard label="Resolved"          value={resolved} icon="✅" color="border-emerald-500"/>
        </div>

        {/* ── Grievance Form Panel ──────────────────────── */}
        {showForm && (
          <div className="glass-card p-6 mb-8 border-indigo-500/30 animate-slide-up">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              {editingGrievance ? "✏️ Edit Grievance" : "📤 Submit New Grievance"}
            </h2>
            <GrievanceForm
              initialData={editingGrievance}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={formLoading}
            />
          </div>
        )}

        {/* ── Toolbar: Search + Filters + New Button ────── */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-0">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍  Search by title..."
                className="input-field flex-1"
              />
              <button id="search-btn" type="submit" disabled={isSearching} className="btn-secondary whitespace-nowrap">
                {isSearching ? <Spinner size="h-4 w-4" /> : "Search"}
              </button>
              {searchQuery && (
                <button type="button" onClick={clearSearch} className="btn-secondary">
                  ✕
                </button>
              )}
            </form>

            {/* Filter: Status */}
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-full sm:w-36"
            >
              {["All", "Pending", "Resolved"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Filter: Category */}
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field w-full sm:w-40"
            >
              {["All", "Academic", "Hostel", "Transport", "Other"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* New Grievance button */}
            {!showForm && (
              <button
                id="new-grievance-btn"
                onClick={() => { setEditing(null); setShowForm(true); }}
                className="btn-primary whitespace-nowrap"
              >
                + New Grievance
              </button>
            )}
          </div>
        </div>

        {/* ── Grievance List ────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">
              {filteredGrievances.length} Grievance{filteredGrievances.length !== 1 ? "s" : ""}
              {filterStatus !== "All" || filterCategory !== "All" ? " (filtered)" : ""}
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Spinner size="h-10 w-10" />
                <p className="text-slate-400 text-sm mt-4">Loading grievances...</p>
              </div>
            </div>
          ) : filteredGrievances.length === 0 ? (
            /* Empty state */
            <div className="glass-card p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-white font-semibold text-lg mb-2">No grievances found</h3>
              <p className="text-slate-400 text-sm mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search.`
                  : "You haven't submitted any grievances yet."}
              </p>
              {!showForm && (
                <button
                  onClick={() => { setEditing(null); setShowForm(true); }}
                  className="btn-primary"
                >
                  Submit Your First Grievance
                </button>
              )}
            </div>
          ) : (
            /* Grievance grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGrievances.map((g) => (
                <GrievanceCard
                  key={g._id}
                  grievance={g}
                  onEdit={handleEdit}
                  onDelete={(id) => setDeleteTarget(id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
