window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = "login.html";
        return;
    }

    const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();
    document.getElementById('sidebar-initials').innerText = initials;
    document.getElementById('admin-name-display').innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    
    const popupName = document.getElementById('popup-admin-name');
    const popupInitials = document.getElementById('popup-initials');
    if (popupName) popupName.innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    if (popupInitials) popupInitials.innerText = initials;

    let orders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    renderOrderStats(orders);
    renderTable(orders, 'All');

    // NEW: Search Listener
    const ordersSearch = document.getElementById('orders-search-input');
    if (ordersSearch) {
        ordersSearch.addEventListener('input', (e) => {
            // Gumamit ng latest orders mula sa localstorage para laging updated
            let currentOrders = JSON.parse(localStorage.getItem('pace_orders')) || [];
            renderTable(currentOrders, currentFilterStatus, e.target.value);
        });
    }
});

function renderOrderStats(orders) {
    let toShip = 0, toReceive = 0, completed = 0;

    orders.forEach(o => {
        if (o.status === 'To Ship') toShip++;
        if (o.status === 'To Receive') toReceive++;
        if (o.status === 'Completed') completed++;
    });

    document.getElementById('stat-all-orders').innerText = orders.length;
    document.getElementById('stat-to-ship').innerText = toShip;
    document.getElementById('stat-to-receive').innerText = toReceive;
    document.getElementById('stat-completed').innerText = completed;
}

window.filterOrders = function(status, element) {
    document.querySelectorAll('.order-stat-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');

    let orders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    renderTable(orders, status);
};

// Variable para maalala kung anong status ang currently selected
let currentFilterStatus = 'All';

window.filterOrders = function(status, element) {
    document.querySelectorAll('.order-stat-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');

    currentFilterStatus = status;
    let orders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    
    // Kunin kung may text sa search box habang nagpapalit ng tab
    const searchVal = document.getElementById('orders-search-input') ? document.getElementById('orders-search-input').value : '';
    
    renderTable(orders, currentFilterStatus, searchVal);
};

