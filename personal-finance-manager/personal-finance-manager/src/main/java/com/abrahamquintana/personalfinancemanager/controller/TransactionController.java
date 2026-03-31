package com.abrahamquintana.personalfinancemanager.controller;

import com.abrahamquintana.personalfinancemanager.dto.CreateTransactionDto;
import com.abrahamquintana.personalfinancemanager.dto.TransactionDto;
import com.abrahamquintana.personalfinancemanager.mapper.TransactionMapper;
import com.abrahamquintana.personalfinancemanager.model.Category;
import com.abrahamquintana.personalfinancemanager.model.Transaction;
import com.abrahamquintana.personalfinancemanager.model.TransactionType;
import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.repository.CategoryRepository;
import com.abrahamquintana.personalfinancemanager.repository.TransactionRepository;
import com.abrahamquintana.personalfinancemanager.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller providing CRUD operations for user-owned transactions.
 * All endpoints require authentication and operate only on the transactions
 * belonging to the authenticated user.
 */
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final AuthService authService;

    public TransactionController(
            TransactionRepository transactionRepository,
            CategoryRepository categoryRepository,
            AuthService authService
    ) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.authService = authService;
    }

    /**
     * Returns all transactions belonging to the authenticated user.
     *
     * @return a list of TransactionDto objects
     */
    @GetMapping
    public List<TransactionDto> getAll() {
        User user = authService.getAuthenticatedUser();
        return transactionRepository.findByUser(user)
                .stream()
                .map(TransactionMapper::toDto)
                .toList();
    }

    /**
     * Creates a new transaction associated with the authenticated user.
     *
     * @param dto the transaction creation request
     * @return the created TransactionDto
     */
    @PostMapping
    public ResponseEntity<TransactionDto> create(@RequestBody CreateTransactionDto dto) {
        User user = authService.getAuthenticatedUser();

        Category category = categoryRepository.findById(dto.getCategoryId())
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElse(null);

        if (category == null) {
            return ResponseEntity.notFound().build();
        }

        Transaction transaction = Transaction.builder()
                .amount(dto.getAmount())
                .date(dto.getDate())
                .description(dto.getDescription())
                .type(TransactionType.valueOf(dto.getType()))
                .category(category)
                .user(user)
                .recurrence(dto.getRecurrence())
                .build();

        Transaction saved = transactionRepository.save(transaction);
        return ResponseEntity.ok(TransactionMapper.toDto(saved));
    }

    /**
     * Deletes a transaction if it belongs to the authenticated user.
     *
     * @param id the transaction ID
     * @return 204 No Content if deleted, or 404 if not found or unauthorized
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        User user = authService.getAuthenticatedUser();

        var transactionOpt = transactionRepository.findById(id);

        if (transactionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var transaction = transactionOpt.get();

        if (!transaction.getUser().getId().equals(user.getId())) {
            return ResponseEntity.notFound().build();
        }

        transactionRepository.delete(transaction);
        return ResponseEntity.noContent().build();
    }
}
