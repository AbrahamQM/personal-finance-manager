package com.abrahamquintana.personalfinancemanager.exceptions;

/**
 * Exception thrown when a transaction has an unsupported recurrence type
 * for recurrence date computation.
 *
 * <p>Extends IllegalArgumentException because the problem is an invalid
 * argument/state of the Transaction instance provided to the recurrence logic.</p>
 */
public class UnsupportedRecurrenceTypeException extends IllegalArgumentException {
    public UnsupportedRecurrenceTypeException(String message) {
        super(message);
    }
}