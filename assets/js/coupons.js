// Coupon code functionality for checkout page.

document.addEventListener('DOMContentLoaded', function() {
    const couponInput = document.getElementById('coupon-code');
    const applyButton = document.getElementById('apply-coupon');
    const totalAmountDisplay = document.getElementById('total-amount');
    const couponMessage = document.getElementById('coupon-message');
    let appliedDiscount = 0;
    let appliedCode = localStorage.getItem('appliedCouponCode') || null;

    function getCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function updateTotalDisplay(newTotal) {
        totalAmountDisplay.textContent = `$${newTotal.toFixed(2)}`;
    }

    function showUsedCode(code) {
        couponInput.style.display = 'none';
        applyButton.style.display = 'none';
        couponMessage.innerHTML = `You have used the code: <code>${code}</code> <button id="remove-coupon-btn" style="margin-left:10px;padding:2px 10px;border-radius:6px;background:#dc3545;color:#fff;border:none;cursor:pointer;">Remove</button>`;
        document.getElementById('remove-coupon-btn').onclick = function() {
            localStorage.removeItem('appliedCouponCode');
            appliedCode = null;
            couponInput.value = '';
            couponInput.style.display = '';
            applyButton.style.display = '';
            couponMessage.textContent = '';
            updateTotalDisplay(getCartTotal());
        };
    }

    function applyCouponCode(code, discount) {
        appliedCode = code;
        localStorage.setItem('appliedCouponCode', code);
        let total = getCartTotal();
        if (discount > 0) {
            appliedDiscount = (total * discount) / 100;
            const newTotal = total - appliedDiscount;
            updateTotalDisplay(newTotal);
        }
        showUsedCode(code);
    }

    // On load, check if a coupon is already applied
    if (appliedCode) {
        const discount = validateCoupon(appliedCode);
        if (discount !== null) {
            applyCouponCode(appliedCode, discount);
        }
    }

    applyButton.addEventListener('click', function() {
        if (appliedCode) return;
        const couponCode = couponInput.value.trim().toUpperCase();
        const discount = validateCoupon(couponCode);
        let total = getCartTotal();

        if (discount !== null) {
            applyCouponCode(couponCode, discount);
        } else {
            couponMessage.textContent = 'Invalid coupon code. Please try again.';
            couponMessage.style.color = 'red';
            updateTotalDisplay(total);
        }
    });

    function validateCoupon(code) {
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
        return validCoupons[code] !== undefined ? validCoupons[code] : null;
    }
});