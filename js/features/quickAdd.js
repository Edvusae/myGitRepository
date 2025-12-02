import { addTransactionToState, calculateBalance, getCategoryData } from '../state/state.js';
import { renderTransactions } from '../ui/ui.js';
import { updateChart } from '../charts.js';

export function initQuickAdd() {
    const form = document.getElementById('quick-add-form');
    if (!form) return console.error('[QuickAdd] Form not found!');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('q-text');
        const amountInput = document.getElementById('q-amount');
        const typeSelect = document.getElementById('q-type');
        
        const title = titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;
        
        if (!title || !amount || amount <= 0) {
            alert('Please enter a valid title and amount');
            return;
        }
        
        const transaction = {
            id: Date.now().toString(),
            title, amount, type,
            category: type === 'income' ? 'salary' : 'food',
            date: new Date().toISOString()
        };
        
        addTransactionToState(transaction);
        updateBalanceDisplay();
        renderTransactions();
        updateChart(getCategoryData());
        
        titleInput.value = '';
        amountInput.value = '';
        titleInput.focus();
    });
}

function updateBalanceDisplay() {
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

// js/features/quickAdd.js