import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Easy");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  // ===============================
  // Fetch Question
  // ===============================
  const fetchQuestion = async () => {
    try {
      setFetching(true);
      setServerError("");

      const res = await API.get(`/questions/${id}`);

      const question = res.data.question;

      if (!question) {
        setServerError("Question not found.");
        return;
      }

      setTitle(question.title || "");
      setAnswer(question.answer || "");
      setCategory(question.category || "DSA");
      setDifficulty(question.difficulty || "Easy");
    } catch (error) {
      console.error("Fetch Question Error:", error);

      if (error.response) {
        if (error.response.status === 404) {
          setServerError("The requested question was not found.");
        } else if (error.response.status === 401) {
          setServerError(
            "Your session has expired. Please login again."
          );
        } else {
          setServerError(
            error.response.data?.message ||
              "Failed to load question."
          );
        }
      } else if (error.request) {
        setServerError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setServerError(
          "Something went wrong while loading the question."
        );
      }
    } finally {
      setFetching(false);
    }
  };

  // ===============================
  // Validate Form
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    const trimmedTitle = title.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedTitle) {
      newErrors.title = "Question title is required.";
    } else if (trimmedTitle.length < 5) {
      newErrors.title =
        "Question title must contain at least 5 characters.";
    }

    if (!trimmedAnswer) {
      newErrors.answer = "Answer is required.";
    } else if (trimmedAnswer.length < 10) {
      newErrors.answer =
        "Answer must contain at least 10 characters.";
    }

    return newErrors;
  };

  // ===============================
  // Update Question
  // ===============================
  const updateQuestion = async (e) => {
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
      const res = await API.put(`/questions/${id}`, {
        title: title.trim(),
        answer: answer.trim(),
        category,
        difficulty,
      });

      console.log(res.data);

      setErrors({});

      setSuccessMessage(
        res.data?.message ||
          "Question updated successfully."
      );

      // Small delay so success message can be seen
      setTimeout(() => {
        navigate("/questions");
      }, 700);
    } catch (error) {
      console.error("Update Question Error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setServerError(
            "Your session has expired. Please login again."
          );
        } else if (error.response.status === 400) {
          setServerError(
            error.response.data?.message ||
              "Please check the question information."
          );
        } else if (error.response.status === 404) {
          setServerError(
            "The question could not be found."
          );
        } else {
          setServerError(
            error.response.data?.message ||
              "Failed to update question."
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

  // ===============================
  // Loading State
  // ===============================
  if (fetching) {
    return (
      <div className="container mt-5 mb-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div className="spinner-border text-primary mb-3">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h5 className="fw-bold">
              Loading Question
            </h5>

            <p className="text-muted mb-0">
              Please wait while we load the question.
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div
        className="mx-auto"
        style={{ maxWidth: "760px" }}
      >

        {/* ===============================
            Header
        =============================== */}

        <div className="text-center mb-4">

          <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 mb-3">
            ✏️ Question Management
          </span>

          <h1 className="fw-bold">
            Edit Interview Question
          </h1>

          <p className="text-muted">
            Update the question details and save your changes.
          </p>

        </div>

        {/* ===============================
            Form Card
        =============================== */}

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

            <form
              onSubmit={updateQuestion}
              noValidate
            >

              {/* Question */}

              <div className="mb-4">

                <label
                  htmlFor="title"
                  className="form-label fw-semibold"
                >
                  Question Title
                </label>

                <input
                  id="title"
                  type="text"
                  className={`form-control ${
                    errors.title ? "is-invalid" : ""
                  }`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({
                      ...errors,
                      title: "",
                    });
                    setServerError("");
                  }}
                  placeholder="Enter the interview question..."
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
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setErrors({
                      ...errors,
                      answer: "",
                    });
                    setServerError("");
                  }}
                  placeholder="Write a clear interview-friendly answer..."
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
                    className="form-select"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setServerError("");
                    }}
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
                    value={difficulty}
                    onChange={(e) => {
                      setDifficulty(e.target.value);
                      setServerError("");
                    }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>

                </div>

              </div>

              {/* Actions */}

              <div className="d-flex flex-column flex-sm-row gap-3">

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading
                    ? "Updating..."
                    : "✅ Update Question"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2"
                  onClick={() => navigate("/questions")}
                  disabled={loading}
                >
                  ↩️ Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditQuestion;