package project.quiz.service;

import project.quiz.model.User;

import java.util.List;
import java.util.Optional;

public interface ScoreService {
    public Optional<User> updateScore(Long userId, Long score);
    public Optional<User>  incrementScore(Long userId, Long score);
    public List<User> getLeaderboard();
}
