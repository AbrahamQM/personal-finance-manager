package com.abrahamquintana.personalfinancemanager.repository;

import com.abrahamquintana.personalfinancemanager.model.Transaction;
import com.abrahamquintana.personalfinancemanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for managing Transaction entities.
 * Provides CRUD operations and user-scoped query methods.
 */
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * Retrieves all transactions belonging to the specified user.
     *
     * @param user the owner of the transactions
     * @return a list of transactions associated with the user
     */
    List<Transaction> findByUser(User user);
}
