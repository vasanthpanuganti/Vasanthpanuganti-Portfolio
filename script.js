// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // Change navbar shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 20) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Highlight Active Section in Navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinksAll.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    navLink.classList.add('active');
                }
            }
        });

        // If at the top of the page, highlight Home
        if (scrollY < 100) {
            navLinksAll.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightNavigation);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (name && email && subject && message) {
                // Here you would typically send the form data to a server
                // For now, we'll just show an alert
                alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in effect
    const animateElements = document.querySelectorAll('.highlight-card, .project-card, .case-study, .certification-card, .achievement-card, .resume-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Typing Effect for Headline (Optional Enhancement)
    const headline = document.querySelector('.headline');
    if (headline) {
        const originalText = headline.innerHTML;
        let isTypingComplete = false;

        // Only run typing effect on first load
        if (!sessionStorage.getItem('headlineTyped')) {
            headline.innerHTML = '';
            let charIndex = 0;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = originalText;
            const text = tempDiv.textContent;

            function typeWriter() {
                if (charIndex < text.length) {
                    const currentChar = text.charAt(charIndex);
                    const currentHTML = originalText.substring(0, headline.textContent.length + currentChar.length);

                    // Find position in original HTML
                    let htmlIndex = 0;
                    let textCount = 0;
                    while (textCount < charIndex && htmlIndex < originalText.length) {
                        if (originalText[htmlIndex] === '<') {
                            // Skip HTML tags
                            while (originalText[htmlIndex] !== '>' && htmlIndex < originalText.length) {
                                htmlIndex++;
                            }
                            htmlIndex++;
                        } else {
                            textCount++;
                            htmlIndex++;
                        }
                    }

                    headline.innerHTML = originalText.substring(0, htmlIndex + 1);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                } else {
                    isTypingComplete = true;
                    sessionStorage.setItem('headlineTyped', 'true');
                }
            }

            setTimeout(typeWriter, 500);
        } else {
            headline.innerHTML = originalText;
        }
    }

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Dynamic year in footer
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Vasanth Panuganti. All rights reserved.`;
    }

    // Profile Image Error Handling
    const profileImg = document.getElementById('profile-pic');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // If image fails to load, show overlay
            const overlay = document.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });

        profileImg.addEventListener('load', function() {
            // If image loads successfully, hide overlay
            const overlay = document.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    // Add smooth reveal animation to sections
    const allSections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.05
    });

    allSections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        }
    });

    // Add click event to toggle buttons for smooth scrolling
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    console.log('Portfolio loaded successfully!');
});
