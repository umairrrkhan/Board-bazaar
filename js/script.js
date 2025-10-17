// Board Bazaar - Main JavaScript File

// Global copy functions for all pages
window.copyNumber = function(number) {
    // Create temporary input to copy number
    const tempInput = document.createElement('input');
    tempInput.value = number;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show copied message
    showCopiedMessage('Phone number copied to clipboard!');
};

window.copyEmail = function() {
    const email = 'faisal.khan868@gmail.com';
    
    // Create temporary input to copy email
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show copied message
    showCopiedMessage('Email copied to clipboard!');
};

window.showCopiedMessage = function(messageText) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.copy-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const message = document.createElement('div');
    message.className = 'copy-message';
    message.textContent = messageText;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out 2s forwards;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#copy-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'copy-animation-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    // Remove message after animation
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initFAQ();
    initAnimations();
    initMobileMenu();
    initDropdownMenu();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (!mobileMenuBtn || !mobileSidebar) return;
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Dropdown Menu Functionality
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (window.innerWidth <= 768) {
            // Mobile: click to toggle
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            });
        } else {
            // Desktop: hover functionality already handled by CSS
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Navigation Functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active nav based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // Smooth scroll for anchor links
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile menu toggle (if needed in future)
    initMobileMenu();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (!mobileMenuBtn || !mobileSidebar) return;
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const navHeader = document.querySelector('.nav-header');
    if (!navHeader) return;
    
    // Add shadow on scroll (no transparency/glass effect)
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            navHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navHeader.style.boxShadow = 'none';
        }
    });
    
    // Initialize scroll animations
    initScrollAnimations();
}

// FAQ Functionality
function initFAQ() {
    // Add click handlers for FAQ items if they're expandable
    const faqTiles = document.querySelectorAll('.faq-tile');
    
    faqTiles.forEach(tile => {
        tile.style.cursor = 'pointer';
        
        tile.addEventListener('click', function() {
            // Toggle expanded state or show more details
            this.classList.toggle('expanded');
            
            // Add animation
            this.style.transform = this.classList.contains('expanded') 
                ? 'translateY(-8px) scale(1.02)' 
                : 'translateY(-5px)';
        });
    });
}

// Animations
function initAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.why-point, .service-tile, .showcase-item, .faq-tile');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple elements
                const elements = Array.from(document.querySelectorAll('.why-point, .service-tile'));
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.animationDelay = `${index * 0.1}s`;
                        el.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-point, .section-header');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease';
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form handling is now managed by contact-form-handler.js to avoid conflicts

// Performance optimization
function optimizeImages() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could also send this to an error tracking service
});

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Handle tab navigation
            const focusableElements = document.querySelectorAll(
                'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Add ARIA labels dynamically
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        heroCarousel.setAttribute('role', 'region');
        heroCarousel.setAttribute('aria-label', 'Image carousel showing board bazaar projects');
    }
}

// Initialize accessibility features
initAccessibility();

// Contact form handling is now managed by contact-form-handler.js

// Optimize images on load
optimizeImages();

// Add CSS keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-message {
        padding: 15px 20px;
        border-radius: 8px;
        margin-top: 20px;
        font-weight: 500;
        animation: slideInDown 0.3s ease;
    }
    
    .form-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .form-message.info {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s;
    }
    
    .lazy.loaded {
        filter: blur(0);
    }
    
    /* Mobile Menu Styles */
    .mobile-menu-toggle {
        display: none;
        background: var(--primary-orange);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 18px;
        margin: 10px auto;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-toggle:hover {
        background: var(--secondary-orange);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-header nav {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .nav-header nav.mobile-open {
            max-height: 600px;
        }
        
        .nav-header nav ul {
            flex-direction: column;
            gap: 5px;
        }
        
        .nav-link {
            text-align: center;
            padding: 12px 16px;
        }
        
        .dropdown-menu {
            position: static !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            display: none !important;
            box-shadow: none !important;
            background: rgba(59, 130, 246, 0.9) !important;
            margin-top: 5px;
            border-radius: 8px !important;
        }
        
        .dropdown.active .dropdown-menu {
            display: block !important;
        }
        
        .dropdown-menu li {
            border: none !important;
        }
        
        .dropdown-menu a {
            padding: 12px 20px !important;
            text-align: center;
        }
        
        .dropdown-menu a:hover {
            padding-left: 20px !important;
            background: var(--primary-orange) !important;
        }
    }
`;

document.head.appendChild(styleSheet);