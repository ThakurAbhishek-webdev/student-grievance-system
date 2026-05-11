// ============================================================
// middleware/errorHandler.js — Global Error Handling Middleware
// ============================================================

/**
 * errorHandler — Centralized error handler for all Express routes
 *
 * This middleware is registered LAST in server.js (after all routes).
 * Whenever a route calls next(error) or throws an error, it lands here.
 *
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function (required for error middleware)
 */
const errorHandler = (err, req, res, next) => {
  // Log the error stack to the console for debugging
  console.error("❌ Error:", err.message);

  // Use the error's own status code if set, otherwise default to 500 (Server Error)
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ─── Handle Specific MongoDB / Mongoose Errors ────────────

  // Mongoose cast error (e.g., invalid MongoDB ObjectId format)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Resource not found with ID: ${err.value}`;
  }

  // Mongoose duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0]; // e.g., "email"
    message = `An account with this ${field} already exists.`;
  }

  // Mongoose validation error (e.g., missing required field)
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Collect all validation messages into a single string
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please log in again.";
  }

  // Send the final error response as JSON
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
