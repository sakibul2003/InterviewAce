
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // ===============================
  // Logged-in User
  // ===============================
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error("Invalid user data:", error);
    user = null;
  }

  console.log("NAVBAR USER:", user);

  // ===============================
  // Admin Check
  // ===============================
  const isAdmin = user?.role === "admin";

  // ===============================
  // Dark Mode
  // ===============================
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  // ===============================
  // Navbar
  // ===============================
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          🚀 InterviewAce
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            {/* Home */}
            <Link
              className="nav-link px-3"
              to="/"
            >
              🏠 Home
            </Link>

            {/* Questions */}
            <Link
              className="nav-link px-3"
              to="/questions"
            >
              📚 Questions
            </Link>

            {/* Bookmarks */}
            <Link
              className="nav-link px-3"
              to="/bookmarks"
            >
              ⭐ Bookmarks
            </Link>

            {/* Dashboard */}
            <Link
              className="nav-link px-3"
              to="/dashboard"
            >
              📊 Dashboard
            </Link>

            {/* Profile */}
            <Link
              className="nav-link px-3"
              to="/profile"
            >
              👤 Profile
            </Link>

            {/* ===============================
                ADMIN ONLY LINKS
            =============================== */}
            {isAdmin && (
              <>
                {/* Add Question */}
                <Link
                  className="nav-link px-3 fw-bold text-info"
                  to="/add-question"
                >
                  ➕ Add Question
                </Link>

                {/* Admin Panel */}
                <Link
                  className="nav-link px-3 fw-bold text-warning"
                  to="/admin"
                >
                  👨‍💼 Admin Panel
                </Link>
              </>
            )}

            {/* Dark Mode */}
            <button
              type="button"
              className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

