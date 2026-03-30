package com.abrahamquintana.personalfinancemanager.repository;

import com.abrahamquintana.personalfinancemanager.model.RecurrenceType;
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


    /**
     * Returns all transactions for the given user that are marked as recurrent.
     * A recurrent transaction is defined as one whose recurrence field is not
     * RecurrenceType.NO. These are the rows that the recurrence generator will inspect.
     *
     * @param user the owner of the transactions
     * @param no   the RecurrenceType.NO constant (used by Spring Data to build the query)
     * @return list of transactions that are recurrent (recurrence != NO)
     */
    List<Transaction> findByUserAndRecurrenceNot(User user, RecurrenceType no);


}
