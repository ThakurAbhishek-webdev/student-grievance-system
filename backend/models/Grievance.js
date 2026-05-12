const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    destinationName: {
      type: String,
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    numberOfTravelers: {
      type: Number,
      required: true,
    },

    packageType: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    contactAddress: {
      type: String,
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Grievance",
  grievanceSchema
);