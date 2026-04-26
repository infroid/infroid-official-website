document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const themeSwitcher = document.getElementById('themeSwitcher');
    const year = document.getElementById('copyrightYear');
    const contactForm = document.getElementById('contactForm');
    const topicButtons = document.querySelectorAll('[data-topic]');
    const topicInput = document.getElementById('topicInput');

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

    if (topicButtons.length && topicInput) {
        const urlTopic = new URLSearchParams(window.location.search).get('topic');
        const initial = urlTopic || topicInput.value;

        topicButtons.forEach(function (button) {
            const isActive = button.dataset.topic === initial;
            button.classList.toggle('active', isActive);
            if (isActive) topicInput.value = button.dataset.topic;

            button.addEventListener('click', function () {
                topicButtons.forEach(function (other) {
                    other.classList.remove('active');
                });
                button.classList.add('active');
                topicInput.value = button.dataset.topic;
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const data = new FormData(contactForm);
            const subject = 'Infroid: ' + (data.get('topic') || 'Contact');
            const body = [
                'Name: ' + (data.get('name') || ''),
                'Email: ' + (data.get('email') || ''),
                'Company: ' + (data.get('company') || ''),
                '',
                data.get('message') || ''
            ].join('\n');

            window.location.href = 'mailto:hello@infroid.in?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent(body);

            contactForm.classList.add('sent');
        });
    }
});
