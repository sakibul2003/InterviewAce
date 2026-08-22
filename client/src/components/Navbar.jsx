import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        setUser(null);
      }
    };

    window.addEventListener("authChanged", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
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

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center">
            <Link className="nav-link px-3" to="/">
              🏠 Home
            </Link>

            {user && (
              <>
                <Link className="nav-link px-3" to="/questions">
                  📚 Questions
                </Link>

                <Link className="nav-link px-3" to="/bookmarks">
                  ⭐ Bookmarks
                </Link>

                <Link className="nav-link px-3" to="/dashboard">
                  📊 Dashboard
                </Link>

                <Link className="nav-link px-3" to="/profile">
                  👤 Profile
                </Link>

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

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-lg-2 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link className="nav-link px-3" to="/login">
                  🔐 Login
                </Link>

                <Link className="nav-link px-3" to="/register">
                  📝 Register
                </Link>
              </>
            )}

            <button
              type="button"
              className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
              onClick={() => setDarkMode((prev) => !prev)}
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