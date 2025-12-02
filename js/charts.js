const COLORS = {
    'food': '#00d9ff', 'transport': '#7b2cbf', 'entertainment': '#ff006e',
    'shopping': '#fb5607', 'health': '#06ffa5', 'bills': '#ffbe0b',
    'other': '#8338ec', 'salary': '#06ffa5'
};

export function initChart() {
    updateChart({});
}

export function updateChart(categoryData) {
    const chartEl = document.getElementById('donut');
    const legendEl = document.getElementById('legend');
    if (!chartEl || !legendEl) return;
    
    const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
    
    if (total === 0) {
        chartEl.style.background = '#2a2a2a';
        legendEl.innerHTML = '<li style="color: rgba(255,255,255,0.5);">No expenses yet</li>';
        return;
    }
    
    let gradient = 'conic-gradient(';
    let currentPercent = 0;
    
    Object.entries(categoryData).forEach(([category, amount], index) => {
        const percentage = (amount / total) * 100;
        const color = COLORS[category.toLowerCase()] || COLORS['other'];
        if (index > 0) gradient += ', ';
        gradient += `${color} ${currentPercent}% ${currentPercent + percentage}%`;
        currentPercent += percentage;
    });
    
    gradient += ')';
    chartEl.style.background = gradient;
    
    legendEl.innerHTML = Object.entries(categoryData).map(([category, amount]) => {
        const percentage = ((amount / total) * 100).toFixed(1);
        const color = COLORS[category.toLowerCase()] || COLORS['other'];
        return `<li class="legend-item">
            <span class="legend-color" style="background: ${color}"></span>
            <span class="legend-label">${category}</span>
            <span class="legend-value">$${amount.toFixed(2)} (${percentage}%)</span>
        </li>`;
    }).join('');
}

// js/charts.js