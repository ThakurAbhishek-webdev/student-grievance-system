import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import GrievanceCard from "../components/GrievanceCard";
import GrievanceForm from "../components/GrievanceForm";

const Dashboard = () => {

  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {

      const res = await axios.get("/grievances");

      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // CREATE BOOKING
  const handleCreateBooking = async (data) => {
    try {

      await axios.post("/grievances", data);

      fetchBookings();

      setShowForm(false);

      alert("Travel package booked!");

    } catch (error) {

      console.log(error);

      alert("Operation failed.");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("grievanceToken");
    localStorage.removeItem("grievanceUser");

    window.location.href = "/login";
  };

  // STATS
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => b.bookingStatus === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (b) => b.bookingStatus === "Confirmed"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      {/* NAVBAR */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold text-indigo-400">
              Travel Booking System
            </h1>

            <p className="text-slate-400 text-sm">
              Student Dashboard
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-700 px-5 py-2 rounded-xl font-semibold transition"
            >
              Logout
            </button>

          </div>

        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HERO */}
        <div className="mb-10">

          <h1 className="text-5xl font-extrabold mb-3">
            Welcome, <span className="text-indigo-400">Abhishek!</span>
          </h1>

          <p className="text-slate-400 text-lg">
            Manage and track all your travel bookings.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL */}
          <div className="bg-slate-900/70 border border-indigo-500/30 rounded-3xl p-6 shadow-xl">

            <p className="text-slate-400 uppercase tracking-wider text-sm">
              Total Bookings
            </p>

            <div className="flex justify-between items-center mt-4">

              <h2 className="text-6xl font-bold">
                {totalBookings}
              </h2>

              <span className="text-5xl">
                ✈️
              </span>

            </div>
          </div>

          {/* PENDING */}
          <div className="bg-slate-900/70 border border-yellow-500/30 rounded-3xl p-6 shadow-xl">

            <p className="text-yellow-400 uppercase tracking-wider text-sm">
              Pending
            </p>

            <div className="flex justify-between items-center mt-4">

              <h2 className="text-6xl font-bold">
                {pendingBookings}
              </h2>

              <span className="text-5xl">
                ⏳
              </span>

            </div>
          </div>

          {/* CONFIRMED */}
          <div className="bg-slate-900/70 border border-green-500/30 rounded-3xl p-6 shadow-xl">

            <p className="text-green-400 uppercase tracking-wider text-sm">
              Confirmed
            </p>

            <div className="flex justify-between items-center mt-4">

              <h2 className="text-6xl font-bold">
                {confirmedBookings}
              </h2>

              <span className="text-5xl">
                ✅
              </span>

            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-end mb-8">

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-2xl font-bold text-lg transition shadow-lg"
          >
            + New Booking
          </button>

        </div>

        {/* FORM */}
        {showForm && (

          <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 mb-10 shadow-2xl">

            <GrievanceForm
              onSubmit={handleCreateBooking}
            />

          </div>
        )}

        {/* BOOKINGS */}
        {bookings.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {bookings.map((booking) => (

              <GrievanceCard
                key={booking._id}
                grievance={booking}
              />
            ))}

          </div>

        ) : (

          <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-16 text-center shadow-xl">

            <div className="text-7xl mb-5">
              ✈️
            </div>

            <h2 className="text-4xl font-bold mb-4">
              No bookings found
            </h2>

            <p className="text-slate-400 text-lg">
              Book your first travel package now.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;