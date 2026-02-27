/* CHAT-SUPPORT PAGE FUNCTION START */

function renderPageChat() {
    const transcriptBox = document.getElementById('page-transcript-box');
    if (!transcriptBox) return; 
    
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser || !currentUser.chatHistory) return;

    let html = '';
    currentUser.chatHistory.forEach(msg => {
        const align = msg.sender === 'user' ? 'flex-end' : 'flex-start';
        const bg = msg.sender === 'user' ? 'var(--brand-color)' : '#eaeaea';
        const color = msg.sender === 'user' ? '#fff' : 'var(--darkgray-text)';
        const name = msg.sender === 'user' ? 'You' : 'PACE Support';

        html += `
            <div class="page-msg-wrapper" style="display:flex; flex-direction:column; align-items: ${align};">
                <span class="page-msg-meta" style="font-size:11px; color:#aaa; margin-bottom:4px;">${name} • ${msg.time}</span>
                <div class="page-msg-bubble" style="background-color: ${bg}; color: ${color}; padding:10px 15px; border-radius:12px; max-width:75%; font-size:14px; line-height:1.4;">
                    ${msg.text}
                </div>
            </div>
        `;
    });
    
    transcriptBox.innerHTML = html;
    transcriptBox.scrollTop = transcriptBox.scrollHeight; 
}

function sendPageMessage() {
    const input = document.getElementById('page-chat-input');
    const text = input.value.trim();
    if (text === '') return;

    if (typeof saveChatToDatabase === 'function') saveChatToDatabase('user', text);
    
    input.value = '';
    renderPageChat();
    if (typeof loadChatHistory === 'function') loadChatHistory(); // Sync floating widget

    setTimeout(() => {
        if (typeof saveChatToDatabase === 'function') {
            saveChatToDatabase('bot', "Thanks for reaching out! A PACE representative will be with you shortly.");
            renderPageChat();
            if (typeof loadChatHistory === 'function') loadChatHistory(); // Sync floating widget
        }
    }, 1000);
}

function handlePageChatEnter(event) {
    if (event.key === 'Enter') sendPageMessage();
}

window.addEventListener('DOMContentLoaded', () => {
    renderPageChat();
});

function openDeleteChatModal() {
    const modal = document.getElementById('delete-chat-modal');
    const nav = document.querySelector('.navbar-section');
    if (modal) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.right = `${scrollbarWidth}px`;
        modal.showModal();
    }
}

function closeDeleteChatModal() {
    const modal = document.getElementById('delete-chat-modal');
    const nav = document.querySelector('.navbar-section');
    if (modal) {
        modal.close();
        document.body.style.overflow = '';
        document.body.style.paddingRight = '0px';
        if (nav) nav.style.right = '0px';
    }
}

function executeClearChat() {
    let currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser) return;

    currentUser.chatHistory = [];
    localStorage.setItem('pace_current_user', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('pace_users')) || [];
    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex > -1) {
        users[userIndex].chatHistory = [];
        localStorage.setItem('pace_users', JSON.stringify(users));
    }

    if (typeof saveChatToDatabase === 'function') {
        saveChatToDatabase('bot', 'Hi there! Need help finding your perfect pair of shoes? 👟');
    }

    renderPageChat();

    try {
        if (typeof loadChatHistory === 'function') loadChatHistory();
    } catch (error) {
        console.log("Floating widget is hidden on this page, skipping widget sync.");
    }

    closeDeleteChatModal();
}
/* CHAT-SUPPORT PAGE FUNCTION END */