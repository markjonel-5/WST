// navbar hiding
let lastScroll = 0;
const nav = document.querySelector('.navbar-section');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        nav.style.transform = "translateY(-100%)";
    } else {
        nav.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
});

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) {
        nav.style.transform = "translateY(0)";
    }
});

// every section animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// category info
const categories = [
    { title: "MEN", desc: "Built for style, comfort, and confidence", img: "Category Image/Men Category.jpg", color: "#C06C37", link: "men.html" },
    { title: "WOMEN", desc: "Built for elegant, versatile, and empowered", img: "Category Image/Women Category.jpg", color: "#C06C37", link: "women.html" },
    { title: "KIDS", desc: "Built for playful designs for every adventure", img: "Category Image/Kid Category.jpg", color: "#C06C37", link: "kids.html" }
];

let index = 0;

function nextCategory(direction) {

    const catTitle = document.getElementById("cat-title");
    if (!catTitle) return;

    index += direction;

    if (index >= categories.length) index = 0;
    if (index < 0) index = categories.length - 1;

    const current = categories[index];
    document.getElementById("cat-title").innerText = current.title;
    document.getElementById("cat-desc").innerText = current.desc;
    document.getElementById("cat-img").src = current.img;
    document.getElementById("cat-bg").style.backgroundColor = current.color;
}

function visitCategory() {
    window.location.href = categories[index].link;
}

// about info
const aboutContainer = document.getElementById('about-info');

if (aboutContainer) {
    const aboutData = [
        { title: "COMFORT", img: "About Image/comfort.jpg", desc: "Engineered with advanced cushioning systems to support you through every step of your daily journey." },
        { title: "QUALITY", img: "About Image/quality.jpg", desc: "Hand-selected materials and precision stitching ensure that your pair stands the test of time." },
        { title: "STYLE", img: "About Image/style.jpg", desc: "Modern silhouettes inspired by urban culture, designed to fit seamlessly into your wardrobe." }
    ];

    aboutContainer.innerHTML = aboutData.map(about => `
        <div class="about-card">
            <img src="${about.img}" alt="${about.title}">
            <div class="card-text">
                <h3>${about.title}</h3>
                <p>${about.desc}</p>
            </div>
        </div>
    `).join('');
}

// team info
const teamContainer = document.getElementById('team-card');

if (teamContainer) {
    const teamData = [
        { name: "Perez, Mark Jonel S.", role: "BACKEND DEVELOPER", img: "Team Image/Perez, M.jpeg" },
        { name: "Francia, Gad Daniel Kellyn C.", role: "FRONTEND DEVELOPER", img: "Team Image/Francia, G.jpg" },
        { name: "Crisostomo, Jomari", role: "FRONTEND DEVELOPER", img: "Team Image/Crisostomo, J.jfif" },
        { name: "Javier, Mikel Kyan", role: "FRONTEND DEVELOPER", img: "Team Image/Javier, M.jfif" },
        { name: "Sumala, John Aldrin S.", role: "BACKEND DEVELOPER", img: "Team Image/Sumala, J.A.jpg" }
    ];

    teamContainer.innerHTML = teamData.map(member => `
        <div class="member-card">
            <img src="${member.img}" alt="${member.name}">
            <div class="member-info">
                <h1>${member.name}</h1>
                <p>${member.role}</p>
            </div>
        </div>
    `).join('');
}

