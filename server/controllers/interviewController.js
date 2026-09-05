const InterviewSession = require("../models/InterviewSession");
const Question = require("../models/Question");

// =====================================
// Start Mock Interview
// =====================================
const startInterview = async (req, res) => {
  try {
    const {
      category = "Mixed",
      difficulty = "Mixed",
      questionCount = 5,
    } = req.body;

    // Validate question count
    const parsedQuestionCount = Number(questionCount);

    if (
      !Number.isInteger(parsedQuestionCount) ||
      parsedQuestionCount < 1 ||
      parsedQuestionCount > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Question count must be between 1 and 20",
      });
    }

    // Build question filter
    const filter = {};

    if (category !== "Mixed") {
      filter.category = category;
    }

    if (difficulty !== "Mixed") {
      filter.difficulty = difficulty;
    }

    // Get matching questions
    const availableQuestions = await Question.find(filter);

    if (availableQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the selected criteria",
      });
    }

    // Shuffle questions randomly
    const shuffledQuestions = availableQuestions.sort(
      () => Math.random() - 0.5
    );

    // Select requested number of questions
    const selectedQuestions = shuffledQuestions.slice(
      0,
      Math.min(parsedQuestionCount, shuffledQuestions.length)
    );

    // Create interview session
    const interviewSession = await InterviewSession.create({
      user: req.user._id,
      questions: selectedQuestions.map(
        (question) => question._id
      ),
      category,
      difficulty,
      totalQuestions: selectedQuestions.length,
    });

    res.status(201).json({
      success: true,
      message: "Mock interview started successfully",
      session: interviewSession,
      questions: selectedQuestions,
    });
  } catch (error) {
    console.error("Start Interview Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Interview History
// =====================================
const getInterviewHistory = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "category difficulty totalQuestions completedQuestions score duration status startedAt completedAt createdAt"
      );

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error("Get Interview History Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Export Controllers
// =====================================
module.exports = {
  startInterview,
  getInterviewHistory,
};