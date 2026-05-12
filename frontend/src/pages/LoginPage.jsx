// ============================================================
// src/pages/LoginPage.jsx — Student Login Page
// ============================================================

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import Spinner from "../components/Spinner";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Form state
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors]     = useState({});
//   const [loading, setLoading]   = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Client-side validation
//   const validate = () => {
//     const errs = {};
//     if (!formData.email.trim())    errs.email    = "Email is required.";
//     if (!formData.password.trim()) errs.password = "Password is required.";
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }

//     setLoading(true);
//     try {
//       const { data } = await API.post("/login", formData);
//       // Save token + user in context (and localStorage)
//       login(data.user, data.token);
//       toast.success(`Welcome back, ${data.user.name}! 👋`);
//       navigate("/dashboard");
//     } catch (err) {
//       const msg = err.response?.data?.message || "Login failed. Please try again.";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4
//                     bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

//       {/* Decorative blobs */}
//       <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="w-full max-w-md animate-slide-up relative z-10">

//         {/* ── Card ─────────────────────────────────────────── */}
//         <div className="glass-card p-8">

//           {/* Logo & Title */}
//           <div className="text-center mb-8">
//             <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600
//                             rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
//             <p className="text-slate-400 text-sm mt-1">Sign in to your student portal</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} noValidate className="space-y-5">

//             {/* Email */}
//             <div>
//               <label htmlFor="login-email" className="block text-sm font-medium text-slate-300 mb-1.5">
//                 Email Address
//               </label>
//               <input
//                 id="login-email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="student@college.edu"
//                 className={`input-field ${errors.email ? "border-rose-500 focus:ring-rose-500" : ""}`}
//               />
//               {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-1.5">
//                 Password
//               </label>
//               <input
//                 id="login-password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className={`input-field ${errors.password ? "border-rose-500 focus:ring-rose-500" : ""}`}
//               />
//               {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
//             </div>

//             {/* Submit */}
//             <button
//               id="login-submit-btn"
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
//             >
//               {loading ? (
//                 <><Spinner size="h-4 w-4" color="border-white" /> Signing in...</>
//               ) : (
//                 "Sign In →"
//               )}
//             </button>
//           </form>

//           {/* Register link */}
//           <p className="text-center text-slate-400 text-sm mt-6">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
//               Register here
//             </Link>
//           </p>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-slate-600 text-xs mt-6">
//           Student Grievance Management System © {new Date().getFullYear()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// ============================================================
// src/pages/LoginPage.jsx — Travel Booking Login Page
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation
  const validate = () => {
    const errs = {};

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      errs.password = "Password is required.";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/login", formData);

      login(data.user, data.token);

      toast.success(`Welcome back, ${data.user.name}! 👋`);

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed. Please try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4
                 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up relative z-10">

        {/* Card */}
        <div className="glass-card p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div
              className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600
                         rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Travel Booking Login
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Sign in to your travel booking account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Email Address
              </label>

              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="traveler@gmail.com"
                className={`input-field ${
                  errors.email
                    ? "border-rose-500 focus:ring-rose-500"
                    : ""
                }`}
              />

              {errors.email && (
                <p className="text-rose-400 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>

              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`input-field ${
                  errors.password
                    ? "border-rose-500 focus:ring-rose-500"
                    : ""
                }`}
              />

              {errors.password && (
                <p className="text-rose-400 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Spinner
                    size="h-4 w-4"
                    color="border-white"
                  />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Travel Package Booking Management System ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;