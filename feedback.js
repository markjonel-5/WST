let currentRating = 0;

// FEEDBACK PAGE INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser) return;

    setupStarRating();
    renderPastFeedbacks();

    const textInput = document.getElementById('feedback-text');
    if (textInput) {
        textInput.addEventListener('input', function() {
            this.classList.remove('input-error');
            document.getElementById('feedback-text-error').classList.add('error-hidden');
        });
    }
});

// STAR RATING FUNCTION
function setupStarRating() {
    const stars = document.querySelectorAll('#star-rating-container i');
    const ratingText = document.getElementById('rating-text');
    const starContainer = document.getElementById('star-rating-container');
    const texts = ["Select a rating", "Poor", "Fair", "Good", "Very Good", "Excellent!"];

    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-value'));
            
            starContainer.classList.remove('star-error');
            ratingText.classList.remove('text-error');

            ratingText.innerText = texts[currentRating];
            ratingText.classList.add('rating-text-active');

            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                    s.classList.remove('fi-rr-star'); 
                    s.classList.add('fi-sr-star', 'active'); 
                } else {
                    s.classList.remove('fi-sr-star', 'active');
                    s.classList.add('fi-rr-star');
                }
            });
        });
    });
}

// SUBMIT FEEDBACK FUNCTION
function submitFeedback() {
    const textInput = document.getElementById('feedback-text');
    const text = textInput.value.trim();
    const starContainer = document.getElementById('star-rating-container');
    const ratingText = document.getElementById('rating-text');
    const textErrorMsg = document.getElementById('feedback-text-error');

    let hasError = false;

    if (currentRating === 0) {
        starContainer.classList.add('star-error');
        ratingText.classList.add('text-error');
        hasError = true;
    }

    if (text === '') {
        textInput.classList.add('input-error');
        textErrorMsg.classList.remove('error-hidden');
        hasError = true;
    }

    if (hasError) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    
    const newFeedback = {
        id: "FB-" + Date.now(),
        userEmail: currentUser.email,
        userName: `${currentUser.firstName} ${currentUser.lastName || ''}`.trim(),
        rating: currentRating,
        comment: text,
        date: new Date().toLocaleDateString()
    };

    if (!currentUser.feedbacks) currentUser.feedbacks = [];
    currentUser.feedbacks.unshift(newFeedback); 
    localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
        users[userIndex].feedbacks = currentUser.feedbacks;
        localStorage.setItem('pace_users', JSON.stringify(users));
    }

    let globalFeedbacks = JSON.parse(localStorage.getItem('pace_global_feedbacks')) || [];
    globalFeedbacks.unshift(newFeedback);
    localStorage.setItem('pace_global_feedbacks', JSON.stringify(globalFeedbacks));

    textInput.value = '';
    currentRating = 0;
    
    ratingText.innerText = "Select a rating";
    ratingText.classList.remove('rating-text-active');
    
    document.querySelectorAll('#star-rating-container i').forEach(s => {
        s.classList.remove('fi-sr-star', 'active');
        s.classList.add('fi-rr-star');
    });

    renderPastFeedbacks();
}

// SHOW FEEDBACK HISTORY FUNCTION
function renderPastFeedbacks() {
    const listContainer = document.getElementById('my-feedbacks-list');
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));

    if (!currentUser.feedbacks || currentUser.feedbacks.length === 0) {
        listContainer.innerHTML = `<p class="empty-feedback">You haven't submitted any feedback yet.</p>`;
        return;
    }

    listContainer.innerHTML = currentUser.feedbacks.map(fb => {
        let starsHTML = '';
        for(let i = 1; i <= 5; i++) {
            if (i <= fb.rating) {
                starsHTML += `<i class="fi fi-sr-star"></i>`; 
            } else {
                starsHTML += `<i class="fi fi-rr-star"></i>`; 
            }
        }

        return `
            <div class="past-feedback-card">
                <div class="past-feedback-meta">
                    <span class="past-feedback-stars">${starsHTML}</span>
                    <div class="past-feedback-meta-right">
                        <span>${fb.date}</span>
                        <button class="feedback-delete-btn" onclick="openDeleteFeedbackModal('${fb.id}')" title="Delete Review">
                            <i class="fi fi-rs-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="past-feedback-text">"${fb.comment}"</div>
            </div>
        `;
    }).join('');
}

// DELETE FEEDBACK FUNCTIONS
let feedbackToDelete = null;

window.openDeleteFeedbackModal = function(id) {
    feedbackToDelete = id; 
    const modal = document.getElementById('delete-feedback-modal');
    const nav = document.querySelector('.navbar-section');

    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.right = `${scrollbarWidth}px`;
        modal.showModal();
    }
};

window.closeDeleteFeedbackModal = function() {
    feedbackToDelete = null;
    const modal = document.getElementById('delete-feedback-modal');
    const nav = document.querySelector('.navbar-section');
    
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
        if (nav) nav.style.right = '0px';
    }
};

window.executeDeleteFeedback = function() {
    if (!feedbackToDelete) return;

    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser || !currentUser.feedbacks) return;

    currentUser.feedbacks = currentUser.feedbacks.filter(fb => fb.id !== feedbackToDelete);
    localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
        users[userIndex].feedbacks = currentUser.feedbacks;
        localStorage.setItem('pace_users', JSON.stringify(users));
    }

    let globalFeedbacks = JSON.parse(localStorage.getItem('pace_global_feedbacks')) || [];
    globalFeedbacks = globalFeedbacks.filter(fb => fb.id !== feedbackToDelete);
    localStorage.setItem('pace_global_feedbacks', JSON.stringify(globalFeedbacks));

    renderPastFeedbacks();
    closeDeleteFeedbackModal();
};