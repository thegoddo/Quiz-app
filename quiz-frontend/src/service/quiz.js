// src/services/quiz.service.js
import api from "./api"; // Use the configured Axios instance

class QuizService {
  async getQuestions() {
    try {
      const response = await api.get("/countries/quiz"); // Example endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw error;
    }
  }
  // ... other quiz-related API calls
}

export default new QuizService();
