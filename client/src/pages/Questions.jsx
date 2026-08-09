import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Toast from "../components/Toast";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const [bookmarks, setBookmarks] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  // Toast
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const toastTimerRef = useRef(null);

  // ===============================
  // Logged-in User
  // ===============================
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

  // ===============================
  // Toast Helper
  // ===============================
  const showToast = (message, type = "success") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      message,
      type,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);
  };

  // ===============================
  // Cleanup Toast Timer
  // ===============================
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // ===============================
  // Initial Load
  // ===============================
  useEffect(() => {
    fetchQuestions();

    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    setBookmarks(savedBookmarks);

    fetchCompletedQuestions();
  }, []);

  // ===============================
  // Fetch Questions
  // ===============================
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.get("/questions");

      setQuestions(res.data.questions || []);
    } catch (error) {
      console.error("Fetch Questions Error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load questions.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Fetch Completed Questions
  // ===============================
  const fetchCompletedQuestions = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCompletedQuestions([]);
      return;
    }

    try {
      const res = await API.get("/users/profile");

      const completed =
        res.data.user?.completedQuestions || [];

      setCompletedQuestions(
        completed.map((id) => id.toString())
      );
    } catch (error) {
      console.error(
        "Fetch Completed Questions Error:",
        error
      );

      setCompletedQuestions([]);
    }
  };

  // ===============================
  // Toggle Completed Question
  // ===============================
  const toggleCompletedQuestion = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast(
        "Please login to track your progress.",
        "warning"
      );
      return;
    }

    if (actionLoading === `complete-${id}`) {
      return;
    }

    try {
      setActionLoading(`complete-${id}`);

      const res = await API.put(
        "/users/completed-question",
        {
          questionId: id,
        }
      );

      if (res.data.success) {
        const updatedCompleted =
          res.data.completedQuestions || [];

        setCompletedQuestions(
          updatedCompleted.map((item) =>
            item.toString()
          )
        );

        showToast(
          res.data.message ||
            "Progress updated successfully.",
          "success"
        );
      }
    } catch (error) {
      console.error(
        "Completed Question Error:",
        error
      );

      if (error.response?.status === 401) {
        showToast(
          "Please login to track your progress.",
          "warning"
        );
      } else {
        showToast(
          error.response?.data?.message ||
            "Failed to update question progress.",
          "error"
        );
      }
    } finally {
      setActionLoading("");
    }
  };

  // ===============================
  // Delete Question - Admin Only
  // ===============================
  const deleteQuestion = async (id) => {
    if (!isAdmin) {
      showToast(
        "Admin access required.",
        "error"
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
      return;
    }

    if (actionLoading === `delete-${id}`) {
      return;
    }

    try {
      setActionLoading(`delete-${id}`);

      const res = await API.delete(
        `/questions/${id}`
      );

      if (res.data.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter(
            (question) => question._id !== id
          )
        );

        // Remove from bookmarks
        const updatedBookmarks =
          bookmarks.filter(
            (item) => item !== id
          );

        setBookmarks(updatedBookmarks);

        localStorage.setItem(
          "bookmarks",
          JSON.stringify(updatedBookmarks)
        );

        // Remove from completed questions
        setCompletedQuestions((prev) =>
          prev.filter((item) => item !== id)
        );

        showToast(
          "Question deleted successfully.",
          "success"
        );
      }
    } catch (error) {
      console.error(
        "Delete Question Error:",
        error
      );

      if (error.response?.status === 401) {
        showToast(
          "Please login first.",
          "warning"
        );
      } else if (
        error.response?.status === 403
      ) {
        showToast(
          "Admin access required.",
          "error"
        );
      } else {
        showToast(
          error.response?.data?.message ||
            "Failed to delete question.",
          "error"
        );
      }
    } finally {
      setActionLoading("");
    }
  };

  // ===============================
  // Reset Filters
  // ===============================
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
  };

  // ===============================
  // Bookmark Question
  // ===============================
  const toggleBookmark = (id) => {
    let updatedBookmarks;

    if (bookmarks.includes(id)) {
      updatedBookmarks = bookmarks.filter(
        (item) => item !== id
      );

      showToast(
        "Question removed from bookmarks.",
        "info"
      );
    } else {
      updatedBookmarks = [
        ...bookmarks,
        id,
      ];

      showToast(
        "Question bookmarked successfully.",
        "success"
      );
    }

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  };

  // ===============================
  // Filter Questions
  // ===============================
  const filteredQuestions =
    questions.filter((question) => {
      const title =
        question.title?.toLowerCase() || "";

      const matchesSearch =
        title.includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        question.category === category;

      const matchesDifficulty =
        difficulty === "All" ||
        question.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty
      );
    });

  // ===============================
  // UI
  // ===============================
  return (
    <div>
      {/* ===============================
          Toast
      =============================== */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => {
          if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
          }

          setToast({
            message: "",
            type: "success",
          });
        }}
      />

      {/* ===============================
          Header
      =============================== */}
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
          🎯 Interview Preparation
        </span>

        <h1 className="fw-bold">
          📚 Interview Questions
        </h1>

        <p className="text-muted mb-0">
          Practice technical and HR questions and
          build confidence for your next interview.
        </p>
      </div>

      {/* ===============================
          Search & Filters
      =============================== */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">

            {/* Search */}
            <div className="col-lg-5">
              <label className="form-label fw-semibold">
                Search Questions
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by question title..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            {/* Category */}
            <div className="col-md-6 col-lg-2">
              <label className="form-label fw-semibold">
                Category
              </label>

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="All">
                  All Categories
                </option>

                <option value="DSA">DSA</option>
                <option value="DBMS">DBMS</option>
                <option value="OOP">OOP</option>
                <option value="OS">OS</option>
                <option value="CN">CN</option>
                <option value="HR">HR</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="col-md-6 col-lg-2">
              <label className="form-label fw-semibold">
                Difficulty
              </label>

              <select
                className="form-select"
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
              >
                <option value="All">
                  All Levels
                </option>

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>
              </select>
            </div>

            {/* Reset */}
            <div className="col-lg-3">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                🔄 Reset Filters
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ===============================
          Results Summary
      =============================== */}
      {!loading && (
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

          <div>
            <h5 className="fw-bold mb-1">
              Available Questions
            </h5>

            <p className="text-muted mb-0">
              Showing{" "}
              <strong>
                {filteredQuestions.length}
              </strong>{" "}
              of{" "}
              <strong>
                {questions.length}
              </strong>{" "}
              questions
            </p>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">

            <span className="badge bg-dark px-3 py-2">
              ⭐ {bookmarks.length} Bookmarked
            </span>

            <span className="badge bg-success px-3 py-2">
              ✅ {completedQuestions.length} Completed
            </span>

          </div>
        </div>
      )}

      {/* ===============================
          Loading
      =============================== */}
      {loading ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div
              className="spinner-border text-primary mb-3"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <h4 className="fw-bold">
              Loading Questions...
            </h4>

            <p className="text-muted mb-0">
              Please wait while we load the
              interview questions.
            </p>

          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (

        /* ===============================
            No Questions
        =============================== */
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div className="display-4 mb-3">
              🔎
            </div>

            <h4 className="fw-bold">
              No Questions Found
            </h4>

            <p className="text-muted">
              Try changing your search or filters.
            </p>

            <button
              className="btn btn-outline-primary"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

          </div>
        </div>

      ) : (

        /* ===============================
            Questions
        =============================== */
        <div className="row g-4">

          {filteredQuestions.map((question) => {
            const isCompleted =
              completedQuestions.includes(
                question._id
              );

            const isBookmarked =
              bookmarks.includes(
                question._id
              );

            const completing =
              actionLoading ===
              `complete-${question._id}`;

            const deleting =
              actionLoading ===
              `delete-${question._id}`;

            return (
              <div
                className="col-12"
                key={question._id}
              >
                <div
                  className={`card shadow-sm border-0 h-100 ${
                    isCompleted
                      ? "border border-success"
                      : ""
                  }`}
                >
                  <div className="card-body p-4">

                    {/* Question Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">

                      <div>
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">

                          <span className="badge bg-light text-dark border">
                            #
                            {question._id.slice(-4)}
                          </span>

                          <span className="badge bg-primary">
                            {question.category}
                          </span>

                          <span
                            className={`badge ${
                              question.difficulty ===
                              "Easy"
                                ? "bg-success"
                                : question.difficulty ===
                                  "Medium"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {question.difficulty}
                          </span>

                          {isCompleted && (
                            <span className="badge bg-success">
                              ✅ Completed
                            </span>
                          )}

                        </div>

                        <h4 className="fw-bold mb-0">
                          {question.title}
                        </h4>
                      </div>

                      <small className="text-muted">
                        Interview Question
                      </small>

                    </div>

                    <hr />

                    {/* Answer */}
                    <div className="bg-light rounded p-4">
                      <h6 className="fw-bold text-dark mb-2">
                        💡 Answer
                      </h6>

                      <p className="text-secondary mb-0">
                        {question.answer}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="question-actions d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3 mt-4">

                      {/* User Actions */}
                      <div className="d-flex flex-column flex-sm-row gap-2">

                        <button
                          className={`btn ${
                            isCompleted
                              ? "btn-success"
                              : "btn-outline-success"
                          }`}
                          onClick={() =>
                            toggleCompletedQuestion(
                              question._id
                            )
                          }
                          disabled={
                            completing ||
                            deleting
                          }
                        >
                          {completing ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Updating...
                            </>
                          ) : isCompleted ? (
                            "↩️ Mark Incomplete"
                          ) : (
                            "✅ Mark Complete"
                          )}
                        </button>

                        <button
                          className={`btn ${
                            isBookmarked
                              ? "btn-success"
                              : "btn-outline-primary"
                          }`}
                          onClick={() =>
                            toggleBookmark(
                              question._id
                            )
                          }
                          disabled={
                            completing ||
                            deleting
                          }
                        >
                          {isBookmarked
                            ? "✅ Bookmarked"
                            : "⭐ Bookmark"}
                        </button>

                      </div>

                      {/* Admin Actions */}
                      {isAdmin && (
                        <div className="d-flex flex-column flex-sm-row gap-2">

                          <Link
                            to={`/edit-question/${question._id}`}
                            className={`btn btn-warning ${
                              deleting
                                ? "disabled"
                                : ""
                            }`}
                          >
                            ✏️ Edit
                          </Link>

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              deleteQuestion(
                                question._id
                              )
                            }
                            disabled={
                              deleting ||
                              completing
                            }
                          >
                            {deleting ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Deleting...
                              </>
                            ) : (
                              "🗑 Delete"
                            )}
                          </button>

                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}

export default Questions;