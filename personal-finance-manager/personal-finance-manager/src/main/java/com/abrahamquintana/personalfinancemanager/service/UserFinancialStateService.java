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
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/**
 * Service responsible for computing the financial state of a user,
 * including balances, past and future transactions and projections.
 */
@Service
public class UserFinancialStateService {

    private final TransactionRepository transactionRepository;

    public UserFinancialStateService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Computes the complete financial state of the given user.
     *
     * @param user authenticated user
     * @return UserFinancialStateDto containing balance and transaction data
     */
    public UserFinancialStateDto computeState(User user) {

        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(today);

        List<Transaction> allUserTransactions = transactionRepository.findByUser(user);

        // Past transactions of this month
        List<TransactionDto> past = allUserTransactions.stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(currentMonth))
                .filter(t -> !t.getDate().isAfter(today))
                .map(TransactionMapper::toDto)
                .toList();

        // Future transactions of this month
        List<TransactionDto> future = allUserTransactions.stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(currentMonth))
                .filter(t -> t.getDate().isAfter(today))
                .map(TransactionMapper::toDto)
                .toList();

        // Income this month
        BigDecimal income = allUserTransactions.stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(currentMonth))
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Expenses this month
        BigDecimal expenses = allUserTransactions.stream()
                .filter(t -> YearMonth.from(t.getDate()).equals(currentMonth))
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Current balance (real transactions only)
        BigDecimal currentBalance = income.subtract(expenses);

        // Daily available (simple version)
        int daysRemaining = currentMonth.lengthOfMonth() - today.getDayOfMonth() + 1;
        BigDecimal dailyAvailable = daysRemaining > 0
                ? currentBalance.divide(BigDecimal.valueOf(daysRemaining), BigDecimal.ROUND_HALF_UP)
                : BigDecimal.ZERO;

        // Today available (simple version)
        BigDecimal todayAvailable = dailyAvailable;

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
