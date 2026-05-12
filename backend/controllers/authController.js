// // ============================================================
// // controllers/authController.js — Auth logic (Register & Login)
// // ============================================================

// const Student = require("../models/Student");
// const generateToken = require("../utils/generateToken");

// // ─────────────────────────────────────────────────────────────
// // @desc    Register a new student
// // @route   POST /api/register
// // @access  Public (no token needed)
// // ─────────────────────────────────────────────────────────────
// const registerStudent = async (req, res) => {
//   // Destructure name, email, password from request body
//   const { name, email, password } = req.body;

//   // Basic validation: ensure all fields are provided
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Please provide all fields: name, email, password" });
//   }

//   // Check if a student with this email already exists
//   const existingStudent = await Student.findOne({ email });
//   if (existingStudent) {
//     return res.status(400).json({ message: "An account with this email already exists." });
//   }

//   // Create a new Student document
//   // Note: password hashing happens automatically in the Student model's pre-save hook
//   const student = await Student.create({ name, email, password });

//   // Respond with the new student's info and a JWT token
//   res.status(201).json({
//     success: true,
//     message: "Registration successful!",
//     token: generateToken(student._id),
//     user: {
//       _id: student._id,
//       name: student.name,
//       email: student.email,
//     },
//   });
// };

// // ─────────────────────────────────────────────────────────────
// // @desc    Login an existing student
// // @route   POST /api/login
// // @access  Public (no token needed)
// // ─────────────────────────────────────────────────────────────
// const loginStudent = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate that email and password are provided
//   if (!email || !password) {
//     return res.status(400).json({ message: "Please provide email and password" });
//   }

//   // Find the student by email (case-insensitive due to lowercase: true in schema)
//   const student = await Student.findOne({ email });

//   // If no student found OR password doesn't match → invalid credentials
//   // We use the same error message for both to avoid revealing whether email exists
//   if (!student || !(await student.matchPassword(password))) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   // Credentials are valid — return token and user info
//   res.status(200).json({
//     success: true,
//     message: "Login successful!",
//     token: generateToken(student._id),
//     user: {
//       _id: student._id,
//       name: student.name,
//       email: student.email,
//     },
//   });
// };

// ============================================================
// controllers/authController.js — Auth logic (Register & Login)
// ============================================================

const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

// ─────────────────────────────────────────────────────────────
// @desc    Register a new student
// @route   POST /api/register
// @access  Public
// ─────────────────────────────────────────────────────────────
const registerStudent = async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;

  // Validation
  if (!name || !email || !password || !mobileNumber) {
    return res.status(400).json({
      message:
        "Please provide all fields: name, email, password, mobile number",
    });
  }

  // Check existing user
  const existingStudent = await Student.findOne({ email });

  if (existingStudent) {
    return res.status(400).json({
      message: "An account with this email already exists.",
    });
  }

  // Create student
  const student = await Student.create({
    name,
    email,
    mobileNumber,
    password,
  });

  // Response
  res.status(201).json({
    success: true,
    message: "Registration successful!",
    token: generateToken(student._id),
    user: {
      _id: student._id,
      name: student.name,
      email: student.email,
      mobileNumber: student.mobileNumber,
    },
  });
};

// ─────────────────────────────────────────────────────────────
// @desc    Login an existing student
// @route   POST /api/login
// @access  Public
// ─────────────────────────────────────────────────────────────
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  // Find student
  const student = await Student.findOne({ email });

  // Invalid credentials
  if (!student || !(await student.matchPassword(password))) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Success response
  res.status(200).json({
    success: true,
    message: "Login successful!",
    token: generateToken(student._id),
    user: {
      _id: student._id,
      name: student.name,
      email: student.email,
      mobileNumber: student.mobileNumber,
    },
  });
};

module.exports = {
  registerStudent,
  loginStudent,
};