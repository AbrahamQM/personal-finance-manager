package com.abrahamquintana.personalfinancemanager.repository;

import com.abrahamquintana.personalfinancemanager.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
