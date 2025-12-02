// js/monthSelector.js
import { state, getFilteredTransactions } from './state/state.js';
import { renderTransactions } from './ui/ui.js';
import { updateChart } from './charts.js';
import { getCategoryData, calculateBalance } from './state/state.js';
import { updateBalanceDisplay } from './ui/ui.js';

export function initMonthSelector() {
    console.log('[MonthSelector] Initializing...');
    
    const monthSelect = document.getElementById('filter-month');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    
    if (!monthSelect || !prevButton || !nextButton) {
        console.error('[MonthSelector] Elements not found');
        return;
    }
    
    // Populate months dropdown
    populateMonths(monthSelect);
    
    // Set current month as default
    const now = new Date();
    const currentValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    monthSelect.value = currentValue;
    
    // Store current selection in state
    state.selectedMonth = currentValue;
    
    // Month select change handler
    monthSelect.addEventListener('change', (e) => {
        state.selectedMonth = e.target.value;
        updateViewForMonth();
    });
    
    // Previous month button
    prevButton.addEventListener('click', () => {
        const current = new Date(state.selectedMonth + '-01');
        current.setMonth(current.getMonth() - 1);
        const newValue = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthSelect.value = newValue;
        state.selectedMonth = newValue;
        updateViewForMonth();
    });
    
    // Next month button
    nextButton.addEventListener('click', () => {
        const current = new Date(state.selectedMonth + '-01');
        current.setMonth(current.getMonth() + 1);
        const newValue = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthSelect.value = newValue;
        state.selectedMonth = newValue;
        updateViewForMonth();
    });
    
    console.log('[MonthSelector] Initialized successfully');
}

function populateMonths(selectElement) {
    // Get all unique months from transactions
    const months = new Set();
    
    // Add current month
    const now = new Date();
    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        months.add(value);
    }
    
    // Add months from transactions
    state.transactions.forEach(t => {
        const date = new Date(t.date);
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        months.add(value);
    });
    
    // Sort months (newest first)
    const sortedMonths = Array.from(months).sort().reverse();
    
    // Populate dropdown
    selectElement.innerHTML = sortedMonths.map(value => {
        const [year, month] = value.split('-');
        const date = new Date(year, month - 1, 1);
        const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        return `<option value="${value}">${label}</option>`;
    }).join('');
}

function updateViewForMonth() {
    console.log('[MonthSelector] Filtering for month:', state.selectedMonth);
    
    // Filter transactions by selected month
    const [year, month] = state.selectedMonth.split('-');
    const filteredTransactions = state.transactions.filter(t => {
        const tDate = new Date(t.date);
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth() + 1;
        return tYear === parseInt(year) && tMonth === parseInt(month);
    });
    
    // Temporarily update state with filtered transactions for calculations
    const originalTransactions = [...state.transactions];
    state.transactions = filteredTransactions;
    
    // Update all views
    updateBalanceDisplay();
    renderTransactions();
    updateChart(getCategoryData());
    
    // Restore original transactions
    state.transactions = originalTransactions;
    
    // Update reports view if visible
    const reportsView = document.getElementById('reports-view');
    if (reportsView && reportsView.style.display !== 'none') {
        updateReportsForMonth(filteredTransactions);
    }
}

function updateReportsForMonth(filteredTransactions) {
    // Calculate balance for filtered transactions
    const income = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const expense = filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const balance = { income, expense, total: income - expense };
    
    // Calculate category data for filtered transactions
    const expenses = filteredTransactions.filter(t => t.type === 'expense');
    const categoryData = {};
    expenses.forEach(t => {
        if (!categoryData[t.category]) categoryData[t.category] = 0;
        categoryData[t.category] += parseFloat(t.amount);
    });
    
    // Update reports view
    const incomeEl = document.getElementById('report-income');
    const expenseEl = document.getElementById('report-expense');
    const balanceEl = document.getElementById('report-balance');
    const categoriesEl = document.getElementById('report-categories');
    
    if (incomeEl) incomeEl.textContent = `$${balance.income.toFixed(2)}`;
    if (expenseEl) expenseEl.textContent = `$${balance.expense.toFixed(2)}`;
    if (balanceEl) {
        balanceEl.textContent = `$${balance.total.toFixed(2)}`;
        balanceEl.style.color = balance.total >= 0 ? '#06ffa5' : '#ff4444';
    }
    
    if (categoriesEl) {
        categoriesEl.innerHTML = Object.entries(categoryData)
            .map(([category, amount]) => `
                <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                    <div style="color: var(--muted); margin-bottom: 0.25rem; text-transform: capitalize;">${category}</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ff006e;">$${amount.toFixed(2)}</div>
                </div>
            `)
            .join('') || '<p style="color: var(--muted);">No expense data for this month</p>';
    }
}

// Export for use in other modules
export function getMonthFilteredTransactions() {
    if (!state.selectedMonth) return state.transactions;
    
    const [year, month] = state.selectedMonth.split('-');
    return state.transactions.filter(t => {
        const tDate = new Date(t.date);
        const tYear = tDate.getFullYear();
        const tMonth = tDate.getMonth() + 1;
        return tYear === parseInt(year) && tMonth === parseInt(month);
    });
}

// js/navigation.js