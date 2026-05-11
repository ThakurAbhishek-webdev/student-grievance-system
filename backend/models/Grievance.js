// ============================================================
// models/Grievance.js — Mongoose schema for Grievance records
// ============================================================

const mongoose = require("mongoose");

// Define the Grievance schema
const grievanceSchema = new mongoose.Schema(
  {
    // Short title of the grievance
    title: {
      type: String,
      required: [true, "Please provide a title for the grievance"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    // Detailed description of the grievance
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },

    // Category helps in routing the grievance to the right department
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
        values: ["Academic", "Hostel", "Transport", "Other"],
        message: "Category must be Academic, Hostel, Transport, or Other",
      },
    },

    // Date the grievance is related to (defaults to today)
    date: {
      type: Date,
      default: Date.now,
    },

    // Current resolution status
    status: {
      type: String,
      enum: {
        values: ["Pending", "Resolved"],
        message: 'Status must be either "Pending" or "Resolved"',
      },
      default: "Pending", // New grievances start as Pending
    },

    // Reference to the Student who created this grievance
    // This creates a relationship between Grievance and Student collections
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Refers to the Student model
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Grievance", grievanceSchema);
