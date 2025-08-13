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
            // Interactive Components - Phase 1 Complete
            () => import('./components/drag-drop-component.js'),
            () => import('./components/three-states-component.js'),
            () => import('./components/comparison-tool-component.js'),
            () => import('./components/hash-generator-component.js')
            
            // TODO: Add more components as they are implemented:
            // () => import('./components/terminal-simulator.js'),
            // () => import('./components/branch-visualizer.js'),
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

        // Create actual content sections with real content
        const sections = [
            { 
                id: 'part1', 
                title: 'Fundamentos Conceptuales',
                content: this.createPart1Content()
            },
            { 
                id: 'part2', 
                title: 'Ruta de Aprendizaje',
                content: this.createPart2Content()
            },
            { 
                id: 'part3', 
                title: 'Ecosistema Extendido',
                content: this.createPart3Content()
            },
            { 
                id: 'part4', 
                title: 'Pedagogía Inclusiva',
                content: this.createPart4Content()
            }
        ];

        sections.forEach(section => {
            const sectionElement = document.createElement('section');
            sectionElement.id = section.id;
            sectionElement.className = 'section py-20';
            sectionElement.innerHTML = section.content;
            container.appendChild(sectionElement);
        });

        // Set up intersection observer for lazy loading
        this.navigation.observeSections();
        
        console.log('📄 Content sections initialized with real content');
    }

    /**
     * Create Part 1 content - Conceptual Foundations
     */
    createPart1Content() {
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold mb-4 text-center" style="color: var(--text);">
                    Parte I: Fundamentos Conceptuales del Control de Versiones
                </h2>
                <p class="text-xl text-center mb-12" style="color: var(--neutral);">
                    Más allá de "Guardar Como..." - La base teórica del desarrollo colaborativo moderno
                </p>

                <!-- Section 1.1: Defining Version Control -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-question-mark-duotone mr-3" style="color: var(--primary);"></i>
                        1.1 Definiendo el Control de Versiones: Más allá de "Guardar Como..."
                    </h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="concept-explanation">
                            <div class="comparison-container">
                                <h4 class="text-lg font-semibold mb-4 text-red-600">❌ Enfoque Manual (Problemático)</h4>
                                <div class="manual-files">
                                    <div class="file-item">📄 proyecto_v1.docx</div>
                                    <div class="file-item">📄 proyecto_v2_final.docx</div>
                                    <div class="file-item">📄 proyecto_v2_final_REAL.docx</div>
                                    <div class="file-item">📄 proyecto_v3_corregido.docx</div>
                                    <div class="file-item">📄 proyecto_final_definitivo.docx</div>
                                </div>
                                <p class="text-sm mt-3 text-red-600">¿Cuál es la versión correcta? ¿Qué cambios se hicieron?</p>
                            </div>
                        </div>
                        
                        <div class="concept-explanation">
                            <div class="comparison-container">
                                <h4 class="text-lg font-semibold mb-4 text-green-600">✅ Sistema de Control de Versiones</h4>
                                <div class="vcs-structure">
                                    <div class="vcs-item">🗄️ Base de datos especializada</div>
                                    <div class="vcs-item">📊 Historial completo automático</div>
                                    <div class="vcs-item">👥 Colaboración sin conflictos</div>
                                    <div class="vcs-item">🔒 Integridad garantizada</div>
                                    <div class="vcs-item">⏪ Recuperación instantánea</div>
                                </div>
                                <p class="text-sm mt-3 text-green-600">Cada cambio registrado con precisión y contexto</p>
                            </div>
                        </div>
                    </div>

                    <div class="key-insight">
                        <i class="ph-lightbulb text-2xl mr-3" style="color: var(--accent);"></i>
                        <p><strong>Concepto Clave:</strong> Un VCS no es solo una herramienta de respaldo, sino el pilar fundamental sobre el cual se construye todo el desarrollo colaborativo, las prácticas DevOps y la integridad del proyecto.</p>
                    </div>
                </section>

                <!-- Interactive Component: Drag Drop Exercise -->
                <section class="mb-16">
                    <div class="interactive-component-container">
                        <git-drag-drop></git-drag-drop>
                    </div>
                </section>

                <!-- Section 1.2: Core Benefits -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-star-four-duotone mr-3" style="color: var(--secondary);"></i>
                        1.2 Los Beneficios Fundamentales: Colaboración, Historial y Recuperación
                    </h3>

                    <div class="benefits-grid">
                        <div class="benefit-card collaboration">
                            <div class="benefit-header">
                                <i class="ph-users-three text-4xl mb-4" style="color: var(--primary);"></i>
                                <h4 class="text-xl font-semibold mb-3">Colaboración y Desarrollo Paralelo</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Permite que múltiples desarrolladores trabajen simultáneamente sin sobrescribir cambios.</p>
                                <ul class="benefit-list">
                                    <li>Sincronización automática de cambios</li>
                                    <li>Resolución inteligente de conflictos</li>
                                    <li>Flujos de trabajo estructurados</li>
                                </ul>
                                <div class="mini-demo">
                                    <div class="developer">👨‍💻 Dev A</div>
                                    <div class="sync-arrow">↔️</div>
                                    <div class="repository">🏛️ Repo</div>
                                    <div class="sync-arrow">↔️</div>
                                    <div class="developer">👩‍💻 Dev B</div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card history">
                            <div class="benefit-header">
                                <i class="ph-clock-clockwise text-4xl mb-4" style="color: var(--secondary);"></i>
                                <h4 class="text-xl font-semibold mb-3">Historial y Trazabilidad</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Cada cambio queda registrado con metadatos completos y propósito.</p>
                                <ul class="benefit-list">
                                    <li>Quién hizo qué cambio y cuándo</li>
                                    <li>Razones documentadas para cada modificación</li>
                                    <li>Seguimiento del origen de errores</li>
                                </ul>
                                <div class="commit-example">
                                    <div class="commit-line">
                                        <span class="commit-hash">a3b7c9d</span>
                                        <span class="commit-author">María González</span>
                                        <span class="commit-date">2024-03-15</span>
                                    </div>
                                    <div class="commit-message">"Implementar autenticación de usuarios"</div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card recovery">
                            <div class="benefit-header">
                                <i class="ph-shield-check text-4xl mb-4" style="color: var(--success);"></i>
                                <h4 class="text-xl font-semibold mb-3">Recuperación y Experimentación</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Red de seguridad que permite experimentación confiada y recuperación instantánea.</p>
                                <ul class="benefit-list">
                                    <li>Reversión a estados anteriores estables</li>
                                    <li>Experimentación en ramas aisladas</li>
                                    <li>Protección contra pérdida de datos</li>
                                </ul>
                                <div class="recovery-demo">
                                    <div class="timeline">
                                        <div class="timeline-point stable">✅ Estable</div>
                                        <div class="timeline-point experiment">🧪 Experimento</div>
                                        <div class="timeline-point error">❌ Error</div>
                                        <div class="timeline-point recovery">↩️ Recuperar</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card branching">
                            <div class="benefit-header">
                                <i class="ph-git-branch text-4xl mb-4" style="color: var(--accent);"></i>
                                <h4 class="text-xl font-semibold mb-3">Ramificación y Fusión</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Desarrollo paralelo independiente con integración controlada.</p>
                                <ul class="benefit-list">
                                    <li>Líneas de desarrollo aisladas</li>
                                    <li>Integración segura de características</li>
                                    <li>Código principal siempre estable</li>
                                </ul>
                                <div class="branch-visual">
                                    <div class="main-branch">main ——————————————————————————————————</div>
                                    <div class="feature-branch">feature ——————————————————————————————————⤴</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 1.3: CVCS vs DVCS Comparison -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-arrows-split-duotone mr-3" style="color: var(--primary);"></i>
                        1.3 Paradigmas Arquitecturales: Sistemas Centralizados vs Distribuidos
                    </h3>

                    <div class="architecture-intro mb-8">
                        <p class="text-lg mb-4" style="color: var(--neutral);">
                            La arquitectura de un sistema de control de versiones determina cómo se almacenan los datos y cómo colaboran los desarrolladores. Entender estas diferencias es crucial para apreciar por qué Git se ha convertido en el estándar de la industria.
                        </p>
                    </div>

                    <!-- Interactive Comparison Tool -->
                    <div class="interactive-component-container mb-8">
                        <git-comparison-tool></git-comparison-tool>
                    </div>

                    <!-- Detailed Comparison Table -->
                    <div class="comparison-table-container">
                        <table class="architecture-comparison-table">
                            <thead>
                                <tr>
                                    <th>Característica</th>
                                    <th class="cvcs-column">
                                        <i class="ph-building-office mr-2"></i>
                                        Centralizado (CVCS)
                                    </th>
                                    <th class="dvcs-column">
                                        <i class="ph-network mr-2"></i>
                                        Distribuido (DVCS)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Modelo de Repositorio</strong></td>
                                    <td>Un repositorio central en el servidor. Los clientes tienen solo una copia de trabajo.</td>
                                    <td>Cada desarrollador tiene un clon completo del repositorio con todo el historial.</td>
                                </tr>
                                <tr>
                                    <td><strong>Flujo de Trabajo</strong></td>
                                    <td>Check out → Modificar → Commit al servidor central</td>
                                    <td>Clonar → Trabajar localmente → Push/Pull para compartir cambios</td>
                                </tr>
                                <tr>
                                    <td><strong>Velocidad</strong></td>
                                    <td>Más lento, requiere comunicación constante con el servidor</td>
                                    <td>Más rápido, la mayoría de operaciones son locales</td>
                                </tr>
                                <tr>
                                    <td><strong>Capacidad Offline</strong></td>
                                    <td>Limitada, requiere conexión constante para la mayoría de acciones</td>
                                    <td>Excelente, se puede trabajar completamente offline</td>
                                </tr>
                                <tr>
                                    <td><strong>Ramificación y Fusión</strong></td>
                                    <td>Puede ser lenta y engorrosa</td>
                                    <td>Rápida, flexible y eficiente</td>
                                </tr>
                                <tr>
                                    <td><strong>Resistencia a Fallos</strong></td>
                                    <td>Vulnerable, el servidor central es un punto único de fallo</td>
                                    <td>Muy resistente, cada clon es un respaldo completo</td>
                                </tr>
                                <tr>
                                    <td><strong>Casos de Uso Ideales</strong></td>
                                    <td>Equipos pequeños, ubicación única, control centralizado estricto</td>
                                    <td>Equipos distribuidos, proyectos open source, alta flexibilidad</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Section 2: Git Philosophy -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-brain-duotone mr-3" style="color: var(--accent);"></i>
                        2. La Filosofía de Git: Pensando en Instantáneas
                    </h3>

                    <div class="git-philosophy mb-8">
                        <div class="philosophy-intro">
                            <p class="text-lg mb-6" style="color: var(--neutral);">
                                Para usar Git efectivamente, es esencial entender no solo sus comandos, sino la filosofía de diseño subyacente que lo hace tan poderoso y distinto de sus predecesores.
                            </p>
                        </div>

                        <div class="grid md:grid-cols-2 gap-8 mb-8">
                            <div class="concept-card">
                                <h4 class="text-xl font-semibold mb-4">
                                    <i class="ph-camera-duotone mr-2" style="color: var(--primary);"></i>
                                    Modelo de Datos: Instantáneas vs Deltas
                                </h4>
                                <div class="data-model-comparison">
                                    <div class="traditional-model mb-4">
                                        <h5 class="font-semibold text-red-600 mb-2">❌ Sistemas Tradicionales (Deltas)</h5>
                                        <div class="delta-visualization">
                                            <div class="file-version">Archivo v1</div>
                                            <div class="delta">+ línea agregada</div>
                                            <div class="file-version">Archivo v2</div>
                                            <div class="delta">- línea eliminada</div>
                                            <div class="file-version">Archivo v3</div>
                                        </div>
                                    </div>
                                    <div class="git-model">
                                        <h5 class="font-semibold text-green-600 mb-2">✅ Git (Instantáneas)</h5>
                                        <div class="snapshot-visualization">
                                            <div class="snapshot">📷 Snapshot 1</div>
                                            <div class="snapshot">📷 Snapshot 2</div>
                                            <div class="snapshot">📷 Snapshot 3</div>
                                        </div>
                                        <p class="text-sm mt-2 text-green-600">Cada commit es una foto completa del proyecto</p>
                                    </div>
                                </div>
                            </div>

                            <div class="concept-card">
                                <h4 class="text-xl font-semibold mb-4">
                                    <i class="ph-lock-duotone mr-2" style="color: var(--secondary);"></i>
                                    Integridad de Datos: SHA-1 Hashing
                                </h4>
                                <div class="integrity-demo">
                                    <p class="mb-3">Todo en Git se identifica por su checksum SHA-1:</p>
                                    <div class="hash-example mb-3">
                                        <div class="file-content">Contenido del archivo</div>
                                        <div class="hash-arrow">↓ SHA-1</div>
                                        <div class="hash-result">a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0</div>
                                    </div>
                                    <p class="text-sm" style="color: var(--neutral);">
                                        Imposible alterar contenido sin que Git lo detecte
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 2.3: The Three States -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-stack-duotone mr-3" style="color: var(--primary);"></i>
                        2.3 Los Tres Estados: El Viaje desde el Directorio de Trabajo al Repositorio
                    </h3>

                    <div class="three-states-intro mb-8">
                        <p class="text-lg mb-4" style="color: var(--neutral);">
                            Para usar Git efectivamente, debes internalizar que los archivos pueden residir en tres estados principales. Este proceso de tres etapas es central al flujo de trabajo de Git.
                        </p>
                    </div>

                    <!-- Interactive Three States Demo -->
                    <div class="interactive-component-container mb-8">
                        <git-three-states></git-three-states>
                    </div>

                    <div class="states-explanation">
                        <div class="state-detail">
                            <div class="state-icon modified">
                                <i class="ph-pencil-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--accent);">1. Modificado (Modified)</h4>
                                <p class="mb-3">Archivos que han sido cambiados pero aún no están registrados formalmente. Estos cambios existen solo en tu <strong>Directorio de Trabajo</strong> visible.</p>
                                <div class="state-commands">
                                    <code>git status</code> <span class="command-desc">→ muestra archivos modificados</span>
                                </div>
                            </div>
                        </div>

                        <div class="state-detail">
                            <div class="state-icon staged">
                                <i class="ph-staging-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--primary);">2. Preparado (Staged)</h4>
                                <p class="mb-3">Archivos marcados para ser incluidos en la próxima instantánea del commit. Residen en el <strong>Área de Preparación</strong> (staging area o "index").</p>
                                <div class="state-commands">
                                    <code>git add archivo.js</code> <span class="command-desc">→ prepara archivo para commit</span>
                                </div>
                            </div>
                        </div>

                        <div class="state-detail">
                            <div class="state-icon committed">
                                <i class="ph-database-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--success);">3. Confirmado (Committed)</h4>
                                <p class="mb-3">Los datos del área de preparación han sido almacenados como una instantánea permanente en el <strong>Directorio Git</strong> (carpeta oculta .git).</p>
                                <div class="state-commands">
                                    <code>git commit -m "mensaje"</code> <span class="command-desc">→ crea instantánea permanente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Interactive SHA-1 Hash Generator -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-fingerprint-duotone mr-3" style="color: var(--accent);"></i>
                        Demostración: Generador de Hash SHA-1
                    </h3>
                    <div class="interactive-component-container">
                        <git-hash-generator></git-hash-generator>
                    </div>
                </section>

                <!-- Key Takeaways -->
                <section class="key-takeaways">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-key-duotone mr-3" style="color: var(--primary);"></i>
                        Conceptos Clave para Recordar
                    </h3>
                    <div class="takeaway-grid">
                        <div class="takeaway-item">
                            <i class="ph-camera text-2xl mb-2" style="color: var(--primary);"></i>
                            <h4 class="font-semibold mb-2">Git piensa en instantáneas</h4>
                            <p class="text-sm">Cada commit es una foto completa del proyecto, no una lista de cambios</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-stack text-2xl mb-2" style="color: var(--secondary);"></i>
                            <h4 class="font-semibold mb-2">Tres estados fundamentales</h4>
                            <p class="text-sm">Modificado → Preparado → Confirmado es el flujo central de Git</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-shield-check text-2xl mb-2" style="color: var(--success);"></i>
                            <h4 class="font-semibold mb-2">Integridad garantizada</h4>
                            <p class="text-sm">SHA-1 hashing protege contra corrupción y alteración maliciosa</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-network text-2xl mb-2" style="color: var(--accent);"></i>
                            <h4 class="font-semibold mb-2">Distribución = Resistencia</h4>
                            <p class="text-sm">Cada clon es un respaldo completo, eliminando puntos únicos de fallo</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    /**
     * Create Part 2 content
     */
    createPart2Content() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);">
                    Parte II: Ruta de Aprendizaje
                </h2>
                
                <div class="learning-path">
                    <div class="path-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3 class="text-xl font-semibold mb-2">Comandos Básicos</h3>
                            <p class="mb-4">Aprende los comandos esenciales para iniciar tu trabajo con Git.</p>
                            <div class="code-example">
                                <code>git init<br>git add .<br>git commit -m "Initial commit"</code>
                            </div>
                        </div>
                    </div>

                    <div class="path-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3 class="text-xl font-semibold mb-2">Trabajo con Ramas</h3>
                            <p class="mb-4">Domina el concepto de ramificación para desarrollo paralelo.</p>
                            <div class="code-example">
                                <code>git branch feature<br>git checkout feature<br>git merge feature</code>
                            </div>
                        </div>
                    </div>

                    <div class="path-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3 class="text-xl font-semibold mb-2">Colaboración</h3>
                            <p class="mb-4">Aprende a trabajar en equipo usando repositorios remotos.</p>
                            <div class="code-example">
                                <code>git clone &lt;url&gt;<br>git push origin main<br>git pull origin main</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create Part 3 content  
     */
    createPart3Content() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);">
                    Parte III: Ecosistema Extendido
                </h2>
                
                <div class="ecosystem-grid">
                    <div class="platform-card">
                        <i class="ph-github-logo text-4xl mb-4" style="color: var(--text);"></i>
                        <h3 class="text-xl font-semibold mb-2">GitHub</h3>
                        <p>Plataforma líder para desarrollo colaborativo con herramientas integradas de CI/CD.</p>
                    </div>

                    <div class="platform-card">
                        <i class="ph-gitlab-logo-simple text-4xl mb-4" style="color: var(--accent);"></i>
                        <h3 class="text-xl font-semibold mb-2">GitLab</h3>
                        <p>Plataforma completa DevOps con repositorios, CI/CD y gestión de proyectos.</p>
                    </div>

                    <div class="platform-card">
                        <i class="ph-git-branch text-4xl mb-4" style="color: var(--primary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Bitbucket</h3>
                        <p>Solución de Atlassian integrada con Jira y otras herramientas de desarrollo.</p>
                    </div>
                </div>

                <div class="mt-12">
                    <h3 class="text-2xl font-semibold mb-6">Herramientas Complementarias</h3>
                    <div class="tools-grid">
                        <div class="tool-item">
                            <strong>Git GUI:</strong> Interfaces gráficas como GitKraken, SourceTree
                        </div>
                        <div class="tool-item">
                            <strong>IDE Integration:</strong> VS Code, IntelliJ, Eclipse
                        </div>
                        <div class="tool-item">
                            <strong>CI/CD:</strong> GitHub Actions, GitLab CI, Jenkins
                        </div>
                        <div class="tool-item">
                            <strong>Code Review:</strong> Pull Requests, Merge Requests
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create Part 4 content
     */
    createPart4Content() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);">
                    Parte IV: Pedagogía Inclusiva
                </h2>
                
                <div class="accessibility-features">
                    <div class="feature-card">
                        <i class="ph-universal-access text-3xl mb-4" style="color: var(--success);"></i>
                        <h3 class="text-xl font-semibold mb-2">Accesibilidad Universal</h3>
                        <p>Diseño que considera diferentes estilos de aprendizaje y necesidades de accesibilidad.</p>
                        <ul class="mt-4 space-y-2">
                            <li>✅ Compatible con lectores de pantalla</li>
                            <li>✅ Navegación por teclado completa</li>
                            <li>✅ Alto contraste disponible</li>
                            <li>✅ Texto ajustable</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <i class="ph-brain text-3xl mb-4" style="color: var(--primary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Neurodiversidad</h3>
                        <p>Enfoque pedagógico que celebra diferentes formas de pensar y procesar información.</p>
                        <ul class="mt-4 space-y-2">
                            <li>🧠 Múltiples modalidades de aprendizaje</li>
                            <li>⏱️ Ritmo de aprendizaje flexible</li>
                            <li>🎯 Objetivos claros y estructurados</li>
                            <li>🔄 Retroalimentación constante</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <i class="ph-chalkboard-teacher text-3xl mb-4" style="color: var(--secondary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Metodología UDL</h3>
                        <p>Universal Design for Learning aplicado al aprendizaje de tecnología.</p>
                        <ul class="mt-4 space-y-2">
                            <li>📚 Múltiples formas de representación</li>
                            <li>🎮 Múltiples formas de participación</li>
                            <li>✍️ Múltiples formas de expresión</li>
                            <li>🎨 Personalización del entorno</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-12 text-center">
                    <h3 class="text-2xl font-semibold mb-4">Para Educadores</h3>
                    <p class="text-lg mb-6" style="color: var(--neutral);">
                        Esta guía está diseñada para ser utilizada en el aula universitaria, 
                        proporcionando herramientas y recursos para enseñar Git de manera inclusiva.
                    </p>
                    <button class="btn btn-primary">
                        <i class="ph-download"></i>
                        Descargar Guía del Educador
                    </button>
                </div>
            </div>
        `;
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