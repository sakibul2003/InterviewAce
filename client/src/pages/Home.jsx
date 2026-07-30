import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5 mb-5">

      {/* ===============================
          Hero Section
      =============================== */}

      <div className="row align-items-center py-5">

        <div className="col-lg-7 text-center text-lg-start">

          <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
            🎯 Interview Preparation Platform
          </span>

          <h1 className="display-3 fw-bold mb-3">
            Ace Your Next
            <span className="text-primary"> Interview</span>
          </h1>

          <p className="lead text-muted mb-4">
            Practice technical and HR interview questions,
            strengthen your problem-solving skills, and prepare
            with confidence using InterviewAce.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">

            <Link
              to="/questions"
              className="btn btn-primary btn-lg px-4"
            >
              📚 Browse Questions
            </Link>

            <Link
              to="/dashboard"
              className="btn btn-outline-primary btn-lg px-4"
            >
              📊 View Dashboard
            </Link>

          </div>

        </div>

        <div className="col-lg-5 mt-5 mt-lg-0">

          <div className="card shadow-lg border-0 p-4 text-center">

            <div className="display-1 mb-3">
              🚀
            </div>

            <h3 className="fw-bold">
              InterviewAce
            </h3>

            <p className="text-muted">
              Your personal interview preparation companion.
            </p>

            <div className="row mt-4">

              <div className="col-4">
                <h4 className="fw-bold text-primary">
                  DSA
                </h4>
                <small className="text-muted">
                  Practice
                </small>
              </div>

              <div className="col-4">
                <h4 className="fw-bold text-success">
                  HR
                </h4>
                <small className="text-muted">
                  Prepare
                </small>
              </div>

              <div className="col-4">
                <h4 className="fw-bold text-warning">
                  Skills
                </h4>
                <small className="text-muted">
                  Improve
                </small>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Features
      =============================== */}

      <div className="text-center mt-5 mb-4">

        <span className="text-primary fw-semibold">
          WHY INTERVIEWACE?
        </span>

        <h2 className="fw-bold mt-2">
          Everything You Need to Prepare
        </h2>

        <p className="text-muted">
          Build your technical knowledge and interview confidence
          in one place.
        </p>

      </div>

      <div className="row g-4">

        {/* Feature 1 */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100 p-4">

            <div className="display-6 mb-3">
              📚
            </div>

            <h4 className="fw-bold">
              Interview Questions
            </h4>

            <p className="text-muted mb-0">
              Practice DSA, DBMS, OOP, Operating Systems,
              Computer Networks, and HR questions.
            </p>

          </div>

        </div>

        {/* Feature 2 */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100 p-4">

            <div className="display-6 mb-3">
              🔍
            </div>

            <h4 className="fw-bold">
              Smart Search
            </h4>

            <p className="text-muted mb-0">
              Quickly find questions using search,
              categories, and difficulty filters.
            </p>

          </div>

        </div>

        {/* Feature 3 */}

        <div className="col-md-4">

          <div className="card shadow-sm h-100 p-4">

            <div className="display-6 mb-3">
              📊
            </div>

            <h4 className="fw-bold">
              Track Your Progress
            </h4>

            <p className="text-muted mb-0">
              Monitor your preparation through bookmarks,
              dashboard statistics, and categorized practice.
            </p>

          </div>

        </div>

      </div>

      {/* ===============================
          Preparation Categories
      =============================== */}

      <div className="card shadow border-0 mt-5 p-4">

        <div className="text-center mb-4">

          <h3 className="fw-bold">
            💼 Prepare Across Key Areas
          </h3>

          <p className="text-muted mb-0">
            Cover the major topics commonly asked in technical interviews.
          </p>

        </div>

        <div className="row text-center g-3">

          <div className="col-6 col-md-3">
            <div className="border rounded p-3 h-100">
              <div className="fs-3">🧠</div>
              <strong>DSA</strong>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="border rounded p-3 h-100">
              <div className="fs-3">🗄️</div>
              <strong>DBMS</strong>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="border rounded p-3 h-100">
              <div className="fs-3">💻</div>
              <strong>OOP</strong>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="border rounded p-3 h-100">
              <div className="fs-3">🤝</div>
              <strong>HR</strong>
            </div>
          </div>

        </div>

      </div>

      {/* ===============================
          Call To Action
      =============================== */}

      <div className="card shadow-lg border-0 mt-5 p-5 text-center">

        <h2 className="fw-bold">
          Ready to Start Practicing?
        </h2>

        <p className="text-muted mt-2 mb-4">
          Explore interview questions and start preparing today.
        </p>

        <div>

          <Link
            to="/questions"
            className="btn btn-primary btn-lg px-5"
          >
            🚀 Start Practicing
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;