/* ═══════════════════════════════════════════
   VELURE — Main Entry
   ═══════════════════════════════════════════ */

import { initHero }        from './hero.js';
import { initNavigation }  from './navigation.js';
import { initProducts }    from './products.js';
import { initScrollReveal } from './scroll-reveal.js';
import { renderCart, toggleCart, getCartCount } from './cart.js';
import { CATEGORIES, TESTIMONIALS, STATS, INSTAGRAM } from './data.js';

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initNavigation();
    initProducts();
    initScrollReveal();
    renderDynamicSections();
    renderCart();
    bindCartUI();
});

/* ─── Build dynamic HTML sections from data ─── */
function renderDynamicSections() {

    /* Categories */
    const catGrid = document.querySelector('.cat-grid');
    if (catGrid) {
        catGrid.innerHTML = CATEGORIES.map(c => `
            <a href="#productos" class="cat-card reveal">
                <img src="${c.image}" alt="${c.name}" loading="lazy">
                <div class="cat-card-overlay"></div>
                <div class="cat-card-text">
                    <h3>${c.name}</h3>
                    <span>${c.count} piezas</span>
                </div>
            </a>`
        ).join('');
    }

    /* Testimonials */
    const testiGrid = document.querySelector('.testimonials-grid');
    if (testiGrid) {
        testiGrid.innerHTML = TESTIMONIALS.map(t => `
            <div class="testi-card reveal">
                <p class="testi-text">${t.text}</p>
                <div class="testi-stars">${'★'.repeat(t.stars)}</div>
                <div class="testi-author">${t.author}</div>
                <div class="testi-role">${t.role}</div>
            </div>`
        ).join('');
    }

    /* Stats */
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = STATS.map(s => `
            <div class="stat-item reveal">
                <div class="stat-number">${s.number}</div>
                <div class="stat-label">${s.label}</div>
            </div>`
        ).join('');
    }

    /* Instagram */
    const instaGrid = document.querySelector('.insta-grid');
    if (instaGrid) {
        instaGrid.innerHTML = INSTAGRAM.map(src => `
            <div class="insta-item">
                <img src="${src}" alt="Instagram" loading="lazy">
            </div>`
        ).join('');
    }

    /* Re-observe new reveals */
    initScrollReveal();
}

/* ─── Cart sidebar open/close ─── */
function bindCartUI() {
    const cartBtn  = document.querySelector('.cart-btn');
    const cartClose = document.querySelector('.cart-close');
    const cartOver = document.querySelector('.cart-overlay');
    const continueBtn = document.querySelector('.cart-continue');

    cartBtn?.addEventListener('click', () => toggleCart(true));
    cartClose?.addEventListener('click', () => toggleCart(false));
    cartOver?.addEventListener('click', () => toggleCart(false));
    continueBtn?.addEventListener('click', () => toggleCart(false));

    /* Newsletter */
    const nlForm = document.querySelector('.newsletter-form');
    nlForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = nlForm.querySelector('input').value;
        if (email) {
            alert('¡Gracias por suscribirte! Recibirás nuestras novedades en ' + email);
            nlForm.querySelector('input').value = '';
        }
    });
}
