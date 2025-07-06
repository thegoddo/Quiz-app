package project.quiz.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import project.quiz.model.User;
import project.quiz.repository.UserRepository;
import project.quiz.service.ScoreService;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreServiceImpl implements ScoreService {
    private final UserRepository userRepository;

    public ScoreServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Optional<User> updateScore(Long userId, Long score) {
        Optional<User> userOptional = userRepository.findById(userId);

        if(userOptional.isPresent()){
            User existingUser = userOptional.get();
            existingUser.setScore(existingUser.getScore() + score);
            return Optional.of(userRepository.save(existingUser));
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public Optional<User> incrementScore(Long userId, Long pointsToAdd) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setScore(user.getScore() + pointsToAdd);
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    public List<User> getLeaderboard() {
        return userRepository.findTop10ByOrderByScoreDesc();
    }
}
