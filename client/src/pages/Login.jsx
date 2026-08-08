import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setServerError("");
  };

  // ===============================
  // Validate Form
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  // ===============================
  // Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Save authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        setServerError(
          error.response.data?.message ||
            "Invalid email or password."
        );
      } else if (error.request) {
        setServerError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div
        className="mx-auto"
        style={{ maxWidth: "500px" }}
      >

        {/* Header */}

        <div className="text-center mb-4">

          <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
            🚀 InterviewAce
          </span>

          <h1 className="fw-bold">
            Welcome Back
          </h1>

          <p className="text-muted">
            Log in to continue your interview preparation.
          </p>

        </div>

        {/* Login Card */}

        <div className="card shadow-lg border-0">

          <div className="card-body p-4 p-md-5">

            {/* Error */}

            {serverError && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                ❌ {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

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
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}

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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}

              </div>

              {/* Login Button */}

              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "🔐 Login"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;