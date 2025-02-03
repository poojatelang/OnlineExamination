import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { testStatus } = useSelector((state) => state.student); // Get test status from Redux
  
  const token = localStorage.getItem("token");
  const hasStartedTest = localStorage.getItem("hasStartedTest"); // Flag set when user clicks "Start Test"

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user hasn't clicked "Start Test" and tries to access /quiz, redirect
  if (!hasStartedTest ) {
    return <Navigate to="/" replace />;
  }


  if (testStatus === "attended") {
    // If the test is already attended, redirect to the result page
    return <Navigate to="/result" replace />;
  }

  return children; // Allow access to the quiz page if not attended
};

export default ProtectedRoute;
