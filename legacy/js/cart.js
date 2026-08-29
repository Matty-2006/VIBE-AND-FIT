/* ═══════════════════════════════════════════
   VELURE — Cart Logic
   ═══════════════════════════════════════════ */

import { PRODUCTS } from './data.js';

const STORAGE_KEY = 'velure_cart';

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function getCart() { return cart; }

export function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    save();
    renderCart();
    bumpBadge();
}

export function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    save();
    renderCart();
}

export function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) {
        removeFromCart(productId);
        return;
    }
    save();
    renderCart();
}

export function getCartTotal() {
    return cart.reduce((s, i) => s + (i.oldPrice || i.price) * i.qty, 0);
}

export function getCartCount() {
    return cart.reduce((s, i) => s + i.qty, 0);
}

/* ─── DOM helpers ─── */

function bumpBadge() {
    const badge = document.querySelector('.cart-count');
    if (!badge) return;
    badge.textContent = getCartCount();
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
}

export function renderCart() {
    const body     = document.querySelector('.cart-body');
    const footer   = document.querySelector('.cart-footer');
    const badge    = document.querySelector('.cart-count');
    const subtotal = document.querySelector('.cart-subtotal-value');
    const total    = document.querySelector('.cart-total-value');

    if (badge)    badge.textContent = getCartCount();

    if (cart.length === 0) {
        body.innerHTML = '<div class="cart-empty"><p>Tu carrito está vacío</p></div>';
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = '';

    body.innerHTML = cart.map(item => {
        const unitPrice = item.oldPrice || item.price;
        const lineTotal = unitPrice * item.qty;
        return `
            <div class="cart-item" data-id="${item.id}">
                <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price ${item.badge === 'sale' ? 'sale' : ''}">€${unitPrice}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" data-action="dec">−</button>
                        <span class="cart-qty-value">${item.qty}</span>
                        <button class="cart-qty-btn" data-action="inc">+</button>
                        <span class="cart-item-remove" data-action="remove">Eliminar</span>
                    </div>
                </div>
            </div>`;
    }).join('');

    if (subtotal) subtotal.textContent = '€' + getCartTotal().toFixed(2);
    if (total)    total.textContent    = '€' + getCartTotal().toFixed(2);

    /* Delegate events on cart items */
    body.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = +btn.closest('.cart-item').dataset.id;
            const action = btn.dataset.action;
            if (action === 'inc') updateQty(id, 1);
            if (action === 'dec') updateQty(id, -1);
        });
    });
    body.querySelectorAll('.cart-item-remove').forEach(el => {
        el.addEventListener('click', () => {
            const id = +el.closest('.cart-item').dataset.id;
            removeFromCart(id);
        });
    });
}

export function toggleCart(open) {
    const sidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    if (open) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}
