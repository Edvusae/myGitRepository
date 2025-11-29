import { loadState } from "./storage.js";
import { addTransaction, calculateTotals } from "./transactions.js";
import { renderTransactions, updateDashboard } from "./ui.js";
import { renderDonutChart } from "./chart.js";
import { state } from "./state/state.js";

const form = document.getElementById("transaction-form");
const filterType = document.getElementById("filter-type");
const filterCat = document.getElementById("filter-category");
const searchInput = document.getElementById("search-input");

// Load saved data
loadState();
renderTransactions();
updateDashboard();

const totals = calculateTotals();
renderDonutChart(totals.income, totals.expense);

// Add transaction
form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    text: form.text.value,
    amount: Number(form.amount.value),
    category: form.category.value,
    date: form.date.value,
    type: form.type.value
  };

  addTransaction(data);
  form.reset();
});

// Filters
filterType.addEventListener("change", () => {
  state.filters.type = filterType.value;
  renderTransactions();
});

filterCat.addEventListener("change", () => {
  state.filters.category = filterCat.value;
  renderTransactions();
});

// Search
searchInput.addEventListener("input", () => {
  state.filters.search = searchInput.value;
  renderTransactions();
});

// Initial rendering on script load