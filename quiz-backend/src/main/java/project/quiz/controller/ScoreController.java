package project.quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.quiz.dto.LeaderBoardEntryDto;
import project.quiz.dto.MessageResponse;
import project.quiz.model.User;
import project.quiz.security.UserDetailsImpl;
import project.quiz.service.ScoreService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateScores(@RequestParam Long newScore) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();

        return scoreService.updateScore(userId, newScore)
                .map(user -> ResponseEntity.ok(new MessageResponse("Score updated successfully for user: " + user.getUsername())))
                .orElse(ResponseEntity.badRequest().body(new MessageResponse("User not found or score update failed.")));
    }


    @PutMapping("/increment")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')") // Only authenticated users can increment their score
    public ResponseEntity<?> incrementScore(@RequestParam Long pointsToAdd) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId(); // Get the ID of the currently authenticated user

        return scoreService.incrementScore(userId, pointsToAdd)
                .map(user -> ResponseEntity.ok(new MessageResponse("Score incremented by " + pointsToAdd + " for user: " + user.getUsername())))
                .orElse(ResponseEntity.badRequest().body(new MessageResponse("User not found or score increment failed.")));
    }

    @GetMapping("/leaderboard")
    @PreAuthorize("permitAll()") // Leaderboard can be public
    public ResponseEntity<List<LeaderBoardEntryDto>> getLeaderboard() {
        List<User> topUsers = scoreService.getLeaderboard();
        List<LeaderBoardEntryDto> leaderboard = topUsers.stream()
                .map(user -> new LeaderBoardEntryDto(user.getId(), user.getUsername(), user.getScore()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(leaderboard);
    }
}
