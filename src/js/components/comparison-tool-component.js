/**
 * Comparison Tool Component
 * Interactive comparison between CVCS and DVCS architectures
 */

import { html, css } from 'lit';
import { BaseComponent } from './component-registry.js';

export class GitComparisonToolComponent extends BaseComponent {
    static properties = {
        currentView: { type: String },
        animationStep: { type: Number },
        isAnimating: { type: Boolean },
        selectedFeature: { type: String }
    };

    static styles = [
        BaseComponent.styles,
        css`
            :host {
                display: block;
                margin: 1rem 0;
            }

            .comparison-container {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.75rem;
                padding: 2rem;
                margin: 1rem 0;
            }

            .title {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--text);
                text-align: center;
            }

            .view-toggles {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
            }

            .toggle-btn {
                padding: 0.75rem 1.5rem;
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                background: var(--bg);
                color: var(--text);
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .toggle-btn:hover {
                border-color: var(--primary);
                background: var(--card-bg);
            }

            .toggle-btn.active {
                background: var(--primary);
                color: white;
                border-color: var(--primary);
            }

            .architecture-view {
                min-height: 400px;
                position: relative;
                background: var(--bg);
                border-radius: 0.5rem;
                border: 1px solid var(--border-color);
                overflow: hidden;
            }

            /* CVCS Architecture */
            .cvcs-architecture {
                padding: 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
            }

            .central-server {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                border-radius: 0.75rem;
                padding: 1.5rem;
                text-align: center;
                min-width: 200px;
                position: relative;
                box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
            }

            .central-server::before {
                content: '⚠️';
                position: absolute;
                top: -10px;
                right: -10px;
                background: #f59e0b;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.875rem;
            }

            .clients-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                width: 100%;
                max-width: 600px;
            }

            .client-node {
                background: var(--card-bg);
                border: 2px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                text-align: center;
                position: relative;
            }

            .client-node.limited {
                border-color: #f59e0b;
                background: rgba(245, 158, 11, 0.1);
            }

            /* DVCS Architecture */
            .dvcs-architecture {
                padding: 2rem;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                gap: 1rem;
                place-items: center;
            }

            .developer-node {
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                border-radius: 0.75rem;
                padding: 1rem;
                text-align: center;
                min-width: 120px;
                position: relative;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
                transition: all 0.3s ease;
            }

            .developer-node:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
            }

            .developer-node.complete {
                background: linear-gradient(135deg, var(--success), #059669);
            }

            .developer-node::after {
                content: '✓ Full History';
                position: absolute;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.625rem;
                color: var(--success);
                font-weight: 600;
            }

            /* Connection Lines */
            .connections {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }

            .connection-line {
                stroke: var(--primary);
                stroke-width: 2;
                stroke-dasharray: 5,5;
                opacity: 0.6;
                animation: flow 2s linear infinite;
            }

            .connection-line.bidirectional {
                stroke: var(--success);
                stroke-width: 3;
                opacity: 0.8;
            }

            /* Feature Comparison */
            .feature-comparison {
                margin-top: 2rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .feature-card {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .feature-card:hover {
                border-color: var(--primary);
                transform: translateY(-2px);
            }

            .feature-card.selected {
                border-color: var(--primary);
                background: rgba(37, 99, 235, 0.05);
            }

            .feature-card.cvcs {
                border-left: 4px solid #ef4444;
            }

            .feature-card.dvcs {
                border-left: 4px solid var(--success);
            }

            .feature-title {
                font-weight: 600;
                color: var(--text);
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .feature-description {
                font-size: 0.875rem;
                color: var(--neutral);
                line-height: 1.4;
            }

            .pros-cons {
                margin-top: 0.75rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .pro, .con {
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
            }

            .pro {
                background: rgba(34, 197, 94, 0.1);
                color: var(--success);
            }

            .pro::before {
                content: '✓ ';
            }

            .con {
                background: rgba(239, 68, 68, 0.1);
                color: #dc2626;
            }

            .con::before {
                content: '✗ ';
            }

            /* Animation Controls */
            .animation-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 1.5rem;
            }

            .anim-btn {
                background: var(--primary);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                cursor: pointer;
                font-size: 0.875rem;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .anim-btn:hover {
                background: var(--secondary);
                transform: translateY(-1px);
            }

            .anim-btn:disabled {
                background: var(--neutral);
                cursor: not-allowed;
                transform: none;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .comparison-container {
                    padding: 1rem;
                }

                .view-toggles {
                    flex-direction: column;
                    align-items: center;
                }

                .clients-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .dvcs-architecture {
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: repeat(2, 1fr);
                }

                .feature-comparison {
                    grid-template-columns: 1fr;
                }

                .developer-node {
                    min-width: 100px;
                    padding: 0.75rem;
                }
            }

            @keyframes flow {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -10; }
            }

            @keyframes highlight {
                0%, 100% { box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); }
                50% { box-shadow: 0 8px 25px rgba(37, 99, 235, 0.6); }
            }

            .node-highlight {
                animation: highlight 2s ease-in-out infinite;
            }
        `
    ];

