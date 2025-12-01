// utils/utils.js

export function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export function exportToCSV(transactions) {
    if (transactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    // Create CSV header
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount'];
    
    // Create CSV rows
    const rows = transactions.map(t => {
        const date = new Date(t.date).toLocaleDateString('en-US');
        return [
            date,
            `"${t.title}"`,
            t.category,
            t.type,
            t.amount
        ].join(',');
    });

    // Combine header and rows
    const csv = [headers.join(','), ...rows].join('\n');

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neonfinance-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

export function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// utils.js