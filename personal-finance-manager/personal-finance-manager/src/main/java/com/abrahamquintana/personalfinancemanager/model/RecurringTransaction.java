package com.abrahamquintana.personalfinancemanager.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Represents a recurring financial event such as salary, rent or subscriptions.
 * Used to generate future Transaction instances automatically.
 */
@Entity
@Table(name = "recurring_transactions")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecurringTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Amount for each occurrence of the recurring transaction. */
    @Column(nullable = false)
    private BigDecimal amount;

    /** Optional description. */
    private String description;

    /** INCOME or EXPENSE. */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    /** Recurrence pattern (monthly, yearly, etc.). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecurrenceType recurrence;

    /**
     * Day of month or week when the transaction occurs.
     * For MONTHLY/YEARLY: day of month (1–31)
     * For WEEKLY: day of week (1–7)
     */
    @Column(nullable = false)
    private Integer recurrenceDay;

    /**
     * Next date when this recurring rule should generate a real Transaction.
     */
    @Column(nullable = false)
    private LocalDate nextExecutionDate;

    /** Category associated with the recurring transaction. */
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /** Owner of the recurring transaction. */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
