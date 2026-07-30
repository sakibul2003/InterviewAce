import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminPanel() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    easyQuestions: 0,
    mediumQuestions: 0,
    hardQuestions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminStats();
  }, []);

  // ===============================
  // Fetch Admin Statistics
  // ===============================
  const fetchAdminStats = async () => {
    try {
      const res = await API.get("/admin/stats");

      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error("Admin Panel Error:", error);

      if (error.response?.status === 401) {
        setError("Please login to access the Admin Panel.");
      } else if (error.response?.status === 403) {
        setError("You do not have admin access.");
      } else {
        setError("Failed to load admin statistics.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Loading State
  // ===============================
  if (loading) {
    return (
      <div className="container mt-5 mb-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div className="spinner-border text-primary mb-3">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h5 className="fw-bold">
              Loading Admin Panel
            </h5>

            <p className="text-muted mb-0">
              Fetching platform statistics...
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // Error State
  // ===============================
  if (error) {
    return (
      <div className="container mt-5 mb-5">

        <div className="card shadow-sm border-0">

          <div className="card-body text-center py-5">

            <div className="display-4 mb-3">
              🔒
            </div>

            <h4 className="fw-bold">
              Access Restricted
            </h4>

            <p className="text-muted">
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              📊 Go to Dashboard
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      {/* ===============================
          Admin Header
      =============================== */}

      <div className="card shadow-lg border-0 mb-5 overflow-hidden">

        <div className="bg-dark text-white p-4 p-md-5">

          <div className="row align-items-center">

            <div className="col-lg-8 text-center text-lg-start">

              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                👨‍💼 Administrator
              </span>

              <h1 className="fw-bold mb-2">
                Admin Control Center
              </h1>

              <p className="text-white-50 mb-0 fs-5">
                Monitor InterviewAce activity and manage
                the platform from one place.
              </p>

            </div>

            <div className="col-lg-4 text-center mt-4 mt-lg-0">

              <div
                className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center mx-auto shadow"
                style={{
                  width: "110px",
                  height: "110px",
                  fontSize: "48px",
                }}
              >
                👨‍💼
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Statistics Heading
      =============================== */}

      <div className="mb-4">

        <h2 className="fw-bold">
          📊 Platform Overview
        </h2>

        <p className="text-muted mb-0">
          A quick overview of InterviewAce activity.
        </p>

      </div>

      {/* ===============================
          Main Statistics
      =============================== */}

      <div className="row g-4">

        {/* Total Users */}

        <div className="col-sm-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <p className="text-muted mb-1">
                  Total Users
                </p>

                <h2 className="fw-bold text-primary mb-0">
                  {stats.totalUsers}
                </h2>

              </div>

              <div className="fs-1">
                👥
              </div>

            </div>

            <small className="text-primary fw-semibold mt-3 d-block">
              Registered accounts
            </small>

          </div>

        </div>

        {/* Total Questions */}

        <div className="col-sm-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100 p-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <p className="text-muted mb-1">
                  Total Questions
                </p>

                <h2 className="fw-bold text-primary mb-0">
                  {stats.totalQuestions}
                </h2>

              </div>

              <div className="fs-1">
                📚
              </div>

            </div>

            <small className="text-primary fw-semibold mt-3 d-block">
              Questions in database
            </small>

          </div>

        </div>

        {/* Easy */}

        <div className="col-sm-6 col-lg-2">

          <div className="card shadow-sm border-0 h-100 p-4 text-center">

            <div className="fs-1 mb-2">
              🟢
            </div>

            <h3 className="fw-bold text-success mb-1">
              {stats.easyQuestions}
            </h3>

            <p className="text-muted mb-0">
              Easy
            </p>

          </div>

        </div>

        {/* Medium */}

        <div className="col-sm-6 col-lg-2">

          <div className="card shadow-sm border-0 h-100 p-4 text-center">

            <div className="fs-1 mb-2">
              🟡
            </div>

            <h3 className="fw-bold text-warning mb-1">
              {stats.mediumQuestions}
            </h3>

            <p className="text-muted mb-0">
              Medium
            </p>

          </div>

        </div>

        {/* Hard */}

        <div className="col-sm-6 col-lg-2">

          <div className="card shadow-sm border-0 h-100 p-4 text-center">

            <div className="fs-1 mb-2">
              🔴
            </div>

            <h3 className="fw-bold text-danger mb-1">
              {stats.hardQuestions}
            </h3>

            <p className="text-muted mb-0">
              Hard
            </p>

          </div>

        </div>

      </div>

      {/* ===============================
          Difficulty Overview
      =============================== */}

      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body p-4 p-md-5">

          <div className="mb-4">

            <h4 className="fw-bold mb-1">
              🎯 Question Difficulty Overview
            </h4>

            <p className="text-muted mb-0">
              Monitor how questions are distributed across difficulty levels.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="border rounded-4 p-4 h-100 text-center">

                <div className="fs-2 mb-2">
                  🟢
                </div>

                <h3 className="text-success fw-bold">
                  {stats.easyQuestions}
                </h3>

                <h6 className="fw-bold">
                  Easy Questions
                </h6>

                <p className="text-muted mb-0">
                  Fundamental-level practice
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="border rounded-4 p-4 h-100 text-center">

                <div className="fs-2 mb-2">
                  🟡
                </div>

                <h3 className="text-warning fw-bold">
                  {stats.mediumQuestions}
                </h3>

                <h6 className="fw-bold">
                  Medium Questions
                </h6>

                <p className="text-muted mb-0">
                  Intermediate interview practice
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="border rounded-4 p-4 h-100 text-center">

                <div className="fs-2 mb-2">
                  🔴
                </div>

                <h3 className="text-danger fw-bold">
                  {stats.hardQuestions}
                </h3>

                <h6 className="fw-bold">
                  Hard Questions
                </h6>

                <p className="text-muted mb-0">
                  Advanced interview challenges
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Admin Actions
      =============================== */}

      <div className="card shadow-sm border-0 mt-5">

        <div className="card-body p-4 p-md-5">

          <div className="mb-4">

            <h4 className="fw-bold mb-1">
              ⚙️ Admin Actions
            </h4>

            <p className="text-muted mb-0">
              Access the most important management areas.
            </p>

          </div>

          <div className="row g-3">

            <div className="col-md-4">

              <button
                className="btn btn-primary w-100 py-3"
                onClick={() => navigate("/questions")}
              >
                📚 Manage Questions
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-dark w-100 py-3"
                onClick={() => navigate("/dashboard")}
              >
                📊 User Dashboard
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-warning w-100 py-3"
                onClick={() => navigate("/profile")}
              >
                👤 Admin Profile
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          Admin Security Notice
      =============================== */}

      <div className="alert alert-warning border-0 shadow-sm mt-5">

        <div className="d-flex gap-3 align-items-start">

          <div className="fs-3">
            🔐
          </div>

          <div>

            <h6 className="fw-bold">
              Administrator Access
            </h6>

            <p className="mb-0">
              This area is protected by JWT authentication
              and admin-level authorization.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminPanel;