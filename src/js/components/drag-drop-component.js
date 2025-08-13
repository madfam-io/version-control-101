/**
 * Drag and Drop Component
 * Interactive vocabulary matching component using Web Components
 */

import { html, css } from 'lit';
import { BaseComponent } from './component-registry.js';

export class GitDragDropComponent extends BaseComponent {
    static properties = {
        terms: { type: Array },
        definitions: { type: Array },
        completed: { type: Boolean },
        loading: { type: Boolean }
    };

    static styles = [
        BaseComponent.styles,
        css`
            :host {
                display: block;
                margin: 1rem 0;
            }

            .drag-drop-container {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin: 1rem 0;
            }

            .title {
                font-size: 1.125rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--text);
            }

            .instructions {
                color: var(--neutral);
                margin-bottom: 1.5rem;
                font-size: 0.875rem;
            }

            .terms-container {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                min-height: 60px;
                padding: 1rem;
                background: var(--bg);
                border: 2px dashed var(--border-color);
                border-radius: 0.5rem;
            }

            .drag-item {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.375rem;
                padding: 0.5rem 1rem;
                cursor: grab;
                user-select: none;
                transition: all 0.2s ease;
                font-weight: 500;
                color: var(--text);
            }

            .drag-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-color: var(--primary);
            }

            .drag-item:active {
                cursor: grabbing;
                transform: scale(0.95);
            }

            .drag-item.dragging {
                opacity: 0.5;
                transform: rotate(5deg);
            }

            .definitions-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .definition-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                background: var(--bg);
                border: 2px dashed var(--border-color);
                border-radius: 0.5rem;
                transition: all 0.2s ease;
                position: relative;
            }

            .definition-item.drop-over {
                border-color: var(--primary);
                background: rgba(37, 99, 235, 0.05);
                transform: scale(1.02);
            }

            .definition-item.correct {
                border-color: var(--success);
                border-style: solid;
                background: rgba(34, 197, 94, 0.05);
            }

            .definition-item.incorrect {
                border-color: var(--danger);
                background: rgba(239, 68, 68, 0.05);
                animation: shake 0.5s ease-in-out;
            }

            .definition-text {
                flex: 1;
                color: var(--text);
                line-height: 1.4;
            }

            .feedback-icon {
                font-size: 1.5rem;
                margin-left: auto;
                opacity: 0;
                transition: all 0.3s ease;
            }

            .feedback-icon.show {
                opacity: 1;
            }

            .feedback-icon.success {
                color: var(--success);
            }

            .feedback-icon.error {
                color: var(--danger);
            }

            .completion-message {
                background: var(--success);
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                text-align: center;
                font-weight: 600;
                margin-top: 1rem;
                animation: slideDown 0.5s ease-out;
            }

            .reset-button {
                margin-top: 1rem;
                background: var(--secondary);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            }

            .reset-button:hover {
                background: var(--primary);
                transform: translateY(-1px);
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                75% { transform: translateX(8px); }
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Mobile-First Touch-Friendly Design */
            @media (max-width: 375px) {
                .drag-drop-container {
                    padding: 0.75rem;
                    margin: 0.5rem 0;
                }
                
                .terms-container {
                    justify-content: center;
                    gap: 0.5rem;
                }
                
                .term-item {
                    min-height: 48px;
                    padding: 0.75rem 1rem;
                    font-size: 0.875rem;
                    touch-action: manipulation;
                    cursor: pointer;
                }
                
                .definitions-list {
                    gap: 0.5rem;
                }
                
                .definition-item {
                    min-height: 60px;
                    padding: 1rem;
                    touch-action: manipulation;
                    cursor: pointer;
                }
                
                .instructions {
                    font-size: 0.875rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }
            }
            
            @media (min-width: 376px) and (max-width: 768px) {
                .drag-drop-container {
                    padding: 1rem;
                }
                
                .term-item,
                .definition-item {
                    min-height: 44px;
                    touch-action: manipulation;
                }
                
                .definitions-list {
                    gap: 0.75rem;
                }
                
                .definition-item {
                    padding: 0.875rem;
                }
            }
            
            /* Touch-Friendly Interactions */
            @media (hover: none) {
                .term-item:hover,
                .definition-item:hover {
                    transform: none;
                    box-shadow: none;
                }
                
                .term-item:active,
                .definition-item:active {
                    transform: scale(0.98);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .term-item.dragging,
                .definition-item.drag-over {
                    transform: scale(1.02);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
            }
            
            /* Enhanced Touch Targets */
            .term-item,
            .definition-item,
            .reset-button {
                min-height: 44px;
                touch-action: manipulation;
                cursor: pointer;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            }
        `
    ];

