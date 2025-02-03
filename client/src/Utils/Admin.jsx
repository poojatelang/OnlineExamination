import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({children}) => {
  const token = localStorage.getItem("token");
  const userInfo = token ? JSON.parse(localStorage.getItem("userinfo")) : null; 
  const isAdmin = userInfo?.role === "admin"; 
  const navigate=useNavigate()
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; // Extract role from token

    if (isAdmin && userRole !== "admin") {
      return <Navigate to="/" />;
    }

    if (userRole !== "admin") {
        return <Navigate to="/" />; // Redirect non-admin users
      }
      
      // Allow admin users to access the Admin Dashboard
    //   return <Outlet />;  // This will allow rendering the Admin Dashboard component
    return children
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouteAdmin;