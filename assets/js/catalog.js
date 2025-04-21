// Enhanced product catalog with category filtering, KuKirin models, parts, accessories, and item detail redirect.

const products = [
    // Scooters (KuKirin models)
    {
        id: 1,
        category: "scooters",
        name: "KuKirin G2 Max",
        brand: "KuKirin",
        price: 799.99,
        inStock: true,
        speed: "55 km/h",
        mileage: "80 km",
        battery: "48V 20Ah",
        weight: "31 kg",
        image: "https://s13emagst.akamaized.net/products/58068/58067811/images/res_bd4aa8310618a9add6ec021a3a64d67a.jpg", // updated
        description: "The KuKirin G2 Max is a powerful electric scooter with a 1000W motor, 80km range, and robust build for city and off-road adventures."
    },
    {
        id: 2,
        category: "scooters",
        name: "KuKirin G3 Pro",
        brand: "KuKirin",
        price: 1099.99,
        inStock: true,
        speed: "65 km/h",
        mileage: "80 km",
        battery: "52V 23Ah",
        weight: "37 kg",
        image: "https://kukirin-escooter.com/cdn/shop/files/2_32de5de7-1df6-4d7e-bf4d-c2b908f0fc69.png?v=1740036181", // updated
        description: "The KuKirin G3 Pro features dual motors, hydraulic brakes, and a long-lasting battery for high-speed, long-distance rides."
    },
    {
        id: 3,
        category: "scooters",
        name: "KuKirin M5 Pro",
        brand: "KuKirin",
        price: 999.99,
        inStock: true,
        speed: "52 km/h",
        mileage: "70 km",
        battery: "48V 20Ah",
        weight: "36 kg",
        image: "https://s13emagst.akamaized.net/products/56646/56645477/images/res_ed7cde5bda4dd72f2d2093198843d81e.jpg", // updated
        description: "The KuKirin M5 Pro is designed for comfort and power, with a wide deck, strong suspension, and a high-capacity battery."
    },
    {
        id: 4,
        category: "scooters",
        name: "KuKirin G2 Pro",
        brand: "KuKirin",
        price: 649.99,
        inStock: true,
        speed: "45 km/h",
        mileage: "55 km",
        battery: "48V 15Ah",
        weight: "26 kg",
        image: "https://s13emagst.akamaized.net/products/51929/51928900/images/res_f46b0b2b8f21edc0246b0600713fcdc6.jpg", // updated
        description: "The KuKirin G2 Pro is a versatile scooter with a strong frame, reliable brakes, and a comfortable ride for daily commuting."
    },
    // Parts
    {
        id: 101,
        category: "parts",
        name: "KuKirin G2 Pro Brake Disc",
        brand: "KuKirin",
        price: 29.99,
        inStock: true,
        image: "https://s13emagst.akamaized.net/products/70231/70230735/images/res_ad9ea55d3e45b8c8f6d409b9c5c5297e.jpg", // updated image
        description: "Original 120mm brake disc for KuKirin G2 Pro. Ensures optimal braking performance and safety for your scooter."
    },
    {
        id: 102,
        category: "parts",
        name: "KuKirin G2 Pro Motor",
        brand: "KuKirin",
        price: 159.99,
        inStock: true,
        image: "https://kukirin-escooter.com/cdn/shop/files/4373428.webp?v=1717403632", // updated image
        description: "Replacement 600W motor for KuKirin G2 Pro. Restore your scooter's power and efficiency with this genuine part."
    },
    {
        id: 103,
        category: "parts",
        name: "KuKirin G3 Pro Battery",
        brand: "KuKirin",
        price: 399.99,
        inStock: false,
        image: "https://ae01.alicdn.com/kf/Se613e936457d4656add94de1d57ac928O.jpg", // updated image
        description: "Original 52V 23Ah battery for KuKirin G3 Pro. High-capacity and long-lasting, perfect for extended rides."
    },
    // Accessories
    {
        id: 201,
        category: "accessories",
        name: "LED Headlight for KuKirin G2 Pro",
        brand: "KuKirin",
        price: 19.99,
        inStock: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4xwEKTqFDo6xQxNFbQ1N_jjU4jX2xCENfVw&s",
        description: "Bright LED headlight for KuKirin G2 Pro. Improve your night visibility and safety with this easy-to-install accessory."
    },
    {
        id: 202,
        category: "accessories",
        name: "Phone Holder for KuKirin Scooters",
        brand: "KuKirin",
        price: 14.99,
        inStock: true,
        image: "https://doctorscooter.co.uk/wp-content/uploads/2022/03/104.jpg",
        description: "Universal phone holder for KuKirin scooters. Securely mount your phone for navigation and music on the go."
    },
    {
        id: 203,
        category: "accessories",
        name: "Extended Rear Fender for KuKirin G3 Pro",
        brand: "KuKirin",
        price: 24.99,
        inStock: true,
        image: "https://m.media-amazon.com/images/I/41BKF8siUcL._AC_SL1072_.jpg",
        description: "Extended rear fender for KuKirin G3 Pro. Protects against splashes and debris for a cleaner ride."
    }
];

function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    // Prevent showing products for "home" or "category"
    if (cat === "home" || cat === "category") return null;
    return cat;
}

