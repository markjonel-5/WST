// CATEGORY INFORMATION AND FUNCTIONS
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

// ABOUT INFORMATION
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

// TEAM INFORMATION
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