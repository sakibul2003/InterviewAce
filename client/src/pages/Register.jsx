import { useState } from "react";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove field error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setServerError("");
    setSuccessMessage("");
  };

  // ===============================
  // Validate Form
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    return newErrors;
  };

  // ===============================
  // Submit
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(
        res.data.message || "Registration successful."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        setServerError(
          error.response.data?.message ||
            "Registration failed."
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

          <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
            🚀 InterviewAce
          </span>

          <h1 className="fw-bold">
            Create Your Account
          </h1>

          <p className="text-muted">
            Join InterviewAce and start your interview preparation.
          </p>

        </div>

        {/* Card */}

        <div className="card shadow-lg border-0">

          <div className="card-body p-4 p-md-5">

            {/* Server Error */}

            {serverError && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                ❌ {serverError}
              </div>
            )}

            {/* Success */}

            {successMessage && (
              <div
                className="alert alert-success"
                role="alert"
              >
                ✅ {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}

              <div className="mb-4">

                <label
                  htmlFor="name"
                  className="form-label fw-semibold"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  className={`form-control ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}

              </div>

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
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}

                <small className="text-muted">
                  Password must be at least 6 characters.
                </small>

              </div>

              {/* Submit */}

              <button
                className="btn btn-success w-100 py-2"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "🚀 Register"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;