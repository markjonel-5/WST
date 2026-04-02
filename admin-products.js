// ===============================================
// 1. GLOBAL VARIABLES
// ===============================================
let currentPage = 1;
const itemsPerPage = 4; // Ilang products bawat page
let currentFilteredProducts = [];
let currentDeleteId = null;
let currentStockFilter = 'ALL';

// ===============================================
// 2. PAGE INITIALIZATION & SECURITY
// ===============================================
window.addEventListener('DOMContentLoaded', () => {
    // SECURITY CHECK (Ensures only admins are here)
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = "login.html";
        return;
    }

    // Set Admin Profile Initials
    const initials = (currentUser.firstName.charAt(0) + (currentUser.lastName ? currentUser.lastName.charAt(0) : '')).toUpperCase();
    document.getElementById('sidebar-initials').innerText = initials;
    document.getElementById('admin-name-display').innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    
    const popupName = document.getElementById('popup-admin-name');
    const popupInitials = document.getElementById('popup-initials');
    if (popupName) popupName.innerText = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    if (popupInitials) popupInitials.innerText = initials;

    // INITIALIZE TABLE
    loadProducts();

    // SEARCH LISTENER
    const searchInput = document.getElementById('products-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
});

// ===============================================
// 3. STATS & DATA LOADING
// ===============================================
function loadProducts() {
    let products = JSON.parse(localStorage.getItem('pace_products')) || [];
    renderProductStats(products);
    filterProducts(); // Calls render table automatically
}

function renderProductStats(products) {
    let total = products.length;
    let lowStock = 0;
    let outOfStock = 0;
    let totalValue = 0;

    products.forEach(p => {
        let stock = parseInt(p.stock) || 0;
        let price = parseFloat(p.price.replace(/,/g, '')) || 0;

        if (stock === 0) outOfStock++;
        else if (stock <= 10) lowStock++;

        totalValue += (stock * price);
    });

    document.getElementById('stat-total-products').innerText = total;
    document.getElementById('stat-low-stock').innerText = lowStock;
    document.getElementById('stat-out-of-stock').innerText = outOfStock;
    document.getElementById('stat-inventory-value').innerText = '₱ ' + totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 });
}

// ===============================================
// 4. FILTERING, TABLE RENDERING & PAGINATION
// ===============================================

// NEW FUNCTION: Para sa Clickable Cards (Updated with Active State logic)
window.filterByStock = function(status, element) {
    // 1. Remove the 'active' class from all stat boxes
    document.querySelectorAll('.order-stat-box').forEach(box => {
        box.classList.remove('active');
    });

    // 2. Add the 'active' class only to the clicked box
    if (element) {
        element.classList.add('active');
    }

    // 3. Update the filter status and re-render the table
    currentStockFilter = status;
    filterProducts();
};

function filterProducts() {
    let products = JSON.parse(localStorage.getItem('pace_products')) || [];
    const searchVal = document.getElementById('products-search-input').value.toLowerCase();
    const categoryVal = document.getElementById('filter-category').value;

    let filtered = products;

    // FIX 1: STOCK STATUS FILTER (Triggered by the cards)
    if (currentStockFilter === 'LOW') {
        filtered = filtered.filter(p => parseInt(p.stock) > 0 && parseInt(p.stock) <= 10);
    } else if (currentStockFilter === 'OUT') {
        filtered = filtered.filter(p => parseInt(p.stock) === 0);
    }

    // FIX 2: Category OR "New Arrival" status
    if (categoryVal === 'NEW') {
        filtered = filtered.filter(p => p.isNew === true);
    } else if (categoryVal !== 'ALL') {
        filtered = filtered.filter(p => p.type === categoryVal);
    }

    // Filter by Search Query
    if (searchVal.trim() !== '') {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchVal) || 
            p.id.toLowerCase().includes(searchVal)
        );
    }

    // Update Global Array and reset page to 1
    currentFilteredProducts = filtered;
    currentPage = 1; 
    
    renderProductsTable();
}

function renderProductsTable() {
    const tableBody = document.getElementById('products-table-body');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (currentFilteredProducts.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--gray-text);">No products found.</td></tr>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    // --- PAGINATION MATH ---
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = currentFilteredProducts.slice(start, end);

    tableBody.innerHTML = paginatedItems.map(p => {
        let stock = parseInt(p.stock) || 0;
        
        let statusClass = 'status-active';
        let statusText = 'Active';
        if (stock === 0) {
            statusClass = 'status-out';
            statusText = 'Out of Stock';
        } else if (stock <= 10) {
            statusClass = 'status-low';
            statusText = 'Low Stock';
        }

        return `
        <tr>
            <td>
                <div class="table-product-cell">
                    <img src="${p.img}" alt="${p.name}" class="table-product-img">
                    <div class="table-product-name">
                        <strong>${p.name}</strong>
                        <span>Color: ${p.color} ${p.isNew ? '<span style="color:var(--brand-color);">(New)</span>' : ''}</span>
                    </div>
                </div>
            </td>
            <td style="font-weight: 600; color: var(--gray-text);">${p.id}</td>
            <td style="color: var(--darkgray-text);">${p.type}</td>
            <td style="font-weight: 600;">₱ ${p.price}</td>
            <td style="font-weight: 700; color: ${stock <= 10 ? 'var(--brand-color)' : 'var(--darkgray-text)'};">${stock}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td style="text-align: right; padding-right: 30px;">
                <button class="action-btn edit" onclick="openProductModal('${p.id}')"><i class="fi fi-rr-edit"></i></button>
                <button class="action-btn delete" onclick="openDeleteModal('${p.id}')"><i class="fi fi-rr-trash"></i></button>
            </td>
        </tr>
        `;
    }).join('');

    renderPagination();
}

