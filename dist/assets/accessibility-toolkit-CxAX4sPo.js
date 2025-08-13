var n=Object.defineProperty;var r=(t,a,e)=>a in t?n(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e;var i=(t,a,e)=>r(t,typeof a!="symbol"?a+"":a,e);import{a as l,i as c,x as d}from"./index-DmWaINwU.js";class o extends l{constructor(){super(),this.currentFontSize=16,this.reducedMotion=!1,this.highContrast=!1,this.screenReaderMode=!1,this.keyboardNavigationVisible=!1,this.colorBlindMode="normal",this.focusIndicatorStyle="default",this.lineHeight=1.6,this.activeTab="visual",this.updateRootVariables()}updateRootVariables(){const a=document.documentElement;a.style.setProperty("--font-size",`${this.currentFontSize}px`),a.style.setProperty("--line-height",this.lineHeight.toString());const e=this.focusIndicatorStyle==="high-contrast"?"#ff0000":this.focusIndicatorStyle==="subtle"?"#94a3b8":"#3b82f6";if(a.style.setProperty("--focus-color",e),this.highContrast?(this.setAttribute("high-contrast",""),a.style.setProperty("--text","#ffffff"),a.style.setProperty("--bg","#000000"),a.style.setProperty("--card-bg","#1a1a1a")):this.removeAttribute("high-contrast"),this.reducedMotion?(this.setAttribute("reduced-motion",""),a.style.setProperty("--transition-duration","0.01ms")):(this.removeAttribute("reduced-motion"),a.style.setProperty("--transition-duration","0.3s")),this.colorBlindMode!=="normal"){const s={protanopia:"url(#protanopia-filter)",deuteranopia:"url(#deuteranopia-filter)",tritanopia:"url(#tritanopia-filter)"};a.style.setProperty("filter",s[this.colorBlindMode]||"none")}else a.style.removeProperty("filter")}setActiveTab(a){this.activeTab=a}updateFontSize(a){this.currentFontSize=parseInt(a.target.value),this.updateRootVariables()}updateLineHeight(a){this.lineHeight=parseFloat(a.target.value),this.updateRootVariables()}toggleReducedMotion(a){this.reducedMotion=a.target.checked,this.updateRootVariables()}toggleHighContrast(a){this.highContrast=a.target.checked,this.updateRootVariables()}toggleScreenReader(a){this.screenReaderMode=a.target.checked,this.announceToScreenReader(this.screenReaderMode?"Screen reader optimization enabled":"Screen reader optimization disabled")}toggleKeyboardNavigation(a){this.keyboardNavigationVisible=a.target.checked,document.body.classList.toggle("keyboard-navigation-visible",this.keyboardNavigationVisible)}updateColorBlindMode(a){this.colorBlindMode=a.target.value,this.updateRootVariables()}updateFocusIndicator(a){this.focusIndicatorStyle=a.target.value,this.updateRootVariables()}announceToScreenReader(a){const e=document.createElement("div");e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),e.style.position="absolute",e.style.left="-10000px",e.textContent=a,document.body.appendChild(e),setTimeout(()=>{document.body.removeChild(e)},1e3)}render(){return d`
            <div class="toolkit-container">
                <div class="toolkit-header">
                    <h2 class="toolkit-title">
                        <i class="ph-universal-access"></i>
                        <span data-lang-es="Kit de Herramientas de Accesibilidad" 
                              data-lang-en="Accessibility Toolkit">
                            Kit de Herramientas de Accesibilidad
                        </span>
                    </h2>
                    <p class="toolkit-description"
                       data-lang-es="Personaliza tu experiencia de aprendizaje ajustando las configuraciones de accesibilidad. Todos los cambios se aplican en tiempo real."
                       data-lang-en="Customize your learning experience by adjusting accessibility settings. All changes apply in real-time.">
                        Personaliza tu experiencia de aprendizaje ajustando las configuraciones de accesibilidad. Todos los cambios se aplican en tiempo real.
                    </p>
                </div>

                <div class="tabs-container" role="tablist">
                    <button class="tab-button ${this.activeTab==="visual"?"active":""}"
                            role="tab" 
                            aria-selected="${this.activeTab==="visual"}"
                            @click="${()=>this.setActiveTab("visual")}">
                        <i class="ph-eye"></i>
                        <span data-lang-es="Visual" data-lang-en="Visual">Visual</span>
                    </button>
                    <button class="tab-button ${this.activeTab==="motor"?"active":""}"
                            role="tab" 
                            aria-selected="${this.activeTab==="motor"}"
                            @click="${()=>this.setActiveTab("motor")}">
                        <i class="ph-keyboard"></i>
                        <span data-lang-es="Motor" data-lang-en="Motor">Motor</span>
                    </button>
                    <button class="tab-button ${this.activeTab==="cognitive"?"active":""}"
                            role="tab" 
                            aria-selected="${this.activeTab==="cognitive"}"
                            @click="${()=>this.setActiveTab("cognitive")}">
                        <i class="ph-brain"></i>
                        <span data-lang-es="Cognitivo" data-lang-en="Cognitive">Cognitivo</span>
                    </button>
                    <button class="tab-button ${this.activeTab==="audio"?"active":""}"
                            role="tab" 
                            aria-selected="${this.activeTab==="audio"}"
                            @click="${()=>this.setActiveTab("audio")}">
                        <i class="ph-speaker-high"></i>
                        <span data-lang-es="Auditivo" data-lang-en="Audio">Auditivo</span>
                    </button>
                </div>

                <div class="tab-content ${this.activeTab==="visual"?"active":""}" role="tabpanel">
                    <div class="accessibility-section">
                        <h3 class="section-title">
                            <i class="ph-eye"></i>
                            <span data-lang-es="Configuraciones Visuales" data-lang-en="Visual Settings">
                                Configuraciones Visuales
                            </span>
                        </h3>
                        <div class="control-group">
                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label" 
                                         data-lang-es="Tamaño de Fuente" 
                                         data-lang-en="Font Size">
                                        Tamaño de Fuente
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Ajusta el tamaño del texto para mejorar la legibilidad"
                                         data-lang-en="Adjust text size to improve readability">
                                        Ajusta el tamaño del texto para mejorar la legibilidad
                                    </div>
                                </div>
                                <div class="control-input">
                                    <input type="range" 
                                           class="slider"
                                           min="12" 
                                           max="24" 
                                           .value="${this.currentFontSize}"
                                           @input="${this.updateFontSize}"
                                           aria-label="Font size">
                                    <span>${this.currentFontSize}px</span>
                                </div>
                            </div>

                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Altura de Línea"
                                         data-lang-en="Line Height">
                                        Altura de Línea
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Aumenta el espaciado entre líneas para facilitar la lectura"
                                         data-lang-en="Increase spacing between lines for easier reading">
                                        Aumenta el espaciado entre líneas para facilitar la lectura
                                    </div>
                                </div>
                                <div class="control-input">
                                    <input type="range" 
                                           class="slider"
                                           min="1.2" 
                                           max="2.0" 
                                           step="0.1"
                                           .value="${this.lineHeight}"
                                           @input="${this.updateLineHeight}"
                                           aria-label="Line height">
                                    <span>${this.lineHeight}</span>
                                </div>
                            </div>

                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Alto Contraste"
                                         data-lang-en="High Contrast">
                                        Alto Contraste
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Activa un esquema de colores de alto contraste"
                                         data-lang-en="Enable high contrast color scheme">
                                        Activa un esquema de colores de alto contraste
                                    </div>
                                </div>
                                <div class="control-input">
                                    <label class="toggle-switch">
                                        <input type="checkbox" 
                                               .checked="${this.highContrast}"
                                               @change="${this.toggleHighContrast}">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Simulación de Daltonismo"
                                         data-lang-en="Color Blind Simulation">
                                        Simulación de Daltonismo
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Simula diferentes tipos de daltonismo para probar la accesibilidad"
                                         data-lang-en="Simulate different types of color blindness to test accessibility">
                                        Simula diferentes tipos de daltonismo para probar la accesibilidad
                                    </div>
                                </div>
                                <div class="control-input">
                                    <select class="select-control" 
                                            .value="${this.colorBlindMode}"
                                            @change="${this.updateColorBlindMode}">
                                        <option value="normal" data-lang-es="Normal" data-lang-en="Normal">Normal</option>
                                        <option value="protanopia" data-lang-es="Protanopía" data-lang-en="Protanopia">Protanopía</option>
                                        <option value="deuteranopia" data-lang-es="Deuteranopía" data-lang-en="Deuteranopia">Deuteranopía</option>
                                        <option value="tritanopia" data-lang-es="Tritanopía" data-lang-en="Tritanopia">Tritanopía</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content ${this.activeTab==="motor"?"active":""}" role="tabpanel">
                    <div class="accessibility-section">
                        <h3 class="section-title">
                            <i class="ph-keyboard"></i>
                            <span data-lang-es="Configuraciones de Navegación" data-lang-en="Navigation Settings">
                                Configuraciones de Navegación
                            </span>
                        </h3>
                        <div class="control-group">
                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Navegación por Teclado Visible"
                                         data-lang-en="Visible Keyboard Navigation">
                                        Navegación por Teclado Visible
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Hace más visibles los indicadores de foco del teclado"
                                         data-lang-en="Makes keyboard focus indicators more visible">
                                        Hace más visibles los indicadores de foco del teclado
                                    </div>
                                </div>
                                <div class="control-input">
                                    <label class="toggle-switch">
                                        <input type="checkbox" 
                                               .checked="${this.keyboardNavigationVisible}"
                                               @change="${this.toggleKeyboardNavigation}">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Estilo de Indicador de Foco"
                                         data-lang-en="Focus Indicator Style">
                                        Estilo de Indicador de Foco
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Personaliza la apariencia de los indicadores de foco"
                                         data-lang-en="Customize the appearance of focus indicators">
                                        Personaliza la apariencia de los indicadores de foco
                                    </div>
                                </div>
                                <div class="control-input">
                                    <select class="select-control" 
                                            .value="${this.focusIndicatorStyle}"
                                            @change="${this.updateFocusIndicator}">
                                        <option value="default" data-lang-es="Por defecto" data-lang-en="Default">Por defecto</option>
                                        <option value="high-contrast" data-lang-es="Alto contraste" data-lang-en="High contrast">Alto contraste</option>
                                        <option value="subtle" data-lang-es="Sutil" data-lang-en="Subtle">Sutil</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keyboard-shortcuts">
                        <h4 class="shortcuts-title">
                            <i class="ph-keyboard"></i>
                            <span data-lang-es="Atajos de Teclado" data-lang-en="Keyboard Shortcuts">
                                Atajos de Teclado
                            </span>
                        </h4>
                        <div class="shortcut-list">
                            <div class="shortcut-item">
                                <span data-lang-es="Navegación secuencial" data-lang-en="Sequential navigation">Navegación secuencial</span>
                                <span class="shortcut-key">Tab</span>
                            </div>
                            <div class="shortcut-item">
                                <span data-lang-es="Navegación inversa" data-lang-en="Reverse navigation">Navegación inversa</span>
                                <span class="shortcut-key">Shift + Tab</span>
                            </div>
                            <div class="shortcut-item">
                                <span data-lang-es="Activar elemento" data-lang-en="Activate element">Activar elemento</span>
                                <span class="shortcut-key">Enter / Space</span>
                            </div>
                            <div class="shortcut-item">
                                <span data-lang-es="Salir de modal" data-lang-en="Close modal">Salir de modal</span>
                                <span class="shortcut-key">Esc</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content ${this.activeTab==="cognitive"?"active":""}" role="tabpanel">
                    <div class="accessibility-section">
                        <h3 class="section-title">
                            <i class="ph-brain"></i>
                            <span data-lang-es="Soporte Cognitivo" data-lang-en="Cognitive Support">
                                Soporte Cognitivo
                            </span>
                        </h3>
                        <div class="control-group">
                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Reducir Movimiento"
                                         data-lang-en="Reduce Motion">
                                        Reducir Movimiento
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Minimiza animaciones y transiciones que pueden ser distractoras"
                                         data-lang-en="Minimize animations and transitions that might be distracting">
                                        Minimiza animaciones y transiciones que pueden ser distractoras
                                    </div>
                                </div>
                                <div class="control-input">
                                    <label class="toggle-switch">
                                        <input type="checkbox" 
                                               .checked="${this.reducedMotion}"
                                               @change="${this.toggleReducedMotion}">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accessibility-tips">
                        <h4 class="tips-title">
                            <i class="ph-lightbulb"></i>
                            <span data-lang-es="Consejos para el Aprendizaje" data-lang-en="Learning Tips">
                                Consejos para el Aprendizaje
                            </span>
                        </h4>
                        <ul class="tips-list">
                            <li data-lang-es="Toma descansos regulares cada 25-30 minutos para mantener la concentración"
                                data-lang-en="Take regular breaks every 25-30 minutes to maintain focus">
                                Toma descansos regulares cada 25-30 minutos para mantener la concentración
                            </li>
                            <li data-lang-es="Usa las secciones colapsables para dividir el contenido en partes manejables"
                                data-lang-en="Use collapsible sections to break content into manageable chunks">
                                Usa las secciones colapsables para dividir el contenido en partes manejables
                            </li>
                            <li data-lang-es="Practica con los componentes interactivos para reforzar los conceptos"
                                data-lang-en="Practice with interactive components to reinforce concepts">
                                Practica con los componentes interactivos para reforzar los conceptos
                            </li>
                            <li data-lang-es="Ajusta la velocidad de las animaciones según tu preferencia"
                                data-lang-en="Adjust animation speed according to your preference">
                                Ajusta la velocidad de las animaciones según tu preferencia
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="tab-content ${this.activeTab==="audio"?"active":""}" role="tabpanel">
                    <div class="accessibility-section">
                        <h3 class="section-title">
                            <i class="ph-speaker-high"></i>
                            <span data-lang-es="Configuraciones de Audio" data-lang-en="Audio Settings">
                                Configuraciones de Audio
                            </span>
                        </h3>
                        <div class="control-group">
                            <div class="control-item">
                                <div class="control-info">
                                    <div class="control-label"
                                         data-lang-es="Modo Lector de Pantalla"
                                         data-lang-en="Screen Reader Mode">
                                        Modo Lector de Pantalla
                                    </div>
                                    <div class="control-description"
                                         data-lang-es="Optimiza la experiencia para usuarios de lectores de pantalla"
                                         data-lang-en="Optimizes the experience for screen reader users">
                                        Optimiza la experiencia para usuarios de lectores de pantalla
                                    </div>
                                </div>
                                <div class="control-input">
                                    <label class="toggle-switch">
                                        <input type="checkbox" 
                                               .checked="${this.screenReaderMode}"
                                               @change="${this.toggleScreenReader}">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="demonstration-area">
                    <div class="demo-content">
                        <h3 class="demo-title"
                            data-lang-es="Área de Demostración"
                            data-lang-en="Demonstration Area">
                            Área de Demostración
                        </h3>
                        <p class="demo-text"
                           data-lang-es="Este texto cambia según tus configuraciones de accesibilidad. Úsalo para probar diferentes ajustes y ver cómo afectan la legibilidad y usabilidad."
                           data-lang-en="This text changes according to your accessibility settings. Use it to test different adjustments and see how they affect readability and usability.">
                            Este texto cambia según tus configuraciones de accesibilidad. Úsalo para probar diferentes ajustes y ver cómo afectan la legibilidad y usabilidad.
                        </p>
                        <button class="demo-button"
                                data-lang-es="Botón de Prueba"
                                data-lang-en="Test Button">
                            Botón de Prueba
                        </button>
                    </div>
                </div>
            </div>

            <!-- SVG filters for color blind simulation -->
            <svg style="display: none;">
                <defs>
                    <filter id="protanopia-filter">
                        <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
                    </filter>
                    <filter id="deuteranopia-filter">
                        <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
                    </filter>
                    <filter id="tritanopia-filter">
                        <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
                    </filter>
                </defs>
            </svg>
        `}}i(o,"properties",{currentFontSize:{type:Number},reducedMotion:{type:Boolean},highContrast:{type:Boolean},screenReaderMode:{type:Boolean},keyboardNavigationVisible:{type:Boolean},colorBlindMode:{type:String},focusIndicatorStyle:{type:String},lineHeight:{type:Number},activeTab:{type:String}}),i(o,"styles",c`
        :host {
            display: block;
        }

        .toolkit-container {
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            max-width: 800px;
            margin: 0 auto;
        }

        .toolkit-header {
            text-align: center;
            margin-bottom: var(--space-xl);
        }

        .toolkit-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-sm);
        }

        .toolkit-description {
            color: var(--text-secondary);
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
        }

        .tabs-container {
            display: flex;
            background: var(--bg);
            border-radius: var(--radius-md);
            padding: var(--space-xs);
            margin-bottom: var(--space-xl);
            overflow-x: auto;
        }

        .tab-button {
            background: none;
            border: none;
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-sm);
            color: var(--text-secondary);
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: var(--space-xs);
        }

        .tab-button:hover {
            color: var(--text);
            background: var(--card-bg);
        }

        .tab-button.active {
            background: var(--primary);
            color: white;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .accessibility-section {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--space-lg);
            margin-bottom: var(--space-lg);
        }

        .section-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
        }

        .control-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--space-md);
            background: var(--card-bg);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
        }

        .control-info {
            flex: 1;
        }

        .control-label {
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-xs);
        }

        .control-description {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: 1.4;
        }

        .control-input {
            margin-left: var(--space-md);
        }

        .slider {
            width: 120px;
            margin: 0 var(--space-sm);
        }

        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 24px;
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
        }

        input:checked + .toggle-slider {
            background-color: var(--primary);
        }

        input:checked + .toggle-slider:before {
            transform: translateX(26px);
        }

        .select-control {
            padding: var(--space-sm) var(--space-md);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            background: var(--bg);
            color: var(--text);
            font-size: var(--text-sm);
            min-width: 120px;
        }

        .demonstration-area {
            background: var(--card-bg);
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--space-xl);
            text-align: center;
            margin-top: var(--space-lg);
        }

        .demo-content {
            max-width: 500px;
            margin: 0 auto;
        }

        .demo-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-md);
        }

        .demo-text {
            color: var(--text-secondary);
            line-height: var(--line-height);
            margin-bottom: var(--space-lg);
            font-size: var(--font-size);
        }

        .demo-button {
            background: var(--primary);
            color: white;
            border: none;
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-base);
            transition: all 0.3s ease;
        }

        .demo-button:hover {
            background: var(--primary-dark);
            transform: translateY(-1px);
        }

        .demo-button:focus {
            outline: 3px solid var(--focus-color);
            outline-offset: 2px;
        }

        .keyboard-shortcuts {
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--space-lg);
            margin-top: var(--space-lg);
        }

        .shortcuts-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--code-text);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .shortcut-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-sm);
        }

        .shortcut-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-sm);
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-xs);
            font-size: var(--text-sm);
            color: var(--code-text);
        }

        .shortcut-key {
            background: var(--bg);
            color: var(--text);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-xs);
            font-family: var(--font-mono);
            font-size: var(--text-xs);
            border: 1px solid var(--border-color);
        }

        .accessibility-tips {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
            border: 1px solid var(--success);
            border-radius: var(--radius-md);
            padding: var(--space-lg);
            margin-top: var(--space-lg);
        }

        .tips-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--success);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .tips-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .tips-list li {
            padding: var(--space-sm) 0;
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
            font-size: var(--text-sm);
            line-height: 1.6;
            color: var(--text-secondary);
        }

        .tips-list li:last-child {
            border-bottom: none;
        }

        .tips-list li::before {
            content: '💡';
            margin-right: var(--space-sm);
        }

        /* High contrast mode styles */
        :host([high-contrast]) .toolkit-container {
            background: black;
            color: white;
            border-color: white;
        }

        :host([high-contrast]) .accessibility-section {
            background: #1a1a1a;
            border-color: #666;
        }

        :host([high-contrast]) .control-item {
            background: #2a2a2a;
            border-color: #666;
        }

        /* Reduced motion mode */
        :host([reduced-motion]) * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }

        /* Mobile-First Responsive Design */
        @media (max-width: 375px) {
            .toolkit-container {
                padding: var(--space-md);
                margin: var(--space-sm);
            }
            
            .tabs-container {
                flex-direction: column;
                gap: var(--space-xs);
                padding: var(--space-sm);
            }
            
            .tab-button {
                justify-content: center;
                padding: var(--space-md);
                min-height: 44px;
                width: 100%;
            }
            
            .accessibility-section {
                padding: var(--space-md);
            }
            
            .control-item {
                flex-direction: column;
                align-items: stretch;
                gap: var(--space-md);
                padding: var(--space-md);
            }
            
            .control-input {
                margin-left: 0;
                align-self: center;
            }
            
            .slider {
                width: 100%;
                max-width: 200px;
            }
            
            .select-control {
                min-width: unset;
                width: 100%;
            }
        }
        
        @media (min-width: 376px) and (max-width: 768px) {
            .tabs-container {
                justify-content: center;
                flex-wrap: wrap;
                gap: var(--space-xs);
                flex-direction: column;
            }
            
            .tab-button {
                min-height: 44px;
                touch-action: manipulation;
                justify-content: center;
            }
            
            .control-item {
                flex-direction: column;
                align-items: stretch;
                gap: var(--space-md);
            }
            
            .control-input {
                margin-left: 0;
                align-self: center;
            }
        }
        
        /* Touch-Friendly Enhancements */
        @media (hover: none) {
            .tab-button:hover {
                background: none;
                color: var(--text-secondary);
            }
            
            .tab-button:focus,
            .tab-button:active {
                background: var(--card-bg);
                color: var(--text);
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        }
        
        /* Enhanced Touch Targets for All Screens */
        .tab-button, 
        .toggle-switch, 
        .select-control, 
        .slider {
            min-height: 44px;
            touch-action: manipulation;
        }
        
        .toggle-switch {
            width: 60px;
            height: 32px;
        }
        
        .toggle-slider:before {
            height: 26px;
            width: 26px;
            left: 3px;
            bottom: 3px;
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(28px);
        }
    `);customElements.define("accessibility-toolkit",o);export{o as AccessibilityToolkit};
//# sourceMappingURL=accessibility-toolkit-CxAX4sPo.js.map
