var d=Object.defineProperty;var c=(s,e,t)=>e in s?d(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var l=(s,e,t)=>c(s,typeof e!="symbol"?e+"":e,t);import{a as p,i as m,x as i}from"./index-DmWaINwU.js";class n extends p{constructor(){super(),this.selectedPlatforms=["github","gitlab","bitbucket"],this.filterCategory="all",this.showDetails=!1,this.detailPlatform="",this.viewMode="grid",this.platforms={github:{name:"GitHub",icon:"ph-github-logo",color:"#24292e",primaryFocus:"Open-source collaboration, developer experience, and a large ecosystem",cicd:"GitHub Actions: Highly flexible, modular, with a vast marketplace of community-built actions",projectManagement:"GitHub Issues & Projects: Good for basic issue tracking; relies on integrations for advanced features",keyDifferentiator:"The largest developer community, Copilot AI assistant, and extensive marketplace",freeTier:"Unlimited public/private repositories, 2,000 Actions minutes/month, free for open source",idealUser:"Open-source projects, individual developers, and teams of all sizes seeking flexibility",pricing:{free:"Free for public repos",team:"$4/user/month",enterprise:"$21/user/month"},features:{repositories:{free:"✓ Unlimited",paid:"✓ Unlimited"},cicd:{free:"2,000 min/month",paid:"3,000+ min/month"},storage:{free:"1GB",paid:"50GB+"},users:{free:"Unlimited",paid:"Unlimited"},support:{free:"Community",paid:"24/7 Support"},security:{free:"Basic",paid:"Advanced Security"},analytics:{free:"Basic",paid:"Advanced Insights"}},pros:["Largest community and ecosystem","Excellent documentation and learning resources","GitHub Actions marketplace","Strong integration with development tools","GitHub Copilot AI assistance","Excellent mobile app"],cons:["Limited project management features","Can be expensive for large teams","Limited customization options","Dependent on third-party integrations for advanced features"]},gitlab:{name:"GitLab",icon:"ph-gitlab-logo-simple",color:"#fc6d26",primaryFocus:"A single, all-in-one DevSecOps platform with tightly integrated features",cicd:"GitLab CI/CD: Powerful, mature, and tightly integrated into the platform. Includes Auto DevOps features",projectManagement:"Built-in: Offers advanced features like epics, roadmaps, and burndown charts natively",keyDifferentiator:"A complete, single-application DevOps platform with strong, built-in security and ops features",freeTier:"Unlimited public/private repositories, 400 CI/CD minutes/month, free self-hosted Community Edition",idealUser:"Teams wanting a comprehensive, out-of-the-box DevOps solution, especially with self-hosting needs",pricing:{free:"Free for up to 5 users",premium:"$19/user/month",ultimate:"$99/user/month"},features:{repositories:{free:"✓ Unlimited",paid:"✓ Unlimited"},cicd:{free:"400 min/month",paid:"10,000+ min/month"},storage:{free:"5GB",paid:"100GB+"},users:{free:"5 users",paid:"Unlimited"},support:{free:"Community",paid:"Priority Support"},security:{free:"Basic",paid:"Advanced Security"},analytics:{free:"Basic",paid:"Value Stream Analytics"}},pros:["Complete DevOps platform in one application","Strong built-in CI/CD capabilities","Self-hosting options available","Excellent project management features","Built-in security scanning","Auto DevOps capabilities"],cons:["Steeper learning curve","Can be resource-intensive when self-hosted","Smaller community compared to GitHub","Interface can feel overwhelming for beginners"]},bitbucket:{name:"Bitbucket",icon:"ph-git-branch",color:"#0052cc",primaryFocus:"Enterprise teams, private repositories, and deep integration with the Atlassian suite",cicd:"Bitbucket Pipelines: Built-in CI/CD that is well-integrated with the platform and Jira",projectManagement:"Native, deep integration with Jira, the industry-standard project management tool",keyDifferentiator:"Seamless integration with Jira and other Atlassian products",freeTier:"Unlimited private repositories for up to 5 users, 500 build minutes/month",idealUser:"Organizations heavily invested in the Atlassian ecosystem, particularly those using Jira",pricing:{free:"Free for up to 5 users",standard:"$3/user/month",premium:"$6/user/month"},features:{repositories:{free:"✓ Unlimited",paid:"✓ Unlimited"},cicd:{free:"500 min/month",paid:"2,500+ min/month"},storage:{free:"1GB",paid:"5GB+"},users:{free:"5 users",paid:"Unlimited"},support:{free:"Community",paid:"Premium Support"},security:{free:"Basic",paid:"Advanced Security"},analytics:{free:"Basic",paid:"Code Insights"}},pros:["Excellent integration with Atlassian suite","Strong for enterprise environments","Good built-in CI/CD with Pipelines","Competitive pricing","Strong Jira integration for project management"],cons:["Smaller community and ecosystem","Limited third-party integrations outside Atlassian","Less innovative compared to competitors","Heavily tied to Atlassian ecosystem"]},selfhosted:{name:"Self-Hosted",icon:"ph-server",color:"#6b7280",primaryFocus:"Complete control, privacy, and customization for organizations with specific requirements",cicd:"Various options: Jenkins, GitLab Runner, Drone CI, or custom solutions",projectManagement:"Flexible: Can integrate with any project management tool or build custom solutions",keyDifferentiator:"Full control over data, infrastructure, and customization possibilities",freeTier:"Depends on chosen solution (Gitea, GitLab CE, etc.) - often completely free",idealUser:"Organizations requiring data sovereignty, high customization, or operating in regulated industries",pricing:{free:"Open source options available",enterprise:"Infrastructure + support costs",custom:"Varies by solution"},features:{repositories:{free:"✓ Unlimited",paid:"✓ Unlimited"},cicd:{free:"Self-managed",paid:"Self-managed"},storage:{free:"Your hardware",paid:"Your hardware"},users:{free:"Unlimited*",paid:"Unlimited*"},support:{free:"Community",paid:"Vendor Support"},security:{free:"Self-managed",paid:"Self-managed"},analytics:{free:"Custom/None",paid:"Custom Solutions"}},examples:[{name:"Gitea",description:"Lightweight, easy-to-deploy Git service"},{name:"GitLab CE",description:"Community edition of GitLab for self-hosting"},{name:"Gogs",description:"Simple, stable Git service written in Go"},{name:"SourceHut",description:"Minimalist, email-driven development platform"}],pros:["Complete control over data and infrastructure","Customizable to specific organizational needs","No vendor lock-in","Potential cost savings at scale","Enhanced security and privacy","Compliance with strict regulations"],cons:["Requires technical expertise to maintain","Ongoing infrastructure and maintenance costs","Limited community and ecosystem","Responsibility for updates and security patches","May lack advanced features of cloud solutions"]}},this.comparisonFeatures=[{category:"Core",name:"Primary Focus",key:"primaryFocus"},{category:"DevOps",name:"CI/CD Capabilities",key:"cicd"},{category:"Management",name:"Project Management",key:"projectManagement"},{category:"Business",name:"Key Differentiator",key:"keyDifferentiator"},{category:"Pricing",name:"Free Tier",key:"freeTier"},{category:"Target",name:"Ideal User",key:"idealUser"}]}togglePlatform(e){this.selectedPlatforms.includes(e)?this.selectedPlatforms=this.selectedPlatforms.filter(t=>t!==e):this.selectedPlatforms=[...this.selectedPlatforms,e],this.requestUpdate()}setViewMode(e){this.viewMode=e,this.requestUpdate()}setFilterCategory(e){this.filterCategory=e,this.requestUpdate()}showPlatformDetails(e){this.detailPlatform=e,this.showDetails=!0,this.requestUpdate()}closeDetails(){this.showDetails=!1,this.requestUpdate()}getFilteredFeatures(){return this.filterCategory==="all"?this.comparisonFeatures:this.comparisonFeatures.filter(e=>e.category.toLowerCase()===this.filterCategory.toLowerCase())}renderGridView(){return i`
            <div class="comparison-grid">
                ${this.selectedPlatforms.map(e=>{const t=this.platforms[e];return i`
                        <div class="platform-card">
                            <div class="platform-card-header">
                                <i class="${t.icon} platform-icon" style="color: ${t.color};"></i>
                                <h3 class="platform-card-title">${t.name}</h3>
                            </div>
                            <div class="platform-features">
                                ${this.getFilteredFeatures().map(r=>i`
                                    <div class="feature-item">
                                        <div class="feature-label">${r.name}</div>
                                        <div class="feature-value">${t[r.key]}</div>
                                    </div>
                                `)}
                            </div>
                            <button class="btn-detail" @click="${()=>this.showPlatformDetails(e)}">
                                Ver Detalles
                            </button>
                        </div>
                    `})}
            </div>
        `}renderTableView(){return i`
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${this.selectedPlatforms.map(e=>i`
                                <th>${this.platforms[e].name}</th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${this.getFilteredFeatures().map(e=>i`
                            <tr>
                                <td><strong>${e.name}</strong></td>
                                ${this.selectedPlatforms.map(t=>i`
                                    <td>${this.platforms[t][e.key]}</td>
                                `)}
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        `}renderCardsView(){return i`
            <div class="comparison-cards">
                ${this.getFilteredFeatures().map(e=>i`
                    <div class="feature-comparison-card">
                        <div class="feature-comparison-header">${e.name}</div>
                        <div class="feature-platforms">
                            ${this.selectedPlatforms.map(t=>{const r=this.platforms[t];return i`
                                    <div class="feature-platform-item">
                                        <div class="feature-platform-name">
                                            <i class="${r.icon}" style="color: ${r.color};"></i>
                                            ${r.name}
                                        </div>
                                        <div class="feature-platform-value">
                                            ${r[e.key]}
                                        </div>
                                    </div>
                                `})}
                        </div>
                    </div>
                `)}
            </div>
        `}renderDetailsModal(){var t,r;if(!this.showDetails||!this.detailPlatform)return"";const e=this.platforms[this.detailPlatform];return i`
            <div class="details-overlay" @click="${this.closeDetails}">
                <div class="details-modal" @click="${a=>a.stopPropagation()}">
                    <button class="details-close" @click="${this.closeDetails}">×</button>
                    <div class="details-header">
                        <div class="details-title">
                            <i class="${e.icon}" style="color: ${e.color};"></i>
                            ${e.name}
                        </div>
                        <p>${e.primaryFocus}</p>
                        
                        <div class="pricing-grid">
                            ${Object.entries(e.pricing).map(([a,o])=>i`
                                <div class="pricing-item">
                                    <div class="pricing-label">${a}</div>
                                    <div class="pricing-value">${o}</div>
                                </div>
                            `)}
                        </div>
                    </div>
                    
                    <div class="details-sections">
                        <div class="details-section">
                            <h3 class="details-section-title">Ventajas</h3>
                            <ul class="details-list">
                                ${((t=e.pros)==null?void 0:t.map(a=>i`<li>${a}</li>`))||""}
                            </ul>
                        </div>
                        
                        <div class="details-section">
                            <h3 class="details-section-title">Desventajas</h3>
                            <ul class="details-list cons">
                                ${((r=e.cons)==null?void 0:r.map(a=>i`<li>${a}</li>`))||""}
                            </ul>
                        </div>
                        
                        ${e.examples?i`
                            <div class="details-section">
                                <h3 class="details-section-title">Opciones Populares</h3>
                                ${e.examples.map(a=>i`
                                    <div style="margin-bottom: var(--space-md);">
                                        <strong>${a.name}</strong>: ${a.description}
                                    </div>
                                `)}
                            </div>
                        `:""}
                        
                        <div class="details-section">
                            <h3 class="details-section-title">Características Detalladas</h3>
                            ${Object.entries(e.features).map(([a,o])=>i`
                                <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0;">
                                    <span style="text-transform: capitalize;">${a}:</span>
                                    <span>${o.paid}</span>
                                </div>
                            `)}
                        </div>
                    </div>
                </div>
            </div>
        `}render(){return i`
            <div class="comparison-container">
                <div class="controls">
                    <div class="control-group">
                        <label>Seleccionar Plataformas:</label>
                        <div class="platform-selector">
                            ${Object.entries(this.platforms).map(([e,t])=>i`
                                <div 
                                    class="platform-toggle ${this.selectedPlatforms.includes(e)?"active":""}"
                                    @click="${()=>this.togglePlatform(e)}"
                                >
                                    <i class="${t.icon}" style="color: ${this.selectedPlatforms.includes(e)?"currentColor":t.color};"></i>
                                    ${t.name}
                                </div>
                            `)}
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label>Vista:</label>
                        <div class="view-mode-selector">
                            <button 
                                class="view-mode-btn ${this.viewMode==="grid"?"active":""}"
                                @click="${()=>this.setViewMode("grid")}"
                            >
                                <i class="ph-squares-four"></i> Grid
                            </button>
                            <button 
                                class="view-mode-btn ${this.viewMode==="table"?"active":""}"
                                @click="${()=>this.setViewMode("table")}"
                            >
                                <i class="ph-table"></i> Tabla
                            </button>
                            <button 
                                class="view-mode-btn ${this.viewMode==="cards"?"active":""}"
                                @click="${()=>this.setViewMode("cards")}"
                            >
                                <i class="ph-cards"></i> Tarjetas
                            </button>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label>Filtrar por:</label>
                        <div class="filter-selector">
                            <select @change="${e=>this.setFilterCategory(e.target.value)}">
                                <option value="all">Todas las características</option>
                                <option value="core">Funcionalidades principales</option>
                                <option value="devops">DevOps y CI/CD</option>
                                <option value="management">Gestión de proyectos</option>
                                <option value="business">Aspectos comerciales</option>
                                <option value="pricing">Precios</option>
                                <option value="target">Público objetivo</option>
                            </select>
                        </div>
                    </div>
                </div>

                ${this.viewMode==="grid"?this.renderGridView():""}
                ${this.viewMode==="table"?this.renderTableView():""}
                ${this.viewMode==="cards"?this.renderCardsView():""}
                
                ${this.renderDetailsModal()}
            </div>
        `}}l(n,"properties",{selectedPlatforms:{type:Array},comparisonFeatures:{type:Array},filterCategory:{type:String},showDetails:{type:Boolean},detailPlatform:{type:String},viewMode:{type:String}}),l(n,"styles",m`
        :host {
            display: block;
        }

        .comparison-container {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
        }

        .controls {
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

        .platform-selector {
            display: flex;
            gap: var(--space-sm);
            flex-wrap: wrap;
        }

        .platform-toggle {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: var(--text-sm);
        }

        .platform-toggle:hover {
            border-color: var(--primary);
        }

        .platform-toggle.active {
            border-color: var(--primary);
            background: var(--primary);
            color: white;
        }

        .view-mode-selector {
            display: flex;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            overflow: hidden;
        }

        .view-mode-btn {
            background: none;
            border: none;
            padding: var(--space-sm) var(--space-md);
            cursor: pointer;
            font-size: var(--text-sm);
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }

        .view-mode-btn:hover {
            color: var(--text);
            background: var(--bg);
        }

        .view-mode-btn.active {
            background: var(--primary);
            color: white;
        }

        .filter-selector select {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            color: var(--text);
            font-size: var(--text-sm);
        }

        /* Grid View */
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--space-lg);
        }

        .platform-card {
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            transition: all 0.3s ease;
        }

        .platform-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }

        .platform-card-header {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-lg);
            padding-bottom: var(--space-md);
            border-bottom: 1px solid var(--border-color);
        }

        .platform-icon {
            font-size: 2rem;
        }

        .platform-card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin: 0;
        }

        .platform-features {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
        }

        .feature-item {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
        }

        .feature-label {
            font-size: var(--text-xs);
            font-weight: 600;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .feature-value {
            color: var(--text-secondary);
            line-height: 1.5;
            font-size: var(--text-sm);
        }

        /* Table View */
        .comparison-table {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: var(--card-bg);
            border-radius: var(--radius-lg);
            overflow: hidden;
        }

        th {
            background: var(--primary);
            color: white;
            padding: var(--space-md);
            text-align: left;
            font-weight: 600;
        }

        td {
            padding: var(--space-md);
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
            line-height: 1.5;
            font-size: var(--text-sm);
        }

        tr:hover {
            background: var(--bg);
        }

        /* Cards View */
        .comparison-cards {
            display: flex;
            flex-direction: column;
            gap: var(--space-xl);
        }

        .feature-comparison-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
        }

        .feature-comparison-header {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-lg);
            padding-bottom: var(--space-sm);
            border-bottom: 2px solid var(--primary);
        }

        .feature-platforms {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-md);
        }

        .feature-platform-item {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-md);
        }

        .feature-platform-name {
            font-weight: 600;
            color: var(--text);
            margin-bottom: var(--space-sm);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .feature-platform-value {
            color: var(--text-secondary);
            line-height: 1.5;
            font-size: var(--text-sm);
        }

        /* Details Modal */
        .details-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .details-modal {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            padding: var(--space-xl);
            max-width: 80vw;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }

        .details-close {
            position: absolute;
            top: var(--space-md);
            right: var(--space-md);
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
        }

        .details-header {
            margin-bottom: var(--space-xl);
        }

        .details-title {
            font-size: 2rem;
            color: var(--text);
            margin: 0 0 var(--space-md) 0;
            display: flex;
            align-items: center;
            gap: var(--space-md);
        }

        .details-sections {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
        }

        .details-section {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
        }

        .details-section-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary);
            margin: 0 0 var(--space-md) 0;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .details-list li {
            padding: var(--space-xs) 0;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        .details-list li::before {
            content: '✓';
            color: var(--success);
            font-weight: bold;
            margin-right: var(--space-sm);
        }

        .details-list.cons li::before {
            content: '⚠';
            color: #f59e0b;
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--space-md);
        }

        .pricing-item {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-md);
            text-align: center;
        }

        .pricing-label {
            font-size: var(--text-xs);
            color: var(--text-secondary);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: var(--space-xs);
        }

        .pricing-value {
            color: var(--text);
            font-weight: 600;
        }

        .btn-detail {
            background: var(--secondary);
            color: white;
            border: none;
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: var(--text-sm);
            margin-top: var(--space-md);
            transition: background 0.2s ease;
        }

        .btn-detail:hover {
            background: var(--secondary-dark);
        }

        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .platform-selector {
                justify-content: center;
            }
            
            .comparison-grid {
                grid-template-columns: 1fr;
            }
            
            .details-sections {
                grid-template-columns: 1fr;
            }
            
            .details-modal {
                max-width: 95vw;
                max-height: 95vh;
                padding: var(--space-lg);
            }
        }
    `);customElements.define("platform-comparison-tool",n);export{n as PlatformComparisonTool};
//# sourceMappingURL=platform-comparison-tool-DpNXxoAa.js.map