    constructor() {
        super();
        this.currentView = 'cvcs';
        this.animationStep = 0;
        this.isAnimating = false;
        this.selectedFeature = '';
        this.features = this.createFeatures();
    }

    createFeatures() {
        return {
            workflow: {
                cvcs: {
                    title: 'Flujo de Trabajo Centralizado',
                    description: 'Los desarrolladores se conectan a un servidor central para todas las operaciones.',
                    pros: ['Control centralizado', 'Administración simplificada'],
                    cons: ['Punto único de fallo', 'Requiere conectividad constante']
                },
                dvcs: {
                    title: 'Flujo de Trabajo Distribuido',
                    description: 'Cada desarrollador tiene una copia completa del repositorio.',
                    pros: ['Sin punto único de fallo', 'Trabajo offline completo'],
                    cons: ['Mayor complejidad inicial', 'Más espacio de almacenamiento']
                }
            },
            performance: {
                cvcs: {
                    title: 'Rendimiento Dependiente de Red',
                    description: 'Las operaciones requieren comunicación con el servidor central.',
                    pros: ['Menos uso de espacio local'],
                    cons: ['Lento con conexiones pobres', 'Latencia en operaciones básicas']
                },
                dvcs: {
                    title: 'Rendimiento Local Óptimo',
                    description: 'La mayoría de operaciones son instantáneas y locales.',
                    pros: ['Operaciones muy rápidas', 'Sin dependencia de red'],
                    cons: ['Mayor uso de espacio local']
                }
            },
            branching: {
                cvcs: {
                    title: 'Ramificación Limitada',
                    description: 'Crear ramas puede ser lento y complejo.',
                    pros: ['Ramas centralmente gestionadas'],
                    cons: ['Ramificación costosa', 'Fusiones complejas']
                },
                dvcs: {
                    title: 'Ramificación Flexible',
                    description: 'Las ramas son ligeras y se crean instantáneamente.',
                    pros: ['Ramas muy rápidas', 'Experimentación fácil'],
                    cons: ['Puede crear muchas ramas']
                }
            },
            collaboration: {
                cvcs: {
                    title: 'Colaboración Secuencial',
                    description: 'Los desarrolladores deben coordinarse para evitar conflictos.',
                    pros: ['Proceso de fusión controlado'],
                    cons: ['Bloqueos frecuentes', 'Coordinación manual requerida']
                },
                dvcs: {
                    title: 'Colaboración Paralela',
                    description: 'Múltiples desarrolladores pueden trabajar independientemente.',
                    pros: ['Trabajo paralelo total', 'Integración flexible'],
                    cons: ['Conflictos de fusión más complejos']
                }
            }
        };
    }

