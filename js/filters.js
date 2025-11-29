import { state } from "./state.js";

export function applyFilters(transactions) {
  let result = [...transactions];

  if (state.filters.type !== "all") {
    result = result.filter(t => t.type === state.filters.type);
  }

  if (state.filters.category !== "all") {
    result = result.filter(t => t.category === state.filters.category);
  }

  if (state.filters.search.trim() !== "") {
    result = result.filter(t =>
      t.text.toLowerCase().includes(state.filters.search.toLowerCase())
    );
  }

  return result;
}

// --- IGNORE ---