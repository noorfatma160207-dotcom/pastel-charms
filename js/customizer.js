// ==========================================
// Pastel Charms - Interactive Bracelet Visualizer & Builder
// ==========================================

const COLOR_MAP = {
  pink: { base: '#FAD2E1', light: '#FFE9F1', dark: '#E6A5BA', name: 'Pastel Blush Pink' },
  lavender: { base: '#D9CBF0', light: '#EDE4FA', dark: '#BAA2DB', name: 'Lavender Bloom' },
  mint: { base: '#BFE5D9', light: '#E0F3EE', dark: '#97CCBE', name: 'Mint Frost' },
  butter: { base: '#FDE4A9', light: '#FFF4D6', dark: '#E8C776', name: 'Buttercream Yellow' },
  pearl: { base: '#F3EFEA', light: '#FFFFFF', dark: '#DDD7CF', name: 'Pearlescent Ivory' },
  black: { base: '#3A3A3C', light: '#68686E', dark: '#1C1C1E', name: 'Midnight Obsidian' },
  sky: { base: '#BAE6FD', light: '#E0F2FE', dark: '#7DD3FC', name: 'Baby Cloud Blue' }
};

const CHARM_MAP = {
  none: { name: 'No Charm', emoji: '', price: 0 },
  heart: { name: 'Puff Heart Charm', emoji: '💖', price: 10 },
  evileye: { name: 'Glass Evil Eye Charm', emoji: '🧿', price: 15 },
  daisy: { name: 'Enamel Daisy Flower', emoji: '🌼', price: 10 },
  star: { name: 'Shimmering Star Charm', emoji: '⭐', price: 10 },
  butterfly: { name: 'Y2K Pastel Butterfly', emoji: '🦋', price: 15 },
  teddy: { name: 'Mini Gummy Teddy Bear', emoji: '🧸', price: 15 }
};

const SPACER_MAP = {
  none: { name: 'No Spacers', color: null, price: 0 },
  gold: { name: 'Gold-Tone Beads', color: '#E8B923', light: '#FFF3B3', price: 5 },
  silver: { name: 'Silver Beads', color: '#C0C0C8', light: '#EFEFF5', price: 5 },
  pearl: { name: 'Mini Seed Pearls', color: '#F0EBE1', light: '#FFFFFF', price: 5 }
};

const BRACELET_TYPES = {
  elastic: { name: 'Stretchy Durable Elastic', price: 0 },
  clasp: { name: 'Lobster Clasp + Extender Chain', price: 10 },
  macrame: { name: 'Adjustable Braided Cord', price: 10 }
};

let currentConfig = {
  name: 'PASTEL',
  braceletType: 'elastic',
  beadColor: 'pink',
  letterStyle: 'white-black',
  spacerBeads: 'gold',
  charm: 'heart',
  theme: 'pastel-dream',
  quantity: 1,
  specialRequest: ''
};

// Initialize Customizer
function initCustomizer() {
  const container = document.getElementById('bracelet-svg-stage');
  if (!container) return;

  setupCustomizerEvents();
  renderBraceletSVG();
  updateCustomizerSummary();
}

function setupCustomizerEvents() {
  // Name input
  const nameInput = document.getElementById('custom-name-input');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      // Limit to 10 characters, letters only
      let val = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 10);
      currentConfig.name = val;
      e.target.value = val;
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  }

  // Bead Color buttons
  document.querySelectorAll('[data-bead-color]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-bead-color]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.beadColor = btn.getAttribute('data-bead-color');
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  });

  // Letter style
  document.querySelectorAll('[data-letter-style]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-letter-style]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.letterStyle = btn.getAttribute('data-letter-style');
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  });

  // Spacer beads
  document.querySelectorAll('[data-spacer]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-spacer]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.spacerBeads = btn.getAttribute('data-spacer');
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  });

  // Charm selection
  document.querySelectorAll('[data-charm]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-charm]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.charm = btn.getAttribute('data-charm');
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  });

  // Bracelet Type
  document.querySelectorAll('[data-bracelet-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-bracelet-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentConfig.braceletType = btn.getAttribute('data-bracelet-type');
      renderBraceletSVG();
      updateCustomizerSummary();
    });
  });

  // Quantity stepper
  const qtyMinus = document.getElementById('custom-qty-minus');
  const qtyPlus = document.getElementById('custom-qty-plus');
  const qtyDisplay = document.getElementById('custom-qty-display');

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener('click', () => {
      if (currentConfig.quantity > 1) {
        currentConfig.quantity--;
        qtyDisplay.textContent = currentConfig.quantity;
        updateCustomizerSummary();
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (currentConfig.quantity < 20) {
        currentConfig.quantity++;
        qtyDisplay.textContent = currentConfig.quantity;
        updateCustomizerSummary();
      }
    });
  }

  // Notes
  const notesInput = document.getElementById('custom-notes-input');
  if (notesInput) {
    notesInput.addEventListener('input', (e) => {
      currentConfig.specialRequest = e.target.value.trim();
      updateCustomizerSummary();
    });
  }

  // Add to Cart button
  const addToCartBtn = document.getElementById('add-custom-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      handleAddCustomToCart();
    });
  }
}

