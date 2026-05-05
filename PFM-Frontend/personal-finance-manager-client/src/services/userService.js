// src/services/userService.js
import { API_BASE_URL, USER_ENDPOINTS } from "../utils/constants";
import { getToken } from "./authService";

/**
 * Fetches the authenticated user's profile data.
 */
export const getUserState = async () => {
  const token = getToken();
  const userProfileURL = `${API_BASE_URL}${USER_ENDPOINTS.STATE}`;

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(userProfileURL, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  
  return response.json();
};
