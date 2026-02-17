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

// product info
const products = [

    { name: 'Pace 680', price: '4,999.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 680 (Gray).jpg', hover: 'All Products/Men Products/M PACE 680 (Gray) (2).jpg' },
    { name: 'Pace 740', price: '5,499.00', type: 'MEN', isNew: true, img: 'All Products/Men Products/M PACE 740.jpg', hover: 'All Products/Men Products/M PACE 740 (2).jpg' },
    { name: 'Pace T500', price: '3,499.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE T500.jpg', hover: 'All Products/Men Products/M PACE T500 (2).jpg' },
    { name: 'Pace Abzorb', price: '4,499.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE Abzorb.jpg', hover: 'All Products/Men Products/M PACE Abzorb (2).jpg' },
    { name: 'Pace 2010', price: '5,299.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 2010.jpg', hover: 'All Products/Men Products/M PACE 2010 (2).jpg' },
    { name: 'Pace 204L', price: '6,499.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 204L.jpg', hover: 'All Products/Men Products/M PACE 204L (2).jpg' },
    { name: 'Pace 442', price: '4,799.00', type: 'MEN', isNew: true, img: 'All Products/Men Products/M PACE 442.jpg', hover: 'All Products/Men Products/M PACE 442 (2).jpg' },
    { name: 'Pace 991', price: '3,999.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 991.jpg', hover: 'All Products/Men Products/M PACE 991 (2).jpg' },
    { name: 'Pace 471', price: '4,299.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 471.jpg', hover: 'All Products/Men Products/M PACE 471 (2).jpg' },
    { name: 'Pace 1080', price: '4,699.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE 1080.jpg', hover: 'All Products/Men Products/M PACE 1080 (2).jpg' },
    { name: 'Pace P400', price: '6,299.00', type: 'MEN', isNew: false, img: 'All Products/Men Products/M PACE P400.jpg', hover: 'All Products/Men Products/M PACE P400 (2).jpg' },
    { name: 'Pace Runner', price: '5,999.00', type: 'MEN', isNew: true, img: 'All Products/Men Products/M PACE Runner.jpg', hover: 'All Products/Men Products/M PACE Runner (2).jpg' },

    { name: 'Pace Fuel Cell', price: '3,999.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE FuelCell.jpg', hover: 'All Products/Women Products/W PACE FuelCell (2).jpg' },
    { name: 'Pace 327', price: '3,499.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE 327.png', hover: 'All Products/Women Products/W PACE 327 (2).jpg' },
    { name: 'Pace Ice', price: '4,199.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Ice.jpg', hover: 'All Products/Women Products/W PACE Ice (2).jpg' },
    { name: 'Pace Reese', price: '4,499.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Reese.jpg', hover: 'All Products/Women Products/W PACE Reese (2).jpg' },
    { name: 'Pace Gator', price: '4,999.00', type: 'WOMEN', isNew: true, img: 'All Products/Women Products/W PACE Gator.jpg', hover: 'All Products/Women Products/W PACE Gator (2).jpg' },
    { name: 'Pace Pattern', price: '4,799.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Pattern.jpg', hover: 'All Products/Women Products/W PACE Pattern (2).jpg' },
    { name: 'Pace Jamie', price: '3,799.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Jamie.jpg', hover: 'All Products/Women Products/W PACE Jamie (2).jpg' },
    { name: 'Pace Trainer', price: '4,499.00', type: 'WOMEN', isNew: true, img: 'All Products/Women Products/W PACE Trainer.jpg', hover: 'All Products/Women Products/W PACE Trainer (2).jpg' },
    { name: 'Pace 991', price: '3,999.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE 991.jpg', hover: 'All Products/Women Products/W PACE 991 (2).jpg' },
    { name: 'Pace Hierro', price: '3,799.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Hierro.jpg', hover: 'All Products/Women Products/W PACE Hierro (2).jpg' },
    { name: 'Pace Minimus', price: '4,499.00', type: 'WOMEN', isNew: false, img: 'All Products/Women Products/W PACE Minimus.jpg', hover: 'All Products/Women Products/W PACE Minimus (2).jpg' },
    { name: 'Pace Rally', price: '4,999.00', type: 'WOMEN', isNew: true, img: 'All Products/Women Products/W PACE Rally.jpg', hover: 'All Products/Women Products/W PACE Rally (2).jpg' },

    { name: 'Pace Lace', price: '2,999.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Lace.jpg', hover: 'All Products/Kids Products/K PACE Lace (2).jpg' },
    { name: 'Pace Super', price: '2,499.00', type: 'KIDS', isNew: true, img: 'All Products/Kids Products/K PACE Super.jpg', hover: 'All Products/Kids Products/K PACE Super (2).jpg' },
    { name: 'Pace 1000', price: '2,799.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE 1000.jpg', hover: 'All Products/Kids Products/K PACE 1000 (2).jpg' },
    { name: 'Pace Boa', price: '2,299.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Boa.jpg', hover: 'All Products/Kids Products/K PACE Boa (2).jpg' },
    { name: 'Pace Coco', price: '3,299.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Coco.jpg', hover: 'All Products/Kids Products/K PACE Coco (2).jpg' },
    { name: 'Pace Arishi', price: '2,499.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Arishi.jpg', hover: 'All Products/Kids Products/K PACE Arishi (2).jpg' },
    { name: 'Pace Tekela', price: '3,999.00', type: 'KIDS', isNew: true, img: 'All Products/Kids Products/K PACE Tekela.jpg', hover: 'All Products/Kids Products/K PACE Tekela (2).jpg' },
    { name: 'Pace Coze', price: '2,999.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Coze.jpg', hover: 'All Products/Kids Products/K PACE Coze (2).jpg' },
    { name: 'Pace Fresh', price: '3,499.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Fresh.jpg', hover: 'All Products/Kids Products/K PACE Fresh (2).jpg' },
    { name: 'Pace Eco', price: '2,799.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Eco.jpg', hover: 'All Products/Kids Products/K PACE Eco (2).jpg' },
    { name: 'Pace Hook', price: '2,699.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Hook.jpg', hover: 'All Products/Kids Products/K PACE Hook (2).jpg' },
    { name: 'Pace Neon', price: '2,999.00', type: 'KIDS', isNew: false, img: 'All Products/Kids Products/K PACE Neon.jpg', hover: 'All Products/Kids Products/K PACE Neon (2).jpg' }

];

