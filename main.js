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

        // check if new, if not refers to category type
        let tempProducts = products;
        if (category === 'NEW') {
            tempProducts = products.filter(p => p.isNew === true);
        } else if (category !== 'ALL') {
            tempProducts = products.filter(p => p.type === category);
        }

        let uniqueProducts = [];
        let nameMap = new Map();

        for (let p of tempProducts) {
            let uniqueKey = p.name + '-' + p.type;

            if (!nameMap.has(uniqueKey)) {

                nameMap.set(uniqueKey, { ...p, colorCount: 1 });
                uniqueProducts.push(nameMap.get(uniqueKey));
            } else {
                nameMap.get(uniqueKey).colorCount++;
            }
        }
        tempProducts = uniqueProducts;

        // randomize product in 'homepage' & 'all product' every refresh
        if (randomize) {

            const isBack = performance.getEntriesByType("navigation")[0]?.type === "back_forward";

            if (isBack && sessionStorage.getItem("saved_products")) {
                tempProducts = JSON.parse(sessionStorage.getItem("saved_products"));

                if (sessionStorage.getItem("saved_limit")) {
                    currentLimit = parseInt(sessionStorage.getItem("saved_limit"));
                }

            } else {
                tempProducts = [...tempProducts].sort(() => Math.random() - 0.5);
                sessionStorage.setItem("saved_products", JSON.stringify(tempProducts));

                sessionStorage.setItem("saved_limit", 12);
            }
        }

        storedList = tempProducts;
    }

    let displayProducts = storedList;

    let limitToUse = fixedLimit ? fixedLimit : currentLimit;

    displayProducts = storedList.slice(0, limitToUse);

    let currentWishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];

    container.innerHTML = displayProducts.map(p => {

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
                    <div class="wishlist"><button onclick="addToWishlist('${p.id}')"><i class="fi ${heartClass}"></i></button></div>
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

    const viewCountText = document.getElementById('load-count');
    if (viewCountText) {
        viewCountText.innerText = `You have viewed ${displayProducts.length} of ${storedList.length} products`;

        if (fixedLimit) {
            viewCountText.style.display = 'none';
        } else {
            viewCountText.style.display = 'block';
        }
    }
}

function loadMore() {
    currentLimit += 8;
    sessionStorage.setItem("saved_limit", currentLimit);
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

    const colorContainer = document.querySelector('.color-option');
    if (colorContainer) {
        const relatedVariants = products.filter(item => item.name === p.name);

        colorContainer.innerHTML = relatedVariants.map(variant => `
                <button type="button" class="color-box ${variant.id === p.id ? 'selected' : ''}" 
                        onclick="switchColor('${variant.id}')"
                        title="${variant.color}">
                    <img src="${variant.img}" alt="${variant.color}">
                </button>
            `).join('');
    }

    document.getElementById('thumb-1').src = p.img;
    document.getElementById('thumb-2').src = p.hover;

    document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active-thumb'));
    const firstThumb = document.getElementById('thumb-1');
    if (firstThumb && firstThumb.parentElement) {
        firstThumb.parentElement.classList.add('active-thumb');
    }

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

    // product detail wishlist button connection
    const wishBtn = document.querySelector('.pd-wish');
    if (wishBtn) {

        let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
        let isSaved = wishlist.some(item => item.id === p.id);
        let heartIcon = wishBtn.querySelector('i');

        heartIcon.className = isSaved ? 'fi fi-ss-heart' : 'fi fi-rs-heart';

        wishBtn.onclick = function (event) {
            event.preventDefault();

            addToWishlist(p.id);

            let updatedWishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
            let nowSaved = updatedWishlist.some(item => item.id === p.id);
            heartIcon.className = nowSaved ? 'fi fi-ss-heart' : 'fi fi-rs-heart';
        };
    }
}

function switchColor(variantId) {
    const newVariant = products.find(p => p.id === variantId);
    if (!newVariant) return;

    window.history.pushState(null, '', '?id=' + variantId);
    loadProductDetails(newVariant);

    currentSelectedSize = null;
    document.getElementById('size-error-message')?.classList.add('error-hidden');
    document.getElementById('size-grid')?.classList.remove('size-grid-error');
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

    document.getElementById('size-error-message').classList.add('error-hidden');

    const sizeGrid = document.getElementById('size-grid');
    if (sizeGrid) sizeGrid.classList.remove('size-grid-error');
}

// size guide open panel
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

    setTimeout(() => {
        panel.classList.add('open');
    }, 10);
}

