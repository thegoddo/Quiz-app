// src/services/api.js
import axios from "axios";
import AuthService from "./auth.service";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const user = AuthService.getCurrentUser();

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${user.token}`;

  return config;
});

export default instance;
