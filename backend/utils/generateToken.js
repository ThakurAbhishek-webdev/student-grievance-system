// ============================================================
// utils/generateToken.js — JWT token generation utility
// ============================================================

const jwt = require("jsonwebtoken");

/**
 * generateToken — Creates a signed JWT token for a given user ID
 *
 * @param {string} userId - The MongoDB _id of the authenticated student
 * @returns {string} - Signed JWT token string
 *
 * The token is valid for 7 days. After that, the user must log in again.
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },            // Payload — data embedded in the token
    process.env.JWT_SECRET,    // Secret key from .env to sign the token
    { expiresIn: "7d" }       // Token expires in 7 days
  );
};

module.exports = generateToken;
