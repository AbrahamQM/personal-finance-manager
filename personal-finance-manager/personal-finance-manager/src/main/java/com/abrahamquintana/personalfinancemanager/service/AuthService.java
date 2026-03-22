package com.abrahamquintana.personalfinancemanager.service;

import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Service responsible for retrieving the authenticated user from the security context.
 * Provides helper methods to access the current user's information based on the JWT token.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves the authenticated user based on the email extracted from the JWT token.
     *
     * @return the authenticated User entity
     * @throws RuntimeException if the user cannot be found
     */
    public User getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