// Dinagdagan natin ng 'searchQuery' na parameter
function renderTable(orders, filterStatus, searchQuery = '') {
    const tableBody = document.getElementById('orders-table-body');
    let filteredOrders = [...orders].reverse();
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    
    // 1. Filter by Status (All, To Ship, etc.)
    if (filterStatus !== 'All') {
        filteredOrders = filteredOrders.filter(o => o.status === filterStatus);
    }

    // 2. Filter by Search Query (Name or Email)
    if (searchQuery.trim() !== '') {
        const lowerQuery = searchQuery.toLowerCase();
        filteredOrders = filteredOrders.filter(order => {
            
            let displayEmail = order.customerEmail || '';
            if (!displayEmail) {
                let foundUser = users.find(u => u.orderHistory && u.orderHistory.some(o => o.id === order.id));
                if (foundUser) displayEmail = foundUser.email;
            }

            const matchName = order.customerName.toLowerCase().includes(lowerQuery);
            const matchEmail = displayEmail.toLowerCase().includes(lowerQuery);
            
            return matchName || matchEmail;
        });
    }

    if (filteredOrders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--gray-text);">No orders found.</td></tr>`;
        return;
    }

    // 3. Render HTML
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
        
        let actionButtonHTML = '';
        if (order.status === 'To Ship') {
            let isPickUp = order.deliveryType === 'In-Store Pick Up' || order.paymentMethod === 'Over-the-counter' || !order.shippingAddress;
            if (isPickUp) {
                actionButtonHTML = `<button class="btn-ship" onclick="openReadyModal('${order.id}')">Order Packed</button>`;
            } else {
                actionButtonHTML = `<button class="btn-ship" onclick="openShipModal('${order.id}')">Ship Order</button>`;
            }
        }

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
            <td class="actions-cell">
                <div class="action-btns">
                    ${actionButtonHTML}
                    <button class="btn-view" onclick="viewOrderDetails('${order.id}')">View Details</button>
                </div>
            </td>
        </tr>
        `;
    }).join('');

}

// ===============================================
// MODAL & SHIP ORDER LOGIC
// ===============================================

let currentOrderIdToShip = null;

window.openShipModal = function(orderId) {
    currentOrderIdToShip = orderId;
    const modal = document.getElementById('ship-order-modal');
    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        modal.showModal();
    }
};

window.closeShipModal = function() {
    currentOrderIdToShip = null;
    const modal = document.getElementById('ship-order-modal');
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
    }
};

window.executeShipOrder = function() {
    if (!currentOrderIdToShip) return;

    let orderId = currentOrderIdToShip;
    let allOrders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];

    let adminOrderIndex = allOrders.findIndex(o => o.id === orderId);
    if (adminOrderIndex > -1) {
        allOrders[adminOrderIndex].status = 'To Receive';
        localStorage.setItem('pace_orders', JSON.stringify(allOrders));
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].orderHistory) {
            let userOrderIndex = users[i].orderHistory.findIndex(o => o.id === orderId);
            
            if (userOrderIndex > -1) {
                users[i].orderHistory[userOrderIndex].status = 'To Receive';
                
                if (!users[i].notifications) users[i].notifications = [];
                users[i].notifications.unshift({
                    id: 'NOTIF-' + Date.now(),
                    title: 'Your Order has Shipped!',
                    message: `Great news! Your order ${orderId} has been shipped and is on its way.`,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    read: false
                });
                
                localStorage.setItem('pace_users', JSON.stringify(users));
                break;
            }
        }
    }

    renderOrderStats(allOrders);
    const activeTab = document.querySelector('.order-stat-box.active p').innerText;
    let filterString = activeTab === 'TOTAL ORDERS' ? 'All' : (activeTab === 'TO SHIP' ? 'To Ship' : (activeTab === 'TO RECEIVE' ? 'To Receive' : 'Completed'));
    renderTable(allOrders, filterString);

    closeShipModal();
};

// ===============================================
// MODAL & ORDER PACKED (PICK UP) LOGIC
// ===============================================

let currentOrderIdToReady = null;

window.openReadyModal = function(orderId) {
    currentOrderIdToReady = orderId;
    const modal = document.getElementById('ready-order-modal');
    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        modal.showModal();
    }
};

window.closeReadyModal = function() {
    currentOrderIdToReady = null;
    const modal = document.getElementById('ready-order-modal');
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
    }
};

window.executeReadyOrder = function() {
    if (!currentOrderIdToReady) return;

    let orderId = currentOrderIdToReady;
    let allOrders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];

    let adminOrderIndex = allOrders.findIndex(o => o.id === orderId);
    if (adminOrderIndex > -1) {
        allOrders[adminOrderIndex].status = 'To Receive';
        localStorage.setItem('pace_orders', JSON.stringify(allOrders));
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].orderHistory) {
            let userOrderIndex = users[i].orderHistory.findIndex(o => o.id === orderId);
            
            if (userOrderIndex > -1) {
                users[i].orderHistory[userOrderIndex].status = 'To Receive';
                
                if (!users[i].notifications) users[i].notifications = [];
                // Customized Notification message specific para sa Pick up
                users[i].notifications.unshift({
                    id: 'NOTIF-' + Date.now(),
                    title: 'Order Ready for Pick Up!',
                    message: `Good news! Your order ${orderId} is packed and ready for pick up at our physical store.`,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    read: false
                });
                
                localStorage.setItem('pace_users', JSON.stringify(users));
                break;
            }
        }
    }

    renderOrderStats(allOrders);
    const activeTab = document.querySelector('.order-stat-box.active p').innerText;
    let filterString = activeTab === 'TOTAL ORDERS' ? 'All' : (activeTab === 'TO SHIP' ? 'To Ship' : (activeTab === 'TO RECEIVE' ? 'To Receive' : 'Completed'));
    renderTable(allOrders, filterString);

    closeReadyModal();
};

// ===============================================
// VIEW ORDER DETAILS LOGIC (Binalik dito para gumana yung View Panel)
// ===============================================

window.viewOrderDetails = function(orderId) {
    let allOrders = JSON.parse(localStorage.getItem('pace_orders')) || [];
    let order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let foundUser = users.find(u => u.orderHistory && u.orderHistory.some(o => o.id === orderId));

    if (!order.customerEmail && foundUser) {
        order.customerEmail = foundUser.email;
    }

    // --- FIX: KUNIN ANG TOTOONG DELIVERY TYPE SA USER DATABASE ---
    let actualDeliveryType = order.deliveryType;
    if (!actualDeliveryType && foundUser) {
        let userOrder = foundUser.orderHistory.find(o => o.id === orderId);
        if (userOrder) {
            actualDeliveryType = userOrder.deliveryType;
        }
    }

    const panelBody = document.getElementById('od-body-content');
    
    let addressHTML = '<p style="color:red;">Address missing (Old Test Order)</p>';

    // --- FIX: BULLETPROOF PICK UP CONDITION ---
    // Ngayon, kahit GCash pa yan, basta In-Store Pick Up o walang shippingAddress, Pick Up ang ilalabas!
    let isPickUp = (actualDeliveryType === 'In-Store Pick Up') || 
                   (order.paymentMethod === 'Over-the-counter') || 
                   (!order.shippingAddress);

    if (isPickUp) {
        addressHTML = '<p style="font-weight: 500; color: var(--darkgray-text);">In-Store Pick Up</p><p>Customer will collect the item at the physical store.</p>';
    } else if (order.shippingAddress && order.shippingAddress.fullName) {
        let addr = order.shippingAddress;
        addressHTML = `
            <h4>${addr.fullName} <span style="font-weight:400; font-size:13px; color:var(--gray-text); margin-left:10px;">${addr.phone}</span></h4>
            <p>${addr.street}, ${addr.brgy}<br>${addr.city}, ${addr.region}, ${addr.postalCode}</p>
        `;
    }

    let itemsHTML = order.items.map(item => `
        <div class="od-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="od-item-info">
                <h4>${item.name}</h4>
                <p>${item.type} | Color: ${item.color} | Size: ${item.size}</p>
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span style="font-weight:600; font-size: 12px; color:var(--gray-text);">Qty: ${item.quantity || 1}</span>
                    <span style="font-weight:600; font-size: 14px; color:var(--brand-color);">₱ ${item.price}</span>
                </div>
            </div>
        </div>
    `).join('');

    panelBody.innerHTML = `
        <div class="od-section-title">Shipping Information</div>
        <div class="od-address-card">
            ${addressHTML}
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eaeaea;">
                <p style="font-size: 13px; margin-bottom: 3px;"><strong style="color: var(--darkgray-text);">Customer Email:</strong></p>
                <p style="font-size: 14px;">${order.customerEmail || 'No email attached'}</p>
            </div>
        </div>
        
        <div class="od-section-title">Purchased Items</div>
        <div>
            ${itemsHTML}
        </div>

        <div class="od-summary">
            <div class="od-summary-row">
                <span>Payment Method:</span>
                <span style="font-weight:600;">${order.paymentMethod}</span>
            </div>
            <div class="od-summary-row total">
                <span>Total Amount:</span>
                <span>₱ ${parseFloat(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
        </div>
    `;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    document.getElementById('order-details-overlay').classList.add('show');
    document.getElementById('order-details-panel').classList.add('show');
};

window.closeOrderDetailsPanel = function() {
    document.getElementById('order-details-overlay').classList.remove('show');
    document.getElementById('order-details-panel').classList.remove('show');

    setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
    }, 300);
};