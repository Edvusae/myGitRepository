// js/app.js - COMPLETE WORKING VERSION
import { initQuickAdd } from "./features/quickAdd.js";
import { initState, calculateBalance, getCategoryData } from "./state/state.js";
import { initUI, updateBalanceDisplay, renderTransactions } from "./ui/ui.js";
import { initChart, updateChart } from "./charts.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log('=== NeonFinance Starting ===');

    // Initialize state from localStorage
    initState();

    // Initialize UI components
    initQuickAdd();
    initUI();
    initChart();

    // Render initial data
    updateBalanceDisplay();
    renderTransactions();
    updateChart(getCategoryData());

    console.log('=== NeonFinance Ready! ===');
});
