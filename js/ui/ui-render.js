import { budgetState } from "../state/budgetState.js";
import { formatCurrency } from "../utils/format.js";

export const UIRender = {
    // ==========================
    // Summary Cards
    // ==========================
    updateSummary() {
        const summary = budgetState.getSummary();

        document.getElementById("balance-value").textContent = 
            formatCurrency(summary.balance);

        document.getElementById("income-value").textContent = 
            "+ " + formatCurrency(summary.income);

        document.getElementById("expense-value").textContent = 
            "- " + formatCurrency(summary.expenses);
    },

    // ==========================
    // Render Transaction List
    // ==========================
    renderTransactionList() {
        const list = document.getElementById("transaction-list");
        list.innerHTML = ""; // Clear

        if (budgetState.transactions.length === 0) {
            list.innerHTML = `<li class="empty-state">
                No transactions yet — add your first transaction.
            </li>`;
            return;
        }

        budgetState.transactions.forEach(t => {
            const li = document.createElement("li");
            li.className = "transaction-item";

            li.innerHTML = `
                <div class="t-left">
                    <strong>${t.text}</strong>
                    <small>${t.category} • ${t.date}</small>
                </div>

                <div class="t-right ${t.type}">
                    ${t.type === "income" ? "+" : "-"} ${formatCurrency(t.amount)}
                    <button class="delete-btn" data-id="${t.id}">✖</button>
                </div>
            `;

            list.appendChild(li);
        });
    },

    // ==========================
    // Legend for Donut Chart
    // ==========================
    renderLegend(data) {
        const legend = document.getElementById("legend");
        legend.innerHTML = "";

        Object.keys(data).forEach(cat => {
            const li = document.createElement("li");
            li.className = "legend-item";

            li.innerHTML = `
                <span class="legend-color" style="background:${data[cat].color}"></span>
                ${cat}
            `;

            legend.appendChild(li);
        });
    }
};

// Initial rendering on script load
UIRender.updateSummary();
UIRender.renderTransactionList();