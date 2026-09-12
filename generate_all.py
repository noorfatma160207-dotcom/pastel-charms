import pathlib, shutil

PRODUCTS = [
  {"id": "p1", "name": "Custom Name Bead Bracelet", "cat": "bracelets", "catName": "Bracelets", "price": 50, "orig": 65, "rating": "4.9 (48)", "badge": "Best Seller", "custom": True, "img": "https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=600&q=80", "desc": "Handmade elastic bead bracelet customized with your name or initials ♡"},
  {"id": "p2", "name": "Evil Eye Charm Bracelet", "cat": "bracelets", "catName": "Bracelets", "price": 60, "orig": 75, "rating": "5.0 (52)", "badge": "Best Seller", "custom": False, "img": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80", "desc": "Aesthetic protective glass evil eye bead with gold spacer accents."},
  {"id": "p3", "name": "Black & Silver Minimalist Bracelet", "cat": "bracelets", "catName": "Bracelets", "price": 50, "orig": 60, "rating": "4.8 (29)", "badge": "Popular", "custom": False, "img": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80", "desc": "Sleek monochrome obsidian-style beads with metallic silver stars."},
  {"id": "p4", "name": "Pastel Pearl Daisy Bracelet", "cat": "bracelets", "catName": "Bracelets", "price": 55, "orig": 70, "rating": "4.9 (23)", "badge": "Cute Pick", "custom": True, "img": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", "desc": "Faux pearls woven into dainty little daisy blossoms with pastel centers."},
  {"id": "p5", "name": "Pipe Cleaner Everlasting Daisy", "cat": "pipe-flowers", "catName": "Pipe Cleaner Flowers", "price": 35, "orig": 45, "rating": "5.0 (64)", "badge": "Best Seller", "custom": False, "img": "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80", "desc": "A flower that never wilts! Hand-crafted fluffy pastel daisy with leaf stem."},
  {"id": "p6", "name": "Fluffy Pipe Cleaner Tulip Bouquet", "cat": "pipe-flowers", "catName": "Pipe Cleaner Flowers", "price": 75, "orig": 95, "rating": "4.9 (38)", "badge": "Trending", "custom": False, "img": "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80", "desc": "Trio of soft velvet tulips wrapped in aesthetic Korean floral paper."},
  {"id": "p7", "name": "Baby Blossom Desk Buddy Pot", "cat": "pipe-flowers", "catName": "Pipe Cleaner Flowers", "price": 65, "orig": 80, "rating": "4.8 (19)", "badge": "New", "custom": False, "img": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80", "desc": "Mini terracotta pot planted with cute fuzzy blossoms for your study desk."},
  {"id": "p8", "name": "Handmade Velvet Ribbon Rose", "cat": "roses", "catName": "Handmade Roses", "price": 35, "orig": 50, "rating": "5.0 (47)", "badge": "Best Seller", "custom": False, "img": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80", "desc": "Single handcrafted rose folded petal-by-petal from satin velvet ribbon."},
  {"id": "p9", "name": "Blush Pink Ribbon Rose Duo", "cat": "roses", "catName": "Handmade Roses", "price": 65, "orig": 85, "rating": "4.9 (26)", "badge": "Cute Pick", "custom": False, "img": "https://images.unsplash.com/photo-1548625361-16eb16260a93?auto=format&fit=crop&w=600&q=80", "desc": "Two paired blush pink & ivory handmade roses with a glitter crown."},
  {"id": "p10", "name": "Bestie Sunshine Gift Hamper", "cat": "custom-gifts", "catName": "Custom Gifts", "price": 120, "orig": 160, "rating": "5.0 (34)", "badge": "Best Value", "custom": True, "img": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", "desc": "Includes 1 custom bracelet, 1 pipe cleaner flower, stickers & gift card ♡"},
  {"id": "p11", "name": "Mini Surprise Cute Craft Box", "cat": "custom-gifts", "catName": "Custom Gifts", "price": 100, "orig": 130, "rating": "4.8 (21)", "badge": "Gift Pick", "custom": True, "img": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80", "desc": "Cute mystery craft box with 2 bracelets, mini flower, and sweet treats."},
  {"id": "p12", "name": "Aesthetic Beaded Phone Charm Strap", "cat": "crafts", "catName": "Other Crafts", "price": 40, "orig": 55, "rating": "4.9 (39)", "badge": "Trending", "custom": False, "img": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80", "desc": "Y2K pastel beaded wrist strap with heart, butterfly & pearl charms."}
]

print("Loaded products:", len(PRODUCTS))
def render_header(active_tab):
    return f"""  <div style="background: linear-gradient(90deg, #FDE8EF 0%, #E8DFF5 50%, #FFF1E6 100%); text-align: center; padding: 7px 14px; font-size: 0.84rem; font-weight: 700; color: #5B4743; border-bottom: 1px solid #F6DCE5;">
    ✨ Free campus pickup & handoff for college students! Use code <span style="background: #FFFFFF; padding: 2px 8px; border-radius: 12px; color: #D46A85; border: 1px dashed #FAD2E1;">BESTIE10</span> for extra love ♡
  </div>

  <header class="site-header">
    <div class="nav-container">
      <a href="index.html" class="brand-logo" aria-label="Pastel Charms Home">
        <span class="logo-sparkle">🌸</span>
        <span class="logo-text">Pastel Charms <span>♡</span></span>
      </a>

      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link {'active' if active_tab=='home' else ''}">Home</a></li>
          <li><a href="shop.html" class="nav-link {'active' if active_tab=='shop' else ''}">Shop</a></li>
          <li><a href="customize.html" class="nav-link {'active' if active_tab=='customize' else ''}">Customize 💎</a></li>
          <li><a href="index.html#about" class="nav-link">About</a></li>
          <li><a href="index.html#contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="shop.html" class="nav-icon-btn" title="Shop Catalog">
          🛍️ Shop Now
        </a>
        <a href="checkout.html" class="btn btn-primary btn-sm" title="Order / Checkout">
          📦 Order Form
        </a>
        
        <details class="mobile-menu-details">
          <summary class="mobile-menu-summary" aria-label="Toggle menu">☰</summary>
          <div class="mobile-menu-dropdown">
            <a href="index.html"><span>🏠</span> Home</a>
            <a href="shop.html"><span>🛍️</span> Shop All Crafts</a>
            <a href="customize.html"><span>💎</span> Bracelet Customizer</a>
            <a href="index.html#about"><span>🎀</span> Our Story</a>
            <a href="index.html#contact"><span>💌</span> Contact & WhatsApp</a>
            <a href="checkout.html"><span>📦</span> Order Checkout</a>
          </div>
        </details>
      </div>
    </div>
  </header>"""

def render_footer():
    return """  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            Pastel Charms <span>♡</span>
          </div>
          <p class="footer-desc">
            Handmade with love, made just for you. Cute bracelets, forever flowers, and aesthetic gifts for college students.
          </p>
          <div class="footer-social-links">
            <a href="https://instagram.com" target="_blank" class="social-circle" title="Instagram">📸</a>
            <a href="https://wa.me/919876543210" target="_blank" class="social-circle" title="WhatsApp">💬</a>
            <a href="mailto:hello.pastelcharms@gmail.com" class="social-circle" title="Email">✉️</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Explore</h4>
          <ul class="footer-links-list">
            <li><a href="shop.html#bracelets">💎 Custom Bracelets</a></li>
            <li><a href="shop.html#pipe-flowers">🌸 Pipe Cleaner Flowers</a></li>
            <li><a href="shop.html#roses">🌹 Handmade Roses</a></li>
            <li><a href="shop.html#custom-gifts">🎀 Custom Gift Bundles</a></li>
            <li><a href="shop.html#crafts">✨ Cute Crafts & Charms</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links-list">
            <li><a href="customize.html">Custom Bracelet Studio</a></li>
            <li><a href="shop.html">Full Catalog</a></li>
            <li><a href="index.html#about">Our Story</a></li>
            <li><a href="index.html#contact">Campus Delivery Details</a></li>
            <li><a href="checkout.html">Order Form</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Campus Promise 🌸</h4>
          <p style="font-size: 0.88rem; color: #B5ABA4; line-height: 1.6; margin-bottom: 1rem;">
            Affordable student pricing (₹35–₹120), safe elastic stretch, and free stickers with every order.
          </p>
          <span style="font-size: 0.8rem; background: #3C2E2D; padding: 6px 12px; border-radius: 20px; color: #F8B4C9; border: 1px solid #4D3C3B;">
            ♡ Student-run & loved
          </span>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 Pastel Charms. Handmade with love & care ♡ All rights reserved.</p>
      </div>
    </div>
  </footer>"""

def render_card(p):
    badge_html = f'<span class="badge badge-accent">{p["badge"]}</span>' if p["badge"] else ''
    custom_badge = '<span class="badge badge-custom">Customizable ♡</span>' if p["custom"] else ''
    action_btn = f'<a href="customize.html" class="btn btn-primary btn-sm">Customize 💎</a>' if p["custom"] and p["cat"] == "bracelets" else f'<a href="checkout.html" class="btn btn-primary btn-sm">Order +</a>'
    
    return f"""        <div class="product-card" id="{p['id']}">
          <div class="product-card-top">
            <div class="badge-stack">
              {badge_html}
              {custom_badge}
            </div>
            <div class="product-img-wrap">
              <img src="{p['img']}" alt="{p['name']}" loading="lazy">
            </div>
          </div>
          <div class="product-card-body">
            <div class="product-meta-row">
              <span class="product-category-tag">{p['catName']}</span>
              <span class="product-rating">★ {p['rating']}</span>
            </div>
            <h3 class="product-title">{p['name']}</h3>
            <p class="product-short-desc">{p['desc']}</p>
            <div class="product-card-footer">
              <div class="price-box">
                <span class="currency">₹</span><span class="amount">{p['price']}</span>
                <span class="original-price">₹{p['orig']}</span>
              </div>
              <div class="card-btn-group">
                {action_btn}
              </div>
            </div>
          </div>
        </div>"""

print("Defined helper components")
def build_index():
    featured_cards = "\n".join([render_card(p) for p in PRODUCTS[:6]])
    header = render_header("home")
    footer = render_footer()
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pastel Charms ♡ Cute Handmade Bracelets, Flowers & Crafts</title>
  <meta name="description" content="Pastel Charms - Cute handmade bracelets, everlasting pipe cleaner flowers, ribbon roses, and custom gifts.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌸</text></svg>">
</head>
<body>

{header}

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-aura hero-aura-1"></div>
    <div class="hero-aura hero-aura-2"></div>
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-pill-badge">
          <span>✨</span> Handcrafted by students, for students
        </div>
        <h1 class="hero-title">
          Pastel Charms
        </h1>
        <div class="hero-tagline">
          Handmade with love, made just for you ♡
        </div>
        <p class="hero-description">
          Cute handmade bracelets, flowers & little things made to make your day a little more special. Affordable, customizable, and lovingly delivered across campus.
        </p>
        <div class="hero-btn-group">
          <a href="shop.html" class="btn btn-primary">
            Shop Now <span class="btn-icon">🌸</span>
          </a>
          <a href="customize.html" class="btn btn-secondary">
            Customize Your Bracelet <span class="btn-icon">💎</span>
          </a>
        </div>
        <div class="hero-perks">
          <div class="perk-pill"><span>🌸</span> 100% Handmade</div>
          <div class="perk-pill"><span>₹</span> Starting at ₹35</div>
          <div class="perk-pill"><span>🚚</span> Campus Delivery</div>
          <div class="perk-pill"><span>♡</span> Loved by 500+ Students</div>
        </div>
      </div>

      <div class="hero-visual-card">
        <img class="hero-main-img" 
             src="https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=800&q=80" 
             alt="Pastel Charms Beaded Bracelet Collection">
        
        <div class="floating-sticker sticker-price">
          <span class="sticker-icon">✨</span>
          <div>
            <div class="sticker-title">Student Friendly</div>
            <div class="sticker-sub">Bracelets from ₹50</div>
          </div>
        </div>

        <div class="floating-sticker sticker-handmade">
          <span class="sticker-icon">🎀</span>
          <div>
            <div class="sticker-title">100% Handcrafted</div>
            <div class="sticker-sub">Made Just for You ♡</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="section-padding" style="background: #FFFFFF;">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">🌸 Explore Our Cute World</span>
        <h2 class="section-title">Shop by Category</h2>
        <p class="section-desc">From personalized name bracelets to flowers that never wilt, discover handcrafted treasures.</p>
      </div>

      <div class="categories-grid">
        <a href="shop.html#bracelets" class="category-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%);">
          <div class="category-icon-bubble" style="background: #FDE8EF;">💎</div>
          <h3>Bracelets</h3>
          <p>Custom letters, evil eyes & pastel daisy beads</p>
          <span class="category-count-pill">From ₹50</span>
        </a>

        <a href="shop.html#pipe-flowers" class="category-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #F5FBF8 100%);">
          <div class="category-icon-bubble" style="background: #E2ECE9;">🌸</div>
          <h3>Pipe Cleaner Flowers</h3>
          <p>Fluffy daisies, tulips & eternal desktop blooms</p>
          <span class="category-count-pill">From ₹35</span>
        </a>

        <a href="shop.html#roses" class="category-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #FFF8FA 100%);">
          <div class="category-icon-bubble" style="background: #FEE7ED;">🌹</div>
          <h3>Handmade Roses</h3>
          <p>Satin ribbon roses folded petal-by-petal</p>
          <span class="category-count-pill">From ₹35</span>
        </a>

        <a href="shop.html#custom-gifts" class="category-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #F8F5FF 100%);">
          <div class="category-icon-bubble" style="background: #E8DFF5;">🎀</div>
          <h3>Custom Gifts</h3>
          <p>Gift hampers & birthday craft packages for besties</p>
          <span class="category-count-pill">From ₹100</span>
        </a>

        <a href="shop.html#crafts" class="category-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #FFFBF5 100%);">
          <div class="category-icon-bubble" style="background: #FFF1E6;">✨</div>
          <h3>Other Crafts</h3>
          <p>Aesthetic phone straps & cute desk buddies</p>
          <span class="category-count-pill">From ₹40</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Featured Products -->
  <section class="section-padding" id="featured">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">✨ Campus Favorites</span>
        <h2 class="section-title">Featured Creations</h2>
        <p class="section-desc">Our most-loved handmade pieces chosen by students for dorm decor, matching besties, and thoughtful gifts.</p>
      </div>

      <div class="products-grid">
{featured_cards}
      </div>

      <div style="text-align: center; margin-top: 3.5rem;">
        <a href="shop.html" class="btn btn-outline" style="padding: 1rem 2.5rem; font-size: 1.05rem;">
          View All 12 Products in Shop Catalog →
        </a>
      </div>
    </div>
  </section>

  <!-- Bracelet Studio Teaser -->
  <section class="container" style="margin-bottom: 5rem;">
    <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FAF0FF 50%, #FFF8F0 100%); border-radius: 36px; padding: 3.5rem 2.5rem; border: 2px solid #FFFFFF; box-shadow: var(--shadow-card); position: relative; overflow: hidden;">
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2.5rem; align-items: center;">
        <div>
          <span class="section-subtitle-pill">💎 Custom Studio</span>
          <h2 style="font-size: 2.2rem; font-weight: 800; color: var(--text-dark); margin-bottom: 0.8rem; line-height: 1.2;">
            Design Your Custom Bracelet
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.8rem;">
            Type your name or your best friend’s initials, choose your favorite pastel bead palette, pick cute charms (Evil Eye, Daisy, Butterfly, Heart), and order in 1 click!
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="customize.html" class="btn btn-primary">
              Open Bracelet Studio ♡
            </a>
            <span style="font-size: 0.95rem; font-weight: 700; color: var(--pastel-rose); align-self: center;">
              Only ₹50 base price!
            </span>
          </div>
        </div>
        <div style="text-align: center; background: rgba(255,255,255,0.7); border-radius: 28px; padding: 2rem; border: 1px dashed #FAD2E1;">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem; animation: gentlePulse 3s infinite ease-in-out;">
            💎 🌸 🧿 🦋
          </div>
          <div style="font-family: var(--font-hand); font-size: 1.8rem; color: var(--pastel-rose); font-weight: 700;">
            " ANANYA ♡ BESTIES "
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">7 Color Palettes & 7 Charm Options</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Handmade -->
  <section class="section-padding why-handmade-section">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">🎀 Handcrafted with Care</span>
        <h2 class="section-title">Why Choose Handmade?</h2>
        <p class="section-desc">In a world of mass-produced plastic, every piece from Pastel Charms is tied, folded, and beaded with genuine warmth.</p>
      </div>

      <div class="why-grid">
        <div class="why-card">
          <div class="why-icon">♡</div>
          <h3>Crafted with Love</h3>
          <p>No factory assembly lines. Every single bead, ribbon fold, and petal is crafted by hand with careful attention to detail.</p>
        </div>

        <div class="why-card">
          <div class="why-icon">✨</div>
          <h3>100% Unique to You</h3>
          <p>Customize your bracelet with your name, anniversary date, favorite colors, or charms to create a one-of-a-kind keepsake.</p>
        </div>

        <div class="why-card">
          <div class="why-icon">🌸</div>
          <h3>Everlasting Blooms</h3>
          <p>Our pipe cleaner and ribbon flowers never wither or fade. They stay bright and cheerful on your dorm desk forever!</p>
        </div>

        <div class="why-card">
          <div class="why-icon">🎓</div>
          <h3>Student-Budget Friendly</h3>
          <p>Created by college students for college students! Starting at just ₹35, gifting your roommate won't break your pocket money.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Reviews -->
  <section class="section-padding" style="background: #FFFFFF;">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">💌 Student Love Notes</span>
        <h2 class="section-title">Loved by Campus Friends</h2>
        <p class="section-desc">Here’s what students from universities across India have to say about their Pastel Charms orders ♡</p>
      </div>

      <div class="reviews-grid">
        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">"Ordered custom name bracelets for me and my roommate! They arrived in the cutest little pastel bag with free stickers. The beads are so high quality and fit perfectly ♡"</p>
          <div class="review-user-row">
            <div class="review-avatar">🌸</div>
            <div>
              <div class="review-name">Ananya S.</div>
              <div class="review-college">🎓 Delhi University, Miranda House</div>
            </div>
          </div>
        </div>

        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">"The pipe cleaner tulip bouquet is sitting on my study table and it makes me smile every day. Never dying flowers are the best thing for a lazy college student!"</p>
          <div class="review-user-row">
            <div class="review-avatar">🌷</div>
            <div>
              <div class="review-name">Rhea M.</div>
              <div class="review-college">🎓 Christ University, Bangalore</div>
            </div>
          </div>
        </div>

        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">"Gave the Bestie Sunshine hamper to my friend for her birthday. She literally cried happy tears! Super affordable and so much love put into the packaging."</p>
          <div class="review-user-row">
            <div class="review-avatar">✨</div>
            <div>
              <div class="review-name">Tanvi K.</div>
              <div class="review-college">🎓 Mithibai College, Mumbai</div>
            </div>
          </div>
        </div>

        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p class="review-text">"Got the Black & Silver minimalist bracelet. Very clean, fits comfortably, and got delivered to hostel 14 within 24 hours. Highly recommended!"</p>
          <div class="review-user-row">
            <div class="review-avatar">🖤</div>
            <div>
              <div class="review-name">Aarav P.</div>
              <div class="review-college">🎓 IIT Bombay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Instagram -->
  <section class="section-padding">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">📸 @pastelcharms.crafts</span>
        <h2 class="section-title">Follow Our Craft Journey</h2>
        <p class="section-desc">Peek into our workbench! Tag us in your dorm room photos with #PastelCharms to get featured.</p>
      </div>

      <div class="insta-grid">
        <div class="insta-card">
          <img src="https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=600&q=80" alt="Pastel Charms Instagram Post" loading="lazy">
          <div class="insta-overlay">
            <div class="insta-likes">❤️ 342 likes</div>
            <p class="insta-caption">Fresh batch of custom name bracelets heading to North Campus today! Which color palette is your fav? ♡✨</p>
          </div>
        </div>
        <div class="insta-card">
          <img src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80" alt="Pastel Charms Instagram Post" loading="lazy">
          <div class="insta-overlay">
            <div class="insta-likes">❤️ 489 likes</div>
            <p class="insta-caption">Fuzzy pipe cleaner daisies blooming in pastel pink & sunshine yellow 🌸 Forever flowers for your soulmate.</p>
          </div>
        </div>
        <div class="insta-card">
          <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80" alt="Pastel Charms Instagram Post" loading="lazy">
          <div class="insta-overlay">
            <div class="insta-likes">❤️ 295 likes</div>
            <p class="insta-caption">Evil eye protection on deck ✨ Keeping away all negative exam energy!</p>
          </div>
        </div>
        <div class="insta-card">
          <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80" alt="Pastel Charms Instagram Post" loading="lazy">
          <div class="insta-overlay">
            <div class="insta-likes">❤️ 512 likes</div>
            <p class="insta-caption">Crimson & Blush ribbon roses folded petal-by-petal. Who would you gift this to? 🌹</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 2.5rem;">
        <a href="https://instagram.com" target="_blank" class="btn btn-secondary">
          Follow on Instagram 📷
        </a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="container" style="margin-bottom: 5rem;">
    <div class="cta-banner-wrap">
      <h2 class="cta-title">Looking for a sweet gift for your bestie? 🌸</h2>
      <p class="cta-desc">
        Whether it's a birthday, friendship day, exam cheer-up, or just a little self-love treat, we’ll make it unforgettable with cute packaging and handwritten notes.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="customize.html" class="btn btn-primary" style="padding: 1rem 2.2rem;">
          Make a Custom Bracelet ♡
        </a>
        <a href="https://wa.me/919876543210?text=Hi%20Pastel%20Charms!%20I%20want%20to%20order%20handmade%20crafts%20♡" target="_blank" class="btn btn-secondary" style="padding: 1rem 2.2rem;">
          Message on WhatsApp 💬
        </a>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="section-padding" id="about" style="background: #FFFFFF;">
    <div class="container about-grid">
      <div class="about-img-frame">
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" 
             alt="Handcrafted creations workbench at Pastel Charms">
      </div>
      <div>
        <span class="section-subtitle-pill">🎀 Our Small Studio Story</span>
        <h2 class="section-title" style="text-align: left; margin-bottom: 1.2rem;">
          Crafted by Hand, Straight from the Heart ♡
        </h2>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
          <strong>Pastel Charms</strong> started as a cozy dorm desk passion project by college students who loved making handmade bracelets and fuzzy pipe cleaner flowers for friends.
        </p>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
          We believe that gifts shouldn't be expensive to be meaningful. Every bracelet is strung with high-grade elastic, every tulip is hand-bent with plush chenille stems, and every ribbon rose is folded petal-by-petal. Packaged in sweet pastel bags with complimentary stickers, our crafts are made to brighten your day and celebrate campus friendships.
        </p>
        <div class="about-perk-pills">
          <div class="about-pill"><span>💎</span> 100% Custom Lettering</div>
          <div class="about-pill"><span>🌷</span> Flowers That Never Wilt</div>
          <div class="about-pill"><span>💰</span> Student Budget Friendly</div>
          <div class="about-pill"><span>🎁</span> Free Gift Packaging</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="section-padding" id="contact">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-subtitle-pill">💌 Get in Touch</span>
        <h2 class="section-title">How to Reach Us</h2>
        <p class="section-desc">Have a custom bulk order for college fest, a birthday question, or want free campus handoff? We'd love to hear from you!</p>
      </div>

      <div class="contact-cards-grid">
        <div class="contact-card">
          <div class="contact-icon">💬</div>
          <h3>WhatsApp Us</h3>
          <p>Instant replies for custom requests, photo proof of charms, and quick campus coordination.</p>
          <a href="https://wa.me/919876543210?text=Hi%20Pastel%20Charms!%20I%20would%20like%20to%20order%20some%20handmade%20crafts%20♡" 
             target="_blank" class="btn btn-primary btn-sm btn-block">
            Message on WhatsApp
          </a>
        </div>

        <div class="contact-card">
          <div class="contact-icon">📸</div>
          <h3>Instagram</h3>
          <p>Follow our reels, sneak peeks of new charms, customer unboxings, and campus pop-ups.</p>
          <a href="https://instagram.com" target="_blank" class="btn btn-secondary btn-sm btn-block">
            Follow @pastelcharms.crafts
          </a>
        </div>

        <div class="contact-card">
          <div class="contact-icon">🎓</div>
          <h3>Campus Delivery</h3>
          <p>Free direct handoff at college gates, hostel blocks, and canteens across partner campuses.</p>
          <a href="checkout.html" class="btn btn-outline btn-sm btn-block">
            View Order Form
          </a>
        </div>
      </div>
    </div>
  </section>

{footer}

</body>
</html>"""
    pathlib.Path("index.html").write_text(html, encoding="utf-8")
    print("Generated index.html")

print("Defined build_index")
def build_shop():
    all_cards = "\n".join([render_card(p) for p in PRODUCTS])
    header = render_header("shop")
    footer = render_footer()
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop All Crafts ♡ Pastel Charms</title>
  <meta name="description" content="Browse our full collection of handmade bracelets, pipe cleaner flowers, ribbon roses, and custom gift hampers in ₹.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛍️</text></svg>">
</head>
<body>

{header}

  <main class="container section-padding" style="padding-top: 3rem;">
    <div class="section-title-wrap">
      <span class="section-subtitle-pill">🌸 Full Craft Catalog</span>
      <h1 class="section-title">The Pastel Collection</h1>
      <p class="section-desc">Handmade bracelets, everlasting flowers, and thoughtful gifts starting from just ₹35.</p>
    </div>

    <!-- Category Filter Bar (Anchor navigation) -->
    <div class="shop-filter-bar-wrap">
      <div class="category-filter-chips">
        <a href="shop.html" class="filter-chip active">✨ All Cute Things (12)</a>
        <a href="#bracelets" class="filter-chip">💎 Bracelets (4)</a>
        <a href="#pipe-flowers" class="filter-chip">🌸 Pipe Cleaner Flowers (3)</a>
        <a href="#roses" class="filter-chip">🌹 Handmade Roses (2)</a>
        <a href="#custom-gifts" class="filter-chip">🎀 Custom Gifts (2)</a>
        <a href="#crafts" class="filter-chip">✨ Other Crafts (1)</a>
      </div>
      <a href="customize.html" class="btn btn-secondary btn-sm">
        Build Custom Name Bracelet 💎
      </a>
    </div>

    <!-- All 12 Products -->
    <div class="products-grid">
{all_cards}
    </div>
  </main>

{footer}

</body>
</html>"""
    pathlib.Path("shop.html").write_text(html, encoding="utf-8")
    print("Generated shop.html")

print("Defined build_shop")
def build_customize():
    header = render_header("customize")
    footer = render_footer()
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customize Your Bracelet ♡ Pastel Charms</title>
  <meta name="description" content="Design your dream customized name bracelet! Choose your beads, letters, charms, and place your order directly.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/customizer.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💎</text></svg>">
</head>
<body>

{header}

  <main class="container section-padding" style="padding-top: 2.5rem;">
    <div class="section-title-wrap" style="margin-bottom: 2rem;">
      <span class="section-subtitle-pill">✨ Handcrafted Workshop</span>
      <h1 class="section-title">Bracelet Customizer Studio</h1>
      <p class="section-desc">Personalize every bead, charm, and letter. Choose your options below!</p>
    </div>

    <div class="customizer-grid">
      <!-- Left Column: Visual Representation Card -->
      <div class="preview-stage-card">
        <div class="preview-badge-pill">
          <span>✨</span> Handmade Bracelet Visual
        </div>

        <div class="bracelet-canvas-container">
          <svg class="bracelet-svg-preview" viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="charm-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#CAA2B8" flood-opacity="0.35"/>
              </filter>
              <radialGradient id="pinkGrad" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stop-color="#FFE9F1"/>
                <stop offset="50%" stop-color="#FAD2E1"/>
                <stop offset="100%" stop-color="#E6A5BA"/>
              </radialGradient>
            </defs>
            <ellipse cx="180" cy="150" rx="120" ry="95" fill="none" stroke="#FDECEF" stroke-width="12" opacity="0.6"/>
            <ellipse cx="180" cy="150" rx="120" ry="95" fill="none" stroke="#E6D3CD" stroke-width="2" stroke-dasharray="3,3"/>
            
            <!-- Beads Loop -->
            <circle cx="180" cy="55" r="9" fill="url(#pinkGrad)"/>
            <circle cx="215" cy="60" r="9" fill="url(#pinkGrad)"/>
            <circle cx="250" cy="75" r="9" fill="url(#pinkGrad)"/>
            <circle cx="280" cy="102" r="9" fill="url(#pinkGrad)"/>
            <circle cx="298" cy="138" r="9" fill="url(#pinkGrad)"/>
            <circle cx="295" cy="175" r="9" fill="url(#pinkGrad)"/>
            <circle cx="275" cy="208" r="9" fill="url(#pinkGrad)"/>
            <circle cx="242" cy="232" r="9" fill="url(#pinkGrad)"/>
            
            <!-- Flanking Gold Spacer -->
            <circle cx="210" cy="242" r="7" fill="#E8B923"/>
            
            <!-- Letter Beads: P A S T E L -->
            <g transform="translate(195, 245)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">L</text>
            </g>
            <g transform="translate(175, 245)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">E</text>
            </g>
            <g transform="translate(155, 243)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">T</text>
            </g>
            <g transform="translate(135, 239)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">S</text>
            </g>
            <g transform="translate(115, 233)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">A</text>
            </g>
            <g transform="translate(95, 222)">
              <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#FFF" stroke="#E0D0C0" stroke-width="1.5"/>
              <text x="0" y="4" text-anchor="middle" font-family="'Quicksand', sans-serif" font-size="11" font-weight="900" fill="#2B2727">P</text>
            </g>
            
            <!-- Flanking Gold Spacer -->
            <circle cx="78" cy="208" r="7" fill="#E8B923"/>
            
            <circle cx="65" cy="175" r="9" fill="url(#pinkGrad)"/>
            <circle cx="62" cy="138" r="9" fill="url(#pinkGrad)"/>
            <circle cx="80" cy="102" r="9" fill="url(#pinkGrad)"/>
            <circle cx="110" cy="75" r="9" fill="url(#pinkGrad)"/>
            <circle cx="145" cy="60" r="9" fill="url(#pinkGrad)"/>

            <!-- Center Dangling Charm -->
            <g transform="translate(180, 255)">
              <circle cx="0" cy="0" r="5" fill="none" stroke="#D4AF37" stroke-width="2"/>
              <circle cx="0" cy="18" r="14" fill="#FFFFFF" stroke="#F6D6E2" stroke-width="2" filter="url(#charm-glow)"/>
              <text x="0" y="23" text-anchor="middle" font-size="16">💖</text>
            </g>
          </svg>
        </div>

        <div class="preview-details-strip">
          <div class="preview-spec-row">
            <span class="preview-spec-label">Custom Letters:</span>
            <span class="preview-spec-val">Your Choice (A-Z)</span>
          </div>
          <div class="preview-spec-row">
            <span class="preview-spec-label">Bead Palettes:</span>
            <span class="preview-spec-val">7 Pastel Options</span>
          </div>
          <div class="preview-spec-row">
            <span class="preview-spec-label">Charm Options:</span>
            <span class="preview-spec-val">Heart, Evil Eye, Daisy, Butterfly</span>
          </div>
          <div class="preview-spec-row">
            <span class="preview-spec-label">Starting Price:</span>
            <span class="preview-spec-val" style="color: var(--pastel-rose);">₹50</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Pure HTML Form -->
      <div class="customizer-form-card">
        <form action="checkout.html" method="GET">
          <!-- Step 1 -->
          <section class="form-step-section">
            <div class="form-step-header">
              <span class="step-num">1</span>
              <h3>Name or Initials</h3>
              <span class="step-hint">Up to 10 letters</span>
            </div>
            <div class="form-group">
              <input type="text" name="custom_name" class="form-input" placeholder="e.g. ANANYA, BESTIES, LOVE" maxlength="10" style="text-transform: uppercase; font-weight: 700; letter-spacing: 2px;" required>
            </div>
          </section>

          <!-- Step 2 -->
          <section class="form-step-section">
            <div class="form-step-header">
              <span class="step-num">2</span>
              <h3>Bead Color Palette</h3>
            </div>
            <div class="option-cards-grid">
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Blush Pink" checked>
                <div class="option-icon-swatch swatch-pink">🌸</div>
                <span class="option-name">Blush Pink</span>
                <span class="option-price-tag">Standard</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Lavender">
                <div class="option-icon-swatch swatch-lavender">💜</div>
                <span class="option-name">Lavender</span>
                <span class="option-price-tag">Standard</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Mint Frost">
                <div class="option-icon-swatch swatch-mint">🌱</div>
                <span class="option-name">Mint Frost</span>
                <span class="option-price-tag">Standard</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Buttercream">
                <div class="option-icon-swatch swatch-butter">🌼</div>
                <span class="option-name">Buttercream</span>
                <span class="option-price-tag">Standard</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Pearl Glow">
                <div class="option-icon-swatch swatch-pearl">✨</div>
                <span class="option-name">Pearl Glow</span>
                <span class="option-price-tag">Standard</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="bead_color" value="Midnight Black">
                <div class="option-icon-swatch swatch-black">🖤</div>
                <span class="option-name">Midnight</span>
                <span class="option-price-tag">Standard</span>
              </label>
            </div>
          </section>

          <!-- Step 3 -->
          <section class="form-step-section">
            <div class="form-step-header">
              <span class="step-num">3</span>
              <h3>Letter Bead Style</h3>
            </div>
            <div class="option-cards-grid" style="grid-template-columns: repeat(3, 1fr);">
              <label class="option-radio-label">
                <input type="radio" name="letter_style" value="White with Black Text" checked>
                <div style="font-size: 1.3rem; font-weight: 900; color: #333;">[A]</div>
                <span class="option-name">White & Black</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="letter_style" value="White with Gold Text">
                <div style="font-size: 1.3rem; font-weight: 900; color: #D4AF37;">[A]</div>
                <span class="option-name">White & Gold</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="letter_style" value="Pastel Rainbow">
                <div style="font-size: 1.3rem; font-weight: 900; color: #D46A85;">[A]</div>
                <span class="option-name">Pastel Mix</span>
              </label>
            </div>
          </section>

          <!-- Step 4 -->
          <section class="form-step-section">
            <div class="form-step-header">
              <span class="step-num">4</span>
              <h3>Dangle Charm</h3>
            </div>
            <div class="option-cards-grid">
              <label class="option-radio-label">
                <input type="radio" name="charm" value="Puff Heart (+Rs 10)" checked>
                <span style="font-size: 1.4rem;">💖</span>
                <span class="option-name">Puff Heart</span>
                <span class="option-price-tag">+₹10</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="charm" value="Evil Eye (+Rs 15)">
                <span style="font-size: 1.4rem;">🧿</span>
                <span class="option-name">Evil Eye</span>
                <span class="option-price-tag">+₹15</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="charm" value="Daisy (+Rs 10)">
                <span style="font-size: 1.4rem;">🌼</span>
                <span class="option-name">Daisy</span>
                <span class="option-price-tag">+₹10</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="charm" value="Butterfly (+Rs 15)">
                <span style="font-size: 1.4rem;">🦋</span>
                <span class="option-name">Butterfly</span>
                <span class="option-price-tag">+₹15</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="charm" value="Teddy Bear (+Rs 15)">
                <span style="font-size: 1.4rem;">🧸</span>
                <span class="option-name">Gummy Bear</span>
                <span class="option-price-tag">+₹15</span>
              </label>
              <label class="option-radio-label">
                <input type="radio" name="charm" value="No Charm (+Rs 0)">
                <span style="font-size: 1.4rem;">🚫</span>
                <span class="option-name">No Charm</span>
                <span class="option-price-tag">+₹0</span>
              </label>
            </div>
          </section>

          <!-- Step 5 -->
          <section class="form-step-section">
            <div class="form-step-header">
              <span class="step-num">5</span>
              <h3>Special Request & Wrist Size</h3>
            </div>
            <div class="form-group">
              <input type="text" name="custom_notes" class="form-input" placeholder="e.g. Small wrist size (15cm), gift for friend's birthday...">
            </div>
          </section>

          <!-- Summary & Submit -->
          <div class="customizer-summary-card">
            <div class="summary-price-row">
              <div>
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary);">Starting Base Price</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-dark);">₹50 - ₹65</div>
              </div>
              <div style="text-align: right;">
                <span class="badge badge-accent">Handmade to Order</span>
              </div>
            </div>

            <div class="summary-items-breakdown">
              ✨ Includes custom letter beads, high-tensile stretch cord, pastel pouch packaging, and free stickers!
            </div>

            <button type="submit" class="btn btn-primary btn-block" style="padding: 1.1rem; font-size: 1.05rem;">
              Proceed to Order Form →
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>

{footer}

</body>
</html>"""
    pathlib.Path("customize.html").write_text(html, encoding="utf-8")
    print("Generated customize.html")

print("Defined build_customize")
def build_checkout():
    header = render_header("checkout")
    footer = render_footer()
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Campus Order Form ♡ Pastel Charms</title>
  <meta name="description" content="Simple student-friendly order checkout for Pastel Charms handmade crafts. Free campus handoff!">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>">
</head>
<body>

{header}

  <main class="container section-padding" style="padding-top: 2.5rem;">
    <div class="section-title-wrap" style="margin-bottom: 2rem;">
      <span class="section-subtitle-pill">🌸 Campus Order Form</span>
      <h1 class="section-title">Complete Your Order</h1>
      <p class="section-desc">Quick & easy student order placement. We'll hand-make your treasures and coordinate handoff with you!</p>
    </div>

    <div class="checkout-grid">
      <!-- Left Column: Student Details Form -->
      <div class="checkout-card">
        <div class="checkout-card-header">
          <h2>Student & Delivery Details</h2>
          <p>Tell us where on campus to hand off your handmade order ♡</p>
        </div>

        <form action="https://wa.me/919876543210" method="GET" target="_blank">
          <div class="form-group">
            <label for="order-name" class="form-label">Full Name <span class="required">*</span></label>
            <input type="text" id="order-name" name="name" class="form-input" placeholder="e.g. Ananya Sharma" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label for="order-phone" class="form-label">WhatsApp Number <span class="required">*</span></label>
              <input type="tel" id="order-phone" name="phone" class="form-input" placeholder="e.g. 9876543210" required>
            </div>

            <div class="form-group">
              <label for="order-email" class="form-label">Email Address (optional)</label>
              <input type="email" id="order-email" name="email" class="form-input" placeholder="e.g. ananya@college.edu">
            </div>
          </div>

          <div class="form-group">
            <label for="order-college" class="form-label">College / University <span class="required">*</span></label>
            <select id="order-college" name="college" class="form-select" required>
              <option value="" disabled selected>Select your College / University 🎓</option>
              <option value="Delhi University (North / South Campus)">Delhi University (North / South Campus)</option>
              <option value="IIT Delhi / IIT Bombay / IIT Madras">IIT Delhi / IIT Bombay / IIT Madras</option>
              <option value="BITS Pilani / Goa / Hyderabad">BITS Pilani / Goa / Hyderabad</option>
              <option value="Christ University, Bangalore">Christ University, Bangalore</option>
              <option value="Manipal Academy of Higher Education (MAHE)">Manipal Academy of Higher Education (MAHE)</option>
              <option value="SRM University / VIT Vellore / Chennai">SRM University / VIT Vellore / Chennai</option>
              <option value="Mumbai University & Mithibai / NMIMS">Mumbai University & Mithibai / NMIMS</option>
              <option value="Symbiosis International University, Pune">Symbiosis International University, Pune</option>
              <option value="St. Xavier's College">St. Xavier's College</option>
              <option value="Ashoka University">Ashoka University</option>
              <option value="Amity University">Amity University</option>
              <option value="Other / Local College">Other / Local College (Specify in spot)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="order-location" class="form-label">Campus Delivery Spot <span class="required">*</span></label>
            <input type="text" id="order-location" name="location" class="form-input" placeholder="e.g. Girls Hostel Block B, Main Canteen, Gate 3..." required>
            <span class="form-hint">Where on campus is most convenient for handoff?</span>
          </div>

          <div class="form-group">
            <label for="order-items" class="form-label">Products to Order & Customization Notes <span class="required">*</span></label>
            <textarea id="order-items" name="order_details" class="form-textarea" rows="3" placeholder="e.g. 1x Custom Name Bracelet ('ANANYA' in Blush Pink with Heart charm), 1x Pipe Cleaner Tulip Bouquet" required></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Payment Preference</label>
            <div class="payment-options-grid">
              <label class="payment-option-pill">
                <input type="radio" name="payment_choice" value="Cash on Campus Delivery" checked>
                <span>Pay on Delivery (Cash / UPI)</span>
              </label>
              <label class="payment-option-pill">
                <input type="radio" name="payment_choice" value="Instant UPI via WhatsApp">
                <span>UPI via WhatsApp</span>
              </label>
            </div>
          </div>

          <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <button type="submit" class="btn btn-primary btn-block" style="padding: 1.1rem; font-size: 1.05rem;">
              Place Order on WhatsApp ♡
            </button>
            <a href="https://wa.me/919876543210?text=Hi%20Pastel%20Charms!%20I%20want%20to%20place%20an%20order%20♡" target="_blank" class="btn btn-secondary btn-block">
              💬 Direct WhatsApp Chat
            </a>
          </div>
        </form>
      </div>

      <!-- Right Column: Order Summary Card -->
      <div>
        <div class="checkout-card" style="position: sticky; top: 100px;">
          <div class="checkout-card-header" style="display: flex; justify-content: space-between; align-items: baseline;">
            <h2>Popular Items</h2>
            <a href="shop.html" style="font-size: 0.85rem; color: var(--pastel-rose); font-weight: 700;">View All</a>
          </div>

          <div class="checkout-item-row">
            <div class="checkout-item-left">
              <div class="checkout-item-thumb">
                <img src="https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=120&q=80" alt="Custom Name Bead Bracelet">
              </div>
              <div>
                <div class="checkout-item-title">Custom Name Bracelet</div>
                <div class="checkout-item-specs">Letters + Pastel Beads + Charm</div>
              </div>
            </div>
            <div class="checkout-item-price">₹50</div>
          </div>

          <div class="checkout-item-row">
            <div class="checkout-item-left">
              <div class="checkout-item-thumb">
                <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=120&q=80" alt="Pipe Cleaner Tulip Bouquet">
              </div>
              <div>
                <div class="checkout-item-title">Fluffy Tulip Bouquet</div>
                <div class="checkout-item-specs">3 Everlasting Velvet Tulips</div>
              </div>
            </div>
            <div class="checkout-item-price">₹75</div>
          </div>

          <div class="checkout-item-row">
            <div class="checkout-item-left">
              <div class="checkout-item-thumb">
                <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=120&q=80" alt="Handmade Ribbon Rose">
              </div>
              <div>
                <div class="checkout-item-title">Handmade Ribbon Rose</div>
                <div class="checkout-item-specs">Folded Satin Keepsake Rose</div>
              </div>
            </div>
            <div class="checkout-item-price">₹35</div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-light);">
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.8rem; color: var(--text-secondary);">
              <span>Campus Delivery:</span>
              <span style="font-weight: 700; color: #2F7A5E;">FREE 🌸</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--text-dark); padding-top: 0.8rem; border-top: 1px dashed var(--border-light);">
              <span>Payment:</span>
              <span style="color: var(--pastel-rose);">Cash / UPI on Handoff</span>
            </div>
          </div>

          <div style="background: #FAF7F2; border-radius: 16px; padding: 1rem; margin-top: 1.5rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
            🌸 <strong>Handmade Promise:</strong> Every piece is carefully assembled and packed with complimentary aesthetic stickers. We'll message you on WhatsApp to confirm timing!
          </div>
        </div>
      </div>
    </div>
  </main>

{footer}

</body>
</html>"""
    pathlib.Path("checkout.html").write_text(html, encoding="utf-8")
    print("Generated checkout.html")

# Run all
build_index()
build_shop()
build_customize()
build_checkout()

# Sync to other locations
destinations = [
    r"C:\Users\ACER\OneDrive\Desktop\pastel-charms",
    r"C:\Users\ACER\.gemini\antigravity\scratch\pastel-charms"
]

for d in destinations:
    try:
        shutil.copytree(".", d, dirs_exist_ok=True)
        print(f"Synced to {d}")
    except Exception as e:
        print(f"Sync error for {d}: {e}")

print("All Pure HTML & CSS pages generated and synced successfully!")
