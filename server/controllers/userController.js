console.log("✅ userController.js loaded");

const User = require("../models/User");

// =====================================
// Get Profile
// =====================================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Welcome to your profile!",
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
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
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Toggle Bookmark
// =====================================
const toggleBookmark = async (req, res) => {
  try {
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

    if (!Array.isArray(user.bookmarks)) {
      user.bookmarks = [];
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === questionId.toString()
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== questionId.toString()
      );
    } else {
      user.bookmarks.push(questionId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      bookmarked: !alreadyBookmarked,
      bookmarks: user.bookmarks,
      message: alreadyBookmarked
        ? "Question removed from bookmarks"
        : "Question bookmarked successfully",
    });
  } catch (error) {
    console.error("Toggle Bookmark Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Toggle Completed Question
// =====================================
const toggleCompletedQuestion = async (req, res) => {
  try {
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

    if (!Array.isArray(user.completedQuestions)) {
      user.completedQuestions = [];
    }

    const alreadyCompleted = user.completedQuestions.some(
      (id) => id.toString() === questionId.toString()
    );

    if (alreadyCompleted) {
      user.completedQuestions = user.completedQuestions.filter(
        (id) => id.toString() !== questionId.toString()
      );
    } else {
      user.completedQuestions.push(questionId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      completed: !alreadyCompleted,
      completedQuestions: user.completedQuestions,
      message: alreadyCompleted
        ? "Question marked as incomplete"
        : "Question marked as completed",
    });
  } catch (error) {
    console.error("Toggle Completed Question Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  toggleBookmark,
  toggleCompletedQuestion,
};