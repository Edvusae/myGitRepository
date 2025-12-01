const KEY = "neonfinance_transactions";

export function loadTransactions() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveTransactions(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadState() {
    const saved = localStorage.getItem("neonfinance_state"); 
    return saved ? JSON.parse(saved) : null;
}
export function saveState(state) {
    localStorage.setItem("neonfinance_state", JSON.stringify(state));
}

// storage.js
export const getTransactions = () => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
};

export const saveTransactions = (transactions) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
};



// --- IGNORE ---