const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ===============================
// Load Environment Variables
// ===============================
dotenv.config();

// ===============================
// Database
// ===============================
const connectDB = require("./config/db");

// ===============================
// Routes
// ===============================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ===============================
// App
// ===============================
const app = express();

console.log("=== RUNNING INTERVIEWACE SERVER ===");

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Basic Test Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InterviewAce API is running",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ===============================
// Port
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// Start Server
// ===============================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();