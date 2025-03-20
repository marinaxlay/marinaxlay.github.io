document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Set active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll (simple version)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-card, .process-step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial styles for animation
    const animatedElements = document.querySelectorAll('.service-card, .process-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add event listener for scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for elements in view
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordions
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class for this header
            this.classList.toggle('active');
            
            // Get the content element
            const content = this.nextElementSibling;
            
            // Toggle the active class for the content
            if(content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.height = '0px';
            } else {
                content.classList.add('active');
                content.style.height = content.scrollHeight + 'px';
                
                // After transition completes, set height to auto to accommodate dynamic content
                setTimeout(function() {
                    content.style.height = 'auto';
                }, 300); // Match transition duration (0.3s = 300ms)
            }
        });
    });
});

// Add this to your portfolio-script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Language dropdown functionality
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageSelector = document.querySelector('.language-selector');
    const currentLanguage = document.querySelector('.current-language');
    const languageOptions = document.querySelectorAll('.language-options a');
    
    // Toggle dropdown on click
    languageSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageDropdown.classList.remove('active');
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update current language display
            currentLanguage.textContent = this.dataset.lang.toUpperCase();
            
            // Update active class
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            
            // Here you would add logic to actually switch the language
            // e.g., redirect to translated page or apply translations
            console.log('Language switched to:', this.dataset.lang);
        });
    });
});