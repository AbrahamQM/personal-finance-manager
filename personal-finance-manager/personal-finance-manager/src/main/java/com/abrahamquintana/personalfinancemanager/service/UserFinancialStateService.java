package com.abrahamquintana.personalfinancemanager.service;

import com.abrahamquintana.personalfinancemanager.dto.TransactionDto;
import com.abrahamquintana.personalfinancemanager.dto.UserFinancialStateDto;
import com.abrahamquintana.personalfinancemanager.exceptions.UnsupportedRecurrenceTypeException;
import com.abrahamquintana.personalfinancemanager.mapper.TransactionMapper;
import com.abrahamquintana.personalfinancemanager.model.*;
import com.abrahamquintana.personalfinancemanager.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

/**
 * Service responsible for computing the financial state of a user.
 * Each calculation is delegated to a dedicated helper method.
 */
@Service
@Transactional
public class UserFinancialStateService {

    private final TransactionRepository transactionRepository;

    public UserFinancialStateService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Orchestrates the full calculation of the user's financial state.
     */
    public UserFinancialStateDto computeState(User user) {

        generateAndUpdateRecurringTransactionsIfNeeded(user);

        BigDecimal monthInitialBalance = calculateMonthInitialBalance(user);

        List<Transaction> monthTransactions = getTransactionsForCurrentAndNextMonth(user);
        List<TransactionDto> past = filterPastTransactions(monthTransactions);
        List<TransactionDto> future = filterFutureTransactions(monthTransactions);

        BigDecimal income = calculateIncome(past);
        BigDecimal expenses = calculateExpenses(past);

        BigDecimal currentBalance = calculateCurrentBalance(income, expenses);
        BigDecimal dailyAvailable = calculateDailyAvailable(currentBalance, future);
        BigDecimal todayAvailable = calculateTodayAvailable(dailyAvailable, past);

        return new UserFinancialStateDto(
                monthInitialBalance,
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
    //  TRANSACTION FILTERING
    // -------------------------------------------------------------------------

    /**
     * Retrieves all transactions of the current month for the given user.
     */
    private List<Transaction> getTransactionsForCurrentAndNextMonth(User user) {
        LocalDate today = LocalDate.now();
        YearMonth month = YearMonth.from(today);

        return transactionRepository.findByUser(user).stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(month) ||
                             YearMonth.from(t.getDate()).equals(month.plusMonths(1)))
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
                .filter(t -> t.getDate().getMonth().equals(today.getMonth()))
                .filter(t -> t.getDate().isAfter(today))
                .map(TransactionMapper::toDto)
                .toList();
    }

    // -------------------------------------------------------------------------
    //  CALCULATIONS
    // -------------------------------------------------------------------------

    /**
     * Calculates the initial balance of the month by summing all past transactions.
     */
    private BigDecimal calculateMonthInitialBalance(User user) {
        LocalDate startOfTheMonth = LocalDate.now().withDayOfMonth(1);
        return transactionRepository.findByUser(user).stream()
                .filter( t -> t.getDate().isBefore(startOfTheMonth))
                .map(t -> t.getType() == TransactionType.INCOME ? t.getAmount() : t.getAmount().negate())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Sums all income transactions of the month.
     */
    private BigDecimal calculateIncome(List<TransactionDto> transactions) {
        return transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(TransactionDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Sums all expense transactions of the month.
     */
    private BigDecimal calculateExpenses(List<TransactionDto> transactions) {
        return transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(TransactionDto::getAmount)
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
                .filter(t -> t.getType().equals(TransactionType.EXPENSE))
                .map(TransactionDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal futureIncome = future.stream()
                .filter(t -> t.getType().equals(TransactionType.INCOME))
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
                .filter(t -> t.getType().equals(TransactionType.EXPENSE))
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
    //  RECURRING TRANSACTIONS (placeholder, se implementará después)
    // -------------------------------------------------------------------------

    /**
     * Generates new transactions from recurring rules if their execution date is due
     * And marks the ald transactions with recurrence = No
     */
    private void generateAndUpdateRecurringTransactionsIfNeeded(User user) {
        LocalDate today = LocalDate.now();
        List<Transaction> allTransactions = transactionRepository.findByUserAndRecurrenceNot(user, RecurrenceType.NO);
        List<Transaction> transactionsToSave = new ArrayList<>();

        allTransactions.forEach( transaction -> {
            //define next transaction date
            if(transaction.getDate().isBefore(today)) {
                LocalDate recurrenceDate = getRecurrenceDate(transaction);

                // Generate next transaction based on the recurrence rule
                Transaction nextTransaction = getNextTransaction(transaction, recurrenceDate);

                //mark old transaction as NO recurrence
                transaction.setRecurrence(RecurrenceType.NO);

                //add old  transaction to the list of transactions to be saved
                transactionsToSave.add(nextTransaction);
            }
        });

        transactionRepository.saveAll(transactionsToSave);
    }

    /**
     * Compute the next recurrence date for a given transaction.
     *
     * <p>This method supports monthly and yearly recurrence types only.
     * If the transaction has any other recurrence value, an exception is thrown.</p>
     *
     * @param transaction the transaction whose next recurrence date must be computed
     * @return the computed next execution date according to the transaction recurrence
     * @throws UnsupportedRecurrenceTypeException if the transaction recurrence is not MONTHLY or YEARLY
     */
    private LocalDate getRecurrenceDate(Transaction transaction) {
        if(transaction.getRecurrence() != RecurrenceType.MONTHLY && transaction.getRecurrence() != RecurrenceType.YEARLY ){
            throw new UnsupportedRecurrenceTypeException("Only MONTHLY and YEARLY recurrence types are supported. Found type: "
                                                         + transaction.getRecurrence());
        }

        return transaction.getRecurrence().equals(RecurrenceType.MONTHLY) ?
                advanceMonthly(transaction.getDate()) : advanceYearly(transaction.getDate());
    }

    /**
     * Build the next Transaction instance representing the next occurrence.
     *
     * <p>The returned Transaction is a new entity instance.
     * It preserves the recurrence value so the new transaction remains the active recurrence
     * entry in the system.</p>
     *
     * @param transaction the source transaction used as template
     * @param recurrenceDate the date for the next occurrence
     * @return a new Transaction instance representing the next occurrence
     */
    private static Transaction getNextTransaction(Transaction transaction, LocalDate recurrenceDate) {
        return Transaction.builder()
                .amount(transaction.getAmount())
                .date(recurrenceDate) // Placeholder for monthly advancement
                .description(transaction.getDescription())
                .type(transaction.getType())
                .user(transaction.getUser())
                .category(transaction.getCategory())
                .recurrence(transaction.getRecurrence())
                .build();
    }


    /**
     * Advance a date by one month while keeping the original day when possible.
     * If the next month doesn't have the same day (e.g. 31 -> February), the
     * result will be the last valid day of the next month.
     *
     * @param date current date
     * @return date advanced by one month with safe day handling
     */
    private LocalDate advanceMonthly(LocalDate date) {
        int day = date.getDayOfMonth();
        LocalDate next = date.plusMonths(1);
        int lastDay = next.lengthOfMonth();
        return next.withDayOfMonth(Math.min(day, lastDay));
    }

    /**
     * Advance a date by one year while keeping the original day when possible.
     * If the next year doesn't have the same day (e.g. Feb 29 -> non-leap year),
     * the result will be the last valid day of the same month in the next year.
     *
     * @param date current date
     * @return date advanced by one year with safe day handling
     */
    private LocalDate advanceYearly(LocalDate date) {
        int day = date.getDayOfMonth();
        LocalDate next = date.plusYears(1);
        int lastDay = next.lengthOfMonth();
        return next.withDayOfMonth(Math.min(day, lastDay));
    }
}
