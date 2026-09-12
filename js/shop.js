// ==========================================
// Pastel Charms - Shop Catalog & Filtering Logic
// ==========================================

let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let showWishlistOnly = false;

function initShop() {
  // Check URL parameters for ?category=...
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam && CATEGORIES.some(c => c.id === catParam)) {
    activeCategory = catParam;
  }

  setupShopFilters();
  renderProductsGrid();
  setupQuickViewModal();
}

function setupShopFilters() {
  // Category filter tabs
  const categoryContainer = document.getElementById('category-filter-bar');
  if (categoryContainer) {
    let html = '';
    CATEGORIES.forEach(cat => {
      const isActive = cat.id === activeCategory ? 'active' : '';
      html += `
        <button class="filter-chip ${isActive}" data-category="${cat.id}">
          <span class="chip-icon">${cat.icon}</span>
          <span class="chip-text">${cat.name}</span>
        </button>
      `;
    });
    categoryContainer.innerHTML = html;

    categoryContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        showWishlistOnly = false;
        
        // Uncheck wishlist-only toggle if active
        const wishlistToggle = document.getElementById('wishlist-only-toggle');
        if (wishlistToggle) wishlistToggle.classList.remove('active');

        renderProductsGrid();
      });
    });
  }

  // Search input
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderProductsGrid();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProductsGrid();
    });
  }

  // Wishlist only filter toggle button
  const wishlistToggle = document.getElementById('wishlist-only-toggle');
  if (wishlistToggle) {
    wishlistToggle.addEventListener('click', () => {
      showWishlistOnly = !showWishlistOnly;
      wishlistToggle.classList.toggle('active', showWishlistOnly);
      renderProductsGrid();
    });
  }
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Filter by category
  if (activeCategory !== 'all') {
    list = list.filter(p => p.category === activeCategory);
  }

  // Filter by search query
  if (searchQuery) {
    list = list.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(searchQuery);
      const descMatch = p.description.toLowerCase().includes(searchQuery);
      const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery));
      return nameMatch || descMatch || tagMatch;
    });
  }

  // Filter by wishlist
  if (showWishlistOnly) {
    const wishlist = getWishlist();
    list = list.filter(p => wishlist.includes(p.id));
  }

  // Sort
  if (currentSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'bestseller') {
    list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  } else if (currentSort === 'rating') {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return list;
}

function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count-display');
  if (!grid) return;

  const products = getFilteredProducts();

  if (countEl) {
    countEl.textContent = `Showing ${products.length} cute ${products.length === 1 ? 'item' : 'items'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-products-state">
        <div class="empty-art">🌸</div>
        <h3>No crafts found</h3>
        <p>Try searching for something else or clearing your filters!</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  const wishlist = getWishlist();

  let html = '';
  products.forEach(p => {
    const isFav = wishlist.includes(p.id);
    const badgeHTML = p.badge ? `<span class="badge badge-accent">${p.badge}</span>` : '';
    const customBadge = p.customizable ? `<span class="badge badge-custom">Customizable ♡</span>` : '';

    html += `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-card-top">
          <div class="badge-stack">
            ${badgeHTML}
            ${customBadge}
          </div>
          <button class="wishlist-btn ${isFav ? 'active' : ''}" data-product-id="${p.id}" onclick="handleWishlistClick(event, '${p.id}')" aria-label="Favorite">
            ${isFav ? '❤️' : '♡'}
          </button>
          <div class="product-img-wrap" onclick="openQuickView('${p.id}')">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"
                 onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\' viewBox=\'0 0 300 300\'><rect width=\'300\' height=\'300\' fill=\'%23FDECEF\'/><text x=\'50%25\' y=\'52%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'72\'>${p.fallbackEmoji}</text></svg>';" />
          </div>
        </div>

        <div class="product-card-body">
          <div class="product-meta-row">
            <span class="product-category-tag">${p.categoryName}</span>
            <span class="product-rating">★ ${p.rating} <span class="review-count">(${p.reviewsCount})</span></span>
          </div>

          <h3 class="product-title" onclick="openQuickView('${p.id}')">${escapeHtml(p.name)}</h3>
          <p class="product-short-desc">${escapeHtml(p.shortDesc)}</p>

          <div class="product-card-footer">
            <div class="price-box">
              <span class="currency">₹</span><span class="amount">${p.price}</span>
              ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice}</span>` : ''}
            </div>
            <div class="card-btn-group">
              <button class="btn-card-quick" onclick="openQuickView('${p.id}')" title="Quick view">
                👁️ Details
              </button>
              <button class="btn btn-primary btn-sm add-cart-btn" onclick="handleCardAddToCart('${p.id}')">
                Add +
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function handleCardAddToCart(productId) {
  const p = getProductById(productId);
  if (!p) return;

  if (p.customizable && p.category === 'bracelets') {
    // If it's a bracelet, recommend customizing or add base item
    addToCart(p, 1);
  } else {
    addToCart(p, 1);
  }
}

function handleWishlistClick(e, productId) {
  e.stopPropagation();
  toggleWishlist(productId);
  updateWishlistUI();
  if (showWishlistOnly) {
    renderProductsGrid();
  }
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  currentSort = 'featured';
  showWishlistOnly = false;

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  const categoryContainer = document.getElementById('category-filter-bar');
  if (categoryContainer) {
    categoryContainer.querySelectorAll('.filter-chip').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-category') === 'all');
    });
  }

  renderProductsGrid();
}

// Quick View Modal
function setupQuickViewModal() {
  if (document.getElementById('quick-view-modal')) return;

  const modalHTML = `
    <div id="quick-view-overlay" class="modal-overlay" onclick="closeQuickView()"></div>
    <div id="quick-view-modal" class="quick-view-modal" role="dialog" aria-modal="true">
      <button class="modal-close-btn" onclick="closeQuickView()" aria-label="Close">✕</button>
      <div id="quick-view-content" class="quick-view-body">
        <!-- Injected dynamically -->
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);
}

