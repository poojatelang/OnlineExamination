import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Instructions from "./Pages/Instructions";
import Quiz from "./Pages/Quiz";
import ResultPage from "./Pages/Result";
import ProtectedRoute from "./Utils/Auth";

import ProtectedRouteAdmin from "./Utils/Admin";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentView from "./AdminPages/StudentView";
import CreateQuestions from "./AdminPages/CreateQuestions";
import ReadQuestions from "./AdminPages/ReadallQuestions";
import EditQuestion from "./AdminPages/UpdatePage";

const ProtectedAdminRoute = () => {
  return (
    <ProtectedRouteAdmin>
      <AdminDashboard />
    </ProtectedRouteAdmin>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instruction" element={<Instructions />} />
          <Route path="/admin-dashboard" element={<ProtectedAdminRoute />} />
          {/* Protected route for the quiz page */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route path="/result" element={<ResultPage />} />

          <Route path="/students-view" element={<StudentView />} />
          <Route path="/delete-students" element={<StudentView />} />

          <Route path="/add-questions" element={<CreateQuestions />} />
          <Route path="/questions-view" element={<ReadQuestions />} />
          <Route path="/update-questions" element={<ReadQuestions />} />
          <Route path="/update-questions/:id" element={<EditQuestion />} />
          <Route path="/delete-questions" element={<ReadQuestions />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </Provider>
  );
};

export default App;
