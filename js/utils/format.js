export function formatCurrency(value) {
    return "$" + Number(value).toFixed(2);
}

export function formatDate(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString(undefined, options);
}