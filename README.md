<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,24,30&height=180&section=header&text=🌸%20Pastel%20Charms&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=42&desc=Aesthetic%20Handmade%20Crafts%20%26%20Custom%20Bracelet%20E-Commerce%20Platform&descFontSize=16&descAlignY=64" width="100%" alt="Pastel Charms Banner" />

  <br/>

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Online-FF69B4?style=for-the-badge&logo=google-chrome&logoColor=white)]([YOUR_DEPLOYED_URL_HERE])
  [![Frontend](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20(ES6+)-7C3AED?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![License](https://img.shields.io/badge/License-MIT-3B82F6?style=for-the-badge)](LICENSE)

  <br/><br/>

  <p align="center">
    A modern, pastel-aesthetic e-commerce web platform tailored for student entrepreneurs and handmade craft lovers. Features an interactive SVG-rendered bracelet customizer, category filter engine, persistent cart drawer, and automated WhatsApp order dispatching.
  </p>

</div>

---

## 🌟 Key Highlights & Features

### 💎 1. Interactive Visual Bracelet Customizer (`customize.html`)
- **Real-Time SVG Visualizer:** Dynamically renders 3D gradient spherical beads and letter beads as users type their initials/names.
- **Customization Options:**
  - 🎨 **7 Bead Color Palettes:** Blush Pink, Lavender, Mint, Buttercream, Pearl, Midnight, and Cloud Blue.
  - 🔤 **3 Letter Styles:** White & Black, White & Gold, and Pastel Colored.
  - ✨ **Spacers & Charms:** Gold Metal, Silver, Mini Pearls, Puff Hearts, Evil Eye, Enamel Daisies, and Gummy Bears.
- **Dynamic Price Engine:** Updates total in real time as charms/beads are toggled.

### 🛍️ 2. Modern Product Catalog & Filtering (`shop.html`)
- Instant category switching (*Bracelets, Pipe Cleaner Flowers, Roses, Custom Gifts*).
- Real-time text search and multi-criteria sorting (Price Low/High, Rating, Best Sellers).
- Quick-view modals with high-res previews and item details.

### 🛒 3. Persistent Shopping Bag & Campus Checkout (`checkout.html`)
- Slide-over cart drawer synchronized across all pages using `localStorage`.
- Quantity counter and live subtotal calculator in ₹.
- Campus-tailored delivery checkout (Hostel/Gate/Canteen selection with Pay-on-Delivery or UPI).
- **Direct WhatsApp Order Generator:** Pre-formats complete order summary into a one-tap WhatsApp message.

---

## 🛠️ Architecture & Tech Stack

```
pastel-charms/
├── 📄 index.html          # Aesthetic Landing Page, Hero & Reviews
├── 📄 shop.html           # Full Catalog, Search & Filter System
├── 📄 customize.html      # Interactive SVG Bracelet Customizer
├── 📄 checkout.html       # Campus Checkout & WhatsApp Generator
├── 🎨 css/
│   └── styles.css         # Pastel Design System, Animations & Responsive Grid
├── ⚡ js/
│   ├── app.js             # Cart Drawer, Global UI & Toast Engine
│   ├── products.js        # Catalog Data, Price Matrix & Store Config
│   └── customizer.js      # SVG Math, Bead Rendering & State Machine
└── 📁 assets/             # Photography, Sticker Doodles & Media
```

- **Frontend Core:** Semantic HTML5, Modular Modern CSS3 (CSS Variables, Flexbox/Grid, Glassmorphism).
- **Client Logic:** Vanilla JavaScript (ES6+), DOM Mutation, LocalStorage state management.
- **Graphics:** Scalable Vector Graphics (SVG) with parametric mathematical bead placement.

---

## 🚀 Quick Setup & Local Run

### Method 1: Instant Browser Preview
Double click `index.html` in your file explorer to open it in Chrome, Edge, or Firefox.

### Method 2: Local HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/noorfatma160207-dotcom/pastel-charms.git

# Enter project directory
cd pastel-charms

# Start local server with Python
python -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

---

## 🎯 Future Enhancements & Backend Roadmap

- [ ] **Node.js / Express Backend:** Transition catalog from `products.js` to a real REST API.
- [ ] **Database Integration:** Store user custom orders and inventory in a PostgreSQL database.
- [ ] **Admin Portal:** Secure interface to upload new craft photos and manage orders.
- [ ] **Automated Payment Gateway:** Razorpay / Stripe sandbox integration for UPI & Card payments.

---

## 👩‍💻 Author & Contact

**Noor** — *2nd-Year B.Tech Computer Science & Engineering*
- **GitHub:** [@noorfatma160207-dotcom](https://github.com/noorfatma160207-dotcom)
- **LinkedIn:** [linkedin.com/in/[YOUR_LINKEDIN_USERNAME]](https://linkedin.com/in/[YOUR_LINKEDIN_USERNAME])
- **Email:** `[YOUR_EMAIL_ADDRESS]`