// size guide close panel
function closeSG() {
    const overlay = document.getElementById('sg-overlay');
    const panel = document.getElementById('sg-panel');
    const nav = document.querySelector('.navbar-section');
    
    if (!overlay || !panel) return;

    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
    if (nav) nav.style.right = '0px';

    panel.classList.remove('open');

    setTimeout(() => {
        overlay.style.display = 'none';
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

/* ADD TO CART FUNCTIONALITY START */
// add to cart function
function addToCart(product) {

    const errorMsg = document.getElementById('size-error-message');
    const sizeGrid = document.getElementById('size-grid');

    if (!currentSelectedSize) {
        errorMsg.classList.remove('error-hidden');
        if (sizeGrid) sizeGrid.classList.add('size-grid-error');
        return;
    }

    try {
        let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
        const uniqueCartId = product.id + "-" + currentSelectedSize + "-" + product.color;

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
                quantity: 1,
                selected: true
            };
            cart.push(newItem);
        }

        localStorage.setItem('pace_cart', JSON.stringify(cart));

        if (errorMsg) errorMsg.classList.add('error-hidden');

        const modal = document.getElementById('success-modal');
        const nav = document.querySelector('.navbar-section');
        document.getElementById('modal-img').src = product.img;
        document.getElementById('modal-name').innerText = product.name;
        document.getElementById('modal-price').innerText = '₱ ' + product.price;
        document.getElementById('modal-color').innerText = product.color;
        document.getElementById('modal-size').innerText = currentSelectedSize;

        if (modal) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (nav) nav.style.right = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';

            modal.showModal();
        }

        currentSelectedSize = null;
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active-size'));

        if (typeof renderCartPage === 'function') renderCartPage();

    } catch (error) {
        console.error("Cart Memory Error:", error);
        localStorage.removeItem('pace_cart');
        alert("A background memory glitch was fixed. Please click 'Add to Cart' again.");
    }
}

function closeModal() {
    document.getElementById('success-modal').close();
}

