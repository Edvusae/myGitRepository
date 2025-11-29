import { loadTransactions, saveTransactions } from "./storage.js";
import { renderTransactions, updateBalance } from "./ui.js";

export function initTransactionForm() {
    const form = document.querySelector("#transaction-form");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const title = form.title.value.trim();
        const amount = parseFloat(form.amount.value);
        const category = form.category.value;
        const date = form.date.value;
        const type = form.type.value; // income or expense

        if (!title || !amount || !date) {
            alert("Please fill all the fields");
            return;
        }

        const transaction = {
            id: Date.now(),
            title,
            amount,
            category,
            date,
            type
        };

        const data = loadTransactions();
        data.push(transaction);
        saveTransactions(data);

        form.reset();

        renderTransactions(data);
        updateBalance(data);
    });
}

export function calculateTotals() {
    const data = loadTransactions();
    let income = 0;
    let expense = 0;
    data.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });
    return { income, expense };
}
// Initial rendering on script load
const data = loadTransactions();
renderTransactions(data);
updateBalance(data);

export function addTransaction(transaction) {
    const data = loadTransactions();
    data.push(transaction);   
    saveTransactions(data);
    renderTransactions(data);
    updateBalance(data);
}


export function deleteTransaction(id) {
    let data = loadTransactions();
    data = data.filter(t => t.id !== id);
    saveTransactions(data);
    renderTransactions(data);
    updateBalance(data);
}