package com.abrahamquintana.personalfinancemanager.dto;

import com.abrahamquintana.personalfinancemanager.model.RecurrenceType;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO used for creating or updating a transaction.
 * Contains only the fields that clients are allowed to provide.
 */
@Getter
@Setter
public class CreateTransactionDto {

    /** Monetary amount of the transaction. */
    private BigDecimal amount;

    /** Date when the transaction is scheduled or occurred. */
    private LocalDate date;

    /** Optional description of the transaction. */
    private String description;

    /** Type of the transaction (INCOME or EXPENSE). */
    private String type;

    /** Identifier of the category to associate the transaction with. */
    private Long categoryId;

    /** Recurrence type associated to this transaction */
    private RecurrenceType recurrence;
}
