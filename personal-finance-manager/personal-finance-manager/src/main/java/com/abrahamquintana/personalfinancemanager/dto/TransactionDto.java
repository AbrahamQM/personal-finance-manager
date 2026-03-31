package com.abrahamquintana.personalfinancemanager.dto;

import com.abrahamquintana.personalfinancemanager.model.RecurrenceType;
import com.abrahamquintana.personalfinancemanager.model.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Data Transfer Object representing a transaction with category information.
 * Exposes only safe fields and avoids leaking internal JPA entity details.
 */
@Getter
@AllArgsConstructor
public class TransactionDto {

    /** Unique identifier of the transaction. */
    private Long id;

    /** Monetary amount of the transaction. */
    private BigDecimal amount;

    /** Date when the transaction is scheduled or occurred. */
    private LocalDate date;

    /** Optional description of the transaction. */
    private String description;

    /** Type of the transaction (INCOME or EXPENSE). */
    private TransactionType type;

    /** Identifier of the associated category. */
    private Long categoryId;

    /** Name of the associated category. */
    private String categoryName;

    /** Recurrence type associated to this transaction */
    private RecurrenceType recurrence;
}
