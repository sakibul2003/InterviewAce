const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

console.log("protect =", protect);
console.log("getProfile =", getProfile);
console.log("updateProfile =", updateProfile);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;