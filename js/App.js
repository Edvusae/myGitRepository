import { initQuickAdd } from "./features/quickAdd.js";
import { initState, calculateBalance, getCategoryData } from "./state/state.js";
import { initUI, updateBalanceDisplay, renderTransactions } from "./ui/ui.js";
import { initChart, updateChart } from "./charts.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log('=== NeonFinance Starting ===');
    initState();
    initQuickAdd();
    initUI();
    initChart();
    updateBalanceDisplay();
    renderTransactions();
    updateChart(getCategoryData());
    console.log('=== NeonFinance Ready! ===');
});

// js/App.js