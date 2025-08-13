/**
 * Interactive Git Branch Visualizer Component
 * Demonstrates branching, merging, and collaborative workflows
 */
import { LitElement, html, css } from 'lit';

export class GitBranchVisualizer extends LitElement {
    static properties = {
        commits: { type: Array },
        branches: { type: Array },
        currentBranch: { type: String },
        isAnimating: { type: Boolean },
        selectedCommit: { type: String },
        workflowMode: { type: String },
        showMergeStrategies: { type: Boolean },
        autoPlayMode: { type: Boolean },
        animationSpeed: { type: Number }
    };

    constructor() {
        super();
        this.commits = [];
        this.branches = [
            { name: 'main', color: '#2563eb', head: null, commits: [] }
        ];
        this.currentBranch = 'main';
        this.isAnimating = false;
        this.selectedCommit = null;
        this.workflowMode = 'basic'; // 'basic', 'feature', 'collaboration'
        this.showMergeStrategies = false;
        this.autoPlayMode = false;
        this.animationSpeed = 1000;

        this.workflows = {
            basic: [
                { action: 'commit', branch: 'main', message: 'Initial commit', id: 'c1' },
                { action: 'commit', branch: 'main', message: 'Add README', id: 'c2' },
                { action: 'commit', branch: 'main', message: 'Setup project', id: 'c3' }
            ],
            feature: [
                { action: 'commit', branch: 'main', message: 'Initial commit', id: 'c1' },
                { action: 'commit', branch: 'main', message: 'Add basic structure', id: 'c2' },
                { action: 'branch', name: 'feature/login', from: 'main' },
                { action: 'checkout', branch: 'feature/login' },
                { action: 'commit', branch: 'feature/login', message: 'Add login form', id: 'c3' },
                { action: 'commit', branch: 'feature/login', message: 'Add validation', id: 'c4' },
                { action: 'checkout', branch: 'main' },
                { action: 'commit', branch: 'main', message: 'Update docs', id: 'c5' },
                { action: 'merge', from: 'feature/login', to: 'main', message: 'Merge login feature', id: 'c6' }
            ],
            collaboration: [
                { action: 'commit', branch: 'main', message: 'Initial project', id: 'c1' },
                { action: 'branch', name: 'feature/header', from: 'main' },
                { action: 'branch', name: 'feature/footer', from: 'main' },
                { action: 'checkout', branch: 'feature/header' },
                { action: 'commit', branch: 'feature/header', message: 'Add header component', id: 'c2' },
                { action: 'checkout', branch: 'feature/footer' },
                { action: 'commit', branch: 'feature/footer', message: 'Add footer component', id: 'c3' },
                { action: 'checkout', branch: 'main' },
                { action: 'merge', from: 'feature/header', to: 'main', message: 'Merge header', id: 'c4' },
                { action: 'merge', from: 'feature/footer', to: 'main', message: 'Merge footer', id: 'c5' }
            ]
        };
    }

    static styles = css`
        :host {
            display: block;
        }

        .visualizer-container {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
        }

        .controls {
            display: flex;
            gap: var(--space-md);
            margin-bottom: var(--space-xl);
            flex-wrap: wrap;
            align-items: center;
        }

        .btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: var(--space-sm) var(--space-md);
            border-radius: var(--radius-sm);
            font-size: var(--text-sm);
            cursor: pointer;
            transition: background 0.2s;
            position: relative;
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

        .workflow-selector {
            margin-right: var(--space-md);
        }

        select {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            color: var(--text);
            font-size: var(--text-sm);
        }

        .speed-control {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .speed-slider {
            width: 100px;
        }

        .visualization-area {
            min-height: 400px;
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            position: relative;
            overflow: auto;
        }

        .branch-container {
            margin-bottom: var(--space-xl);
            position: relative;
        }

        .branch-header {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-lg);
        }

        .branch-name {
            font-family: var(--font-mono);
            font-weight: 600;
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-sm);
            color: white;
            font-size: var(--text-sm);
        }

        .branch-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .current-branch .branch-name {
            box-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
        }

        .commit-line {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            margin-bottom: var(--space-md);
            position: relative;
        }

        .commit-line::before {
            content: '';
            position: absolute;
            left: 16px;
            top: 32px;
            width: 2px;
            height: calc(100% + var(--space-md));
            z-index: 1;
        }

        .commit-line:last-child::before {
            display: none;
        }

        .commit {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-xs);
            font-weight: 600;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
            position: relative;
            border: 3px solid transparent;
        }

        .commit:hover {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .commit.selected {
            border-color: var(--accent);
            box-shadow: 0 0 12px var(--accent);
        }

        .commit.animating {
            animation: pulse 0.6s ease-in-out;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }

        .commit-message {
            flex: 1;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            font-size: var(--text-sm);
            transition: all 0.2s ease;
        }

        .commit-message:hover {
            border-color: var(--primary);
        }

        .commit-hash {
            font-family: var(--font-mono);
            color: var(--text-secondary);
            font-size: var(--text-xs);
            margin-left: var(--space-sm);
        }

        .merge-line {
            position: absolute;
            stroke: var(--accent);
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 5, 5;
            opacity: 0.7;
        }

        .merge-commit {
            position: relative;
        }

        .merge-commit::after {
            content: '⚡';
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: var(--text-lg);
            color: var(--accent);
        }

        .commit-details {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-top: var(--space-lg);
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-md);
        }

        .detail-item {
            display: flex;
            flex-direction: column;
            gap: var(--space-xs);
        }

        .detail-label {
            font-size: var(--text-xs);
            color: var(--text-secondary);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .detail-value {
            font-family: var(--font-mono);
            color: var(--text);
            font-size: var(--text-sm);
        }

        .strategy-explanation {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(168, 85, 247, 0.1));
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-top: var(--space-lg);
        }

        .strategy-tabs {
            display: flex;
            gap: var(--space-sm);
            margin-bottom: var(--space-lg);
        }

        .strategy-tab {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-sm) var(--space-md);
            cursor: pointer;
            font-size: var(--text-sm);
            transition: all 0.2s ease;
        }

        .strategy-tab.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .strategy-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-lg);
        }

        .strategy-visual {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            padding: var(--space-md);
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            line-height: 1.6;
        }

        .legend {
            display: flex;
            gap: var(--space-lg);
            margin-top: var(--space-lg);
            padding: var(--space-md);
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            font-size: var(--text-sm);
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
        }

        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }

        .progress-indicator {
            position: absolute;
            top: var(--space-md);
            right: var(--space-md);
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-full);
            padding: var(--space-sm) var(--space-md);
            font-size: var(--text-sm);
            color: var(--text-secondary);
        }

        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .strategy-content {
                grid-template-columns: 1fr;
            }
            
            .legend {
                flex-direction: column;
                gap: var(--space-sm);
            }
        }
    `;

    firstUpdated() {
        this.resetVisualization();
    }

    resetVisualization() {
        this.commits = [];
        this.branches = [
            { name: 'main', color: '#2563eb', head: null, commits: [] }
        ];
        this.currentBranch = 'main';
        this.selectedCommit = null;
        this.requestUpdate();
    }

    async executeWorkflow() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.resetVisualization();
        
        const workflow = this.workflows[this.workflowMode];
        
        for (let i = 0; i < workflow.length; i++) {
            const step = workflow[i];
            await this.executeStep(step);
            await this.delay(this.animationSpeed);
        }
        
