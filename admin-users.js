let currentFilterStatus = 'All';
let selectedUserEmail = null;

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('users-search-input');
    
    if (searchInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            searchInput.value = searchParam; // Auto-fill search bar
        }
        searchInput.addEventListener('input', loadUsersTable);
    }
    
    // Load table (it will automatically detect the filled search bar)
    loadUsersTable();
});

function loadUsersTable() {
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];

    users.reverse();

    users = users.map(u => {
        if (!u.status) u.status = 'Active';
        return u;
    });

    renderUserStats(users);

    const searchVal = document.getElementById('users-search-input') ? document.getElementById('users-search-input').value.toLowerCase() : '';
    // Kukunin natin ang value mula sa bagong role dropdown
    const roleFilter = document.getElementById('filter-role-dropdown') ? document.getElementById('filter-role-dropdown').value : 'All';

    let filteredUsers = users;

    // Filter by Top Status Boxes
    if (currentFilterStatus === 'New') {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        filteredUsers = filteredUsers.filter(u => {
            if (u.registeredDate && u.registeredDate !== 'Unknown') {
                const regDate = new Date(u.registeredDate);
                return regDate >= thirtyDaysAgo && regDate <= today;
            }
            return false;
        });
    } else if (currentFilterStatus !== 'All') {
        filteredUsers = filteredUsers.filter(u => u.status === currentFilterStatus);
    }

    // Filter by Role Dropdown
    if (roleFilter !== 'All') {
        filteredUsers = filteredUsers.filter(u => u.role === roleFilter);
    }

    // Filter by Search Box
    if (searchVal.trim() !== '') {
        filteredUsers = filteredUsers.filter(u => {
            const name = `${u.firstName} ${u.lastName || ''}`.toLowerCase();
            return name.includes(searchVal) || u.email.toLowerCase().includes(searchVal);
        });
    }

    const tableBody = document.getElementById('users-table-body');

    if (filteredUsers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray-text);">No users found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = filteredUsers.map(u => {
        const initials = (u.firstName.charAt(0) + (u.lastName ? u.lastName.charAt(0) : '')).toUpperCase();
        const fullName = `${u.firstName} ${u.lastName || ''}`.trim();
        const roleBadge = u.role === 'admin' ? '<span class="badge-admin">Admin</span>' : '<span class="badge-user">Customer</span>';

        let statusClass = 'badge-active';
        if (u.status === 'Blocked') statusClass = 'badge-blocked';

        const statusBadge = `<span class="${statusClass}">${u.status}</span>`;
        let avatarHTML = u.profilePic 
            ? `<img src="${u.profilePic}" alt="${fullName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">` 
            : `<div class="user-avatar">${initials}</div>`;

        return `
        <tr>
            <td>
                <div class="user-info-cell">
                    ${avatarHTML}
                    <div class="user-name-text">
                        <strong>${fullName}</strong>
                        <div class="user-email-text">${u.email}</div>
                    </div>
                </div>
            </td>
            <td style="color: var(--gray-text); font-size: 14px;">${u.registeredDate || 'Unknown'}</td>
            <td>${roleBadge}</td>
            <td>${statusBadge}</td>
            <td style="text-align: right; padding-right: 30px;">
                <button class="btn-view" onclick="viewUserDetails('${u.email}')">View Details</button>
            </td>
        </tr>
        `;
    }).join('');
}

function renderUserStats(users) {
    let active = 0, blocked = 0, newUsers = 0;

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    users.forEach(u => {
        if (u.status === 'Active') active++;
        else if (u.status === 'Blocked') blocked++;
        
        
        if (u.registeredDate && u.registeredDate !== 'Unknown') {
            const regDate = new Date(u.registeredDate);
            if (regDate >= thirtyDaysAgo && regDate <= today) {
                newUsers++;
            }
        }
    });

    document.getElementById('stat-total-users').innerText = users.length;
    document.getElementById('stat-active').innerText = active;
    document.getElementById('stat-blocked').innerText = blocked;
    document.getElementById('stat-new-users').innerText = newUsers;
}

window.filterUsers = function (status, element) {
    document.querySelectorAll('.order-stat-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');
    currentFilterStatus = status;
    loadUsersTable();
};

