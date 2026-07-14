import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  // Get user information safely
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="container mt-5">

      <div className="card shadow p-5 text-center">


        {/* Welcome Section */}

        <h1 className="mb-3">
          👋 Welcome to InterviewAce
        </h1>


        {
          user ? (

            <div>

              <h3 className="text-primary">
                {user.name}
              </h3>


              <p className="text-muted fs-5">
                📧 {user.email}
              </p>


            </div>

          ) : (

            <p className="text-danger">
              No user information found.
            </p>

          )
        }



        <hr />



        {/* Dashboard Section */}

        <h3 className="mt-3">
          🚀 Interview Preparation Dashboard
        </h3>


        <p className="text-secondary">
          Practice coding questions, improve your skills,
          and prepare for technical interviews.
        </p>



        {/* Future Features */}

        <div className="row mt-4">


          <div className="col-md-4">

            <div className="card p-3 shadow-sm">

              <h5>
                💻 Coding Practice
              </h5>

              <p>
                Solve DSA problems and improve problem-solving skills.
              </p>

            </div>

          </div>



          <div className="col-md-4">

            <div className="card p-3 shadow-sm">

              <h5>
                📚 Interview Questions
              </h5>

              <p>
                Practice technical interview questions.
              </p>

            </div>

          </div>




          <div className="col-md-4">

            <div className="card p-3 shadow-sm">

              <h5>
                📊 Progress Tracking
              </h5>

              <p>
                Track your interview preparation progress.
              </p>

            </div>

          </div>


        </div>




        {/* Logout Button */}

        <button
          className="btn btn-danger mt-5"
          onClick={logout}
        >

          Logout

        </button>


      </div>


    </div>

  );

}


export default Dashboard;