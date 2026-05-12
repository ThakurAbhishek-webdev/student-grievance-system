const Grievance = require("../models/Grievance");

// CREATE BOOKING
const createGrievance = async (req, res) => {
  try {
    const {
      destinationName,
      travelDate,
      numberOfTravelers,
      packageType,
      price,
      bookingStatus,
      contactAddress,
    } = req.body;

    // Validation
    if (
      !destinationName ||
      !travelDate ||
      !numberOfTravelers ||
      !packageType ||
      !price ||
      !contactAddress
    ) {
      return res.status(400).json({
        message: "All booking fields are required.",
      });
    }

    // Create booking
    const grievance = await Grievance.create({
      destinationName,
      travelDate,
      numberOfTravelers,
      packageType,
      price,
      bookingStatus,
      contactAddress,

      // Temporary student id for demo
      student: "6820f7d8b2c3a123456789ab",
    });

    res.status(201).json(grievance);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BOOKINGS
const getGrievances = async (req, res) => {
  try {

    const grievances = await Grievance.find();

    res.status(200).json(grievances);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
};