window.viewUserDetails = function (email) {
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let u = users.find(user => user.email === email);
    if (!u) return;

    if (!u.status) u.status = 'Active';

    const panelBody = document.getElementById('user-panel-content');
    const panelFooter = document.getElementById('user-panel-actions');

    const initials = (u.firstName.charAt(0) + (u.lastName ? u.lastName.charAt(0) : '')).toUpperCase();
    const fullName = `${u.firstName} ${u.lastName || ''}`.trim();
    const roleBadge = u.role === 'admin' ? '<span class="badge-admin">Admin</span>' : '<span class="badge-user">Customer</span>';

    // Ina-apply na natin ang capsule class sa view modal status
    let statusClass = 'badge-active';
    if (u.status === 'Blocked') statusClass = 'badge-blocked';

    let profilePicHTML = u.profilePic 
        ? `<img src="${u.profilePic}" alt="${fullName}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">` 
        : `<div class="up-avatar">${initials}</div>`;

    let contentHTML = `
        <div class="up-partition">
            <div class="od-section-title">Basic Information</div>
            <div class="up-basic-info">
                ${profilePicHTML}
                <div class="up-name">
                    <h3>${fullName}</h3>
                    <p>${u.email}</p>
                </div>
            </div>
            <div class="up-grid">
                <div class="up-data-group">
                    <p>Phone</p>
                    <h4>${u.phone || 'N/A'}</h4>
                </div>
                <div class="up-data-group">
                    <p>Role</p>
                    <div>${roleBadge}</div>
                </div>
                <div class="up-data-group">
                    <p>Status</p>
                    <div><span class="${statusClass}">${u.status}</span></div>
                </div>
                <div class="up-data-group">
                    <p>Registered</p>
                    <h4>${u.registeredDate || u.dateCreated || u.dateRegistered || u.date || 'Unknown'}</h4>
                </div>
            </div>
        </div>
    `;

    if (u.role !== 'admin') {
        let orderHistoryHTML = '<p style="font-size: 13px; color: var(--gray-text);">No past orders.</p>';
        if (u.orderHistory && u.orderHistory.length > 0) {
            orderHistoryHTML = u.orderHistory.map(o => {
                let amountVal = o.totalAmount || o.total || o.amount || o.price || 0;
                let cleanAmount = parseFloat(String(amountVal).replace(/,/g, '')) || 0;

                // STATUS COLOR LOGIC
                let statusColor = '#3498db'; // Default (Blue) for To Receive
                if (o.status === 'Completed') statusColor = '#1b8f50'; // Green
                else if (o.status === 'To Ship') statusColor = '#f39c12'; // Orange

                return `
                <div class="up-history-card">
                    <div>
                        <strong style="color: var(--brand-color); font-size: 13px;">${o.id}</strong>
                        <div style="font-size: 11px; color: var(--gray-text);">${o.date}</div>
                    </div>
                    <div style="text-align: right;">
                        <strong style="font-size: 14px;">₱ ${cleanAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                        <div style="font-size: 10px; font-weight: 700; color: ${statusColor};">${o.status.toUpperCase()}</div>
                    </div>
                </div>
                `;
            }).join('');
        }

        let addressHTML = '<p style="font-size: 13px; color: var(--gray-text);">No saved addresses.</p>';
        if (u.addresses && u.addresses.length > 0) {
            addressHTML = u.addresses.map(a => `
                <div class="up-address-card">
                    <i class="fi fi-rr-home" style="color: var(--brand-color); margin-right: 5px;"></i>
                    ${a.street}, ${a.brgy}, ${a.city}, ${a.region}
                </div>
            `).join('');
        }

        contentHTML += `
            <div class="up-partition">
                <div class="od-section-title">Order History (${u.orderHistory ? u.orderHistory.length : 0})</div>
                <div">${orderHistoryHTML}</div>
            </div>

            <div class="up-address-section">
                <div class="od-section-title">Saved Addresses (${u.addresses ? u.addresses.length : 0})</div>
                <div>${addressHTML}</div>
            </div>
        `;
    }

    panelBody.innerHTML = contentHTML;

    const blockBtnText = u.status === 'Blocked' ? 'Unblock' : 'Block';
    const blockIcon = u.status === 'Blocked' ? 'fi-rr-check-circle' : 'fi-rr-ban';

    let loggedInAdmin = JSON.parse(localStorage.getItem('pace_current_user'));
    let actionButtonsHTML = '';

    if (u.isSuperAdmin) {
        actionButtonsHTML = `<p style="color: var(--gray-text); text-align: center; width: 100%; grid-column: span 2; font-size: 13px;">Super Admin accounts cannot be modified.</p>`;
    } else if (u.role === 'admin') {
        if (loggedInAdmin && loggedInAdmin.isSuperAdmin) {
            actionButtonsHTML = `
                <button class="btn-panel-action" style="grid-column: span 2;" onclick="openBlockModal('${u.email}', '${fullName}', '${u.status}')"><i class="fi ${blockIcon}"></i> ${blockBtnText}</button>
                <button class="btn-panel-action" onclick="openRoleModal('${u.email}', '${fullName}')"><i class="fi fi-rr-user-gear"></i> Change Role</button>
                <button class="btn-panel-action btn-panel-delete" style="grid-column: span 1;" onclick="openDeleteUserModal('${u.email}', '${fullName}')"><i class="fi fi-rr-trash"></i> Delete</button>
            `;
        } else {
            actionButtonsHTML = `<p style="color: var(--gray-text); text-align: center; width: 100%; grid-column: span 2; font-size: 13px;">You do not have permission to modify other administrators.</p>`;
        }
    } else {
        // Customer View - Pinalapad ang block button dahil wala nang deactivate
        actionButtonsHTML = `
            <button class="btn-panel-action" style="grid-column: span 2;" onclick="openBlockModal('${u.email}', '${fullName}', '${u.status}')"><i class="fi ${blockIcon}"></i> ${blockBtnText}</button>
            <button class="btn-panel-action" onclick="openRoleModal('${u.email}', '${fullName}')"><i class="fi fi-rr-user-gear"></i> Change Role</button>
            <button class="btn-panel-action btn-panel-delete" style="grid-column: span 1;" onclick="openDeleteUserModal('${u.email}', '${fullName}')"><i class="fi fi-rr-trash"></i> Delete</button>
        `;
    }

    panelFooter.innerHTML = `
        <div class="od-section-title">Account Actions</div>
        <div class="up-actions-grid">
            ${actionButtonsHTML}
        </div>
    `;

    document.body.style.overflow = 'hidden';
    document.getElementById('order-details-overlay').classList.add('show');
    document.getElementById('order-details-panel').classList.add('show');
};

