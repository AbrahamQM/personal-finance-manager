package com.abrahamquintana.personalfinancemanager.repository;

import com.abrahamquintana.personalfinancemanager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
