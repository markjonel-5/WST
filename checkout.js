// INITIALIZE ON LOAD
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    loadCheckoutData(currentUser);
    setupDeliveryToggle();

    const addressModal = document.getElementById('address-modal');
    if (addressModal) {
        addressModal.addEventListener('close', () => {
            const updatedUser = JSON.parse(localStorage.getItem('pace_current_user'));
            loadCheckoutData(updatedUser);
            
            const defaultDelivery = document.querySelector('input[name="checkout-delivery-speed"]:checked');
            if(defaultDelivery) defaultDelivery.dispatchEvent(new Event('change'));
        });
    }

    const pmModal = document.getElementById('payment-modal');
    if (pmModal) {
        pmModal.addEventListener('close', () => {
            const updatedUser = JSON.parse(localStorage.getItem('pace_current_user'));
            loadCheckoutData(updatedUser);

            const defaultDelivery = document.querySelector('input[name="checkout-delivery-speed"]:checked');
            if(defaultDelivery) defaultDelivery.dispatchEvent(new Event('change'));
        });
    }
});

// HANDLES DELIVERY MATH, GRAYSCALE ADDRESS BOX, AND PAYMENT TEXT
function setupDeliveryToggle() {
    const deliveryOptions = document.querySelectorAll('input[name="checkout-delivery-speed"]');
    const addressBox = document.getElementById('checkout-address-box');
    
    deliveryOptions.forEach(radio => {
        radio.addEventListener('change', (e) => {

            document.querySelectorAll('#checkout-delivery-options .checkout-option-label').forEach(label => {
                label.style.borderColor = '#eaeaea';
                label.style.background = '#fff';
            });

            const activeLabel = e.target.closest('.checkout-option-label');
            if (activeLabel) {
                activeLabel.style.borderColor = 'var(--brand-color)';
                activeLabel.style.background = '#FFF3EB';
            }

            const codTitle = document.getElementById('cod-title');
            const codSubtitle = document.getElementById('cod-subtitle');

            if (e.target.getAttribute('data-name') === 'PickUp') {
                if (addressBox) {
                    addressBox.style.opacity = '0.5';
                    addressBox.style.filter = 'grayscale(100%)';
                    addressBox.style.pointerEvents = 'none';
                    addressBox.style.transition = 'all 0.3s ease';
                    addressBox.classList.remove('box-error');
                }
                if (codTitle) codTitle.innerText = 'Pay in Store';
                if (codSubtitle) codSubtitle.innerText = 'Over-the-counter';
                
            } else {
                if (addressBox) {
                    addressBox.style.opacity = '1';
                    addressBox.style.filter = 'none';
                    addressBox.style.pointerEvents = 'auto';
                }
                if (codTitle) codTitle.innerText = 'Cash on Delivery (COD)';
                if (codSubtitle) codSubtitle.innerText = 'Cash';
            }

            updateOrderSummary();
        });
    });

    const defaultDelivery = document.querySelector('input[name="checkout-delivery-speed"]:checked');
    if(defaultDelivery) defaultDelivery.dispatchEvent(new Event('change'));
}

