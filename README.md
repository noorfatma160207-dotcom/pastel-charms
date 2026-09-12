# 🌸 Pastel Charms — Aesthetic Handmade Crafts Store

A modern, cute, Instagram-aesthetic e-commerce website built for **Pastel Charms**, a small student-run handmade crafts business catering to college students and young people.

---

## ✨ Features Included

1. **Aesthetic Handmade Design**:
   - Soft cream/off-white background with subtle dotted texture.
   - Pastel blush pink, lavender, butter yellow, mint, and mocha accents.
   - Rounded pill cards, soft drop shadows, floating doodle stickers, and smooth hover animations.
   - Clean typography using Google Fonts (*Quicksand*, *Caveat*, *Playfair Display*, *Nunito*).

2. **Homepage (`index.html`)**:
   - Hero section with *"Handmade with love, made just for you ♡"* and CTA buttons (*Shop Now* & *Customize Your Bracelet*).
   - Campus value props banner (*100% Handmade*, *Starting at ₹35*, *Free Campus Handoff*).
   - Featured products grid with live Quick-View modal and instant Add-to-Cart.
   - Shop by Category cards with direct filtering links.
   - Interactive Bracelet Customizer teaser banner.
   - "Why Choose Handmade?" comparison storytelling section.
   - Campus reviews & testimonials with student names and colleges (DU, Christ, Mithibai, IIT Bombay).
   - Instagram-style photo feed with likes and caption overlays.
   - About section & Contact section with direct WhatsApp and Instagram buttons.

3. **Shop Catalog (`shop.html`)**:
   - Category filtering pills with product counts (💎 Bracelets, 🌸 Pipe Cleaner Flowers, 🌹 Handmade Roses, 🎀 Custom Gifts, ✨ Other Crafts).
   - Real-time search by craft name, description, and keywords.
   - Sorting by Price (Low to High, High to Low), Best Sellers, and Ratings.
   - Wishlist toggle to view saved favorites.
   - Responsive product grid with badges (*Best Seller*, *New*, *Customizable ♡*).

4. **Interactive Bracelet Customizer (`customize.html`)**:
   - **Live Visual Bead Preview**: Dynamically draws the bracelet in SVG with 3D gradient spherical gloss beads.
   - Real-time letter beads spelling whatever name or initials are typed.
   - 7 Bead palettes (Blush Pink, Lavender, Mint, Buttercream, Pearl, Midnight, Cloud Blue).
   - 3 Letter bead styles (White & Black, White & Gold, Pastel Colored).
   - 4 Spacer bead options (Gold Metal, Silver, Mini Pearls, None).
   - 7 Dangle charms (Puff Heart, Glass Evil Eye, Enamel Daisy, Star, Butterfly, Gummy Bear, None).
   - Cord styles (Elastic Stretch, Clasp + Chain, Braided Tie).
   - Live price breakdown calculator and "Add Customized Bracelet to Bag" button.

5. **Persistent Shopping Bag / Cart Drawer**:
   - Slide-over bag accessible from any page.
   - Item quantity stepper (`+` / `-`), individual remove button, subtotal in ₹.
   - Persists in browser `localStorage` across all pages.
   - Toast notification popups on every action.

6. **Student Checkout & Order Form (`checkout.html`)**:
   - Student Name, WhatsApp phone number, College/University selector, and Campus Delivery Spot (Hostel/Gate/Canteen).
   - Customization and gift note fields.
   - Payment options tailored for campus life (Pay on Campus Delivery via Cash/UPI or Instant UPI).
   - **"Place Order Now"** with celebratory confirmation modal:
     *“Yay! Your handmade order has been received ♡ We’ll contact you soon to confirm the details.”*
   - **"Send Order to WhatsApp"** button that pre-formats a polite, ready-to-send WhatsApp message with the entire order breakdown!

---

## 🚀 How to Run the Website

### Option 1: Double Click
Simply double-click `index.html` in your file explorer to open it in any web browser!

### Option 2: Local HTTP Server (Python)
Open a terminal in `C:\Users\ACER\.gemini\antigravity\scratch\pastel-charms` and run:
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your browser.

---

## 🎨 How to Edit Products & Prices

All product information is organized in `js/products.js`:
- To add or modify products, change prices in ₹, or update descriptions, edit the `PRODUCTS` array in `js/products.js`.
- To change your WhatsApp number, Instagram handle, or store details, update `BUSINESS_CONFIG` in `js/products.js`.
- To swap images, replace the URLs in `PRODUCTS` with your own photos or local file paths in `assets/`.
