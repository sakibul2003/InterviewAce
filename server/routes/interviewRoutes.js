const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  startInterview,
  getInterviewHistory,
} = require("../controllers/interviewController");

// =====================================
// Start Mock Interview
// =====================================
router.post(
  "/start",
  protect,
  startInterview
);
router.get(
  "/history",
  protect,
  getInterviewHistory
);

module.exports = router;