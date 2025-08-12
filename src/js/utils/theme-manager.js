/**
 * Theme Management System
 * Handles theme switching and persistence
 */

export class ThemeManager {
    constructor() {
        this.currentTheme = 'auto';
        this.systemPrefersDark = false;
        this.mediaQuery = null;
    }

    /**
     * Initialize theme system
     */
    init() {
        // Set up media query listener
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.systemPrefersDark = this.mediaQuery.matches;
        
        // Listen for system theme changes
        this.mediaQuery.addEventListener('change', (e) => {
            this.systemPrefersDark = e.matches;
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
            }
        });

        // Load saved theme or default to auto
        const savedTheme = localStorage.getItem('theme') || 'auto';
        this.setTheme(savedTheme);

        console.log('🎨 Theme Manager initialized');
    }

    /**
     * Set theme
     */
    setTheme(theme) {
        if (!['auto', 'light', 'dark'].includes(theme)) {
            console.warn(`Invalid theme: ${theme}. Using 'auto' instead.`);
            theme = 'auto';
        }

        this.currentTheme = theme;
        this.applyTheme(theme);
        this.updateThemeButtons();
        this.saveTheme();

        // Notify components
        document.dispatchEvent(new CustomEvent('theme-changed', {
            detail: { theme, resolvedTheme: this.getResolvedTheme() }
        }));
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        let appliedTheme;

        if (theme === 'auto') {
            appliedTheme = this.systemPrefersDark ? 'dark' : 'light';
        } else {
            appliedTheme = theme;
        }

        // Remove existing theme classes
        document.body.classList.remove('theme-light', 'theme-dark');
        
        // Apply new theme class
        document.body.classList.add(`theme-${appliedTheme}`);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(appliedTheme);
        
        // Update CSS custom properties for components
        this.updateCustomProperties(appliedTheme);
    }

    /**
     * Update theme toggle buttons
     */
    updateThemeButtons() {
        const buttons = {
            auto: document.getElementById('theme-auto'),
            light: document.getElementById('theme-light'),
            dark: document.getElementById('theme-dark')
        };

        // Reset all buttons
        Object.values(buttons).forEach(btn => {
            if (btn) {
                btn.style.backgroundColor = 'transparent';
                btn.querySelector('i').style.color = 'var(--neutral)';
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // Highlight active button
        const activeButton = buttons[this.currentTheme];
        if (activeButton) {
            activeButton.style.backgroundColor = 'var(--primary)';
            activeButton.querySelector('i').style.color = 'var(--bg)';
            activeButton.setAttribute('aria-pressed', 'true');
        }
    }

    /**
     * Update meta theme color for mobile browsers
     */
    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color = theme === 'dark' ? '#020617' : '#2563eb';
            metaThemeColor.setAttribute('content', color);
        }
    }

    /**
     * Update CSS custom properties for theme
     */
    updateCustomProperties(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--resolved-bg', '#020617');
            root.style.setProperty('--resolved-text', '#e2e8f0');
            root.style.setProperty('--resolved-card-bg', '#0f172a');
            root.style.setProperty('--resolved-border', '#1e293b');
        } else {
            root.style.setProperty('--resolved-bg', '#f1f5f9');
            root.style.setProperty('--resolved-text', '#0f172a');
            root.style.setProperty('--resolved-card-bg', '#ffffff');
            root.style.setProperty('--resolved-border', '#e2e8f0');
        }
    }

    /**
     * Get current theme setting
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get resolved theme (what's actually applied)
     */
    getResolvedTheme() {
        if (this.currentTheme === 'auto') {
            return this.systemPrefersDark ? 'dark' : 'light';
        }
        return this.currentTheme;
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }

    /**
     * Check if system prefers dark theme
     */
    getSystemPreference() {
        return this.systemPrefersDark ? 'dark' : 'light';
    }

    /**
     * Save theme to localStorage
     */
    saveTheme() {
        try {
            localStorage.setItem('theme', this.currentTheme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
    }

    /**
     * Get theme colors for components
     */
    getThemeColors() {
        const isDark = this.getResolvedTheme() === 'dark';
        
        return {
            primary: isDark ? '#3b82f6' : '#2563eb',
            secondary: isDark ? '#10b981' : '#059669',
            accent: isDark ? '#f59e0b' : '#d97706',
            neutral: isDark ? '#94a3b8' : '#64748b',
            bg: isDark ? '#020617' : '#f1f5f9',
            text: isDark ? '#e2e8f0' : '#0f172a',
            cardBg: isDark ? '#0f172a' : '#ffffff',
            border: isDark ? '#1e293b' : '#e2e8f0'
        };
    }

    /**
     * Create theme-aware CSS
     */
    createThemeCSS(lightCSS, darkCSS) {
        const resolvedTheme = this.getResolvedTheme();
        return resolvedTheme === 'dark' ? darkCSS : lightCSS;
    }

    /**
     * Watch for theme changes
     */
    onThemeChange(callback) {
        document.addEventListener('theme-changed', (e) => {
            callback(e.detail);
        });
    }

    /**
     * Preload theme assets
     */
    preloadThemeAssets() {
        // Preload dark theme icons or images if needed
        const isDark = this.getResolvedTheme() === 'dark';
        
        if (isDark) {
            // Preload dark theme assets
            this.preloadImage('/assets/icons/dark-mode-hero.svg');
        } else {
            // Preload light theme assets  
            this.preloadImage('/assets/icons/light-mode-hero.svg');
        }
    }

    /**
     * Preload image utility
     */
    preloadImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }

    /**
     * Get theme preference for analytics
     */
    getAnalyticsData() {
        return {
            currentTheme: this.currentTheme,
            resolvedTheme: this.getResolvedTheme(),
            systemPreference: this.getSystemPreference(),
            supportsColorSchemeQuery: this.mediaQuery !== null
        };
    }

    /**
     * Development utilities
     */
    dev = {
        // Test all themes
        testThemes: () => {
            const themes = ['light', 'dark', 'auto'];
            let index = 0;
            
            const cycle = () => {
                this.setTheme(themes[index]);
                console.log(`Applied theme: ${themes[index]}`);
                index = (index + 1) % themes.length;
                
                if (index !== 0) {
                    setTimeout(cycle, 2000);
                }
            };
            
            cycle();
        },

        // Get current theme info
        info: () => {
            console.log('Theme Manager Info:', {
                current: this.currentTheme,
                resolved: this.getResolvedTheme(),
                system: this.getSystemPreference(),
                colors: this.getThemeColors()
            });
        }
    };
}

export default ThemeManager;