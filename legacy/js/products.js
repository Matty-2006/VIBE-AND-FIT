/* ═══════════════════════════════════════════
   VELURE — Products Rendering & Tabs
   ═══════════════════════════════════════════ */

import { PRODUCTS } from './data.js';
import { addToCart } from './cart.js';

let activeTab = 'all';

export function initProducts() {
    renderTabs();
    renderGrid(activeTab);

    /* Delegate add-to-cart clicks */
    document.querySelector('.product-grid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-add]');
        if (btn) addToCart(+btn.dataset.add);
    });
}

function renderTabs() {
    const tabContainer = document.querySelector('.product-tabs');
    if (!tabContainer) return;

    const tabs = [
        { key: 'all',  label: 'Todos' },
        { key: 'new',  label: 'Nuevos' },
        { key: 'best', label: 'Más Vendidos' },
        { key: 'sale', label: 'Rebajas' },
    ];

    tabContainer.innerHTML = tabs.map(t =>
        `<button data-tab="${t.key}" class="${t.key === activeTab ? 'active' : ''}">${t.label}</button>`
    ).join('');

    tabContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-tab]');
        if (!btn) return;
        activeTab = btn.dataset.tab;
        tabContainer.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
        renderGrid(activeTab);
    });
}

function renderGrid(tab) {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    const filtered = tab === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.tags.includes(tab));

    grid.innerHTML = filtered.map(p => `
        <div class="product-card reveal">
            <a href="pages/product-detail.html?id=${p.id}" class="product-link">
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                    ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'new' ? 'Nuevo' : 'Rebajas'}</span>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-name">${p.name}</div>
                    <div class="product-category-label">${p.category}</div>
                    <div class="product-prices">
                        <span class="product-price ${p.badge === 'sale' ? 'sale' : ''}">€${p.price}</span>
                        ${p.oldPrice ? `<span class="product-old-price">€${p.oldPrice}</span>` : ''}
                    </div>
                    <div class="product-colors">
                        ${p.colors.map(c => `<span style="background:${c}"></span>`).join('')}
                    </div>
                </div>
            </a>
            <div class="product-actions">
                <button data-add="${p.id}" title="Añadir al carrito">🛍</button>
                <button title="Favorito">♡</button>
            </div>
        </div>
    `).join('');

    /* Re-observe new .reveal elements */
    import('./scroll-reveal.js').then(m => m.initScrollReveal());
}
