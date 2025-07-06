// src/services/auth.service.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/"; // Adjust port if yours is different

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + "signin", {
        username,
        password,
      });

      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error; 
    }
  }

  // --- Logout Service ---
  logout() {
    localStorage.removeItem("user"); 
  }

  // --- Signup Service ---
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
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
