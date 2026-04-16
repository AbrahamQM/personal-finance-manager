export const API_BASE_URL = "http://localhost:8080/api";

export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login"
};

export const USER_ENDPOINTS = {
  PROFILE: "/user/me",
  STATE: "/user/state"
};

export const CATEGORY_ENDPOINTS = {
    ALL: "/categories",
    CREATE: "/categories",
    UPDATE: "/categories", //todo Not used yet, but we can implement it in the future if needed
    DELETE: "/categories"
};

export const TRANSACTION_ENDPOINTS = {
    ALL: "/transactions",
    CREATE: "/transactions",    
    DELETE: "/transactions"
};