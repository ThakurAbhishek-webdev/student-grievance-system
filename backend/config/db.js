// ============================================================
// config/db.js — MongoDB connection configuration
// ============================================================

const mongoose = require("mongoose");

// connectDB is an async function that connects to MongoDB Atlas
const connectDB = async () => {
  try {
    // Mongoose 7+ does not need useNewUrlParser or useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print error and exit process
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
