/**
 * Interactive CI/CD Pipeline Visualizer Component
 * Demonstrates continuous integration and deployment concepts with GitHub Actions
 */
import { LitElement, html, css } from 'lit';

export class CicdPipelineVisualizer extends LitElement {
    static properties = {
        currentPipeline: { type: String },
        isRunning: { type: Boolean },
        currentStep: { type: Number },
        pipelineHistory: { type: Array },
        selectedExampleType: { type: String },
        showYamlCode: { type: Boolean },
        animationSpeed: { type: Number }
    };

    constructor() {
        super();
        this.currentPipeline = 'basic';
        this.isRunning = false;
        this.currentStep = 0;
        this.pipelineHistory = [];
        this.selectedExampleType = 'nodejs';
        this.showYamlCode = false;
        this.animationSpeed = 1500;

        this.pipelines = {
            basic: {
                name: 'Pipeline Básico',
                description: 'Workflow simple de CI con testing y build',
                trigger: 'Push a main branch',
                steps: [
                    { 
                        name: 'Checkout Code', 
                        description: 'Descarga el código del repositorio',
                        icon: 'ph-download-simple',
                        duration: 10,
                        commands: ['git checkout ${{ github.sha }}']
                    },
                    { 
                        name: 'Setup Environment', 
                        description: 'Configura el entorno de ejecución',
                        icon: 'ph-gear',
                        duration: 30,
                        commands: ['setup-node@v3', 'npm install']
                    },
                    { 
                        name: 'Run Tests', 
                        description: 'Ejecuta las pruebas automatizadas',
                        icon: 'ph-test-tube',
                        duration: 45,
                        commands: ['npm test', 'npm run coverage']
                    },
                    { 
                        name: 'Build Application', 
                        description: 'Construye la aplicación para producción',
                        icon: 'ph-package',
                        duration: 60,
                        commands: ['npm run build', 'npm run optimize']
                    },
                    { 
                        name: 'Upload Artifacts', 
                        description: 'Guarda los archivos generados',
                        icon: 'ph-upload-simple',
                        duration: 15,
                        commands: ['upload-artifact@v3']
                    }
                ]
            },
            advanced: {
                name: 'Pipeline Avanzado',
                description: 'CI/CD completo con múltiples entornos',
                trigger: 'Push a cualquier branch',
                steps: [
                    { 
                        name: 'Checkout & Setup', 
                        description: 'Prepara el entorno de trabajo',
                        icon: 'ph-download-simple',
                        duration: 20,
                        commands: ['checkout@v3', 'setup-node@v3', 'npm ci']
                    },
                    { 
                        name: 'Code Quality', 
                        description: 'Analiza la calidad del código',
                        icon: 'ph-magnifying-glass',
                        duration: 30,
                        commands: ['npm run lint', 'npm run format-check', 'sonarcloud-scan']
                    },
                    { 
                        name: 'Unit Tests', 
                        description: 'Ejecuta pruebas unitarias',
                        icon: 'ph-test-tube',
                        duration: 45,
                        commands: ['npm test -- --coverage', 'codecov upload']
                    },
                    { 
                        name: 'Integration Tests', 
                        description: 'Pruebas de integración',
                        icon: 'ph-link',
                        duration: 90,
                        commands: ['docker-compose up -d', 'npm run test:integration']
                    },
                    { 
                        name: 'Security Scan', 
                        description: 'Escaneo de vulnerabilidades',
                        icon: 'ph-shield-check',
                        duration: 60,
                        commands: ['npm audit', 'snyk test', 'codeql-analysis']
                    },
                    { 
                        name: 'Build & Package', 
                        description: 'Construye y empaqueta la aplicación',
                        icon: 'ph-package',
                        duration: 120,
                        commands: ['npm run build', 'docker build', 'docker push']
                    },
                    { 
                        name: 'Deploy to Staging', 
                        description: 'Despliega al entorno de pruebas',
                        icon: 'ph-cloud-arrow-up',
                        duration: 180,
                        commands: ['kubectl apply -f k8s/', 'wait-for-deployment']
                    },
                    { 
                        name: 'E2E Tests', 
                        description: 'Pruebas end-to-end en staging',
                        icon: 'ph-monitor-play',
                        duration: 300,
                        commands: ['cypress run --env=staging', 'lighthouse-ci']
                    },
                    { 
                        name: 'Deploy to Production', 
                        description: 'Despliega a producción (solo main)',
                        icon: 'ph-rocket',
                        duration: 240,
                        commands: ['kubectl apply -f k8s/prod/', 'health-check']
                    }
                ]
            },
            deployment: {
                name: 'Pipeline de Despliegue',
                description: 'Enfocado en estrategias de deployment',
                trigger: 'Release tag creation',
                steps: [
                    { 
                        name: 'Validate Release', 
                        description: 'Valida la versión del release',
                        icon: 'ph-check-circle',
                        duration: 10,
                        commands: ['validate-semver', 'check-changelog']
                    },
                    { 
                        name: 'Build Multi-Platform', 
                        description: 'Construye para múltiples plataformas',
                        icon: 'ph-devices',
                        duration: 180,
                        commands: ['docker buildx', 'build --platform linux/amd64,linux/arm64']
                    },
                    { 
                        name: 'Blue-Green Deployment', 
                        description: 'Despliega usando estrategia blue-green',
                        icon: 'ph-arrows-clockwise',
                        duration: 120,
                        commands: ['deploy-blue-environment', 'health-check', 'switch-traffic']
                    },
                    { 
                        name: 'Canary Release', 
                        description: 'Libera gradualmente a los usuarios',
                        icon: 'ph-trend-up',
                        duration: 300,
                        commands: ['deploy-canary 10%', 'monitor-metrics', 'gradual-rollout']
                    },
                    { 
                        name: 'Monitor & Rollback', 
                        description: 'Monitorea y prepara rollback si es necesario',
                        icon: 'ph-chart-line-up',
                        duration: 600,
                        commands: ['setup-monitoring', 'alert-on-errors', 'auto-rollback-if-needed']
                    }
                ]
            }
        };

        this.yamlExamples = {
            nodejs: {
                name: 'Node.js Application',
                content: `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to production
      run: npm run deploy
      env:
        DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`
            },
            python: {
                name: 'Python Application',
                content: `name: Python CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        python-version: [3.8, 3.9, 3.10, 3.11]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python \${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: \${{ matrix.python-version }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install flake8 pytest pytest-cov
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
    
    - name: Lint with flake8
      run: |
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
    
    - name: Test with pytest
      run: |
        pytest --cov=./ --cov-report=xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: \${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"`
            },
            docker: {
                name: 'Docker Application',
                content: `name: Docker CI/CD

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=semver,pattern=version
          type=semver,pattern=major.minor
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: \${{ steps.meta.outputs.tags }}
        labels: \${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to Kubernetes
      run: |
        echo "Deploying to Kubernetes cluster..."
        # kubectl apply -f k8s/`
            }
        };
    }

