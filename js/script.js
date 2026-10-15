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


    // ========== NAVIGATION : SECTION ACTIVE ==========
    const currentSection = document.body.dataset.section;
    if (currentSection) {
        document.querySelectorAll('.main-nav a[data-nav="' + currentSection + '"]').forEach(link => {
            link.setAttribute('aria-current', 'page');
        });
    }

    // ========== TOGGLE UX/UI ⇄ GRAPHIQUE ==========
    // Fait glisser la pastille vers la cible avant de changer de page.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.mode-toggle a[data-nav]').forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('aria-current') === 'page') {
                e.preventDefault();
                return;
            }
            if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            document.body.dataset.section = link.dataset.nav;
            setTimeout(() => { window.location.href = link.href; }, 250);
        });
    });

    // ========== PORTFOLIO (données : js/projects.js) ==========
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function projectCard(project) {
        const categories = project.categories.map(cat =>
            '<span class="cat-tag ' + cat + '">' + escapeHTML(CATEGORY_LABELS[cat]) + '</span>'
        ).join('');
        const tags = project.tags.map(tag =>
            '<span class="platform">' + escapeHTML(tag) + '</span>'
        ).join('');

        return '<a href="' + project.href + '"><article class="project-card">' +
            '<div class="project-image">' +
                '<img src="' + project.cover + '" alt="" loading="lazy" />' +
                '<div class="project-categories">' + categories + '</div>' +
            '</div>' +
            '<div class="project-details">' +
                '<h3>' + escapeHTML(project.title) + '</h3>' +
                (project.year ? '<p class="project-year">' + escapeHTML(project.year) + '</p>' : '') +
                '<p class="project-description">' + escapeHTML(project.description) + '</p>' +
                '<div class="project-platforms">' + tags + '</div>' +
            '</div>' +
        '</article></a>';
    }

    // data-category : "all" ou une liste de catégories séparées par des espaces
    function renderPortfolio(grid) {
        if (typeof PROJECTS === 'undefined') return;
        const category = grid.dataset.category;
        const wanted = category === 'all' ? Object.keys(CATEGORY_LABELS) : category.split(' ');
        const featuredOnly = grid.hasAttribute('data-featured');

        const projects = PROJECTS
            .filter(p => p.categories.some(cat => wanted.includes(cat)) && (!featuredOnly || p.featured))
            .sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

        const label = wanted.length === 1 ? ' « ' + escapeHTML(CATEGORY_LABELS[wanted[0]]) + ' »' : '';
        grid.innerHTML = projects.length
            ? projects.map(projectCard).join('')
            : '<div class="portfolio-empty"><span class="emoji" aria-hidden="true">🎨</span>' +
              '<p>Les études de cas' + label + ' arrivent très bientôt.</p></div>';
    }

    document.querySelectorAll('[data-portfolio]').forEach(renderPortfolio);

    // ========== TAGS DE FILTRE DU PORTFOLIO (accueil) ==========
    // Un seul tag actif à la fois ; aucun tag actif = tous les projets.
    document.querySelectorAll('[data-filter]').forEach(group => {
        const tags = Array.from(group.querySelectorAll('.filter-tag'));
        const grid = document.getElementById(group.dataset.filter);

        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const wasActive = tag.getAttribute('aria-pressed') === 'true';
                tags.forEach(t => t.setAttribute('aria-pressed', 'false'));
                if (!wasActive) tag.setAttribute('aria-pressed', 'true');
                grid.dataset.category = wasActive ? 'all' : tag.dataset.category;
                renderPortfolio(grid);
            });
        });
    });

    // ========== TAGS DE FILTRE DU PARCOURS (accueil) ==========
    // Même comportement que le portfolio : un seul tag actif, aucun = tout.
    document.querySelectorAll('[data-filter-items]').forEach(group => {
        const tags = Array.from(group.querySelectorAll('.filter-tag'));
        const list = document.getElementById(group.dataset.filterItems);
        const items = Array.from(list.querySelectorAll(':scope > [data-type]'));

        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const wasActive = tag.getAttribute('aria-pressed') === 'true';
                tags.forEach(t => t.setAttribute('aria-pressed', 'false'));
                if (!wasActive) tag.setAttribute('aria-pressed', 'true');
                items.forEach(item => {
                    item.hidden = !wasActive && item.dataset.type !== tag.dataset.category;
                });
            });
        });
    });

    // ========== CARROUSEL (Réalisations à la une) ==========
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const controls = carousel.querySelector('.carousel-controls');
        const prev = carousel.querySelector('[data-dir="-1"]');
        const next = carousel.querySelector('[data-dir="1"]');

        function update() {
            const max = track.scrollWidth - track.clientWidth;
            controls.hidden = max <= 1;
            prev.disabled = track.scrollLeft <= 1;
            next.disabled = track.scrollLeft >= max - 1;
        }

        // Position de chaque élément dans le carrousel (les visuels de la
        // galerie n'ont pas tous la même largeur)
        function offsets() {
            const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
            const start = track.getBoundingClientRect().left + track.clientLeft - track.scrollLeft + padding;
            return [...track.children].map(el => el.getBoundingClientRect().left - start);
        }

        [prev, next].forEach(btn => btn.addEventListener('click', () => {
            const dir = Number(btn.dataset.dir);
            const pos = track.scrollLeft;
            const list = offsets();
            const target = dir > 0
                ? list.find(x => x > pos + 1)
                : list.filter(x => x < pos - 1).pop();
            track.scrollTo({ left: target === undefined ? (dir > 0 ? track.scrollWidth : 0) : target });
        }));

        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        // Le filtre par tag remplace les cartes : retour au début
        new MutationObserver(() => {
            track.scrollLeft = 0;
            update();
        }).observe(track, { childList: true });

        update();
    });

    // ========== BARRE COMPACTE DES GROS BOUTONS (accueil) ==========
    const stickySource = document.querySelector('[data-sticky-source]');
    const pathBar = document.querySelector('.path-bar');
    if (stickySource && pathBar) {
        let ticking = false;
        // Visible seulement une fois les gros boutons passés au-dessus de l'écran
        const updatePathBar = () => {
            const show = stickySource.getBoundingClientRect().bottom < 0;
            pathBar.classList.toggle('is-visible', show);
            pathBar.inert = !show;
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updatePathBar);
            }
        }, { passive: true });
        updatePathBar();
    }

    // ========== BARRES DE COMPÉTENCES ==========
    // Le niveau (0 à 100) se règle dans le HTML : data-level="80"
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = Math.max(0, Math.min(100, Number(bar.dataset.level) || 0));
        const fill = document.createElement('span');
        fill.className = 'skill-bar-fill' + (level >= 100 ? ' is-full' : '');
        bar.style.setProperty('--level', level + '%');
        bar.appendChild(fill);
        bar.setAttribute('role', 'meter');
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
        bar.setAttribute('aria-valuenow', String(level));
        bar.setAttribute('aria-label', 'Niveau : ' + level + ' %');
    });
});