        this.isAnimating = false;
    }

    async executeStep(step) {
        switch (step.action) {
            case 'commit':
                this.createCommit(step);
                break;
            case 'branch':
                this.createBranch(step);
                break;
            case 'checkout':
                this.switchBranch(step);
                break;
            case 'merge':
                this.mergeBranches(step);
                break;
        }
        this.requestUpdate();
    }

    createCommit(step) {
        const commit = {
            id: step.id,
            message: step.message,
            branch: step.branch,
            hash: this.generateHash(),
            timestamp: Date.now(),
            parents: this.getParents(step.branch)
        };

        this.commits.push(commit);
        
        const branch = this.branches.find(b => b.name === step.branch);
        if (branch) {
            branch.commits.push(commit.id);
            branch.head = commit.id;
        }
    }

    createBranch(step) {
        const fromBranch = this.branches.find(b => b.name === step.from);
        const newBranch = {
            name: step.name,
            color: this.getBranchColor(step.name),
            head: fromBranch ? fromBranch.head : null,
            commits: fromBranch ? [...fromBranch.commits] : []
        };
        
        this.branches.push(newBranch);
    }

    switchBranch(step) {
        this.currentBranch = step.branch;
    }

    mergeBranches(step) {
        const mergeCommit = {
            id: step.id,
            message: step.message,
            branch: step.to,
            hash: this.generateHash(),
            timestamp: Date.now(),
            parents: this.getMergeParents(step.from, step.to),
            isMerge: true
        };

        this.commits.push(mergeCommit);
        
        const targetBranch = this.branches.find(b => b.name === step.to);
        const sourceBranch = this.branches.find(b => b.name === step.from);
        
        if (targetBranch && sourceBranch) {
            // Merge commits from source branch
            sourceBranch.commits.forEach(commitId => {
                if (!targetBranch.commits.includes(commitId)) {
                    targetBranch.commits.push(commitId);
                }
            });
            targetBranch.commits.push(mergeCommit.id);
            targetBranch.head = mergeCommit.id;
        }
    }

    getParents(branchName) {
        const branch = this.branches.find(b => b.name === branchName);
        return branch && branch.head ? [branch.head] : [];
    }

    getMergeParents(fromBranch, toBranch) {
        const fromBranchObj = this.branches.find(b => b.name === fromBranch);
        const toBranchObj = this.branches.find(b => b.name === toBranch);
        
        const parents = [];
        if (toBranchObj && toBranchObj.head) parents.push(toBranchObj.head);
        if (fromBranchObj && fromBranchObj.head) parents.push(fromBranchObj.head);
        
        return parents;
    }

    getBranchColor(branchName) {
        const colors = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
        const index = branchName.length % colors.length;
        return colors[index];
    }

    generateHash() {
        return Math.random().toString(36).substr(2, 7);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    selectCommit(commitId) {
        this.selectedCommit = commitId;
        this.requestUpdate();
    }

    handleWorkflowChange(e) {
        this.workflowMode = e.target.value;
        this.resetVisualization();
    }

    handleSpeedChange(e) {
        this.animationSpeed = parseInt(e.target.value);
    }

    toggleMergeStrategies() {
        this.showMergeStrategies = !this.showMergeStrategies;
    }

    getBranchCommits(branch) {
        return this.commits.filter(commit => 
            branch.commits.includes(commit.id)
        ).sort((a, b) => a.timestamp - b.timestamp);
    }

    render() {
        const selectedCommitData = this.selectedCommit ? 
            this.commits.find(c => c.id === this.selectedCommit) : null;

        return html`
            <div class="visualizer-container">
                <div class="controls">
                    <div class="workflow-selector">
                        <label for="workflow">Workflow:</label>
                        <select id="workflow" @change="${this.handleWorkflowChange}" .value="${this.workflowMode}">
                            <option value="basic">Basic Linear</option>
                            <option value="feature">Feature Branch</option>
                            <option value="collaboration">Collaboration</option>
                        </select>
                    </div>
                    
                    <button class="btn" @click="${this.executeWorkflow}" ?disabled="${this.isAnimating}">
                        ${this.isAnimating ? 'Animating...' : 'Start Animation'}
                    </button>
                    
                    <button class="btn secondary" @click="${this.resetVisualization}">
                        Reset
                    </button>
                    
                    <button class="btn secondary" @click="${this.toggleMergeStrategies}">
                        ${this.showMergeStrategies ? 'Hide' : 'Show'} Merge Strategies
                    </button>

                    <div class="speed-control">
                        <label>Speed:</label>
                        <input 
                            type="range" 
                            min="200" 
                            max="2000" 
                            step="200"
                            .value="${this.animationSpeed}"
                            @input="${this.handleSpeedChange}"
                            class="speed-slider"
                        />
                        <span>${this.animationSpeed}ms</span>
                    </div>
                </div>

                <div class="visualization-area">
                    ${this.isAnimating ? html`
                        <div class="progress-indicator">
                            Animating workflow...
                        </div>
                    ` : ''}

                    ${this.branches.map(branch => {
                        const branchCommits = this.getBranchCommits(branch);
                        return html`
                            <div class="branch-container ${branch.name === this.currentBranch ? 'current-branch' : ''}">
                                <div class="branch-header">
                                    <div class="branch-indicator" style="background: ${branch.color}"></div>
                                    <div class="branch-name" style="background: ${branch.color}">
                                        ${branch.name}
                                        ${branch.name === this.currentBranch ? ' (current)' : ''}
                                    </div>
                                </div>
                                
                                ${branchCommits.map((commit, index) => html`
                                    <div class="commit-line">
                                        <div 
                                            class="commit ${this.selectedCommit === commit.id ? 'selected' : ''} ${this.isAnimating ? 'animating' : ''}"
                                            style="background: ${branch.color}; border-color: ${branch.color}"
                                            @click="${() => this.selectCommit(commit.id)}"
                                        >
                                            ${index + 1}
                                        </div>
                                        <div class="commit-message ${commit.isMerge ? 'merge-commit' : ''}">
                                            ${commit.message}
                                            <span class="commit-hash">${commit.hash}</span>
                                        </div>
                                    </div>
                                `)}
                            </div>
                            <style>
                                .branch-container:nth-child(${this.branches.indexOf(branch) + 1}) .commit-line::before {
                                    background: ${branch.color};
                                }
                            </style>
                        `;
                    })}
                </div>

                ${selectedCommitData ? html`
                    <div class="commit-details">
                        <h3>Commit Details</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">Hash</span>
                                <span class="detail-value">${selectedCommitData.hash}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Message</span>
                                <span class="detail-value">${selectedCommitData.message}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Branch</span>
                                <span class="detail-value">${selectedCommitData.branch}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Type</span>
                                <span class="detail-value">${selectedCommitData.isMerge ? 'Merge Commit' : 'Regular Commit'}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Parents</span>
                                <span class="detail-value">${selectedCommitData.parents.length} parent(s)</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${this.showMergeStrategies ? html`
                    <div class="strategy-explanation">
                        <h3>Merge Strategies</h3>
                        <div class="strategy-content">
                            <div>
                                <h4>Fast-Forward Merge</h4>
                                <div class="strategy-visual">
Before:
A ← B ← C (main)
    ↖
      D ← E (feature)

After:
A ← B ← C ← D ← E (main)
                </div>
                                <p>When the main branch hasn't diverged, Git simply moves the pointer forward.</p>
                            </div>
                            <div>
                                <h4>3-Way Merge</h4>
                                <div class="strategy-visual">
Before:
A ← B ← C ← F (main)
    ↖
      D ← E (feature)

After:
A ← B ← C ← F ← M (main)
    ↖     ↙
      D ← E
                </div>
                                <p>When both branches have new commits, Git creates a merge commit.</p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: #2563eb;"></div>
                        <span>Main branch</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #10b981;"></div>
                        <span>Feature branches</span>
                    </div>
                    <div class="legend-item">
                        <span>⚡</span>
                        <span>Merge commit</span>
                    </div>
                    <div class="legend-item">
                        <span>Click commits for details</span>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('git-branch-visualizer', GitBranchVisualizer);