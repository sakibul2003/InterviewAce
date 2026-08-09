
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // ===============================
  // Logged-in User
  // ===============================
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  });

  // ===============================
  // Dark Mode
  // ===============================
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // ===============================
  // Update User From LocalStorage
  // ===============================
  useEffect(() => {
    const updateUser = () => {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          "Invalid user data:",
          error
        );

        setUser(null);
      }
    };

    // Listen for custom authentication event
    window.addEventListener(
      "authChanged",
      updateUser
    );

    // Also check when browser storage changes
    window.addEventListener(
      "storage",
      updateUser
    );

    return () => {
      window.removeEventListener(
        "authChanged",
        updateUser
      );

      window.removeEventListener(
        "storage",
        updateUser
      );
    };
  }, []);

  // ===============================
  // Dark Mode Effect
  // ===============================
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
  // Admin Check
  // ===============================
  const isAdmin =
    user?.role === "admin";

  // ===============================
  // Logout
  // ===============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Tell Navbar that authentication changed
    window.dispatchEvent(
      new Event("authChanged")
    );

    window.location.href = "/login";
  };

  // ===============================
  // Navbar
  // ===============================
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          🚀 InterviewAce
        </Link>

        {/* Mobile Menu */}
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

            {/* Only show authenticated links */}
            {user && (
              <>
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
                    ADMIN ONLY
                =============================== */}
                {isAdmin && (
                  <>
                    <Link
                      className="nav-link px-3 fw-bold text-info"
                      to="/add-question"
                    >
                      ➕ Add Question
                    </Link>

                    <Link
                      className="nav-link px-3 fw-bold text-warning"
                      to="/admin"
                    >
                      👨‍💼 Admin Panel
                    </Link>
                  </>
                )}

                {/* Logout */}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-lg-2 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </>
            )}

            {/* Login / Register */}
            {!user && (
              <>
                <Link
                  className="nav-link px-3"
                  to="/login"
                >
                  🔐 Login
                </Link>

                <Link
                  className="nav-link px-3"
                  to="/register"
                >
                  📝 Register
                </Link>
              </>
            )}

            {/* Dark Mode */}
            <button
              type="button"
              className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
              onClick={() =>
                setDarkMode((prev) => !prev)
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

