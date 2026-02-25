// PRODUCT INFORMATION
const products = [
    { id: 'M1', name: 'Pace 680', price: '4,999.00', type: 'MEN', color: 'Gray', isNew: false, img: 'All Products/Men Products/M PACE 680 (Gray).jpg', hover: 'All Products/Men Products/M PACE 680 (Gray) (2).jpg' },
    { id: 'M1.1', name: 'Pace 680', price: '4,999.00', type: 'MEN', color: 'Black', isNew: false, img: 'All Products/Men Products/M PACE 680 (Black).jpg', hover: 'All Products/Men Products/M PACE 680 (Black) (2).jpg' },
    { id: 'M1.2', name: 'Pace 680', price: '4,999.00', type: 'MEN', color: 'White', isNew: false, img: 'All Products/Men Products/M PACE 680 (White).jpg', hover: 'All Products/Men Products/M PACE 680 (White) (2).jpg' },
    { id: 'M2', name: 'Pace 740', price: '5,499.00', type: 'MEN', color: 'Brown', isNew: true, img: 'All Products/Men Products/M PACE 740 (Brown).jpg', hover: 'All Products/Men Products/M PACE 740 (Brown) (2).jpg' },
    { id: 'M2.1', name: 'Pace 740', price: '5,499.00', type: 'MEN', color: 'Green', isNew: true, img: 'All Products/Men Products/M PACE 740 (Green).jpg', hover: 'All Products/Men Products/M PACE 740 (Green) (2).jpg' },
    { id: 'M3', name: 'Pace T500', price: '3,499.00', type: 'MEN', color: 'White', isNew: false, img: 'All Products/Men Products/M PACE T500.jpg', hover: 'All Products/Men Products/M PACE T500 (2).jpg' },
    { id: 'M4', name: 'Pace Abzorb', price: '4,499.00', type: 'MEN', color: 'Gray', isNew: false, img: 'All Products/Men Products/M PACE Abzorb.jpg', hover: 'All Products/Men Products/M PACE Abzorb (2).jpg' },
    { id: 'M5', name: 'Pace 2010', price: '5,299.00', type: 'MEN', color: 'Violet', isNew: false, img: 'All Products/Men Products/M PACE 2010.jpg', hover: 'All Products/Men Products/M PACE 2010 (2).jpg' },
    { id: 'M6', name: 'Pace 204L', price: '6,499.00', type: 'MEN', color: 'Black', isNew: false, img: 'All Products/Men Products/M PACE 204L.jpg', hover: 'All Products/Men Products/M PACE 204L (2).jpg' },
    { id: 'M7', name: 'Pace 442', price: '4,799.00', type: 'MEN', color: 'White', isNew: true, img: 'All Products/Men Products/M PACE 442.jpg', hover: 'All Products/Men Products/M PACE 442 (2).jpg' },
    { id: 'M8', name: 'Pace 991', price: '3,999.00', type: 'MEN', color: 'Brown', isNew: false, img: 'All Products/Men Products/M PACE 991.jpg', hover: 'All Products/Men Products/M PACE 991 (2).jpg' },
    { id: 'M9', name: 'Pace 471', price: '4,299.00', type: 'MEN', color: 'Cream', isNew: false, img: 'All Products/Men Products/M PACE 471.jpg', hover: 'All Products/Men Products/M PACE 471 (2).jpg' },
    { id: 'M10', name: 'Pace 1080', price: '4,699.00', type: 'MEN', color: 'Violet', isNew: false, img: 'All Products/Men Products/M PACE 1080.jpg', hover: 'All Products/Men Products/M PACE 1080 (2).jpg' },
    { id: 'M11', name: 'Pace P400', price: '6,299.00', type: 'MEN', color: 'Red', isNew: false, img: 'All Products/Men Products/M PACE P400.jpg', hover: 'All Products/Men Products/M PACE P400 (2).jpg' },
    { id: 'M12', name: 'Pace Runner', price: '5,999.00', type: 'MEN', color: 'Orange', isNew: true, img: 'All Products/Men Products/M PACE Runner.jpg', hover: 'All Products/Men Products/M PACE Runner (2).jpg' },

    { id: 'W1', name: 'Pace Fuel Cell', price: '3,999.00', type: 'WOMEN', color: 'Green', isNew: false, img: 'All Products/Women Products/W PACE FuelCell.jpg', hover: 'All Products/Women Products/W PACE FuelCell (2).jpg' },
    { id: 'W2', name: 'Pace 327', price: '3,499.00', type: 'WOMEN', color: 'Violet', isNew: false, img: 'All Products/Women Products/W PACE 327 (Violet).png', hover: 'All Products/Women Products/W PACE 327 (Violet) (2).jpg' },
    { id: 'W2.1', name: 'Pace 327', price: '3,499.00', type: 'WOMEN', color: 'Cream', isNew: false, img: 'All Products/Women Products/W PACE 327 (Cream).jpg', hover: 'All Products/Women Products/W PACE 327 (Cream) (2).jpg' },
    { id: 'W3', name: 'Pace Ice', price: '4,199.00', type: 'WOMEN', color: 'White', isNew: false, img: 'All Products/Women Products/W PACE Ice.jpg', hover: 'All Products/Women Products/W PACE Ice (2).jpg' },
    { id: 'W4', name: 'Pace Reese', price: '4,499.00', type: 'WOMEN', color: 'Orange', isNew: false, img: 'All Products/Women Products/W PACE Reese.jpg', hover: 'All Products/Women Products/W PACE Reese (2).jpg' },
    { id: 'W5', name: 'Pace Gator', price: '4,999.00', type: 'WOMEN', color: 'Maroon', isNew: true, img: 'All Products/Women Products/W PACE Gator.jpg', hover: 'All Products/Women Products/W PACE Gator (2).jpg' },
    { id: 'W6', name: 'Pace Pattern', price: '4,799.00', type: 'WOMEN', color: 'Cream', isNew: false, img: 'All Products/Women Products/W PACE Pattern.jpg', hover: 'All Products/Women Products/W PACE Pattern (2).jpg' },
    { id: 'W7', name: 'Pace Jamie', price: '3,799.00', type: 'WOMEN', color: 'White', isNew: false, img: 'All Products/Women Products/W PACE Jamie.jpg', hover: 'All Products/Women Products/W PACE Jamie (2).jpg' },
    { id: 'W8', name: 'Pace Trainer', price: '4,499.00', type: 'WOMEN', color: 'Violet', isNew: true, img: 'All Products/Women Products/W PACE Trainer.jpg', hover: 'All Products/Women Products/W PACE Trainer (2).jpg' },
    { id: 'W9', name: 'Pace 991', price: '3,999.00', type: 'WOMEN', color: 'Pink', isNew: false, img: 'All Products/Women Products/W PACE 991.jpg', hover: 'All Products/Women Products/W PACE 991 (2).jpg' },
    { id: 'W10', name: 'Pace Hierro', price: '3,799.00', type: 'WOMEN', color: 'Pink', isNew: false, img: 'All Products/Women Products/W PACE Hierro.jpg', hover: 'All Products/Women Products/W PACE Hierro (2).jpg' },
    { id: 'W11', name: 'Pace Minimus', price: '4,499.00', type: 'WOMEN', color: 'Black', isNew: false, img: 'All Products/Women Products/W PACE Minimus.jpg', hover: 'All Products/Women Products/W PACE Minimus (2).jpg' },
    { id: 'W12', name: 'Pace Rally', price: '4,999.00', type: 'WOMEN', color: 'Violet', isNew: true, img: 'All Products/Women Products/W PACE Rally.jpg', hover: 'All Products/Women Products/W PACE Rally (2).jpg' },

    { id: 'K1', name: 'Pace Lace', price: '2,999.00', type: 'KIDS', color: 'White', isNew: false, img: 'All Products/Kids Products/K PACE Lace.jpg', hover: 'All Products/Kids Products/K PACE Lace (2).jpg' },
    { id: 'K2', name: 'Pace Super', price: '2,499.00', type: 'KIDS', color: 'Violet', isNew: true, img: 'All Products/Kids Products/K PACE Super.jpg', hover: 'All Products/Kids Products/K PACE Super (2).jpg' },
    { id: 'K3', name: 'Pace 1000', price: '2,799.00', type: 'KIDS', color: 'Pink', isNew: false, img: 'All Products/Kids Products/K PACE 1000.jpg', hover: 'All Products/Kids Products/K PACE 1000 (2).jpg' },
    { id: 'K4', name: 'Pace Boa', price: '2,299.00', type: 'KIDS', color: 'Black', isNew: false, img: 'All Products/Kids Products/K PACE Boa.jpg', hover: 'All Products/Kids Products/K PACE Boa (2).jpg' },
    { id: 'K5', name: 'Pace Coco', price: '3,299.00', type: 'KIDS', color: 'Violet', isNew: false, img: 'All Products/Kids Products/K PACE Coco.jpg', hover: 'All Products/Kids Products/K PACE Coco (2).jpg' },
    { id: 'K6', name: 'Pace Arishi', price: '2,499.00', type: 'KIDS', color: 'Pink', isNew: false, img: 'All Products/Kids Products/K PACE Arishi (Pink).jpg', hover: 'All Products/Kids Products/K PACE Arishi (Pink) (2).jpg' },
    { id: 'K6.1', name: 'Pace Arishi', price: '2,499.00', type: 'KIDS', color: 'Blue', isNew: false, img: 'All Products/Kids Products/K PACE Arishi (Blue).jpg', hover: 'All Products/Kids Products/K PACE Arishi (Blue) (2).jpg' },
    { id: 'K7', name: 'Pace Tekela', price: '3,999.00', type: 'KIDS', color: 'Violet', isNew: true, img: 'All Products/Kids Products/K PACE Tekela.jpg', hover: 'All Products/Kids Products/K PACE Tekela (2).jpg' },
    { id: 'K8', name: 'Pace Coze', price: '2,999.00', type: 'KIDS', color: 'Gray', isNew: false, img: 'All Products/Kids Products/K PACE Coze.jpg', hover: 'All Products/Kids Products/K PACE Coze (2).jpg' },
    { id: 'K9', name: 'Pace Fresh', price: '3,499.00', type: 'KIDS', color: 'Black', isNew: false, img: 'All Products/Kids Products/K PACE Fresh.jpg', hover: 'All Products/Kids Products/K PACE Fresh (2).jpg' },
    { id: 'K10', name: 'Pace Eco', price: '2,799.00', type: 'KIDS', color: 'Gray', isNew: false, img: 'All Products/Kids Products/K PACE Eco.jpg', hover: 'All Products/Kids Products/K PACE Eco (2).jpg' },
    { id: 'K11', name: 'Pace Hook', price: '2,699.00', type: 'KIDS', color: 'Violet', isNew: false, img: 'All Products/Kids Products/K PACE Hook.jpg', hover: 'All Products/Kids Products/K PACE Hook (2).jpg' },
    { id: 'K12', name: 'Pace Neon', price: '2,999.00', type: 'KIDS', color: 'Neon', isNew: false, img: 'All Products/Kids Products/K PACE Neon.jpg', hover: 'All Products/Kids Products/K PACE Neon (2).jpg' }
];

