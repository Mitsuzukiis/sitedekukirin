// This is the main JavaScript file that initializes the application, sets up event listeners, and manages overall application state.

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    displayProfileInfo();
    // Always show admin panel button for admin user
    showAdminPanelButton();
    // Defensive: call again after 500ms in case DOM is not ready
    setTimeout(showAdminPanelButton, 500);
});

function initializeApp() {
    setupEventListeners();
    loadProductCatalog();
}

function setupEventListeners() {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', redirectToCheckout);
    }

    const couponButton = document.getElementById('apply-coupon');
    if (couponButton) {
        couponButton.addEventListener('click', applyCoupon);
    }
}

function loadProductCatalog() {
    // Logic to fetch and display products
}

function handleLogin() {
    // Logic for user login
}

function redirectToCheckout() {
    window.location.href = 'checkout.html';
}

function applyCoupon() {
    // Logic to apply coupon code
}

function displayProfileInfo() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const profileIcon = document.getElementById('profile-icon');
    const profileInfo = document.getElementById('profile-info');
    const profileUsername = document.getElementById('profile-username');
    const profileBio = document.getElementById('profile-bio');
    if (user && profileIcon && profileUsername && profileBio) {
        profileUsername.textContent = user.username || '';
        profileBio.textContent = user.bio || '';
        if (user.profileImage) {
            profileIcon.src = user.profileImage;
        }
        // Remove profile-info popup, add pulse animation on hover (no infinite)
        let animating = false;
        profileIcon.onmouseenter = function() {
            if (!animating) {
                animating = true;
                profileIcon.classList.add('pulse');
                profileIcon.addEventListener('animationend', function handler() {
                    profileIcon.classList.remove('pulse');
                    animating = false;
                    profileIcon.removeEventListener('animationend', handler);
                });
            }
        };
        profileIcon.onmouseleave = function() {};
        profileIcon.onclick = function() {
            window.location.href = 'settings.html';
        };
        if (!document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.textContent = 'Logout';
            logoutBtn.style.position = 'fixed';
            logoutBtn.style.right = '32px';
            logoutBtn.style.bottom = '32px';
            logoutBtn.style.background = 'linear-gradient(90deg,#dc3545 0%,#ff7675 100%)';
            logoutBtn.style.color = '#fff';
            logoutBtn.style.border = 'none';
            logoutBtn.style.borderRadius = '8px';
            logoutBtn.style.padding = '14px 32px';
            logoutBtn.style.fontSize = '1.2em';
            logoutBtn.style.fontWeight = 'bold';
            logoutBtn.style.cursor = 'pointer';
            logoutBtn.style.zIndex = '999';
            logoutBtn.onclick = function() {
                localStorage.removeItem('loggedInUser');
                window.location.reload();
            };
            document.body.appendChild(logoutBtn);
        }
        // Ensure cart/profile icons are always visible
        const profileIconContainer = document.getElementById('profile-icon-container');
        if (profileIconContainer) profileIconContainer.style.display = 'flex';
        const cartIconContainer = document.getElementById('cart-icon-container');
        if (cartIconContainer) cartIconContainer.style.display = 'flex';
    } else if (profileInfo) {
        profileInfo.style.display = 'none';
        // Always show cart/profile icons for guest
        const profileIconContainer = document.getElementById('profile-icon-container');
        if (profileIconContainer) profileIconContainer.style.display = 'flex';
        const cartIconContainer = document.getElementById('cart-icon-container');
        if (cartIconContainer) cartIconContainer.style.display = 'flex';
        if (profileIcon) {
            let animating = false;
            profileIcon.onmouseenter = function() {
                if (!animating) {
                    animating = true;
                    profileIcon.classList.add('pulse');
                    profileIcon.addEventListener('animationend', function handler() {
                        profileIcon.classList.remove('pulse');
                        animating = false;
                        profileIcon.removeEventListener('animationend', handler);
                    });
                }
            };
            profileIcon.onmouseleave = function() {};
        }
    }
}

