import { useState } from "react";
import API from "../services/api";
import Toast from "../components/Toast";

function AddQuestion() {
  const initialForm = {
    title: "",
    answer: "",
    category: "OOP",
    difficulty: "Easy",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  // ===============================
  // Toast Helper
  // ===============================
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
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
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
  // Submit Question
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showToast(
        "Please fix the highlighted fields.",
        "warning"
      );

      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/questions", {
        title: formData.title.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
      });

      showToast(
        res.data.message ||
          "Question added successfully.",
        "success"
      );

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error(
        "Add Question Error:",
        error
      );

      if (error.response) {
        if (error.response.status === 401) {
          showToast(
            "Your session has expired. Please login again.",
            "warning"
          );
        } else if (error.response.status === 403) {
          showToast(
            "Admin access required.",
            "error"
          );
        } else if (error.response.status === 400) {
          showToast(
            error.response.data?.message ||
              "Please check your question information.",
            "error"
          );
        } else {
          showToast(
            error.response.data?.message ||
              "Failed to add question.",
            "error"
          );
        }
      } else if (error.request) {
        showToast(
          "Unable to connect to the server.",
          "error"
        );
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
        <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
          📝 Question Management
        </span>

        <h1 className="fw-bold">
          ➕ Add Interview Question
        </h1>

        <p className="text-muted">
          Create a new question for the InterviewAce
          question library.
        </p>
      </div>

      {/* Form Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body p-4 p-md-5">

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Question */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="form-label fw-semibold"
              >
                Question
              </label>

              <input
                id="title"
                type="text"
                className={`form-control ${
                  errors.title
                    ? "is-invalid"
                    : ""
                }`}
                name="title"
                placeholder="Enter the interview question..."
                value={formData.title}
                onChange={handleChange}
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
                className={`form-control ${
                  errors.answer
                    ? "is-invalid"
                    : ""
                }`}
                rows="6"
                name="answer"
                placeholder="Write a clear and concise answer..."
                value={formData.answer}
                onChange={handleChange}
              />

              {errors.answer && (
                <div className="invalid-feedback">
                  {errors.answer}
                </div>
              )}

              <small className="text-muted">
                Provide an interview-friendly
                explanation.
              </small>
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
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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
                  className="form-select"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding Question...
                </>
              ) : (
                "➕ Add Question"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center mt-4">
        <p className="text-muted mb-0">
          💡 Tip: Keep questions specific and answers
          clear enough for quick interview revision.
        </p>
      </div>
    </div>
  );
}

export default AddQuestion;