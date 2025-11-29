export function renderTransactions(data) {
    const list = document.querySelector(".transaction-list");
    const empty = document.querySelector(".empty-state");

    if (data.length === 0) {
        list.innerHTML = "";
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    list.innerHTML = data.map(t => `
        <li>
            <div>
                <strong>${t.title}</strong>
                <small>${t.date} | ${t.category}</small>
            </div>
            <div style="color:${t.type === "income" ? "#4ade80" : "#ff5a79"}">
                ${t.type === "income" ? "+" : "-"}$${t.amount}
            </div>
        </li>
    `).join("");
}

export function updateBalance(data) {
    let income = 0;
    let expense = 0;

    data.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    const balance = income - expense;
    document.querySelector(".balance-amount").textContent = `$${balance.toFixed(2)}`;
}

export function updateDashboard() {
    const incomeElem = document.querySelector(".income-amount");
    const expenseElem = document.querySelector(".expense-amount");
    const balanceElem = document.querySelector(".balance-amount");  