function calculateCustomPrice() {
  const basePrice = 50; // Base ₹50
  const typeExtra = BRACELET_TYPES[currentConfig.braceletType]?.price || 0;
  const charmExtra = CHARM_MAP[currentConfig.charm]?.price || 0;
  const spacerExtra = SPACER_MAP[currentConfig.spacerBeads]?.price || 0;

  const unitPrice = basePrice + typeExtra + charmExtra + spacerExtra;
  const totalPrice = unitPrice * currentConfig.quantity;

  return { unitPrice, totalPrice, basePrice, typeExtra, charmExtra, spacerExtra };
}

function updateCustomizerSummary() {
  const priceInfo = calculateCustomPrice();

  const unitPriceEl = document.getElementById('summary-unit-price');
  if (unitPriceEl) unitPriceEl.textContent = `₹${priceInfo.unitPrice}`;

  const totalPriceEl = document.getElementById('summary-total-price');
  if (totalPriceEl) totalPriceEl.textContent = `₹${priceInfo.totalPrice}`;

  const specNameEl = document.getElementById('spec-name-val');
  if (specNameEl) specNameEl.textContent = currentConfig.name || '(Blank)';

  const specColorEl = document.getElementById('spec-color-val');
  if (specColorEl) specColorEl.textContent = COLOR_MAP[currentConfig.beadColor]?.name || 'Pastel';

  const specCharmEl = document.getElementById('spec-charm-val');
  if (specCharmEl) specCharmEl.textContent = CHARM_MAP[currentConfig.charm]?.name || 'None';

  const specTypeEl = document.getElementById('spec-type-val');
  if (specTypeEl) specTypeEl.textContent = BRACELET_TYPES[currentConfig.braceletType]?.name || 'Elastic';

  const specSpacersEl = document.getElementById('spec-spacers-val');
  if (specSpacersEl) specSpacersEl.textContent = SPACER_MAP[currentConfig.spacerBeads]?.name || 'None';
}

