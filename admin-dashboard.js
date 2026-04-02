window.addEventListener('DOMContentLoaded', () => {
    // 1. SECURITY CHECK
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = "login.html";
        return;
    }

    // KILL FLOATING CHAT WIDGET FOR ADMINS
    const globalChat = document.getElementById('global-chat-container');
    const globalChatBtn = document.getElementById('floating-chat-btn');
    if (globalChat) globalChat.remove();
    if (globalChatBtn) globalChatBtn.remove();

    // Set Name & Initials
    const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();
    document.getElementById('sidebar-initials').innerText = initials;
    document.getElementById('admin-name-display').innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();

    // NEW: Set Popup Name and Initials dynamically based on the logged-in admin
    const popupName = document.getElementById('popup-admin-name');
    const popupInitials = document.getElementById('popup-initials');
    if (popupName) popupName.innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    if (popupInitials) popupInitials.innerText = initials;

    // 2. FETCH DATA
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    const products = JSON.parse(localStorage.getItem('pace_products')) || [];
    let orders = JSON.parse(localStorage.getItem('pace_orders')) || [];

    // --- AUTO-SYNC FIX: Force Admin Orders to match User Orders ---
    orders.forEach(adminOrder => {
        users.forEach(u => {
            if (u.orderHistory) {
                let userOrder = u.orderHistory.find(o => o.id === adminOrder.id);
                if (userOrder && adminOrder.status !== userOrder.status) {
                    adminOrder.status = userOrder.status; // Copy the exact status from the user
                }
            }
        });
    });
    localStorage.setItem('pace_orders', JSON.stringify(orders)); // Save the corrected statuses
    // --------------------------------------------------------------

    // 3. COMPUTE STATS & CATEGORIES
    const totalUsers = users.filter(u => u.role === 'user').length;
    let totalSales = 0;

    // Graph Arrays
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthlySales = new Array(12).fill(0);

    // Category & Product Trackers
    let menSalesQty = 0, womenSalesQty = 0, kidsSalesQty = 0;
    let productSalesMap = {};

    // ONLY COMPUTE REVENUE AND PRODUCTS IF ORDER IS 'COMPLETED'
    orders.forEach(order => {
        if (order.status === 'Completed') {

            // Math for Revenue
            let amount = parseFloat(order.totalAmount);
            totalSales += amount;

            const orderDate = new Date(order.date);
            if (!isNaN(orderDate)) {
                monthlySales[orderDate.getMonth()] += amount;
            }

            // Math for Categories and Top Products
            order.items.forEach(item => {
                let qty = item.quantity || 1;

                // Sort by category
                if (item.type === 'MEN') menSalesQty += qty;
                else if (item.type === 'WOMEN') womenSalesQty += qty;
                else if (item.type === 'KIDS') kidsSalesQty += qty;

                // Tally product names with category appended
                let topProduct = `${item.name} <span style="color: var(--brand-color); padding-left: 5px;">${item.type}</span>`;
                if (!productSalesMap[topProduct]) productSalesMap[topProduct] = 0;
                productSalesMap[topProduct] += qty;
            });
        }
    });

    document.getElementById('stat-users').innerText = totalUsers;
    document.getElementById('stat-products').innerText = products.length;
    document.getElementById('stat-sales').innerText = '₱ ' + totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 });

    // 4. GENERATE MONTHLY BREAKDOWN
    const mbList = document.getElementById('mb-list');
    mbList.innerHTML = monthlySales.map((total, index) => `
        <li>
            <span>${fullMonthNames[index]}</span> 
            <strong>₱ ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
        </li>
    `).join('');

    // 5. GENERATE REVENUE GRAPH
    const msrChart = document.getElementById('msr-chart');
    const maxSales = Math.max(...monthlySales, 100);

    msrChart.innerHTML = monthlySales.map((total, index) => {
        const heightPct = (total / maxSales) * 100;
        const formattedTotal = '₱ ' + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
        return `
            <div class="bar-col">
                <div class="bar" style="height: ${heightPct}%" 
                     onmousemove="showTooltip(event, '${formattedTotal}')" 
                     onmouseout="hideTooltip()"></div>
                <span>${monthNames[index]}</span>
            </div>
        `;
    }).join('');

    // 6. GENERATE DONUT CHART (SALES BY CATEGORY)
    const donutChart = document.querySelector('.donut-chart');
    const donutLegend = document.querySelector('.donut-legend');
    const totalCategoryQty = menSalesQty + womenSalesQty + kidsSalesQty;

    if (totalCategoryQty === 0) {
        donutChart.style.background = '#e0e0e0';
        donutLegend.innerHTML = '<p style="text-align:center; color: var(--gray-text); padding-top: 10px;">No completed sales yet.</p>';
    } else {
        let menPct = (menSalesQty / totalCategoryQty) * 100;
        let womenPct = (womenSalesQty / totalCategoryQty) * 100;
        let kidsPct = (kidsSalesQty / totalCategoryQty) * 100;

        let womenStart = menPct;
        let kidsStart = menPct + womenPct;

        // Draw the CSS conic gradient dynamically
        donutChart.style.background = `conic-gradient(
            var(--brand-color) 0% ${menPct}%, 
            var(--darkgray-text) ${womenStart}% ${kidsStart}%, 
            #ccc ${kidsStart}% 100%
        )`;

        donutLegend.innerHTML = `
            <p><span class="dot men"></span> Men (${Math.round(menPct)}%)</p>
            <p><span class="dot women"></span> Women (${Math.round(womenPct)}%)</p>
            <p><span class="dot kids"></span> Kids (${Math.round(kidsPct)}%)</p>
        `;
    }

    // 7. GENERATE TOP PRODUCTS LIST
    const topListContainer = document.querySelector('.top-list');

    // Convert the dictionary map to an array and sort descending by quantity
    let sortedProducts = Object.keys(productSalesMap).map(name => {
        return { name: name, qty: productSalesMap[name] };
    }).sort((a, b) => b.qty - a.qty);

    if (sortedProducts.length === 0) {
        topListContainer.innerHTML = '<p style="text-align:center; color: var(--gray-text); padding: 30px;">No completed sales yet.</p>';
    } else {
        // Take top 5 products
        const top5 = sortedProducts.slice(0, 5);
        topListContainer.innerHTML = top5.map((product, index) => `
            <div class="top-item">
                <span>${index + 1}.</span> 
                <p>${product.name}</p> 
                <strong>${product.qty} Sold</strong>
            </div>
        `).join('');
    }

    // 8. POPULATE RECENT TRANSACTIONS TABLE (WITH SEARCH)
    const tableBody = document.getElementById('recent-orders-body');
    
    function renderDashboardTable(searchQuery = '') {
        let filteredOrders = [...orders].reverse().slice(0, 50); // Get recent 50
        
        // Kung may text sa search bar, i-filter ang orders
        if (searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            filteredOrders = filteredOrders.filter(order => {
                
                // Hanapin ang email (dahil minsan nasa users list ito)
                let displayEmail = order.customerEmail || '';
                if (!displayEmail) {
                    let foundUser = users.find(u => u.orderHistory && u.orderHistory.some(o => o.id === order.id));
                    if (foundUser) displayEmail = foundUser.email;
                }

                // Check kung nag-match sa name o email
                const matchName = order.customerName.toLowerCase().includes(lowerQuery);
                const matchEmail = displayEmail.toLowerCase().includes(lowerQuery);
                
                return matchName || matchEmail;
            });
        }

        if (filteredOrders.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--gray-text); padding: 30px;">No recent transactions found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = filteredOrders.map(order => {
            // INLINE BADGE STYLING LOGIC
            let badgeBg = '';
            let badgeColor = '';

            if (order.status === 'Completed') {
                badgeBg = '#e8f5e9';
                badgeColor = '#1b8f50';
            } else if (order.status === 'To Ship') {
                badgeBg = '#fef5e7';
                badgeColor = '#f39c12';
            } else { 
                // Default fallback usually for 'To Receive' (Blue)
                badgeBg = '#e9f5fc'; 
                badgeColor = '#3498db';
            }

            let badgeStyle = `padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; display: inline-block; background: ${badgeBg}; color: ${badgeColor};`;
            
            let displayEmail = order.customerEmail;
            if (!displayEmail) {
                let foundUser = users.find(u => u.orderHistory && u.orderHistory.some(o => o.id === order.id));
                if (foundUser) displayEmail = foundUser.email;
            }

            return `
            <tr>
                <td style="font-weight: 600;">${order.id}</td>
                <td>
                    ${order.customerName}
                    <div style="font-size: 12px; color: var(--gray-text);">${displayEmail || 'No email attached'}</div>
                </td>
                <td style="color: var(--gray-text);">${order.date}</td>
                <td><span style="${badgeStyle}">${order.status}</span></td>
                <td style="font-weight: 700; color: var(--darkgray-text);">₱ ${parseFloat(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
            `;
        }).join('');
    }

    // Initial render
    renderDashboardTable();

    // Listen to Search Input changes
    const dashboardSearch = document.getElementById('dashboard-search-input');
    if (dashboardSearch) {
        dashboardSearch.addEventListener('input', (e) => {
            renderDashboardTable(e.target.value);
        });
    }
});