function renderPagination() {
    const container = document.getElementById('pagination-container');
    if(!container) return;

    const totalPages = Math.ceil(currentFilteredProducts.length / itemsPerPage);

    // Wag magpakita ng page numbers kung isang page lang ang kailangan
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    for(let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    container.innerHTML = html;
}

window.goToPage = function(page) {
    currentPage = page;
    renderProductsTable();
};

// ===============================================
// 5. ADD & EDIT PRODUCT MODAL LOGIC
// ===============================================
let adminUploadedPhotos = []; // Array to store the 2 images

window.openProductModal = function(productId = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('product-form');
    const nav = document.querySelector('.admin-navbar-section');

    form.reset(); // Clear previous inputs
    adminUploadedPhotos = []; // Clear photo array
    document.getElementById('admin-media-error').style.display = 'none';
    renderAdminPhotoPreviews(); 

    if (productId) {
        // EDIT MODE
        title.innerText = "Edit Product";
        let products = JSON.parse(localStorage.getItem('pace_products')) || [];
        let p = products.find(item => item.id === productId);
        
        if (p) {
            document.getElementById('prod-original-id').value = p.id;
            document.getElementById('prod-name').value = p.name;
            document.getElementById('prod-category').value = p.type;
            document.getElementById('prod-color').value = p.color;
            document.getElementById('prod-price').value = parseFloat(p.price.replace(/,/g, ''));
            document.getElementById('prod-stock').value = p.stock;
            document.getElementById('prod-isNew').checked = p.isNew;
            
            // Load existing images into the array
            if (p.img) adminUploadedPhotos.push(p.img);
            if (p.hover) adminUploadedPhotos.push(p.hover);
            renderAdminPhotoPreviews();
        }
    } else {
        // ADD MODE
        title.innerText = "Add New Product";
        document.getElementById('prod-original-id').value = ""; 
    }

    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.paddingRight = `calc(40px + ${scrollbarWidth}px)`; 
        modal.showModal();
    }
};

window.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    const nav = document.querySelector('.admin-navbar-section');
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''; 
        if (nav) nav.style.paddingRight = ''; 
    }
};

// --- PHOTO UPLOAD LOGIC ---
document.getElementById('admin-upload-photos')?.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    const errorMsg = document.getElementById('admin-media-error');
    
    if (adminUploadedPhotos.length + files.length > 2) {
        errorMsg.innerText = "Maximum of 2 photos allowed.";
        errorMsg.style.display = 'block';
        this.value = ''; // Reset input
        return;
    }
    
    files.forEach(file => {
        if (file.size > 2 * 1024 * 1024) { // 2MB Limit per photo
            errorMsg.innerText = "A photo is too large (Max 2MB).";
            errorMsg.style.display = 'block';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            adminUploadedPhotos.push(event.target.result);
            renderAdminPhotoPreviews();
            errorMsg.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });
    
    this.value = ''; // Reset input so same file can be uploaded again if deleted
});

