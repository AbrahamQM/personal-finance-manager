// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { 
  getToken, 
  saveToken, 
  logoutUser, 
  saveUserEmail, 
  getUserEmail, 
  removeUserEmail 
} from "../services/authService";

// Create the context
export const AuthContext = createContext();

/**
 * AuthProvider wraps the entire application and exposes
 * authentication state and actions to all components.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email: "...", token: "..." }
  const [loading, setLoading] = useState(true);

  /**
   * Load user from localStorage on first render.
   * This ensures the user stays logged in after page refresh.
   */
  useEffect(() => {
    const token = getToken();
    const email = getUserEmail();

    if (token && email) {
      setUser({ email, token });
    }

    setLoading(false);
  }, []);

  /**
   * Handles login: saves token and email, updates user state.
   */
  const login = (email, token) => {
    saveToken(token);
    saveUserEmail(email);
    setUser({ email, token });
  };

  /**
   * Handles logout: clears token and email, resets user state.
   */
  const logout = () => {
    logoutUser();
    removeUserEmail();
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
