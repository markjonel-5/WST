/* ORDER HISTORY INITIALIZATION */
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    setupGlobalDialogs();
    updateNotificationBadges(currentUser.orderHistory || []);

    const listContainer = document.getElementById('order-history-list');
    if (listContainer) {
        setupOrderTabs();
        renderOrderHistory('All');
    }
});


/* GLOBAL UI FUNCTIONS START */
function setupGlobalDialogs() {
    document.querySelectorAll('dialog').forEach(modal => {
        modal.addEventListener('close', () => {
            if (document.querySelectorAll('dialog[open]').length === 0) {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.paddingRight = '0px';
                const nav = document.querySelector('.navbar-section');
                if (nav) nav.style.right = '0px';
            }
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.close();
        });
    });
}

window.openAccountModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
        if (isScrollable && document.body.style.overflow !== 'hidden') {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            const nav = document.querySelector('.navbar-section');
            if (nav) nav.style.right = `${scrollbarWidth}px`;
        }
        modal.showModal();
    }
};

window.closeAccountModal = function (modalId) {
    document.getElementById(modalId)?.close();
};
/* GLOBAL UI FUNCTIONS END */


/* CORE ORDER LOGIC START */
const formatCurrency = (num) => parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

window.openOrderDetails = function (orderId) {
    const user = JSON.parse(localStorage.getItem('pace_current_user'));
    const order = user.orderHistory.find(o => o.id === orderId);
    if (!order) return;

    window.globalActiveOrderId = order.id;
    let displayStatus = order.status === 'Processing' ? 'To Ship' : order.status;

    const trackerConfig = {
        'To Receive': { width: '30%', s1: 'completed', s2: 'active', s3: '' },
        'Completed': { width: '70%', s1: 'completed', s2: 'completed', s3: 'completed' },
        'To Ship': { width: '0%', s1: 'active', s2: '', s3: '' }
    };

    let trackerHTML = displayStatus === 'Cancelled'
        ? `<div class="tracker-status-cancelled"><i class="fi fi-rr-cross-circle"></i> Order Cancelled</div>`
        : `<div class="order-tracker-container">
            <div class="tracker-progress-line" style="width: ${trackerConfig[displayStatus].width};"></div>
            <div class="tracker-step ${trackerConfig[displayStatus].s1}"><div class="tracker-icon"><i class="fi fi-rr-box"></i></div><span class="tracker-label">To Ship</span></div>
            <div class="tracker-step ${trackerConfig[displayStatus].s2}"><div class="tracker-icon"><i class="fi fi-rr-truck-side"></i></div><span class="tracker-label">To Receive</span></div>
            <div class="tracker-step ${trackerConfig[displayStatus].s3}"><div class="tracker-icon"><i class="fi fi-rr-box-check"></i></div><span class="tracker-label">Completed</span></div>
           </div>`;

    const itemsHTML = order.items.map(item => `
        <div class="drop-item-card">
            <img src="${item.image}" alt="${item.name}" class="drop-item-img">
            <div class="drop-item-info"><h4>${item.name}</h4><p>Color: ${item.color} | Size: ${item.size} | Qty: ${item.quantity || 1}</p></div>
            <div class="drop-item-price">₱ ${formatCurrency(item.price.replace(/,/g, '') * (item.quantity || 1))}</div>
        </div>
    `).join('');

    document.getElementById('order-modal-content').innerHTML = `
        ${trackerHTML}
        <div class="drop-meta-row"><div class="drop-meta-chunk"><p>Order ID</p><h4>${order.id}</h4></div><div class="drop-meta-chunk" style="text-align: right"><p>Date Placed</p><h4>${order.date}</h4></div></div>
        <div class="drop-items-container">${itemsHTML}</div>
        <div class="drop-dark-receipt">
            <div class="drop-dark-row"><span>Subtotal</span><span>₱ ${formatCurrency(order.subtotal)}</span></div>
            <div class="drop-dark-row"><span>Delivery (${order.deliveryType})</span><span>${order.deliveryFee === 0 ? 'FREE' : '₱ ' + formatCurrency(order.deliveryFee)}</span></div>
            <div class="drop-dark-row"><span>Payment</span><span>${order.payment}</span></div>
            <div class="drop-dark-total"><span>TOTAL</span><span style="color: var(--brand-color);">₱ ${formatCurrency(order.total)}</span></div>
        </div>
    `;

    const cancelBtn = document.getElementById('cancel-order-btn');
    const receiveBtn = document.getElementById('receive-order-btn');

    if (cancelBtn) { cancelBtn.style.display = displayStatus === 'To Ship' ? 'inline-flex' : 'none'; cancelBtn.onclick = () => openAccountModal('cancel-confirm-modal'); }
    if (receiveBtn) { receiveBtn.style.display = displayStatus === 'To Receive' ? 'inline-flex' : 'none'; receiveBtn.onclick = () => openAccountModal('receive-confirm-modal'); }

    openAccountModal('order-details-modal');
};

