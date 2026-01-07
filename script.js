/**
 * HIMETA Website - Premium Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
});

/**
 * Navigation - Scroll state & mobile menu
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    
    // Scroll state
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class after threshold
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Stagger children if applicable
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('in-view');
                });
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.product-card, .vorteil-card, .material, .trust-item, .kontakt-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add in-view styles
    const style = document.createElement('style');
    style.textContent = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
