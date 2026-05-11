# 🎓 Student Grievance Management System

A full-stack MERN application that allows college students to submit, track, and manage their grievances securely.

---

## 🚀 Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React.js, Vite, Tailwind CSS, Axios     |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB Atlas (Mongoose ODM)            |
| Auth       | JWT (JSON Web Tokens) + bcryptjs        |

---

## 📁 Project Structure

```
sample/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Register & Login logic
│   │   └── grievanceController.js  # CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT protection middleware
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── Student.js          # Student schema
│   │   └── Grievance.js        # Grievance schema
│   ├── routes/
│   │   ├── authRoutes.js       # /api/register, /api/login
│   │   └── grievanceRoutes.js  # /api/grievances CRUD
│   ├── utils/
│   │   └── generateToken.js    # JWT generation utility
│   ├── .env                    # Environment variables
│   ├── server.js               # Express entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js        # Axios instance with interceptors
    │   ├── components/
    │   │   ├── GrievanceCard.jsx
    │   │   ├── GrievanceForm.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   └── Spinner.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account (free tier works)
- Git installed

---

### Step 1 — Clone / open the project
```bash
cd sample
```

### Step 2 — Set up the Backend

```bash
cd backend
npm install
```

Create/edit the `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/grievanceDB?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev       # with nodemon (auto-reload)
# or
npm start         # without nodemon
```

---

### Step 3 — Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**  
Backend runs at: **http://localhost:5000**

---

## 🌿 MongoDB Atlas Setup Guide

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up (free)
2. Create a new **project** and click **"Build a Cluster"** → choose **Free tier (M0)**
3. Choose a cloud provider and region → click **Create**
4. Under **Security → Database Access**: Create a database user with a username and password
5. Under **Security → Network Access**: Click **"Add IP Address"** → choose **"Allow Access from Anywhere"** (0.0.0.0/0) for development
6. Under **Deployment → Database → Connect**: Click your cluster → **Connect** → **"Connect your application"**
7. Copy the connection string and replace `<password>` with your actual password
8. Paste it into your `.env` as `MONGO_URI`

---

## 🔌 API Reference

### Auth Endpoints

| Method | Endpoint         | Description              | Auth Required |
|--------|------------------|--------------------------|---------------|
| POST   | `/api/register`  | Register new student     | ❌            |
| POST   | `/api/login`     | Login & get JWT token    | ❌            |

### Grievance Endpoints

| Method | Endpoint                          | Description                   | Auth Required |
|--------|-----------------------------------|-------------------------------|---------------|
| POST   | `/api/grievances`                 | Submit new grievance           | ✅            |
| GET    | `/api/grievances`                 | Get all user's grievances      | ✅            |
| GET    | `/api/grievances/:id`             | Get single grievance by ID     | ✅            |
| PUT    | `/api/grievances/:id`             | Update grievance               | ✅            |
| DELETE | `/api/grievances/:id`             | Delete grievance               | ✅            |
| GET    | `/api/grievances/search?title=xy` | Search grievances by title     | ✅            |

---

## 🧪 API Testing Examples (cURL)

### Register
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Sharma","email":"rahul@college.edu","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@college.edu","password":"password123"}'
```

### Submit Grievance (replace TOKEN with JWT from login)
```bash
curl -X POST http://localhost:5000/api/grievances \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Library closed early","description":"Library closed at 6pm instead of 9pm without notice","category":"Academic"}'
```

### Get All Grievances
```bash
curl -X GET http://localhost:5000/api/grievances \
  -H "Authorization: Bearer TOKEN"
```

### Search Grievances
```bash
curl -X GET "http://localhost:5000/api/grievances/search?title=library" \
  -H "Authorization: Bearer TOKEN"
```

---

## ☁️ Render Deployment Guide (Backend)

1. Push your code to GitHub
2. Go to [https://render.com](https://render.com) and sign up
3. Click **"New"** → **"Web Service"**
4. Connect your GitHub repo
5. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Under **Environment Variables**, add:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = production
7. Click **Deploy**
8. Copy the deployed URL and update `baseURL` in `frontend/src/api/axios.js`

---

## ☁️ Vercel Deployment Guide (Frontend)

1. Push frontend code to GitHub
2. Go to [https://vercel.com](https://vercel.com) and sign up
3. Click **"New Project"** → Import your GitHub repo
4. Set **Root Directory** to `frontend`
5. Vercel auto-detects Vite — click **Deploy**
6. Update `baseURL` in `src/api/axios.js` to your Render backend URL

---

## 🐙 GitHub Deployment Guide

```bash
# Initialize git in the project root
git init
git add .
git commit -m "Initial commit: Student Grievance Management System"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/grievance-system.git
git branch -M main
git push -u origin main
```

---

## 🔐 Sample .env (Backend)

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/grievanceDB?retryWrites=true&w=majority
JWT_SECRET=mySecretKey_changeThis_inProduction_abc123xyz
NODE_ENV=development
```

> ⚠️ **Never commit your `.env` file to GitHub!** Add it to `.gitignore`.

---

## ✨ Features

- 🔐 JWT-based secure authentication
- 📝 Submit, edit, delete grievances
- 🔍 Search grievances by title
- 🏷️ Filter by status (Pending/Resolved) and category
- 📊 Stats dashboard (total, pending, resolved)
- 🌙 Dark mode UI with glassmorphism design
- 📱 Fully responsive for mobile/tablet/desktop
- 🔔 Toast notifications for all actions
- ⚡ Loading spinners on async operations
- 🛡️ Protected routes — unauthenticated users redirected to login
- 🚫 Auto-logout on expired/invalid token

---

## 📜 License

MIT License — free to use and modify.
