import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("User data error:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 mb-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div className="display-4 mb-3">⚠️</div>

            <h4 className="fw-bold">
              User Information Not Found
            </h4>

            <p className="text-muted mb-0">
              Please log in again to view your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="container mt-5 mb-5">

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
                {isAdmin ? "👨‍💼 Administrator" : "👤 InterviewAce User"}
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
              Your basic account information.
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

          <div className="mb-4">

            <h3 className="fw-bold mb-1">
              🔐 Account Information
            </h3>

            <p className="text-muted mb-0">
              Security and platform information.
            </p>

          </div>

          <div className="row g-4">

            {/* Account Status */}

            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-1 mb-2">
                  ✅
                </div>

                <h5 className="fw-bold">
                  Account Status
                </h5>

                <span className="badge bg-success px-3 py-2">
                  Active
                </span>

              </div>

            </div>

            {/* Authentication */}

            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-1 mb-2">
                  🔒
                </div>

                <h5 className="fw-bold">
                  Authentication
                </h5>

                <p className="text-muted mb-0">
                  JWT Protected
                </p>

              </div>

            </div>

            {/* Role */}

            <div className="col-md-4">

              <div className="border rounded-4 p-4 text-center h-100">

                <div className="fs-1 mb-2">
                  {isAdmin ? "👨‍💼" : "🎯"}
                </div>

                <h5 className="fw-bold">
                  Account Role
                </h5>

                <span
                  className={`badge px-3 py-2 ${
                    isAdmin
                      ? "bg-warning text-dark"
                      : "bg-primary"
                  }`}
                >
                  {isAdmin ? "Administrator" : "User"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===============================
          InterviewAce Information
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
          Profile Summary
      =============================== */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

            <div>

              <h5 className="fw-bold mb-1">
                🎯 Keep Preparing
              </h5>

              <p className="text-muted mb-0">
                Consistent practice is the key to interview success.
              </p>

            </div>

            <span className="badge bg-success px-3 py-2">
              ✅ Ready to Practice
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;