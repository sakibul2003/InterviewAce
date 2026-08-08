console.log("✅ QUESTION ROUTES LOADED");

const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ===============================
// Admin Only: Add Question
// ===============================
router.post("/", protect, adminOnly, addQuestion);

// ===============================
// Everyone: Get All Questions
// ===============================
router.get("/", getQuestions);

// ===============================
// Everyone: Get Single Question
// ===============================
router.get("/:id", getQuestionById);

// ===============================
// Admin Only: Update Question
// ===============================
router.put("/:id", protect, adminOnly, updateQuestion);

// ===============================
// Admin Only: Delete Question
// ===============================
router.delete("/:id", protect, adminOnly, deleteQuestion);

module.exports = router;