# 🚀 InterviewAce

**InterviewAce** is a full-stack interview preparation platform built with the **MERN stack**. It helps users practice technical and HR interview questions, bookmark important questions, track completed questions, monitor preparation progress, and manage interview content through an administrator dashboard.

The project was developed as a full-stack web application with **React, Express.js, MongoDB, JWT authentication, and role-based authorization**.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* Secure password hashing with `bcryptjs`
* JWT-based authentication
* Protected user routes
* Role-based authorization
* Separate Admin access
* Persistent login session
* Secure logout

### 📚 Interview Questions

* Browse interview questions
* Search questions by title
* Filter by category
* Filter by difficulty
* View complete answers
* Responsive question cards
* Easy, Medium, and Hard difficulty levels
* Technical and HR interview categories

### ⭐ Bookmark System

* Bookmark important questions
* Remove questions from bookmarks
* Dedicated Bookmarks page
* Persistent bookmarks using browser local storage

### ✅ Preparation Tracking

* Mark questions as completed
* Mark completed questions as incomplete
* Track completed questions
* Calculate preparation progress
* Display remaining questions
* Dashboard progress percentage

### 📊 User Dashboard

The dashboard provides:

* Total questions
* Completed questions
* Remaining questions
* Bookmarked questions
* Preparation progress percentage
* Difficulty distribution
* Quick navigation actions

### 👤 User Profile

* Display user information
* Display account role
* Display account status
* Display authentication status
* Display completed question count
* InterviewAce overview

### 👨‍💼 Admin Dashboard

Administrators can:

* View total registered users
* View total questions
* View question difficulty statistics
* Add interview questions
* Edit interview questions
* Delete interview questions
* Manage the question library

### 🔔 User Experience

* Toast notifications
* Loading indicators
* Form validation
* Error handling
* Responsive design
* Mobile-friendly navigation
* Dark mode
* Confirmation before deleting questions

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* Role-based authorization

---

## 🏗️ System Architecture

```text
                    InterviewAce
                         │
              ┌──────────┴──────────┐
              │                     │
         React Frontend        Express Backend
              │                     │
           Vite + UI             REST API
              │                     │
              └──────────┬──────────┘
                         │
                     MongoDB
                         │
                  Mongoose ODM
```

---

## 📁 Project Structure

```text
InterviewAce/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Questions.jsx
│   │   │   ├── Bookmarks.jsx
│   │   │   ├── AddQuestion.jsx
│   │   │   ├── EditQuestion.jsx
│   │   │   └── AdminPanel.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact folder structure may vary slightly depending on the latest project files.

---

## 🔑 Authentication Flow

InterviewAce uses JWT authentication.

```text
User
 │
 ▼
Login / Register
 │
 ▼
Express API
 │
 ▼
MongoDB
 │
 ▼
JWT Token
 │
 ▼
Browser localStorage
 │
 ▼
Protected React Routes
```

Protected routes are handled using:

* `PrivateRoute`
* `AdminRoute`

Regular users can access protected user features, while administrator functionality requires the `admin` role.

---

## 👨‍💼 Admin Authorization

Admin functionality is protected at both the frontend and backend levels.

Administrators can access:

```text
/admin
/add-question
/edit-question/:id
```

Administrative question management includes:

```text
Create → Read → Update → Delete
```

This provides a complete CRUD workflow for interview questions.

---

## 📊 Interview Question Categories

Currently supported categories include:

* DSA
* DBMS
* OOP
* OS
* CN
* HR

Difficulty levels:

* Easy
* Medium
* Hard

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sakibul2003/InterviewAce.git
```

### 2. Enter the Project

```bash
cd InterviewAce
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Example

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/interviewace
JWT_SECRET=your_secure_secret
```

> Never commit your real `.env` file or secret keys to GitHub.

---

## ▶️ Running the Application

### Start the Backend

Open a terminal:

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend in your browser:

```text
http://localhost:5173
```

---

## 🧪 Testing

The application has been tested for:

* User registration
* User login
* Logout
* JWT authentication
* Protected routes
* Admin authorization
* Question creation
* Question editing
* Question deletion
* Question searching
* Category filtering
* Difficulty filtering
* Bookmark functionality
* Completed question tracking
* Dashboard statistics
* Profile information
* Toast notifications
* Loading states
* Responsive layouts
* Dark mode

---

## 📱 Responsive Design

InterviewAce is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The interface uses responsive Bootstrap layouts and mobile-friendly navigation.

---

## 🔮 Future Enhancements

Possible future improvements include:

* 🤖 AI-powered mock interviews
* 🎤 Voice-based interview practice
* 📄 Resume analysis
* 💻 Coding challenges
* 📈 Advanced interview analytics
* 📝 Interview history
* 🏆 User achievement system
* 🤖 AI-generated interview feedback

---

## 🚀 Deployment

The planned production deployment architecture is:

```text
React + Vite
     │
     ▼
  Vercel
     │
     ▼
Frontend
     │
     ▼
Render
     │
     ▼
Express REST API
     │
     ▼
MongoDB
```

Deployment configuration will be added after the project is prepared for production.

---

## 🎯 Project Goals

InterviewAce was developed to demonstrate practical full-stack development skills, including:

* Frontend development with React
* REST API development
* Database integration
* Authentication
* Authorization
* CRUD operations
* State management
* Error handling
* Responsive UI design
* Full-stack project architecture
* Deployment preparation

---

## 👨‍💻 Author

**Sakibul Alam**

GitHub:
https://github.com/sakibul2003

---

## ⭐ Project Status

**Current Status: Update 4 — Core Features Completed**

The main InterviewAce platform is functional and has completed its core feature development and UI testing.

The next stage is **production preparation and deployment**.
