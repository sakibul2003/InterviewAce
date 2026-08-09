import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Bookmarks from "./pages/Bookmarks";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";

// Admin Pages
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container py-4">
        <Routes>

          {/* ===============================
              Public Pages
          =============================== */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />


          {/* ===============================
              Protected User Pages
          =============================== */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/questions"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />

          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-question"
            element={
              <PrivateRoute>
                <AddQuestion />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-question/:id"
            element={
              <PrivateRoute>
                <EditQuestion />
              </PrivateRoute>
            }
          />


          {/* ===============================
              Admin Pages
          =============================== */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />


          {/* ===============================
              404 Page
          =============================== */}

          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h1 className="display-4 fw-bold">
                  404
                </h1>

                <h3 className="fw-bold">
                  Page Not Found
                </h3>

                <p className="text-muted">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;