const successModal = document.getElementById('success-modal');
if (successModal) {
    successModal.addEventListener('close', () => {
        const nav = document.querySelector('.navbar-section');
        
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
        if (nav) nav.style.right = '0px';
    });
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
    let allSelected = true;

    container.innerHTML = cart.map((item, index) => {
        if (item.selected === undefined) item.selected = true;

        let qty = item.quantity || 1;
        let cleanPrice = parseFloat(item.price.replace(/,/g, ''));
        let lineTotal = cleanPrice * qty;
        let formattedUnitPrice = cleanPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (item.selected) {
            subtotal += lineTotal;
        } else {
            allSelected = false;
        }

        let sizes = [];
        if (item.type === 'MEN') sizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5'];
        else if (item.type === 'WOMEN') sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5'];
        else if (item.type === 'KIDS') sizes = ['1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y'];

        let sizeOptionsHTML = sizes.map(size => {
            let label = size;
            if (item.type === 'MEN') label = 'M ' + size;
            if (item.type === 'WOMEN') label = 'W ' + size;

            let isSelected = item.size === label ? 'selected' : '';
            return `<option value="${label}" ${isSelected}>${label}</option>`;
        }).join('');

        let availableVariants = products.filter(p => p.name === item.name && p.type === item.type);

        let colorOptionsHTML = availableVariants.map(v => {
            let isSelected = item.color === v.color ? 'selected' : '';
            return `<option value="${v.color}" ${isSelected}>${v.color}</option>`;
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
                                <p class="cart-item-dropdown-container">
                                    Color: 
                                    <select class="cart-dropdown" onchange="updateCartItemColor(${index}, this.value)">
                                        ${colorOptionsHTML}
                                    </select>
                                </p>
                                <p class="cart-item-dropdown-container">
                                    Size: 
                                    <select class="cart-dropdown" onchange="updateCartItemSize(${index}, this.value)">
                                        ${sizeOptionsHTML}
                                    </select>
                                </p>
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
                            <div class="cart-item-price">₱ ${formattedUnitPrice}</div>
                        </div>
                    </div>
                </div>
            `;
    }).join('');

    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = allSelected;
    }

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

// Toggle individual item selection
function toggleCartItem(index, isChecked) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    if (cart[index]) {
        cart[index].selected = isChecked;
        localStorage.setItem('pace_cart', JSON.stringify(cart));
        renderCartPage();
    }
}

// Toggle all items selection
function toggleSelectAllCartItems(isChecked) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    cart.forEach(item => {
        item.selected = isChecked;
    });
    localStorage.setItem('pace_cart', JSON.stringify(cart));
    renderCartPage();
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

// function to update color directly in the shopping cart
function updateCartItemColor(index, newColor) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
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

    localStorage.setItem('pace_cart', JSON.stringify(cart));
    renderCartPage();
}

// function to update size directly in the shopping cart
function updateCartItemSize(index, newSize) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
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

    localStorage.setItem('pace_cart', JSON.stringify(cart));
    renderCartPage();
}

// function to delete items in shopping cart
function removeFromCart(index) {
    const modal = document.getElementById('delete-confirm-modal');
    const confirmBtn = document.getElementById('btn-confirm-remove');

    if (modal) modal.showModal();

    confirmBtn.onclick = function () {
        let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];

        cart.splice(index, 1);

        localStorage.setItem('pace_cart', JSON.stringify(cart));

        modal.close();
        renderCartPage();
    };
}

function closeDeleteModal() {
    document.getElementById('delete-confirm-modal').close();
}

/* ADD TO CART FUNCTIONALITY END */

/* ADD TO WISHLIST FUNCTIONALITY START */
// add to wishlist function
function addToWishlist(productId) {

    let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];

    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);

    } else {
        const product = products.find(p => p.id === productId);

        if (product) {

            wishlist.push(product);
        }
    }

    localStorage.setItem('pace_wishlist', JSON.stringify(wishlist));

    if (document.getElementById('wishlist-container')) renderWishlistPage();

    if (document.getElementById('product-container')) {
        const path = window.location.pathname;
        const isHomepage = path.includes('homepage.html') || path === '/';

        if (isHomepage) {
            renderProducts(activeCategory, 8, false);
        } else {
            renderProducts(activeCategory, null, false);
        }
    }
}

// wishlist item function and design
function renderWishlistPage() {
    const container = document.getElementById('wishlist-container');
    const emptyState = document.getElementById('wishlist-empty');

    if (!container) return;

    let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
    document.getElementById('cart-item-count').innerText = `(${wishlist.length})`;

    const isEmpty = wishlist.length === 0;

    emptyState.classList.toggle('hidden', !isEmpty);
    container.classList.toggle('hidden', isEmpty);

    if (isEmpty) {
        container.innerHTML = '';
        return;
    }

    if (!isEmpty) {
        container.innerHTML = wishlist.map(p => `
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
                        <div class="wishlist">
                            <button onclick="addToWishlist('${p.id}')">
                                <i class="fi fi-ss-heart"></i>
                            </button>
                        </div>
                        <div class="add" onclick="window.location.href='product-detail.html?id=${p.id}'">
                            <button>ADD TO CART</button>
                        </div>
                        <div class="buy">
                            <button>BUY NOW</button>
                        </div>
                    </div>
                    
                </div>
            `).join('');
    }
}

/* ADD TO WISHLIST FUNCTIONALITY END */

window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderCartPage === 'function') renderCartPage();

    if (document.getElementById('wishlist-container')) renderWishlistPage();

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];

            const hasSelectedItem = cart.some(item => item.selected !== false);

            if (!hasSelectedItem) {
                e.preventDefault();
                alert("Please select at least one product to proceed to checkout.");
            } else {
                alert("Proceeding to checkout with selected items!");
            }
        });
    }
});

/* TERMS AND CONDITIONS MODAL START */
function openTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.showModal();
}

function closeTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.close();
}

function acceptTerms() {
    const checkbox = document.getElementById('terms-checkbox');
    if (checkbox) checkbox.checked = true;

    closeTermsModal();
}
/* TERMS AND CONDITIONS MODAL END */


/* USER ACCOUNT POPUP START */
function renderUserMenu() {
    const container = document.getElementById('user-popup-container');
    if (!container) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    if (currentUser) {
        const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();

        container.innerHTML = `
            <button class="user-popup-btn" onclick="toggleUserPopup()">
                <i class="fi fi-rs-user"></i>   
            </button>
            <div class="user-action-card" id="user-popup-menu">
                <div class="card-profile-header">
                    <div class="profile-initials">${initials}</div>
                    <div class="profile-text">
                        <h4>Hi, ${currentUser.firstName}!</h4>
                        <p>${currentUser.email}</p>
                    </div>
                </div>
                
                <div class="account-links">
                    <a href="#"><i class="fi fi-rr-settings"></i> Account Settings</a>
                    <a href="#"><i class="fi fi-rr-box"></i> Order History</a>
                    <a href="#"><i class="fi fi-rr-envelope"></i> Messages</a>
                    <a href="#"><i class="fi fi-rr-star"></i> My Feedback</a>
                </div>

                <div class="card-logout">
                    <button onclick="logoutUser()" class="logout-btn">
                        <i class="fi fi-rs-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button class="user-popup-btn" onclick="toggleUserPopup()">
                <i class="fi fi-rs-user"></i>
            </button>
            <div class="user-action-card" id="user-popup-menu">
                <div class="card-greeting">
                    <h4>Welcome to <span>PACE</span></h4>
                </div>
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

window.addEventListener('click', function(event) {
    if (!event.target.matches('.user-popup-btn') && !event.target.closest('.user-popup-btn')) {
        const popups = document.getElementsByClassName("user-action-card");
        for (let i = 0; i < popups.length; i++) {
            if (popups[i].classList.contains('show')) {
                popups[i].classList.remove('show');
            }
        }
    }
});
/* USER ACCOUNT POPUP END */

/* SIGNUP AND LOGIN FUNCTION START */
window.addEventListener('DOMContentLoaded', () => {
    
    if (typeof renderUserMenu === 'function') renderUserMenu();

    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);
        const errorText = document.getElementById(inputId + '-error');
        
        if (inputField) inputField.classList.add('input-error');
        if (errorText) {
            errorText.innerText = message;
            errorText.classList.add('show-error'); 
        }
    }

    function clearErrors(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const inputs = form.querySelectorAll('.input-field');
        const errors = form.querySelectorAll('.field-error-msg');
        
        inputs.forEach(input => input.classList.remove('input-error'));
        errors.forEach(error => {
            error.classList.remove('show-error'); 
        });
    }

    // signup function
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            clearErrors('signup-form');

            let isValid = true;
            const fname = document.getElementById('signup-fname').value.trim();
            const lname = document.getElementById('signup-lname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const username = document.getElementById('signup-username').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;

            const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passRegex.test(password)) {
                showError('signup-password', 'Password must be at least 8 characters long and include a letter, a number, and a special symbol (e.g., @, #, $, %).');
                isValid = false;
            }

            // 2. Passwords Match Check
            if (password !== confirm) {
                showError('signup-confirm', 'Passwords do not match.');
                isValid = false;
            }

            // 3. Duplicate User/Email Check
            let users = JSON.parse(localStorage.getItem('pace_users')) || [];
            if (users.some(u => u.email === email)) {
                showError('signup-email', 'This email is already registered.');
                isValid = false;
            }
            if (users.some(u => u.username === username)) {
                showError('signup-username', 'This username is already taken.');
                isValid = false;
            }

            const captchaInput = document.getElementById('captcha-input').value.trim();
            if (captchaInput !== currentCaptcha) {
                showError('captcha-input', 'Incorrect CAPTCHA. Please try again.');
                
                isValid = false;
            }

            if (!isValid) return;

            const newUser = { firstName: fname, lastName: lname, email: email, username: username, password: password };
            users.push(newUser);
            localStorage.setItem('pace_users', JSON.stringify(users));

            const successModal = document.getElementById('signup-success-modal');
            if (successModal) {
                successModal.showModal();
            } else {
                window.location.href = "login.html";
            }
        });
    }

    // login function
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            clearErrors('login-form');

            const usernameInput = document.getElementById('login-username').value.trim();
            const passwordInput = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('pace_users')) || [];
            const validUser = users.find(u => u.username === usernameInput);

            if (!validUser) {
                showError('login-username', 'Username not found.');
            } else if (validUser.password !== passwordInput) {
                showError('login-password', 'Incorrect password.');
            } else {
                localStorage.setItem('pace_current_user', JSON.stringify(validUser));
                window.location.href = "homepage.html"; 
            }
        });
    }

    // password see and unsee toggle
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const inputField = document.getElementById(targetId);
            
            if (inputField.type === 'password') {
                inputField.type = 'text';
                this.classList.replace('fi-rr-eye-crossed', 'fi-rr-eye');
            } else {
                inputField.type = 'password';
                this.classList.replace('fi-rr-eye', 'fi-rr-eye-crossed');
            }
        });
    });

});
/* SIGNUP AND LOGIN FUNCTION END */

