package com.abrahamquintana.personalfinancemanager.controller;

import com.abrahamquintana.personalfinancemanager.dto.CategoryDto;
import com.abrahamquintana.personalfinancemanager.dto.CreateCategoryDto;
import com.abrahamquintana.personalfinancemanager.mapper.CategoryMapper;
import com.abrahamquintana.personalfinancemanager.model.Category;
import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.repository.CategoryRepository;
import com.abrahamquintana.personalfinancemanager.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * REST controller providing CRUD operations for user-owned categories.
 * All endpoints require authentication and operate only on the categories
 * belonging to the authenticated user.
 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final AuthService authService;

    public CategoryController(CategoryRepository categoryRepository, AuthService authService) {
        this.categoryRepository = categoryRepository;
        this.authService = authService;
    }

    /**
     * Returns all categories belonging to the authenticated user.
     *
     * @return a list of CategoryDto objects
     */
    @GetMapping
    public List<CategoryDto> getAll() {
        User user = authService.getAuthenticatedUser();
        return categoryRepository.findByUser(user)
                .stream()
                .map(CategoryMapper::toDto)
                .toList();
    }

    /**
     * Creates a new category associated with the authenticated user.
     *
     * @param dto the category creation request
     * @return the created CategoryDto
     */
    @PostMapping
    public ResponseEntity<CategoryDto> create(@RequestBody CreateCategoryDto dto) {
        User user = authService.getAuthenticatedUser();

        Category category = Category.builder()
                .name(dto.getName())
                .user(user)
                .build();

        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(CategoryMapper.toDto(saved));
    }

    /**
     * Updates an existing category if it belongs to the authenticated user.
     *
     * @param id the category ID
     * @param dto the update request
     * @return the updated CategoryDto or 404 if not found or not owned by the user
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> update(
            @PathVariable Long id,
            @RequestBody CreateCategoryDto dto
    ) {
        User user = authService.getAuthenticatedUser();

        var categoryOpt = categoryRepository.findById(id);

        if (categoryOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var category = categoryOpt.get();

        if (!category.getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }

        category.setName(dto.getName());
        Category updated = categoryRepository.save(category);

        return ResponseEntity.ok(CategoryMapper.toDto(updated));
    }

    /**
     * Deletes a category if it belongs to the authenticated user.
     *
     * @param id the category ID
     * @return 204 No Content if deleted, or 404 if not found or unauthorized
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        User user = authService.getAuthenticatedUser();

        var categoryOpt = categoryRepository.findById(id);

        if (categoryOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var category = categoryOpt.get();

        if (!category.getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }

        categoryRepository.delete(category);
        return ResponseEntity.noContent().build();
    }
}
