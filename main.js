// Nelo Cafe Digital Studio - Main JavaScript
// Luxury animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollProgress();
    initTypewriter();
    initScrollReveal();
    initPortfolioSlider();
    initCounterAnimation();
    initParticleBackground();
    initSmoothScroll();
    initMobileMenu();
    
    console.log('Nelo Cafe Digital Studio - Luxury Experience Loaded');
});

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Typewriter Effect for Hero
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Where Design Meets Luxury',
                'Crafting Digital Excellence',
                'Inspiring Digital Spaces'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Portfolio Slider
function initPortfolioSlider() {
    const slider = document.getElementById('portfolio-slider');
    if (slider) {
        new Splide('#portfolio-slider', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                768: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16); // ~60fps
}

// Particle Background
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    let particles = [];
    let animationId;
    
    // p5.js sketch for particle background
    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            canvas.parent('particle-canvas');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(212, 175, 55, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        const alpha = p.map(distance, 0, 100, 0.1, 0);
                        p.stroke(212, 175, 55, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
    };
    
    new p5(sketch);
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle mobile menu (implement as needed)
            console.log('Mobile menu toggled');
        });
    }
}

// Luxury Hover Effects for Cards
function initLuxuryHovers() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                translateY: -12,
                boxShadow: '0 25px 50px rgba(44, 44, 44, 0.15)',
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                translateY: 0,
                boxShadow: '0 10px 25px rgba(44, 44, 44, 0.1)',
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Button Hover Effects
function initButtonHovers() {
    const buttons = document.querySelectorAll('.btn-luxury');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                translateY: -2,
                boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                translateY: 0,
                boxShadow: '0 5px 15px rgba(212, 175, 55, 0.2)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Form Validation (for contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('border-red-500');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Loading Animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'fixed inset-0 bg-warm-ivory z-50 flex items-center justify-center';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-champagne-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <div class="font-display text-xl text-deep-charcoal">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove after 2 seconds
    setTimeout(() => {
        anime({
            targets: loader,
            opacity: 0,
            duration: 500,
            complete: () => loader.remove()
        });
    }, 2000);
}

// Initialize luxury hovers after DOM load
document.addEventListener('DOMContentLoaded', () => {
    initLuxuryHovers();
    initButtonHovers();
});

// Export functions for use in other pages
window.NeloCafe = {
    initScrollProgress,
    initScrollReveal,
    initCounterAnimation,
    validateForm,
    showLoadingAnimation
};