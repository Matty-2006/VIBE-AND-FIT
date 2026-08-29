/* ═══════════════════════════════════════════
   VELURE — Hero Slideshow
   ═══════════════════════════════════════════ */

import { SLIDES } from './data.js';

let current = 0;
let timer = null;

export function initHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    /* Build slides */
    hero.innerHTML = SLIDES.map((s, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}">
            <img src="${s.image}" alt="${s.tag}">
            <div class="hero-overlay"></div>
        </div>
    `).join('') + `
        <div class="hero-content">
            <div class="hero-tag">${SLIDES[0].tag}</div>
            <h1 class="hero-title">${SLIDES[0].title}</h1>
            <p class="hero-subtitle">${SLIDES[0].subtitle}</p>
            <a href="#productos" class="hero-cta">
                Explorar Colección
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
        <div class="hero-dots">
            ${SLIDES.map((_, i) => `<button data-slide="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i+1}"></button>`).join('')}
        </div>
        <div class="hero-scroll">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    `;

    /* Dot click */
    hero.querySelectorAll('.hero-dots button').forEach(btn => {
        btn.addEventListener('click', () => {
            goTo(+btn.dataset.slide);
            resetTimer();
        });
    });

    startTimer();
}

function goTo(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hero-dots button');
    const content = document.querySelector('.hero-content');

    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    /* Update text with fade */
    content.style.opacity = 0;
    setTimeout(() => {
        content.querySelector('.hero-tag').textContent      = SLIDES[current].tag;
        content.querySelector('.hero-title').textContent    = SLIDES[current].title;
        content.querySelector('.hero-subtitle').textContent = SLIDES[current].subtitle;
        content.style.opacity = 1;
    }, 400);
}

function startTimer() {
    timer = setInterval(() => {
        goTo((current + 1) % SLIDES.length);
    }, 6000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}
