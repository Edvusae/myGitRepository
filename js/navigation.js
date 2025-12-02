// js/navigation.js
export function initNavigation() {
    console.log('[Navigation] Initializing...');
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageTitle = document.getElementById('dashboard-heading');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.nav;
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            button.parentElement.classList.add('active');
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'transactions': 'Transactions',
                'reports': 'Reports',
                'settings': 'Settings'
            };
            
            if (pageTitle) {
                pageTitle.textContent = titles[page] || 'Dashboard';
            }
            
            // Show/hide sections based on page
            showPage(page);
        });
    });
    
    console.log('[Navigation] Initialized successfully');
}

function showPage(page) {
    // Get main sections
    const dashboardView = document.querySelector('.grid');
    const transactionsView = document.getElementById('transactions-view');
    const reportsView = document.getElementById('reports-view');
    const settingsView = document.getElementById('settings-view');
    
    // Hide all views
    if (dashboardView) dashboardView.style.display = 'none';
    if (transactionsView) transactionsView.style.display = 'none';
    if (reportsView) reportsView.style.display = 'none';
    if (settingsView) settingsView.style.display = 'none';
    
    // Show selected view
    switch(page) {
        case 'dashboard':
            if (dashboardView) dashboardView.style.display = 'grid';
            break;
        case 'transactions':
            if (transactionsView) {
                transactionsView.style.display = 'block';
            } else {
                // If transactions view doesn't exist, create it
                createTransactionsView();
            }
            break;
        case 'reports':
            if (reportsView) {
                reportsView.style.display = 'block';
            } else {
                createReportsView();
            }
            break;
        case 'settings':
            if (settingsView) {
                settingsView.style.display = 'block';
            } else {
                createSettingsView();
            }
            break;
    }
}

function createTransactionsView() {
    const main = document.getElementById('main');
    const grid = document.querySelector('.grid');
    
    const view = document.createElement('div');
    view.id = 'transactions-view';
    view.className = 'page-view';
    view.innerHTML = `
        <div class="card" style="padding: 2rem;">
            <h2 style="margin-bottom: 1.5rem;">All Transactions</h2>
            <div class="filters" style="margin-bottom: 1.5rem;">
                <select id="tx-filter-type" class="select">
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                
                <select id="tx-filter-category" class="select">
                    <option value="all">All Categories</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="salary">Salary</option>
                </select>
                
                <input type="search" id="tx-search" class="input-search" placeholder="Search transactions..." />
            </div>
            
            <div class="transaction-list-wrap">
                <ul id="tx-list" class="transaction-list"></ul>
            </div>
        </div>
    `;
    
    main.insertBefore(view, grid);
    
    // Import and render transactions
    import('./ui/ui.js').then(module => {
        const container = document.getElementById('tx-list');
        const list = document.getElementById('transaction-list');
        if (list) {
            container.innerHTML = list.innerHTML;
        }
    });
}

function createReportsView() {
    const main = document.getElementById('main');
    const grid = document.querySelector('.grid');
    
    const view = document.createElement('div');
    view.id = 'reports-view';
    view.className = 'page-view';
    view.innerHTML = `
        <div class="reports-container">
            <div class="card" style="padding: 2rem; margin-bottom: 1.5rem;">
                <h2 style="margin-bottom: 1rem;">Financial Summary</h2>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                    <div>
                        <div style="color: var(--muted); margin-bottom: 0.5rem;">Total Income</div>
                        <div id="report-income" style="font-size: 2rem; font-weight: 700; color: #06ffa5;">$0.00</div>
                    </div>
                    <div>
                        <div style="color: var(--muted); margin-bottom: 0.5rem;">Total Expenses</div>
                        <div id="report-expense" style="font-size: 2rem; font-weight: 700; color: #ff006e;">$0.00</div>
                    </div>
                    <div>
                        <div style="color: var(--muted); margin-bottom: 0.5rem;">Net Balance</div>
                        <div id="report-balance" style="font-size: 2rem; font-weight: 700; color: #6EE7F0;">$0.00</div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="padding: 2rem;">
                <h2 style="margin-bottom: 1rem;">Category Breakdown</h2>
                <div id="report-categories" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;"></div>
            </div>
        </div>
    `;
    
    main.insertBefore(view, grid);
    updateReportsView();
}

function createSettingsView() {
    const main = document.getElementById('main');
    const grid = document.querySelector('.grid');
    
    const view = document.createElement('div');
    view.id = 'settings-view';
    view.className = 'page-view';
    view.innerHTML = `
        <div class="card" style="padding: 2rem;">
            <h2 style="margin-bottom: 1.5rem;">Settings</h2>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text);">Data Management</h3>
                <button id="clear-data-btn" class="btn-outline" style="background: rgba(255,0,0,0.1); color: #ff4444; padding: 0.75rem 1.5rem; border-radius: 8px; border: 1px solid rgba(255,0,0,0.3);">
                    Clear All Data
                </button>
                <p style="color: var(--muted); margin-top: 0.5rem; font-size: 0.875rem;">This will delete all your transactions permanently.</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text);">Export Data</h3>
                <button id="export-all-btn" class="btn-primary" style="padding: 0.75rem 1.5rem;">
                    Export All Transactions
                </button>
                <p style="color: var(--muted); margin-top: 0.5rem; font-size: 0.875rem;">Download all your data as CSV.</p>
            </div>
            
            <div>
                <h3 style="margin-bottom: 1rem; color: var(--text);">About</h3>
                <p style="color: var(--muted); line-height: 1.6;">
                    <strong>NeonFinance v1.0</strong><br>
                    Personal Finance Dashboard<br>
                    Built with Vanilla JavaScript, HTML & CSS
                </p>
            </div>
        </div>
    `;
    
    main.insertBefore(view, grid);
    initSettingsHandlers();
}

function updateReportsView() {
    import('./state/state.js').then(module => {
        const balance = module.calculateBalance();
        const categoryData = module.getCategoryData();
        
        const incomeEl = document.getElementById('report-income');
        const expenseEl = document.getElementById('report-expense');
        const balanceEl = document.getElementById('report-balance');
        const categoriesEl = document.getElementById('report-categories');
        
        if (incomeEl) incomeEl.textContent = `$${balance.income.toFixed(2)}`;
        if (expenseEl) expenseEl.textContent = `$${balance.expense.toFixed(2)}`;
        if (balanceEl) {
            balanceEl.textContent = `$${balance.total.toFixed(2)}`;
            balanceEl.style.color = balance.total >= 0 ? '#06ffa5' : '#ff4444';
        }
        
        if (categoriesEl) {
            categoriesEl.innerHTML = Object.entries(categoryData)
                .map(([category, amount]) => `
                    <div style="padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                        <div style="color: var(--muted); margin-bottom: 0.25rem; text-transform: capitalize;">${category}</div>
                        <div style="font-size: 1.5rem; font-weight: 700; color: #ff006e;">$${amount.toFixed(2)}</div>
                    </div>
                `)
                .join('') || '<p style="color: var(--muted);">No expense data yet</p>';
        }
    });
}

function initSettingsHandlers() {
    const clearBtn = document.getElementById('clear-data-btn');
    const exportBtn = document.getElementById('export-all-btn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete ALL transactions? This cannot be undone!')) {
                localStorage.removeItem('neonfinance_transactions');
                alert('All data cleared!');
                location.reload();
            }
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            import('./utils/utils.js').then(module => {
                import('./state/state.js').then(stateModule => {
                    module.exportToCSV(stateModule.state.transactions);
                });
            });
        });
    }
}