    constructor() {
        super();
        this.terms = [];
        this.definitions = [];
        this.completed = false;
        this.loading = false;
        this.matches = new Map();
        this.draggedItem = null;
        this.setupDefaultData();
    }

    setupDefaultData() {
        this.terms = [
            { id: 'vcs', text: 'VCS', matched: false },
            { id: 'commit', text: 'Commit', matched: false },
            { id: 'repository', text: 'Repository', matched: false },
            { id: 'branch', text: 'Branch', matched: false }
        ];

        this.definitions = [
            { 
                id: 'vcs',
                text: this.lang === 'es' 
                    ? 'Un sistema que registra y gestiona cambios en archivos a lo largo del tiempo.'
                    : 'A system that records and manages changes to files over time.',
                matched: false
            },
            {
                id: 'commit',
                text: this.lang === 'es'
                    ? 'Una "instantánea" o guardado permanente de cambios con metadata.'
                    : 'A "snapshot" or permanent save of changes with metadata.',
                matched: false
            },
            {
                id: 'repository',
                text: this.lang === 'es'
                    ? 'La base de datos donde se almacena toda la historia del proyecto.'
                    : 'The database where the entire project history is stored.',
                matched: false
            },
            {
                id: 'branch',
                text: this.lang === 'es'
                    ? 'Una línea independiente de desarrollo paralelo.'
                    : 'An independent line of parallel development.',
                matched: false
            }
        ];
    }

    render() {
        return html`
            <div class="drag-drop-container">
                <h4 class="title">
                    ${this.lang === 'es' 
                        ? 'Ejercicio Interactivo: Conceptos Fundamentales'
                        : 'Interactive Exercise: Fundamental Concepts'}
                </h4>
                
                <p class="instructions">
                    ${this.lang === 'es'
                        ? 'Arrastra los términos a sus definiciones correctas:'
                        : 'Drag the terms to their correct definitions:'}
                </p>

                <!-- Terms Container -->
                <div class="terms-container">
                    ${this.terms.filter(term => !term.matched).map(term => html`
                        <div 
                            class="drag-item"
                            draggable="true"
                            data-term-id="${term.id}"
                            @dragstart="${this.handleDragStart}"
                            @dragend="${this.handleDragEnd}"
                        >
                            ${term.text}
                        </div>
                    `)}
                </div>

                <!-- Definitions List -->
                <div class="definitions-list">
                    ${this.definitions.map(definition => html`
                        <div 
                            class="definition-item ${definition.matched ? 'correct' : ''}"
                            data-definition-id="${definition.id}"
                            @dragover="${this.handleDragOver}"
                            @dragleave="${this.handleDragLeave}"
                            @drop="${this.handleDrop}"
                        >
                            <div class="definition-text">
                                ${definition.text}
                            </div>
                            
                            ${definition.matched ? html`
                                <div class="matched-term drag-item">
                                    ${this.terms.find(t => t.id === definition.id)?.text}
                                </div>
                            ` : ''}
                            
                            <i class="feedback-icon ph-check-circle ${definition.matched ? 'show success' : ''}"></i>
                        </div>
                    `)}
                </div>

                ${this.completed ? html`
                    <div class="completion-message">
                        <i class="ph-trophy" style="margin-right: 0.5rem;"></i>
                        ${this.lang === 'es' ? '¡Excelente trabajo! Has completado el ejercicio.' : 'Excellent work! You completed the exercise.'}
                    </div>
                    <button class="reset-button" @click="${this.reset}">
                        <i class="ph-arrow-clockwise" style="margin-right: 0.5rem;"></i>
                        ${this.lang === 'es' ? 'Reiniciar' : 'Reset'}
                    </button>
                ` : ''}
            </div>
        `;
    }

