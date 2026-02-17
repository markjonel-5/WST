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
    { name: 'Pace 680', price: '4,999.00', type: 'MEN', img: 'M PACE 680 (Gray).jpg', hover: 'M PACE 680 (Gray) (2).jpg' },
    { name: 'Pace 740', price: '4,999.00', type: 'MEN', img: 'M PACE 740.jpg', hover: 'M PACE 740 (2).jpg' },
    { name: 'Pace Fuel Cell', price: '4,499.00', type: 'WOMEN', img: 'W PACE FuelCell.jpg', hover: 'W PACE FuelCell (2).jpg' },
    { name: 'Pace T500', price: '3,999.00', type: 'MEN', img: 'M PACE T500.jpg', hover: 'M PACE T500 (2).jpg' },
    { name: 'Pace Lace', price: '2,499.00', type: 'KIDS', img: 'K PACE Lace.jpg', hover: 'K PACE Lace (2).jpg' },
    { name: 'Pace 9060', price: '3,999.00', type: 'WOMEN', img: 'W PACE 9060.jpg', hover: 'W PACE 9060 (2).jpg' },
    { name: 'Pace 471', price: '4,799.00', type: 'MEN', img: 'M PACE 471.jpg', hover: 'M PACE 471 (2).jpg' },
    { name: 'Pace 204L', price: '4,299.00', type: 'MEN', img: 'M PACE 204L.jpg', hover: 'M PACE 204L (2).jpg' }
];

document.getElementById('product-container').innerHTML =
    products.map(p => `
        <div class="product-card">
            <button class="product-image">
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
    `).join('');

// category info
const categories = [
    {
        title: "MEN",
        desc: "Built for style, comfort, and confidence",
        img: "Men Category.jpg",
        color: "#C06C37",
        link: "men.html"
    },
    {
        title: "WOMEN",
        desc: "Built for elegant, versatile, and empowered",
        img: "Women Category.jpg",
        color: "#C06C37",
        link: "women.html"
    },
    {
        title: "KIDS",
        desc: "Built for playful designs for every adventure",
        img: "Kid Category.jpg",
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
        img: "comfort.jpg",
        desc: "Engineered with advanced cushioning systems to support you through every step of your daily journey."
    },
    {
        title: "QUALITY",
        img: "quality.jpg",
        desc: "Hand-selected materials and precision stitching ensure that your pair stands the test of time."
    },
    {
        title: "STYLE",
        img: "style.jpg",
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
        img: "Perez, M.jpeg"
    },
    {
        name: "Sumala, John Aldrin S.",
        role: "BACKEND DEVELOPER",
        img: "Perez, M.jpeg"
    },
    {
        name: "Francia, Gad Daniel Kellyn",
        role: "FRONTEND DEVELOPER",
        img: "Perez, M.jpeg"
    },
    {
        name: "Javier, Mikel Kyan",
        role: "FRONTEND DEVELOPER",
        img: "Perez, M.jpeg"
    },
    {
        name: "Crisostomo, Jomari",
        role: "FRONTEND DEVELOPER",
        img: "Perez, M.jpeg"
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