var u=Object.defineProperty;var p=(n,e,a)=>e in n?u(n,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[e]=a;var c=(n,e,a)=>p(n,typeof e!="symbol"?e+"":e,a);import{a as m,i as g,x as r}from"./index-DmWaINwU.js";class l extends m{constructor(){super(),this.currentQuestion=0,this.answers=[],this.assessmentComplete=!1,this.results={},this.showResults=!1,this.showRecommendations=!1,this.questions=[{id:1,question:{es:"¿Cómo prefieres recibir información nueva?",en:"How do you prefer to receive new information?"},options:[{text:{es:"A través de diagramas, gráficos y visualizaciones",en:"Through diagrams, charts and visualizations"},style:"visual",weight:3},{text:{es:"Escuchando explicaciones detalladas",en:"Listening to detailed explanations"},style:"auditory",weight:3},{text:{es:"Experimentando y practicando directamente",en:"Experimenting and practicing directly"},style:"kinesthetic",weight:3},{text:{es:"Leyendo documentación estructurada paso a paso",en:"Reading structured step-by-step documentation"},style:"reading",weight:3}]},{id:2,question:{es:"Cuando aprendes un nuevo concepto de programación, ¿qué te ayuda más?",en:"When learning a new programming concept, what helps you most?"},options:[{text:{es:"Ver el código en acción con ejemplos visuales",en:"Seeing code in action with visual examples"},style:"visual",weight:3},{text:{es:"Que alguien me explique línea por línea",en:"Having someone explain it line by line"},style:"auditory",weight:3},{text:{es:"Escribir y modificar el código yo mismo",en:"Writing and modifying the code myself"},style:"kinesthetic",weight:3},{text:{es:"Seguir tutoriales organizados con instrucciones claras",en:"Following organized tutorials with clear instructions"},style:"structured",weight:3}]},{id:3,question:{es:"¿Cómo te sientes más cómodo trabajando?",en:"How do you feel most comfortable working?"},options:[{text:{es:"Con herramientas visuales como interfaces gráficas",en:"With visual tools like graphical interfaces"},style:"visual",weight:2},{text:{es:"En colaboración, hablando sobre problemas",en:"Collaboratively, talking through problems"},style:"auditory",weight:2},{text:{es:"Experimentando directamente con las herramientas",en:"Directly experimenting with tools"},style:"kinesthetic",weight:2},{text:{es:"Con listas de tareas claras y procesos definidos",en:"With clear task lists and defined processes"},style:"structured",weight:2}]},{id:4,question:{es:"¿Qué tipo de retroalimentación prefieres?",en:"What type of feedback do you prefer?"},options:[{text:{es:"Indicadores visuales de progreso y estado",en:"Visual progress and status indicators"},style:"visual",weight:2},{text:{es:"Conversaciones y discusiones sobre mi trabajo",en:"Conversations and discussions about my work"},style:"auditory",weight:2},{text:{es:"Resultados inmediatos de mis acciones",en:"Immediate results from my actions"},style:"kinesthetic",weight:2},{text:{es:"Evaluaciones estructuradas con criterios claros",en:"Structured evaluations with clear criteria"},style:"structured",weight:2}]},{id:5,question:{es:"¿Cómo prefieres resolver problemas complejos?",en:"How do you prefer to solve complex problems?"},options:[{text:{es:"Dibujando diagramas y mapas mentales",en:"Drawing diagrams and mind maps"},style:"visual",weight:3},{text:{es:"Hablando en voz alta o con otros",en:"Talking out loud or with others"},style:"auditory",weight:3},{text:{es:"Probando diferentes soluciones iterativamente",en:"Testing different solutions iteratively"},style:"kinesthetic",weight:3},{text:{es:"Siguiendo metodologías y marcos estructurados",en:"Following methodologies and structured frameworks"},style:"structured",weight:3}]},{id:6,question:{es:"¿Qué te motiva más en el aprendizaje?",en:"What motivates you most in learning?"},options:[{text:{es:"Ver resultados visuales de mi progreso",en:"Seeing visual results of my progress"},style:"visual",weight:2},{text:{es:"Recibir reconocimiento verbal y social",en:"Receiving verbal and social recognition"},style:"auditory",weight:2},{text:{es:"Lograr que algo funcione por mi cuenta",en:"Making something work on my own"},style:"kinesthetic",weight:2},{text:{es:"Completar objetivos y metas claramente definidas",en:"Completing clearly defined objectives and goals"},style:"structured",weight:2}]},{id:7,question:{es:"¿Cómo prefieres que se organice el contenido educativo?",en:"How do you prefer educational content to be organized?"},options:[{text:{es:"Con muchos elementos visuales e interactivos",en:"With many visual and interactive elements"},style:"visual",weight:2},{text:{es:"Como una conversación o narración",en:"As a conversation or narrative"},style:"auditory",weight:2},{text:{es:"Con ejercicios prácticos frecuentes",en:"With frequent practical exercises"},style:"kinesthetic",weight:2},{text:{es:"En módulos secuenciales con requisitos previos claros",en:"In sequential modules with clear prerequisites"},style:"structured",weight:2}]},{id:8,question:{es:"¿Qué herramientas prefieres para aprender Git?",en:"What tools do you prefer for learning Git?"},options:[{text:{es:"Herramientas con interfaz gráfica (GUI)",en:"Graphical interface (GUI) tools"},style:"visual",weight:3},{text:{es:"Tutoriales en video con explicaciones",en:"Video tutorials with explanations"},style:"auditory",weight:3},{text:{es:"Línea de comandos y experimentación directa",en:"Command line and direct experimentation"},style:"kinesthetic",weight:3},{text:{es:"Documentación oficial y guías paso a paso",en:"Official documentation and step-by-step guides"},style:"structured",weight:3}]}],this.styleDescriptions={visual:{name:{es:"Aprendiz Visual",en:"Visual Learner"},description:{es:"Procesas información mejor a través de elementos visuales, diagramas, gráficos y representaciones espaciales.",en:"You process information better through visual elements, diagrams, charts, and spatial representations."},characteristics:{es:["Prefieres ver la información antes que escucharla","Los diagramas y esquemas te ayudan a comprender conceptos","Te gustan las herramientas con interfaces gráficas","Recuerdas mejor con ayudas visuales"],en:["You prefer to see information rather than hear it","Diagrams and schemes help you understand concepts","You like tools with graphical interfaces","You remember better with visual aids"]}},auditory:{name:{es:"Aprendiz Auditivo",en:"Auditory Learner"},description:{es:"Aprendes mejor escuchando explicaciones, participando en discusiones y procesando información verbalmente.",en:"You learn better by listening to explanations, participating in discussions, and processing information verbally."},characteristics:{es:["Prefieres las explicaciones habladas","Aprendes bien en grupos y discusiones","Te ayuda hablar en voz alta mientras trabajas","Los podcasts y videos son tus formatos preferidos"],en:["You prefer spoken explanations","You learn well in groups and discussions","It helps to talk out loud while working","Podcasts and videos are your preferred formats"]}},kinesthetic:{name:{es:"Aprendiz Kinestésico",en:"Kinesthetic Learner"},description:{es:"Necesitas experiencia práctica y experimentación directa para comprender y retener nueva información.",en:"You need hands-on experience and direct experimentation to understand and retain new information."},characteristics:{es:["Aprendes mejor haciendo y experimentando","Prefieres la práctica a la teoría","Te gusta manipular herramientas directamente","Necesitas movimiento y actividad para concentrarte"],en:["You learn better by doing and experimenting","You prefer practice over theory","You like to manipulate tools directly","You need movement and activity to concentrate"]}},structured:{name:{es:"Aprendiz Estructurado",en:"Structured Learner"},description:{es:"Prefieres información organizada, secuencial y con procedimientos claros y metodologías bien definidas.",en:"You prefer organized, sequential information with clear procedures and well-defined methodologies."},characteristics:{es:["Necesitas estructura y organización clara","Prefieres seguir procesos paso a paso","Te gustan las listas de verificación y plantillas","Valoras la consistencia y los métodos probados"],en:["You need clear structure and organization","You prefer to follow step-by-step processes","You like checklists and templates","You value consistency and proven methods"]}}},this.recommendations={visual:{tools:{es:["GitHub Desktop","GitKraken","Sourcetree","Learn Git Branching"],en:["GitHub Desktop","GitKraken","Sourcetree","Learn Git Branching"]},strategies:{es:["Usa herramientas GUI para visualizar el historial de commits","Crea diagramas de flujo de trabajo antes de implementar","Utiliza mapas mentales para planificar la estructura del proyecto","Aprovecha las extensiones visuales del IDE como GitLens"],en:["Use GUI tools to visualize commit history","Create workflow diagrams before implementing","Use mind maps to plan project structure","Take advantage of visual IDE extensions like GitLens"]}},auditory:{tools:{es:["Tutoriales en video","Podcasts de programación","Code review colaborativo","Pair programming"],en:["Video tutorials","Programming podcasts","Collaborative code review","Pair programming"]},strategies:{es:["Participa en sesiones de code review habladas","Explica tu código en voz alta mientras lo escribes","Únete a comunidades y grupos de estudio","Usa herramientas de colaboración en tiempo real"],en:["Participate in spoken code review sessions","Explain your code out loud while writing it","Join communities and study groups","Use real-time collaboration tools"]}},kinesthetic:{tools:{es:["Terminal/Command Line","IDEs integrados","Jupyter Notebooks","Entornos de práctica"],en:["Terminal/Command Line","Integrated IDEs","Jupyter Notebooks","Practice environments"]},strategies:{es:["Practica comandos de Git en un entorno seguro","Crea proyectos pequeños para experimentar","Usa el método 'trial and error' para aprender","Configura tu entorno de desarrollo personalmente"],en:["Practice Git commands in a safe environment","Create small projects to experiment","Use the 'trial and error' method to learn","Set up your development environment personally"]}},structured:{tools:{es:["Documentación oficial","Checklists","Templates","Flujos de trabajo definidos"],en:["Official documentation","Checklists","Templates","Defined workflows"]},strategies:{es:["Sigue metodologías establecidas como Git Flow","Usa plantillas para commits y pull requests","Mantén un registro estructurado de tu progreso","Establece rutinas y procesos consistentes"],en:["Follow established methodologies like Git Flow","Use templates for commits and pull requests","Keep a structured record of your progress","Establish consistent routines and processes"]}}}}answerQuestion(e){const a=this.questions[this.currentQuestion],i=a.options[e];this.answers[this.currentQuestion]={questionId:a.id,selectedOption:e,style:i.style,weight:i.weight},this.currentQuestion<this.questions.length-1?this.currentQuestion++:this.finishAssessment(),this.requestUpdate()}previousQuestion(){this.currentQuestion>0&&(this.currentQuestion--,this.requestUpdate())}finishAssessment(){this.calculateResults(),this.assessmentComplete=!0,this.showResults=!0,this.requestUpdate()}calculateResults(){const e={visual:0,auditory:0,kinesthetic:0,structured:0};this.answers.forEach(t=>{e.hasOwnProperty(t.style)&&(e[t.style]+=t.weight)});const a=Object.values(e).reduce((t,s)=>t+s,0),i={};Object.keys(e).forEach(t=>{i[t]=Math.round(e[t]/a*100)});const o=Object.keys(i).reduce((t,s)=>i[t]>i[s]?t:s);this.results={scores:i,primaryStyle:o,totalAnswered:this.answers.length}}restartAssessment(){this.currentQuestion=0,this.answers=[],this.assessmentComplete=!1,this.results={},this.showResults=!1,this.showRecommendations=!1,this.requestUpdate()}showRecommendationsSection(){this.showRecommendations=!0,this.requestUpdate()}getCurrentLanguage(){return document.documentElement.lang||"es"}render(){const e=this.getCurrentLanguage(),a=(this.currentQuestion+(this.assessmentComplete?1:0))/this.questions.length*100;if(this.assessmentComplete&&this.showResults){const o=this.results.primaryStyle,t=this.styleDescriptions[o];return r`
                <div class="assessment-container">
                    <div class="results-container active">
                        <div class="results-header">
                            <h2 class="results-title"
                                data-lang-es="¡Resultados de tu Evaluación!"
                                data-lang-en="Your Assessment Results!">
                                ¡Resultados de tu Evaluación!
                            </h2>
                        </div>

                        <div class="primary-style">
                            <h3 class="primary-style-name">
                                ${t.name[e]}
                            </h3>
                            <p class="primary-style-description">
                                ${t.description[e]}
                            </p>
                        </div>

                        <div class="style-breakdown">
                            ${Object.entries(this.results.scores).map(([s,d])=>r`
                                <div class="style-score ${s}">
                                    <h4 class="score-name">${this.styleDescriptions[s].name[e]}</h4>
                                    <div class="score-percentage">${d}%</div>
                                    <div class="score-bar">
                                        <div class="score-fill" style="width: ${d}%"></div>
                                    </div>
                                </div>
                            `)}
                        </div>

                        <div class="characteristics-section">
                            <h3 class="characteristics-title">
                                <i class="ph-user-focus"></i>
                                <span data-lang-es="Características de tu Estilo de Aprendizaje"
                                      data-lang-en="Your Learning Style Characteristics">
                                    Características de tu Estilo de Aprendizaje
                                </span>
                            </h3>
                            <ul class="characteristics-list">
                                ${t.characteristics[e].map(s=>r`
                                    <li>${s}</li>
                                `)}
                            </ul>
                        </div>

                        ${this.showRecommendations?r`
                            <div class="recommendations-section">
                                <h3 class="recommendations-title">
                                    <i class="ph-lightbulb"></i>
                                    <span data-lang-es="Recomendaciones Personalizadas para Aprender Git"
                                          data-lang-en="Personalized Recommendations for Learning Git">
                                        Recomendaciones Personalizadas para Aprender Git
                                    </span>
                                </h3>

                                <div class="recommendation-category">
                                    <h4 class="category-title">
                                        <i class="ph-tools"></i>
                                        <span data-lang-es="Herramientas Recomendadas" data-lang-en="Recommended Tools">
                                            Herramientas Recomendadas
                                        </span>
                                    </h4>
                                    <div class="recommendation-list">
                                        ${this.recommendations[o].tools[e].map(s=>r`
                                            <div class="recommendation-item">${s}</div>
                                        `)}
                                    </div>
                                </div>

                                <div class="recommendation-category">
                                    <h4 class="category-title">
                                        <i class="ph-strategy"></i>
                                        <span data-lang-es="Estrategias de Aprendizaje" data-lang-en="Learning Strategies">
                                            Estrategias de Aprendizaje
                                        </span>
                                    </h4>
                                    <div class="recommendation-list">
                                        ${this.recommendations[o].strategies[e].map(s=>r`
                                            <div class="recommendation-item">${s}</div>
                                        `)}
                                    </div>
                                </div>
                            </div>
                        `:r`
                            <button class="nav-button" @click="${this.showRecommendationsSection}">
                                <i class="ph-lightbulb"></i>
                                <span data-lang-es="Ver Recomendaciones Personalizadas" 
                                      data-lang-en="View Personalized Recommendations">
                                    Ver Recomendaciones Personalizadas
                                </span>
                            </button>
                        `}

                        <button class="restart-button" @click="${this.restartAssessment}">
                            <i class="ph-arrow-clockwise"></i>
                            <span data-lang-es="Realizar Evaluación Nuevamente" 
                                  data-lang-en="Take Assessment Again">
                                Realizar Evaluación Nuevamente
                            </span>
                        </button>
                    </div>
                </div>
            `}const i=this.questions[this.currentQuestion];return r`
            <div class="assessment-container">
                <div class="assessment-header">
                    <h2 class="assessment-title">
                        <i class="ph-brain"></i>
                        <span data-lang-es="Evaluación de Estilo de Aprendizaje" 
                              data-lang-en="Learning Style Assessment">
                            Evaluación de Estilo de Aprendizaje
                        </span>
                    </h2>
                    <p class="assessment-description"
                       data-lang-es="Descubre tu estilo de aprendizaje preferido para obtener recomendaciones personalizadas sobre las mejores herramientas y estrategias para aprender Git."
                       data-lang-en="Discover your preferred learning style to get personalized recommendations on the best tools and strategies for learning Git.">
                        Descubre tu estilo de aprendizaje preferido para obtener recomendaciones personalizadas sobre las mejores herramientas y estrategias para aprender Git.
                    </p>
                </div>

                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${a}%"></div>
                    </div>
                    <div class="progress-text">
                        <span data-lang-es="Pregunta ${this.currentQuestion+1} de ${this.questions.length}"
                              data-lang-en="Question ${this.currentQuestion+1} of ${this.questions.length}">
                            Pregunta ${this.currentQuestion+1} de ${this.questions.length}
                        </span>
                    </div>
                </div>

                <div class="question-container">
                    <div class="question-number">
                        <span data-lang-es="Pregunta ${this.currentQuestion+1}"
                              data-lang-en="Question ${this.currentQuestion+1}">
                            Pregunta ${this.currentQuestion+1}
                        </span>
                    </div>
                    <h3 class="question-text">
                        ${i.question[e]}
                    </h3>
                    
                    <div class="options-container">
                        ${i.options.map((o,t)=>r`
                            <button class="option-button" @click="${()=>this.answerQuestion(t)}">
                                <div class="option-indicator"></div>
                                <div class="option-text">${o.text[e]}</div>
                            </button>
                        `)}
                    </div>
                </div>

                <div class="navigation-buttons">
                    <button class="nav-button secondary" 
                            @click="${this.previousQuestion}"
                            ?disabled="${this.currentQuestion===0}">
                        <i class="ph-caret-left"></i>
                        <span data-lang-es="Anterior" data-lang-en="Previous">Anterior</span>
                    </button>
                    
                    <span data-lang-es="Selecciona una opción para continuar"
                          data-lang-en="Select an option to continue">
                        Selecciona una opción para continuar
                    </span>
                </div>
            </div>
        `}}c(l,"properties",{currentQuestion:{type:Number},answers:{type:Array},assessmentComplete:{type:Boolean},results:{type:Object},showResults:{type:Boolean},showRecommendations:{type:Boolean}}),c(l,"styles",g`
        :host {
            display: block;
        }

        .assessment-container {
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            max-width: 800px;
            margin: 0 auto;
        }

        .assessment-header {
            text-align: center;
            margin-bottom: var(--space-xl);
        }

        .assessment-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-sm);
        }

        .assessment-description {
            color: var(--text-secondary);
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto var(--space-lg);
        }

        .progress-container {
            background: var(--bg);
            border-radius: var(--radius-md);
            padding: var(--space-md);
            margin-bottom: var(--space-xl);
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--border-color);
            border-radius: var(--radius-xs);
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: var(--radius-xs);
            transition: width 0.3s ease;
        }

        .progress-text {
            text-align: center;
            margin-top: var(--space-sm);
            font-size: var(--text-sm);
            color: var(--text-secondary);
        }

        .question-container {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            margin-bottom: var(--space-lg);
        }

        .question-number {
            font-size: var(--text-sm);
            color: var(--primary);
            font-weight: 600;
            margin-bottom: var(--space-xs);
        }

        .question-text {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-xl);
            line-height: 1.4;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
        }

        .option-button {
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: var(--space-lg);
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
            width: 100%;
            display: flex;
            align-items: flex-start;
            gap: var(--space-md);
        }

        .option-button:hover {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.05);
            transform: translateY(-1px);
        }

        .option-button:focus {
            outline: 3px solid rgba(37, 99, 235, 0.3);
            outline-offset: 2px;
        }

        .option-indicator {
            width: 20px;
            height: 20px;
            border: 2px solid var(--border-color);
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 2px;
            transition: all 0.3s ease;
        }

        .option-button:hover .option-indicator {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.1);
        }

        .option-text {
            font-size: var(--text-base);
            color: var(--text);
            line-height: 1.5;
        }

        .navigation-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: var(--space-xl);
        }

        .nav-button {
            background: var(--primary);
            color: white;
            border: none;
            padding: var(--space-md) var(--space-xl);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-base);
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .nav-button:hover:not(:disabled) {
            background: var(--primary-dark);
            transform: translateY(-1px);
        }

        .nav-button:disabled {
            background: var(--border-color);
            cursor: not-allowed;
            transform: none;
        }

        .nav-button.secondary {
            background: var(--secondary);
        }

        .nav-button.secondary:hover:not(:disabled) {
            background: var(--secondary-dark);
        }

        .results-container {
            display: none;
        }

        .results-container.active {
            display: block;
        }

        .results-header {
            text-align: center;
            margin-bottom: var(--space-xl);
        }

        .results-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--success);
            margin-bottom: var(--space-md);
        }

        .primary-style {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            color: white;
            text-align: center;
            margin-bottom: var(--space-xl);
        }

        .primary-style-name {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: var(--space-md);
        }

        .primary-style-description {
            font-size: var(--text-lg);
            line-height: 1.6;
            opacity: 0.95;
        }

        .style-breakdown {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
        }

        .style-score {
            background: var(--bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .style-score::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--primary);
        }

        .style-score.visual::before { background: #3b82f6; }
        .style-score.auditory::before { background: #10b981; }
        .style-score.kinesthetic::before { background: #f59e0b; }
        .style-score.structured::before { background: #8b5cf6; }

        .score-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-sm);
        }

        .score-percentage {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: var(--space-sm);
        }

        .score-bar {
            width: 100%;
            height: 6px;
            background: var(--border-color);
            border-radius: var(--radius-xs);
            overflow: hidden;
        }

        .score-fill {
            height: 100%;
            background: var(--primary);
            border-radius: var(--radius-xs);
            transition: width 0.8s ease;
        }

        .style-score.visual .score-fill { background: #3b82f6; }
        .style-score.auditory .score-fill { background: #10b981; }
        .style-score.kinesthetic .score-fill { background: #f59e0b; }
        .style-score.structured .score-fill { background: #8b5cf6; }

        .characteristics-section {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            margin-bottom: var(--space-xl);
        }

        .characteristics-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-lg);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .characteristics-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--space-md);
        }

        .characteristics-list li {
            background: var(--card-bg);
            padding: var(--space-md);
            border-radius: var(--radius-sm);
            border-left: 4px solid var(--primary);
            font-size: var(--text-sm);
            line-height: 1.6;
            color: var(--text-secondary);
        }

        .characteristics-list li::before {
            content: '✓';
            color: var(--success);
            font-weight: bold;
            margin-right: var(--space-sm);
        }

        .recommendations-section {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
            border: 1px solid var(--success);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
        }

        .recommendations-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--success);
            margin-bottom: var(--space-lg);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .recommendation-category {
            margin-bottom: var(--space-lg);
        }

        .category-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .recommendation-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-sm);
        }

        .recommendation-item {
            background: rgba(255, 255, 255, 0.7);
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-sm);
            font-size: var(--text-sm);
            color: var(--text);
            border-left: 3px solid var(--success);
        }

        .restart-button {
            background: var(--secondary);
            color: white;
            border: none;
            padding: var(--space-md) var(--space-xl);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-base);
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            margin: var(--space-xl) auto 0;
        }

        .restart-button:hover {
            background: var(--secondary-dark);
            transform: translateY(-1px);
        }

        /* Mobile-First Responsive Design */
        @media (max-width: 375px) {
            .assessment-container {
                padding: var(--space-md);
                margin: var(--space-sm);
            }
            
            .question-container {
                padding: var(--space-md);
            }
            
            .question-options {
                gap: var(--space-sm);
            }
            
            .option-button {
                padding: var(--space-md);
                font-size: var(--text-sm);
                min-height: 60px;
                text-align: left;
            }
            
            .navigation-buttons {
                flex-direction: column;
                gap: var(--space-md);
                padding: var(--space-md);
            }
            
            .nav-button {
                min-height: 48px;
                width: 100%;
            }
            
            .progress-bar {
                height: 8px;
                margin: var(--space-md) 0;
            }
            
            .style-breakdown {
                grid-template-columns: 1fr;
                gap: var(--space-md);
            }
            
            .style-item {
                padding: var(--space-md);
            }
            
            .characteristics-list,
            .recommendation-list {
                grid-template-columns: 1fr;
                gap: var(--space-sm);
            }
            
            .characteristic-item,
            .recommendation-item {
                padding: var(--space-sm);
                font-size: var(--text-sm);
            }
        }
        
        @media (min-width: 376px) and (max-width: 640px) {
            .question-options {
                gap: var(--space-md);
            }
            
            .option-button {
                min-height: 56px;
                padding: var(--space-md);
            }
            
            .navigation-buttons {
                flex-direction: row;
                justify-content: space-between;
                gap: var(--space-lg);
            }
            
            .nav-button {
                min-height: 44px;
                flex: 1;
                max-width: 200px;
            }
            
            .style-breakdown {
                grid-template-columns: repeat(2, 1fr);
                gap: var(--space-lg);
            }
            
            .characteristics-list,
            .recommendation-list {
                grid-template-columns: 1fr;
            }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
            .navigation-buttons {
                flex-direction: row;
                justify-content: space-between;
                gap: var(--space-lg);
            }
            
            .style-breakdown {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .characteristics-list,
            .recommendation-list {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
        }
        
        /* Touch-Friendly Enhancements */
        @media (hover: none) {
            .option-button:hover,
            .nav-button:hover {
                transform: none;
                box-shadow: none;
            }
            
            .option-button:focus,
            .option-button:active {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
            
            .nav-button:focus,
            .nav-button:active {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        }
        
        /* Enhanced Touch Targets for All Screens */
        .option-button,
        .nav-button,
        .reset-button {
            min-height: 44px;
            touch-action: manipulation;
        }
        
        .option-button {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
    `);customElements.define("learning-style-assessment",l);export{l as LearningStyleAssessment};
//# sourceMappingURL=learning-style-assessment-1YEMN2ew.js.map
