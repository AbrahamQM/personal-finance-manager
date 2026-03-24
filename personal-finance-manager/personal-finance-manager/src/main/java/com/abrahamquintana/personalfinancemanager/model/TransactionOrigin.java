package com.abrahamquintana.personalfinancemanager.model;

/**
 * Indicates the source of a transaction:
 * - REAL: manually created by the user
 * - PREDICTED: future expected transaction
 * - RECURRING: generated from a recurring rule
 */
public enum TransactionOrigin {
    REAL,
    PREDICTED,
    RECURRING
}
