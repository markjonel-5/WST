// PRODUCT DETAIL CONNECTION FROM PRODUCT INFORMATION
let currentSelectedSize = null;
const params = new URLSearchParams(window.location.search);
const targetId = params.get('id');
const targetName = params.get('name');

window.onload = function () {
    if (!document.getElementById('pd-name')) return;
    if (typeof products !== 'undefined') {
        let product;
        if (targetId) product = products.find(p => p.id === targetId);
        else if (targetName) product = products.find(p => p.name === targetName);

        if (product) loadProductDetails(product);
        else document.getElementById('pd-name').innerText = "Product Not Found";
    }
};

// TO GET PRODUCT DETAILS FROM THE SPECIFIC PRODUCT
function loadProductDetails(p) {
    if (!document.getElementById('pd-name')) return;

    document.getElementById('pd-name').innerText = p.name;
    document.getElementById('desc-name').innerText = p.name;
    document.getElementById('pd-price').innerText = '₱ ' + p.price;

    const breadCat = document.getElementById('bread-cat');
    breadCat.innerText = p.type.charAt(0).toUpperCase() + p.type.slice(1).toLowerCase();
    breadCat.href = p.type.toLowerCase() + '.html';
    document.getElementById('bread-name').innerText = p.name;
    document.getElementById('main-display-image').src = p.img;

    const colorContainer = document.querySelector('.color-option');
    if (colorContainer) {
        const relatedVariants = products.filter(item => item.name === p.name);
        colorContainer.innerHTML = relatedVariants.map(variant => `
            <button type="button" class="color-box ${variant.id === p.id ? 'selected' : ''}" 
                    onclick="switchColor('${variant.id}')" title="${variant.color}">
                <img src="${variant.img}" alt="${variant.color}">
            </button>
        `).join('');
    }

    document.getElementById('thumb-1').src = p.img;
    document.getElementById('thumb-2').src = p.hover;
    document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active-thumb'));
    if (document.getElementById('thumb-1')?.parentElement) {
        document.getElementById('thumb-1').parentElement.classList.add('active-thumb');
    }

    const detailsContainer = document.getElementById('pd-details-content');
    if (detailsContainer) {
        let detailsContent = '';

        if (p.type === 'MEN') {
            detailsContent = `
                    <ul style="list-style: none; padding: 0; line-height: 2.2;">
                        <li><strong>Weight:</strong> Approx. 285g (varies by size)</li>
                        <li><strong>Upper:</strong> Breathable engineered mesh with supportive overlays</li>
                        <li><strong>Midsole:</strong> High-rebound foam for all-day comfort and energy return</li>
                        <li><strong>Outsole:</strong> Durable rubber designed for multi-surface traction</li>
                        <li><strong>Fit:</strong> Standard men's width, fits true to size</li>
                        <li><strong>Best For:</strong> Road running, daily training, and casual wear</li>
                    </ul>
                `;
        } else if (p.type === 'WOMEN') {
            detailsContent = `
                    <ul style="list-style: none; padding: 0; line-height: 2.2;">
                        <li><strong>Weight:</strong> Approx. 240g (varies by size)</li>
                        <li><strong>Upper:</strong> Adaptive, lightweight knit for a secure, breathable feel</li>
                        <li><strong>Midsole:</strong> Plush, soft-cushioning foam for responsive support</li>
                        <li><strong>Outsole:</strong> Flexible rubber designed for natural foot movement</li>
                        <li><strong>Fit:</strong> Contoured specifically for the female foot profile</li>
                        <li><strong>Best For:</strong> Gym workouts, walking, and everyday lifestyle</li>
                    </ul>
                `;
        } else if (p.type === 'KIDS') {
            detailsContent = `
                    <ul style="list-style: none; padding: 0; line-height: 2.2;">
                        <li><strong>Weight:</strong> Ultra-lightweight design to prevent foot fatigue</li>
                        <li><strong>Upper:</strong> Durable synthetic materials and breathable mesh</li>
                        <li><strong>Midsole:</strong> Supportive EVA foam to cushion growing feet</li>
                        <li><strong>Outsole:</strong> Non-marking grippy rubber for indoor and outdoor play</li>
                        <li><strong>Fit:</strong> Snug fit with alternative closures for easy on and off</li>
                        <li><strong>Best For:</strong> School, sports, and weekend adventures</li>
                    </ul>
                `;
        }
        detailsContainer.innerHTML = detailsContent;
    }

    // CATEGORY SPECIFIC SIZES
    const sizeContainer = document.getElementById('size-grid');
    let sizes = [];
    if (p.type === 'MEN') sizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5'];
    else if (p.type === 'WOMEN') sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5'];
    else if (p.type === 'KIDS') sizes = ['1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y'];

    sizeContainer.innerHTML = sizes.map(size => {
        let label = (p.type === 'MEN') ? 'M ' + size : (p.type === 'WOMEN') ? 'W ' + size : size;
        return `<button class="size-btn" onclick="selectSize(this, '${label}')">${label}</button>`;
    }).join('');

    // CHECK IF NEW ARRIVAL
    document.getElementById('pd-new-badge').style.display = p.isNew ? 'block' : 'none';

    // PRODUCT DETAIL ADD TO CART CONNECTION
    const addToCartBtn = document.querySelector('.pd-cart');
    if (addToCartBtn) {
        addToCartBtn.onclick = function (event) {
            event.preventDefault();
            addToCart(p);
        };
    }

    // PRODUCT DETAIL WISHLIST CONNECTION
    const wishBtn = document.querySelector('.pd-wish');
    if (wishBtn) {
        let currentWishlist = getWishlistData(); 
        let isSaved = currentWishlist.some(item => item.id === p.id);
        let heartIcon = wishBtn.querySelector('i');
        
        heartIcon.className = isSaved ? 'fi fi-ss-heart' : 'fi fi-rs-heart';

        wishBtn.onclick = function (event) {
            event.preventDefault();
            
            addToWishlist(p.id);
            
            let updatedWishlist = getWishlistData();
            let nowSaved = updatedWishlist.some(item => item.id === p.id);
            
            heartIcon.className = nowSaved ? 'fi fi-ss-heart' : 'fi fi-rs-heart';
        };
    }
}

