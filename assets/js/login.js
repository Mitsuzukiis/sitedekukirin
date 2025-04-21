// Improved login logic using localStorage for user data.

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    // Add a message container if not present
    let loginMessage = document.getElementById('loginMessage');
    if (!loginMessage) {
        loginMessage = document.createElement('div');
        loginMessage.id = 'loginMessage';
        loginForm.appendChild(loginMessage);
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            loginMessage.textContent = 'Login successful!';
            loginMessage.style.color = 'green';
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            loginMessage.textContent = 'Invalid email or password.';
            loginMessage.style.color = 'red';
        }
    });
});