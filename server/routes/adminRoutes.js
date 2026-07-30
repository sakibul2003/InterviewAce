const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Question = require("../models/Question");

// =====================================
// Admin Dashboard Statistics
// =====================================
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestions = await Question.countDocuments();

    const easyQuestions = await Question.countDocuments({
      difficulty: "Easy",
    });

    const mediumQuestions = await Question.countDocuments({
      difficulty: "Medium",
    });

    const hardQuestions = await Question.countDocuments({
      difficulty: "Hard",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalQuestions,
        easyQuestions,
        mediumQuestions,
        hardQuestions,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =====================================
// Get All Users
// =====================================
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;