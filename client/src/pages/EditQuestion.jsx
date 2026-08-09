import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    answer: "",
    category: "DSA",
    difficulty: "Easy",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

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

  // ===============================
  // Fetch Question
  // ===============================
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setFetching(true);
        setServerError("");

        const res = await API.get(`/questions/${id}`);

        const question = res.data?.question;

        if (!question) {
          const message = "Question not found.";

          setServerError(message);
          showToast(message, "error");

          return;
        }

        setFormData({
          title: question.title || "",
          answer: question.answer || "",
          category: question.category || "DSA",
          difficulty: question.difficulty || "Easy",
        });
      } catch (error) {
        console.error("Fetch Question Error:", error);

        if (error.response?.status === 401) {
          const message =
            "Your session has expired. Please login again.";

          setServerError(message);
          showToast(message, "warning");
        } else if (error.response?.status === 404) {
          const message = "Question not found.";

          setServerError(message);
          showToast(message, "error");
        } else {
          const message =
            error.response?.data?.message ||
            "Failed to load question.";

          setServerError(message);
          showToast(message, "error");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchQuestion();
  }, [id]);

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  };

  // ===============================
  // Validate Form
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    const title = formData.title.trim();
    const answer = formData.answer.trim();

    if (!title) {
      newErrors.title = "Question title is required.";
    } else if (title.length < 5) {
      newErrors.title =
        "Question title must contain at least 5 characters.";
    }

    if (!answer) {
      newErrors.answer = "Answer is required.";
    } else if (answer.length < 10) {
      newErrors.answer =
        "Answer must contain at least 10 characters.";
    }

    return newErrors;
  };

  // ===============================
  // Update Question
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showToast(
        "Please fix the highlighted fields.",
        "warning"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await API.put(`/questions/${id}`, {
        title: formData.title.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
      });

      setErrors({});

      const message =
        res.data?.message ||
        "Question updated successfully.";

      setSuccessMessage(message);
      showToast(message, "success");

      setTimeout(() => {
        navigate("/questions");
      }, 800);
    } catch (error) {
      console.error("Update Question Error:", error);

      if (error.response?.status === 401) {
        const message =
          "Your session has expired. Please login again.";

        setServerError(message);
        showToast(message, "warning");
      } else if (error.response?.status === 403) {
        const message = "Admin access required.";

        setServerError(message);
        showToast(message, "error");
      } else if (error.response?.status === 404) {
        const message = "Question not found.";

        setServerError(message);
        showToast(message, "error");
      } else {
        const message =
          error.response?.data?.message ||
          "Failed to update question.";

        setServerError(message);
        showToast(message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Loading Question
  // ===============================
  if (fetching) {
    return (
      <div
        className="mx-auto"
        style={{ maxWidth: "760px" }}
      >
        <div className="card shadow-lg border-0">
          <div className="card-body p-5 text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              aria-hidden="true"
            ></div>

            <h5 className="fw-bold">
              Loading Question...
            </h5>

            <p className="text-muted mb-0">
              Please wait while we load the question.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // Main UI
  // ===============================
  return (
    <div
      className="mx-auto"
      style={{ maxWidth: "760px" }}
    >
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

      {/* Header */}
      <div className="text-center mb-4">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
          ✏️ Question Management
        </span>

        <h1 className="fw-bold">
          Edit Interview Question
        </h1>

        <p className="text-muted">
          Update the question details and save your changes.
        </p>
      </div>

      {/* Error */}
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

      {/* Form */}
      <div className="card shadow-lg border-0">
        <div className="card-body p-4 p-md-5">
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="form-label fw-semibold"
              >
                Question Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                className={`form-control ${
                  errors.title
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter the interview question..."
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
              />

              {errors.title && (
                <div className="invalid-feedback">
                  {errors.title}
                </div>
              )}
            </div>

            {/* Answer */}
            <div className="mb-4">
              <label
                htmlFor="answer"
                className="form-label fw-semibold"
              >
                Answer
              </label>

              <textarea
                id="answer"
                name="answer"
                rows="6"
                className={`form-control ${
                  errors.answer
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Write a clear interview-friendly answer..."
                value={formData.answer}
                onChange={handleChange}
                disabled={loading}
              />

              {errors.answer && (
                <div className="invalid-feedback">
                  {errors.answer}
                </div>
              )}
            </div>

            {/* Category + Difficulty */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label
                  htmlFor="category"
                  className="form-label fw-semibold"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="DSA">DSA</option>
                  <option value="DBMS">DBMS</option>
                  <option value="OOP">OOP</option>
                  <option value="OS">OS</option>
                  <option value="CN">CN</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label
                  htmlFor="difficulty"
                  className="form-label fw-semibold"
                >
                  Difficulty
                </label>

                <select
                  id="difficulty"
                  name="difficulty"
                  className="form-select"
                  value={formData.difficulty}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3">
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
                    Updating...
                  </>
                ) : (
                  "✅ Update Question"
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2"
                onClick={() =>
                  navigate("/questions")
                }
                disabled={loading}
              >
                ↩️ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted mb-0">
          💡 Keep questions specific and answers
          clear for quick interview revision.
        </p>
      </div>
    </div>
  );
}

export default EditQuestion;