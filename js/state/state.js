// js/state/state.js - COMPLETE WORKING VERSION
import { getTransactions, saveTransactions } from '../storage/storage.js';

export const state = {
    transactions: [],
    filters: {
        type: "all",
        category: "all",
        search: "",
    },
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear()
};

export function initState() {
    console.log('[State] Initializing...');
    state.transactions = getTransactions();
    console.log('[State] Loaded', state.transactions.length, 'transactions');
}

export function addTransactionToState(transaction) {
    console.log('[State] Adding:', transaction);
    state.transactions.push(transaction);
    saveTransactions(state.transactions);
}

export function removeTransactionFromState(id) {
    console.log('[State] Removing:', id);
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveTransactions(state.transactions);
}

export function getFilteredTransactions() {
    let filtered = [...state.transactions];

    if (state.filters.type !== "all") {
        filtered = filtered.filter(t => t.type === state.filters.type);
    }

    if (state.filters.category !== "all") {
        filtered = filtered.filter(t => t.category === state.filters.category);
    }

    if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(search)
        );
    }

    return filtered;
}

export function setFilter(filterType, value) {
    state.filters[filterType] = value;
}

export function calculateBalance() {
    const income = state.transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expense = state.transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return {
        total: income - expense,
        income,
        expense
    };
}

export function getCategoryData() {
    const expenses = state.transactions.filter(t => t.type === "expense");
    const categoryTotals = {};

    expenses.forEach(t => {
        if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
        }
        categoryTotals[t.category] += parseFloat(t.amount);
    });

    return categoryTotals;
}
