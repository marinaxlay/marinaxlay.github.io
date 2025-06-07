document.addEventListener('DOMContentLoaded', function() {
    // ========== HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Function to close hamburger menu
    function closeHamburgerMenu() {
        if (hamburger && nav) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            
            // Force remove focus to prevent :focus-within from keeping menu open
            const activeElement = document.activeElement;
            if (activeElement && nav.contains(activeElement)) {
                activeElement.blur();
            }
        }
    }
    
    // ========== NAVIGATION LINKS ==========
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close the hamburger menu for all navigation links
            closeHamburgerMenu();
        });
    });
    
    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            // Always close hamburger menu when clicking anchor links
            closeHamburgerMenu();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Small delay to allow menu to close before scrolling
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 150);
            }
        });
    });
    
    // ========== ACCORDION FUNCTIONALITY ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const content = this.nextElementSibling;
            
            if(content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.height = '0px';
            } else {
                content.classList.add('active');
                content.style.height = content.scrollHeight + 'px';
                
                setTimeout(function() {
                    content.style.height = 'auto';
                }, 300);
            }
        });
    });
    
    // ========== SCROLL ANIMATIONS ==========
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    function checkVisibility() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // ========== COLOR BOXES ANIMATION ==========
    const colorBoxes = document.querySelectorAll('.color-box');
    
    colorBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Accessibility - proper contrast for text
        const bgColor = getComputedStyle(box).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        
        if (rgb) {
            const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
            box.style.color = luminance > 186 ? '#000000' : '#FFFFFF';
        }
    });
    
    // ========== PLAN TOGGLE FUNCTIONALITY ==========
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const personalPlans = document.querySelector('.personal-plans');
    const businessPlans = document.querySelector('.business-plans');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.plan === 'personal') {
                if (personalPlans) personalPlans.classList.add('active');
                if (businessPlans) businessPlans.classList.remove('active');
            } else {
                if (businessPlans) businessPlans.classList.add('active');
                if (personalPlans) personalPlans.classList.remove('active');
            }
        });
    });

    
    // Test both selectors
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            console.log('🔥 Contact link (href) clicked!');
            console.log('Before - Hamburger active:', hamburger?.classList.contains('active'));
            console.log('Before - Nav active:', nav?.classList.contains('active'));
            
            closeHamburgerMenu();
            
            console.log('After - Hamburger active:', hamburger?.classList.contains('active'));
            console.log('After - Nav active:', nav?.classList.contains('active'));
        });
    }
    
    if (contactLinkByClass) {
        contactLinkByClass.addEventListener('click', function(e) {
            console.log('🔥 Contact link (class) clicked!');
            console.log('Before - Hamburger active:', hamburger?.classList.contains('active'));
            console.log('Before - Nav active:', nav?.classList.contains('active'));
            
            closeHamburgerMenu();
            
            console.log('After - Hamburger active:', hamburger?.classList.contains('active'));
            console.log('After - Nav active:', nav?.classList.contains('active'));
        });
    }
    
    // Debug all nav links
    console.log('All nav links found:', document.querySelectorAll('.main-nav a'));
    console.log('All anchor links found:', document.querySelectorAll('a[href^="#"]'));
});