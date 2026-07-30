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

// Add Question
router.post("/", addQuestion);

// Get All Questions
router.get("/", getQuestions);

// Get Single Question
router.get("/:id", getQuestionById);

// Update Question
router.put("/:id", updateQuestion);

// Delete Question
router.delete("/:id", deleteQuestion);

module.exports = router;