// product info
const products = [
    { id: 'M1', name: 'Pace 680', price: '4,999.00', type: 'MEN', color: 'Gray', isNew: false, img: 'All Products/Men Products/M PACE 680 (Gray).jpg', hover: 'All Products/Men Products/M PACE 680 (Gray) (2).jpg' },
    { id: 'M2', name: 'Pace 740', price: '5,499.00', type: 'MEN', color: 'Brown', isNew: true, img: 'All Products/Men Products/M PACE 740.jpg', hover: 'All Products/Men Products/M PACE 740 (2).jpg' },
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
    { id: 'W2', name: 'Pace 327', price: '3,499.00', type: 'WOMEN', color: 'Violet', isNew: false, img: 'All Products/Women Products/W PACE 327.png', hover: 'All Products/Women Products/W PACE 327 (2).jpg' },
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
    { id: 'K6', name: 'Pace Arishi', price: '2,499.00', type: 'KIDS', color: 'Pink', isNew: false, img: 'All Products/Kids Products/K PACE Arishi.jpg', hover: 'All Products/Kids Products/K PACE Arishi (2).jpg' },
    { id: 'K7', name: 'Pace Tekela', price: '3,999.00', type: 'KIDS', color: 'Violet', isNew: true, img: 'All Products/Kids Products/K PACE Tekela.jpg', hover: 'All Products/Kids Products/K PACE Tekela (2).jpg' },
    { id: 'K8', name: 'Pace Coze', price: '2,999.00', type: 'KIDS', color: 'Gray', isNew: false, img: 'All Products/Kids Products/K PACE Coze.jpg', hover: 'All Products/Kids Products/K PACE Coze (2).jpg' },
    { id: 'K9', name: 'Pace Fresh', price: '3,499.00', type: 'KIDS', color: 'Black', isNew: false, img: 'All Products/Kids Products/K PACE Fresh.jpg', hover: 'All Products/Kids Products/K PACE Fresh (2).jpg' },
    { id: 'K10', name: 'Pace Eco', price: '2,799.00', type: 'KIDS', color: 'Gray', isNew: false, img: 'All Products/Kids Products/K PACE Eco.jpg', hover: 'All Products/Kids Products/K PACE Eco (2).jpg' },
    { id: 'K11', name: 'Pace Hook', price: '2,699.00', type: 'KIDS', color: 'Violet', isNew: false, img: 'All Products/Kids Products/K PACE Hook.jpg', hover: 'All Products/Kids Products/K PACE Hook (2).jpg' },
    { id: 'K12', name: 'Pace Neon', price: '2,999.00', type: 'KIDS', color: 'Neon', isNew: false, img: 'All Products/Kids Products/K PACE Neon.jpg', hover: 'All Products/Kids Products/K PACE Neon (2).jpg' }
];

// all, men, women, kids, new product rendering
let currentLimit = 12;
let activeCategory = '';
let storedList = [];

function renderProducts(category, fixedLimit = null, randomize = false) {
    const container = document.getElementById('product-container');
    const loadBtn = document.getElementById('load-btn');

    if (category !== activeCategory) {

        activeCategory = category;
        currentLimit = 12;

        // chcek if new, if not refers to category type
        let tempProducts = products;
        if (category === 'NEW') {
            tempProducts = products.filter(p => p.isNew === true);
        } else if (category !== 'ALL') {
            tempProducts = products.filter(p => p.type === category);
        }

        // randomize product in homepage & all product every refresh
        if (randomize) {
            tempProducts = [...tempProducts].sort(() => Math.random() - 0.5);
        }

        storedList = tempProducts;
    }

    let displayProducts = storedList;

    let limitToUse = fixedLimit ? fixedLimit : currentLimit;

    displayProducts = storedList.slice(0, limitToUse);

    container.innerHTML = displayProducts.map(p => {

        return `
        <div class="product-card">
            <button class="product-image">
                ${p.isNew ? '<span class="new-badge">NEW</span>' : ''}
                <img src="${p.img}" class="primary-img">
                <img src="${p.hover}" class="hover-img" onclick="window.location.href='product-detail.html?id=${p.id}'"> 
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
                <div class="wishlist"><button><i class="fi fi-rs-heart"></i></button></div>
                <div class="add" onclick="window.location.href='product-detail.html?id=${p.id}'"><button>ADD TO CART</button></div>
                <div class="buy"><button>BUY NOW</button></div>
            </div>
        </div>
    `;
    }).join('');

    if (loadBtn) {
        if (fixedLimit || displayProducts.length >= storedList.length) {
            loadBtn.style.display = 'none';
        } else {
            loadBtn.style.display = 'inline-block';
        }
    }
}

