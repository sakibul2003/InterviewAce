import { useEffect, useState } from "react";
import API from "../services/api";

function Bookmarks() {
  const [bookmarkedQuestions, setBookmarkedQuestions] =
    useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedQuestions();
  }, []);

  const fetchBookmarkedQuestions = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setBookmarkedQuestions([]);
        return;
      }

      const [questionsRes, profileRes] =
        await Promise.all([
          API.get("/questions"),
          API.get("/users/profile"),
        ]);

      const allQuestions =
        questionsRes.data?.questions || [];

      const userBookmarks =
        profileRes.data?.user?.bookmarks || [];

      const bookmarkIds = userBookmarks.map((id) =>
        id.toString()
      );

      const savedQuestions = allQuestions.filter(
        (question) =>
          bookmarkIds.includes(
            question._id.toString()
          )
      );

      setBookmarkedQuestions(savedQuestions);
    } catch (error) {
      console.error(
        "Fetch Bookmarked Questions Error:",
        error
      );

      setBookmarkedQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 mb-3">
          ⭐ Saved Questions
        </span>

        <h2 className="fw-bold">
          My Bookmarked Questions
        </h2>

        <p className="text-muted mb-0">
          Review the questions you saved for later
          practice.
        </p>
      </div>

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

            <h5 className="fw-bold">
              Loading Bookmarks
            </h5>

            <p className="text-muted mb-0">
              Fetching your saved questions...
            </p>

          </div>
        </div>
      ) : bookmarkedQuestions.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">

            <div className="display-4 mb-3">
              ⭐
            </div>

            <h4 className="fw-bold">
              No Bookmarked Questions
            </h4>

            <p className="text-muted mb-0">
              You haven't bookmarked any questions yet.
              Start practicing and save questions for
              revision.
            </p>

          </div>
        </div>
      ) : (
        <div className="row g-4">

          {bookmarkedQuestions.map((question) => (
            <div
              className="col-12"
              key={question._id}
            >
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">

                  <div className="d-flex flex-wrap align-items-center gap-2 mb-3">

                    <span className="badge bg-light text-dark border">
                      #{question._id.slice(-4)}
                    </span>

                    <span className="badge bg-primary">
                      {question.category}
                    </span>

                    <span
                      className={`badge ${
                        question.difficulty === "Easy"
                          ? "bg-success"
                          : question.difficulty ===
                            "Medium"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {question.difficulty}
                    </span>

                    <span className="badge bg-success">
                      ⭐ Bookmarked
                    </span>

                  </div>

                  <h4 className="fw-bold mb-3">
                    {question.title}
                  </h4>

                  <div className="bg-light rounded p-4">
                    <h6 className="fw-bold text-dark mb-2">
                      💡 Answer
                    </h6>

                    <p className="text-secondary mb-0">
                      {question.answer}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Bookmarks;