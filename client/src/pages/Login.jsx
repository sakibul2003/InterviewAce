
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  // ===============================
  // Show Toast
  // ===============================
  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Handle Login
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    // -------------------------------
    // Frontend Validation
    // -------------------------------
    if (!email) {
      showToast(
        "Please enter your email address.",
        "warning"
      );
      return;
    }

    if (!password) {
      showToast(
        "Please enter your password.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      // -------------------------------
      // Login API
      // -------------------------------
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // -------------------------------
      // Check Token
      // -------------------------------
      if (!res.data?.token) {
        console.error(
          "Login failed: token missing from response.",
          res.data
        );

        showToast(
          "Login failed. Authentication token was not received.",
          "error"
        );

        return;
      }

      // -------------------------------
      // Check User
      // -------------------------------
      if (!res.data?.user) {
        console.error(
          "Login failed: user object missing from response.",
          res.data
        );

        showToast(
          "Login failed. User information was not received.",
          "error"
        );

        return;
      }

      // -------------------------------
      // Validate User Role
      // -------------------------------
      const loggedInUser = res.data.user;

      console.log(
        "LOGGED-IN USER:",
        loggedInUser
      );

      console.log(
        "USER ROLE:",
        loggedInUser.role
      );

      // -------------------------------
      // Save Authentication Data
      // -------------------------------
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );
      window.dispatchEvent(
  new Event("authChanged")
);

      // -------------------------------
      // Verify LocalStorage
      // -------------------------------
      console.log(
        "STORED USER:",
        JSON.parse(
          localStorage.getItem("user")
        )
      );

      // -------------------------------
      // Success Message
      // -------------------------------
      showToast(
        res.data.message ||
          "Login successful!",
        "success"
      );

      // -------------------------------
      // Navigate
      // -------------------------------
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      // -------------------------------
      // Server Response Error
      // -------------------------------
      if (error.response) {
        const status =
          error.response.status;

        const message =
          error.response.data?.message;

        if (status === 400) {
          showToast(
            message ||
              "Please enter valid login information.",
            "warning"
          );
        } else if (status === 401) {
          showToast(
            message ||
              "Invalid email or password.",
            "error"
          );
        } else if (status === 403) {
          showToast(
            message ||
              "You are not allowed to login.",
            "error"
          );
        } else {
          showToast(
            message ||
              "Login failed. Please try again.",
            "error"
          );
        }

      // -------------------------------
      // Server Not Reachable
      // -------------------------------
      } else if (error.request) {
        showToast(
          "Unable to connect to the server. Make sure the backend is running.",
          "error"
        );

      // -------------------------------
      // Other Error
      // -------------------------------
      } else {
        showToast(
          "Something went wrong. Please try again.",
          "error"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="container py-5">

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-5">

          {/* Header */}
          <div className="text-center mb-4">

            <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
              🔐 Authentication
            </span>

            <h1 className="fw-bold">
              Welcome Back
            </h1>

            <p className="text-muted">
              Login to continue your
              InterviewAce journey.
            </p>

          </div>

          {/* Login Card */}
          <div className="card shadow-lg border-0">

            <div className="card-body p-4 p-md-5">

              <form
                onSubmit={handleSubmit}
                noValidate
              >

                {/* Email */}
                <div className="mb-4">

                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="email"
                  />

                </div>

                {/* Password */}
                <div className="mb-4">

                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="current-password"
                  />

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>

                      Logging in...
                    </>
                  ) : (
                    "🔐 Login"
                  )}

                </button>

              </form>

            </div>

          </div>

          {/* Register */}
          <div className="text-center mt-4">

            <p className="text-muted mb-0">

              Don't have an account?{" "}

              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() =>
                  navigate("/register")
                }
              >
                Register here
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;

