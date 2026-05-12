// import axios from "axios";

// // Create a reusable axios instance pointing to our backend
// const API = axios.create({
//   baseURL: "https://student-grievance-system-8pbx.onrender.com/api",
// });

// // ─── Request Interceptor ─────────────────────────────────────
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("grievanceToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ─── Response Interceptor ────────────────────────────────────
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("grievanceToken");
//       localStorage.removeItem("grievanceUser");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("grievanceToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;