function renderBraceletSVG() {
  const svgStage = document.getElementById('bracelet-svg-stage');
  if (!svgStage) return;

  const color = COLOR_MAP[currentConfig.beadColor] || COLOR_MAP.pink;
  const letters = (currentConfig.name || '').toUpperCase().split('');
  const charm = CHARM_MAP[currentConfig.charm];
  const spacer = SPACER_MAP[currentConfig.spacerBeads];

  // Center (180, 160), radius X=120, radius Y=105
  const cx = 180;
  const cy = 155;
  const rx = 120;
  const ry = 95;

  const totalBeads = 24;
  let beadsSVG = '';

  // Generate bead positions along ellipse perimeter
  // We place letters at the bottom center: angles around 90 degrees (Math.PI/2)
  const letterCount = letters.length;
  const letterStartIndex = Math.floor(totalBeads * 0.25 - letterCount / 2);

  for (let i = 0; i < totalBeads; i++) {
    // Angle in radians (0 at top, clockwise)
    const angle = (i / totalBeads) * 2 * Math.PI - Math.PI / 2;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);

    // Is this slot reserved for a letter?
    let letterChar = null;
    if (letterCount > 0) {
      const relIdx = (i - letterStartIndex + totalBeads) % totalBeads;
      if (relIdx >= 0 && relIdx < letterCount) {
        letterChar = letters[relIdx];
      }
    }

    if (letterChar) {
      // Render Letter Bead (Square/Cubic bead with rounded corners)
      let letterFill = '#FFFFFF';
      let textColor = '#2B2727';
      let strokeColor = '#E0D0C0';

      if (currentConfig.letterStyle === 'white-gold') {
        textColor = '#C28B00';
        strokeColor = '#F2DF99';
      } else if (currentConfig.letterStyle === 'pastel-mix') {
        letterFill = color.light;
        textColor = '#6D4958';
        strokeColor = color.base;
      }

      beadsSVG += `
        <g class="letter-bead" transform="translate(${x}, ${y})">
          <rect x="-10" y="-10" width="20" height="20" rx="6" fill="${letterFill}" stroke="${strokeColor}" stroke-width="1.5" filter="url(#bead-glow)"/>
          <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="900" fill="${textColor}">${letterChar}</text>
        </g>
      `;
    } else {
      // Check if this bead is an accent spacer (flanking the letters or alternating)
      const isFlanking = letterCount > 0 && (
        (i === (letterStartIndex - 1 + totalBeads) % totalBeads) ||
        (i === (letterStartIndex + letterCount) % totalBeads)
      );

      if (isFlanking && spacer.color) {
        // Metallic / Pearl Spacer Bead
        beadsSVG += `
          <circle cx="${x}" cy="${y}" r="6.5" fill="${spacer.color}" stroke="${spacer.light}" stroke-width="1.5" class="bead-element"/>
          <circle cx="${x - 2}" cy="${y - 2}" r="2" fill="${spacer.light}" opacity="0.8"/>
        `;
      } else {
        // Standard Colorful Pastel Bead with 3D spherical gloss
        beadsSVG += `
          <circle cx="${x}" cy="${y}" r="8.5" fill="url(#beadGrad_${currentConfig.beadColor})" class="bead-element"/>
          <circle cx="${x - 2.5}" cy="${y - 2.5}" r="2.5" fill="#FFFFFF" opacity="0.6"/>
        `;
      }
    }
  }

  // Render Dangling Charm at bottom center
  let charmSVG = '';
  if (charm && charm.emoji) {
    const charmX = cx;
    const charmY = cy + ry + 10;
    charmSVG = `
      <g class="charm-dangle" transform="translate(${charmX}, ${charmY})">
        <!-- Connecting jump ring -->
        <circle cx="0" cy="0" r="5" fill="none" stroke="#D4AF37" stroke-width="2"/>
        <!-- Dangle charm -->
        <circle cx="0" cy="18" r="15" fill="#FFFFFF" stroke="#F6D6E2" stroke-width="2" filter="url(#charm-shadow)"/>
        <text x="0" y="24" text-anchor="middle" font-size="18">${charm.emoji}</text>
      </g>
    `;
  }

  svgStage.innerHTML = `
    <svg class="bracelet-svg-preview" viewBox="0 0 360 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="charm-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#CAA2B8" flood-opacity="0.35"/>
        </filter>
        <radialGradient id="beadGrad_${currentConfig.beadColor}" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${color.light}"/>
          <stop offset="50%" stop-color="${color.base}"/>
          <stop offset="100%" stop-color="${color.dark}"/>
        </radialGradient>
      </defs>

      <!-- Inner background aura -->
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#FDECEF" stroke-width="12" opacity="0.5"/>

      <!-- Connecting thread / cord -->
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#E6D3CD" stroke-width="2" stroke-dasharray="3,3"/>

      <!-- Strung Beads -->
      ${beadsSVG}

      <!-- Dangling Charm -->
      ${charmSVG}
    </svg>
  `;
}

function handleAddCustomToCart() {
  const priceInfo = calculateCustomPrice();
  const nameText = currentConfig.name || 'Custom Classic';
  
  const customProduct = {
    id: `custom-bracelet-${Date.now()}`,
    name: `Customized "${nameText}" Bracelet`,
    price: priceInfo.unitPrice,
    image: 'https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '💎',
    category: 'bracelets'
  };

  const customDetails = {
    nameText: nameText,
    beadColor: COLOR_MAP[currentConfig.beadColor]?.name,
    charm: CHARM_MAP[currentConfig.charm]?.name,
    spacerBeads: SPACER_MAP[currentConfig.spacerBeads]?.name,
    braceletType: BRACELET_TYPES[currentConfig.braceletType]?.name,
    letterStyle: currentConfig.letterStyle,
    note: currentConfig.specialRequest
  };

  addToCart(customProduct, currentConfig.quantity, customDetails);
}

document.addEventListener('DOMContentLoaded', () => {
  initCustomizer();
});

if (typeof window !== 'undefined') {
  window.initCustomizer = initCustomizer;
  window.currentConfig = currentConfig;
}
