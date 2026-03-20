// GLOBAL FAVICON AND TITLE
document.title = "PACE";

let favicon = document.querySelector("link[rel~='icon']");
if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    document.head.appendChild(favicon);
}
favicon.href = "Brand Image/pace favicon.png";

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
    { id: 'W9', name: 'Pace 690', price: '3,999.00', type: 'WOMEN', color: 'Pink', isNew: false, img: 'All Products/Women Products/W PACE 690.jpg', hover: 'All Products/Women Products/W PACE 690 (2).jpg' },
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
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar-section');
    if (!nav) return;

    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) nav.style.transform = "translateY(-100%)";
    else nav.style.transform = "translateY(0)";
    lastScroll = currentScroll;
});

document.addEventListener('mousemove', (e) => {
    const nav = document.querySelector('.navbar-section');
    if (e.clientY < 50 && nav) nav.style.transform = "translateY(0)";
});

// SECTION ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.05 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// GLOBAL NAVBAR COMPONENT
function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    navbarContainer.innerHTML = `
        <div class="navbar-section">
            <div class="nav-wrapper">
                <div class="nav-menu">
                    <a href="homepage.html">HOME</a>
                    <a href="men.html">MEN</a>
                    <a href="women.html">WOMEN</a>
                    <a href="kids.html">KIDS</a>
                    <a href="new.html">NEW ARRIVAL</a>
                </div>
                <div class="nav-logo">
                    <a href="homepage.html"><img src="Brand Image/pace logo orange.png" alt="PACE Logo" class="logo-img"></a>
                </div>
                <div class="nav-icon">
                    <button id="global-search-btn" onclick="toggleSearchPanel()"><i class="fi fi-rr-search"></i></button>
                    <a href="wishlist.html" onclick="openWishlistPanel(event)"><i class="fi fi-rs-heart"></i></a>
                    <a href="cart.html" onclick="openCartPanel(event)"><i class="fi fi-rr-shopping-cart"></i></a>
                    <div id="user-popup-container" class="user-popup-container"></div>
                </div>
            </div>
        </div>
    `;
}

// GLOBAL FOOTER COMPONENT
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="footer-section">
            <div class="footer-container">
                <div class="footer-column">
                    <h4>COMPANY</h4>
                    <a href="#">About Pace</a>
                    <a href="#">Collection</a>
                </div>
                <div class="footer-column">
                    <h4>SUPPORT</h4>
                    <a href="#">Contact Us</a>
                    <a href="#">FAQs</a>
                </div>
                <div class="footer-column">
                    <h4>CONNECT WITH US</h4>
                    <div class="social">
                        <a href="#"><i class="fi fi-brands-facebook"></i></a>
                        <a href="#"><i class="fi fi-brands-instagram"></i></a>
                        <a href="#"><i class="fi fi-brands-twitter-alt"></i></a>
                        <a href="#"><i class="fi fi-brands-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 PACE, Inc. All Rights Reserved.</p>
                <div class="legal-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    `;
}

