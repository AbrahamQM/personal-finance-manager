package com.abrahamquintana.personalfinancemanager.service;

import com.abrahamquintana.personalfinancemanager.dto.TransactionDto;
import com.abrahamquintana.personalfinancemanager.dto.UserFinancialStateDto;
import com.abrahamquintana.personalfinancemanager.mapper.TransactionMapper;
import com.abrahamquintana.personalfinancemanager.model.Transaction;
import com.abrahamquintana.personalfinancemanager.model.TransactionType;
import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/**
 * Service responsible for computing the financial state of a user.
 * Each calculation is delegated to a dedicated helper method.
 */
@Service
public class UserFinancialStateService {

    private final TransactionRepository transactionRepository;

    public UserFinancialStateService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Orchestrates the full calculation of the user's financial state.
     */
    public UserFinancialStateDto computeState(User user) {

        generateRecurringTransactionsIfNeeded(user);

        List<Transaction> monthTransactions = getTransactionsForCurrentMonth(user);

        List<TransactionDto> past = filterPastTransactions(monthTransactions);
        List<TransactionDto> future = filterFutureTransactions(monthTransactions);

        BigDecimal income = calculateIncome(monthTransactions);
        BigDecimal expenses = calculateExpenses(monthTransactions);

        BigDecimal currentBalance = calculateCurrentBalance(income, expenses);
        BigDecimal dailyAvailable = calculateDailyAvailable(currentBalance, future);
        BigDecimal todayAvailable = calculateTodayAvailable(dailyAvailable, past);

        return toDto(
                currentBalance,
                income,
                expenses,
                dailyAvailable,
                todayAvailable,
                past,
                future
        );
    }

    // -------------------------------------------------------------------------
    //  RECURRING TRANSACTIONS (placeholder, se implementará después)
    // -------------------------------------------------------------------------

    /**
     * Generates new transactions from recurring rules if their execution date is due.
     */
    private void generateRecurringTransactionsIfNeeded(User user) {
        // TODO: Implementar lógica de recurrencia
        System.out.println("generateRecurringTransactionsIfNeeded Por crear");
    }

    // -------------------------------------------------------------------------
    //  TRANSACTION FILTERING
    // -------------------------------------------------------------------------

    /**
     * Retrieves all transactions of the current month for the given user.
     */
    private List<Transaction> getTransactionsForCurrentMonth(User user) {
        LocalDate today = LocalDate.now();
        YearMonth month = YearMonth.from(today);

        return transactionRepository.findByUser(user).stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(month))
                .toList();
    }

    /**
     * Returns all transactions up to today.
     */
    private List<TransactionDto> filterPastTransactions(List<Transaction> transactions) {
        LocalDate today = LocalDate.now();
        return transactions.stream()
                .filter(t -> !t.getDate().isAfter(today))
                .map(TransactionMapper::toDto)
                .toList();
    }

    /**
     * Returns all transactions after today.
     */
    private List<TransactionDto> filterFutureTransactions(List<Transaction> transactions) {
        LocalDate today = LocalDate.now();
        return transactions.stream()
                .filter(t -> t.getDate().isAfter(today))
                .map(TransactionMapper::toDto)
                .toList();
    }

    // -------------------------------------------------------------------------
    //  CALCULATIONS
    // -------------------------------------------------------------------------

    /**
     * Sums all income transactions of the month.
     */
    private BigDecimal calculateIncome(List<Transaction> transactions) {
        return transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Sums all expense transactions of the month.
     */
    private BigDecimal calculateExpenses(List<Transaction> transactions) {
        return transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Calculates the real current balance.
     */
    private BigDecimal calculateCurrentBalance(BigDecimal income, BigDecimal expenses) {
        return income.subtract(expenses);
    }

    /**
     * Calculates daily available money considering future transactions.
     */
    private BigDecimal calculateDailyAvailable(BigDecimal balance, List<TransactionDto> future) {
        LocalDate today = LocalDate.now();
        YearMonth month = YearMonth.from(today);

        BigDecimal futureExpenses = future.stream()
                .filter(t -> t.getType().equals("EXPENSE"))
                .map(TransactionDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal futureIncome = future.stream()
                .filter(t -> t.getType().equals("INCOME"))
                .map(TransactionDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal projectedBalance = balance.add(futureIncome).subtract(futureExpenses);

        int daysRemaining = month.lengthOfMonth() - today.getDayOfMonth() + 1;

        return daysRemaining > 0
                ? divideMoney(projectedBalance, daysRemaining)
                : BigDecimal.ZERO;
    }

    /**
     * Calculates today's available money.
     */
    private BigDecimal calculateTodayAvailable(BigDecimal dailyAvailable, List<TransactionDto> past) {
        BigDecimal spentToday = past.stream()
                .filter(t -> t.getDate().equals(LocalDate.now()))
                .filter(t -> t.getType().equals("EXPENSE"))
                .map(TransactionDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return dailyAvailable.subtract(spentToday);
    }

    // -------------------------------------------------------------------------
    //  MONEY UTILITIES
    // -------------------------------------------------------------------------

    /**
     * Divides a monetary value using HALF_UP rounding with 2 decimals.
     */
    private BigDecimal divideMoney(BigDecimal value, int divisor) {
        return value.divide(
                BigDecimal.valueOf(divisor),
                2,
                RoundingMode.HALF_UP
        );
    }

    // -------------------------------------------------------------------------
    //  DTO BUILDER
    // -------------------------------------------------------------------------

    private UserFinancialStateDto toDto(
            BigDecimal currentBalance,
            BigDecimal income,
            BigDecimal expenses,
            BigDecimal dailyAvailable,
            BigDecimal todayAvailable,
            List<TransactionDto> past,
            List<TransactionDto> future
    ) {
        return new UserFinancialStateDto(
                currentBalance,
                income,
                expenses,
                dailyAvailable,
                todayAvailable,
                past,
                future
        );
    }
}
