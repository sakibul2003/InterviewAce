import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [questions, setQuestions] = useState([]);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ===============================
  // Fetch Dashboard Data
  // ===============================
  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/questions");

      setQuestions(res.data.questions || []);

      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

      setBookmarkedCount(savedBookmarks.length);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  // ===============================
  // Statistics
  // ===============================

  const totalQuestions = questions.length;

  const easyQuestions = questions.filter(
    (question) => question.difficulty === "Easy"
  ).length;

  const mediumQuestions = questions.filter(
    (question) => question.difficulty === "Medium"
  ).length;

  const hardQuestions = questions.filter(
    (question) => question.difficulty === "Hard"
  ).length;

  // ===============================
  // Logout
  // ===============================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="container mt-5 mb-5">

      {/* ===============================
          Welcome Hero
      =============================== */}

      <div className="card shadow-lg border-0 p-5 mb-5">

        <div className="row align-items-center">

          <div className="col-lg-8 text-center text-lg-start">

            <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
              📊 Personal Dashboard
            </span>

            <h1 className="fw-bold mb-2">
              Welcome back,{" "}
              <span className="text-primary">
                {user?.name || "User"}
              </span> 👋
            </h1>

            <p className="text-muted fs-5 mb-1">
              Continue your interview preparation journey.
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
          Dashboard Header
      =============================== */}

      <div className="mb-4">

        <h2 className="fw-bold">
          📈 Preparation Overview
        </h2>

        <p className="text-muted">
          Monitor your InterviewAce activity and practice progress.
        </p>

      </div>

      {/* ===============================
          Statistics Cards
      =============================== */}

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

            <div className="mt-3">
              <small className="text-primary fw-semibold">
                Available for practice
              </small>
            </div>

          </div>

        </div>

        {/* Bookmarks */}

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

            <div className="mt-3">
              <small className="text-warning fw-semibold">
                Saved for revision
              </small>
            </div>

          </div>

        </div>

        {/* Easy */}

        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <p className="text-muted mb-1">
                  Easy Questions
                </p>

                <h2 className="fw-bold text-success mb-0">
                  {easyQuestions}
                </h2>

              </div>

              <div className="fs-1">
                🟢
              </div>

            </div>

            <div className="mt-3">
              <small className="text-success fw-semibold">
                Build your fundamentals
              </small>
            </div>

          </div>

        </div>

        {/* Hard */}

        <div className="col-sm-6 col-xl-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <p className="text-muted mb-1">
                  Hard Questions
                </p>

                <h2 className="fw-bold text-danger mb-0">
                  {hardQuestions}
                </h2>

              </div>

              <div className="fs-1">
                🔴
              </div>

            </div>

            <div className="mt-3">
              <small className="text-danger fw-semibold">
                Challenge yourself
              </small>
            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Difficulty Overview
      =============================== */}

      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body p-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>

              <h4 className="fw-bold mb-1">
                🎯 Question Difficulty
              </h4>

              <p className="text-muted mb-0">
                Distribution of your available interview questions.
              </p>

            </div>

          </div>

          <div className="row g-4">

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

        <div className="card-body p-4">

          <h4 className="fw-bold mb-1">
            🚀 Quick Actions
          </h4>

          <p className="text-muted mb-4">
            Jump directly to the tools you use most.
          </p>

          <div className="row g-3">

            <div className="col-md-4">

              <button
                className="btn btn-primary w-100 py-3"
                onClick={() => navigate("/questions")}
              >
                📚 Browse Questions
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-warning w-100 py-3"
                onClick={() => navigate("/bookmarks")}
              >
                ⭐ View Bookmarks
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-success w-100 py-3"
                onClick={() => navigate("/add-question")}
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
            Consistent practice is the key to becoming interview-ready.
            Challenge yourself with different topics and difficulty levels.
          </p>

        </div>

      </div>

      {/* ===============================
          Logout
      =============================== */}

      <div className="text-center mt-5">

        <button
          className="btn btn-outline-danger px-4 py-2"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;