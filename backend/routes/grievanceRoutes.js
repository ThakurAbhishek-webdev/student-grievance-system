const express = require("express");
const router = express.Router();

const {
  createGrievance,
  getGrievances,
} = require("../controllers/grievanceController");

// GET all bookings
router.get("/", getGrievances);

// CREATE booking
router.post("/", createGrievance);

module.exports = router;