// src/services/api.js (Create a new file for common Axios instance)
import axios from "axios";
import AuthService from "./auth.service"; // Import your auth service

const instance = axios.create({
  baseURL: "http://localhost:8080/api/", // Your main API base URL (not /api/auth/)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token to headers
instance.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser(); // Get user from local storage
    if (user && user.jwt) { // Check if user and JWT token exist
      config.headers["Authorization"] = 'Bearer ' + user.jwt; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance; // Export this configured Axios instance