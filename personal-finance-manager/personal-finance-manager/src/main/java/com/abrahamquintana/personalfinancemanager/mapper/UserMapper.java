package com.abrahamquintana.personalfinancemanager.mapper;

import com.abrahamquintana.personalfinancemanager.dto.UserDto;
import com.abrahamquintana.personalfinancemanager.model.User;

/**
 * Utility class responsible for converting User entities into UserDto objects.
 */
public class UserMapper {

    /**
     * Converts a User entity into a UserDto.
     *
     * @param user the User entity to convert
     * @return a UserDto containing safe user information
     */
    public static UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getEmail());
    }
}