// NAVBAR SCROLL HIDING
let lastScroll = 0;
const nav = document.querySelector('.navbar-section');
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) nav.style.transform = "translateY(-100%)";
    else nav.style.transform = "translateY(0)";
    lastScroll = currentScroll;
});
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) nav.style.transform = "translateY(0)";
});

// SECTION ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// USER POPUP MENU START
function renderUserMenu() {
    const container = document.getElementById('user-popup-container');
    if (!container) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    if (currentUser) {
        const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();
        container.innerHTML = `
            <button class="user-popup-btn" onclick="toggleUserPopup()"><i class="fi fi-rs-user"></i></button>
            <div class="user-action-card" id="user-popup-menu">
                <div class="card-profile-header">
                    <div class="profile-initials">${initials}</div>
                    <div class="profile-text">
                        <h4>Hi, ${currentUser.firstName}!</h4>
                        <p>${currentUser.email}</p>
                    </div>
                </div>
                <div class="account-links">
                    <a href="account.html"><i class="fi fi-rr-settings"></i> Account Settings</a>
                    <a href="#"><i class="fi fi-rr-map-marker"></i> Saved Addresses</a>
                    <a href="#"><i class="fi fi-rr-credit-card"></i> Payment Methods</a>
                    <a href="#"><i class="fi fi-rr-box"></i> Order History</a>
                    <a href="#"><i class="fi fi-rr-envelope"></i> Messages</a>
                    <a href="#"><i class="fi fi-rr-star"></i> My Feedback</a>
                </div>
                <div class="card-logout">
                    <button onclick="logoutUser()" class="logout-btn"><i class="fi fi-rs-sign-out-alt"></i> Logout</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button class="user-popup-btn" onclick="toggleUserPopup()"><i class="fi fi-rs-user"></i></button>
            <div class="user-action-card" id="user-popup-menu">
                <div class="card-greeting"><h4>Welcome to <span>PACE</span></h4></div>
                <div class="card-buttons">
                    <a href="login.html" class="card-login-btn">LOGIN</a>
                    <a href="signup.html" class="card-signup-btn">CREATE ACCOUNT</a>
                </div>
            </div>
        `;
    }
}

