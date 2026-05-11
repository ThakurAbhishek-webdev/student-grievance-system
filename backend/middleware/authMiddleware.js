// ============================================================
// middleware/authMiddleware.js — JWT Authentication Middleware
// ============================================================

const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

/**
 * protect — Middleware to guard protected routes
 *
 * How it works:
 * 1. Checks if the request has an Authorization header with a Bearer token
 * 2. Verifies the token using our JWT secret
 * 3. Finds the student in DB and attaches their info to req.user
 * 4. If anything fails, returns a 401 Unauthorized response
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  // Example header: "Authorization: Bearer eyJhbGci..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token (remove "Bearer " prefix)
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      // This will throw an error if token is invalid or expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the student by ID stored in the token payload
      // Select("-password") excludes the password field from the result
      req.user = await Student.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found. Unauthorized." });
      }

      // Token is valid — proceed to the next middleware/controller
      next();
    } catch (error) {
      // Token is invalid or expired
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized. Token failed." });
    }
  }

  // No token provided at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized. No token provided." });
  }
};

module.exports = { protect };
