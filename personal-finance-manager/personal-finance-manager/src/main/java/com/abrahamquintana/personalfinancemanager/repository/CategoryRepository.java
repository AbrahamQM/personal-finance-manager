package com.abrahamquintana.personalfinancemanager.repository;

import com.abrahamquintana.personalfinancemanager.model.Category;
import com.abrahamquintana.personalfinancemanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository interface for managing Category entities.
 * Extends JpaRepository to provide basic CRUD operations.
 *
 * Includes custom query methods for retrieving categories
 * that belong to a specific authenticated user.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Retrieves all categories associated with the given user.
     *
     * @param user the owner of the categories
     * @return a list of categories belonging to the specified user
     */
    List<Category> findByUser(User user);

}