// SWITCH COLOR IN PRODUCT DETAIL PAGE
function switchColor(variantId) {
    const newVariant = products.find(p => p.id === variantId);
    if (!newVariant) return;
    window.history.pushState(null, '', '?id=' + variantId);
    loadProductDetails(newVariant);
    currentSelectedSize = null;
    document.getElementById('size-error-message')?.classList.add('error-hidden');
    document.getElementById('size-grid')?.classList.remove('size-grid-error');
}

// CHANGE IMAGE IN PRODUCT DETAIL PAGE
function changeImage(element) {
    document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active-thumb'));
    element.classList.add('active-thumb');
    document.getElementById('main-display-image').src = element.querySelector('img').src;
}

// CHANGE SIZE IN PRODUCT DETAIL PAGE
function selectSize(btn, sizeValue) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active-size'));
    btn.classList.add('active-size');
    currentSelectedSize = sizeValue;
    document.getElementById('size-error-message').classList.add('error-hidden');
    const sizeGrid = document.getElementById('size-grid');
    if (sizeGrid) sizeGrid.classList.remove('size-grid-error');
}

// PRODUCT DETAIL ACCORDION FUNCTIONS
document.querySelectorAll('.accordion-header').forEach(acc => {
    acc.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    });
});

// SIZE GUIDE PANEL FUNCTIONS
function openSG() {
    const overlay = document.getElementById('sg-overlay');
    const panel = document.getElementById('sg-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (nav) nav.style.right = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'block';
    setTimeout(() => panel.classList.add('open'), 10);
}

function closeSG() {
    const overlay = document.getElementById('sg-overlay');
    const panel = document.getElementById('sg-panel');
    const nav = document.querySelector('.navbar-section');
    if (!overlay || !panel) return;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
    if (nav) nav.style.right = '0px';
    panel.classList.remove('open');
    setTimeout(() => overlay.style.display = 'none', 300);
}