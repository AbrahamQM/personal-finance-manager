package com.abrahamquintana.personalfinancemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Data Transfer Object representing a category without exposing internal entity details.
 */
@Getter
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
}
