import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          🚀 InterviewAce
        </Link>

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

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            <Link className="nav-link px-3" to="/">
              🏠 Home
            </Link>

            <Link className="nav-link px-3" to="/questions">
              📚 Questions
            </Link>

            <Link className="nav-link px-3" to="/bookmarks">
              ⭐ Bookmarks
            </Link>

            <Link className="nav-link px-3" to="/add-question">
              ➕ Add Question
            </Link>

            <Link className="nav-link px-3" to="/dashboard">
              📊 Dashboard
            </Link>

            <Link className="nav-link px-3" to="/profile">
              👤 Profile
            </Link>

            {user?.role === "admin" && (
              <Link
                className="nav-link px-3 fw-bold text-warning"
                to="/admin"
              >
                👨‍💼 Admin Panel
              </Link>
            )}

            {/* Dark Mode */}
            <button
              className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;