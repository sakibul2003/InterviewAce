import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Bookmarks from "./pages/Bookmarks";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <Navbar />

      {/* Application Routes */}
      <Routes>

        {/* ===============================
            Public Pages
        =============================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/questions" element={<Questions />} />

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
        <Route
  path="/admin"
  element={
    <PrivateRoute>
      <AdminPanel />
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;