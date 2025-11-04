// Enhanced Interactive Features for Portfolio
// Modern, React-like interactions with vanilla JavaScript

class PortfolioInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupAnimatedCounters();
        this.setupSkillTagAnimations();
        this.setupProjectCardInteractions();
        this.setupSmoothReveal();
        this.setupParallaxEffects();
        this.setupCursorFollower();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Trigger counters if element has data-counter
                    if (entry.target.hasAttribute('data-counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.highlight-card, .project-card, .certification-card, .achievement-card, .resume-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Animated Counter
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Animated Skill Tags
    setupSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');

        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.05}s`;
            tag.classList.add('skill-fade-in');

            // Ripple effect on click
            tag.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${e.offsetX}px`;
                ripple.style.top = `${e.offsetY}px`;
                tag.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Enhanced Project Card Interactions
    setupProjectCardInteractions() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardGlow(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeCardGlow(card);
            });

            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                this.handleCardTilt(card, e);
            });
        });
    }

    addCardGlow(card) {
        card.style.transition = 'all 0.3s ease';
    }

    removeCardGlow(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    handleCardTilt(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    // Smooth Reveal Animations
    setupSmoothReveal() {
        const sections = document.querySelectorAll('section');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-reveal');
                }
            });
        }, {
            threshold: 0.15
        });

        sections.forEach(section => {
            revealObserver.observe(section);
        });
    }

    // Parallax Effects
    setupParallaxEffects() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Custom Cursor Follower
    setupCursorFollower() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.1;
            cursorY += dy * 0.1;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }
}

// Smooth Page Transitions
class PageTransitions {
    constructor() {
        this.setupTransitions();
    }

    setupTransitions() {
        // Smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioInteractions();
    new PageTransitions();
});
