// ============================================================
// routes/grievanceRoutes.js — Grievance CRUD route definitions
// ============================================================

const express = require("express");
const router = express.Router();

// Import grievance controller functions
const {
  createGrievance,
  getAllGrievances,
  searchGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
} = require("../controllers/grievanceController");

// Import auth middleware to protect all grievance routes
const { protect } = require("../middleware/authMiddleware");

// ─── All routes below are PROTECTED (require valid JWT) ──────

// GET  /api/grievances/search?title=xyz — Search must come BEFORE /:id
// to avoid Express treating "search" as an ID parameter
router.get("/search", protect, searchGrievances);

// POST /api/grievances — Create a new grievance
router.post("/", protect, createGrievance);

// GET  /api/grievances — Get all grievances for logged-in user
router.get("/", protect, getAllGrievances);

// GET  /api/grievances/:id — Get a specific grievance by ID
router.get("/:id", protect, getGrievanceById);

// PUT  /api/grievances/:id — Update a specific grievance
router.put("/:id", protect, updateGrievance);

// DELETE /api/grievances/:id — Delete a specific grievance
router.delete("/:id", protect, deleteGrievance);

module.exports = router;