function openQuickView(productId) {
  setupQuickViewModal();
  const p = getProductById(productId);
  if (!p) return;

  const content = document.getElementById('quick-view-content');
  const overlay = document.getElementById('quick-view-overlay');
  const modal = document.getElementById('quick-view-modal');

  const isFav = isInWishlist(p.id);

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-gallery">
        <div class="modal-img-wrap">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" 
               onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 400 400\'><rect width=\'400\' height=\'400\' fill=\'%23FDECEF\'/><text x=\'50%25\' y=\'52%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'96\'>${p.fallbackEmoji}</text></svg>';" />
        </div>
      </div>
      <div class="modal-details">
        <div class="modal-tag-row">
          <span class="category-pill">${p.categoryName}</span>
          ${p.badge ? `<span class="badge badge-accent">${p.badge}</span>` : ''}
          ${p.customizable ? `<span class="badge badge-custom">Customizable ♡</span>` : ''}
        </div>

        <h2 class="modal-product-title">${escapeHtml(p.name)}</h2>
        
        <div class="modal-price-row">
          <span class="modal-price">₹${p.price}</span>
          ${p.originalPrice ? `<span class="modal-orig-price">₹${p.originalPrice}</span>` : ''}
          <span class="modal-rating">★ ${p.rating} (${p.reviewsCount} college reviews)</span>
        </div>

        <p class="modal-desc">${escapeHtml(p.description)}</p>

        <div class="product-perks-box">
          <div class="perk-item">
            <span class="perk-icon">✨</span>
            <div><strong>Materials:</strong> ${escapeHtml(p.materials)}</div>
          </div>
          <div class="perk-item">
            <span class="perk-icon">🚚</span>
            <div><strong>Delivery:</strong> ${escapeHtml(p.deliveryTime)}</div>
          </div>
          <div class="perk-item">
            <span class="perk-icon">🎁</span>
            <div><strong>Packaging:</strong> Cute pastel pouch + free stickers included!</div>
          </div>
        </div>

        <div class="modal-actions-row">
          <div class="qty-stepper modal-stepper">
            <button class="qty-btn" id="modal-qty-minus">−</button>
            <span class="qty-value" id="modal-qty-display">1</span>
            <button class="qty-btn" id="modal-qty-plus">+</button>
          </div>
          <button class="btn btn-primary flex-1" id="modal-add-cart-btn">
            Add to Bag (₹${p.price}) ♡
          </button>
        </div>

        ${p.customizable ? `
          <div class="modal-customize-banner">
            <span>Want special letters or colors?</span>
            <a href="customize.html" class="custom-link-btn">Open Customizer Studio →</a>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Quantity handling in modal
  let qty = 1;
  const qtyMinus = document.getElementById('modal-qty-minus');
  const qtyPlus = document.getElementById('modal-qty-plus');
  const qtyDisplay = document.getElementById('modal-qty-display');
  const addBtn = document.getElementById('modal-add-cart-btn');

  qtyMinus.onclick = () => {
    if (qty > 1) {
      qty--;
      qtyDisplay.textContent = qty;
      addBtn.textContent = `Add to Bag (₹${p.price * qty}) ♡`;
    }
  };
  qtyPlus.onclick = () => {
    if (qty < 20) {
      qty++;
      qtyDisplay.textContent = qty;
      addBtn.textContent = `Add to Bag (₹${p.price * qty}) ♡`;
    }
  };
  addBtn.onclick = () => {
    addToCart(p, qty);
    closeQuickView();
  };

  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeQuickView() {
  const overlay = document.getElementById('quick-view-overlay');
  const modal = document.getElementById('quick-view-modal');
  if (overlay && modal) {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid')) {
    initShop();
  }
});

if (typeof window !== 'undefined') {
  window.initShop = initShop;
  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
  window.handleCardAddToCart = handleCardAddToCart;
  window.handleWishlistClick = handleWishlistClick;
  window.resetFilters = resetFilters;
}
