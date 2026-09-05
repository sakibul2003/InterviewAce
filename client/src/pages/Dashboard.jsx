import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["DSA", "DBMS", "OOP", "OS", "CN", "HR"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [questionRes, profileRes] = await Promise.all([
        API.get("/questions"),
        API.get("/users/profile"),
      ]);

      const allQuestions = questionRes.data?.questions || [];
      const userData = profileRes.data?.user;

      setQuestions(allQuestions);

      const bookmarks = userData?.bookmarks || [];
      const completed = userData?.completedQuestions || [];

      setBookmarkedCount(bookmarks.length);
      setCompletedQuestions(completed.map((id) => id.toString()));

      if (userData) {
        setUser((previousUser) => ({
          ...previousUser,
          ...userData,
        }));
      }
    } catch (error) {
      console.error("Dashboard Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChanged"));

        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalQuestions = questions.length;
  const completedCount = completedQuestions.length;

  const remainingQuestions = Math.max(
    totalQuestions - completedCount,
    0
  );

  const progressPercentage =
    totalQuestions > 0
      ? Math.min(
          Math.round((completedCount / totalQuestions) * 100),
          100
        )
      : 0;

  const categoryProgress = categories.map((category) => {
    const categoryQuestions = questions.filter(
      (question) => question.category === category
    );

    const completedInCategory = categoryQuestions.filter((question) =>
      completedQuestions.includes(question._id.toString())
    ).length;

    const percentage =
      categoryQuestions.length > 0
        ? Math.round(
            (completedInCategory / categoryQuestions.length) * 100
          )
        : 0;

    return {
      category,
      total: categoryQuestions.length,
      completed: completedInCategory,
      percentage,
    };
  });

  const easyQuestions = questions.filter(
    (question) => question.difficulty === "Easy"
  ).length;

  const mediumQuestions = questions.filter(
    (question) => question.difficulty === "Medium"
  ).length;

  const hardQuestions = questions.filter(
    (question) => question.difficulty === "Hard"
  ).length;

  const getReadinessStatus = () => {
    if (progressPercentage >= 75) {
      return {
        title: "Interview Ready",
        message:
          "Excellent progress. Keep practicing your weak areas.",
        className: "text-success",
      };
    }

    if (progressPercentage >= 50) {
      return {
        title: "Strong Progress",
        message:
          "You are building a solid interview foundation.",
        className: "text-primary",
      };
    }

    if (progressPercentage >= 25) {
      return {
        title: "Building Momentum",
        message:
          "Keep practicing consistently to improve your readiness.",
        className: "text-warning",
      };
    }

    return {
      title: "Getting Started",
      message:
        "Complete more questions to build your interview confidence.",
      className: "text-danger",
    };
  };

  const readiness = getReadinessStatus();

  if (loading) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>

            <h5 className="fw-bold">Loading Dashboard</h5>

            <p className="text-muted mb-0">
              Fetching your interview preparation data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      {/* Hero Section */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                INTERVIEWACE DASHBOARD
              </span>

              <h1 className="display-6 fw-bold mb-3">
                Welcome back,{" "}
                <span className="text-primary">
                  {user?.name || "Candidate"}
                </span>{" "}
                👋
              </h1>

              <p className="lead text-muted mb-4">
                Track your preparation, strengthen weak areas,
                and become interview-ready.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-primary px-4 py-2"
                  onClick={() => navigate("/questions")}
                >
                  Practice Questions →
                </button>

                <button
                  className="btn btn-outline-primary px-4 py-2"
                  onClick={() => navigate("/bookmarks")}
                >
                  ⭐ Review Bookmarks
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-light rounded-4 p-4 text-center border">
                <p className="text-muted mb-2">
                  Interview Readiness
                </p>

                <div className="display-4 fw-bold text-primary">
                  {progressPercentage}%
                </div>

                <h5 className={`fw-bold ${readiness.className}`}>
                  {readiness.title}
                </h5>

                <p className="small text-muted mb-0">
                  {readiness.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-3 g-lg-4 mb-4">
        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">
                    Total Questions
                  </p>

                  <h2 className="fw-bold mb-1">
                    {totalQuestions}
                  </h2>

                  <small className="text-muted">
                    Available practice
                  </small>
                </div>

                <span className="fs-2">📚</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">
                    Completed
                  </p>

                  <h2 className="fw-bold text-success mb-1">
                    {completedCount}
                  </h2>

                  <small className="text-success">
                    Questions solved
                  </small>
                </div>

                <span className="fs-2">✅</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">
                    Remaining
                  </p>

                  <h2 className="fw-bold text-warning mb-1">
                    {remainingQuestions}
                  </h2>

                  <small className="text-muted">
                    Keep practicing
                  </small>
                </div>

                <span className="fs-2">⏳</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">
                    Bookmarked
                  </p>

                  <h2 className="fw-bold text-primary mb-1">
                    {bookmarkedCount}
                  </h2>

                  <small className="text-muted">
                    Saved for revision
                  </small>
                </div>

                <span className="fs-2">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <span className="text-primary fw-semibold small">
                YOUR PREPARATION
              </span>

              <h3 className="fw-bold mt-1 mb-1">
                Overall Progress
              </h3>

              <p className="text-muted mb-0">
                Your progress across the InterviewAce question library.
              </p>
            </div>

            <div className="text-md-end">
              <h2 className="fw-bold text-primary mb-0">
                {progressPercentage}%
              </h2>

              <small className="text-muted">completed</small>
            </div>
          </div>

          <div
            className="progress rounded-pill"
            style={{ height: "16px" }}
          >
            <div
              className="progress-bar bg-primary rounded-pill"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-success fw-semibold">
              {completedCount} completed
            </small>

            <small className="text-muted">
              {remainingQuestions} remaining
            </small>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="mb-4">
            <span className="text-primary fw-semibold small">
              TOPIC PERFORMANCE
            </span>

            <h3 className="fw-bold mt-1 mb-1">
              Category Progress
            </h3>

            <p className="text-muted mb-0">
              See which interview topics need more practice.
            </p>
          </div>

          <div className="row g-3">
            {categoryProgress.map((item) => (
              <div
                className="col-md-6"
                key={item.category}
              >
                <div className="border rounded-4 p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">
                        {item.category}
                      </h5>

                      <small className="text-muted">
                        {item.completed} of {item.total} completed
                      </small>
                    </div>

                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                      {item.percentage}%
                    </span>
                  </div>

                  <div
                    className="progress rounded-pill"
                    style={{ height: "9px" }}
                  >
                    <div
                      className="progress-bar bg-primary rounded-pill"
                      role="progressbar"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="mb-4">
            <span className="text-primary fw-semibold small">
              QUESTION LIBRARY
            </span>

            <h3 className="fw-bold mt-1 mb-1">
              Difficulty Distribution
            </h3>

            <p className="text-muted mb-0">
              Understand the difficulty level of available questions.
            </p>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">🟢</div>

                <h2 className="fw-bold text-success mb-1">
                  {easyQuestions}
                </h2>

                <p className="fw-semibold mb-0">Easy</p>

                <small className="text-muted">
                  Beginner friendly
                </small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">🟡</div>

                <h2 className="fw-bold text-warning mb-1">
                  {mediumQuestions}
                </h2>

                <p className="fw-semibold mb-0">Medium</p>

                <small className="text-muted">
                  Interview level
                </small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">🔴</div>

                <h2 className="fw-bold text-danger mb-1">
                  {hardQuestions}
                </h2>

                <p className="fw-semibold mb-0">Hard</p>

                <small className="text-muted">
                  Advanced preparation
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Interview Preview */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                VERSION 1.1
              </span>

              <h3 className="fw-bold mb-2">
                Ready for a Mock Interview?
              </h3>

              <p className="text-muted mb-0">
                Test yourself with timed interview sessions,
                receive results, and track your performance.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <button
                className="btn btn-primary px-4 py-3"
                onClick={() => navigate("/mock-interview")}
              >
                🎯 Start Mock Interview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-lg-5">
          <h3 className="fw-bold mb-1">Quick Actions</h3>

          <p className="text-muted mb-4">
            Choose what you want to do next.
          </p>

          <div className="row g-3">
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100 py-3"
                onClick={() => navigate("/questions")}
              >
                📚 Practice Questions
              </button>
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-outline-primary w-100 py-3"
                onClick={() => navigate("/bookmarks")}
              >
                ⭐ Review Bookmarks
              </button>
            </div>

            {user?.role === "admin" && (
              <div className="col-md-4">
                <button
                  className="btn btn-success w-100 py-3"
                  onClick={() => navigate("/add-question")}
                >
                  ➕ Add Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="card border-0 shadow-sm rounded-4 bg-primary text-white">
        <div className="card-body p-4 p-lg-5 text-center">
          <div className="fs-1 mb-2">💡</div>

          <h3 className="fw-bold">Keep Practicing!</h3>

          <p className="mb-0 opacity-75">
            Consistent practice is the key to becoming
            interview-ready. Focus on weaker categories
            and keep improving.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
