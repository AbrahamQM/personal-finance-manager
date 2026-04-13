// src/services/categoryService.js
import { API_BASE_URL, CATEGORY_ENDPOINTS } from "../utils/constants";
import { getToken } from "./authService";

export const getCategory = async () => {
  const token = getToken();
  const url = `${API_BASE_URL}${CATEGORY_ENDPOINTS.ALL}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Category");
  }

  return response.json();
};

export const createCategory = async (name) => {
  const token = getToken();
  const url = `${API_BASE_URL}${CATEGORY_ENDPOINTS.CREATE}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};
