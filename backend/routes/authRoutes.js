// ============================================================
// routes/authRoutes.js — Authentication route definitions
// ============================================================

const express = require("express");
const router = express.Router();

// Import auth controller functions
const { registerStudent, loginStudent } = require("../controllers/authController");

// POST /api/register — Create new student account
router.post("/register", registerStudent);

// POST /api/login — Login and receive JWT token
router.post("/login", loginStudent);

module.exports = router;
