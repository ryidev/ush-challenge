// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://ush-frontend-challenge.onrender.com/api/v1",
  ENDPOINTS: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API Methods
export const apiEndpoints = {
  login: () => buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  register: () => buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
};
