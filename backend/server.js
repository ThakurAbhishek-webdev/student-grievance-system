// ============================================================
// server.js — Entry point for the Node.js / Express backend
// ============================================================

// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");

// Import our database connection function
const connectDB = require("./config/db");

// Import route files
const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

// Import global error handler middleware
const errorHandler = require("./middleware/errorHandler");

// ─── Initialize Express App ──────────────────────────────────
const app = express();

// ─── Connect to MongoDB ──────────────────────────────────────
connectDB();

// ─── Middleware ──────────────────────────────────────────────

// Allow all origins (you can restrict this in production)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────

// Auth routes: /api/register, /api/login
app.use("/api", authRoutes);

// Grievance routes: /api/grievances/...
app.use("/api/grievances", grievanceRoutes);

// ─── Health Check Route ──────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Student Grievance Management System API is running ✅" });
});

// ─── Global Error Handler (must be last) ─────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
