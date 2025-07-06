// src/services/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + "signin", {
        username,
        password,
      });

      // --- This is the area we need to focus on ---
      if (response.data.token) {
        // <-- Is 'response.data.jwt' actually present?
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("User data stored in localStorage:", response.data); // Debugging
      } else {
        console.log(
          "Login response.data does NOT contain 'jwt':",
          response.data
        ); // Crucial debug log
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password, roles = []) {
    try {
      const response = await axios.post(API_URL + "signup", {
        username,
        email,
        password,
        role: roles,
      });
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    console.log("User from localStorage:", user); // Add this for debugging
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("Parsed user:", parsedUser); // Add this for debugging
      return parsedUser;
    }
    return null;
  }
}

export default new AuthService();
