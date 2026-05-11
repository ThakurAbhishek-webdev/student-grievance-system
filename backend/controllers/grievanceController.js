// ============================================================
// controllers/grievanceController.js — CRUD for Grievances
// ============================================================

const Grievance = require("../models/Grievance");

// ─────────────────────────────────────────────────────────────
// @desc    Create a new grievance
// @route   POST /api/grievances
// @access  Private (requires JWT)
// ─────────────────────────────────────────────────────────────
const createGrievance = async (req, res) => {
  const { title, description, category, date, status } = req.body;

  // Basic validation
  if (!title || !description || !category) {
    return res.status(400).json({ message: "Title, description, and category are required." });
  }

  // Create grievance and link it to the logged-in student
  const grievance = await Grievance.create({
    title,
    description,
    category,
    date: date || Date.now(),
    status: status || "Pending",
    createdBy: req.user._id, // req.user is set by the auth middleware
  });

  res.status(201).json({
    success: true,
    message: "Grievance submitted successfully!",
    data: grievance,
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Get all grievances for the logged-in student
// @route   GET /api/grievances
// @access  Private
// ─────────────────────────────────────────────────────────────
const getAllGrievances = async (req, res) => {
  // Only return grievances belonging to the current user
  const grievances = await Grievance.find({ createdBy: req.user._id }).sort({
    createdAt: -1, // Newest first
  });

  res.status(200).json({
    success: true,
    count: grievances.length,
    data: grievances,
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Search grievances by title (case-insensitive)
// @route   GET /api/grievances/search?title=xyz
// @access  Private
// ─────────────────────────────────────────────────────────────
const searchGrievances = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Please provide a search term." });
  }

  // Use regex for a flexible, case-insensitive title search
  const grievances = await Grievance.find({
    createdBy: req.user._id,
    title: { $regex: title, $options: "i" }, // 'i' = case-insensitive
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: grievances.length,
    data: grievances,
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Get a single grievance by its ID
// @route   GET /api/grievances/:id
// @access  Private
// ─────────────────────────────────────────────────────────────
const getGrievanceById = async (req, res) => {
  const grievance = await Grievance.findById(req.params.id);

  // If not found
  if (!grievance) {
    return res.status(404).json({ message: "Grievance not found." });
  }

  // Ensure the logged-in user owns this grievance
  if (grievance.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to view this grievance." });
  }

  res.status(200).json({ success: true, data: grievance });
};

// ─────────────────────────────────────────────────────────────
// @desc    Update a grievance by ID
// @route   PUT /api/grievances/:id
// @access  Private
// ─────────────────────────────────────────────────────────────
const updateGrievance = async (req, res) => {
  // Find the grievance first
  let grievance = await Grievance.findById(req.params.id);

  if (!grievance) {
    return res.status(404).json({ message: "Grievance not found." });
  }

  // Only the owner can update their grievance
  if (grievance.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to update this grievance." });
  }

  // Update the grievance with new data
  // { new: true } returns the updated document instead of the old one
  // { runValidators: true } runs schema validations on update
  grievance = await Grievance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Grievance updated successfully!",
    data: grievance,
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Delete a grievance by ID
// @route   DELETE /api/grievances/:id
// @access  Private
// ─────────────────────────────────────────────────────────────
const deleteGrievance = async (req, res) => {
  const grievance = await Grievance.findById(req.params.id);

  if (!grievance) {
    return res.status(404).json({ message: "Grievance not found." });
  }

  // Only the owner can delete their grievance
  if (grievance.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to delete this grievance." });
  }

  await grievance.deleteOne();

  res.status(200).json({
    success: true,
    message: "Grievance deleted successfully!",
  });
};

module.exports = {
  createGrievance,
  getAllGrievances,
  searchGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
};