function loadMore() {
    currentLimit += 8;
    renderProducts(activeCategory, null, true);
}

const path = window.location.pathname;

if (path.includes('homepage.html') || path === '/') {
    renderProducts('ALL', 8, true);
} else if (path.includes('women.html')) {
    renderProducts('WOMEN');
} else if (path.includes('men.html')) {
    renderProducts('MEN');
} else if (path.includes('kids.html')) {
    renderProducts('KIDS');
} else if (path.includes('new.html')) {
    renderProducts('NEW');
} else if (path.includes('all-product.html')) {
    renderProducts('ALL', null, true);
}

// sort function
function sortProducts(sortType) {
    if (sortType === 'low-high') {
        storedList.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/,/g, ''));
            const priceB = parseFloat(b.price.replace(/,/g, ''));
            return priceA - priceB;
        });
    }
    else if (sortType === 'high-low') {
        storedList.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/,/g, ''));
            const priceB = parseFloat(b.price.replace(/,/g, ''));
            return priceB - priceA;
        });
    }
    else if (sortType === 'new') {
        storedList.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    }

    if (window.location.pathname.includes('homepage.html') || window.location.pathname === '/') {
        renderProducts('ALL', 8, false);
    } else {
        currentLimit = 12;
        renderProducts(activeCategory, null, false);
    }
}

// product detail connection from product info
const params = new URLSearchParams(window.location.search);
const targetId = params.get('id');
const targetName = params.get('name');

window.onload = function () {
    if (!document.getElementById('pd-name')) return;

    if (typeof products !== 'undefined') {
        let product;
        
        if (targetId) {
            product = products.find(p => p.id === targetId);
        } else if (targetName) {
            product = products.find(p => p.name === targetName);
        }

        if (product) {
            loadProductDetails(product);
        } else {
            document.getElementById('pd-name').innerText = "Product Not Found";
        }
    } else {
        loadProductDetails(products[0]);
    }
};

// to get the details from product info
function loadProductDetails(p) {
    if (!document.getElementById('pd-name')) return;

    document.getElementById('pd-name').innerText = p.name;
    document.getElementById('desc-name').innerText = p.name;
    document.getElementById('pd-price').innerText = '₱ ' + p.price;

    const breadCat = document.getElementById('bread-cat');
    breadCat.innerText = p.type.charAt(0).toUpperCase() + p.type.slice(1).toLowerCase();
    breadCat.href = p.type.toLowerCase() + '.html';
    document.getElementById('bread-name').innerText = p.name;

    const mainImg = document.getElementById('main-display-image');
    mainImg.src = p.img;

    const colorThumb = document.getElementById('color-thumb');
    colorThumb.src = p.img;

    document.getElementById('thumb-1').src = p.img;
    document.getElementById('thumb-2').src = p.hover;

    // different product details for men, women, kids
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

    // categories different sizes
    const sizeContainer = document.getElementById('size-grid');
    let sizes = [];

    if (p.type === 'MEN') {
        sizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5'];
    } else if (p.type === 'WOMEN') {
        sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5'];
    } else if (p.type === 'KIDS') {
        sizes = ['1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y'];
    }

    sizeContainer.innerHTML = sizes.map(size => {

        let label = size;
        if (p.type === 'MEN') {
            label = 'M ' + size;
        } else if (p.type === 'WOMEN') {
            label = 'W ' + size;
        }

        return `<button class="size-btn" onclick="selectSize(this, '${label}')">${label}</button>`;
    }).join('');

    // check if new arrival
    if (p.isNew) {
        document.getElementById('pd-new-badge').style.display = 'block';
    } else {
        document.getElementById('pd-new-badge').style.display = 'none';
    }

    // every add to cart button goes to product detail page
    const addToCartBtn = document.querySelector('.pd-cart');
    if (addToCartBtn) {

        addToCartBtn.onclick = function (event) {
            event.preventDefault();
            addToCart(p);
        };
    }
}