function logoutUser() {
    localStorage.removeItem('pace_current_user');
    window.location.reload();
}

function toggleUserPopup() {
    const menu = document.getElementById("user-popup-menu");
    if (menu) menu.classList.toggle("show");
}

window.addEventListener('click', function (event) {
    if (!event.target.matches('.user-popup-btn') && !event.target.closest('.user-popup-btn')) {
        const popups = document.getElementsByClassName("user-action-card");
        for (let i = 0; i < popups.length; i++) {
            if (popups[i].classList.contains('show')) popups[i].classList.remove('show');
        }
    }
});
// USER POPUP MENU END

// MINI CART PANEL START
function buildCartPanel() {
    if (document.getElementById('cart-preview-panel')) return;
    const cartWrapper = document.createElement('div');
    cartWrapper.innerHTML = `
        <div id="cart-preview-overlay" onclick="closeCartPanel()"></div>
        <div id="cart-preview-panel">
            <div class="cart-preview-header">
                <h3>Shopping Cart <span id="cart-preview-count">(0)</span></h3>
                <button onclick="closeCartPanel()" class="close-cart-btn">&times;</button>
            </div>
            <div class="cart-preview-body" id="cart-preview-body"></div>
            <div class="cart-preview-footer">
                <div class="cart-preview-subtotal"><span>Subtotal:</span><span id="cart-preview-total">₱ 0.00</span></div>
                <button class="cart-preview-checkout-btn" onclick="window.location.href='cart.html'">VIEW FULL CART</button>
            </div>
        </div>
    `;
    document.body.appendChild(cartWrapper);
}