/* CAPTCHA GENERATION START */
let currentCaptcha = "";

function generateCaptcha() {
    const canvas = document.getElementById('captcha-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; 
    let captchaText = "";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f2f0ee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 150; i++) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < 12; i++) {
        ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.5})`;
        ctx.lineWidth = Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    ctx.font = "bold 24px 'Poppins', sans-serif";
    ctx.textBaseline = "middle";

    for (let i = 0; i < 6; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        captchaText += char;

        const xOffset = 20 + (i * 18);
        const yOffset = (canvas.height / 2) + (Math.random() * 10 - 5);
        const angle = (Math.random() - 0.5) * 0.8;

        ctx.save();
        ctx.translate(xOffset, yOffset);
        ctx.rotate(angle);
        ctx.fillStyle = `rgb(${Math.random()*100}, ${Math.random()*100}, ${Math.random()*100})`; 
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }
    currentCaptcha = captchaText;
}

window.addEventListener('DOMContentLoaded', () => {
    
    generateCaptcha();

    const refreshBtn = document.getElementById('refresh-captcha');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            generateCaptcha();
            document.getElementById('captcha-input').value = "";
        });
    }
    
});

/* CAPTCHA GENERATION END */

/* CART PREVIEW PANEL FUNCTION START */ 
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
                <div class="cart-preview-subtotal">
                    <span>Subtotal:</span>
                    <span id="cart-preview-total">₱ 0.00</span>
                </div>
                <button class="cart-preview-checkout-btn" onclick="window.location.href='cart.html'">VIEW FULL CART</button>
            </div>
        </div>
    `;
    document.body.appendChild(cartWrapper);
}

