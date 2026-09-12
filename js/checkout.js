// ==========================================
// Pastel Charms - Student Checkout & Campus Order System
// ==========================================

function initCheckout() {
  const checkoutItemsContainer = document.getElementById('checkout-items-list');
  const collegesSelect = document.getElementById('order-college-select');
  
  // Populate college dropdown
  if (collegesSelect && window.SAMPLE_COLLEGES) {
    let opts = '<option value="" disabled selected>Select your College / University 🎓</option>';
    SAMPLE_COLLEGES.forEach(col => {
      opts += `<option value="${escapeHtml(col)}">${escapeHtml(col)}</option>`;
    });
    collegesSelect.innerHTML = opts;

    collegesSelect.addEventListener('change', (e) => {
      const otherWrap = document.getElementById('other-college-wrap');
      if (otherWrap) {
        if (e.target.value.includes('Other')) {
          otherWrap.style.display = 'block';
          document.getElementById('order-college-other').setAttribute('required', 'true');
        } else {
          otherWrap.style.display = 'none';
          document.getElementById('order-college-other').removeAttribute('required');
        }
      }
    });
  }

  renderCheckoutSummary();
  setupOrderFormSubmission();
}

function renderCheckoutSummary() {
  const cart = getCart();
  const summaryContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const totalEl = document.getElementById('checkout-total');
  const emptyWarn = document.getElementById('checkout-empty-warning');
  const formCard = document.getElementById('checkout-form-card');

  if (!summaryContainer) return;

  if (cart.length === 0) {
    if (emptyWarn) emptyWarn.style.display = 'block';
    if (formCard) formCard.style.opacity = '0.5';
    summaryContainer.innerHTML = `
      <div class="empty-checkout-hint">
        <p>Your bag is empty! Add some cute crafts before checking out ♡</p>
        <a href="shop.html" class="btn btn-secondary btn-sm mt-2">Go to Shop →</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  if (emptyWarn) emptyWarn.style.display = 'none';
  if (formCard) formCard.style.opacity = '1';

  let html = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    let customDetailsHtml = '';
    if (item.customDetails) {
      const d = item.customDetails;
      customDetailsHtml = `
        <div class="checkout-item-specs">
          ${d.nameText ? `<span>Name: <strong>${escapeHtml(d.nameText)}</strong></span>` : ''}
          ${d.beadColor ? `<span>Color: ${escapeHtml(d.beadColor)}</span>` : ''}
          ${d.charm ? `<span>Charm: ${escapeHtml(d.charm)}</span>` : ''}
          ${d.braceletType ? `<span>Type: ${escapeHtml(d.braceletType)}</span>` : ''}
        </div>
      `;
    }

    html += `
      <div class="checkout-item-row">
        <div class="checkout-item-left">
          <div class="checkout-item-thumb">
            <img src="${item.image}" alt="${escapeHtml(item.name)}"
                 onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'><rect width=\'60\' height=\'60\' fill=\'%23FAD2E1\'/><text x=\'50%25\' y=\'55%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'24\'>${item.fallbackEmoji}</text></svg>';" />
            <span class="checkout-item-qty-badge">${item.quantity}</span>
          </div>
          <div class="checkout-item-details">
            <h4 class="checkout-item-title">${escapeHtml(item.name)}</h4>
            ${customDetailsHtml}
          </div>
        </div>
        <div class="checkout-item-price">₹${itemTotal}</div>
      </div>
    `;
  });

  summaryContainer.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (totalEl) totalEl.textContent = `₹${subtotal}`;
}

function setupOrderFormSubmission() {
  const form = document.getElementById('student-order-form');
  const whatsappBtn = document.getElementById('order-whatsapp-direct-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleOrderPlacement(false);
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      // Validate basic form before opening WhatsApp
      if (validateOrderForm()) {
        handleOrderPlacement(true);
      }
    });
  }
}

function validateOrderForm() {
  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const college = document.getElementById('order-college-select').value;
  const location = document.getElementById('order-location').value.trim();

  if (!name || !phone || !college || !location) {
    showToast('Please fill in your name, phone, college & delivery spot! 🌸', 'info');
    return false;
  }

  if (phone.length < 10) {
    showToast('Please enter a valid 10-digit phone number 📱', 'info');
    return false;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your bag is empty! Please add items first ♡', 'info');
    return false;
  }

  return true;
}

function handleOrderPlacement(isWhatsApp = false) {
  if (!validateOrderForm()) return;

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const email = document.getElementById('order-email').value.trim();
  let college = document.getElementById('order-college-select').value;
  if (college.includes('Other')) {
    college = document.getElementById('order-college-other').value.trim() || 'Other College';
  }
  const location = document.getElementById('order-location').value.trim();
  const notes = document.getElementById('order-notes').value.trim();
  const paymentMethod = document.querySelector('input[name="payment_choice"]:checked')?.value || 'Pay on Delivery (Cash/UPI)';

  const cart = getCart();
  const orderTotal = getCartSubtotal();
  const orderId = `PC-${Date.now().toString().slice(-6)}`;

  const orderData = {
    orderId,
    timestamp: new Date().toISOString(),
    customer: { name, phone, email, college, location },
    notes,
    paymentMethod,
    items: [...cart],
    total: orderTotal
  };

  // Save in order history
  try {
    const existingOrders = JSON.parse(localStorage.getItem('pastel_charms_orders') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('pastel_charms_orders', JSON.stringify(existingOrders));
  } catch (e) {
    console.error(e);
  }

  if (isWhatsApp) {
    // Generate pre-filled WhatsApp message
    sendOrderViaWhatsApp(orderData);
  }

  // Clear cart
  clearCart();

  // Show friendly confirmation screen
  showOrderSuccessScreen(orderData);
}

function sendOrderViaWhatsApp(order) {
  const bizPhone = window.BUSINESS_CONFIG?.whatsappNumber || '919876543210';
  
  let msg = `✨ *NEW ORDER - Pastel Charms* ✨\n`;
  msg += `*Order ID:* ${order.orderId}\n\n`;
  msg += `🌸 *Customer Details:*\n`;
  msg += `• *Name:* ${order.customer.name}\n`;
  msg += `• *Phone:* ${order.customer.phone}\n`;
  msg += `• *College:* ${order.customer.college}\n`;
  msg += `• *Delivery Spot:* ${order.customer.location}\n\n`;

  msg += `🛍️ *Order Items:*\n`;
  order.items.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}* (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    if (item.customDetails) {
      const d = item.customDetails;
      if (d.nameText) msg += `   ↳ Name: "${d.nameText}"\n`;
      if (d.beadColor) msg += `   ↳ Color: ${d.beadColor}\n`;
      if (d.charm) msg += `   ↳ Charm: ${d.charm}\n`;
    }
  });

  msg += `\n💰 *Total Amount:* ₹${order.total}\n`;
  msg += `💳 *Payment:* ${order.paymentMethod}\n`;
  if (order.notes) {
    msg += `📝 *Notes:* ${order.notes}\n`;
  }
  msg += `\nThank you! Can't wait for my handmade goodies ♡`;

  const encoded = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${bizPhone}?text=${encoded}`;
  window.open(whatsappUrl, '_blank');
}

function showOrderSuccessScreen(order) {
  const successModal = document.getElementById('order-success-modal');
  const overlay = document.getElementById('order-success-overlay');

  if (successModal && overlay) {
    document.getElementById('confirm-order-id').textContent = order.orderId;
    document.getElementById('confirm-customer-name').textContent = order.customer.name;
    document.getElementById('confirm-college-name').textContent = order.customer.college;
    document.getElementById('confirm-total-amount').textContent = `₹${order.total}`;

    overlay.classList.add('active');
    successModal.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('student-order-form')) {
    initCheckout();
  }
});

if (typeof window !== 'undefined') {
  window.initCheckout = initCheckout;
  window.handleOrderPlacement = handleOrderPlacement;
  window.sendOrderViaWhatsApp = sendOrderViaWhatsApp;
}