function renderAdminPhotoPreviews() {
    const container = document.getElementById('admin-media-preview-container');
    const uploadBox = document.getElementById('admin-upload-box');
    let html = '';
    
    adminUploadedPhotos.forEach((src, index) => {
        // First photo is Primary, Second is Hover
        let tagText = index === 0 ? "Primary" : "Hover";
        html += `
            <div style="position: relative;">
                <button type="button" class="media-delete-btn" onclick="removeAdminPhoto(${index})">&times;</button>
                <div class="media-preview-box">
                    <img src="${src}" class="media-preview-content">
                </div>
                <div style="font-size: 10px; text-align: center; color: var(--gray-text); margin-top: 3px; font-weight: 600;">${tagText}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;

    // Hide upload box if 2 photos are already uploaded
    if (adminUploadedPhotos.length >= 2) {
        uploadBox.style.display = 'none';
    } else {
        uploadBox.style.display = 'flex';
    }
}

window.removeAdminPhoto = function(index) {
    adminUploadedPhotos.splice(index, 1);
    renderAdminPhotoPreviews();
};

// --- SAVE PRODUCT WITH PHOTOS ---
window.saveProduct = function(event) {
    event.preventDefault(); 
    
    const errorMsg = document.getElementById('admin-media-error');
    
    // STRICT VALIDATION: MUST HAVE EXACTLY 2 PHOTOS
    if (adminUploadedPhotos.length !== 2) {
        errorMsg.innerText = "You must upload exactly 2 photos (Primary and Hover).";
        errorMsg.style.display = 'block';
        return; 
    }

    let products = JSON.parse(localStorage.getItem('pace_products')) || [];
    
    let id = document.getElementById('prod-original-id').value;
    let name = document.getElementById('prod-name').value.trim();
    let type = document.getElementById('prod-category').value;
    let color = document.getElementById('prod-color').value.trim();
    let rawPrice = parseFloat(document.getElementById('prod-price').value);
    let stock = parseInt(document.getElementById('prod-stock').value);
    let isNew = document.getElementById('prod-isNew').checked;

    let formattedPrice = rawPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (id === "") {
        // CREATE NEW
        id = type.charAt(0) + Math.floor(Math.random() * 10000);
        
        let newProduct = {
            id: id,
            name: name,
            price: formattedPrice,
            type: type,
            color: color,
            isNew: isNew,
            img: adminUploadedPhotos[0],    // Primary Image
            hover: adminUploadedPhotos[1], // Hover Image
            stock: stock
        };
        products.push(newProduct);

    } else {
        // UPDATE EXISTING
        let index = products.findIndex(p => p.id === id);
        
        if (index > -1) {
            let oldName = products[index].name;
            
            products[index].name = name;
            products[index].type = type;
            products[index].color = color;
            products[index].price = formattedPrice;
            products[index].stock = stock;
            products[index].img = adminUploadedPhotos[0];   // Primary Image
            products[index].hover = adminUploadedPhotos[1]; // Hover Image
            products[index].isNew = isNew;

            // Sync category across all variants of the same shoe
            products.forEach(p => {
                if (p.name === oldName && p.id !== id) {
                    p.name = name; 
                    p.type = type; 
                }
            });
        }
    }

    localStorage.setItem('pace_products', JSON.stringify(products));
    closeProductModal();
    loadProducts(); 
};

// ===============================================
// 6. DELETE PRODUCT MODAL LOGIC
// ===============================================
window.openDeleteModal = function(productId) {
    let products = JSON.parse(localStorage.getItem('pace_products')) || [];
    
    // FIX: Gumamit ng String() para siguradong mag-match kahit Number o String ang naka-save
    let p = products.find(item => String(item.id) === String(productId));
    
    const nav = document.querySelector('.admin-navbar-section');
    const modal = document.getElementById('delete-modal');
    
    if (p && modal) {
        currentDeleteId = String(productId); // I-save bilang String
        document.getElementById('delete-prod-name').innerText = p.name;
        
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.paddingRight = `calc(40px + ${scrollbarWidth}px)`;

        modal.showModal();
    } else {
        console.error("Product not found or Modal missing. ID:", productId);
    }
};

window.closeDeleteModal = function() {
    currentDeleteId = null;
    const modal = document.getElementById('delete-modal');
    const nav = document.querySelector('.admin-navbar-section');
    
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''; 
        if (nav) nav.style.paddingRight = ''; 
    }
};

window.executeDelete = function() {
    if (!currentDeleteId) return;

    // 1. Remove from the Main Products Database
    let products = JSON.parse(localStorage.getItem('pace_products')) || [];
    products = products.filter(p => String(p.id) !== String(currentDeleteId));
    localStorage.setItem('pace_products', JSON.stringify(products));
    
    // 2. CASCADING DELETE: Registered Users
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    let isCurrentUserUpdated = false;

    users = users.map(user => {
        // Filter out the deleted product from this user's cart
        if (user.cart) {
            user.cart = user.cart.filter(item => String(item.productId) !== String(currentDeleteId));
        }
        
        // Filter out the deleted product from this user's wishlist
        if (user.wishlist) {
            user.wishlist = user.wishlist.filter(item => String(item.id) !== String(currentDeleteId));
        }

        if (currentUser && currentUser.email === user.email) {
            currentUser = user;
            isCurrentUserUpdated = true;
        }
        return user;
    });

    localStorage.setItem('pace_users', JSON.stringify(users));
    if (isCurrentUserUpdated) {
        localStorage.setItem('pace_current_user', JSON.stringify(currentUser));
    }

    // 3. CASCADING DELETE: Guest Cart and Wishlist
    let guestCart = JSON.parse(localStorage.getItem('pace_guest_cart')) || [];
    guestCart = guestCart.filter(item => String(item.productId) !== String(currentDeleteId));
    localStorage.setItem('pace_guest_cart', JSON.stringify(guestCart));

    let guestWishlist = JSON.parse(localStorage.getItem('pace_guest_wishlist')) || [];
    guestWishlist = guestWishlist.filter(item => String(item.id) !== String(currentDeleteId));
    localStorage.setItem('pace_guest_wishlist', JSON.stringify(guestWishlist));
    
    // 4. Close modal and refresh UI
    closeDeleteModal();
    loadProducts(); 
};