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

  setCompletedQuestions(
    completed.map((id) => id.toString())
  );

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
Math.round(
(completedCount / totalQuestions) * 100
),
100
)
: 0;

const categoryProgress = categories.map((category) => {
const categoryQuestions = questions.filter(
(question) => question.category === category
);


const completedInCategory = categoryQuestions.filter(
  (question) =>
    completedQuestions.includes(question._id.toString())
).length;

const percentage =
  categoryQuestions.length > 0
    ? Math.round(
        (completedInCategory /
          categoryQuestions.length) *
          100
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
return ( <div className="container py-5"> <div className="card shadow-sm border-0"> <div className="card-body text-center py-5"> <div
           className="spinner-border text-primary mb-3"
           role="status"
         > <span className="visually-hidden">
Loading... </span> </div>


        <h5 className="fw-bold">
          Loading Dashboard
        </h5>

        <p className="text-muted mb-0">
          Fetching your interview preparation data...
        </p>
      </div>
    </div>
  </div>
);


}

return ( <div className="container py-4">


  {/* Welcome Section */}
  <div className="card shadow-lg border-0 mb-5">
    <div className="card-body p-4 p-md-5">
      <div className="row align-items-center">

        <div className="col-lg-8 text-center text-lg-start">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
            INTERVIEW PREPARATION DASHBOARD
          </span>

          <h1 className="fw-bold mb-2">
            Welcome back,{" "}
            <span className="text-primary">
              {user?.name || "Candidate"}
            </span>
            👋
          </h1>

          <p className="text-muted fs-5 mb-3">
            Track your progress and prepare for
            your next opportunity.
          </p>

          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/questions")}
          >
            Continue Practicing →
          </button>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="border rounded-4 p-4 text-center bg-light">

            <p className="text-muted mb-2">
              Interview Readiness
            </p>

            <h1 className="fw-bold text-primary mb-1">
              {progressPercentage}%
            </h1>

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
  <div className="row g-4 mb-5">

    <div className="col-sm-6 col-xl-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <p className="text-muted mb-2">
            Total Questions
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0">
              {totalQuestions}
            </h2>

            <span className="fs-2">📚</span>
          </div>

          <small className="text-muted">
            Available for practice
          </small>
        </div>
      </div>
    </div>

    <div className="col-sm-6 col-xl-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <p className="text-muted mb-2">
            Completed
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold text-success mb-0">
              {completedCount}
            </h2>

            <span className="fs-2">✅</span>
          </div>

          <small className="text-success">
            Questions completed
          </small>
        </div>
      </div>
    </div>

    <div className="col-sm-6 col-xl-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <p className="text-muted mb-2">
            Remaining
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold text-warning mb-0">
              {remainingQuestions}
            </h2>

            <span className="fs-2">⏳</span>
          </div>

          <small className="text-warning">
            Continue your preparation
          </small>
        </div>
      </div>
    </div>

    <div className="col-sm-6 col-xl-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <p className="text-muted mb-2">
            Bookmarked
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-0">
              {bookmarkedCount}
            </h2>

            <span className="fs-2">⭐</span>
          </div>

          <small className="text-muted">
            Saved for revision
          </small>
        </div>
      </div>
    </div>

  </div>

  {/* Overall Progress */}
  <div className="card shadow-sm border-0 mb-5">
    <div className="card-body p-4 p-md-5">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-bold mb-1">
            Overall Progress
          </h3>

          <p className="text-muted mb-0">
            Your progress across the InterviewAce
            question library.
          </p>
        </div>

        <h3 className="fw-bold text-primary mb-0">
          {progressPercentage}%
        </h3>
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
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <small className="text-success">
          {completedCount} completed
        </small>

        <small className="text-muted">
          {remainingQuestions} remaining
        </small>
      </div>

    </div>
  </div>

  {/* Category Progress */}
  <div className="card shadow-sm border-0 mb-5">
    <div className="card-body p-4 p-md-5">

      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          Category Progress
        </h3>

        <p className="text-muted mb-0">
          Track your progress across different
          interview topics.
        </p>
      </div>

      <div className="row g-4">

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

                <span className="fw-bold text-primary">
                  {item.percentage}%
                </span>
              </div>

              <div
                className="progress"
                style={{ height: "10px" }}
              >
                <div
                  className="progress-bar bg-primary"
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

  {/* Difficulty Distribution */}
  <div className="card shadow-sm border-0 mb-5">
    <div className="card-body p-4 p-md-5">

      <h3 className="fw-bold mb-1">
        Question Difficulty
      </h3>

      <p className="text-muted mb-4">
        Distribution of available interview questions.
      </p>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="border rounded-4 p-4 text-center h-100">
            <div className="fs-2 mb-2">🟢</div>

            <h2 className="fw-bold text-success">
              {easyQuestions}
            </h2>

            <p className="text-muted mb-0">
              Easy Questions
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded-4 p-4 text-center h-100">
            <div className="fs-2 mb-2">🟡</div>

            <h2 className="fw-bold text-warning">
              {mediumQuestions}
            </h2>

            <p className="text-muted mb-0">
              Medium Questions
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="border rounded-4 p-4 text-center h-100">
            <div className="fs-2 mb-2">🔴</div>

            <h2 className="fw-bold text-danger">
              {hardQuestions}
            </h2>

            <p className="text-muted mb-0">
              Hard Questions
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>

  {/* Quick Actions */}
  <div className="card shadow-sm border-0 mb-5">
    <div className="card-body p-4 p-md-5">

      <h3 className="fw-bold mb-1">
        Quick Actions
      </h3>

      <p className="text-muted mb-4">
        Continue preparing for your next interview.
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

      <div className="alert alert-light border mt-4 mb-0">
        <strong>Coming Next:</strong>{" "}
        Timed mock interviews, interview results,
        and interview history.
      </div>

    </div>
  </div>

  {/* Motivation */}
  <div className="card border-0 shadow-sm bg-primary text-white">
    <div className="card-body p-4 p-md-5 text-center">

      <div className="fs-1 mb-2">💡</div>

      <h3 className="fw-bold">
        Keep Practicing!
      </h3>

      <p className="mb-0">
        Consistent practice is the key to becoming
        interview-ready. Focus on your weaker
        categories and keep improving.
      </p>

    </div>
  </div>

</div>


);
}

export default Dashboard;
