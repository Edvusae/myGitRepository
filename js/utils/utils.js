export function formatCurrency(num) {
    return "$" + num.toFixed(2);
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}