// src/services/quiz.service.js
// src/services/quiz.service.js
import api from "./api"; // CORRECT: Using your configured instance

class QuizService {
  async getQuestions() {
    try {
      const response = await api.get("/countries/quiz"); // CORRECT: Using api.get
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw error;
    }
  }

  async updateScore(score) {
    try {
      const response = await api.put(`/scores/update?${score}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching score:", error);
      throw error;
    }
  }
}

export default new QuizService();
