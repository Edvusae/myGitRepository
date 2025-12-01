// app.js
import { initQuickAdd } from "./features/quickAdd.js";
import { updateBalance } from "./utils/updateUI.js";
import { getTransactions } from "./utils/storage.js";

document.addEventListener("DOMContentLoaded", () => {
    initQuickAdd();

    // On load: update balance
    updateBalance(getTransactions());

});