function openCartPanel(event) {
    if (window.location.pathname.includes('cart.html')) {
        return;
    }

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
    setTimeout(() => {
        overlay.style.opacity = '1';
        panel.classList.add('open');
    }, 10);

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
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

function renderCartPreview() {
    const body = document.getElementById('cart-preview-body');
    const totalEl = document.getElementById('cart-preview-total');
    const countEl = document.getElementById('cart-preview-count');
    
    if (!body) return;

    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    
    let totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    if(countEl) countEl.innerText = `(${totalItems})`;

    if (cart.length === 0) {
        body.innerHTML = `
            <div class="mini-cart-empty">
                <i class="fi fi-rr-shopping-cart" style="font-size: 50px; color: #ddd; margin-bottom: 10px; display: block;"></i>
                <p>Your cart is currently empty.</p>
            </div>`;
        if(totalEl) totalEl.innerText = '₱ 0.00';
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

    if(totalEl) {
        const formattedTotal = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        totalEl.innerText = '₱ ' + formattedTotal;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    buildCartPanel();
});

function removeFromPreviewCart(index) {
    let cart = JSON.parse(localStorage.getItem('pace_cart')) || [];
    cart.splice(index, 1);
    
    localStorage.setItem('pace_cart', JSON.stringify(cart));
    
    renderCartPreview();
    
    if (typeof renderCartPage === 'function' && document.getElementById('cart-items-container')) {
        renderCartPage();
    }
}

/* CART PREVIEW PANEL FUNCTION END */ 

/* WIHSLIST PREVIEW PANEL FUNCTION START */
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

    if (window.location.pathname.includes('wishlist.html')) {
        return;
    }

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
    setTimeout(() => {
        overlay.style.opacity = '1';
        panel.classList.add('open');
    }, 10);

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
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

function renderWishlistPreview() {
    const body = document.getElementById('wishlist-preview-body');
    const countEl = document.getElementById('wishlist-preview-count');
    
    if (!body) return;

    let wishlist = JSON.parse(localStorage.getItem('pace_wishlist')) || [];
    
    if(countEl) countEl.innerText = `(${wishlist.length})`;

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
                        <h4>${item.name}</h4>
                        <button class="mini-cart-delete-btn" onclick="event.stopPropagation(); addToWishlist('${item.id}'); renderWishlistPreview();" title="Remove from Wishlist">
                            <i class="fi fi-ss-heart wishlist-remove-icon"></i>
                        </button>
                    </div>
                    <p>${item.type} | ${item.color}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="mini-cart-price">₱ ${item.price}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    buildWishlistPanel();
});

/* WIHSLIST PREVIEW PANEL FUNCTION END */