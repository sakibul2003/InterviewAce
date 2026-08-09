
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  // ===============================
  // User
  // ===============================
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "Invalid user data:",
      error
    );
  }

  // ===============================
  // State
  // ===============================
  const [questions, setQuestions] = useState([]);
  const [bookmarkedCount, setBookmarkedCount] =
    useState(0);
  const [completedQuestions, setCompletedQuestions] =
    useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Dashboard Data
  // ===============================
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // -------------------------------
      // Fetch Questions
      // -------------------------------
      const questionRes =
        await API.get("/questions");

      setQuestions(
        questionRes.data?.questions || []
      );

      // -------------------------------
      // Fetch Bookmarks
      // -------------------------------
      const savedBookmarks =
        JSON.parse(
          localStorage.getItem("bookmarks")
        ) || [];

      setBookmarkedCount(
        savedBookmarks.length
      );

      // -------------------------------
      // Fetch Completed Questions
      // -------------------------------
      const profileRes =
        await API.get("/users/profile");

      const completed =
        profileRes.data?.user
          ?.completedQuestions || [];

      setCompletedQuestions(
        completed.map((id) =>
          id.toString()
        )
      );

    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      // -------------------------------
      // Session Expired
      // -------------------------------
      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        window.dispatchEvent(
          new Event("authChanged")
        );

        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Statistics
  // ===============================
  const totalQuestions =
    questions.length;

  const completedCount =
    completedQuestions.length;

  const remainingQuestions = Math.max(
    totalQuestions - completedCount,
    0
  );

  const progressPercentage =
    totalQuestions > 0
      ? Math.round(
          (completedCount /
            totalQuestions) *
            100
        )
      : 0;

  // ===============================
  // Difficulty Statistics
  // ===============================
  const easyQuestions =
    questions.filter(
      (question) =>
        question.difficulty === "Easy"
    ).length;

  const mediumQuestions =
    questions.filter(
      (question) =>
        question.difficulty === "Medium"
    ).length;

  const hardQuestions =
    questions.filter(
      (question) =>
        question.difficulty === "Hard"
    ).length;

  // ===============================
  // Loading State
  // ===============================
  if (loading) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div className="spinner-border text-primary mb-3">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h5 className="fw-bold">
              Loading Dashboard
            </h5>

            <p className="text-muted mb-0">
              Fetching your preparation
              progress...
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // Dashboard UI
  // ===============================
  return (
    <div className="container py-4">

      {/* ===============================
          Welcome Hero
      =============================== */}
      <div className="card shadow-lg border-0 p-4 p-md-5 mb-5">

        <div className="row align-items-center">

          <div className="col-lg-8 text-center text-lg-start">

            <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
              📊 Personal Dashboard
            </span>

            <h1 className="fw-bold mb-2">
              Welcome back,{" "}
              <span className="text-primary">
                {user?.name || "User"}
              </span>{" "}
              👋
            </h1>

            <p className="text-muted fs-5 mb-1">
              Continue your interview
              preparation journey.
            </p>

            {user?.email && (
              <p className="text-muted mb-0">
                📧 {user.email}
              </p>
            )}

          </div>

          <div className="col-lg-4 text-center mt-4 mt-lg-0">

            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow"
              style={{
                width: "110px",
                height: "110px",
                fontSize: "44px",
              }}
            >
              👤
            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Preparation Progress
      =============================== */}
      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4 p-md-5">

          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

            <div>
              <h3 className="fw-bold mb-1">
                🎯 Preparation Progress
              </h3>

              <p className="text-muted mb-0">
                Track how much of the question
                library you have completed.
              </p>
            </div>

            <div className="text-md-end">
              <h2 className="fw-bold text-primary mb-0">
                {progressPercentage}%
              </h2>

              <small className="text-muted">
                Completed
              </small>
            </div>

          </div>

          <div
            className="progress"
            style={{ height: "14px" }}
          >
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{
                width: `${progressPercentage}%`,
              }}
              aria-valuenow={
                progressPercentage
              }
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progressPercentage}%
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">

            <small className="text-muted">
              ✅ {completedCount} completed
            </small>

            <small className="text-muted">
              ⏳ {remainingQuestions} remaining
            </small>

          </div>

        </div>

      </div>

      {/* ===============================
          Preparation Overview
      =============================== */}
      <div className="mb-4">

        <h2 className="fw-bold">
          📈 Preparation Overview
        </h2>

        <p className="text-muted">
          Monitor your InterviewAce
          activity and progress.
        </p>

      </div>

      <div className="row g-4">

        {/* Total Questions */}
        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="text-muted mb-1">
                  Total Questions
                </p>

                <h2 className="fw-bold mb-0">
                  {totalQuestions}
                </h2>
              </div>

              <div className="fs-1">
                📚
              </div>

            </div>

            <small className="text-primary fw-semibold mt-3 d-block">
              Available for practice
            </small>

          </div>

        </div>

        {/* Completed */}
        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="text-muted mb-1">
                  Completed
                </p>

                <h2 className="fw-bold text-success mb-0">
                  {completedCount}
                </h2>
              </div>

              <div className="fs-1">
                ✅
              </div>

            </div>

            <small className="text-success fw-semibold mt-3 d-block">
              Questions completed
            </small>

          </div>

        </div>

        {/* Remaining */}
        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="text-muted mb-1">
                  Remaining
                </p>

                <h2 className="fw-bold text-warning mb-0">
                  {remainingQuestions}
                </h2>
              </div>

              <div className="fs-1">
                ⏳
              </div>

            </div>

            <small className="text-warning fw-semibold mt-3 d-block">
              Questions to practice
            </small>

          </div>

        </div>

        {/* Bookmarked */}
        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="text-muted mb-1">
                  Bookmarked
                </p>

                <h2 className="fw-bold mb-0">
                  {bookmarkedCount}
                </h2>
              </div>

              <div className="fs-1">
                ⭐
              </div>

            </div>

            <small className="text-warning fw-semibold mt-3 d-block">
              Saved for revision
            </small>

          </div>

        </div>

      </div>

      {/* ===============================
          Difficulty Overview
      =============================== */}
      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body p-4 p-md-5">

          <h4 className="fw-bold mb-1">
            🎯 Question Difficulty
          </h4>

          <p className="text-muted mb-4">
            Distribution of your available
            interview questions.
          </p>

          <div className="row g-4">

            {/* Easy */}
            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-2 mb-2">
                  🟢
                </div>

                <h3 className="fw-bold text-success">
                  {easyQuestions}
                </h3>

                <p className="mb-0 text-muted">
                  Easy Questions
                </p>

              </div>

            </div>

            {/* Medium */}
            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-2 mb-2">
                  🟡
                </div>

                <h3 className="fw-bold text-warning">
                  {mediumQuestions}
                </h3>

                <p className="mb-0 text-muted">
                  Medium Questions
                </p>

              </div>

            </div>

            {/* Hard */}
            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-2 mb-2">
                  🔴
                </div>

                <h3 className="fw-bold text-danger">
                  {hardQuestions}
                </h3>

                <p className="mb-0 text-muted">
                  Hard Questions
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Quick Actions
      =============================== */}
      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body p-4 p-md-5">

          <h4 className="fw-bold mb-1">
            🚀 Quick Actions
          </h4>

          <p className="text-muted mb-4">
            Jump directly to the tools
            you use most.
          </p>

          <div className="row g-3">

            <div className="col-md-4">
              <button
                className="btn btn-primary w-100 py-3"
                onClick={() =>
                  navigate("/questions")
                }
              >
                📚 Browse Questions
              </button>
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-warning w-100 py-3"
                onClick={() =>
                  navigate("/bookmarks")
                }
              >
                ⭐ View Bookmarks
              </button>
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-success w-100 py-3"
                onClick={() =>
                  navigate("/add-question")
                }
              >
                ➕ Add Question
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Motivation
      =============================== */}
      <div className="card border-0 shadow-sm mt-5 bg-primary text-white">

        <div className="card-body p-4 p-md-5 text-center">

          <div className="fs-1 mb-2">
            💡
          </div>

          <h3 className="fw-bold">
            Keep Practicing!
          </h3>

          <p className="mb-0">
            Consistent practice is the key
            to becoming interview-ready.
            Challenge yourself with
            different topics and difficulty
            levels.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