function displayProducts() {
    const catalogContainer = document.getElementById('product-catalog');
    catalogContainer.innerHTML = '';

    const category = getCategoryFromUrl();
    // Always show categories section, do not hide it
    // Only filter products if a category is selected
    if (!category) {
        // No category selected, show nothing (About Us and categories are handled in HTML)
        return;
    }

    // --- Admin category special handling ---
    if (category === 'admin') {
        // Only allow if logged in as admin
        const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        if (!user || user.email !== 'pyropyro1235@gmail.com') {
            catalogContainer.innerHTML = '<p style="color:#dc3545;font-weight:bold;">Access denied. Admins only.</p>';
            return;
        }
        catalogContainer.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>Admin Category</h2>
                <p>Welcome, admin! This is a special admin-only category.</p>
                <button class="btn" onclick="window.location.href='admin.html'">Go to Admin Panel</button>
            </div>
        `;
        return;
    }

    let filteredProducts = products.filter(p => p.category === category);

    if (filteredProducts.length === 0) {
        catalogContainer.innerHTML += '<p>No products found in this category.</p>';
        return;
    }

    // Product grid container
    const productList = document.createElement('div');
    productList.id = 'product-catalog-grid';
    productList.style.display = 'contents';

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.style.cursor = 'pointer';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%;max-width:250px;border-radius:8px;margin-bottom:10px;">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            ${product.speed ? `<p><strong>Speed:</strong> ${product.speed}</p>` : ''}
            ${product.mileage ? `<p><strong>Mileage:</strong> ${product.mileage}</p>` : ''}
            ${product.battery ? `<p><strong>Battery:</strong> ${product.battery}</p>` : ''}
            ${product.weight ? `<p><strong>Weight:</strong> ${product.weight}</p>` : ''}
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <span class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            <button class="btn add-to-cart-btn" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>Add to Cart</button>
        `;
        // Click to show detail view
        productElement.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart-btn')) return;
            showProductDetail(product, category);
        });
        productList.appendChild(productElement);
    });

    catalogContainer.appendChild(productList);

    // Add event listeners for add-to-cart buttons
    catalogContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function showProductDetail(product, category) {
    // Remove any existing detail overlay
    let detailOverlay = document.getElementById('product-detail-overlay');
    if (detailOverlay) detailOverlay.remove();

    detailOverlay = document.createElement('div');
    detailOverlay.id = 'product-detail-overlay';
    detailOverlay.style.position = 'fixed';
    detailOverlay.style.top = '0';
    detailOverlay.style.left = '0';
    detailOverlay.style.width = '100vw';
    detailOverlay.style.height = '100vh';
    detailOverlay.style.background = 'rgba(0,0,0,0.45)';
    detailOverlay.style.display = 'flex';
    detailOverlay.style.alignItems = 'center';
    detailOverlay.style.justifyContent = 'center';
    detailOverlay.style.zIndex = '10001';

    detailOverlay.innerHTML = `
        <div style="background:#fff;padding:36px 32px 28px 32px;border-radius:18px;max-width:520px;width:95vw;box-shadow:0 8px 32px rgba(31,38,135,0.18);display:flex;flex-direction:column;align-items:center;position:relative;">
            <button id="detail-go-back" class="btn" style="position:absolute;top:16px;left:16px;width:auto;padding:8px 18px;background:#007bff;">Go Back</button>
            <img src="${product.image}" alt="${product.name}" style="width:220px;height:180px;object-fit:cover;border-radius:12px;margin-bottom:18px;">
            <h2 style="margin-bottom:8px;">${product.name}</h2>
            <p><strong>Brand:</strong> ${product.brand}</p>
            ${product.speed ? `<p><strong>Speed:</strong> ${product.speed}</p>` : ''}
            ${product.mileage ? `<p><strong>Mileage:</strong> ${product.mileage}</p>` : ''}
            ${product.battery ? `<p><strong>Battery:</strong> ${product.battery}</p>` : ''}
            ${product.weight ? `<p><strong>Weight:</strong> ${product.weight}</p>` : ''}
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <span class="stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}" style="margin-bottom:10px;">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            <p style="margin:12px 0 18px 0;">${product.description || ''}</p>
            <button class="btn add-to-cart-btn" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>Add to Cart</button>
        </div>
    `;
    document.body.appendChild(detailOverlay);

    // Go Back button
    detailOverlay.querySelector('#detail-go-back').onclick = function() {
        detailOverlay.remove();
    };
    // Add to cart in detail view
    detailOverlay.querySelector('.add-to-cart-btn').onclick = function(e) {
        e.stopPropagation();
        addToCart(product.id);
    };
    // Close on background click
    detailOverlay.onclick = function(e) {
        if (e.target === detailOverlay) detailOverlay.remove();
    };
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure product-catalog container exists
    let catalogContainer = document.getElementById('product-catalog');
    if (!catalogContainer) {
        catalogContainer = document.createElement('div');
        catalogContainer.id = 'product-catalog';
        // Insert into main if possible
        const main = document.querySelector('main');
        if (main) {
            main.appendChild(catalogContainer);
        } else {
            document.body.appendChild(catalogContainer);
        }
    }
    displayProducts();
    updateCartCount();
    // Always show cart/profile icons if logged in
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const profileIconContainer = document.getElementById('profile-icon-container');
    if (profileIconContainer) {
        profileIconContainer.style.display = user ? 'flex' : 'none';
    }
    const cartIconContainer = document.getElementById('cart-icon-container');
    if (cartIconContainer) cartIconContainer.style.display = '';

    // Hide admin category item in categories page if not admin
    const adminCategoryItem = document.getElementById('admin-category-item');
    if (adminCategoryItem) {
        if (!user || user.email !== 'pyropyro1235@gmail.com') {
            adminCategoryItem.style.display = 'none';
        } else {
            adminCategoryItem.style.display = 'block';
        }
    }
});