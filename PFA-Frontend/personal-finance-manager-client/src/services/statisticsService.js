// src/services/statisticsService.js
import { getUserState } from "./userService";

/**
 * Fetches the raw financial state from backend.
 */
export const fetchStatistics = async () => {
  return getUserState();
};

/**
 * Groups transactions by category and sums their amounts.
 * Used for pie charts.
 */
export const groupByCategory = (transactions, type) => {
  const filtered = transactions.filter(t => t.type === type);

  const map = new Map();
  filtered.forEach(t => {
    const key = t.categoryName;
    const prev = map.get(key) || 0;
    map.set(key, prev + Number(t.amount));
  });

  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value
  }));
};

/**
 * Builds a daily balance evolution series from the beginning of the month.
 */
export const buildBalanceSeries = (initialBalance, pastTransactions) => {
  const sorted = [...pastTransactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let balance = Number(initialBalance);
  const series = [];

  sorted.forEach(t => {
    const amount = Number(t.amount);
    balance += t.type === "INCOME" ? amount : -amount;

    series.push({
      date: t.date,
      balance
    });
  });

  return series;
};

/**
 * Filters past transactions (<= today).
 */
export const getPastTransactions = (data) => {
  return data.pastTransactions || [];
};

/**
 * Filters future transactions (> today).
 */
export const getFutureTransactions = (data) => {
  return data.futureTransactions || [];
};
