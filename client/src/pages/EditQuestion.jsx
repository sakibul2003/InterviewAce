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

      const res = await API.get(`/questions/${id}`);

      const question = res.data.question;

      setTitle(question.title);
      setAnswer(question.answer);
      setCategory(question.category);
      setDifficulty(question.difficulty);
    } catch (error) {
      console.error("FETCH ERROR:", error);

      alert("Failed to load question.");
      navigate("/questions");
    } finally {
      setFetching(false);
    }
  };

  // ===============================
  // Update Question
  // ===============================
  const updateQuestion = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.put(`/questions/${id}`, {
        title,
        answer,
        category,
        difficulty,
      });

      console.log(res.data);

      alert("✅ Question Updated Successfully");

      navigate("/questions");
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      if (error.response) {
        alert(
          `Error ${error.response.status}\n${
            error.response.data.message || "Failed to update question"
          }`
        );
      } else {
        alert(error.message);
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

            <form onSubmit={updateQuestion}>

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
                  className="form-control"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter the interview question..."
                  required
                />

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
                  className="form-control"
                  rows="6"
                  value={answer}
                  onChange={(e) =>
                    setAnswer(e.target.value)
                  }
                  placeholder="Write the answer..."
                  required
                />

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
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
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
                    onChange={(e) =>
                      setDifficulty(e.target.value)
                    }
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