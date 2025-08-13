var l=Object.defineProperty;var m=(s,e,t)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var d=(s,e,t)=>m(s,typeof e!="symbol"?e+"":e,t);import{B as c,i as h,x as i}from"./index-DO_oek1i.js";class n extends c{constructor(){super(),this.terms=[],this.definitions=[],this.completed=!1,this.loading=!1,this.matches=new Map,this.draggedItem=null,this.setupDefaultData()}setupDefaultData(){this.terms=[{id:"vcs",text:"VCS",matched:!1},{id:"commit",text:"Commit",matched:!1},{id:"repository",text:"Repository",matched:!1},{id:"branch",text:"Branch",matched:!1}],this.definitions=[{id:"vcs",text:this.lang==="es"?"Un sistema que registra y gestiona cambios en archivos a lo largo del tiempo.":"A system that records and manages changes to files over time.",matched:!1},{id:"commit",text:this.lang==="es"?'Una "instantánea" o guardado permanente de cambios con metadata.':'A "snapshot" or permanent save of changes with metadata.',matched:!1},{id:"repository",text:this.lang==="es"?"La base de datos donde se almacena toda la historia del proyecto.":"The database where the entire project history is stored.",matched:!1},{id:"branch",text:this.lang==="es"?"Una línea independiente de desarrollo paralelo.":"An independent line of parallel development.",matched:!1}]}render(){return i`
            <div class="drag-drop-container">
                <h4 class="title">
                    ${this.lang==="es"?"Ejercicio Interactivo: Conceptos Fundamentales":"Interactive Exercise: Fundamental Concepts"}
                </h4>
                
                <p class="instructions">
                    ${this.lang==="es"?"Arrastra los términos a sus definiciones correctas:":"Drag the terms to their correct definitions:"}
                </p>

                <!-- Terms Container -->
                <div class="terms-container">
                    ${this.terms.filter(e=>!e.matched).map(e=>i`
                        <div 
                            class="drag-item"
                            draggable="true"
                            data-term-id="${e.id}"
                            @dragstart="${this.handleDragStart}"
                            @dragend="${this.handleDragEnd}"
                        >
                            ${e.text}
                        </div>
                    `)}
                </div>

                <!-- Definitions List -->
                <div class="definitions-list">
                    ${this.definitions.map(e=>{var t;return i`
                        <div 
                            class="definition-item ${e.matched?"correct":""}"
                            data-definition-id="${e.id}"
                            @dragover="${this.handleDragOver}"
                            @dragleave="${this.handleDragLeave}"
                            @drop="${this.handleDrop}"
                        >
                            <div class="definition-text">
                                ${e.text}
                            </div>
                            
                            ${e.matched?i`
                                <div class="matched-term drag-item">
                                    ${(t=this.terms.find(a=>a.id===e.id))==null?void 0:t.text}
                                </div>
                            `:""}
                            
                            <i class="feedback-icon ph-check-circle ${e.matched?"show success":""}"></i>
                        </div>
                    `})}
                </div>

                ${this.completed?i`
                    <div class="completion-message">
                        <i class="ph-trophy" style="margin-right: 0.5rem;"></i>
                        ${this.lang==="es"?"¡Excelente trabajo! Has completado el ejercicio.":"Excellent work! You completed the exercise."}
                    </div>
                    <button class="reset-button" @click="${this.reset}">
                        <i class="ph-arrow-clockwise" style="margin-right: 0.5rem;"></i>
                        ${this.lang==="es"?"Reiniciar":"Reset"}
                    </button>
                `:""}
            </div>
        `}handleDragStart(e){this.draggedItem=e.target,e.target.classList.add("dragging"),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",e.target.dataset.termId),this.track("drag_start",{termId:e.target.dataset.termId})}handleDragEnd(e){e.target.classList.remove("dragging"),this.draggedItem=null}handleDragOver(e){e.preventDefault(),e.dataTransfer.dropEffect="move";const t=e.currentTarget;t.classList.contains("correct")||t.classList.add("drop-over")}handleDragLeave(e){e.currentTarget.classList.remove("drop-over")}handleDrop(e){e.preventDefault();const t=e.currentTarget,a=t.dataset.definitionId,r=e.dataTransfer.getData("text/plain");t.classList.remove("drop-over"),r===a?this.handleCorrectMatch(r,a):this.handleIncorrectMatch(t)}handleCorrectMatch(e,t){const a=this.terms.find(o=>o.id===e),r=this.definitions.find(o=>o.id===t);a&&r&&(a.matched=!0,r.matched=!0,this.matches.set(e,t)),this.checkCompletion(),this.track("correct_match",{termId:e,definitionId:t}),this.updateProgress(`drag-drop-${e}`),this.requestUpdate()}handleIncorrectMatch(e){var t;e.classList.add("incorrect"),setTimeout(()=>{e.classList.remove("incorrect")},500),this.track("incorrect_match",{attemptedMatch:((t=this.draggedItem)==null?void 0:t.dataset.termId)+" -> "+e.dataset.definitionId})}checkCompletion(){this.terms.every(t=>t.matched)&&!this.completed&&(this.completed=!0,this.track("exercise_completed",{matches:this.matches.size}),this.updateProgress("drag-drop-completed"),this.emit("exercise-completed",{component:"drag-drop",score:100,attempts:this.matches.size}))}reset(){this.completed=!1,this.matches.clear(),this.terms.forEach(e=>{e.matched=!1}),this.definitions.forEach(e=>{e.matched=!1}),this.track("exercise_reset"),this.requestUpdate()}updated(e){e.has("lang")&&this.setupDefaultData()}firstUpdated(){this.addEventListener("keydown",this.handleKeydown.bind(this)),this.setAttribute("role","application"),this.setAttribute("aria-label",this.lang==="es"?"Ejercicio de arrastrar y soltar para conceptos de Git":"Drag and drop exercise for Git concepts")}handleKeydown(e){if(e.key==="Enter"||e.key===" "){const t=this.shadowRoot.activeElement;t&&t.classList.contains("drag-item")&&this.handleKeyboardMatch(t)}}handleKeyboardMatch(e){const t=e.dataset.termId,a=this.definitions.filter(r=>!r.matched);if(a.length>0){const r=a[0];r.id===t&&this.handleCorrectMatch(t,r.id)}}}d(n,"properties",{terms:{type:Array},definitions:{type:Array},completed:{type:Boolean},loading:{type:Boolean}}),d(n,"styles",[c.styles,h`
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

            @media (max-width: 768px) {
                .drag-drop-container {
                    padding: 1rem;
                }

                .definitions-list {
                    gap: 0.5rem;
                }

                .definition-item {
                    padding: 0.75rem;
                }
            }
        `]);customElements.define("git-drag-drop",n);export{n as GitDragDropComponent,n as default};
//# sourceMappingURL=drag-drop-component-DvNVMw1z.js.map
