import { state, addTransactionToState, calculateBalance, getCategoryData, setFilter, getFilteredTransactions, removeTransactionFromState } from '../state/state.js';
import { updateChart } from '../charts.js';
import { exportToCSV } from '../utils/utils.js';

export function initUI() {
    initTransactionForm();
    initFilters();
    initExport();
    updateBalanceDisplay();
}

export function updateBalanceDisplay() {
    const balance = calculateBalance();
    const balanceEl = document.getElementById('balance-value');
    const incomeEl = document.getElementById('income-value');
    const expenseEl = document.getElementById('expense-value');
    
    if (balanceEl) {
        balanceEl.textContent = `$${balance.total.toFixed(2)}`;
        balanceEl.style.color = balance.total >= 0 ? '#6EE7F0' : '#ff4444';
    }
    if (incomeEl) incomeEl.textContent = `+ $${balance.income.toFixed(2)}`;
    if (expenseEl) expenseEl.textContent = `- $${balance.expense.toFixed(2)}`;
}

function initTransactionForm() {
    const form = document.getElementById('transaction-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('text');
        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');
        const dateInput = document.getElementById('date');
        const typeSelect = document.getElementById('type');
        
        const title = titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;
        const type = typeSelect.value;
        let date = dateInput.value;
        
        if (!title || !amount || amount <= 0) {
            alert('Please enter a valid title and amount');
            return;
        }
        
        if (date) {
            date = new Date(date).toISOString();
        } else {
            date = new Date().toISOString();
        }
        
        const transaction = {
            id: Date.now().toString(),
            title, amount, category, type, date
        };
        
        addTransactionToState(transaction);
        updateBalanceDisplay();
        renderTransactions();
        updateChart(getCategoryData());
        form.reset();
    });
}

function initFilters() {
    const typeFilter = document.getElementById('filter-type');
    const categoryFilter = document.getElementById('filter-category');
    const searchInput = document.getElementById('search');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            setFilter('type', e.target.value);
            renderTransactions();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            setFilter('category', e.target.value);
            renderTransactions();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            setFilter('search', e.target.value);
            renderTransactions();
        });
    }
}

function initExport() {
    const exportButton = document.getElementById('export-csv');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            const transactions = getFilteredTransactions();
            exportToCSV(transactions);
        });
    }
}

export function renderTransactions() {
    const container = document.getElementById('transaction-list');
    if (!container) return;
    
    const transactions = getFilteredTransactions();
    
    if (transactions.length === 0) {
        container.innerHTML = `<li class="empty-state">No transactions yet — add your first transaction.</li>`;
        return;
    }
    
    container.innerHTML = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(t => createTransactionElement(t))
        .join('');
    
    attachDeleteListeners();
}

function createTransactionElement(transaction) {
    const date = new Date(transaction.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    const amountClass = transaction.type === 'income' ? 'income' : 'expense';
    const amountPrefix = transaction.type === 'income' ? '+' : '-';
    
    return `
        <li class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-title">${transaction.title}</div>
                <div class="transaction-meta">
                    <span class="transaction-category">${transaction.category}</span>
                    <span class="transaction-date">${formattedDate}</span>
                </div>
            </div>
            <div class="transaction-actions">
                <span class="transaction-amount ${amountClass}">
                    ${amountPrefix}$${parseFloat(transaction.amount).toFixed(2)}
                </span>
                <button class="delete-btn" data-id="${transaction.id}">×</button>
            </div>
        </li>
    `;
}

function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (confirm('Delete this transaction?')) {
                removeTransactionFromState(id);
                renderTransactions();
                updateBalanceDisplay();
                updateChart(getCategoryData());
            }
        });
    });
}

// js/ui/ui.js