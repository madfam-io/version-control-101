var c=Object.defineProperty;var p=(a,e,t)=>e in a?c(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var s=(a,e,t)=>p(a,typeof e!="symbol"?e+"":e,t);import{B as l,i as h,x as i}from"./index-BQHeEUBN.js";class n extends l{constructor(){super(),this.inputText="Hello, Git World!",this.generatedHash="",this.isGenerating=!1,this.showExplanation=!1,this.demoStep=0,this.examples=[{content:"Initial commit",hash:"a1b2c3d4e5f6789012345678901234567890abcd"},{content:"Add user authentication",hash:"9876543210fedcba0987654321098765432109876"},{content:"Fix login bug",hash:"abcdef1234567890abcdef1234567890abcdef12"}]}render(){return i`
            <div class="hash-container">
                <h4 class="title">
                    <i class="ph-fingerprint-duotone"></i>
                    ${this.lang==="es"?"Generador de Hash SHA-1: Integridad de Datos":"SHA-1 Hash Generator: Data Integrity"}
                </h4>

                <p class="intro-text">
                    ${this.lang==="es"?"Git utiliza SHA-1 para garantizar la integridad de cada archivo y commit. Prueba cómo cualquier cambio, por pequeño que sea, genera un hash completamente diferente.":"Git uses SHA-1 to ensure the integrity of every file and commit. Try how any change, however small, generates a completely different hash."}
                </p>

                <!-- Hash Demo -->
                <div class="hash-demo">
                    <!-- Input Section -->
                    <div class="input-section">
                        <label class="input-label" for="content-input">
                            <i class="ph-file-text mr-2"></i>
                            ${this.lang==="es"?"Contenido del Archivo:":"File Content:"}
                        </label>
                        <textarea
                            id="content-input"
                            class="content-input"
                            .value="${this.inputText}"
                            @input="${this.handleInput}"
                            placeholder="${this.lang==="es"?"Escribe cualquier contenido aquí...":"Write any content here..."}"
                        ></textarea>
                    </div>

                    <!-- Hash Process Arrow -->
                    <div class="hash-arrow ${this.isGenerating?"generating":""}">
                        <i class="ph-arrow-down"></i>
                        <span style="font-size: 1rem; color: var(--text);">SHA-1</span>
                        <i class="ph-arrow-down"></i>
                    </div>

                    <!-- Hash Process Steps -->
                    <div class="hash-process">
                        <div class="process-step ${this.demoStep>=1?"active":""}">
                            1. ${this.lang==="es"?"Contenido → Bytes":"Content → Bytes"}
                        </div>
                        <div class="process-step ${this.demoStep>=2?"active":""}">
                            2. ${this.lang==="es"?"Algoritmo SHA-1":"SHA-1 Algorithm"}
                        </div>
                        <div class="process-step ${this.demoStep>=3?"active":""}">
                            3. ${this.lang==="es"?"Hash de 40 caracteres":"40-character Hash"}
                        </div>
                    </div>

                    <!-- Hash Output -->
                    ${this.generatedHash?i`
                        <div class="hash-output">
                            <div class="hash-label">
                                <i class="ph-check-circle"></i>
                                ${this.lang==="es"?"Hash SHA-1 Generado:":"Generated SHA-1 Hash:"}
                            </div>
                            <div class="hash-result" @click="${this.copyHash}">
                                ${this.generatedHash}
                                <div class="copy-indicator" id="copy-indicator">
                                    ${this.lang==="es"?"¡Copiado!":"Copied!"}
                                </div>
                            </div>
                        </div>
                    `:""}
                </div>

                <!-- Hash Properties -->
                <div class="hash-properties">
                    <div class="property-card">
                        <div class="property-icon">
                            <i class="ph-shield-check"></i>
                        </div>
                        <div class="property-title">
                            ${this.lang==="es"?"Único":"Unique"}
                        </div>
                        <div class="property-description">
                            ${this.lang==="es"?"Cada contenido único produce un hash único":"Each unique content produces a unique hash"}
                        </div>
                    </div>

                    <div class="property-card">
                        <div class="property-icon">
                            <i class="ph-lightning"></i>
                        </div>
                        <div class="property-title">
                            ${this.lang==="es"?"Rápido":"Fast"}
                        </div>
                        <div class="property-description">
                            ${this.lang==="es"?"Generación instantánea del hash":"Instant hash generation"}
                        </div>
                    </div>

                    <div class="property-card">
                        <div class="property-icon">
                            <i class="ph-arrows-clockwise"></i>
                        </div>
                        <div class="property-title">
                            ${this.lang==="es"?"Determinístico":"Deterministic"}
                        </div>
                        <div class="property-description">
                            ${this.lang==="es"?"El mismo contenido siempre produce el mismo hash":"Same content always produces the same hash"}
                        </div>
                    </div>

                    <div class="property-card">
                        <div class="property-icon">
                            <i class="ph-warning"></i>
                        </div>
                        <div class="property-title">
                            ${this.lang==="es"?"Sensible":"Sensitive"}
                        </div>
                        <div class="property-description">
                            ${this.lang==="es"?"Cualquier cambio mínimo altera completamente el hash":"Any minimal change completely alters the hash"}
                        </div>
                    </div>
                </div>

                <!-- Examples -->
                <div class="examples-section">
                    <div class="examples-title">
                        ${this.lang==="es"?"Ejemplos de Commits de Git:":"Git Commit Examples:"}
                    </div>
                    <div class="example-grid">
                        ${this.examples.map(e=>i`
                            <div class="example-item" @click="${()=>this.loadExample(e.content)}">
                                <div class="example-content">${e.content}</div>
                                <div class="example-hash">${e.hash}</div>
                            </div>
                        `)}
                    </div>
                </div>

                <!-- Controls -->
                <div class="controls">
                    <button class="control-btn" @click="${this.generateHash}" ?disabled="${this.isGenerating}">
                        <i class="ph-gear"></i>
                        ${this.lang==="es"?"Generar Hash":"Generate Hash"}
                    </button>

                    <button class="control-btn secondary" @click="${this.clearInput}">
                        <i class="ph-eraser"></i>
                        ${this.lang==="es"?"Limpiar":"Clear"}
                    </button>

                    <button class="control-btn secondary" @click="${this.toggleExplanation}">
                        <i class="ph-question"></i>
                        ${this.lang==="es"?"Explicación":"Explanation"}
                    </button>
                </div>

                <!-- Explanation Panel -->
                <div class="explanation-panel ${this.showExplanation?"":"hidden"}">
                    <div class="explanation-title">
                        <i class="ph-info"></i>
                        ${this.lang==="es"?"¿Cómo funciona SHA-1 en Git?":"How does SHA-1 work in Git?"}
                    </div>
                    <div class="explanation-content">
                        ${this.lang==="es"?i`
                            <p>Git utiliza SHA-1 como su función de hash criptográfica para:</p>
                            <ul>
                                <li><strong>Identificar objetos:</strong> Cada archivo, directorio y commit tiene un hash único</li>
                                <li><strong>Verificar integridad:</strong> Cualquier corrupción se detecta inmediatamente</li>
                                <li><strong>Prevenir alteraciones:</strong> Imposible modificar contenido sin cambiar el hash</li>
                                <li><strong>Optimizar storage:</strong> Archivos idénticos se almacenan una sola vez</li>
                            </ul>
                            <p>El hash SHA-1 de 40 caracteres hexadecimales es la "huella digital" de cada objeto en Git.</p>
                        `:i`
                            <p>Git uses SHA-1 as its cryptographic hash function to:</p>
                            <ul>
                                <li><strong>Identify objects:</strong> Each file, directory, and commit has a unique hash</li>
                                <li><strong>Verify integrity:</strong> Any corruption is detected immediately</li>
                                <li><strong>Prevent tampering:</strong> Impossible to modify content without changing the hash</li>
                                <li><strong>Optimize storage:</strong> Identical files are stored only once</li>
                            </ul>
                            <p>The 40-character hexadecimal SHA-1 hash is the "fingerprint" of each object in Git.</p>
                        `}
                    </div>
                </div>
            </div>
        `}handleInput(e){this.inputText=e.target.value,this.generatedHash="",this.demoStep=0}async generateHash(){if(this.inputText.trim()){this.isGenerating=!0,this.demoStep=0,this.generatedHash="";for(let e=1;e<=3;e++)await new Promise(t=>setTimeout(t,500)),this.demoStep=e,this.requestUpdate();this.generatedHash=this.mockSHA1(this.inputText),this.isGenerating=!1,this.track("hash_generated",{contentLength:this.inputText.length,hash:this.generatedHash.substring(0,8)+"..."}),this.emit("exercise-completed",{component:"hash-generator",action:"generate",score:100})}}mockSHA1(e){let t="",d="0123456789abcdef",o=0;for(let r=0;r<e.length;r++)o+=e.charCodeAt(r)*(r+1);for(let r=0;r<40;r++)t+=d[Math.floor(o*(r+1)%16)],o=o*16807%2147483647;return t}loadExample(e){this.inputText=e,this.generateHash(),this.track("example_loaded",{content:e.substring(0,20)+"..."})}clearInput(){this.inputText="",this.generatedHash="",this.demoStep=0,this.track("input_cleared")}toggleExplanation(){this.showExplanation=!this.showExplanation,this.track("explanation_toggled",{shown:this.showExplanation})}copyHash(){this.generatedHash&&navigator.clipboard&&navigator.clipboard.writeText(this.generatedHash).then(()=>{const e=this.shadowRoot.getElementById("copy-indicator");e&&(e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},2e3)),this.track("hash_copied")})}firstUpdated(){super.firstUpdated(),this.generateHash(),this.setAttribute("role","application"),this.setAttribute("aria-label",this.lang==="es"?"Generador de hash SHA-1 para demostrar la integridad de datos de Git":"SHA-1 hash generator to demonstrate Git data integrity")}}s(n,"properties",{inputText:{type:String},generatedHash:{type:String},isGenerating:{type:Boolean},showExplanation:{type:Boolean},demoStep:{type:Number},examples:{type:Array}}),s(n,"styles",[l.styles,h`
            :host {
                display: block;
                margin: 1rem 0;
            }

            .hash-container {
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
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .intro-text {
                color: var(--neutral);
                margin-bottom: 1.5rem;
                text-align: center;
                line-height: 1.6;
            }

            .hash-demo {
                display: grid;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .input-section {
                background: var(--bg);
                border-radius: 0.5rem;
                padding: 1.5rem;
                border: 1px solid var(--border-color);
            }

            .input-label {
                display: block;
                font-weight: 600;
                color: var(--text);
                margin-bottom: 0.5rem;
            }

            .content-input {
                width: 100%;
                min-height: 120px;
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                background: var(--card-bg);
                color: var(--text);
                font-family: var(--font-mono);
                font-size: 0.875rem;
                resize: vertical;
                transition: all 0.2s ease;
            }

            .content-input:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }

            .hash-arrow {
                text-align: center;
                color: var(--primary);
                font-size: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 1rem 0;
            }

            .hash-arrow.generating {
                animation: bounce 1s infinite;
            }

            .hash-process {
                background: var(--code-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: var(--font-mono);
                font-size: 0.875rem;
                text-align: center;
            }

            .process-step {
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--border-color);
                color: var(--neutral);
            }

            .process-step:last-child {
                border-bottom: none;
            }

            .process-step.active {
                color: var(--primary);
                font-weight: 600;
            }

            .hash-output {
                background: var(--bg);
                border-radius: 0.5rem;
                padding: 1.5rem;
                border: 2px solid var(--success);
                text-align: center;
            }

            .hash-label {
                font-weight: 600;
                color: var(--success);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .hash-result {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: var(--font-mono);
                font-size: 0.875rem;
                color: var(--accent);
                word-break: break-all;
                letter-spacing: 0.5px;
                position: relative;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .hash-result:hover {
                background: var(--bg);
                border-color: var(--primary);
            }

            .copy-indicator {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: var(--success);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.625rem;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            }

            .copy-indicator.show {
                opacity: 1;
                transform: translateY(0);
            }

            .hash-properties {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1.5rem 0;
            }

            .property-card {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                text-align: center;
                transition: all 0.2s ease;
            }

            .property-card:hover {
                border-color: var(--primary);
                transform: translateY(-2px);
            }

            .property-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                color: var(--primary);
            }

            .property-title {
                font-weight: 600;
                color: var(--text);
                margin-bottom: 0.5rem;
            }

            .property-description {
                font-size: 0.875rem;
                color: var(--neutral);
                line-height: 1.4;
            }

            .examples-section {
                margin-top: 2rem;
                background: var(--bg);
                border-radius: 0.5rem;
                padding: 1.5rem;
                border: 1px solid var(--border-color);
            }

            .examples-title {
                font-weight: 600;
                color: var(--text);
                margin-bottom: 1rem;
                text-align: center;
            }

            .example-grid {
                display: grid;
                gap: 1rem;
            }

            .example-item {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .example-item:hover {
                border-color: var(--primary);
                background: rgba(37, 99, 235, 0.05);
            }

            .example-content {
                font-family: var(--font-mono);
                font-size: 0.75rem;
                color: var(--text);
                margin-bottom: 0.5rem;
                background: var(--bg);
                padding: 0.5rem;
                border-radius: 0.25rem;
                border: 1px solid var(--border-color);
            }

            .example-hash {
                font-family: var(--font-mono);
                font-size: 0.625rem;
                color: var(--accent);
                word-break: break-all;
                opacity: 0.8;
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
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s ease;
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

            .explanation-panel {
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(34, 197, 94, 0.1));
                border: 1px solid var(--primary);
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin-top: 1.5rem;
                transition: all 0.3s ease;
            }

            .explanation-panel.hidden {
                opacity: 0;
                transform: translateY(-10px);
                max-height: 0;
                padding: 0 1.5rem;
                overflow: hidden;
            }

            .explanation-title {
                font-weight: 600;
                color: var(--text);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .explanation-content {
                color: var(--neutral);
                line-height: 1.6;
            }

            .explanation-content ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }

            .explanation-content li {
                margin: 0.5rem 0;
            }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .hash-container {
                    padding: 1rem;
                }

                .hash-properties {
                    grid-template-columns: 1fr;
                }

                .controls {
                    gap: 0.5rem;
                }

                .control-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                }

                .hash-result {
                    font-size: 0.75rem;
                }
            }
        `]);customElements.define("git-hash-generator",n);export{n as GitHashGeneratorComponent,n as default};
//# sourceMappingURL=hash-generator-component-fPsBn9I5.js.map
