const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    category: {
      type: String,
      enum: ["DSA", "DBMS", "OOP", "OS", "CN", "HR", "Mixed"],
      default: "Mixed",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Mixed"],
      default: "Mixed",
    },

    totalQuestions: {
      type: Number,
      required: true,
      default: 0,
    },

    completedQuestions: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);