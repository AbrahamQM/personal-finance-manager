// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { getToken, saveToken, logoutUser } from "../services/authService";

// Create the context
export const AuthContext = createContext();

/**
 * AuthProvider wraps the entire application and exposes
 * authentication state and actions to all components.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email: "...", token: "..." }
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first render
  useEffect(() => {
    const token = getToken();
    if (token) {
      // TODO: decode token or fetch user info if needed
      setUser({ email: "unknown", token }); 
    }
    setLoading(false);
  }, []);

  /**
   * Handles login: saves token and updates user state.
   */
  const login = (email, token) => {
    saveToken(token);
    setUser({ email, token });
  };

  /**
   * Handles logout: clears token and resets user state.
   */
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
