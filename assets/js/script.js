// Preloader with enhanced animation
window.addEventListener('load', function() {
    // Ensure minimum loading time for animation
    const minLoadTime = 1500;
    const startTime = performance.now();
    
    function hidePreloader() {
        const elapsedTime = performance.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            preloader.classList.add('hiding');
            
            // Add loaded class to body for content animations
            document.body.classList.add('loaded');
            
            // Remove preloader after animation completes
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 1000);
        }, remainingTime);
    }
    
    hidePreloader();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If user has a saved preference, use it
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        // If no saved preference and system prefers light, set light theme
        document.documentElement.setAttribute('data-theme', 'light');
    }
    // Otherwise, default to dark theme (no attribute needed)
}

// Initialize theme before DOM loads to prevent flash
initTheme();

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initially hide body overflow for preloader
    document.body.style.overflow = 'hidden';
    
    // Update copyright year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Theme Switcher
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
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
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const rippleX = e.clientX - rect.left;
            const rippleY = e.clientY - rect.top;
            
            this.style.setProperty('--ripple-x', rippleX + 'px');
            this.style.setProperty('--ripple-y', rippleY + 'px');
            
            // Force animation restart
            this.classList.remove('ripple');
            void this.offsetWidth; // Trigger reflow
            this.classList.add('ripple');
            
            setTimeout(() => {
                this.classList.remove('ripple');
            }, 600);
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
    
    
    // Simplified navigation hide/show on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
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
    
    // Parallax effect for sections
    const parallaxElements = document.querySelectorAll('.section-title, .product-item, .value-block');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            const rect = element.getBoundingClientRect();
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                element.style.transform = `translateY(${yPos * 0.1}px)`;
            }
        });
    }, { passive: true });
    
    // Add fade-in class to elements
    const elementsToAnimate = [
        '.philosophy-point',
        '.product-item',
        '.value-block',
        '.stat-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    // Staggered reveal for lists
    const staggerContainers = document.querySelectorAll('.philosophy-points, .values-showcase, .products-showcase');
    staggerContainers.forEach(container => {
        container.classList.add('stagger-reveal');
    });
    
    // 3D tilt effect for cards (desktop only)
    if (window.innerWidth > 768) {
        const tiltCards = document.querySelectorAll('.product-item, .value-block');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = (mouseY / (rect.height / 2)) * -5;
                const rotateY = (mouseX / (rect.width / 2)) * 5;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                this.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
    }
    
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
    
    
    // Hero elements are now revealed via the loaded class animation
    
    // Mouse movement effect for hero
    const heroSection = document.querySelector('.hero');
    const heroContentElement = document.querySelector('.hero-content');
    
    if (heroSection && heroContentElement && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            heroContentElement.style.transform = `
                perspective(1000px)
                rotateY(${mouseX * 5}deg)
                rotateX(${-mouseY * 5}deg)
                translateZ(10px)
            `;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroContentElement.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    }
    
    
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
    
    // Check if device is mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // 1. Enhanced 3D tilt effect for product cards (desktop only)
    if (!isMobile) {
        const productCards = document.querySelectorAll('.product-item, .value-block, .philosophy-point');
        
        productCards.forEach(card => {
            let animationId = null;
            
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
            });
            
            card.addEventListener('mousemove', function(e) {
                if (animationId) cancelAnimationFrame(animationId);
                
                animationId = requestAnimationFrame(() => {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
                    this.style.boxShadow = `
                        ${rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.2),
                        0 10px 40px rgba(0, 0, 0, 0.1)
                    `;
                });
            });
            
            card.addEventListener('mouseleave', function() {
                if (animationId) cancelAnimationFrame(animationId);
                this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // 2. Enhanced ripple effect for buttons
    const enhancedButtons = document.querySelectorAll('.btn, .cta, button');
    enhancedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove any existing ripple
            const existingRipple = this.querySelector('.ripple-effect');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 3. Magnetic hover effect for CTAs (desktop only)
    if (!isMobile) {
        const magneticElements = document.querySelectorAll('.btn-primary, .hero-cta .btn, .cta');
        
        magneticElements.forEach(elem => {
            const magnetic = { x: 0, y: 0 };
            let animationId = null;
            
            elem.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                
                magnetic.x = x * 0.3;
                magnetic.y = y * 0.3;
                
                if (animationId) cancelAnimationFrame(animationId);
                animationId = requestAnimationFrame(() => {
                    this.style.transform = `translate(${magnetic.x}px, ${magnetic.y}px)`;
                });
            });
            
            elem.addEventListener('mouseleave', function() {
                if (animationId) cancelAnimationFrame(animationId);
                this.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // 4. Enhanced parallax mouse effect for hero section (desktop only)
    if (!isMobile) {
        const hero = document.querySelector('.hero');
        const heroElements = {
            content: document.querySelector('.hero-content'),
            title: document.querySelector('.hero-title'),
            subtitle: document.querySelector('.hero-subtitle'),
            badge: document.querySelector('.hero-badge'),
            cta: document.querySelector('.hero-cta')
        };
        
        if (hero && heroElements.content) {
            let mouseX = 0, mouseY = 0;
            let currentX = 0, currentY = 0;
            let animationId = null;
            
            function updateParallax() {
                // Smooth easing
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;
                
                // Apply different parallax speeds to different elements
                if (heroElements.content) {
                    heroElements.content.style.transform = `
                        translate(${currentX * 20}px, ${currentY * 20}px)
                    `;
                }
                
                if (heroElements.title) {
                    heroElements.title.style.transform = `
                        translate(${currentX * 15}px, ${currentY * 15}px)
                    `;
                }
                
                if (heroElements.subtitle) {
                    heroElements.subtitle.style.transform = `
                        translate(${currentX * 10}px, ${currentY * 10}px)
                    `;
                }
                
                if (heroElements.badge) {
                    heroElements.badge.style.transform = `
                        translate(${currentX * 25}px, ${currentY * 25}px)
                    `;
                }
                
                if (heroElements.cta) {
                    heroElements.cta.style.transform = `
                        translate(${currentX * 5}px, ${currentY * 5}px)
                    `;
                }
                
                animationId = requestAnimationFrame(updateParallax);
            }
            
            hero.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                
                if (!animationId) {
                    animationId = requestAnimationFrame(updateParallax);
                }
            });
            
            hero.addEventListener('mouseleave', () => {
                mouseX = 0;
                mouseY = 0;
                
                // Smoothly return to center
                setTimeout(() => {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                    
                    // Reset transforms
                    Object.values(heroElements).forEach(elem => {
                        if (elem) elem.style.transform = '';
                    });
                }, 1000);
            });
        }
    }
    
    // Cleanup function for removing event listeners
    window.addEventListener('beforeunload', () => {
        // Cancel any pending animation frames
        if (window.animationId) {
            cancelAnimationFrame(window.animationId);
        }
    });
});

// Utility function for smooth number animations with enhanced easing
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    let animationId = null;
    
    // Check if element has suffix
    const suffix = element.nextElementSibling && element.nextElementSibling.classList.contains('stat-suffix') 
        ? element.nextElementSibling.textContent 
        : '';
    
    function formatNumber(num) {
        // Add comma formatting for thousands
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function for more dynamic animation
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const value = Math.floor(easeOutExpo * range + start);
        
        element.textContent = formatNumber(value);
        
        // Add subtle scale animation
        const scale = 1 + (Math.sin(progress * Math.PI) * 0.05);
        element.style.transform = `scale(${scale})`;
        
        if (progress < 1) {
            animationId = requestAnimationFrame(updateValue);
        } else {
            // Reset scale at end
            element.style.transform = 'scale(1)';
            // Ensure final value is displayed
            element.textContent = formatNumber(end);
        }
    }
    
    animationId = requestAnimationFrame(updateValue);
    
    // Return cleanup function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}