window.updateOrderStatus = function (newStatus, title, messageTemplate) {
    if (!window.globalActiveOrderId) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];

    let targetOrder = currentUser.orderHistory.find(o => o.id === window.globalActiveOrderId);
    if (targetOrder) targetOrder.status = newStatus;

    currentUser.notifications = currentUser.notifications || [];
    currentUser.notifications.unshift({
        id: 'NOTIF-' + Date.now(), title,
        message: messageTemplate.replace('{id}', window.globalActiveOrderId),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        read: false
    });

    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
        let dbOrder = users[userIndex].orderHistory.find(o => o.id === window.globalActiveOrderId);
        if (dbOrder) dbOrder.status = newStatus;
        users[userIndex].notifications = currentUser.notifications;
        localStorage.setItem('pace_users', JSON.stringify(users));
    }

    localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

    closeAccountModal(newStatus === 'Completed' ? 'receive-confirm-modal' : 'cancel-confirm-modal');
    closeAccountModal('order-details-modal');
    window.globalActiveOrderId = null;

    if (typeof renderOrderHistory === 'function') {
        const activeTab = document.querySelector('.order-tab.active');
        renderOrderHistory(activeTab ? activeTab.getAttribute('data-status') : 'All');
    }
    if (typeof renderNotification === 'function') renderNotification(currentUser);
};

window.executeReceiveOrder = () => updateOrderStatus('Completed', 'Order Completed', 'Your order {id} has been marked as received. Thank you for shopping with PACE!');
window.executeCancelOrder = () => updateOrderStatus('Cancelled', 'Order Cancelled', 'Your order {id} has been successfully cancelled.');
/* CORE ORDER LOGIC END */


/* ORDER HISTORY PAGE SPECIFIC START */
function setupOrderTabs() {
    const tabs = document.querySelectorAll('.order-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.closest('.order-tab').classList.add('active');
            renderOrderHistory(e.target.closest('.order-tab').getAttribute('data-status'));
        });
    });
}

function updateNotificationBadges(orders) {
    let counts = orders.reduce((acc, o) => {
        let s = o.status === 'Processing' ? 'To Ship' : o.status;
        if (s === 'To Ship') acc.ship++;
        if (s === 'To Receive') acc.receive++;
        return acc;
    }, { ship: 0, receive: 0 });

    const toggleBadge = (id, count) => {
        const badge = document.getElementById(id);
        if (badge) { badge.textContent = count; badge.style.display = count ? 'inline-block' : 'none'; }
    };
    toggleBadge('badge-toship', counts.ship);
    toggleBadge('badge-toreceive', counts.receive);
}

function renderOrderHistory(filterStatus) {
    const allOrders = (JSON.parse(localStorage.getItem('pace_current_user')).orderHistory || []).slice().reverse();
    updateNotificationBadges(allOrders);

    const filteredOrders = filterStatus === 'All' ? allOrders : allOrders.filter(o => (o.status === 'Processing' ? 'To Ship' : o.status) === filterStatus);

    const listContainer = document.getElementById('order-history-list');
    const emptyState = document.getElementById('empty-history');

    if (emptyState) emptyState.style.display = filteredOrders.length ? 'none' : 'block';

    if (listContainer && filteredOrders.length) {
        listContainer.style.display = 'flex';
        listContainer.innerHTML = filteredOrders.map(order => {
            const displayStatus = order.status === 'Processing' ? 'To Ship' : order.status;
            const statusStyle = {
                'To Ship': { bg: '#FFF3EB', txt: 'var(--brand-color)' },
                'To Receive': { bg: '#E3F2FD', txt: '#1565C0' },
                'Completed': { bg: '#E8F5E9', txt: '#1b8f50' },
                'Cancelled': { bg: '#FFEBEE', txt: '#C62828' }
            }[displayStatus] || { bg: '#f5f5f5', txt: '#333' };

            const firstItem = order.items[0];
            const extraBadge = order.items.length > 1 ? `<div class="more-items-badge">+${order.items.length - 1}</div>` : '';

            return `
                <div class="order-ticket-card" onclick="openOrderDetails('${order.id}')">
                    <div class="ticket-header">
                        <div class="ticket-shop-title"><p>PACE Store</p></div>
                        <div class="ticket-status-badge" style="background: ${statusStyle.bg}; color: ${statusStyle.txt};">${displayStatus}</div>
                    </div>
                    <div class="ticket-body">
                        <div class="ticket-img-wrapper"><img src="${firstItem.image}" alt="${firstItem.name}">${extraBadge}</div>
                        <div style="flex: 1;"><h4 class="ticket-item-title">${firstItem.name}</h4><p class="ticket-item-meta">Color: ${firstItem.color} | Size: ${firstItem.size}</p><p class="ticket-qty-meta">Qty: ${firstItem.quantity || 1}</p></div>
                    </div>
                    <div class="ticket-footer">
                        <div class="ticket-footer-total">Order Total: <strong>₱ ${parseFloat(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></div>
                        <div class="ticket-footer-action">View Details <i class="fi fi-rr-angle-small-right"></i></div>
                    </div>
                </div>`;
        }).join('');
    } else if (listContainer) {
        listContainer.style.display = 'none';
    }
}
/* ORDER HISTORY PAGE SPECIFIC END */