    static styles = css`
        :host {
            display: block;
        }

        .pipeline-container {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
        }

        .pipeline-controls {
            display: flex;
            gap: var(--space-md);
            margin-bottom: var(--space-xl);
            flex-wrap: wrap;
            align-items: center;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
        }

        .control-group label {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            font-weight: 500;
        }

        .pipeline-selector {
            display: flex;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            overflow: hidden;
        }

        .pipeline-btn {
            background: none;
            border: none;
            padding: var(--space-sm) var(--space-md);
            cursor: pointer;
            font-size: var(--text-sm);
            color: var(--text-secondary);
            transition: all 0.2s ease;
            white-space: nowrap;
        }

        .pipeline-btn:hover {
            color: var(--text);
            background: var(--bg);
        }

        .pipeline-btn.active {
            background: var(--primary);
            color: white;
        }

        .action-buttons {
            display: flex;
            gap: var(--space-sm);
        }

        .btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-sm);
            transition: background 0.2s ease;
            display: flex;
            align-items: center;
            gap: var(--space-xs);
        }

        .btn:hover:not(:disabled) {
            background: var(--primary-dark);
        }

        .btn:disabled {
            background: var(--border-color);
            cursor: not-allowed;
        }

        .btn.secondary {
            background: var(--secondary);
        }

        .btn.secondary:hover:not(:disabled) {
            background: var(--secondary-dark);
        }

        .speed-control {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .speed-slider {
            width: 100px;
        }

        .pipeline-info {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-bottom: var(--space-xl);
        }

        .pipeline-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin: 0 0 var(--space-sm) 0;
        }

        .pipeline-description {
            color: var(--text-secondary);
            margin-bottom: var(--space-md);
            line-height: 1.6;
        }

        .pipeline-trigger {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            color: var(--text);
        }

        .pipeline-trigger::before {
            content: '🚀 Trigger: ';
            color: var(--text-secondary);
            font-family: var(--font-sans);
        }

        .pipeline-visualization {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            margin-bottom: var(--space-xl);
        }

        .pipeline-steps {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
        }

        .pipeline-step {
            display: flex;
            align-items: center;
            gap: var(--space-lg);
            padding: var(--space-lg);
            background: var(--bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            transition: all 0.3s ease;
            position: relative;
        }

        .pipeline-step.running {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.05);
            animation: pulse 2s infinite;
        }

        .pipeline-step.completed {
            border-color: var(--success);
            background: rgba(34, 197, 94, 0.05);
        }

        .pipeline-step.failed {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.05);
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }

        .step-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            color: var(--text-secondary);
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .pipeline-step.running .step-icon {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .pipeline-step.completed .step-icon {
            background: var(--success);
            color: white;
            border-color: var(--success);
        }

        .pipeline-step.failed .step-icon {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
        }

        .step-content {
            flex: 1;
        }

        .step-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 var(--space-xs) 0;
        }

        .step-description {
            color: var(--text-secondary);
            margin-bottom: var(--space-sm);
            line-height: 1.5;
        }

        .step-commands {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-xs);
        }

        .step-command {
            background: var(--code-bg);
            color: var(--code-text);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-xs);
            font-family: var(--font-mono);
            font-size: var(--text-xs);
            border: 1px solid var(--border-color);
        }

        .step-duration {
            color: var(--text-secondary);
            font-size: var(--text-sm);
            font-family: var(--font-mono);
            display: flex;
            align-items: center;
            gap: var(--space-xs);
        }

        .step-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: var(--primary);
            transition: width 0.3s ease;
            border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .yaml-section {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-top: var(--space-xl);
        }

        .yaml-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-lg);
        }

        .yaml-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
        }

        .example-selector select {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            color: var(--text);
            font-size: var(--text-sm);
        }

        .yaml-code {
            background: var(--code-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-lg);
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            line-height: 1.6;
            color: var(--code-text);
            white-space: pre;
        }

        .pipeline-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--space-md);
            margin-bottom: var(--space-xl);
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-md);
            text-align: center;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: var(--space-xs);
        }

        .stat-label {
            font-size: var(--text-sm);
            color: var(--text-secondary);
        }

        @media (max-width: 768px) {
            .pipeline-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .pipeline-selector {
                flex-direction: column;
            }
            
            .pipeline-step {
                flex-direction: column;
                text-align: center;
                gap: var(--space-md);
            }
            
            .step-commands {
                justify-content: center;
            }
            
            .yaml-header {
                flex-direction: column;
                gap: var(--space-md);
                align-items: stretch;
            }
        }
    `;

