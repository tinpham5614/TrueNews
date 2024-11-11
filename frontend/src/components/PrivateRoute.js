import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem("access_token"); // Check if access token exists
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
