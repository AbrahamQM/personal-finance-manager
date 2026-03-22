package com.abrahamquintana.personalfinancemanager.controller;

import com.abrahamquintana.personalfinancemanager.dto.UserDto;
import com.abrahamquintana.personalfinancemanager.mapper.UserMapper;
import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller exposing endpoints related to authenticated user information.
 * Requires a valid JWT token for all operations.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Returns the profile information of the authenticated user.
     *
     * @return a UserDto containing the user's id and email
     */
    @GetMapping("/me")
    public ResponseEntity<UserDto> getProfile() {
        User user = authService.getAuthenticatedUser();
        return ResponseEntity.ok(UserMapper.toDto(user));
    }
}
