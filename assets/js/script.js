document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const themeSwitcher = document.getElementById('themeSwitcher');
    const year = document.getElementById('copyrightYear');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (nav) {
        const syncNav = function () {
            nav.classList.toggle('scrolled', window.scrollY > 12);
        };

        syncNav();
        window.addEventListener('scroll', syncNav, { passive: true });
    }

    if (navToggle && navMenu) {
        const closeMenu = function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            if (nav) nav.classList.remove('menu-open');
        };

        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            if (nav) nav.classList.toggle('menu-open', isOpen);
        });

        navMenu.addEventListener('click', function (event) {
            if (event.target.matches('a')) closeMenu();
        });

        document.addEventListener('click', function (event) {
            if (!navMenu.classList.contains('active')) return;
            if (nav.contains(event.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }
});
