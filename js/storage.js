// storage.js
import { state } from "./state.js";

const STORAGE_KEY = "neonfinance-data";

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
}

export function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    state.transactions = JSON.parse(data);
  }
}

// Load state on initial script execution
loadState();