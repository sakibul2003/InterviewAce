# InterviewAce

InterviewAce is an AI-powered interview preparation platform built with the MERN stack. The project aims to help users prepare for technical interviews through mock interviews, AI-powered feedback, coding practice, and performance tracking.

> 🚧 This project is currently under development.

## Features

- User Registration & Login
- Secure JWT Authentication
- User Profile Management
- Responsive User Interface
- Interview Question Practice
- AI-Powered Interview Assistance (Upcoming)
- Performance Tracking (Upcoming)

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

## Project Structure

```text
InterviewAce/
│
├── client/          # React Frontend
├── server/          # Express Backend
├── .gitignore
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/sakibul2003/InterviewAce.git
```

### Go to the project directory

```bash
cd InterviewAce
```

### Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

The backend runs at:

```
http://localhost:5000
```

## Current Progress

- ✅ Project Setup
- ✅ React + Express Configuration
- ✅ MongoDB Integration
- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- 🔄 User Dashboard
- 🔄 AI Interview Module
- 🔄 Interview Analytics

## Future Enhancements

- AI Mock Interviews
- Voice-based Interview Practice
- Resume Analysis
- Coding Challenges
- Interview History
- Admin Dashboard

## Author

**Sakibul Alam**

GitHub: https://github.com/sakibul2003