function showAdminPanelButton() {
    // Always show admin panel button for admin user in bottom left
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    // Remove any existing admin panel button to avoid duplicates
    let existingBtn = document.getElementById('admin-panel-btn');
    if (existingBtn) existingBtn.remove();
    if (user && user.email === 'pyropyro1235@gmail.com') {
        // Defensive: remove any other admin-panel-btns
        document.querySelectorAll('#admin-panel-btn').forEach(btn => btn.remove());
        const adminBtn = document.createElement('button');
        adminBtn.id = 'admin-panel-btn';
        adminBtn.textContent = 'Admin Panel';
        adminBtn.style.position = 'fixed';
        adminBtn.style.left = '32px';
        adminBtn.style.bottom = '32px';
        adminBtn.style.background = 'linear-gradient(90deg,#007bff 0%,#00c6ff 100%)';
        adminBtn.style.color = '#fff';
        adminBtn.style.border = 'none';
        adminBtn.style.borderRadius = '8px';
        adminBtn.style.padding = '14px 32px';
        adminBtn.style.fontSize = '1.2em';
        adminBtn.style.fontWeight = 'bold';
        adminBtn.style.cursor = 'pointer';
        adminBtn.style.zIndex = '9999';
        adminBtn.onclick = function() {
            const pwd = prompt('Enter admin password:');
            if (pwd === 'panel') {
                fetch('admin.html').then(r => {
                    if (r.ok) {
                        window.location.href = 'admin.html';
                    } else {
                        alert('Admin panel is not available yet.');
                    }
                }).catch(() => {
                    alert('Admin panel is not available yet.');
                });
            } else if (pwd !== null) {
                alert('Incorrect password.');
            }
        };
        document.body.appendChild(adminBtn);
    }
}

// Optionally, you can comment out or remove the showProfileModal function if not needed anymore.
function showProfileModal(user) {
    let modal = document.getElementById('profile-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'profile-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.45)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '10000';
        modal.innerHTML = `
            <div id="profile-modal-content" style="background:#fff;padding:36px 32px 28px 32px;border-radius:18px;max-width:420px;width:95vw;box-shadow:0 8px 32px rgba(31,38,135,0.18);display:flex;flex-direction:column;align-items:center;position:relative;">
                <button id="profile-modal-close" style="position:absolute;top:16px;right:16px;font-size:1.5em;background:none;border:none;cursor:pointer;">&times;</button>
                <label for="profile-modal-img-input" style="cursor:pointer;">
                    <img id="profile-modal-img" src="${user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}" alt="Profile" style="width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid #007bff;margin-bottom:12px;">
                    <input type="file" id="profile-modal-img-input" accept="image/*" style="display:none;">
                </label>
                <input id="profile-modal-username" value="${user.username || ''}" style="font-size:1.3em;font-weight:bold;text-align:center;margin-bottom:8px;border:none;border-bottom:1.5px solid #eee;width:80%;outline:none;">
                <input id="profile-modal-email" value="${user.email || ''}" style="font-size:1em;text-align:center;margin-bottom:8px;border:none;border-bottom:1.5px solid #eee;width:80%;outline:none;">
                <textarea id="profile-modal-bio" rows="2" style="width:80%;margin-bottom:8px;border-radius:8px;border:1px solid #eee;padding:8px;">${user.bio || ''}</textarea>
                <input id="profile-modal-password" type="password" placeholder="New Password" style="width:80%;margin-bottom:8px;border-radius:8px;border:1px solid #eee;padding:8px;">
                <button id="profile-modal-save" class="btn" style="width:80%;margin-bottom:12px;">Save Changes</button>
                <div style="width:100%;margin-top:10px;">
                    <h3 style="font-size:1.1em;text-align:left;margin-bottom:6px;">Recent Purchases</h3>
                    <ul id="profile-modal-purchases" style="max-height:120px;overflow-y:auto;padding-left:18px;text-align:left;"></ul>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const purchasesUl = modal.querySelector('#profile-modal-purchases');
    purchasesUl.innerHTML = '';
    let purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases = purchases.filter(p => p.email === user.email);
    if (purchases.length === 0) {
        purchasesUl.innerHTML = '<li style="color:#888;">No purchases yet.</li>';
    } else {
        purchases.slice(-5).reverse().forEach(p => {
            purchasesUl.innerHTML += `<li>${p.itemName} <span style="color:#888;">($${p.amount})</span></li>`;
        });
    }
    const imgInput = modal.querySelector('#profile-modal-img-input');
    const img = modal.querySelector('#profile-modal-img');
    imgInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = evt => {
                img.src = evt.target.result;
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
    };
    modal.querySelector('#profile-modal-save').onclick = function() {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let idx = users.findIndex(u => u.email === user.email);
        if (idx !== -1) {
            // Allow username change
            users[idx].username = modal.querySelector('#profile-modal-username').value;
            users[idx].email = modal.querySelector('#profile-modal-email').value;
            let newPass = modal.querySelector('#profile-modal-password').value;
            if (newPass) users[idx].password = newPass;
            users[idx].bio = modal.querySelector('#profile-modal-bio').value;
            users[idx].profileImage = modal.querySelector('#profile-modal-img').src;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(users[idx]));
            alert('Profile updated!');
            modal.remove();
            window.location.reload();
        }
    };
    modal.querySelector('#profile-modal-close').onclick = function() {
        modal.remove();
    };
    modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
    };
    modal.style.display = 'flex';
}