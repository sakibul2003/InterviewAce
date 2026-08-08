const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  toggleCompletedQuestion,
} = require("../controllers/userController");

console.log("✅ userController.js functions loaded");
console.log("protect =", protect);
console.log("getProfile =", getProfile);
console.log("updateProfile =", updateProfile);
console.log(
  "toggleCompletedQuestion =",
  toggleCompletedQuestion
);

// Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Completed Question
router.put(
  "/completed-question",
  protect,
  toggleCompletedQuestion
);

module.exports = router;