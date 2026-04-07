// src/services/authService.js
import { API_BASE_URL, AUTH_ENDPOINTS } from "../utils/constants";

/**
 * Sends login credentials to the backend and returns the JWT token.
 */
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return response.json(); // expected: { token: "...", email: "...", ... }
};

/**
 * Sends registration data to the backend.
 */
export const registerUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response.json();
};

/**
 * Saves JWT token in localStorage.
 */
export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
};

/**
 * Retrieves JWT token from localStorage.
 */
export const getToken = () => {
    return localStorage.getItem("authToken");
};

/**
 * Removes JWT token from localStorage.
 */
export const logoutUser = () => {
    localStorage.removeItem("authToken");
};
