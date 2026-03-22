package com.abrahamquintana.personalfinancemanager.mapper;

import com.abrahamquintana.personalfinancemanager.dto.CategoryDto;
import com.abrahamquintana.personalfinancemanager.model.Category;

/**
 * Utility class responsible for converting Category entities into CategoryDto objects.
 */
public class CategoryMapper {

    public static CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName()
        );
    }
}
