import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { testStatus } = useSelector((state) => state.student);

  const token = localStorage.getItem("token");
  const hasStartedTest = localStorage.getItem("hasStartedTest");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!hasStartedTest) {
    return <Navigate to="/" replace />;
  }

  if (testStatus === "attended") {
    return <Navigate to="/result" replace />;
  }

  return children;
};

export default ProtectedRoute;
