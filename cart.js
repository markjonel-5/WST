// CART PAGE FUNCTIONS AND DESIGN
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const countHeader = document.getElementById('cart-item-count');
    if (!container) return;

    let cart = getCartData();
    let totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    countHeader.innerText = totalItems === 1 ? ' (1)' : ' (' + totalItems + ')';

    if (cart.length === 0) {
        emptyState.classList.remove('hidden');
        cartContent.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    cartContent.classList.remove('hidden');

    let subtotal = 0;
    let allSelected = true;

    container.innerHTML = cart.map((item, index) => {
        if (item.selected === undefined) item.selected = true;
        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        if (item.selected) subtotal += (cleanPrice * qty);
        else allSelected = false;

        let formattedUnitPrice = cleanPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        let sizes = (item.type === 'MEN') ? ['8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5'] :
                    (item.type === 'WOMEN') ? ['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5'] :
                    ['1Y','1.5Y','2Y','2.5Y','3Y','3.5Y','4Y','4.5Y','5Y','5.5Y','6Y','6.5Y'];

        let sizeOptionsHTML = sizes.map(size => {
            let label = (item.type === 'MEN') ? 'M ' + size : (item.type === 'WOMEN') ? 'W ' + size : size;
            return `<option value="${label}" ${item.size === label ? 'selected' : ''}>${label}</option>`;
        }).join('');

        let colorOptionsHTML = products.filter(p => p.name === item.name && p.type === item.type).map(v => {
            return `<option value="${v.color}" ${item.color === v.color ? 'selected' : ''}>${v.color}</option>`;
        }).join('');

        return `
            <div class="cart-item-card">
                <div class="cart-item-checkbox-container">
                    <input type="checkbox" class="cart-checkbox" ${item.selected ? 'checked' : ''} onchange="toggleCartItem(${index}, this.checked)">
                </div>
                <div class="cart-item-img-container" onclick="window.location.href='product-detail.html?id=${item.productId}'">
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-top">
                        <div class="item-text">
                            <h3>${item.name}</h3>
                            <p>${item.type}</p>
                            <p class="cart-item-dropdown-container">Color: <select class="cart-dropdown" onchange="updateCartItemColor(${index}, this.value)">${colorOptionsHTML}</select></p>
                            <p class="cart-item-dropdown-container">Size: <select class="cart-dropdown" onchange="updateCartItemSize(${index}, this.value)">${sizeOptionsHTML}</select></p>
                        </div>
                        <button class="cart-delete-btn" onclick="removeFromCart(${index})"><i class="fi fi-rs-trash"></i></button>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-number">${qty}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">₱ ${formattedUnitPrice}</div>
                    </div>
                </div>
            </div>`;
    }).join('');

    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (selectAllCheckbox) selectAllCheckbox.checked = allSelected;

    const formattedTotal = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('summary-subtotal').innerText = '₱ ' + formattedTotal;
    document.getElementById('summary-total').innerText = '₱ ' + formattedTotal;

    const deliveryElement = document.getElementById('summary-delivery');
    if (deliveryElement) {
        if (subtotal > 0) {
            deliveryElement.innerText = 'FREE';
            deliveryElement.style.color = '#1b8f50';
        } else {
            deliveryElement.innerText = '₱ 0.00';
            deliveryElement.style.color = 'var(--darkgray-text)';
        }
    }
}

// SELECT INDIVIDUAL CART ITEM
function toggleCartItem(index, isChecked) {
    let cart = getCartData();
    if (cart[index]) {
        cart[index].selected = isChecked;
        saveCartData(cart);
    }
}

// SELECT ALL CART ITEMS
function toggleSelectAllCartItems(isChecked) {
    let cart = getCartData();
    cart.forEach(item => item.selected = isChecked);
    saveCartData(cart);
}

// UPDATE QUANTITY FUNCTION
function updateQuantity(index, change) {
    let cart = getCartData();
    if (!cart[index]) return;
    if (!cart[index].quantity) cart[index].quantity = 1;
    cart[index].quantity += change;
    if(cart[index].quantity < 1) cart[index].quantity = 1;
    saveCartData(cart);
}

