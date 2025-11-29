export const budgetState = {
    transactions: [],

    addTransaction(data) {
        this.transactions.push(data);
    },

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
    },

    getSummary() {
        const income = this.transactions
            .filter(t => t.type === "income")
            .reduce((acc, t) => acc + t.amount, 0);

        const expenses = this.transactions
            .filter(t => t.type === "expense")
            .reduce((acc, t) => acc + t.amount, 0);

        return {
            income,
            expenses,
            balance: income - expenses
        };
    }
};