function showTooltip(event, value) {
    const tooltip = document.getElementById('chart-tooltip');
    tooltip.innerText = value;
    tooltip.style.opacity = '1';
    tooltip.style.left = event.clientX + 'px';
    tooltip.style.top = event.clientY + 'px';
}

function hideTooltip() {
    document.getElementById('chart-tooltip').style.opacity = '0';
}

// ==========================================
// SYNC ORDER STATUS BETWEEN ADMIN AND USER
// ==========================================
window.updateOrderStatus = function (orderId, newStatus) {

    // 1. UPDATE THE ADMIN DATABASE (pace_orders)
    let allOrders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    let adminOrderIndex = allOrders.findIndex(o => o.id === orderId);

    if (adminOrderIndex > -1) {
        allOrders[adminOrderIndex].status = newStatus;
        localStorage.setItem('pace_orders', JSON.stringify(allOrders));
    }

    // 2. UPDATE THE USER DATABASE (pace_users)
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userFound = false;

    // Loop through all users to find who owns this order
    for (let i = 0; i < users.length; i++) {
        if (users[i].orderHistory) {
            let userOrderIndex = users[i].orderHistory.findIndex(o => o.id === orderId);

            if (userOrderIndex > -1) {
                // Update the status in the user's history
                users[i].orderHistory[userOrderIndex].status = newStatus;

                // BONUS: Send the user a notification about the update!
                if (!users[i].notifications) users[i].notifications = [];
                const notifDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                users[i].notifications.unshift({
                    id: 'NOTIF-' + Date.now(),
                    title: 'Order Status Update',
                    message: `Your order ${orderId} has been updated to: ${newStatus}.`,
                    date: notifDate,
                    read: false
                });

                userFound = true;
                break; // Stop searching once we find the user
            }
        }
    }

    if (userFound) {
        // Save the updated users array
        localStorage.setItem('pace_users', JSON.stringify(users));

        // If an admin is testing their own account, update current_user too so they don't get logged out
        let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
        if (currentUser) {
            let updatedCurrentUser = users.find(u => u.email === currentUser.email);
            if (updatedCurrentUser) {
                localStorage.setItem('pace_current_user', JSON.stringify(updatedCurrentUser));
            }
        }
    }

    // 3. REFRESH THE PAGE TO UPDATE CHARTS AND REVENUE
    // Give localStorage a millisecond to save, then reload to update the dashboard math
    setTimeout(() => {
        window.location.reload();
    }, 100);
};

// NEW: ADMIN NAVBAR POPUP TOGGLE FUNCTIONS
window.toggleAdminPopup = function () {
    const menu = document.getElementById("admin-popup-menu");
    if (menu) menu.classList.toggle("show");
};

window.addEventListener('click', function (event) {
    if (!event.target.matches('.admin-popup-btn') && !event.target.closest('.admin-popup-btn')) {
        const popup = document.getElementById("admin-popup-menu");
        if (popup && popup.classList.contains('show')) popup.classList.remove('show');
    }
});