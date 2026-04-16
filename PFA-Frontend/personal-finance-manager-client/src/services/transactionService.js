// src/services/transactionService.js
import { API_BASE_URL, TRANSACTION_ENDPOINTS } from "../utils/constants";
import { getToken } from "../services/authService";

/**
 * Fetch all transactions for the authenticated user.
 * Returns an array of TransactionDto objects.
 */
export const getTransactions = async () => {
    const token = getToken();
    const url = `${API_BASE_URL}${TRANSACTION_ENDPOINTS.ALL}`;

    if (!token) throw new Error("No token found");

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch transactions: ${res.status} ${text}`);
    }

    return res.json();
};

/**
 * Create a new transaction.
 * The payload must match CreateTransactionDto:
 * { amount, date, description, type, categoryId, recurrence }
 * recurrence must be one of: "NO", "MONTHLY", "YEARLY"
 */
export const createTransaction = async (payload) => {
    const token = getToken();
    const url = `${API_BASE_URL}${TRANSACTION_ENDPOINTS.CREATE}`;

    if (!token) throw new Error("No token found");

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create transaction: ${res.status} ${text}`);
    }

    return res.json();
};

/**
 * Delete a transaction by id.
 * Endpoint: DELETE /api/transactions/{id}
 */
export const deleteTransaction = async (id) => {
    const token = getToken();
    const url = `${API_BASE_URL}${TRANSACTION_ENDPOINTS.DELETE}/${id}`;
    
    console.log("Deleting transaction with id:", id,  "\n---URL:", url);

    if (!token) throw new Error("No token found");

    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete transaction: ${res.status} ${text}`);
    }
};
