import { useState } from "react";
import API from "../services/api";

function AddQuestion() {
  const initialForm = {
    title: "",
    answer: "",
    category: "OOP",
    difficulty: "Easy",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await API.post("/questions", {
        title: formData.title.trim(),
        answer: formData.answer.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
      });

      setSuccessMessage(
        res.data.message || "Question added successfully."
      );

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Add Question Error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setServerError(
            "Your session has expired. Please login again."
          );
        } else if (error.response.status === 400) {
          setServerError(
            error.response.data?.message ||
              "Please check your question information."
          );
        } else {
          setServerError(
            error.response.data?.message ||
              "Failed to add question."
          );
        }
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
        style={{ maxWidth: "760px" }}
      >

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
                    errors.title ? "is-invalid" : ""
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
                    errors.answer ? "is-invalid" : ""
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
                  Provide an interview-friendly explanation.
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
                {loading
                  ? "Adding Question..."
                  : "➕ Add Question"}
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
    </div>
  );
}

export default AddQuestion;