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
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`
};

export const TRANSACTION_ENDPOINTS = {
    ALL: "/transactions",
    CREATE: "/transactions",    
    DELETE: (id) => `/transactions/${id}`
};