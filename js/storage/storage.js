// js/storage/storage.js
const TRANSACTIONS_KEY = "neonfinance_transactions";
const STATE_KEY = "neonfinance_state";

export function getTransactions() {
    try {
        return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    } catch (e) {
        console.error("Error loading transactions:", e);
        return [];
    }
}

export function saveTransactions(transactions) {
    try {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        return true;
    } catch (e) {
        console.error("Error saving transactions:", e);
        return false;
    }
}

export function addTransaction(transaction) {
    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
    return transactions;
}

export function deleteTransaction(id) {
    const transactions = getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    saveTransactions(filtered);
    return filtered;
}

export function updateTransaction(id, updates) {
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updates };
        saveTransactions(transactions);
    }
    return transactions;
}

export function loadState() {
    try {
        const saved = localStorage.getItem(STATE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.error("Error loading state:", e);
        return null;
    }
}

export function saveState(state) {
    try {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
        return true;
    } catch (e) {
        console.error("Error saving state:", e);
        return false;
    }
}

// storage.js