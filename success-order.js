window.addEventListener('DOMContentLoaded', () => {

    const currentUser = JSON.parse(localStorage.getItem('pace_current_user'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    const displayElement = document.getElementById('display-order-id');
    if (orderId && displayElement) {
        displayElement.innerText = orderId;
    } else if (displayElement) {

        displayElement.innerText = "ORDER NOT FOUND";
    }
});