    handleDragStart(e) {
        this.draggedItem = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.dataset.termId);
        
        this.track('drag_start', { termId: e.target.dataset.termId });
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedItem = null;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const definitionItem = e.currentTarget;
        if (!definitionItem.classList.contains('correct')) {
            definitionItem.classList.add('drop-over');
        }
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('drop-over');
    }

    handleDrop(e) {
        e.preventDefault();
        
        const definitionItem = e.currentTarget;
        const definitionId = definitionItem.dataset.definitionId;
        const termId = e.dataTransfer.getData('text/plain');
        
        definitionItem.classList.remove('drop-over');

        // Check if it's a correct match
        if (termId === definitionId) {
            this.handleCorrectMatch(termId, definitionId);
        } else {
            this.handleIncorrectMatch(definitionItem);
        }
    }

    handleCorrectMatch(termId, definitionId) {
        // Update state
        const term = this.terms.find(t => t.id === termId);
        const definition = this.definitions.find(d => d.id === definitionId);
        
        if (term && definition) {
            term.matched = true;
            definition.matched = true;
            this.matches.set(termId, definitionId);
        }

        // Check completion
        this.checkCompletion();

        // Track success
        this.track('correct_match', { termId, definitionId });
        this.updateProgress(`drag-drop-${termId}`);

        // Trigger re-render
        this.requestUpdate();
    }

    handleIncorrectMatch(definitionItem) {
        // Add error styling
        definitionItem.classList.add('incorrect');
        
        // Remove error styling after animation
        setTimeout(() => {
            definitionItem.classList.remove('incorrect');
        }, 500);

        // Track incorrect attempt
        this.track('incorrect_match', {
            attemptedMatch: this.draggedItem?.dataset.termId + ' -> ' + definitionItem.dataset.definitionId
        });
    }

    checkCompletion() {
        const allMatched = this.terms.every(term => term.matched);
        if (allMatched && !this.completed) {
            this.completed = true;
            this.track('exercise_completed', { matches: this.matches.size });
            this.updateProgress('drag-drop-completed');
            
            // Emit completion event
            this.emit('exercise-completed', {
                component: 'drag-drop',
                score: 100,
                attempts: this.matches.size
            });
        }
    }

    reset() {
        this.completed = false;
        this.matches.clear();
        
        // Reset all items
        this.terms.forEach(term => { term.matched = false; });
        this.definitions.forEach(definition => { definition.matched = false; });
        
        this.track('exercise_reset');
        this.requestUpdate();
    }

    // Language change handler
    updated(changedProperties) {
        if (changedProperties.has('lang')) {
            this.setupDefaultData();
        }
    }

    // Accessibility enhancements
    firstUpdated() {
        // Add keyboard support
        this.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Set up ARIA labels
        this.setAttribute('role', 'application');
        this.setAttribute('aria-label', 
            this.lang === 'es' 
                ? 'Ejercicio de arrastrar y soltar para conceptos de Git'
                : 'Drag and drop exercise for Git concepts'
        );
    }

    handleKeydown(e) {
        // Add keyboard navigation support
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = this.shadowRoot.activeElement;
            if (focusedElement && focusedElement.classList.contains('drag-item')) {
                // Implement keyboard matching logic
                this.handleKeyboardMatch(focusedElement);
            }
        }
    }

    handleKeyboardMatch(termElement) {
        // Simple keyboard matching - cycle through definitions
        const termId = termElement.dataset.termId;
        const availableDefinitions = this.definitions.filter(d => !d.matched);
        
        if (availableDefinitions.length > 0) {
            // For demo, match with first available - in real implementation,
            // you'd show a selection UI
            const definition = availableDefinitions[0];
            if (definition.id === termId) {
                this.handleCorrectMatch(termId, definition.id);
            }
        }
    }
}

// Register the component
customElements.define('git-drag-drop', GitDragDropComponent);

export default GitDragDropComponent;