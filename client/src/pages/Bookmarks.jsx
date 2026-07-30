import { useEffect, useState } from "react";
import API from "../services/api";

function Bookmarks() {
  const [questions, setQuestions] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions");

      const allQuestions = res.data.questions;
      setQuestions(allQuestions);

      const bookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

      const savedQuestions = allQuestions.filter((question) =>
        bookmarks.includes(question._id)
      );

      setBookmarkedQuestions(savedQuestions);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookmarked questions");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        ⭐ My Bookmarked Questions
      </h2>

      {bookmarkedQuestions.length === 0 ? (
        <div className="alert alert-warning text-center">
          No bookmarked questions yet.
        </div>
      ) : (
        bookmarkedQuestions.map((question) => (
          <div className="card shadow mb-4" key={question._id}>
            <div className="card-body">

              <h4>{question.title}</h4>

              <p>
                <strong>Category:</strong>{" "}
                <span className="badge bg-primary">
                  {question.category}
                </span>
              </p>

              <p>
                <strong>Difficulty:</strong>{" "}
                <span
                  className={`badge ${
                    question.difficulty === "Easy"
                      ? "bg-success"
                      : question.difficulty === "Medium"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {question.difficulty}
                </span>
              </p>

              <div className="alert alert-light border">
                <strong>Answer:</strong>
                <br />
                {question.answer}
              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Bookmarks;