// js/features/quickAdd.js
// ----------------------------------------------
// QUICK ADD WIDGET — Handles fast transaction input
// ----------------------------------------------

import { addTransaction } from '../data/transactionStore.js';
import { renderTransactions } from '../ui/renderTransactions.js';
import { updateDashboardCards } from '../ui/updateDashboard.js';

export function initQuickAdd() {
  const quickForm = document.getElementById('quick-add-form');
  const titleInput = document.getElementById('quick-title');
  const amountInput = document.getElementById('quick-amount');
  const typeSelect = document.getElementById('quick-type');

  if (!quickForm) return;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!title || isNaN(amount)) {
      alert('Please enter valid inputs.');
      return;
    }

    // Build transaction object
    const transaction = {
      id: Date.now(),
      title,
      amount,
      type,
      category: 'quick-add',
      date: new Date().toISOString().split('T')[0],
    };

    // Save to store
    addTransaction(transaction);

    // Re-render UI
    renderTransactions();
    updateDashboardCards();

    // Reset inputs
    quickForm.reset();
  });
}

// --- IGNORE ---