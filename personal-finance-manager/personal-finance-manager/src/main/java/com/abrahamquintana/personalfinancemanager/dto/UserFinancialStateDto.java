package com.abrahamquintana.personalfinancemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO representing the complete financial state of a user.
 * Includes past and future transactions of the current month,
 * balance information and spending projections.
 */
@Getter
@Setter
@AllArgsConstructor
public class UserFinancialStateDto {

    /** Balance at the beginning of the month, before any transactions. */
    private BigDecimal monthInitialBalance;

    /** Real current balance based on past transactions. */
    private BigDecimal currentBalance;

    /** Total income registered in the current month. */
    private BigDecimal totalIncomeThisMonth;

    /** Total expenses registered in the current month. */
    private BigDecimal totalExpenseThisMonth;

    /** Money available per day considering future expenses of the month. */
    private BigDecimal dailyAvailable;

    /** Money available today considering today's expenses. */
    private BigDecimal todayAvailable;

    /** Past transactions of the current month. */
    private List<TransactionDto> pastTransactions;

    /** Future transactions of the current month (predicted or recurring). */
    private List<TransactionDto> futureTransactions;
}
