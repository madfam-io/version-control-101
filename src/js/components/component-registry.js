/**
 * Component Registry
 * Manages registration and lifecycle of Web Components
 */

import { LitElement, html, css } from 'lit';

/**
 * Base Component Class
 * All interactive components extend from this
 */
export class BaseComponent extends LitElement {
    static properties = {
        lang: { type: String },
        theme: { type: String },
        progress: { type: Object }
    };

    constructor() {
        super();
        this.lang = 'es';
        this.theme = 'light';
        this.progress = {};
    }

    /**
     * Common styles for all components
     */
    static styles = css`
        :host {
            --primary: #2563eb;
            --secondary: #059669;
            --accent: #d97706;
            --success: #22c55e;
            --warning: #f59e0b;
            --danger: #ef4444;
            --neutral: #64748b;
            --bg: #f1f5f9;
            --text: #0f172a;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
            
            display: block;
            font-family: 'Poppins', system-ui, sans-serif;
        }

        :host([theme="dark"]) {
            --primary: #3b82f6;
            --secondary: #10b981;
            --accent: #f59e0b;
            --neutral: #94a3b8;
            --bg: #020617;
            --text: #e2e8f0;
            --card-bg: #0f172a;
            --border-color: #1e293b;
        }

        .component-container {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1rem;
            color: var(--text);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            text-decoration: none;
        }

        .btn-primary {
            background-color: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        .btn-secondary {
            background-color: transparent;
            color: var(--primary);
            border: 1px solid var(--primary);
        }

        .btn-secondary:hover {
            background-color: var(--primary);
            color: white;
        }

        .loading {
            opacity: 0.6;
            pointer-events: none;
        }

        .success {
            color: var(--success);
        }

        .error {
            color: var(--danger);
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;

    /**
     * Emit custom event
     */
    emit(eventName, detail = {}) {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail,
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Get translated text
     */
    t(key, fallback = '') {
        // This would connect to the translation system
        return fallback || key;
    }

    /**
     * Track interaction for analytics
     */
    track(action, data = {}) {
        this.emit('track-interaction', {
            component: this.tagName.toLowerCase(),
            action,
            data
        });
    }

    /**
     * Update progress
     */
    updateProgress(activity, completed = true) {
        this.emit('progress-update', {
            component: this.tagName.toLowerCase(),
            activity,
            completed
        });
    }
}

/**
 * Component Registry Class
 */
export class ComponentRegistry {
    constructor() {
        this.components = new Map();
        this.initialized = false;
    }

    /**
     * Register a component
     */
    register(tagName, componentClass) {
        if (customElements.get(tagName)) {
            console.warn(`Component ${tagName} is already registered`);
            return;
        }

        try {
            customElements.define(tagName, componentClass);
            this.components.set(tagName, componentClass);
            console.log(`✅ Registered component: ${tagName}`);
        } catch (error) {
            console.error(`❌ Failed to register component ${tagName}:`, error);
        }
    }

    /**
     * Get registered component
     */
    get(tagName) {
        return this.components.get(tagName);
    }

    /**
     * Check if component is registered
     */
    has(tagName) {
        return this.components.has(tagName);
    }

    /**
     * Get all registered components
     */
    getAll() {
        return Array.from(this.components.keys());
    }

    /**
     * Create component element
     */
    createElement(tagName, attributes = {}) {
        if (!this.has(tagName)) {
            throw new Error(`Component ${tagName} is not registered`);
        }

        const element = document.createElement(tagName);
        
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                if (value) element.setAttribute(key, '');
            } else {
                element.setAttribute(key, String(value));
            }
        });

        return element;
    }

    /**
     * Initialize all components
     */
    async initialize() {
        if (this.initialized) {
            return;
        }

        console.log('🔧 Initializing Component Registry...');

        // Register base components first
        this.registerBaseComponents();

        this.initialized = true;
        console.log('✅ Component Registry initialized');
    }

    /**
     * Register base components
     */
    registerBaseComponents() {
        // These will be implemented as separate files
        const baseComponents = [
            'git-drag-drop',
            'git-terminal',
            'git-branch-visualizer', 
            'git-comparison-tool',
            'git-three-states',
            'git-hash-generator',
            'git-timeline',
            'git-collaboration-sim',
            'git-cicd-pipeline',
            'git-platform-comparison',
            'git-udl-checklist'
        ];

        // Register placeholder components
        baseComponents.forEach(tagName => {
            if (!customElements.get(tagName)) {
                this.register(tagName, class extends BaseComponent {
                    render() {
                        return html`
                            <div class="component-container">
                                <p>Loading ${tagName}...</p>
                            </div>
                        `;
                    }
                });
            }
        });
    }

    /**
     * Lazy load component
     */
    async lazyLoad(tagName, moduleLoader) {
        try {
            if (this.has(tagName)) {
                return this.get(tagName);
            }

            console.log(`📦 Lazy loading ${tagName}...`);
            const module = await moduleLoader();
            
            if (module.default) {
                this.register(tagName, module.default);
                return module.default;
            } else {
                throw new Error(`Module for ${tagName} does not export default`);
            }
        } catch (error) {
            console.error(`Failed to lazy load ${tagName}:`, error);
            throw error;
        }
    }

    /**
     * Batch register components
     */
    batchRegister(components) {
        const results = [];
        
        components.forEach(({ tagName, componentClass }) => {
            try {
                this.register(tagName, componentClass);
                results.push({ tagName, success: true });
            } catch (error) {
                results.push({ tagName, success: false, error });
            }
        });

        return results;
    }

    /**
     * Unregister component (for hot reloading in development)
     */
    unregister(tagName) {
        if (this.components.has(tagName)) {
            this.components.delete(tagName);
            console.log(`🗑️ Unregistered component: ${tagName}`);
        }
    }

    /**
     * Get component usage statistics
     */
    getUsageStats() {
        const stats = {};
        
        this.components.forEach((componentClass, tagName) => {
            const elements = document.querySelectorAll(tagName);
            stats[tagName] = {
                registered: true,
                instances: elements.length,
                class: componentClass.name
            };
        });

        return stats;
    }

    /**
     * Validate component health
     */
    validateComponents() {
        const issues = [];
        
        this.components.forEach((componentClass, tagName) => {
            try {
                // Check if component can be instantiated
                const testElement = new componentClass();
                
                // Check required methods
                const requiredMethods = ['render'];
                requiredMethods.forEach(method => {
                    if (typeof testElement[method] !== 'function') {
                        issues.push({
                            component: tagName,
                            issue: `Missing required method: ${method}`
                        });
                    }
                });
                
            } catch (error) {
                issues.push({
                    component: tagName,
                    issue: `Cannot instantiate: ${error.message}`
                });
            }
        });

        return issues;
    }

    /**
     * Development utilities
     */
    dev = {
        // List all components
        list: () => {
            console.table(this.getUsageStats());
        },

        // Hot reload component
        reload: async (tagName, moduleLoader) => {
            this.unregister(tagName);
            await this.lazyLoad(tagName, moduleLoader);
            
            // Trigger re-render of existing instances
            document.querySelectorAll(tagName).forEach(element => {
                if (element.requestUpdate) {
                    element.requestUpdate();
                }
            });
        },

        // Validate all components
        validate: () => {
            const issues = this.validateComponents();
            if (issues.length === 0) {
                console.log('✅ All components are valid');
            } else {
                console.warn('⚠️ Component validation issues:', issues);
            }
            return issues;
        }
    };
}

/**
 * Global component utilities
 */
export const ComponentUtils = {
    /**
     * Wait for component to be defined
     */
    whenDefined(tagName) {
        return customElements.whenDefined(tagName);
    },

    /**
     * Upgrade element to component
     */
    upgrade(element) {
        customElements.upgrade(element);
    },

    /**
     * Check if element is a custom component
     */
    isCustomElement(element) {
        return element.tagName.includes('-');
    },

    /**
     * Get component instance from element
     */
    getInstance(element) {
        return this.isCustomElement(element) ? element : null;
    }
};

export default ComponentRegistry;