package com.abrahamquintana.personalfinancemanager.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO used for creating or updating a category.
 * Contains only the fields that clients are allowed to provide.
 */
@Getter
@Setter
public class CreateCategoryDto {
    private String name;
}