// product detail change image
function changeImage(element) {

    document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active-thumb'));

    element.classList.add('active-thumb');

    const newImg = element.querySelector('img').src;
    document.getElementById('main-display-image').src = newImg;
}

// product detail change size
let currentSelectedSize = null;

function selectSize(btn, sizeValue) {
    const allBtns = document.querySelectorAll('.size-btn');
    allBtns.forEach(b => b.classList.remove('active-size'));

    btn.classList.add('active-size');

    currentSelectedSize = sizeValue;
}

// size guide open panel
function openSG() {
    document.getElementById('sg-overlay').style.display = 'block';

    setTimeout(() => {
        document.getElementById('sg-panel').classList.add('open');
    }, 10);
}

// size guide close panel
function closeSG() {
    document.getElementById('sg-panel').classList.remove('open');

    setTimeout(() => {
        document.getElementById('sg-overlay').style.display = 'none';
    }, 300);
}

// product detail accordion animation
const accordions = document.querySelectorAll('.accordion-header');

accordions.forEach(acc => {
    acc.addEventListener('click', function () {
        this.classList.toggle('active');

        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// add to cart function
function addToCart(product) {
    if (!currentSelectedSize) {
        alert("Please select a size first!");
        return;
    }

    try {
        let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
        const uniqueCartId = product.id + "-" + currentSelectedSize; 

        const existingItemIndex = cart.findIndex(item => item.cartItemId === uniqueCartId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            const newItem = {
                productId: product.id,
                cartItemId: uniqueCartId,
                name: product.name,
                type: product.type,
                price: product.price,
                size: currentSelectedSize,
                color: product.color,
                image: product.img,
                quantity: 1
            };
            cart.push(newItem);
        }

        localStorage.setItem('pace_cart', JSON.stringify(cart));
        alert(`${product.name} (Size: ${currentSelectedSize}) has successfully added to your shopping cart`);

        currentSelectedSize = null;
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active-size'));
        
        if(typeof renderCartPage === 'function') renderCartPage();

    } catch (error) {
        console.error("Cart Memory Error:", error);
        localStorage.removeItem('pace_cart'); 
        alert("A background memory glitch was fixed. Please click 'Add to Cart' again.");
    }
}

// cart items function and design
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const countHeader = document.getElementById('cart-item-count');

    if (!container) return;

    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];

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

    container.innerHTML = cart.map((item, index) => {
        let qty = item.quantity || 1; 
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        let lineTotal = cleanPrice * qty;
        subtotal += lineTotal; 

        let formattedLineTotal = lineTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return `
            <div class="cart-item-card">
                <div class="cart-item-img-container">
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                </div>
                
                <div class="cart-item-info">
                    <div class="cart-item-top">
                        <div class="item-text">
                            <h3>${item.name}</h3>
                            <p>${item.type}</p>
                            <p>Color: ${item.color}</p>
                            <p>Size: ${item.size}</p>
                        </div>
                        <button class="cart-delete-btn" onclick="removeFromCart(${index})" title="Remove Item">
                            <i class="fi fi-rs-trash"></i>
                        </button>
                    </div>
                    
                    <div class="cart-item-bottom">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-number">${qty}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">₱ ${formattedLineTotal}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const formattedTotal = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('summary-subtotal').innerText = '₱ ' + formattedTotal;
    document.getElementById('summary-total').innerText = '₱ ' + formattedTotal;
}

// function to add/minus quantity in shopping cart
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    if (!cart[index]) return;

    if (!cart[index].quantity) cart[index].quantity = 1;
    cart[index].quantity += change;

    localStorage.setItem('pace_cart', JSON.stringify(cart));
    renderCartPage(); 
}

// function to delete items in shopping cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('pace_cart', JSON.stringify(cart)); 
    renderCartPage(); 
}

window.addEventListener('DOMContentLoaded', renderCartPage);