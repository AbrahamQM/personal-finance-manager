// src/router/RequireAuth.js
import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Protects routes that require authentication.
 */
const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // While checking auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  // If not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated → render the protected component
  return children;
};

export default RequireAuth;

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};