    render() {
        return html`
            <div class="comparison-container">
                <h4 class="title">
                    ${this.lang === 'es' 
                        ? 'Comparación Interactiva: CVCS vs DVCS'
                        : 'Interactive Comparison: CVCS vs DVCS'}
                </h4>

                <!-- View Toggle -->
                <div class="view-toggles">
                    <button 
                        class="toggle-btn ${this.currentView === 'cvcs' ? 'active' : ''}"
                        @click="${() => this.setView('cvcs')}"
                    >
                        <i class="ph-building-office"></i>
                        ${this.lang === 'es' ? 'Centralizado (CVCS)' : 'Centralized (CVCS)'}
                    </button>
                    <button 
                        class="toggle-btn ${this.currentView === 'dvcs' ? 'active' : ''}"
                        @click="${() => this.setView('dvcs')}"
                    >
                        <i class="ph-network"></i>
                        ${this.lang === 'es' ? 'Distribuido (DVCS)' : 'Distributed (DVCS)'}
                    </button>
                    <button 
                        class="toggle-btn ${this.currentView === 'comparison' ? 'active' : ''}"
                        @click="${() => this.setView('comparison')}"
                    >
                        <i class="ph-scales"></i>
                        ${this.lang === 'es' ? 'Comparación' : 'Comparison'}
                    </button>
                </div>

                <!-- Architecture Visualization -->
                <div class="architecture-view">
                    ${this.currentView === 'cvcs' ? this.renderCVCS() : ''}
                    ${this.currentView === 'dvcs' ? this.renderDVCS() : ''}
                    ${this.currentView === 'comparison' ? this.renderComparison() : ''}
                </div>

                <!-- Animation Controls -->
                ${this.currentView !== 'comparison' ? html`
                    <div class="animation-controls">
                        <button 
                            class="anim-btn"
                            @click="${this.startAnimation}"
                            ?disabled="${this.isAnimating}"
                        >
                            <i class="ph-play"></i>
                            ${this.lang === 'es' ? 'Demostrar Flujo' : 'Demonstrate Flow'}
                        </button>
                        <button 
                            class="anim-btn"
                            @click="${this.resetAnimation}"
                        >
                            <i class="ph-arrow-counter-clockwise"></i>
                            ${this.lang === 'es' ? 'Reiniciar' : 'Reset'}
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderCVCS() {
        return html`
            <div class="cvcs-architecture">
                <div class="central-server">
                    <i class="ph-server" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Servidor Central</div>
                    <div style="font-size: 0.875rem;">Todo el historial del proyecto</div>
                    <div style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.9;">
                        ⚠️ Punto único de fallo
                    </div>
                </div>

                <div class="clients-grid">
                    ${[1, 2, 3, 4, 5, 6].map(i => html`
                        <div class="client-node limited">
                            <i class="ph-desktop" style="font-size: 1.5rem; color: var(--primary);"></i>
                            <div style="font-size: 0.75rem; margin-top: 0.5rem; color: var(--text);">
                                Cliente ${i}
                            </div>
                            <div style="font-size: 0.625rem; color: var(--neutral); margin-top: 0.25rem;">
                                Solo copia de trabajo
                            </div>
                        </div>
                    `)}
                </div>

                <svg class="connections" viewBox="0 0 600 400">
                    ${[1, 2, 3, 4, 5, 6].map((_, i) => {
                        const x1 = 300, y1 = 120; // Central server position
                        const x2 = 100 + (i % 3) * 200, y2 = 280; // Client positions
                        return html`
                            <line 
                                class="connection-line" 
                                x1="${x1}" y1="${y1}" 
                                x2="${x2}" y2="${y2}"
                            />
                        `;
                    })}
                </svg>
            </div>
        `;
    }

    renderDVCS() {
        return html`
            <div class="dvcs-architecture">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => html`
                    <div class="developer-node complete">
                        <i class="ph-git-branch" style="font-size: 1.5rem; margin-bottom: 0.25rem;"></i>
                        <div style="font-size: 0.75rem; font-weight: 600;">Dev ${i}</div>
                        <div style="font-size: 0.625rem; margin-top: 0.25rem; opacity: 0.9;">
                            Repo completo
                        </div>
                    </div>
                `)}

                <svg class="connections" viewBox="0 0 500 500">
                    <!-- Bidirectional connections between nodes -->
                    ${this.createDVCSConnections().map(conn => html`
                        <line 
                            class="connection-line bidirectional" 
                            x1="${conn.x1}" y1="${conn.y1}" 
                            x2="${conn.x2}" y2="${conn.y2}"
                        />
                    `)}
                </svg>
            </div>
        `;
    }

    renderComparison() {
        return html`
            <div class="feature-comparison">
                ${Object.entries(this.features).map(([key, feature]) => html`
                    <div class="feature-card cvcs ${this.selectedFeature === key ? 'selected' : ''}"
                         @click="${() => this.selectFeature(key)}">
                        <div class="feature-title">
                            <i class="ph-building-office"></i>
                            ${feature.cvcs.title}
                        </div>
                        <div class="feature-description">
                            ${feature.cvcs.description}
                        </div>
                        <div class="pros-cons">
                            ${feature.cvcs.pros.map(pro => html`<div class="pro">${pro}</div>`)}
                            ${feature.cvcs.cons.map(con => html`<div class="con">${con}</div>`)}
                        </div>
                    </div>

                    <div class="feature-card dvcs ${this.selectedFeature === key ? 'selected' : ''}"
                         @click="${() => this.selectFeature(key)}">
                        <div class="feature-title">
                            <i class="ph-network"></i>
                            ${feature.dvcs.title}
                        </div>
                        <div class="feature-description">
                            ${feature.dvcs.description}
                        </div>
                        <div class="pros-cons">
                            ${feature.dvcs.pros.map(pro => html`<div class="pro">${pro}</div>`)}
                            ${feature.dvcs.cons.map(con => html`<div class="con">${con}</div>`)}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    createDVCSConnections() {
        const positions = [
            { x: 80, y: 80 }, { x: 250, y: 80 }, { x: 420, y: 80 },
            { x: 80, y: 250 }, { x: 250, y: 250 }, { x: 420, y: 250 },
            { x: 80, y: 420 }, { x: 250, y: 420 }, { x: 420, y: 420 }
        ];

        const connections = [];
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                if (Math.random() > 0.7) { // Show some connections
                    connections.push({
                        x1: positions[i].x,
                        y1: positions[i].y,
                        x2: positions[j].x,
                        y2: positions[j].y
                    });
                }
            }
        }
        return connections;
    }

