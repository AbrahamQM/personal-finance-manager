package com.abrahamquintana.personalfinancemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Data Transfer Object representing a simplified view of a User.
 * Used to safely expose user information without sensitive fields.
 */
@Getter
@AllArgsConstructor
public class UserDto {

    /** The unique identifier of the user. */
    private Long id;

    /** The email address of the user. */
    private String email;
}