// UPDATE COLOR FUNCTION
function updateCartItemColor(index, newColor) {
    let cart = getCartData();
    if (!cart[index]) return;
    let item = cart[index];
    let newVariant = products.find(p => p.name === item.name && p.type === item.type && p.color === newColor);
    if (!newVariant) return;

    let newCartItemId = newVariant.id + "-" + item.size + "-" + newColor;
    let existingItemIndex = cart.findIndex((cartItem, i) => cartItem.cartItemId === newCartItemId && i !== index);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
        cart.splice(index, 1);
    } else {
        cart[index].color = newColor;
        cart[index].productId = newVariant.id;
        cart[index].image = newVariant.img;
        cart[index].cartItemId = newCartItemId;
    }
    saveCartData(cart);
}

// UPDATE SIZE FUNCTION
function updateCartItemSize(index, newSize) {
    let cart = getCartData();
    if (!cart[index]) return;
    let item = cart[index];
    let newCartItemId = item.productId + "-" + newSize + "-" + item.color;
    let existingItemIndex = cart.findIndex((cartItem, i) => cartItem.cartItemId === newCartItemId && i !== index);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
        cart.splice(index, 1);
    } else {
        cart[index].size = newSize;
        cart[index].cartItemId = newCartItemId;
    }
    saveCartData(cart);
}

// REMOVE ITEM FROM CART FUNCTION
function removeFromCart(index) {
    const modal = document.getElementById('delete-confirm-modal');
    const confirmBtn = document.getElementById('btn-confirm-remove');
    if (modal) modal.showModal();
    confirmBtn.onclick = function () {
        let cart = getCartData();
        cart.splice(index, 1);
        saveCartData(cart);
        modal.close();
    };
}

function closeDeleteModal() {
    document.getElementById('delete-confirm-modal').close();
}

function closeEmptySelectionModal() {
    document.getElementById('empty-selection-modal').close();
}

// WISHLIST PAGE FUNCTIONS AND DESIGN
function renderWishlistPage() {
    const container = document.getElementById('wishlist-container');
    const emptyState = document.getElementById('wishlist-empty');
    if (!container) return;

    let wishlist = getWishlistData();
    document.getElementById('cart-item-count').innerText = `(${wishlist.length})`;
    const isEmpty = wishlist.length === 0;

    emptyState.classList.toggle('hidden', !isEmpty);
    container.classList.toggle('hidden', isEmpty);

    if (isEmpty) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = wishlist.map(savedItem => {

        let p = products.find(prod => prod.id === savedItem.id) || savedItem;

        return `
            <div class="product-card wishlist-card">
                <button class="product-image" onclick="window.location.href='product-detail.html?id=${p.id}'">
                    ${p.isNew ? '<span class="new-badge">NEW</span>' : ''}
                    <img src="${p.img}" class="primary-img">
                    <img src="${p.hover}" class="hover-img"> 
                </button>
                <div class="product-name">
                    <h5>${p.name}</h5>
                    <p>1 color</p>
                </div>
                <div class="product-price">
                    <p><i>${p.type}</i></p>
                    <p>₱ ${p.price}</p>
                </div>
                <div class="product-btn">
                    <div class="wishlist"><button onclick="addToWishlist('${p.id}')"><i class="fi fi-ss-heart"></i></button></div>
                    <div class="view" onclick="window.location.href='product-detail.html?id=${p.id}'"><button>SEE DETAILS</button></div>
                </div>
            </div>
        `;
    }).join('');
}

// INITIALIZE ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
    renderWishlistPage();
    renderCartPage();
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            let cart = getCartData();

            if (!cart.some(item => item.selected !== false)) {
                e.preventDefault();
                const emptyModal = document.getElementById('empty-selection-modal');
                if (emptyModal) {
                    emptyModal.showModal();
                }
            } else {
                const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
                if (!currentUser) {
                    window.location.href = 'login.html';
                    return; // Stop here, send them straight to login!
                }

                // If logged in, proceed normally
                sessionStorage.removeItem('pace_buy_now_item');
                window.location.href = 'checkout.html';
            }
        });
    }
});