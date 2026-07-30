import { useState } from "react";
import API from "../services/api";

function AddQuestion() {
  const [formData, setFormData] = useState({
    title: "",
    answer: "",
    category: "OOP",
    difficulty: "Easy",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/questions", formData);

      alert(res.data.message);

      setFormData({
        title: "",
        answer: "",
        category: "OOP",
        difficulty: "Easy",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to Add Question"
      );
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

            <form onSubmit={handleSubmit}>

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
                  className="form-control"
                  name="title"
                  placeholder="Enter the interview question..."
                  value={formData.title}
                  onChange={handleChange}
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
                  name="answer"
                  placeholder="Write a clear and concise answer..."
                  value={formData.answer}
                  onChange={handleChange}
                  required
                />

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

        {/* Help text */}

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