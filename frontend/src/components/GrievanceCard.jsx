import React from "react";

const GrievanceCard = ({ grievance }) => {
  return (
    <div className="glass-card p-5 space-y-3">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          {grievance.destinationName}
        </h2>

        <span className="badge-resolved">
          {grievance.bookingStatus}
        </span>
      </div>

      <p className="text-slate-300">
        <strong>Date:</strong>{" "}
        {new Date(
          grievance.travelDate
        ).toLocaleDateString()}
      </p>

      <p className="text-slate-300">
        <strong>Travelers:</strong>{" "}
        {grievance.numberOfTravelers}
      </p>

      <p className="text-slate-300">
        <strong>Package:</strong>{" "}
        {grievance.packageType}
      </p>

      <p className="text-slate-300">
        <strong>Price:</strong> ₹
        {grievance.price}
      </p>

      <p className="text-slate-300">
        <strong>Address:</strong>{" "}
        {grievance.contactAddress}
      </p>
    </div>
  );
};

export default GrievanceCard;