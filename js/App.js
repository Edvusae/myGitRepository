import { loadTransactions } from "./storage.js";
import { renderTransactions, updateBalance } from "./ui.js";
import { initTransactionForm } from "./transactions.js";

window.addEventListener("DOMContentLoaded", () => {
    const data = loadTransactions();
    renderTransactions(data);
    updateBalance(data);
    initTransactionForm();
});

// --- IGNORE ---