// USER POPUP MENU START
function renderUserMenu() {
    const container = document.getElementById('user-popup-container');
    if (!container) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    if (currentUser) {
        const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();

        let profileImageHTML = currentUser.profilePic
            ? `<img src="${currentUser.profilePic}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">`
            : `<div class="profile-initials">${initials}</div>`;

        container.innerHTML = `
            <button class="user-popup-btn" onclick="toggleUserPopup()"><i class="fi fi-rs-user"></i></button>
            
            <div class="user-action-card" id="user-popup-menu">
                <div class="card-profile-header" style="display: flex; gap: 15px; align-items: center;">
                    ${profileImageHTML}
                    <div class="profile-text">
                        <h4 style="margin-bottom: 2px;">Hi, ${currentUser.firstName}!</h4>
                        <p>${currentUser.email}</p>
                    </div>
                </div>
                <div class="account-links">
                    <a href="account.html"><i class="fi fi-rr-settings"></i> Account Settings</a>
                    <a href="address.html"><i class="fi fi-rr-map-marker"></i> Address Book</a>
                    <a href="payment-method.html"><i class="fi fi-rr-credit-card"></i> Payment Methods</a>
                    <a href="order-history.html"><i class="fi fi-rr-box"></i> Order History</a>
                    <a href="notification.html"><i class="fi fi-rr-bell"></i> Notifications</a>
                    <a href="chat-support.html"><i class="fi fi-rr-headset"></i> Chat Support</a>
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
    window.scrollTo(0, 0);
    window.location.href = 'homepage.html';
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

/* FETCH AND SAVE CART DATA (USER VS GUEST) FUNCTION START */
function getCartData() {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (currentUser) {
        return currentUser.cart || [];
    } else {
        return JSON.parse(localStorage.getItem('pace_guest_cart')) || [];
    }
}

function saveCartData(cart) {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (currentUser) {

        currentUser.cart = cart;
        localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem('pace_users')) || [];
        let userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex > -1) {
            users[userIndex].cart = cart;
            localStorage.setItem('pace_users', JSON.stringify(users));
        }
    } else {
        localStorage.setItem('pace_guest_cart', JSON.stringify(cart));
    }

    renderCartPreview();
    if (typeof renderCartPage === 'function') renderCartPage();
}
/* FETCH AND SAVE CART DATA (USER VS GUEST) FUNCTION END */

/* FETCH AND SAVE WISHLIST DATA (USER VS GUEST) FUNCTION START */
function getWishlistData() {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (currentUser) {
        return currentUser.wishlist || [];
    } else {
        return JSON.parse(localStorage.getItem('pace_guest_wishlist')) || [];
    }
}

function saveWishlistData(wishlist) {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (currentUser) {
        currentUser.wishlist = wishlist;
        localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem('pace_users')) || [];
        let userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex > -1) {
            users[userIndex].wishlist = wishlist;
            localStorage.setItem('pace_users', JSON.stringify(users));
        }
    } else {
        localStorage.setItem('pace_guest_wishlist', JSON.stringify(wishlist));
    }

    renderWishlistPreview();
    if (typeof renderWishlistPage === 'function') renderWishlistPage();
}
/* FETCH AND SAVE WISHLIST DATA (USER VS GUEST) FUNCTION END */

// MINI CART PANEL FUNCTIONS START
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

    let cart = getCartData();

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
    let cart = getCartData();
    cart.splice(index, 1);
    saveCartData(cart);
}

// GLOBAL ADD TO CART FUNCTION
function addToCart(product) {
    const errorMsg = document.getElementById('size-error-message');
    const sizeGrid = document.getElementById('size-grid');

    if (typeof currentSelectedSize !== 'undefined' && !currentSelectedSize) {
        if (errorMsg) errorMsg.classList.remove('error-hidden');
        if (sizeGrid) sizeGrid.classList.add('size-grid-error');
        return;
    }

    try {
        let cart = getCartData();
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

        saveCartData(cart);

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

    } catch (error) {
        console.error("Cart Memory Error:", error);
    }
}

function closeModal() {
    const m = document.getElementById('success-modal');
    if (m) m.close();
}
// MINI CART PANEL FUNCTIONS END

// MINI WISHLIST PANEL FUNCTIONS START
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

    let wishlist = getWishlistData();
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
                        <button class="mini-cart-delete-btn" onclick="event.stopPropagation(); addToWishlist('${item.id}');" title="Remove from Wishlist">
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

// GLOBAL ADD TO WISHLIST FUNCTION
function addToWishlist(productId) {
    let wishlist = getWishlistData();
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        const product = products.find(p => p.id === productId);
        if (product) wishlist.push(product);
    }

    saveWishlistData(wishlist);

    if (document.getElementById('product-container') && typeof renderProducts === 'function') {
        const path = window.location.pathname;
        if (path.includes('homepage.html') || path === '/') {
            renderProducts(typeof activeCategory !== 'undefined' ? activeCategory : 'ALL', 8, false);
        } else {
            renderProducts(typeof activeCategory !== 'undefined' ? activeCategory : 'ALL', null, false);
        }
    }

    const pdWishBtn = document.querySelector('.pd-wish');
    if (pdWishBtn) {
        const urlParams = new URLSearchParams(window.location.search);
        let currentPgId = urlParams.get('id');

        if (!currentPgId && urlParams.get('name')) {
            let targetProduct = products.find(p => p.name === urlParams.get('name'));
            if (targetProduct) currentPgId = targetProduct.id;
        }

        if (currentPgId === String(productId)) {
            let updatedList = getWishlistData();
            let isSaved = updatedList.some(item => item.id === currentPgId);
            let heartIcon = pdWishBtn.querySelector('i');

            if (heartIcon) {
                heartIcon.className = isSaved ? 'fi fi-ss-heart' : 'fi fi-rs-heart';
                heartIcon.style.color = isSaved ? 'var(--brand-color)' : '';
            }
        }
    }

    const searchPanel = document.getElementById('global-search-panel');
    if (searchPanel && searchPanel.classList.contains('open')) {
        const searchInput = document.getElementById('panel-search-input');
        const currentQuery = searchInput ? searchInput.value.trim() : '';
        renderSearchPanelProducts(currentQuery);
    }
}
// MINI WISHLIST PANEL FUNCTIONS END

// GLOBAL FLOATING CHAT WIDGET FUNCTION START
const chatFAQs = {
    "Where is my order?": "You can track your order by navigating to the 'Order History' tab in your Account Settings.",
    "What is your return policy?": "We offer free returns within 30 days of purchase! Shoes must be unworn.",
    "Do you offer free shipping?": "Yes! All orders automatically qualify for free standard shipping.",
    "What payment methods work?": "We accept Credit/Debit Cards, GCash, and PayPal.",
    "How do I use the size guide?": "Click the 'Size Guide' button on any product page to see exact measurements for Men's, Women's, and Kids' shoes.",
    "How do I save shoes for later?": "Click the heart icon on any shoe to add it to your Wishlist.",
    "Can I save multiple addresses?": "Yes! Go to 'Saved Addresses' in your Account to add and label multiple delivery locations.",
};

function buildGlobalChat() {

    const hiddenPages = ['chat-support.html', 'login.html', 'signup.html', 'checkout.html'];
    const currentPath = window.location.pathname;
    const shouldHide = hiddenPages.some(page => currentPath.includes(page));

    if (shouldHide || document.getElementById('global-chat-container')) return;

    const chatContainer = document.createElement('div');
    chatContainer.id = 'global-chat-container';
    chatContainer.innerHTML = `
        <div id="chat-popup-window" class="chat-hidden">
            <div class="chat-header">
                <div>
                    <h4>PACE Support</h4>
                    <p>Typically replies in minutes</p>
                </div>
                <button class="close-chat-btn" onclick="toggleChat()">&times;</button>
            </div>
            
            <div class="chat-messages" id="chat-messages-box">
            </div>
            
            <div class="chat-faqs" id="chat-faqs-container">
                <button class="faq-chip" onclick="sendFAQMessage('Where is my order?')">Where is my order?</button>
                <button class="faq-chip" onclick="sendFAQMessage('What is your return policy?')">What is your return policy?</button>
                <button class="faq-chip" onclick="sendFAQMessage('Do you offer free shipping?')">Do you offer free shipping?</button>
                <button class="faq-chip" onclick="sendFAQMessage('What payment methods work?')">What payment methods work?</button>
                <button class="faq-chip" onclick="sendFAQMessage('How do I use the size guide?')">How do I use the size guide?</button>
                <button class="faq-chip" onclick="sendFAQMessage('How do I save shoes for later?')">How do I save shoes for later?</button>
                <button class="faq-chip" onclick="sendFAQMessage('Can I save multiple addresses?')">Can I save multiple addresses?</button>
            </div>
            
            <div class="chat-input-area">
                <input type="text" id="chat-text-input" placeholder="Type a message..." onkeypress="handleChatEnter(event)">
                <button onclick="sendChatMessage()"><i class="fi fi-rr-paper-plane"></i></button>
            </div>
        </div>
        
        <button id="floating-chat-btn" onclick="toggleChat()">
            <img id="chat-open-icon" src="Brand Image/pace chat logo.png" alt="Chat Support" style="width: 45px; height: 45px; object-fit: contain;">
            <i id="chat-close-icon" class="fi fi-rr-cross" style="display: none; font-size: 20px;"></i>
        </button>
    `;
    document.body.appendChild(chatContainer);
    loadChatHistory();
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-popup-window');
    const openIcon = document.getElementById('chat-open-icon');
    const closeIcon = document.getElementById('chat-close-icon');

    if (chatWindow.classList.contains('chat-hidden')) {

        chatWindow.classList.remove('chat-hidden');
        if (openIcon) openIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';

        const box = document.getElementById('chat-messages-box');
        box.scrollTop = box.scrollHeight;
    } else {
        chatWindow.classList.add('chat-hidden');
        if (openIcon) openIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
    }
}

document.addEventListener('click', function (event) {
    const chatWindow = document.getElementById('chat-popup-window');
    const chatBtn = document.getElementById('floating-chat-btn');

    if (chatWindow && !chatWindow.classList.contains('chat-hidden')) {
        if (!chatWindow.contains(event.target) && !chatBtn.contains(event.target)) {
            toggleChat();
        }
    }
});

function sendFAQMessage(question) {
    appendMessageUI('user-msg', question);
    saveChatToDatabase('user', question);

    if (typeof renderPageChat === 'function') renderPageChat();

    setTimeout(() => {
        const answer = chatFAQs[question];
        appendMessageUI('bot-msg', answer);
        saveChatToDatabase('bot', answer);

        if (typeof renderPageChat === 'function') renderPageChat();
    }, 1000);
}

function sendChatMessage() {
    const input = document.getElementById('chat-text-input');
    const text = input.value.trim();

    if (text !== '') {
        appendMessageUI('user-msg', text);
        saveChatToDatabase('user', text);
        input.value = '';

        if (typeof renderPageChat === 'function') renderPageChat();

        setTimeout(() => {
            const reply = "Thanks for reaching out! A PACE representative will be with you shortly.";
            appendMessageUI('bot-msg', reply);
            saveChatToDatabase('bot', reply);

            if (typeof renderPageChat === 'function') renderPageChat();
        }, 1000);
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') sendChatMessage();
}

function appendMessageUI(className, text) {
    const messageBox = document.getElementById('chat-messages-box');

    if (!messageBox) return;

    const msg = document.createElement('div');
    msg.className = `chat-msg ${className}`;
    msg.innerText = text;
    messageBox.appendChild(msg);
    messageBox.scrollTop = messageBox.scrollHeight;
}

function saveChatToDatabase(sender, text) {
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser) return;

    if (!currentUser.chatHistory) currentUser.chatHistory = [];

    const now = new Date();
    const timeString = now.toLocaleDateString() + ' at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    currentUser.chatHistory.push({ sender: sender, text: text, time: timeString });

    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
        users[userIndex].chatHistory = currentUser.chatHistory;
        localStorage.setItem('pace_users', JSON.stringify(users));
        localStorage.setItem('pace_current_user', JSON.stringify(currentUser));
    }
}

function loadChatHistory() {
    const messageBox = document.getElementById('chat-messages-box');
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    messageBox.innerHTML = '';

    if (currentUser && currentUser.chatHistory && currentUser.chatHistory.length > 0) {
        currentUser.chatHistory.forEach(msg => {
            const className = msg.sender === 'user' ? 'user-msg' : 'bot-msg';
            appendMessageUI(className, msg.text);
        });
    } else {
        appendMessageUI('bot-msg', 'Hi there! Need help finding your perfect pair of shoes? 👟');
        if (currentUser) saveChatToDatabase('bot', 'Hi there! Need help finding your perfect pair of shoes? 👟');
    }
}
// GLOBAL FLOATING CHAT WIDGET FUNCTION END 

// GLOBAL SEARCH PANEL FUNCTIONS START
function buildSearchPanel() {
    if (document.getElementById('global-search-panel')) return;
    const searchWrapper = document.createElement('div');
    searchWrapper.innerHTML = `
        <div id="search-panel-overlay" onclick="closeSearchPanel()"></div>
        <div id="global-search-panel">
            <div class="search-panel-container">
                <div class="search-panel-header">
                    <div class="search-input-group">
                        <i class="fi fi-rr-search search-panel-icon"></i>
                        <input type="text" id="panel-search-input" placeholder="Type shoe name or type..." oninput="handleSearchPanelInput()" autocomplete="off">
                        <button onclick="clearSearchInput()" id="clear-search-btn" class="clear-search-btn" style="display: none;">&times;</button>
                    </div>
                    <button onclick="closeSearchPanel()" class="panel-close-btn">CANCEL</button>
                </div>
                <div class="search-panel-body" id="search-results-box">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(searchWrapper);
}

window.toggleSearchPanel = function () {
    const panel = document.getElementById('global-search-panel');
    if (panel && panel.classList.contains('open')) {
        closeSearchPanel();
    } else {
        openSearchPanel();
    }
};

function openSearchPanel() {
    const overlay = document.getElementById('search-panel-overlay');
    const panel = document.getElementById('global-search-panel');
    const input = document.getElementById('panel-search-input');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (nav) nav.style.paddingRight = `${scrollbarWidth}px`;

    document.body.style.overflow = 'hidden';

    overlay.classList.add('open');
    panel.classList.add('open');

    renderSearchPanelProducts(null);
    if (input) setTimeout(() => input.focus(), 100);
}

function closeSearchPanel() {
    const overlay = document.getElementById('search-panel-overlay');
    const panel = document.getElementById('global-search-panel');
    const input = document.getElementById('panel-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;

    document.body.style.overflow = '';

    document.body.style.paddingRight = '0px';
    if (nav) nav.style.paddingRight = '0px';

    overlay.classList.remove('open');
    panel.classList.remove('open');

    setTimeout(() => {
        if (input) input.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
    }, 300);
}

window.clearSearchInput = function () {
    const input = document.getElementById('panel-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    if (input) {
        input.value = '';
        input.focus();
    }
    if (clearBtn) clearBtn.style.display = 'none';
    renderSearchPanelProducts(null);
};

window.handleSearchPanelInput = function () {
    const input = document.getElementById('panel-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    if (!input) return;

    const query = input.value.trim();
    if (clearBtn) clearBtn.style.display = query.length > 0 ? 'block' : 'none';

    renderSearchPanelProducts(query);
};

window.executeSearchLink = function (searchText) {
    const input = document.getElementById('panel-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    if (input) input.value = searchText;
    if (clearBtn) clearBtn.style.display = 'block';
    renderSearchPanelProducts(searchText);
};

function renderSearchPanelProducts(query) {
    const resultsBox = document.getElementById('search-results-box');
    if (!resultsBox) return;

    let uniqueProducts = [];
    let nameMap = new Map();
    for (let p of products) {
        let uniqueKey = p.name + '-' + p.type;
        if (!nameMap.has(uniqueKey)) {
            nameMap.set(uniqueKey, { ...p, colorCount: 1 });
            uniqueProducts.push(nameMap.get(uniqueKey));
        } else {
            nameMap.get(uniqueKey).colorCount++;
        }
    }

    let resultsHTML = '';
    let productsToShow = [];
    let currentWishlist = getWishlistData();

    if (!query || query === '') {
        resultsHTML += `
            <div class="search-category-quicklinks">
                <span class="faq-chip" onclick="executeSearchLink('Men')">Men</span>
                <span class="faq-chip" onclick="executeSearchLink('Women')">Women</span>
                <span class="faq-chip" onclick="executeSearchLink('Kids')">Kids</span>
                <span class="faq-chip" onclick="executeSearchLink('Pace 680')">PACE 680</span>
                <span class="faq-chip" onclick="executeSearchLink('Pace Ice')">PACE Ice</span>
            </div>
            <div class="search-results-header"><h3>Suggested Products</h3></div>
        `;
        const permanentSuggestions = ['Pace 680', 'Pace 740', 'Pace Ice', 'Pace Tekela'];
        productsToShow = permanentSuggestions
            .map(shoeName => uniqueProducts.find(p => p.name === shoeName))
    } else {
        const lowerCaseQuery = query.toLowerCase();
        productsToShow = uniqueProducts.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.type.toLowerCase().includes(lowerCaseQuery)
        );

        if (productsToShow.length === 0) {
            resultsBox.innerHTML = `
                <div class="mini-cart-empty">
                    <i class="fi fi-rs-search" style="font-size: 50px; color: #ddd;"></i>
                    <p>No results found for "${query}".</p>
                </div>`;
            return;
        }
        resultsHTML += `<div class="search-results-header"><h3>Found for "${query}"</h3></div>`;
    }

    productsToShow.sort((a, b) => a.name.localeCompare(b.name));

    resultsHTML += `<div class="product-section" style="padding-top: 0; background: transparent;">`;

    resultsHTML += productsToShow.map(p => {
        let isSaved = currentWishlist.some(item => item.id === p.id);
        let heartClass = isSaved ? "fi-ss-heart" : "fi-rs-heart";

        return `
            <div class="product-card">
                <button class="product-image">
                    ${p.isNew ? '<span class="new-badge">NEW</span>' : ''}
                    <img src="${p.img}" class="primary-img">
                    <img src="${p.hover}" class="hover-img" onclick="window.location.href='product-detail.html?id=${p.id}'"> 
                </button>
                <div class="product-name">
                    <h5>${p.name}</h5>
                    <p>${p.colorCount} color${p.colorCount > 1 ? 's' : ''}</p>
                </div>
                <div class="product-price">
                    <p><i>${p.type}</i></p>
                    <p>₱ ${p.price}</p>
                </div>
                <div class="product-btn">
                    <div class="wishlist"><button onclick="event.stopPropagation(); addToWishlist('${p.id}')"><i class="fi ${heartClass}"></i></button></div>
                    <div class="view" onclick="window.location.href='product-detail.html?id=${p.id}'"><button>SEE DETAILS</button></div>
                </div>
            </div>
        `;
    }).join('');

    resultsHTML += `</div>`;
    resultsBox.innerHTML = resultsHTML;
}
// GLOBAL SEARCH PANEL FUNCTIONS END

// INITIALIZE ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    buildCartPanel();
    buildWishlistPanel();
    buildSearchPanel();
    renderUserMenu();
    renderCartPreview();
    renderWishlistPreview();
    buildGlobalChat();

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