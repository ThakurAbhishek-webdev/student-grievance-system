// // ============================================================
// // models/Student.js — Mongoose schema for Student users
// // ============================================================

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// // Define the Student schema
// const studentSchema = new mongoose.Schema(
//   {
//     // Student's full name
//     name: {
//       type: String,
//       required: [true, "Please provide your name"],
//       trim: true,
//       minlength: [2, "Name must be at least 2 characters"],
//     },

//     // Student's email — must be unique across the collection
//     email: {
//       type: String,
//       required: [true, "Please provide your email"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid email address",
//       ],
//     },

//     // Hashed password — never store plain text passwords!
//     password: {
//       type: String,
//       required: [true, "Please provide a password"],
//       minlength: [6, "Password must be at least 6 characters"],
//     },
//   },
//   {
//     // Automatically add createdAt and updatedAt timestamps
//     timestamps: true,
//   }
// );

// // ─── Pre-save Hook: Hash Password Before Saving ──────────────
// // This runs automatically before every .save() call
// studentSchema.pre("save", async function (next) {
//   // Only hash if the password field was modified (avoids re-hashing on updates)
//   if (!this.isModified("password")) return next();

//   // Generate a salt (random data) with 10 rounds of complexity
//   const salt = await bcrypt.genSalt(10);

//   // Hash the plain-text password with the salt
//   this.password = await bcrypt.hash(this.password, salt);

//   next(); // Continue to the next middleware / save operation
// });

// // ─── Instance Method: Compare Passwords ─────────────────────
// // Used during login to verify if entered password matches stored hash
// studentSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Export the model so it can be used in controllers
// module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);