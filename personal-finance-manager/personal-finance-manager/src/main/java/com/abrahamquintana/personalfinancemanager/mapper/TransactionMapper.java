package com.abrahamquintana.personalfinancemanager.mapper;

import com.abrahamquintana.personalfinancemanager.dto.TransactionDto;
import com.abrahamquintana.personalfinancemanager.model.Transaction;

/**
 * Utility class responsible for converting Transaction entities into TransactionDto objects.
 */
public class TransactionMapper {
    private TransactionMapper() {
        /* This utility class should not be instantiated */
    }

    /**
     * Converts a Transaction entity into a TransactionDto.
     *
     * @param transaction the Transaction entity to convert
     * @return a TransactionDto containing safe transaction information
     */
    public static TransactionDto toDto(Transaction transaction) {
        return new TransactionDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getDescription(),
                transaction.getType(),
                transaction.getCategory().getId(),
                transaction.getCategory().getName(),
                transaction.getRecurrence()
        );
    }
}