    setPipeline(pipelineKey) {
        this.currentPipeline = pipelineKey;
        this.currentStep = 0;
        this.isRunning = false;
        this.requestUpdate();
    }

    async runPipeline() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.currentStep = 0;
        const pipeline = this.pipelines[this.currentPipeline];
        
        const startTime = Date.now();
        
        for (let i = 0; i < pipeline.steps.length; i++) {
            this.currentStep = i;
            this.requestUpdate();
            
            // Simulate step execution time
            const stepDuration = (pipeline.steps[i].duration / 60) * this.animationSpeed;
            await this.delay(stepDuration);
        }
        
        // Mark as completed
        this.currentStep = pipeline.steps.length;
        this.isRunning = false;
        
        // Add to history
        const endTime = Date.now();
        this.pipelineHistory.unshift({
            pipeline: this.currentPipeline,
            timestamp: new Date(),
            duration: Math.round((endTime - startTime) / 1000),
            status: 'success'
        });
        
        // Keep only last 5 runs
        if (this.pipelineHistory.length > 5) {
            this.pipelineHistory = this.pipelineHistory.slice(0, 5);
        }
        
        this.requestUpdate();
    }

    stopPipeline() {
        this.isRunning = false;
        this.requestUpdate();
    }

    resetPipeline() {
        this.isRunning = false;
        this.currentStep = 0;
        this.requestUpdate();
    }

    toggleYamlCode() {
        this.showYamlCode = !this.showYamlCode;
        this.requestUpdate();
    }

    setExampleType(type) {
        this.selectedExampleType = type;
        this.requestUpdate();
    }

    setAnimationSpeed(event) {
        this.animationSpeed = parseInt(event.target.value);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getStepStatus(stepIndex) {
        if (!this.isRunning && this.currentStep === 0) return 'pending';
        if (stepIndex < this.currentStep) return 'completed';
        if (stepIndex === this.currentStep && this.isRunning) return 'running';
        if (stepIndex === this.currentStep && !this.isRunning && this.currentStep > 0) return 'completed';
        return 'pending';
    }

    getTotalDuration() {
        const pipeline = this.pipelines[this.currentPipeline];
        return pipeline.steps.reduce((total, step) => total + step.duration, 0);
    }

    getCompletedSteps() {
        return this.isRunning ? this.currentStep : (this.currentStep > 0 ? this.pipelines[this.currentPipeline].steps.length : 0);
    }

    render() {
        const pipeline = this.pipelines[this.currentPipeline];
        const totalSteps = pipeline.steps.length;
        const completedSteps = this.getCompletedSteps();
        const totalDuration = this.getTotalDuration();

        return html`
            <div class="pipeline-container">
                <div class="pipeline-controls">
                    <div class="control-group">
                        <label>Tipo de Pipeline:</label>
                        <div class="pipeline-selector">
                            ${Object.entries(this.pipelines).map(([key, p]) => html`
                                <button 
                                    class="pipeline-btn ${this.currentPipeline === key ? 'active' : ''}"
                                    @click="${() => this.setPipeline(key)}"
                                    ?disabled="${this.isRunning}"
                                >
                                    ${p.name}
                                </button>
                            `)}
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label>Acciones:</label>
                        <div class="action-buttons">
                            <button 
                                class="btn" 
                                @click="${this.runPipeline}"
                                ?disabled="${this.isRunning}"
                            >
                                <i class="ph-play"></i>
                                ${this.isRunning ? 'Ejecutando...' : 'Ejecutar'}
                            </button>
                            <button 
                                class="btn secondary" 
                                @click="${this.stopPipeline}"
                                ?disabled="${!this.isRunning}"
                            >
                                <i class="ph-stop"></i>
                                Detener
                            </button>
                            <button 
                                class="btn secondary" 
                                @click="${this.resetPipeline}"
                                ?disabled="${this.isRunning}"
                            >
                                <i class="ph-arrow-clockwise"></i>
                                Reset
                            </button>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label>Velocidad:</label>
                        <div class="speed-control">
                            <input 
                                type="range" 
                                min="500" 
                                max="3000" 
                                step="250"
                                .value="${this.animationSpeed}"
                                @input="${this.setAnimationSpeed}"
                                class="speed-slider"
                            />
                            <span>${this.animationSpeed}ms</span>
                        </div>
                    </div>
                </div>

                <div class="pipeline-stats">
                    <div class="stat-card">
                        <div class="stat-value">${completedSteps}/${totalSteps}</div>
                        <div class="stat-label">Pasos Completados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${Math.round((completedSteps / totalSteps) * 100)}%</div>
                        <div class="stat-label">Progreso</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">~${Math.round(totalDuration / 60)}m</div>
                        <div class="stat-label">Duración Total</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.pipelineHistory.length}</div>
                        <div class="stat-label">Ejecuciones</div>
                    </div>
                </div>

                <div class="pipeline-info">
                    <h3 class="pipeline-title">${pipeline.name}</h3>
                    <p class="pipeline-description">${pipeline.description}</p>
                    <div class="pipeline-trigger">${pipeline.trigger}</div>
                </div>

                <div class="pipeline-visualization">
                    <div class="pipeline-steps">
                        ${pipeline.steps.map((step, index) => {
                            const status = this.getStepStatus(index);
                            const progress = status === 'running' ? Math.random() * 100 : (status === 'completed' ? 100 : 0);
                            
                            return html`
                                <div class="pipeline-step ${status}">
                                    <div class="step-icon">
                                        ${status === 'completed' ? html`<i class="ph-check"></i>` : 
                                          status === 'running' ? html`<i class="ph-spinner"></i>` :
                                          status === 'failed' ? html`<i class="ph-x"></i>` :
                                          html`<i class="${step.icon}"></i>`}
                                    </div>
                                    <div class="step-content">
                                        <h4 class="step-name">${step.name}</h4>
                                        <p class="step-description">${step.description}</p>
                                        <div class="step-commands">
                                            ${step.commands.map(cmd => html`
                                                <span class="step-command">${cmd}</span>
                                            `)}
                                        </div>
                                    </div>
                                    <div class="step-duration">
                                        <i class="ph-clock"></i>
                                        ~${step.duration}s
                                    </div>
                                    ${status === 'running' ? html`
                                        <div class="step-progress" style="width: ${progress}%"></div>
                                    ` : ''}
                                </div>
                            `;
                        })}
                    </div>
                </div>

                <div class="yaml-section">
                    <div class="yaml-header">
                        <h3 class="yaml-title">
                            <i class="ph-file-code"></i>
                            Ejemplo de GitHub Actions YAML
                        </h3>
                        <div class="example-selector">
                            <select @change="${e => this.setExampleType(e.target.value)}">
                                ${Object.entries(this.yamlExamples).map(([key, example]) => html`
                                    <option value="${key}" ?selected="${this.selectedExampleType === key}">
                                        ${example.name}
                                    </option>
                                `)}
                            </select>
                        </div>
                        <button class="btn secondary" @click="${this.toggleYamlCode}">
                            <i class="ph-${this.showYamlCode ? 'eye-slash' : 'eye'}"></i>
                            ${this.showYamlCode ? 'Ocultar' : 'Mostrar'} Código
                        </button>
                    </div>
                    
                    ${this.showYamlCode ? html`
                        <div class="yaml-code">${this.yamlExamples[this.selectedExampleType].content}</div>
                    ` : ''}
                </div>

                ${this.pipelineHistory.length > 0 ? html`
                    <div class="yaml-section">
                        <h3 class="yaml-title">
                            <i class="ph-clock-countdown"></i>
                            Historial de Ejecuciones
                        </h3>
                        ${this.pipelineHistory.map(run => html`
                            <div style="display: flex; justify-content: space-between; padding: var(--space-sm) 0; border-bottom: 1px solid var(--border-color);">
                                <span>${this.pipelines[run.pipeline].name}</span>
                                <span>${run.timestamp.toLocaleTimeString()}</span>
                                <span>${run.duration}s</span>
                                <span style="color: var(--success);">✓ ${run.status}</span>
                            </div>
                        `)}
                    </div>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('cicd-pipeline-visualizer', CicdPipelineVisualizer);