import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Folder/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to the login page, but save the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
