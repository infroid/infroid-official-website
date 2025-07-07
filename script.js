// Preloader
window.addEventListener('load', function() {
    // Ensure minimum loading time for better UX
    const minLoadTime = 800;
    const startTime = performance.now();
    
    function hidePreloader() {
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('hidden');
            document.body.style.overflow = 'visible';
            // Trigger initial animations
            document.body.classList.add('loaded');
        }, remainingTime);
    }
    
    hidePreloader();
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initially hide body overflow for preloader
    document.body.style.overflow = 'hidden';
    
    // Update copyright year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Enhanced smooth scroll for all browsers
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        // Polyfill for browsers that don't support smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    smoothScrollTo(targetPosition, 600);
                }
            });
        });
    }
    
    // Smooth scroll function with easing
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        const startTime = performance.now();
        
        function ease(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function scroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = ease(progress);
            
            window.scrollTo(0, start + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        }
        
        requestAnimationFrame(scroll);
    }
    
    
    // Navigation background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    function updateNavOnScroll() {
        const currentScroll = window.pageYOffset || window.scrollY;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show nav on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
    
    // Throttled scroll event
    let scrollThrottle = false;
    window.addEventListener('scroll', function() {
        if (!scrollThrottle) {
            requestAnimationFrame(updateNavOnScroll);
            scrollThrottle = true;
            setTimeout(() => scrollThrottle = false, 100);
        }
    }, { passive: true });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const elementsToAnimate = [
        '.philosophy-point',
        '.product-item',
        '.innovation-card',
        '.section-header',
        '.contact-content',
        '.stat-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Simplified parallax for better performance
    const heroContent = document.querySelector('.hero-content');
    
    if (window.innerWidth > 768) {
        let lastScrollY = 0;
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            if (scrolled < window.innerHeight && scrolled !== lastScrollY) {
                const opacity = Math.max(0.2, 1 - (scrolled / window.innerHeight));
                heroContent.style.opacity = opacity;
                lastScrollY = scrolled;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
    
    
    // Smooth reveal for hero elements
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
    
    
    // Add loading state
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Stat counter animation
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateValue(stat, 0, target, 2000);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statObserver.observe(statsSection);
    }
});

// Utility function for smooth number animations
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(easeOutQuart * range + start);
        
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}