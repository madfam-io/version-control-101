/**
 * Main Application Entry Point
 * Modern SPA Architecture for Interactive Git Pedagogy Platform
 */

import { StateManager } from './state/state-manager.js';
import { ComponentRegistry } from './components/component-registry.js';
import { ThemeManager } from './utils/theme-manager.js';
import { LanguageManager } from './utils/language-manager.js';
import { ProgressTracker } from './utils/progress-tracker.js';
import { NavigationManager } from './utils/navigation-manager.js';
import { AnalyticsManager } from './utils/analytics-manager.js';

/**
 * Main Application Class
 * Orchestrates all managers and components
 */
class GitPedagogyApp {
    constructor() {
        this.state = new StateManager();
        this.components = new ComponentRegistry();
        this.theme = new ThemeManager();
        this.language = new LanguageManager();
        this.progress = new ProgressTracker(this.state);
        this.navigation = new NavigationManager();
        this.analytics = new AnalyticsManager();
        
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Initializing Git Pedagogy SPA...');
            
            // Initialize core systems
            await this.initializeCore();
            
            // Load and register components
            await this.loadComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize sections
            await this.initializeSections();
            
            // Start analytics
            this.analytics.initialize();
            
            this.isInitialized = true;
            console.log('✅ Application initialized successfully');
            
            // Trigger initial load complete event
            this.state.dispatch('APP_INITIALIZED');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Initialize core systems
     */
    async initializeCore() {
        // Initialize state management
        await this.state.init();
        
        // Initialize theme system
        this.theme.init();
        
        // Initialize language system  
        this.language.init();
        
        // Initialize navigation
        this.navigation.init();
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    /**
     * Load and register all components
     */
    async loadComponents() {
        const componentModules = [
            // Interactive Components - only load existing ones
            () => import('./components/drag-drop-component.js')
            
            // TODO: Add more components as they are implemented:
            // () => import('./components/terminal-simulator.js'),
            // () => import('./components/branch-visualizer.js'),
            // () => import('./components/comparison-tool.js'),
            // () => import('./components/three-states-demo.js'),
            // () => import('./components/hash-generator.js'),
            // () => import('./components/timeline-component.js'),
            // () => import('./components/collaboration-sim.js'),
            // () => import('./components/cicd-pipeline.js'),
            // () => import('./components/platform-comparison.js'),
            // () => import('./components/udl-checklist.js'),
            
            // Section Components - TODO: implement
            // () => import('./components/sections/part1-section.js'),
            // () => import('./components/sections/part2-section.js'),
            // () => import('./components/sections/part3-section.js'),
            // () => import('./components/sections/part4-section.js')
        ];

        // Load components with progress indication
        const total = componentModules.length;
        let loaded = 0;

        for (const moduleLoader of componentModules) {
            try {
                await moduleLoader();
                loaded++;
                
                // Update loading progress
                const progress = (loaded / total) * 100;
                this.state.dispatch('LOADING_PROGRESS', { progress });
                
            } catch (error) {
                console.warn('⚠️ Failed to load component:', error);
            }
        }

        console.log(`📦 Loaded ${loaded}/${total} components`);
    }

    /**
     * Set up global event listeners
     */
    setupEventListeners() {
        // Theme toggle buttons
        document.getElementById('theme-auto')?.addEventListener('click', () => {
            this.theme.setTheme('auto');
        });
        
        document.getElementById('theme-light')?.addEventListener('click', () => {
            this.theme.setTheme('light');
        });
        
        document.getElementById('theme-dark')?.addEventListener('click', () => {
            this.theme.setTheme('dark');
        });

        // Language toggle
        document.getElementById('language-toggle')?.addEventListener('change', (e) => {
            this.language.setLanguage(e.target.checked ? 'en' : 'es');
        });

        // Hero action buttons
        document.getElementById('start-learning')?.addEventListener('click', () => {
            this.startLearningJourney();
        });
        
        document.getElementById('progress-overview')?.addEventListener('click', () => {
            this.showProgressOverview();
        });

        // Navigation dots
        document.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const section = dot.dataset.section;
                this.navigation.navigateToSection(section);
            });
            
            // Keyboard navigation
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const section = dot.dataset.section;
                    this.navigation.navigateToSection(section);
                }
            });
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // State change listeners
        this.state.subscribe('SECTION_CHANGED', (data) => {
            this.navigation.updateActiveSection(data.section);
            this.analytics.trackSectionView(data.section);
        });

        this.state.subscribe('PROGRESS_UPDATED', (data) => {
            this.progress.updateProgressBar();
            this.analytics.trackProgress(data);
        });

        // Error handling
        window.addEventListener('error', (e) => {
            this.analytics.trackError(e.error);
            console.error('Global error:', e.error);
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.analytics.trackError(e.reason);
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    /**
     * Initialize content sections
     */
    async initializeSections() {
        const container = document.getElementById('content-sections');
        if (!container) {
            throw new Error('Content sections container not found');
        }

        // Create section placeholders
        const sections = [
            { id: 'part1', title: 'Fundamentos Conceptuales' },
            { id: 'part2', title: 'Ruta de Aprendizaje' },
            { id: 'part3', title: 'Ecosistema Extendido' },
            { id: 'part4', title: 'Pedagogía Inclusiva' }
        ];

        sections.forEach(section => {
            const sectionElement = document.createElement('div');
            sectionElement.id = section.id;
            sectionElement.className = 'section component-loading';
            sectionElement.innerHTML = `
                <div class="section-placeholder">
                    <div class="loading-spinner"></div>
                    <p>Cargando ${section.title}...</p>
                </div>
            `;
            container.appendChild(sectionElement);
        });

        // Set up intersection observer for lazy loading
        this.navigation.observeSections();
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Skip if user is typing in an input
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (event.key) {
            case '1':
                this.navigation.navigateToSection('hero');
                break;
            case '2':
                this.navigation.navigateToSection('part1');
                break;
            case '3':
                this.navigation.navigateToSection('part2');
                break;
            case '4':
                this.navigation.navigateToSection('part3');
                break;
            case '5':
                this.navigation.navigateToSection('part4');
                break;
            case 'h':
                this.showKeyboardShortcuts();
                break;
            case 'p':
                this.showProgressOverview();
                break;
            case 't':
                this.theme.toggleTheme();
                break;
            case 'l':
                this.language.toggleLanguage();
                break;
        }
    }

    /**
     * Start the learning journey
     */
    startLearningJourney() {
        this.analytics.trackAction('start_learning');
        this.navigation.navigateToSection('part1');
        
        // Show welcome message
        this.showNotification('¡Bienvenido! Comencemos tu viaje de aprendizaje.', 'success');
    }

    /**
     * Show progress overview
     */
    showProgressOverview() {
        this.analytics.trackAction('view_progress');
        const progress = this.progress.getProgressSummary();
        
        // Create and show progress modal
        const modal = this.createProgressModal(progress);
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 10000);
    }

    /**
     * Create progress modal
     */
    createProgressModal(progress) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Tu Progreso</h3>
                    <button class="close-modal p-1 rounded">
                        <i class="ph-x text-xl"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="progress-bar-container">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Progreso General</span>
                            <span>${progress.overall}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${progress.overall}%"></div>
                        </div>
                    </div>
                    ${progress.sections.map(section => `
                        <div class="section-progress">
                            <div class="flex justify-between text-sm mb-1">
                                <span>${section.title}</span>
                                <span>${section.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-green-600 h-1 rounded-full" style="width: ${section.progress}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Close modal on click outside or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.remove();
            }
        });

        return modal;
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="ph-${type === 'success' ? 'check-circle' : 'info'} text-xl"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Show keyboard shortcuts help
     */
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: '1-5', action: 'Navegar a secciones' },
            { key: 'H', action: 'Mostrar ayuda' },
            { key: 'P', action: 'Ver progreso' },
            { key: 'T', action: 'Cambiar tema' },
            { key: 'L', action: 'Cambiar idioma' }
        ];

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <h3 class="text-xl font-semibold mb-4">Atajos de Teclado</h3>
                <div class="space-y-2">
                    ${shortcuts.map(shortcut => `
                        <div class="flex justify-between">
                            <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">${shortcut.key}</kbd>
                            <span>${shortcut.action}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="mt-4 w-full btn btn-primary" onclick="this.closest('.fixed').remove()">
                    Cerrar
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container fixed inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900';
        errorContainer.innerHTML = `
            <div class="text-center p-8">
                <i class="ph-warning text-6xl text-red-500 mb-4"></i>
                <h2 class="text-2xl font-bold mb-2">Error de Inicialización</h2>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                    No se pudo inicializar la aplicación correctamente.
                </p>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    Recargar Página
                </button>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
    }
}

/**
 * Initialize Application
 */
document.addEventListener('DOMContentLoaded', async () => {
    const app = new GitPedagogyApp();
    
    // Global app reference for debugging
    window.gitPedagogyApp = app;
    
    // Initialize the application
    await app.init();
});

// Handle module load errors
window.addEventListener('error', (e) => {
    if (e.filename && e.filename.includes('.js')) {
        console.error('Failed to load module:', e.filename);
    }
});

export default GitPedagogyApp;