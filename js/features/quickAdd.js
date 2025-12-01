// quickAdd.js
import { getTransactions, saveTransactions } from "../utils/storage.js";
import { updateBalance } from "../utils/updateUI.js";

export const initQuickAdd = () => {
    const titleInput = document.getElementById("quick-title");
    const amountInput = document.getElementById("quick-amount");
    const typeSelect = document.getElementById("quick-type");
    const addBtn = document.getElementById("quick-add-btn");

    addBtn.addEventListener("click", () => {
        const title = titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (!title || isNaN(amount) || amount <= 0) {
            alert("Please provide a valid title and amount.");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            title,
            amount,
            type,
            date: new Date().toISOString()
        };

        const transactions = getTransactions();
        transactions.push(newTransaction);
        saveTransactions(transactions);

        updateBalance(transactions);

        titleInput.value = "";
        amountInput.value = "";
        typeSelect.value = "expense";
    });
};

window.addEventListener("DOMContentLoaded", () => {
    initQuickAdd();
});

// quickAdd.js