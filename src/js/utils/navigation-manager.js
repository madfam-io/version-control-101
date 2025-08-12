/**
 * Navigation Management System
 * Handles section navigation, deep linking, and scroll behavior
 */

export class NavigationManager {
    constructor() {
        this.currentSection = 'hero';
        this.sections = ['hero', 'part1', 'part2', 'part3', 'part4'];
        this.observer = null;
        this.scrollTimeout = null;
        this.isNavigating = false;
    }

    /**
     * Initialize navigation system
     */
    init() {
        this.setupIntersectionObserver();
        this.setupScrollBehavior();
        this.handleInitialHash();
        
        // Set up navigation event listeners
        this.setupNavigationEvents();
        
        console.log('🧭 Navigation Manager initialized');
    }

    /**
     * Set up intersection observer for automatic section detection
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            if (this.isNavigating) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId && this.sections.includes(sectionId)) {
                        this.updateCurrentSection(sectionId);
                    }
                }
            });
        }, options);
    }

    /**
     * Start observing sections
     */
    observeSections() {
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                this.observer.observe(section);
            }
        });
    }

    /**
     * Set up smooth scroll behavior
     */
    setupScrollBehavior() {
        // Override default anchor clicking
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                this.navigateToSection(targetId);
            }
        });

        // Handle browser back/forward navigation
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section, false);
            }
        });
    }

    /**
     * Handle initial URL hash
     */
    handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash && this.sections.includes(hash)) {
            setTimeout(() => {
                this.navigateToSection(hash);
            }, 100);
        }
    }

    /**
     * Set up navigation-related event listeners
     */
    setupNavigationEvents() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.navigateToPreviousSection();
                    break;
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    this.navigateToNextSection();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToSection('hero');
                    break;
                case 'End':
                    e.preventDefault();
                    this.navigateToSection(this.sections[this.sections.length - 1]);
                    break;
            }
        });
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(sectionId, updateHistory = true) {
        if (!this.sections.includes(sectionId)) {
            console.warn(`Invalid section: ${sectionId}`);
            return;
        }

        const targetSection = document.getElementById(sectionId);
        if (!targetSection) {
            console.warn(`Section element not found: ${sectionId}`);
            return;
        }

        this.isNavigating = true;

        // Update URL hash
        if (updateHistory) {
            this.updateURL(sectionId);
        }

        // Smooth scroll to section
        this.scrollToSection(targetSection).then(() => {
            this.updateCurrentSection(sectionId);
            this.isNavigating = false;

            // Lazy load section content if needed
            this.lazyLoadSection(sectionId);
        });
    }

    /**
     * Scroll to section with smooth animation
     */
    scrollToSection(element) {
        return new Promise((resolve) => {
            const headerHeight = 64; // Header height
            const targetPosition = element.offsetTop - headerHeight;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.abs(distance) * 0.5, 800); // Max 800ms
            
            let startTime = null;

            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };

            const animateScroll = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animateScroll);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animateScroll);
        });
    }

    /**
     * Navigate to previous section
     */
    navigateToPreviousSection() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex > 0) {
            this.navigateToSection(this.sections[currentIndex - 1]);
        }
    }

    /**
     * Navigate to next section
     */
    navigateToNextSection() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex < this.sections.length - 1) {
            this.navigateToSection(this.sections[currentIndex + 1]);
        }
    }

    /**
     * Update current section
     */
    updateCurrentSection(sectionId) {
        if (this.currentSection === sectionId) return;

        const previousSection = this.currentSection;
        this.currentSection = sectionId;

        // Update navigation indicators
        this.updateActiveSection(sectionId);

        // Dispatch section change event
        document.dispatchEvent(new CustomEvent('section-changed', {
            detail: {
                section: sectionId,
                previousSection,
                sectionIndex: this.sections.indexOf(sectionId)
            }
        }));
    }

    /**
     * Update active section indicators
     */
    updateActiveSection(sectionId) {
        // Update navigation dots
        document.querySelectorAll('.nav-dot').forEach(dot => {
            const isActive = dot.dataset.section === sectionId;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        // Update progress bar
        const sectionIndex = this.sections.indexOf(sectionId);
        const progress = ((sectionIndex + 1) / this.sections.length) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress / 100})`;
        }
    }

    /**
     * Update URL without triggering navigation
     */
    updateURL(sectionId) {
        const newURL = `${window.location.pathname}#${sectionId}`;
        history.pushState({ section: sectionId }, '', newURL);
    }

    /**
     * Lazy load section content
     */
    lazyLoadSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section && !section.dataset.loaded) {
            section.classList.remove('component-loading');
            section.classList.add('component-loaded');
            section.dataset.loaded = 'true';

            // Trigger section content loading
            document.dispatchEvent(new CustomEvent('section-load', {
                detail: { section: sectionId }
            }));
        }
    }

    /**
     * Get current section
     */
    getCurrentSection() {
        return this.currentSection;
    }

    /**
     * Get all sections
     */
    getSections() {
        return [...this.sections];
    }

    /**
     * Get section progress (0-1)
     */
    getSectionProgress() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        return (currentIndex + 1) / this.sections.length;
    }

    /**
     * Check if section exists
     */
    sectionExists(sectionId) {
        return this.sections.includes(sectionId);
    }

    /**
     * Get next section ID
     */
    getNextSection() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        return currentIndex < this.sections.length - 1 
            ? this.sections[currentIndex + 1] 
            : null;
    }

    /**
     * Get previous section ID  
     */
    getPreviousSection() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        return currentIndex > 0 
            ? this.sections[currentIndex - 1] 
            : null;
    }

    /**
     * Scroll to top of current section
     */
    scrollToTop() {
        const currentSectionElement = document.getElementById(this.currentSection);
        if (currentSectionElement) {
            this.scrollToSection(currentSectionElement);
        }
    }

    /**
     * Enable/disable smooth scrolling
     */
    setSmoothScrolling(enabled) {
        document.documentElement.style.scrollBehavior = enabled ? 'smooth' : 'auto';
    }

    /**
     * Watch for section changes
     */
    onSectionChange(callback) {
        document.addEventListener('section-changed', (e) => {
            callback(e.detail);
        });
    }

    /**
     * Development utilities
     */
    dev = {
        // Get navigation state
        getState: () => ({
            currentSection: this.currentSection,
            sections: this.sections,
            progress: this.getSectionProgress(),
            isNavigating: this.isNavigating
        }),

        // Test navigation
        testNavigation: () => {
            let index = 0;
            const navigate = () => {
                this.navigateToSection(this.sections[index]);
                console.log(`Navigated to: ${this.sections[index]}`);
                index = (index + 1) % this.sections.length;
                
                if (index !== 0) {
                    setTimeout(navigate, 2000);
                }
            };
            navigate();
        },

        // Jump to section by index
        jumpTo: (index) => {
            if (index >= 0 && index < this.sections.length) {
                this.navigateToSection(this.sections[index]);
            }
        }
    };

    /**
     * Cleanup resources
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
    }
}

export default NavigationManager;