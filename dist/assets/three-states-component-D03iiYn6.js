var l=Object.defineProperty;var d=(s,e,t)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>d(s,typeof e!="symbol"?e+"":e,t);import{B as n,i as c,x as a}from"./index-DmWaINwU.js";class r extends n{constructor(){super(),this.currentFile="",this.workingFiles=[],this.stagedFiles=[],this.committedFiles=[],this.step=0,this.isPlaying=!1,this.demoMode=!1,this.demoSteps=this.createDemoSteps()}createDemoSteps(){return[{title:"Estado inicial",working:[],staged:[],committed:[],command:"",explanation:"Comenzamos con un repositorio vacío"},{title:"Modificar archivos",working:[{name:"index.html",status:"M"},{name:"style.css",status:"M"}],staged:[],committed:[],command:"# Archivos modificados",explanation:"Los archivos han sido editados en el directorio de trabajo"},{title:"Preparar archivos",working:[],staged:[{name:"index.html",status:"A"},{name:"style.css",status:"A"}],committed:[],command:"git add .",explanation:"Los archivos pasan al área de preparación (staging)"},{title:"Confirmar cambios",working:[],staged:[],committed:[{name:"index.html",status:"committed"},{name:"style.css",status:"committed"}],command:'git commit -m "Actualizar página principal"',explanation:"Los cambios se confirman permanentemente en el repositorio"}]}render(){const e=this.demoSteps[this.step]||this.demoSteps[0];return a`
            <div class="three-states-container">
                <h4 class="title">
                    ${this.lang==="es"?"Demostración: Los Tres Estados de Git":"Demo: Git's Three States"}
                </h4>
                
                <p class="instructions">
                    ${this.lang==="es"?"Observa cómo los archivos se mueven a través del flujo de trabajo de Git":"Watch how files move through the Git workflow"}
                </p>

                <!-- Demo Progress -->
                <div class="demo-progress">
                    ${this.demoSteps.map((t,o)=>a`
                        <div class="progress-dot ${o===this.step?"active":""} ${o<this.step?"completed":""}"></div>
                    `)}
                </div>

                <!-- Three States Flow -->
                <div class="states-flow">
                    <!-- Working Directory -->
                    <div class="state-area working ${this.step===1?"active":""}">
                        <div class="state-header">
                            <i class="ph-folder-open state-icon" style="color: var(--accent);"></i>
                            <h5 class="state-title">
                                ${this.lang==="es"?"Directorio de Trabajo":"Working Directory"}
                            </h5>
                            <p class="state-subtitle">
                                ${this.lang==="es"?"Archivos modificados":"Modified files"}
                            </p>
                        </div>
                        <div class="files-container">
                            ${(this.demoMode?e.working:this.workingFiles).map(t=>a`
                                <div class="file-item modified entering">
                                    <span class="file-status M">M</span>
                                    <span>${t.name}</span>
                                </div>
                            `)}
                        </div>
                    </div>

                    <!-- Arrow 1 -->
                    <div class="arrow ${this.step===2?"active":""}">
                        <i class="ph-arrow-right"></i>
                    </div>

                    <!-- Staging Area -->
                    <div class="state-area staging ${this.step===2?"active":""}">
                        <div class="state-header">
                            <i class="ph-tray state-icon" style="color: var(--primary);"></i>
                            <h5 class="state-title">
                                ${this.lang==="es"?"Área de Preparación":"Staging Area"}
                            </h5>
                            <p class="state-subtitle">
                                ${this.lang==="es"?"Preparado para commit":"Ready for commit"}
                            </p>
                        </div>
                        <div class="files-container">
                            ${(this.demoMode?e.staged:this.stagedFiles).map(t=>a`
                                <div class="file-item staged entering">
                                    <span class="file-status A">A</span>
                                    <span>${t.name}</span>
                                </div>
                            `)}
                        </div>
                    </div>

                    <!-- Arrow 2 -->
                    <div class="arrow ${this.step===3?"active":""}">
                        <i class="ph-arrow-right"></i>
                    </div>

                    <!-- Repository -->
                    <div class="state-area repository ${this.step===3?"active":""}">
                        <div class="state-header">
                            <i class="ph-database state-icon" style="color: var(--success);"></i>
                            <h5 class="state-title">
                                ${this.lang==="es"?"Repositorio Git":"Git Repository"}
                            </h5>
                            <p class="state-subtitle">
                                ${this.lang==="es"?"Confirmado permanentemente":"Permanently committed"}
                            </p>
                        </div>
                        <div class="files-container">
                            ${(this.demoMode?e.committed:this.committedFiles).map(t=>a`
                                <div class="file-item committed entering">
                                    <span class="file-status committed">✓</span>
                                    <span>${t.name}</span>
                                </div>
                            `)}
                        </div>
                    </div>
                </div>

                <!-- Command Display -->
                ${e.command?a`
                    <div class="command-display">
                        <div>
                            <span class="command-prompt">$</span>
                            <span class="command-text">${e.command}</span>
                        </div>
                        <div class="explanation">${e.explanation}</div>
                    </div>
                `:""}

                <!-- Controls -->
                <div class="controls">
                    <button 
                        class="control-btn secondary" 
                        @click="${this.reset}"
                        ?disabled="${this.isPlaying}"
                    >
                        <i class="ph-arrow-counter-clockwise"></i>
                        ${this.lang==="es"?"Reiniciar":"Reset"}
                    </button>

                    <button 
                        class="control-btn" 
                        @click="${this.previousStep}"
                        ?disabled="${this.step===0||this.isPlaying}"
                    >
                        <i class="ph-caret-left"></i>
                        ${this.lang==="es"?"Anterior":"Previous"}
                    </button>

                    <button 
                        class="control-btn" 
                        @click="${this.nextStep}"
                        ?disabled="${this.step>=this.demoSteps.length-1||this.isPlaying}"
                    >
                        <i class="ph-caret-right"></i>
                        ${this.lang==="es"?"Siguiente":"Next"}
                    </button>

                    <button 
                        class="control-btn" 
                        @click="${this.playDemo}"
                        ?disabled="${this.isPlaying}"
                    >
                        <i class="ph-play"></i>
                        ${this.lang==="es"?"Reproducir Demo":"Play Demo"}
                    </button>
                </div>
            </div>
        `}nextStep(){this.step<this.demoSteps.length-1&&(this.step++,this.track("three_states_step",{step:this.step,stepName:this.demoSteps[this.step].title}))}previousStep(){this.step>0&&(this.step--,this.track("three_states_previous",{step:this.step}))}reset(){this.step=0,this.isPlaying=!1,this.demoMode=!0,this.workingFiles=[],this.stagedFiles=[],this.committedFiles=[],this.track("three_states_reset")}async playDemo(){this.isPlaying=!0,this.demoMode=!0,this.step=0,this.track("three_states_demo_start");for(let e=0;e<this.demoSteps.length;e++)this.step=e,this.requestUpdate(),await new Promise(t=>setTimeout(t,2e3));this.isPlaying=!1,this.track("three_states_demo_complete"),this.emit("exercise-completed",{component:"three-states",score:100,completionTime:Date.now()})}firstUpdated(){super.firstUpdated(),this.demoMode=!0,this.setAttribute("role","application"),this.setAttribute("aria-label",this.lang==="es"?"Demostración interactiva de los tres estados de Git":"Interactive demonstration of Git's three states")}updated(e){e.has("lang")&&this.requestUpdate()}}i(r,"properties",{currentFile:{type:String},workingFiles:{type:Array},stagedFiles:{type:Array},committedFiles:{type:Array},step:{type:Number},isPlaying:{type:Boolean},demoMode:{type:Boolean}}),i(r,"styles",[n.styles,c`
            :host {
                display: block;
                margin: 1rem 0;
            }

            .three-states-container {
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

            .instructions {
                color: var(--neutral);
                margin-bottom: 1.5rem;
                text-align: center;
                font-size: 0.875rem;
            }

            .states-flow {
                display: grid;
                grid-template-columns: 1fr auto 1fr auto 1fr;
                gap: 1rem;
                align-items: center;
                margin: 2rem 0;
                min-height: 300px;
            }

            .state-area {
                background: var(--bg);
                border: 2px solid var(--border-color);
                border-radius: 0.75rem;
                padding: 1.5rem;
                text-align: center;
                position: relative;
                min-height: 250px;
                transition: all 0.3s ease;
            }

            .state-area.working {
                border-color: var(--accent);
            }

            .state-area.staging {
                border-color: var(--primary);
            }

            .state-area.repository {
                border-color: var(--success);
            }

            .state-area.active {
                transform: scale(1.02);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            .state-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }

            .state-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }

            .state-title {
                font-weight: 600;
                color: var(--text);
                font-size: 1rem;
                margin: 0;
            }

            .state-subtitle {
                font-size: 0.75rem;
                color: var(--neutral);
                margin-top: 0.25rem;
            }

            .files-container {
                min-height: 120px;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.5rem 0;
            }

            .file-item {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.375rem;
                padding: 0.5rem 0.75rem;
                font-family: var(--font-mono);
                font-size: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.3s ease;
            }

            .file-item.modified {
                border-left: 4px solid var(--accent);
                background: rgba(251, 191, 36, 0.1);
            }

            .file-item.staged {
                border-left: 4px solid var(--primary);
                background: rgba(37, 99, 235, 0.1);
            }

            .file-item.committed {
                border-left: 4px solid var(--success);
                background: rgba(34, 197, 94, 0.1);
            }

            .file-status {
                font-size: 0.625rem;
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                font-weight: 500;
            }

            .file-status.M {
                background: var(--accent);
                color: white;
            }

            .file-status.A {
                background: var(--primary);
                color: white;
            }

            .file-status.committed {
                background: var(--success);
                color: white;
            }

            .arrow {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: var(--neutral);
                transition: all 0.3s ease;
            }

            .arrow.active {
                color: var(--primary);
                transform: scale(1.2);
                animation: pulse 1.5s infinite;
            }

            .controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }

            .control-btn {
                background: var(--primary);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-weight: 500;
                font-size: 0.875rem;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .control-btn:hover {
                background: var(--secondary);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .control-btn:disabled {
                background: var(--neutral);
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }

            .control-btn.secondary {
                background: var(--card-bg);
                color: var(--text);
                border: 1px solid var(--border-color);
            }

            .control-btn.secondary:hover {
                background: var(--bg);
                border-color: var(--primary);
            }

            .demo-progress {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin: 1rem 0;
            }

            .progress-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--border-color);
                transition: all 0.3s ease;
            }

            .progress-dot.active {
                background: var(--primary);
                transform: scale(1.5);
            }

            .progress-dot.completed {
                background: var(--success);
            }

            .command-display {
                background: var(--code-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 1.5rem;
                font-family: var(--font-mono);
                font-size: 0.875rem;
                text-align: center;
            }

            .command-prompt {
                color: var(--primary);
                font-weight: 600;
            }

            .command-text {
                color: var(--text);
                margin-left: 0.5rem;
            }

            .explanation {
                color: var(--neutral);
                font-size: 0.75rem;
                margin-top: 0.5rem;
                font-style: italic;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1.2); }
                50% { opacity: 0.7; transform: scale(1.4); }
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .file-item.entering {
                animation: slideIn 0.5s ease;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .three-states-container {
                    padding: 1rem;
                }

                .states-flow {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto auto;
                    gap: 1rem;
                }

                .arrow {
                    transform: rotate(90deg);
                }

                .controls {
                    gap: 0.5rem;
                }

                .control-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                }
            }
        `]);customElements.define("git-three-states",r);export{r as GitThreeStatesComponent,r as default};
//# sourceMappingURL=three-states-component-D03iiYn6.js.map
