// ==========================================
// Pastel Charms - Cart & Wishlist System
// Handles localStorage, drawer, badge counts, & toast notifications
// ==========================================

const CART_STORAGE_KEY = 'pastel_charms_cart_v1';
const WISHLIST_STORAGE_KEY = 'pastel_charms_wishlist_v1';

// --- Cart Core API ---
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    updateCartUI();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

function addToCart(product, qty = 1, customDetails = null) {
  const cart = getCart();
  
  // If item has customDetails (like bracelet personalization), treat as unique item
  let existingIndex = -1;
  if (!customDetails) {
    existingIndex = cart.findIndex(item => item.id === product.id && !item.customDetails);
  } else {
    existingIndex = cart.findIndex(item => 
      item.id === product.id && 
      JSON.stringify(item.customDetails) === JSON.stringify(customDetails)
    );
  }

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      fallbackEmoji: product.fallbackEmoji || '✨',
      category: product.category,
      quantity: qty,
      customDetails: customDetails ? { ...customDetails } : null,
      addedAt: Date.now()
    });
  }

  saveCart(cart);
  showToast(`Added ${product.name} to your bag! ♡`, 'success');
  openCartDrawer();
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    showToast(`Removed from bag`, 'info');
  }
}

function updateCartQuantity(index, newQty) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = newQty;
      saveCart(cart);
    }
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
  updateCartUI();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

// --- Wishlist API ---
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist } }));
    updateWishlistUI();
  } catch (e) {
    console.error(e);
  }
}

function toggleWishlist(productId) {
  let list = getWishlist();
  const index = list.indexOf(productId);
  let added = false;
  if (index > -1) {
    list.splice(index, 1);
    showToast('Removed from your favorites ♡', 'info');
  } else {
    list.push(productId);
    added = true;
    showToast('Saved to your favorites! ✨', 'heart');
  }
  saveWishlist(list);
  return added;
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// --- Toast Notification System ---
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-pill toast-${type}`;
  
  const icon = type === 'heart' ? '💖' : (type === 'info' ? '🌸' : '✨');
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after animation
  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// --- Cart Drawer UI Management ---
function setupCartDrawer() {
  // Check if drawer already exists
  if (document.getElementById('cart-drawer-overlay')) return;

  const drawerHTML = `
    <div id="cart-drawer-overlay" class="cart-overlay" onclick="closeCartDrawer()"></div>
    <aside id="cart-drawer" class="cart-drawer" aria-label="Shopping Bag">
      <div class="cart-drawer-header">
        <div class="cart-header-title">
          <h3>Your Bag ♡</h3>
          <span class="cart-header-count" id="cart-drawer-header-count">0 items</span>
        </div>
        <button class="cart-close-btn" onclick="closeCartDrawer()" aria-label="Close Bag">✕</button>
      </div>

      <div class="cart-drawer-body" id="cart-items-list">
        <!-- Injected via updateCartUI -->
      </div>

      <div class="cart-drawer-footer" id="cart-drawer-footer">
        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span class="summary-value" id="cart-drawer-subtotal">₹0</span>
        </div>
        <div class="cart-delivery-badge">
          <span>🌸 Free Campus Pickup / Handoff</span>
        </div>
        <div class="cart-drawer-actions">
          <a href="checkout.html" class="btn btn-primary btn-block checkout-btn">
            Proceed to Order <span class="btn-icon">→</span>
          </a>
          <button class="btn btn-outline btn-block" onclick="closeCartDrawer()">
            Keep Shopping ♡
          </button>
        </div>
      </div>
    </aside>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = drawerHTML;
  document.body.appendChild(wrapper);
}

function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }
}

function updateCartUI() {
  const cart = getCart();
  const count = getCartCount();
  const subtotal = getCartSubtotal();

  // Update all badge counters across the page
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  const headerCount = document.getElementById('cart-drawer-header-count');
  if (headerCount) headerCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;

  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;

  const itemsContainer = document.getElementById('cart-items-list');
  const footerEl = document.getElementById('cart-drawer-footer');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon-circle">🛍️</div>
        <h4>Your bag is feeling lonely</h4>
        <p>You haven't added any cute handmade treasures yet!</p>
        <a href="shop.html" class="btn btn-secondary btn-sm" onclick="closeCartDrawer()">
          Explore Cute Crafts ✨
        </a>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
  } else {
    if (footerEl) footerEl.style.display = 'block';
    
    let html = '';
    cart.forEach((item, index) => {
      let customHtml = '';
      if (item.customDetails) {
        const d = item.customDetails;
        customHtml = `
          <div class="cart-item-custom-tags">
            ${d.nameText ? `<span class="custom-tag">Name: <strong>${escapeHtml(d.nameText)}</strong></span>` : ''}
            ${d.beadColor ? `<span class="custom-tag">Bead: ${escapeHtml(d.beadColor)}</span>` : ''}
            ${d.charm ? `<span class="custom-tag">Charm: ${escapeHtml(d.charm)}</span>` : ''}
            ${d.note ? `<span class="custom-tag note">Note: ${escapeHtml(d.note)}</span>` : ''}
          </div>
        `;
      }

      html += `
        <div class="cart-item">
          <div class="cart-item-img-wrap">
            <img src="${item.image}" alt="${escapeHtml(item.name)}" 
                 onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'><rect width=\'80\' height=\'80\' fill=\'%23FAD2E1\'/><text x=\'50%25\' y=\'55%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'32\'>${item.fallbackEmoji}</text></svg>';" />
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <div class="cart-item-price">₹${item.price}</div>
            ${customHtml}
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQuantity(${index}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Remove item">
                🗑️ Remove
              </button>
            </div>
          </div>
        </div>
      `;
    });
    itemsContainer.innerHTML = html;
  }
}

function updateWishlistUI() {
  const wishlist = getWishlist();
  const count = wishlist.length;

  document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  // Update heart buttons on cards
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const pid = btn.getAttribute('data-product-id');
    if (pid && wishlist.includes(pid)) {
      btn.classList.add('active');
      btn.innerHTML = '❤️';
      btn.setAttribute('aria-label', 'Remove from favorites');
    } else if (pid) {
      btn.classList.remove('active');
      btn.innerHTML = '♡';
      btn.setAttribute('aria-label', 'Save to favorites');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Mobile Navigation Setup ---
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
    });

    if (overlay) {
      overlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      });
    }

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      });
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupCartDrawer();
  setupMobileMenu();
  updateCartUI();
  updateWishlistUI();

  // Attach cart open buttons
  document.querySelectorAll('.open-cart-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  // Attach Escape key to close drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
    }
  });
});

// Window bindings
if (typeof window !== 'undefined') {
  window.getCart = getCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQuantity = updateCartQuantity;
  window.clearCart = clearCart;
  window.getCartCount = getCartCount;
  window.getCartSubtotal = getCartSubtotal;
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.showToast = showToast;
  window.getWishlist = getWishlist;
  window.toggleWishlist = toggleWishlist;
  window.isInWishlist = isInWishlist;
  window.updateCartUI = updateCartUI;
  window.updateWishlistUI = updateWishlistUI;
  window.escapeHtml = escapeHtml;
}