// COMPUTES THE SUMMARY TOTAL
function updateOrderSummary() {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    const buyNowItem = JSON.parse(sessionStorage.getItem('pace_buy_now_item'));
    let selectedItems = [];

    if (buyNowItem) {
        selectedItems = [buyNowItem];
    } else {
        const cart = currentUser.cart || [];
        selectedItems = cart.filter(item => item.selected !== false);
    }

    let subtotal = 0;
    selectedItems.forEach(item => {
        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        subtotal += (cleanPrice * qty);
    });

    const deliveryRadio = document.querySelector('input[name="checkout-delivery-speed"]:checked');
    const deliveryFee = deliveryRadio ? parseFloat(deliveryRadio.value) : 0;
    
    const finalTotal = subtotal + deliveryFee;

    const deliveryText = document.getElementById('checkout-delivery');
    if (deliveryFee === 0) {
        deliveryText.innerText = 'FREE';
        deliveryText.style.color = '#1b8f50';
    } else {
        deliveryText.innerText = '₱ ' + deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        deliveryText.style.color = 'var(--darkgray-text)';
    }

    document.getElementById('checkout-subtotal').innerText = '₱ ' + subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('checkout-total').innerText = '₱ ' + finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// RENDERS THE CHECKOUT UI
function loadCheckoutData(user) {
    const buyNowItem = JSON.parse(sessionStorage.getItem('pace_buy_now_item'));
    let selectedItems = [];

    if (buyNowItem) {
        selectedItems = [buyNowItem];
    } else {
        const cart = user.cart || [];
        selectedItems = cart.filter(item => item.selected !== false);
    }

    if (selectedItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const totalItems = selectedItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const countHeader = document.getElementById('cart-item-count');
    if (countHeader) {
        countHeader.innerText = `(${totalItems})`;
    }

    const contactContainer = document.getElementById('checkout-contact-content');
    contactContainer.innerHTML = `
        <div class="account-input-group">
            <label>Email Address (For Order Confirmation)</label>
            <input type="email" id="checkout-email" class="account-input-field" value="${user.email}" readonly style="background-color: #f5f5f5; color: var(--gray-text); cursor: not-allowed; border-color: #eaeaea;">
        </div>
    `;

    const reviewContainer = document.getElementById('checkout-sidebar-review');
    let reviewHTML = '';
    
    selectedItems.forEach(item => {
        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        let formattedUnitPrice = cleanPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        reviewHTML += `
            <div class="summary-mini-item">
                <div class="summary-mini-left">
                    <div class="summary-mini-img-box">
                        <img src="${item.image}" alt="${item.name}">
                        <span class="summary-mini-qty">${qty}</span>
                    </div>
                    <div class="summary-mini-text">
                        <h4>${item.name}</h4>
                        <p>${item.color} / ${item.size}</p>
                    </div>
                </div>
                <div class="summary-mini-price">₱ ${formattedUnitPrice}</div>
            </div>
        `;
    });
    reviewContainer.innerHTML = reviewHTML;
    
    updateOrderSummary();

    const addressContainer = document.getElementById('checkout-address-content');
    const validAddresses = (user.addresses || []).filter(a => a && a.fullName && a.fullName !== 'undefined');

    if (validAddresses.length === 0) {
        addressContainer.innerHTML = `<p style="color: #d9534f; font-size: 15px; font-weight: 500; padding: 15px; background: #fff1f0; border-radius: 8px;">Please click "+ Add Shipping Address" above to continue.</p>`;
    } else {
        let addressHTML = '<div class="checkout-selection-list">';
        validAddresses.forEach((addr, index) => {
            const isChecked = index === validAddresses.length - 1 ? 'checked' : ''; 
            addressHTML += `
                <label class="checkout-option-label">
                    <input type="radio" name="checkout-address" value="${addr.id}" ${isChecked}>
                    <div class="checkout-option-info">
                        <span class="address-label-tag" style="position:static; display:inline-block; margin-bottom:5px;">${addr.label}</span>
                        <h4 style="font-size: 16px; margin-bottom:3px; margin-left: 5px;">${addr.fullName} <span style="font-weight:400; font-size:14px; color:var(--gray-text); margin-left:10px;">${addr.phone}</span></h4>
                        <p style="color: var(--gray-text); font-size:14px; line-height:1.4; margin-left: 5px;">${addr.street}, ${addr.brgy}, ${addr.city}, ${addr.region}, ${addr.postalCode}</p>
                    </div>
                </label>
            `;
        });
        addressHTML += `</div>`;
        addressContainer.innerHTML = addressHTML;
    }

    const paymentContainer = document.getElementById('checkout-payment-content');
    const validPayments = (user.payments || []).filter(p => p && p.type && p.type !== 'undefined');
    
    let paymentHTML = '<div class="checkout-selection-list">';
    
    validPayments.forEach((pm, index) => {
        const isChecked = index === validPayments.length - 1 ? 'checked' : '';
        let displayDetails = pm.type === 'Card' ? `•••• •••• •••• ${pm.data.number.slice(-4)}` : (pm.type === 'GCash' ? pm.data.phone : pm.data.email);
        let iconCode = pm.type === 'Card' ? 'fi-rr-credit-card' : (pm.type === 'GCash' ? 'fi-rr-smartphone' : 'fi-brands-paypal');

        paymentHTML += `
            <label class="checkout-option-label">
                <input type="radio" name="checkout-payment" value="${pm.id}" ${isChecked}>
                <div class="pm-icon-box" style="background: #fff; width:40px; height:40px; display:flex; justify-content:center; align-items:center; border-radius:6px; font-size:18px; color:var(--darkgray-text); border: 1px solid #eaeaea;">
                   <i class="fi ${iconCode}"></i>
                </div>
                <div class="checkout-option-info">
                    <p style="font-size:13px; color:var(--gray-text); margin-bottom:2px; font-weight:600;">${pm.type}</p>
                    <h4 style="font-size:15px; color:var(--darkgray-text);">${displayDetails}</h4>
                </div>
            </label>
        `;
    });

    const isCODChecked = validPayments.length === 0 ? 'checked' : ''; 
    paymentHTML += `
        <label class="checkout-option-label">
            <input type="radio" name="checkout-payment" value="COD" ${isCODChecked}>
            <div class="pm-icon-box" style="background: #fff; width:40px; height:40px; display:flex; justify-content:center; align-items:center; border-radius:6px; font-size:18px; color:var(--darkgray-text); border: 1px solid #eaeaea;">
               <i class="fi fi-rr-money-bill-wave"></i>
            </div>
            <div class="checkout-option-info">
                <p id="cod-subtitle" style="font-size:13px; color:var(--gray-text); margin-bottom:2px; font-weight:600;">Cash</p>
                <h4 id="cod-title" style="font-size:15px; color:var(--darkgray-text);">Cash on Delivery (COD)</h4>
            </div>
        </label>
    `;
    paymentHTML += `</div>`;
    paymentContainer.innerHTML = paymentHTML;
}



// PLACE ORDER FUNCTION
function placeOrder() {
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    let hasError = false;

    const addressBox = document.getElementById('checkout-address-box');
    if (addressBox) addressBox.classList.remove('box-error');

    const deliveryRadio = document.querySelector('input[name="checkout-delivery-speed"]:checked');
    const isPickUp = deliveryRadio && deliveryRadio.getAttribute('data-name') === 'PickUp';
    
    let selectedAddressId = null;
    if (!isPickUp) {
        const selectedAddressInput = document.querySelector('input[name="checkout-address"]:checked');
        if (!selectedAddressInput) {
            if (addressBox) addressBox.classList.add('box-error');
            hasError = true;
        } else {
            selectedAddressId = selectedAddressInput.value;
        }
    }

    if (hasError) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Gather Order Data
    const buyNowItem = JSON.parse(sessionStorage.getItem('pace_buy_now_item'));
    let purchasedItems = [];
    
    if (buyNowItem) {
        purchasedItems = [buyNowItem];
    } else {
        purchasedItems = (currentUser.cart || []).filter(item => item.selected !== false);
    }

    // Calculate Subtotal and Total
    let subtotal = 0;
    purchasedItems.forEach(item => {
        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        subtotal += (cleanPrice * qty);
    });
    const deliveryFee = deliveryRadio ? parseFloat(deliveryRadio.value) : 0;
    const finalTotal = subtotal + deliveryFee;

    // Get Payment Method
    const paymentRadio = document.querySelector('input[name="checkout-payment"]:checked');
    let paymentMethod = 'COD';

    if (paymentRadio) {
        if (paymentRadio.value === 'COD') {
            paymentMethod = 'COD';
        } else {

            const selectedPm = (currentUser.payments || []).find(p => p.id.toString() === paymentRadio.value);
            if (selectedPm) {
                paymentMethod = selectedPm.type;
            }
        }
    }

    if (isPickUp && paymentMethod === 'COD') {
        paymentMethod = 'Over-the-counter';
    }

    let deliveryTypeName = 'Standard Delivery';
    if (isPickUp) {
        deliveryTypeName = 'In-Store Pick Up';
    } else if (deliveryFee > 0) {
        deliveryTypeName = 'Express Delivery';
    }

    const orderId = 'PACE-' + Math.floor(100000 + Math.random() * 900000); 
    const orderDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const newOrder = {
        id: orderId,
        date: orderDate,
        items: purchasedItems,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: finalTotal,
        status: 'Processing',
        deliveryType: deliveryTypeName,
        addressId: selectedAddressId,
        payment: paymentMethod
    };

    if (!currentUser.orderHistory) currentUser.orderHistory = [];
    if (!currentUser.notifications) currentUser.notifications = [];

    currentUser.orderHistory.push(newOrder);

    currentUser.notifications.unshift({
        id: 'NOTIF-' + Date.now(),
        title: 'Order Confirmed!',
        message: `Your order ${orderId} has been successfully placed and is now processing.`,
        date: orderDate,
        read: false
    });

    if (buyNowItem) {
        sessionStorage.removeItem('pace_buy_now_item');
    } else {
        currentUser.cart = currentUser.cart.filter(item => item.selected === false);
    }
    
    let users = JSON.parse(localStorage.getItem('pace_users'));
    if (users) {
        let userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('pace_users', JSON.stringify(users));
        }
    }
    
    localStorage.setItem('pace_current_user', JSON.stringify(currentUser));
    
    window.location.href = `success-order.html?orderId=${orderId}`; 

}