// ==========================================
// Pastel Charms - UI Enhancement Animations
// Scroll reveals, sparkle trails, button ripples, etc.
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-triggered fade-in animations
  initScrollReveal();
  
  // 2. Button ripple/shine effect
  initButtonEffects();
  
  // 3. Hero sparkle trail
  initHeroSparkles();
  
  // 4. Smooth counter animation for stats
  initCounterAnimations();
  
  // 5. Parallax floating stickers
  initParallaxStickers();
  
  // 6. Nav shrink on scroll
  initNavScrollEffect();
});

// --- Scroll Reveal (Intersection Observer) ---
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.category-card, .product-card, .why-card, .review-card, .insta-card, .contact-card, ' +
    '.about-img-frame, .about-pill, .section-title-wrap, .cta-banner-wrap, .checkout-card'
  );
  
  if (!revealEls.length) return;
  
  // Add initial state
  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(i % 6 * 0.08, 0.4)}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(i % 6 * 0.08, 0.4)}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// --- Button Ripple/Shine ---
function initButtonEffects() {
  document.addEventListener('mousemove', (e) => {
    const btn = e.target.closest('.btn');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--x', x + '%');
      btn.style.setProperty('--y', y + '%');
    }
  });
}

// --- Hero Sparkle Trail ---
function initHeroSparkles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  
  let sparkleCount = 0;
  const maxSparkles = 12;
  
  hero.addEventListener('mousemove', (e) => {
    if (sparkleCount >= maxSparkles) return;
    if (Math.random() > 0.88) return; // Throttle
    
    sparkleCount++;
    const dot = document.createElement('div');
    dot.className = 'hero-sparkle-dot';
    dot.style.left = e.pageX + 'px';
    dot.style.top = e.pageY + 'px';
    
    // Random size and color
    const size = 4 + Math.random() * 6;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    
    const colors = ['#FAD2E1', '#E8DFF5', '#FDE2B8', '#CBE8DE', '#D6ECFA', '#FFE4EC'];
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(dot);
    
    setTimeout(() => {
      dot.remove();
      sparkleCount--;
    }, 1200);
  });
}

// --- Counter Animations ---
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count-to'), 10);
        animateValue(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
}

function animateValue(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// --- Parallax Floating Stickers ---
function initParallaxStickers() {
  const stickers = document.querySelectorAll('.floating-sticker');
  if (!stickers.length) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    stickers.forEach((sticker, i) => {
      const speed = 0.015 * (i + 1);
      const yOffset = scrollY * speed;
      sticker.style.transform = `translateY(${-yOffset}px)`;
    });
  }, { passive: true });
}

// --- Nav Shrink on Scroll ---
function initNavScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScrollY = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        if (lastScrollY > 60) {
          header.style.boxShadow = '0 4px 20px rgba(210, 180, 195, 0.15)';
          header.querySelector('.nav-container').style.height = '62px';
        } else {
          header.style.boxShadow = '0 1px 12px rgba(210, 180, 195, 0.08)';
          header.querySelector('.nav-container').style.height = '76px';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Smooth transition on nav-container height
  const navContainer = header.querySelector('.nav-container');
  if (navContainer) {
    navContainer.style.transition = 'height 0.3s ease';
  }
}

// Export
if (typeof window !== 'undefined') {
  window.initScrollReveal = initScrollReveal;
}
