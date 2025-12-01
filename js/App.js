// app.js
import { initQuickAdd } from "./features/quickAdd.js";
import { initState, calculateBalance, getCategoryData } from "./state/state.js";
import { initUI, updateBalanceUI } from "./ui/ui.js";
import { renderTransactions } from "./ui/ui-render.js";
import { initChart, updateChart } from "./charts.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize state from localStorage
    initState();

    // Initialize UI components
    initQuickAdd();
    initUI();
    initChart();

    // Render initial data
    const balance = calculateBalance();
    updateBalanceUI(balance);
    renderTransactions();
    updateChart(getCategoryData());

    console.log('NeonFinance initialized successfully!');
});

// app.js