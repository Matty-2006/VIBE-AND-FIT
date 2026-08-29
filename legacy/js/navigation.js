/* ═══════════════════════════════════════════
   VELURE — Navigation Logic
   ═══════════════════════════════════════════ */

export function initNavigation() {
    const nav       = document.querySelector('.nav');
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.nav-search');
    const searchClose = searchBox?.querySelector('.search-close');
    const mobileBtn  = document.querySelector('.nav-mobile-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = mobileMenu?.querySelector('.mm-close');
    const mobileOver = document.querySelector('.mobile-overlay');

    /* Sticky shadow */
    window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* Search toggle */
    searchBtn?.addEventListener('click', () => searchBox?.classList.add('active'));
    searchClose?.addEventListener('click', () => {
        searchBox?.classList.remove('active');
        searchBox?.querySelector('input')?.blur();
    });

    /* Mobile menu */
    mobileBtn?.addEventListener('click', () => {
        mobileMenu?.classList.add('active');
        mobileOver?.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMobile = () => {
        mobileMenu?.classList.remove('active');
        mobileOver?.classList.remove('active');
        document.body.style.overflow = '';
    };
    mobileClose?.addEventListener('click', closeMobile);
    mobileOver?.addEventListener('click', closeMobile);

    /* Announcement bar close */
    document.querySelector('.bar-close')?.addEventListener('click', () => {
        const bar = document.querySelector('.announcement-bar');
        bar?.style.setProperty('height', '0', 'important');
        bar?.style.setProperty('overflow', 'hidden');
        bar?.style.transition = 'height .4s ease';
    });
}
