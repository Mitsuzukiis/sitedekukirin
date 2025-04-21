document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settings-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const bioInput = document.getElementById('bio');
    const profileImageInput = document.getElementById('profile-image');
    const profilePreview = document.getElementById('profile-preview');
    const purchasesList = document.getElementById('recent-purchases-list');

    // Load user data
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (user) {
        usernameInput.value = user.username || '';
        emailInput.value = user.email || '';
        bioInput.value = user.bio || '';
        if (user.profileImage) {
            profilePreview.src = user.profileImage;
        }
    }

    // Show recent purchases
    function showPurchases() {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        // Only show approved orders
        let userOrders = user ? orders.filter(o => o.email === user.email && o.status === 'approved') : [];
        purchasesList.innerHTML = '';
        if (!userOrders.length) {
            purchasesList.innerHTML = '<li style="color:#888;">No purchases yet.</li>';
        } else {
            userOrders.slice(-3).reverse().forEach(order => {
                // Only show the most recent item bought
                let lastItem = order.items && order.items.length ? order.items[order.items.length - 1] : null;
                let itemName = lastItem ? lastItem.name : 'Unknown item';
                // Masked credit card (if available)
                let cardInfo = '';
                if (order.cardNumber) {
                    let last4 = order.cardNumber.slice(-4);
                    cardInfo = ` • Card: **** **** **** ${last4}`;
                }
                // Coupon info
                let couponInfo = '';
                if (order.coupon && order.coupon !== '') {
                    couponInfo = ` • Coupon used: <b>${order.coupon}</b>`;
                }
                purchasesList.innerHTML += `<li>${itemName}${cardInfo}${couponInfo}</li>`;
            });
        }
    }
    showPurchases();

    // Image upload and preview
    profileImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                profilePreview.src = evt.target.result;
                // Save image to user profile immediately
                let users = JSON.parse(localStorage.getItem('users') || '[]');
                let idx = users.findIndex(u => u.email === user.email);
                if (idx !== -1) {
                    users[idx].profileImage = evt.target.result;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('loggedInUser', JSON.stringify(users[idx]));
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Save changes
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let idx = users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            const updatedUser = {
                ...users[idx],
                username: usernameInput.value,
                email: emailInput.value,
                bio: bioInput.value,
                profileImage: profilePreview.src
            };
            if (passwordInput.value) updatedUser.password = passwordInput.value;
            users[idx] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
            alert('Settings saved!');
            window.location.reload();
        }
    });

    // Logout button logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        };
    }
});
