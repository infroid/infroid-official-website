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
        navToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            if (nav) nav.classList.toggle('menu-open', isOpen);
        });

        navMenu.addEventListener('click', function (event) {
            if (event.target.matches('a')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                if (nav) nav.classList.remove('menu-open');
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
