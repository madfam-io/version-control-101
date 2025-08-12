/**
 * Language Management System
 * Handles internationalization and language switching
 */

export class LanguageManager {
    constructor() {
        this.currentLanguage = 'es';
        this.supportedLanguages = ['es', 'en'];
        this.translations = new Map();
        this.fallbackLanguage = 'es';
    }

    /**
     * Initialize language system
     */
    init() {
        // Load saved language or detect from browser
        const savedLanguage = localStorage.getItem('language') || this.detectBrowserLanguage();
        this.setLanguage(savedLanguage);

        // Load initial translations
        this.loadTranslations();

        console.log('🌐 Language Manager initialized');
    }

    /**
     * Set current language
     */
    setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn(`Unsupported language: ${language}. Using fallback: ${this.fallbackLanguage}`);
            language = this.fallbackLanguage;
        }

        this.currentLanguage = language;
        this.applyLanguage();
        this.updateLanguageToggle();
        this.saveLanguage();

        // Notify components
        document.dispatchEvent(new CustomEvent('language-changed', {
            detail: { language, previousLanguage: this.currentLanguage }
        }));
    }

    /**
     * Apply language to document
     */
    applyLanguage() {
        // Update document language
        document.documentElement.lang = this.currentLanguage;

        // Update all elements with language attributes
        document.querySelectorAll('[data-lang-es], [data-lang-en]').forEach(element => {
            const text = element.getAttribute(`data-lang-${this.currentLanguage}`);
            if (text) {
                element.innerHTML = text;
            }
        });

        // Update input placeholders
        document.querySelectorAll('[data-placeholder-es], [data-placeholder-en]').forEach(input => {
            const placeholder = input.getAttribute(`data-placeholder-${this.currentLanguage}`);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        });

        // Update aria-labels
        document.querySelectorAll('[data-aria-label-es], [data-aria-label-en]').forEach(element => {
            const label = element.getAttribute(`data-aria-label-${this.currentLanguage}`);
            if (label) {
                element.setAttribute('aria-label', label);
            }
        });

        // Update page title if available
        const title = document.querySelector(`meta[name="title-${this.currentLanguage}"]`);
        if (title) {
            document.title = title.getAttribute('content');
        }
    }

    /**
     * Update language toggle button
     */
    updateLanguageToggle() {
        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            toggle.checked = this.currentLanguage === 'en';
        }
    }

    /**
     * Detect browser language
     */
    detectBrowserLanguage() {
        const browserLanguage = navigator.language || navigator.userLanguage;
        const languageCode = browserLanguage.split('-')[0];
        
        return this.supportedLanguages.includes(languageCode) ? languageCode : this.fallbackLanguage;
    }

    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Toggle between languages
     */
    toggleLanguage() {
        const nextLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.setLanguage(nextLanguage);
    }

    /**
     * Translate text using translation keys
     */
    translate(key, variables = {}, language = this.currentLanguage) {
        const translations = this.translations.get(language);
        if (!translations) {
            console.warn(`No translations loaded for language: ${language}`);
            return key;
        }

        let translation = this.getNestedValue(translations, key);
        
        if (!translation && language !== this.fallbackLanguage) {
            // Fall back to default language
            const fallbackTranslations = this.translations.get(this.fallbackLanguage);
            if (fallbackTranslations) {
                translation = this.getNestedValue(fallbackTranslations, key);
            }
        }

        if (!translation) {
            console.warn(`Missing translation for key: ${key}`);
            return key;
        }

        // Replace variables in translation
        return this.replaceVariables(translation, variables);
    }

    /**
     * Shorter alias for translate
     */
    t(key, variables = {}, language = this.currentLanguage) {
        return this.translate(key, variables, language);
    }

    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Replace variables in translation string
     */
    replaceVariables(text, variables) {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] !== undefined ? variables[key] : match;
        });
    }

    /**
     * Load translations from data files
     */
    async loadTranslations() {
        try {
            // Load translations for both languages
            const [esTranslations, enTranslations] = await Promise.all([
                this.loadTranslationFile('es'),
                this.loadTranslationFile('en')
            ]);

            this.translations.set('es', esTranslations);
            this.translations.set('en', enTranslations);

            console.log('📚 Translations loaded');
        } catch (error) {
            console.warn('Failed to load translations:', error);
            this.loadFallbackTranslations();
        }
    }

    /**
     * Load translation file
     */
    async loadTranslationFile(language) {
        try {
            const response = await fetch(`/src/data/translations/${language}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`Failed to load ${language} translations:`, error);
            return {};
        }
    }

    /**
     * Load fallback translations (embedded)
     */
    loadFallbackTranslations() {
        const fallbackTranslations = {
            es: {
                common: {
                    loading: 'Cargando...',
                    error: 'Error',
                    success: 'Éxito',
                    continue: 'Continuar',
                    back: 'Atrás',
                    next: 'Siguiente',
                    finish: 'Finalizar'
                },
                navigation: {
                    home: 'Inicio',
                    progress: 'Progreso'
                }
            },
            en: {
                common: {
                    loading: 'Loading...',
                    error: 'Error',
                    success: 'Success',
                    continue: 'Continue',
                    back: 'Back',
                    next: 'Next',
                    finish: 'Finish'
                },
                navigation: {
                    home: 'Home',
                    progress: 'Progress'
                }
            }
        };

        this.translations.set('es', fallbackTranslations.es);
        this.translations.set('en', fallbackTranslations.en);
    }

    /**
     * Save language preference
     */
    saveLanguage() {
        try {
            localStorage.setItem('language', this.currentLanguage);
        } catch (error) {
            console.warn('Failed to save language preference:', error);
        }
    }

    /**
     * Format date according to current language
     */
    formatDate(date, options = {}) {
        const locale = this.currentLanguage === 'es' ? 'es-ES' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    /**
     * Format number according to current language
     */
    formatNumber(number, options = {}) {
        const locale = this.currentLanguage === 'es' ? 'es-ES' : 'en-US';
        return new Intl.NumberFormat(locale, options).format(number);
    }

    /**
     * Get text direction for language
     */
    getTextDirection() {
        // All currently supported languages use LTR
        return 'ltr';
    }

    /**
     * Watch for language changes
     */
    onLanguageChange(callback) {
        document.addEventListener('language-changed', (e) => {
            callback(e.detail);
        });
    }

    /**
     * Get language data for analytics
     */
    getAnalyticsData() {
        return {
            currentLanguage: this.currentLanguage,
            supportedLanguages: this.supportedLanguages,
            browserLanguage: navigator.language || navigator.userLanguage,
            detectedLanguage: this.detectBrowserLanguage()
        };
    }

    /**
     * Pluralization helper
     */
    plural(count, key, variables = {}) {
        const pluralKey = count === 1 ? `${key}.one` : `${key}.other`;
        return this.translate(pluralKey, { ...variables, count });
    }

    /**
     * Development utilities
     */
    dev = {
        // List all available translation keys
        listKeys: (language = this.currentLanguage) => {
            const translations = this.translations.get(language);
            if (translations) {
                const keys = this.flattenObject(translations);
                console.table(keys);
            }
        },

        // Check for missing translations
        checkMissing: () => {
            const esKeys = this.flattenObject(this.translations.get('es') || {});
            const enKeys = this.flattenObject(this.translations.get('en') || {});
            
            const esKeySet = new Set(Object.keys(esKeys));
            const enKeySet = new Set(Object.keys(enKeys));
            
            const missingInEn = [...esKeySet].filter(key => !enKeySet.has(key));
            const missingInEs = [...enKeySet].filter(key => !esKeySet.has(key));
            
            if (missingInEn.length > 0) {
                console.warn('Missing English translations:', missingInEn);
            }
            if (missingInEs.length > 0) {
                console.warn('Missing Spanish translations:', missingInEs);
            }
            
            if (missingInEn.length === 0 && missingInEs.length === 0) {
                console.log('✅ All translations are complete');
            }
        },

        // Test language switching
        testSwitching: () => {
            const languages = this.supportedLanguages;
            let index = 0;
            
            const cycle = () => {
                this.setLanguage(languages[index]);
                console.log(`Switched to: ${languages[index]}`);
                index = (index + 1) % languages.length;
                
                if (index !== 0) {
                    setTimeout(cycle, 3000);
                }
            };
            
            cycle();
        }
    };

    /**
     * Flatten nested object for key listing
     */
    flattenObject(obj, prefix = '') {
        const flattened = {};
        
        Object.keys(obj).forEach(key => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(flattened, this.flattenObject(obj[key], newKey));
            } else {
                flattened[newKey] = obj[key];
            }
        });
        
        return flattened;
    }
}

export default LanguageManager;