# ✈️ Travel Booking Management System

A full-stack MERN application that allows users to register, login, book travel packages, and manage bookings through an interactive dashboard.

---

# 🚀 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React.js, Vite, Tailwind CSS, Axios |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| Authentication | JWT + bcryptjs |

---

# 📁 Project Structure

```bash
sample/
│
├── backend/
│   ├── models/
│   │   ├── Student.js
│   │   └── Grievance.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── grievanceRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── grievanceController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   │
    │   ├── components/
    │   │   ├── GrievanceCard.jsx
    │   │   ├── GrievanceForm.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   └── Spinner.jsx
    │   │
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── RegisterPage.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    └── vite.config.js