    setView(view) {
        this.currentView = view;
        this.selectedFeature = '';
        this.track('comparison_view_changed', { view });
    }

    selectFeature(feature) {
        this.selectedFeature = this.selectedFeature === feature ? '' : feature;
        this.track('feature_comparison', { feature, selected: this.selectedFeature === feature });
    }

    async startAnimation() {
        this.isAnimating = true;
        this.track('architecture_animation_start', { view: this.currentView });

        // Simple animation - highlight nodes in sequence
        const nodes = this.shadowRoot.querySelectorAll('.client-node, .developer-node');
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].classList.add('node-highlight');
            await new Promise(resolve => setTimeout(resolve, 500));
            nodes[i].classList.remove('node-highlight');
        }

        this.isAnimating = false;
        
        // Emit completion event
        this.emit('exercise-completed', {
            component: 'comparison-tool',
            view: this.currentView,
            score: 100
        });
    }

    resetAnimation() {
        this.isAnimating = false;
        this.animationStep = 0;
        const nodes = this.shadowRoot.querySelectorAll('.node-highlight');
        nodes.forEach(node => node.classList.remove('node-highlight'));
        this.track('architecture_animation_reset');
    }

    // Accessibility enhancements
    firstUpdated() {
        super.firstUpdated();
        
        this.setAttribute('role', 'application');
        this.setAttribute('aria-label', 
            this.lang === 'es' 
                ? 'Herramienta de comparación interactiva entre sistemas centralizados y distribuidos'
                : 'Interactive comparison tool between centralized and distributed systems'
        );
    }
}

// Register the component
customElements.define('git-comparison-tool', GitComparisonToolComponent);

export default GitComparisonToolComponent;