document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;

        if (!username || !email || !password) {
            registerMessage.textContent = 'Please fill in all fields.';
            registerMessage.style.color = 'red';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            registerMessage.textContent = 'Email already registered.';
            registerMessage.style.color = 'red';
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        registerMessage.textContent = 'Registration successful! Redirecting to login...';
        registerMessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    });
});