window.closeUserPanel = function () {
    document.getElementById('order-details-overlay').classList.remove('show');
    document.getElementById('order-details-panel').classList.remove('show');
    setTimeout(() => { document.body.style.overflow = ''; }, 300);
};


window.openRoleModal = function (email, name) {
    selectedUserEmail = email;
    document.getElementById('role-user-name').innerText = name;
    document.getElementById('role-modal').showModal();
};

window.closeRoleModal = function () {
    selectedUserEmail = null;
    document.getElementById('role-modal').close();
};

window.executeRoleChange = function () {
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === selectedUserEmail);
    if (userIndex > -1) {
        if (users[userIndex].role === 'admin') {
            // Kung admin na at dinemote pabalik sa user
            users[userIndex].role = 'user';
        } else {
            // Kung user at ginawang admin, automatic na magiging Active
            users[userIndex].role = 'admin';
            users[userIndex].status = 'Active';
        }

        localStorage.setItem('pace_users', JSON.stringify(users));
        loadUsersTable();
        closeRoleModal();
        closeUserPanel();
    }
};

window.openDeleteUserModal = function (email, name) {
    selectedUserEmail = email;
    document.getElementById('delete-user-name').innerText = name;
    document.getElementById('delete-user-modal').showModal();
};

window.closeDeleteUserModal = function () {
    selectedUserEmail = null;
    document.getElementById('delete-user-modal').close();
};

window.executeDeleteUser = function () {
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    users = users.filter(u => u.email !== selectedUserEmail);
    localStorage.setItem('pace_users', JSON.stringify(users));
    loadUsersTable();
    closeDeleteUserModal();
    closeUserPanel();
};

window.openBlockModal = function (email, name, currentStatus) {
    selectedUserEmail = email;
    document.getElementById('block-user-name').innerText = name;
    const isBlocked = currentStatus === 'Blocked';
    document.getElementById('block-title').innerText = isBlocked ? 'Unblock User?' : 'Block User?';
    document.getElementById('block-confirm-btn').innerText = isBlocked ? 'UNBLOCK' : 'BLOCK';
    document.getElementById('block-modal').showModal();
};

window.closeBlockModal = function () {
    selectedUserEmail = null;
    document.getElementById('block-modal').close();
};

window.executeBlockToggle = function () {
    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === selectedUserEmail);
    if (userIndex > -1) {
        users[userIndex].status = users[userIndex].status === 'Blocked' ? 'Active' : 'Blocked';
        localStorage.setItem('pace_users', JSON.stringify(users));
        loadUsersTable();
        closeBlockModal();
        closeUserPanel();
    }
};