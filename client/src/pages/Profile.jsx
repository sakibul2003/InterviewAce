import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Toast
  // ===============================
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const closeToast = () => {
    setToast({
      message: "",
      type: "success",
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ===============================
  // Fetch Authenticated Profile
  // ===============================
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.get("/users/profile");

      if (res.data.user) {
        setUser(res.data.user);

        // Keep localStorage user information updated
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      } else {
        const message =
          "Unable to load your profile.";

        setError(message);
        showToast(message, "warning");
      }
    } catch (error) {
      console.error("Profile Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        showToast(
          "Your session has expired. Please login again.",
          "warning"
        );

        navigate("/login");
        return;
      }

      if (error.response) {
        const message =
          error.response.data?.message ||
          "Failed to load profile.";

        setError(message);
        showToast(message, "error");
      } else if (error.request) {
        const message =
          "Unable to connect to the server. Please make sure the backend is running.";

        setError(message);
        showToast(message, "error");
      } else {
        const message =
          "Something went wrong while loading your profile.";

        setError(message);
        showToast(message, "error");
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
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              aria-hidden="true"
            ></div>

            <h5 className="fw-bold">
              Loading Profile
            </h5>

            <p className="text-muted mb-0">
              Fetching your account information...
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
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />

        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div className="display-4 mb-3">
              ⚠️
            </div>

            <h4 className="fw-bold">
              Profile Unavailable
            </h4>

            <p className="text-muted">
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={fetchProfile}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // No User
  // ===============================
  if (!user) {
    return (
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />

        <div className="alert alert-warning text-center">
          User information could not be found.
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  const completedCount =
    user.completedQuestions?.length || 0;

  return (
    <div className="mx-auto" style={{ maxWidth: "1000px" }}>
      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      {/* ===============================
          Profile Header
      =============================== */}

      <div className="card shadow-lg border-0 mb-4 overflow-hidden">
        <div className="bg-primary p-4 p-md-5 text-white">
          <div className="row align-items-center">
            <div className="col-md-3 text-center mb-4 mb-md-0">
              <div
                className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center mx-auto shadow"
                style={{
                  width: "120px",
                  height: "120px",
                  fontSize: "48px",
                }}
              >
                👤
              </div>
            </div>

            <div className="col-md-9 text-center text-md-start">
              <span className="badge bg-light text-primary mb-2 px-3 py-2">
                {isAdmin
                  ? "👨‍💼 Administrator"
                  : "👤 InterviewAce User"}
              </span>

              <h1 className="fw-bold mb-2">
                {user.name}
              </h1>

              <p className="mb-0 opacity-75 fs-5">
                📧 {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          Personal Information
      =============================== */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="mb-4">
            <h3 className="fw-bold mb-1">
              👤 Personal Information
            </h3>

            <p className="text-muted mb-0">
              Your account information retrieved from InterviewAce.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="border rounded-4 p-4 h-100">
                <small className="text-muted d-block mb-2">
                  Full Name
                </small>

                <h5 className="fw-semibold mb-0">
                  {user.name}
                </h5>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-4 h-100">
                <small className="text-muted d-block mb-2">
                  Email Address
                </small>

                <h5 className="fw-semibold mb-0">
                  {user.email}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          Account Information
      =============================== */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4 p-md-5">
          <h3 className="fw-bold mb-1">
            🔐 Account Information
          </h3>

          <p className="text-muted mb-4">
            Your authentication status, role, and progress.
          </p>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">
                  ✅
                </div>

                <h6 className="fw-bold">
                  Account Status
                </h6>

                <span className="badge bg-success px-3 py-2">
                  Active
                </span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">
                  🔒
                </div>

                <h6 className="fw-bold">
                  Authentication
                </h6>

                <p className="text-muted mb-0">
                  JWT Protected
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">
                  {isAdmin ? "👨‍💼" : "🎯"}
                </div>

                <h6 className="fw-bold">
                  Account Role
                </h6>

                <span
                  className={`badge px-3 py-2 ${
                    isAdmin
                      ? "bg-warning text-dark"
                      : "bg-primary"
                  }`}
                >
                  {isAdmin
                    ? "Administrator"
                    : "User"}
                </span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="border rounded-4 p-4 text-center h-100">
                <div className="fs-1 mb-2">
                  ✅
                </div>

                <h6 className="fw-bold">
                  Completed
                </h6>

                <h4 className="text-success fw-bold mb-0">
                  {completedCount}
                </h4>

                <small className="text-muted">
                  Questions
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          About InterviewAce
      =============================== */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-md-2 text-center mb-3 mb-md-0">
              <div className="display-3">
                🚀
              </div>
            </div>

            <div className="col-md-10">
              <h3 className="fw-bold">
                About InterviewAce
              </h3>

              <p className="text-muted mb-0">
                InterviewAce is an interview preparation platform
                designed to help users practise technical and HR
                interview questions, save important questions,
                monitor preparation activity, and improve interview
                readiness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          Continue Preparing
      =============================== */}

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h5 className="fw-bold mb-1">
                🎯 Keep Preparing
              </h5>

              <p className="text-muted mb-0">
                Continue practising questions to improve your interview readiness.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/questions")
              }
            >
              📚 Practice Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;