// CAPTCHA GENERATION AND VALIDATION
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
        ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`;
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }
    currentCaptcha = captchaText;
}

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
    const helpers = form.querySelectorAll('.helper-text');

    inputs.forEach(input => input.classList.remove('input-error'));
    errors.forEach(error => error.classList.remove('show-error'));
    helpers.forEach(helper => helper.classList.remove('text-error'));
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

    // SIGNUP FUNCTION
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

            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passRegex.test(password)) {
                document.getElementById('signup-password').classList.add('input-error');
                document.getElementById('signup-password-helper').classList.add('text-error');
                isValid = false;
            }

            if (password !== confirm) {
                showError('signup-confirm', 'Passwords do not match.');
                isValid = false;
            }

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

            const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            const todayDate = new Date().toLocaleDateString('en-US', dateOptions);

            const newUser = {
                id: 'USER-' + Date.now(),
                firstName: fname,
                lastName: lname,
                email: email,
                username: username,
                password: password,
                role: 'user',
                status: 'Active',
                registeredDate: todayDate,
                cart: [],
                wishlist: [],
                chatHistory: []
            };
            users.push(newUser);
            localStorage.setItem('pace_users', JSON.stringify(users));

            const successModal = document.getElementById('signup-success-modal');
            if (successModal) successModal.showModal();
            else window.location.href = "login.html";
        });
    }

    // LOGIN FUNCTION
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
            } 
            else if (validUser.password !== passwordInput) {
                showError('login-password', 'Incorrect password.');
            } 
            else if (validUser.status === 'Blocked' && validUser.role === 'user') {
                showError('login-username', 'Account Blocked. Please contact support for assistance.');
            } 
            else if (validUser.status === 'Blocked' && validUser.role === 'admin') {
                showError('login-username', 'Admin Blocked. Please contact support for assistance.');
            } 
            else {
                localStorage.setItem('pace_current_user', JSON.stringify(validUser));

                if (validUser.role === 'admin') {
                    window.location.href = "admin-dashboard.html";
                } else {
                    window.location.href = "homepage.html";
                }
            }
        });
    }

    // PASSWORD SEE AND UNSEE TOGGLE
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const inputField = document.getElementById(this.getAttribute('data-target'));
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

// TERMS AND CONDITIONS MODAL FUNCTIONS
window.openTermsModal = function () {
    const modal = document.getElementById('terms-modal');
    const nav = document.querySelector('.navbar-section');
    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.right = `${scrollbarWidth}px`;
        modal.showModal();
    }
};

window.closeTermsModal = function () {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.close();
};

window.acceptTerms = function () {
    const checkbox = document.getElementById('terms-checkbox');
    if (checkbox) checkbox.checked = true;
    closeTermsModal();
};

document.getElementById('terms-modal')?.addEventListener('close', () => {
    const nav = document.querySelector('.navbar-section');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '0px';
    if (nav) nav.style.right = '0px';
});