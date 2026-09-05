const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  startInterview,
} = require("../controllers/interviewController");

// =====================================
// Start Mock Interview
// =====================================
router.post(
  "/start",
  protect,
  startInterview
);

module.exports = router;