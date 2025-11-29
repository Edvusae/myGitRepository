import { state } from "../state/state.js";
import { applyFilters } from "../filters.js";
import { calculateTotals } from "../transactions.js";

const listEl = document.getElementById("transaction-list");
const balanceEl = document.querySelector(".balance-amount");

export function renderTransactions() {
  listEl.innerHTML = "";

  const filtered = applyFilters(state.transactions);

  if (filtered.length === 0) {
    listEl.innerHTML = `<li class="empty-state">No transactions found.</li>`;
    return;
  }

  filtered.forEach(tx => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${tx.text} — ${tx.category}</span>
      <span style="color:${tx.type === "income" ? "var(--success)" : "var(--danger)"};">
        ${tx.type === "income" ? "+" : "-"}$${tx.amount.toFixed(2)}
      </span>
    `;

    listEl.appendChild(li);
  });
}

export function updateDashboard() {
  const totals = calculateTotals();
  balanceEl.textContent = `$${totals.balance.toFixed(2)}`;
}

// Initial rendering on script load