let currentLimit = 12;
let activeCategory = '';
let storedList = [];

function renderProducts(category, fixedLimit = null, randomize = false) {
    const container = document.getElementById('product-container');
    const loadBtn = document.getElementById('load-btn');

    if (category !== activeCategory) {

        activeCategory = category;
        currentLimit = 12;

        let tempProducts = products;
        if (category === 'NEW') {
            tempProducts = products.filter(p => p.isNew === true);
        } else if (category !== 'ALL') {
            tempProducts = products.filter(p => p.type === category);
        }

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
                <div class="wishlist"><button><i class="fi fi-rs-heart"></i></button></div>
                <div class="add"><button>ADD TO CART</button></div>
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

// category info
const categories = [
    {
        title: "MEN",
        desc: "Built for style, comfort, and confidence",
        img: "Category Image/Men Category.jpg",
        color: "#C06C37",
        link: "men.html"
    },
    {
        title: "WOMEN",
        desc: "Built for elegant, versatile, and empowered",
        img: "Category Image/Women Category.jpg",
        color: "#C06C37",
        link: "women.html"
    },
    {
        title: "KIDS",
        desc: "Built for playful designs for every adventure",
        img: "Category Image/Kid Category.jpg",
        color: "#C06C37",
        link: "kids.html"
    }
];

let index = 0;

function nextCategory(direction) {
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
const aboutData = [
    {
        title: "COMFORT",
        img: "About Image/comfort.jpg",
        desc: "Engineered with advanced cushioning systems to support you through every step of your daily journey."
    },
    {
        title: "QUALITY",
        img: "About Image/quality.jpg",
        desc: "Hand-selected materials and precision stitching ensure that your pair stands the test of time."
    },
    {
        title: "STYLE",
        img: "About Image/style.jpg",
        desc: "Modern silhouettes inspired by urban culture, designed to fit seamlessly into your wardrobe."
    }
];

const aboutContainer = document.getElementById('about-info');

aboutContainer.innerHTML = aboutData.map(about => `
    <div class="about-card">
        <img src="${about.img}" alt="${about.title}">
        <div class="card-text">
            <h3>${about.title}</h3>
            <p>${about.desc}</p>
        </div>
    </div>
`).join('');

// team info
const teamData = [
    {
        name: "Perez, Mark Jonel S.",
        role: "BACKEND DEVELOPER",
        img: "Team Image/Perez, M.jpeg"
    },
    {
        name: "Sumala, John Aldrin S.",
        role: "BACKEND DEVELOPER",
        img: "Team Image/Sumala, J.A.jpg"
    },
    {
        name: "Francia, Gad Daniel Kellyn",
        role: "FRONTEND DEVELOPER",
        img: "Team Image/Francia, G.jpg"
    },
    {
        name: "Javier, Mikel Kyan",
        role: "FRONTEND DEVELOPER",
        img: "Team Image/Javier, M.jfif"
    },
    {
        name: "Crisostomo, Jomari",
        role: "FRONTEND DEVELOPER",
        img: "Team Image/Crisostomo, J.jfif"
    }
];
const container = document.getElementById('team-card');

const teamHTML = teamData.map(member => `
        <div class="member-card">
            <img src="${member.img}" alt="${member.name}">
            <div class="member-info">
                <h1>${member.name}</h1>
                <p>${member.role}</p>
            </div>
        </div>
    `).join('');

container.innerHTML = teamHTML;