function openCartPanel(event) {
    if (window.location.pathname.includes('cart.html')) return;
    if (event) event.preventDefault();
    const overlay = document.getElementById('cart-preview-overlay');
    const panel = document.getElementById('cart-preview-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (nav) nav.style.right = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    overlay.style.display = 'block';
    setTimeout(() => { overlay.style.opacity = '1'; panel.classList.add('open'); }, 10);
    renderCartPreview();
}

function closeCartPanel() {
    const overlay = document.getElementById('cart-preview-overlay');
    const panel = document.getElementById('cart-preview-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
    if (nav) nav.style.right = '0px';

    panel.classList.remove('open');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
}

function renderCartPreview() {
    const body = document.getElementById('cart-preview-body');
    const totalEl = document.getElementById('cart-preview-total');
    const countEl = document.getElementById('cart-preview-count');
    if (!body) return;

    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    let totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    if (countEl) countEl.innerText = `(${totalItems})`;

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="mini-cart-empty">
                <i class="fi fi-rr-shopping-cart" style="font-size: 50px; color: #ddd; margin-bottom: 10px; display: block;"></i>
                <p>Your cart is currently empty.</p>
            </div>`;
        if (totalEl) totalEl.innerText = '₱ 0.00';
        return;
    }

    let subtotal = 0;
    body.innerHTML = cart.map((item, index) => {
        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        subtotal += cleanPrice * qty;

        return `
            <div class="mini-cart-item" onclick="window.location.href='product-detail.html?id=${item.productId}'">
                <img src="${item.image}" alt="${item.name}" class="mini-cart-img">
                <div class="mini-cart-details">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4>${item.name}</h4>
                        <button class="mini-cart-delete-btn" onclick="event.stopPropagation(); removeFromPreviewCart(${index})" title="Remove Item">
                            <i class="fi fi-rs-trash"></i>
                        </button>
                    </div>
                    <p>${item.type}</p>
                    <p>Color: ${item.color}</p>
                    <p>Size: ${item.size}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                        <span style="font-size: 13px; color: var(--gray-text);">Qty: ${qty}</span>
                        <span class="mini-cart-price">₱ ${item.price}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (totalEl) {
        const formattedTotal = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalEl.innerText = '₱ ' + formattedTotal;
    }
}

function removeFromPreviewCart(index) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('pace_cart', JSON.stringify(cart));
    renderCartPreview();
    if (typeof renderCartPage === 'function' && document.getElementById('cart-items-container')) {
        renderCartPage();
    }
}
// MINI CART PANEL END

// MINI WISHLIST PANEL START
function buildWishlistPanel() {
    if (document.getElementById('wishlist-preview-panel')) return;
    const wishWrapper = document.createElement('div');
    wishWrapper.innerHTML = `
        <div id="wishlist-preview-overlay" onclick="closeWishlistPanel()"></div>
        <div id="wishlist-preview-panel">
            <div class="cart-preview-header">
                <h3>My Wishlist <span id="wishlist-preview-count">(0)</span></h3>
                <button onclick="closeWishlistPanel()" class="close-cart-btn">&times;</button>
            </div>
            <div class="cart-preview-body" id="wishlist-preview-body"></div>
            <div class="cart-preview-footer">
                <button class="cart-preview-checkout-btn" onclick="window.location.href='wishlist.html'">VIEW FULL WISHLIST</button>
            </div>
        </div>
    `;
    document.body.appendChild(wishWrapper);
}

function openWishlistPanel(event) {
    if (window.location.pathname.includes('wishlist.html')) return;
    if (event) event.preventDefault();
    const overlay = document.getElementById('wishlist-preview-overlay');
    const panel = document.getElementById('wishlist-preview-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (nav) nav.style.right = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    overlay.style.display = 'block';
    setTimeout(() => { overlay.style.opacity = '1'; panel.classList.add('open'); }, 10);
    renderWishlistPreview();
}

function closeWishlistPanel() {
    const overlay = document.getElementById('wishlist-preview-overlay');
    const panel = document.getElementById('wishlist-preview-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
    if (nav) nav.style.right = '0px';

    panel.classList.remove('open');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
}

function renderWishlistPreview() {
    const body = document.getElementById('wishlist-preview-body');
    const countEl = document.getElementById('wishlist-preview-count');
    if (!body) return;

    let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
    if (countEl) countEl.innerText = `(${wishlist.length})`;

    if (wishlist.length === 0) {
        body.innerHTML = `
            <div class="mini-cart-empty">
                <i class="fi fi-rs-heart-crack" style="font-size: 50px; color: #ddd; margin-bottom: 10px; display: block;"></i>
                <p>Your wishlist is currently empty.</p>
            </div>`;
        return;
    }

    body.innerHTML = wishlist.map((item) => {
        return `
            <div class="mini-cart-item" onclick="window.location.href='product-detail.html?id=${item.id}'">
                <img src="${item.img}" alt="${item.name}" class="mini-cart-img">
                <div class="mini-cart-details">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4 style="margin-bottom: 10px;">${item.name}</h4>
                        <button class="mini-cart-delete-btn" onclick="event.stopPropagation(); addToWishlist('${item.id}'); renderWishlistPreview();" title="Remove from Wishlist">
                            <i class="fi fi-ss-heart wishlist-remove-icon"></i>
                        </button>
                    </div>
                    <p style="margin-bottom: 2px;">${item.type}</p>
                    <p>Color: ${item.color}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="mini-cart-price" style="margin-top: 10px;">₱ ${item.price}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
// MINI WISHLIST PANEL START

// ADD TO CART FUNCTION START
function addToCart(product) {
    const errorMsg = document.getElementById('size-error-message');
    const sizeGrid = document.getElementById('size-grid');

    if (typeof currentSelectedSize !== 'undefined' && !currentSelectedSize) {
        if (errorMsg) errorMsg.classList.remove('error-hidden');
        if (sizeGrid) sizeGrid.classList.add('size-grid-error');
        return;
    }

    try {
        let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
        const selectedSize = typeof currentSelectedSize !== 'undefined' ? currentSelectedSize : 'Default';
        const uniqueCartId = product.id + "-" + selectedSize + "-" + product.color;
        const existingItemIndex = cart.findIndex(item => item.cartItemId === uniqueCartId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                productId: product.id,
                cartItemId: uniqueCartId,
                name: product.name,
                type: product.type,
                price: product.price,
                size: selectedSize,
                color: product.color,
                image: product.img,
                quantity: 1,
                selected: true
            });
        }
        localStorage.setItem('pace_cart', JSON.stringify(cart));

        if (errorMsg) errorMsg.classList.add('error-hidden');

        const modal = document.getElementById('success-modal');
        const nav = document.querySelector('.navbar-section');
        if (document.getElementById('modal-img')) document.getElementById('modal-img').src = product.img;
        if (document.getElementById('modal-name')) document.getElementById('modal-name').innerText = product.name;
        if (document.getElementById('modal-price')) document.getElementById('modal-price').innerText = '₱ ' + product.price;
        if (document.getElementById('modal-color')) document.getElementById('modal-color').innerText = product.color;
        if (document.getElementById('modal-size')) document.getElementById('modal-size').innerText = selectedSize;

        if (modal) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (nav) nav.style.right = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';
            modal.showModal();
        }

        if (typeof currentSelectedSize !== 'undefined') currentSelectedSize = null;
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active-size'));

        if (typeof renderCartPage === 'function') renderCartPage();
    } catch (error) {
        console.error("Cart Memory Error:", error);
        localStorage.removeItem('pace_cart');
        alert("A background memory glitch was fixed. Please click 'Add to Cart' again.");
    }
}

function closeModal() {
    const m = document.getElementById('success-modal');
    if (m) m.close();
}
// ADD TO CART FUNCTION END

// ADD TO WISHLIST FUNCTION START
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        const product = products.find(p => p.id === productId);
        if (product) wishlist.push(product);
    }
    localStorage.setItem('pace_wishlist', JSON.stringify(wishlist));

    if (document.getElementById('wishlist-container') && typeof renderWishlistPage === 'function') renderWishlistPage();

    if (document.getElementById('product-container') && typeof renderProducts === 'function') {
        const path = window.location.pathname;
        if (path.includes('homepage.html') || path === '/') {
            renderProducts(typeof activeCategory !== 'undefined' ? activeCategory : 'ALL', 8, false);
        } else {
            renderProducts(typeof activeCategory !== 'undefined' ? activeCategory : 'ALL', null, false);
        }
    }
}
// ADD TO WISHLIST FUNCTION END

// INITIALIZE ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
    buildCartPanel();
    buildWishlistPanel();
    renderUserMenu();

    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.addEventListener('close', () => {
            const nav = document.querySelector('.navbar-section');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '0px';
            if (nav) nav.style.right = '0px';
        });
    }
});