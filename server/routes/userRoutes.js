const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  toggleBookmark,
  toggleCompletedQuestion,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put(
  "/bookmark",
  protect,
  toggleBookmark
);

router.put(
  "/completed-question",
  protect,
  toggleCompletedQuestion
);

module.exports = router;