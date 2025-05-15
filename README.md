# 🎓 Student Management System

A full-stack web application that allows administrators, teachers, and students to manage academic data efficiently. Built using (MongoDB, Express.js, React + Vite, Node.js) with a clean and responsive **Tailwind CSS** design.

---

## 🚀 Tech Stack & Tools

| Tech                                                                                             | Description                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)                  | Frontend JavaScript library for building UI |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first CSS framework                 |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)            | JavaScript runtime for backend              |
| ![Express](https://img.shields.io/badge/-Express.js-black?logo=express&logoColor=white)          | Web framework for Node.js                   |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)            | NoSQL database                              |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-800000?logo=mongodb&logoColor=white)          | MongoDB ODM for schema-based models         |

---

## 📚 Features

### 👨‍💼 Admin Role

- ✅ View dashboard
- ✅ Manage users
- ✅ Manage departments
- ✅ Manage classrooms
- ✅ Manage subjects
- ✅ Manage course
- ✅ Manage register courses

### 👨‍🏫 Teacher Role

- ✅ Authentication & Authorization
- ✅ View class
- ✅ View students list in that class
- ✅ View department
- ✅ View teachers list in that department
- ✅ View assigned course by Admin
- ✅ View students in specific teacher course
- ✅ Update student course for a course
- ✅ Update profile

### 👩‍🎓 Student Role

- ✅ Authentication & Authorization
- ✅ View enrolled courses
- ✅ View class
- ✅ View students list in that class
- ✅ View department
- ✅ View teachers list in that department
- ✅ View subject
- ✅ View score from course
- ✅ Access and register available course
- ✅ Update profile

### ⚙️ General

- 🔒 Authentication with JWT
- 🔐 Secure password hashing
- 📑 RESTful API structure
- 🧩 Organized folder structure

---

## ⚙️ Project Structure

```bash
student-management/
├── backend/                  # Backend using Node + Express.js + Mongoose
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── lib/              # DB connection & utils
│   │   ├── models/           # Database schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, error handling
│   │   └── index.js          # Main backend file
│
├── frontend/                 # React client with Tailwind
│   ├── public/               # Images and static assets
│   ├── src/
│   │   ├── action/           # Zustand actions
│   │   ├── components/       # Admin and User components
│   │   ├── lib/              # Axios config & utilities
│   │   ├── pages/            # Admin and User pages
│   │   ├── routes/           # Route handlers and guards
│   │   ├── store/            # Zustand state management
│   │   ├── App.jsx           # App root with routes
│   │   ├── index.css         # Tailwind imports
│   │   └── main.jsx          # Main entry point
│   └── index.html            # Frontend entry HTML
```

---

## 🛠️ Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/TaDat10062002/student-management.git
cd student-management
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file with the following:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret_key
```

Run backend:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 🧪 Example API Routes (Backend)

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register user         |
| POST   | `/api/auth/login`    | Login user            |
| GET    | `/api/users/`        | Get all users (Admin) |
| POST   | `/api/courses/`      | Create a new course   |
| GET    | `/api/courses/:id`   | View course details   |
| PUT    | `/api/users/:id`     | Update user           |
| DELETE | `/api/users/:id`     | Delete user           |

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based route protection (Admin, Teacher, Student)
- Middleware for access validation

---

## 👨‍💻 Author

- Tạ Linh Đạt
- 🌐 [GitHub Profile](https://github.com/TaDat10062002)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
