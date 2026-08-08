console.log("✅ userController.js loaded");

const User = require("../models/User");

// =====================================
// Get Profile
// =====================================
const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user,
  });
};

// =====================================
// Update Profile
// =====================================
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// Toggle Completed Question
// =====================================
const toggleCompletedQuestion = async (req, res) => {
  try {
    console.log("✅ Completed Question API called");
    console.log("User ID:", req.user?._id);
    console.log("Question ID:", req.body?.questionId);

    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Make sure existing users have the field
    if (!Array.isArray(user.completedQuestions)) {
      user.completedQuestions = [];
    }

    const alreadyCompleted = user.completedQuestions.some(
      (id) => id.toString() === questionId.toString()
    );

    if (alreadyCompleted) {
      user.completedQuestions =
        user.completedQuestions.filter(
          (id) => id.toString() !== questionId.toString()
        );
    } else {
      user.completedQuestions.push(questionId);
    }

    await user.save();

    console.log(
      "✅ Completed Questions:",
      user.completedQuestions
    );

    res.status(200).json({
      success: true,
      completed: !alreadyCompleted,
      completedQuestions: user.completedQuestions,
      message: alreadyCompleted
        ? "Question marked as incomplete"
        : "Question marked as completed",
    });
  } catch (error) {
    console.error(
      "❌ Toggle Completed Question Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  toggleCompletedQuestion,
};