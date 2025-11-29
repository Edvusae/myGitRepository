import { state } from "./state/state.js";
import { saveState } from "./storage.js";
import { renderTransactions, updateDashboard } from "./ui.js";

export function addTransaction(data) {
  const newTx = {
    id: Date.now(),
    ...data
  };

  state.transactions.push(newTx);
  saveState();

  renderTransactions();
  updateDashboard();
}

export function deleteTransaction(id) {
  state.transactions = state.transactions.filter(tx => tx.id !== id);
  saveState();

  renderTransactions();
  updateDashboard();
}

export function calculateTotals() {
  let income = 0;
  let expense = 0;

  state.transactions.forEach(tx => {
    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  });

  return {
    income,
    expense,
    balance: income - expense
  };
}

// Initial rendering on script load