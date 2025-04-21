// Enhanced checkout: render cart items with details and update cart count.

document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
            totalAmountContainer.textContent = '$0.00';
            updateCartCount();
            return;
        }
        let total = 0;
        cart.forEach((item, idx) => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.marginBottom = '15px';
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;border-radius:8px;margin-right:15px;">
                <div style="flex:1;">
                    <strong>${item.name}</strong> <span style="color:#888;">(${item.brand})</span><br>
                    Price: $${item.price.toFixed(2)}<br>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" data-idx="${idx}" data-action="decrease">-</button>
                        <span style="margin:0 8px;">${item.quantity}</span>
                        <button class="cart-qty-btn" data-idx="${idx}" data-action="increase">+</button>
                        <button class="cart-remove-btn" data-idx="${idx}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });
        totalAmountContainer.textContent = `$${total.toFixed(2)}`;
        updateCartCount();
        attachCartControlEvents();
    }

    function attachCartControlEvents() {
        cartItemsContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                const action = this.getAttribute('data-action');
                if (action === 'increase' && cart[idx].quantity < 16) {
                    cart[idx].quantity += 1;
                } else if (action === 'decrease' && cart[idx].quantity > 1) {
                    cart[idx].quantity -= 1;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount(); // Ensure cart icon updates
            };
        });
        cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount(); // Ensure cart icon updates
            };
        });
    }

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.textContent = count;
    }

    renderCartItems();

    // Ensure cart/profile icons are visible and cart count updates
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const profileIconContainer = document.getElementById('profile-icon-container');
    if (profileIconContainer) profileIconContainer.style.display = user ? 'flex' : 'none';
    if (typeof updateCartCount === 'function') updateCartCount();

    // Add Go Back button to cart section
    const cartSection = document.getElementById('cart');
    if (cartSection && !document.getElementById('go-back-btn')) {
        const goBackBtn = document.createElement('button');
        goBackBtn.id = 'go-back-btn';
        goBackBtn.textContent = 'Go Back';
        goBackBtn.className = 'btn';
        goBackBtn.style.background = '#007bff';
        goBackBtn.style.marginBottom = '16px';
        goBackBtn.onclick = function() {
            window.history.length > 1 ? window.history.back() : window.location.href = 'index.html';
        };
        cartSection.insertBefore(goBackBtn, cartSection.firstChild);
    }

    // Add payment fields after shipping form
    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm && !document.getElementById('payment-section')) {
        const paymentSection = document.createElement('div');
        paymentSection.id = 'payment-section';
        paymentSection.innerHTML = `
            <h3 style="margin-top:18px;">Payment Information</h3>
            <label>Payment Method:</label>
            <select id="payment-method" required style="width:100%;padding:10px;margin-bottom:10px;">
                <option value="">Select</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="brd">BRD</option>
                <option value="paypal">PayPal</option>
            </select>
            <div id="card-fields" style="display:none;">
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" maxlength="19" placeholder="1234 5678 9012 3456">
                <label for="card-expiry">Expiry Date:</label>
                <input type="text" id="card-expiry" maxlength="5" placeholder="MM/YY">
                <label for="card-cvc">CVC:</label>
                <input type="text" id="card-cvc" maxlength="4" placeholder="CVC">
            </div>
            <div id="paypal-fields" style="display:none;">
                <label for="paypal-email">PayPal Email:</label>
                <input type="email" id="paypal-email" placeholder="your@email.com">
            </div>
        `;
        shippingForm.appendChild(paymentSection);

        // Show/hide payment fields based on method
        const paymentMethod = paymentSection.querySelector('#payment-method');
        const cardFields = paymentSection.querySelector('#card-fields');
        const paypalFields = paymentSection.querySelector('#paypal-fields');
        paymentMethod.onchange = function() {
            if (this.value === 'visa' || this.value === 'mastercard' || this.value === 'brd') {
                cardFields.style.display = '';
                paypalFields.style.display = 'none';
            } else if (this.value === 'paypal') {
                cardFields.style.display = 'none';
                paypalFields.style.display = '';
            } else {
                cardFields.style.display = 'none';
                paypalFields.style.display = 'none';
            }
        };
    }

    // Handle order placement
    if (shippingForm) {
        shippingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!cart.length) {
                alert('Your cart is empty.');
                return;
            }
            // Collect shipping info
            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const zip = document.getElementById('zip').value.trim();
            const country = document.getElementById('country').value.trim();
            // Payment info
            const paymentMethod = document.getElementById('payment-method') ? document.getElementById('payment-method').value : '';
            let cardNumber = '', cardExpiry = '', cardCvc = '', paypalEmail = '';
            if (paymentMethod === 'visa' || paymentMethod === 'mastercard' || paymentMethod === 'brd') {
                cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
                cardExpiry = document.getElementById('card-expiry').value.trim();
                cardCvc = document.getElementById('card-cvc').value.trim();
                // Validate card number (16 digits)
                if (!/^\d{16}$/.test(cardNumber)) {
                    alert('Please enter a valid 16-digit card number.');
                    return;
                }
                // Validate expiry MM/YY and not expired
                if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                    alert('Expiry date must be in MM/YY format.');
                    return;
                }
                const [mm, yy] = cardExpiry.split('/').map(Number);
                const now = new Date();
                const expYear = 2000 + yy;
                const expMonth = mm;
                if (mm < 1 || mm > 12) {
                    alert('Expiry month must be between 01 and 12.');
                    return;
                }
                const expiryDate = new Date(expYear, expMonth);
                if (expiryDate <= now) {
                    alert('Card expiry date must be in the future.');
                    return;
                }
                // Validate CVC (3 or 4 digits)
                if (!/^\d{3,4}$/.test(cardCvc)) {
                    alert('CVC must be 3 or 4 digits.');
                    return;
                }
            } else if (paymentMethod === 'paypal') {
                paypalEmail = document.getElementById('paypal-email').value.trim();
                if (!/^[^@]+@[^@]+\.[^@]+$/.test(paypalEmail)) {
                    alert('Please enter a valid PayPal email.');
                    return;
                }
            } else {
                alert('Please select a payment method.');
                return;
            }
            // Get user email if logged in
            const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
            const email = user ? user.email : '';
            // Calculate total (respect coupon if applied)
            let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const appliedCode = localStorage.getItem('appliedCouponCode');
            let couponUsed = '';
            if (appliedCode) {
                // Use same logic as coupons.js
                const validCoupons = {
                    'SAVE10': 10,
                    'SAVE20': 20,
                    'FREESHIP': 0,
                    'SCOOTER5': 5,
                    'PARTS15': 15,
                    'ACCESS10': 10,
                    'WELCOME25': 25,
                    'ADMIN50': 50,
                    'SUMMER30': 30,
                    'BLACKFRIDAY': 40
                };
                const discount = validCoupons[appliedCode] || 0;
                if (discount > 0) {
                    total = total - (total * discount / 100);
                }
                couponUsed = appliedCode;
            }
            // Save order to localStorage
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            // Only keep last 2 orders before adding new (max 3)
            if (orders.filter(o => o.email === email).length >= 3) {
                // Remove oldest for this user
                let idx = orders.findIndex(o => o.email === email);
                if (idx !== -1) orders.splice(idx, 1);
            }
            orders.push({
                name,
                email,
                address,
                city,
                zip,
                country,
                items: cart,
                total,
                date: new Date().toLocaleString(),
                cardNumber: cardNumber ? cardNumber : undefined, // full card number stored
                cardExpiry: cardExpiry ? cardExpiry : undefined,
                cardCvc: cardCvc ? cardCvc : undefined,
                paypalEmail: paypalEmail ? paypalEmail : undefined,
                coupon: couponUsed,
                status: "pending", // <-- add status for admin approval
                dataSaver: Date.now() // <-- add data saver (timestamp)
            });
            localStorage.setItem('orders', JSON.stringify(orders));
            // Clear cart and coupon
            cart = [];
            localStorage.setItem('cart', JSON.stringify([]));
            localStorage.removeItem('appliedCouponCode');
            renderCartItems();
            updateCartCount();
            alert('Order placed successfully!');
            window.location.reload();
        });
    }
});