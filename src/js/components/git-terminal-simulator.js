/**
 * Interactive Git Terminal Simulator Component
 * Provides a safe environment for practicing Git commands
 */
import { LitElement, html, css } from 'lit';

export class GitTerminalSimulator extends LitElement {
    static properties = {
        currentDirectory: { type: String },
        commandHistory: { type: Array },
        currentInput: { type: String },
        isProcessing: { type: Boolean },
        gitInitialized: { type: Boolean },
        files: { type: Array },
        stagedFiles: { type: Array },
        commits: { type: Array },
        currentBranch: { type: String },
        branches: { type: Array },
        suggestedCommands: { type: Array },
        tutorialMode: { type: Boolean },
        currentStep: { type: Number },
        showHelp: { type: Boolean }
    };

    constructor() {
        super();
        this.currentDirectory = '/my-project';
        this.commandHistory = [
            { command: 'Welcome to Git Terminal Simulator', output: 'Practice Git commands safely!', type: 'system' }
        ];
        this.currentInput = '';
        this.isProcessing = false;
        this.gitInitialized = false;
        this.files = [];
        this.stagedFiles = [];
        this.commits = [];
        this.currentBranch = 'main';
        this.branches = ['main'];
        this.suggestedCommands = this.getBasicCommands();
        this.tutorialMode = false;
        this.currentStep = 0;
        this.showHelp = false;

        this.tutorialSteps = [
            {
                instruction: 'Initialize a Git repository',
                command: 'git init',
                hint: 'This creates a new Git repository in the current directory'
            },
            {
                instruction: 'Create a file and add some content',
                command: 'echo "Hello World" > README.md',
                hint: 'This creates a new file called README.md'
            },
            {
                instruction: 'Check the repository status',
                command: 'git status',
                hint: 'This shows which files are tracked, modified, or staged'
            },
            {
                instruction: 'Add the file to staging area',
                command: 'git add README.md',
                hint: 'This stages the file for the next commit'
            },
            {
                instruction: 'Commit your changes',
                command: 'git commit -m "Initial commit"',
                hint: 'This saves your changes to the repository history'
            }
        ];
    }

    static styles = css`
        :host {
            display: block;
            font-family: var(--font-mono);
        }

        .terminal-container {
            background: #1e1e1e;
            color: #d4d4d4;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .terminal-header {
            background: #2d2d2d;
            padding: var(--space-md);
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            border-bottom: 1px solid #404040;
        }

        .terminal-button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .close { background: #ff5f57; }
        .minimize { background: #ffbd2e; }
        .maximize { background: #28ca42; }

        .terminal-title {
            margin-left: var(--space-md);
            font-size: var(--text-sm);
            color: #a0a0a0;
        }

        .terminal-body {
            height: 400px;
            overflow-y: auto;
            padding: var(--space-md);
        }

        .terminal-output {
            margin-bottom: var(--space-md);
        }

        .command-line {
            display: flex;
            margin-bottom: var(--space-xs);
            align-items: flex-start;
        }

        .prompt {
            color: #98c379;
            margin-right: var(--space-sm);
            font-weight: 600;
            flex-shrink: 0;
        }

        .command {
            color: #d4d4d4;
            word-break: break-all;
        }

        .output {
            margin-left: var(--space-lg);
            margin-bottom: var(--space-sm);
            white-space: pre-line;
        }

        .output.success {
            color: #98c379;
        }

        .output.error {
            color: #e06c75;
        }

        .output.system {
            color: #61afef;
        }

        .output.warning {
            color: #e5c07b;
        }

        .input-container {
            display: flex;
            align-items: center;
            border-top: 1px solid #404040;
            padding: var(--space-md);
            background: #252526;
        }

        .input-prompt {
            color: #98c379;
            margin-right: var(--space-sm);
            font-weight: 600;
        }

        .input-field {
            flex: 1;
            background: none;
            border: none;
            color: #d4d4d4;
            font-family: inherit;
            font-size: var(--text-sm);
            outline: none;
            caret-color: #d4d4d4;
        }

        .controls {
            padding: var(--space-md);
            background: var(--card-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: var(--space-md);
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
        }

        .btn:hover {
            background: var(--primary-dark);
        }

        .btn.secondary {
            background: var(--secondary);
        }

        .btn.secondary:hover {
            background: var(--secondary-dark);
        }

        .suggested-commands {
            display: flex;
            gap: var(--space-xs);
            flex-wrap: wrap;
            margin-top: var(--space-sm);
        }

        .command-suggestion {
            background: #404040;
            color: #d4d4d4;
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-sm);
            font-size: var(--text-xs);
            cursor: pointer;
            border: none;
            transition: background 0.2s;
        }

        .command-suggestion:hover {
            background: #505050;
        }

        .tutorial-panel {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-bottom: var(--space-md);
        }

        .tutorial-step {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
        }

        .step-number {
            background: var(--primary);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-sm);
            font-weight: 600;
        }

        .step-content h4 {
            margin: 0 0 var(--space-xs) 0;
            color: var(--text);
        }

        .step-content p {
            margin: 0;
            color: var(--text-secondary);
            font-size: var(--text-sm);
        }

        .help-panel {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin-top: var(--space-md);
        }

        .help-commands {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-md);
            margin-top: var(--space-md);
        }

        .help-item {
            background: var(--bg);
            padding: var(--space-md);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
        }

        .help-item code {
            background: var(--code-bg);
            color: var(--code-text);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-xs);
            font-size: var(--text-xs);
        }

        @media (max-width: 768px) {
            .terminal-body {
                height: 300px;
            }
            
            .controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .suggested-commands {
                justify-content: center;
            }
        }
    `;

    getBasicCommands() {
        return [
            'git init',
            'git status',
            'git add .',
            'git commit -m "message"',
            'git log',
            'git diff',
            'ls',
            'clear'
        ];
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !this.isProcessing) {
            this.executeCommand();
        }
    }

    handleInputChange(e) {
        this.currentInput = e.target.value;
    }

    executeCommand() {
        if (!this.currentInput.trim() || this.isProcessing) return;

        const command = this.currentInput.trim();
        this.isProcessing = true;

        // Add command to history
        this.commandHistory = [...this.commandHistory, {
            command,
            type: 'command',
            directory: this.currentDirectory
        }];

        // Process command
        setTimeout(() => {
            this.processCommand(command);
            this.currentInput = '';
            this.isProcessing = false;
            this.requestUpdate();
            
            // Scroll to bottom
            setTimeout(() => {
                const terminal = this.shadowRoot.querySelector('.terminal-body');
                terminal.scrollTop = terminal.scrollHeight;
            }, 100);
        }, 300);

        this.requestUpdate();
    }

    processCommand(command) {
        const parts = command.trim().split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        let output = '';
        let type = 'output';

        switch (cmd) {
            case 'git':
                ({ output, type } = this.processGitCommand(args));
                break;
            case 'ls':
                output = this.listFiles();
                break;
            case 'echo':
                output = this.echoCommand(args);
                break;
            case 'cat':
                output = this.catCommand(args);
                break;
            case 'clear':
                this.commandHistory = [];
                return;
            case 'help':
                this.showHelp = !this.showHelp;
                output = 'Available commands listed below.';
                break;
            case 'tutorial':
                this.toggleTutorial();
                output = this.tutorialMode ? 'Tutorial mode enabled' : 'Tutorial mode disabled';
                break;
            default:
                output = `Command not found: ${cmd}\nType 'help' for available commands.`;
                type = 'error';
        }

        if (output) {
            this.commandHistory = [...this.commandHistory, { output, type }];
        }

        // Update tutorial progress
        if (this.tutorialMode && this.currentStep < this.tutorialSteps.length) {
            const expectedCommand = this.tutorialSteps[this.currentStep].command;
            if (command === expectedCommand) {
                this.currentStep++;
                if (this.currentStep < this.tutorialSteps.length) {
                    this.commandHistory = [...this.commandHistory, {
                        output: `✅ Great! Step ${this.currentStep} completed.`,
                        type: 'success'
                    }];
                } else {
                    this.commandHistory = [...this.commandHistory, {
                        output: '🎉 Tutorial completed! You\'ve learned the basic Git workflow.',
                        type: 'success'
                    }];
                    this.tutorialMode = false;
                }
            }
        }
    }

    processGitCommand(args) {
        if (args.length === 0) {
            return {
                output: 'usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]\n           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]\n           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]\n           [--super-prefix=<path>] [--config-env=<name>=<envvar>]\n           <command> [<args>]',
                type: 'output'
            };
        }

        const subcommand = args[0];

        switch (subcommand) {
            case 'init':
                return this.gitInit();
            case 'status':
                return this.gitStatus();
            case 'add':
                return this.gitAdd(args.slice(1));
            case 'commit':
                return this.gitCommit(args.slice(1));
            case 'log':
                return this.gitLog();
            case 'diff':
                return this.gitDiff();
            case 'branch':
                return this.gitBranch(args.slice(1));
            case 'checkout':
                return this.gitCheckout(args.slice(1));
            case 'merge':
                return this.gitMerge(args.slice(1));
            default:
                return {
                    output: `git: '${subcommand}' is not a git command. See 'git --help'.`,
                    type: 'error'
                };
        }
    }

    gitInit() {
        if (this.gitInitialized) {
            return {
                output: 'Reinitialized existing Git repository in ' + this.currentDirectory + '/.git/',
                type: 'output'
            };
        }
        
        this.gitInitialized = true;
        return {
            output: 'Initialized empty Git repository in ' + this.currentDirectory + '/.git/',
            type: 'success'
        };
    }

    gitStatus() {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        let output = `On branch ${this.currentBranch}\n`;
        
        if (this.commits.length === 0) {
            output += '\nNo commits yet\n';
        }

        const unstagedFiles = this.files.filter(f => !this.stagedFiles.includes(f.name));
        const untrackedFiles = this.files.filter(f => !f.tracked);

        if (this.stagedFiles.length > 0) {
            output += '\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n';
            this.stagedFiles.forEach(file => {
                output += `\tnew file:   ${file}\n`;
            });
        }

        if (unstagedFiles.length > 0) {
            output += '\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git checkout -- <file>..." to discard changes)\n';
            unstagedFiles.forEach(file => {
                if (file.tracked) {
                    output += `\tmodified:   ${file.name}\n`;
                }
            });
        }

        if (untrackedFiles.length > 0) {
            output += '\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n';
            untrackedFiles.forEach(file => {
                output += `\t${file.name}\n`;
            });
        }

        if (this.stagedFiles.length === 0 && unstagedFiles.length === 0 && untrackedFiles.length === 0) {
            output += '\nnothing to commit, working tree clean';
        }

        return { output, type: 'output' };
    }

    gitAdd(args) {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (args.length === 0) {
            return {
                output: 'Nothing specified, nothing added.\nMaybe you wanted to say \'git add .\'?',
                type: 'error'
            };
        }

        const target = args[0];
        
        if (target === '.') {
            // Add all files
            this.files.forEach(file => {
                if (!this.stagedFiles.includes(file.name)) {
                    this.stagedFiles.push(file.name);
                }
                file.tracked = true;
            });
            return { output: '', type: 'success' };
        } else {
            // Add specific file
            const file = this.files.find(f => f.name === target);
            if (!file) {
                return {
                    output: `fatal: pathspec '${target}' did not match any files`,
                    type: 'error'
                };
            }
            
            if (!this.stagedFiles.includes(target)) {
                this.stagedFiles.push(target);
            }
            file.tracked = true;
            return { output: '', type: 'success' };
        }
    }

    gitCommit(args) {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (this.stagedFiles.length === 0) {
            return {
                output: 'On branch main\nnothing to commit, working tree clean',
                type: 'output'
            };
        }

        let message = 'Update files';
        
        // Parse -m flag
        const mIndex = args.indexOf('-m');
        if (mIndex !== -1 && args[mIndex + 1]) {
            message = args[mIndex + 1].replace(/['"]/g, '');
        }

        // Create commit
        const commit = {
            hash: this.generateCommitHash(),
            message,
            files: [...this.stagedFiles],
            timestamp: new Date().toISOString()
        };

        this.commits.push(commit);
        this.stagedFiles = [];

        return {
            output: `[${this.currentBranch} ${commit.hash.substring(0, 7)}] ${message}\n ${commit.files.length} file${commit.files.length > 1 ? 's' : ''} changed`,
            type: 'success'
        };
    }

    gitLog() {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (this.commits.length === 0) {
            return {
                output: 'fatal: your current branch \'main\' does not have any commits yet',
                type: 'error'
            };
        }

        let output = '';
        this.commits.slice().reverse().forEach((commit, index) => {
            if (index > 0) output += '\n';
            output += `commit ${commit.hash}\n`;
            output += `Date: ${new Date(commit.timestamp).toDateString()}\n\n`;
            output += `    ${commit.message}\n`;
        });

        return { output, type: 'output' };
    }

    gitDiff() {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        // Simple diff simulation
        const unstagedFiles = this.files.filter(f => f.tracked && !this.stagedFiles.includes(f.name));
        
        if (unstagedFiles.length === 0) {
            return { output: '', type: 'output' };
        }

        let output = '';
        unstagedFiles.forEach(file => {
            output += `diff --git a/${file.name} b/${file.name}\n`;
            output += `index 1234567..abcdefg 100644\n`;
            output += `--- a/${file.name}\n`;
            output += `+++ b/${file.name}\n`;
            output += `@@ -1,1 +1,2 @@\n`;
            output += ` ${file.content}\n`;
            output += `+Modified content\n`;
        });

        return { output, type: 'output' };
    }

    gitBranch(args) {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (args.length === 0) {
            let output = '';
            this.branches.forEach(branch => {
                output += (branch === this.currentBranch ? '* ' : '  ') + branch + '\n';
            });
            return { output, type: 'output' };
        }

        const branchName = args[0];
        if (!this.branches.includes(branchName)) {
            this.branches.push(branchName);
            return { output: '', type: 'success' };
        }

        return {
            output: `fatal: A branch named '${branchName}' already exists.`,
            type: 'error'
        };
    }

    gitCheckout(args) {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (args.length === 0) {
            return {
                output: 'You are on branch \'' + this.currentBranch + '\'',
                type: 'output'
            };
        }

        if (args[0] === '-b' && args[1]) {
            const branchName = args[1];
            if (!this.branches.includes(branchName)) {
                this.branches.push(branchName);
                this.currentBranch = branchName;
                return {
                    output: `Switched to a new branch '${branchName}'`,
                    type: 'success'
                };
            }
            return {
                output: `fatal: A branch named '${branchName}' already exists.`,
                type: 'error'
            };
        }

        const branchName = args[0];
        if (this.branches.includes(branchName)) {
            this.currentBranch = branchName;
            return {
                output: `Switched to branch '${branchName}'`,
                type: 'success'
            };
        }

        return {
            output: `error: pathspec '${branchName}' did not match any file(s) known to git`,
            type: 'error'
        };
    }

    gitMerge(args) {
        if (!this.gitInitialized) {
            return {
                output: 'fatal: not a git repository (or any of the parent directories): .git',
                type: 'error'
            };
        }

        if (args.length === 0) {
            return {
                output: 'fatal: No merge head specified.',
                type: 'error'
            };
        }

        const branchName = args[0];
        if (!this.branches.includes(branchName)) {
            return {
                output: `fatal: '${branchName}' - not something we can merge`,
                type: 'error'
            };
        }

        if (branchName === this.currentBranch) {
            return {
                output: `Already on '${branchName}'`,
                type: 'output'
            };
        }

        return {
            output: `Merge made by the 'recursive' strategy.\nFast-forward`,
            type: 'success'
        };
    }

    listFiles() {
        if (this.files.length === 0) {
            return '';
        }
        return this.files.map(f => f.name).join('\n');
    }

    echoCommand(args) {
        const text = args.join(' ');
        
        // Handle file creation with >
        if (text.includes(' > ')) {
            const [content, filename] = text.split(' > ');
            const cleanContent = content.replace(/['"]/g, '');
            const cleanFilename = filename.trim();
            
            // Add or update file
            const existingFile = this.files.find(f => f.name === cleanFilename);
            if (existingFile) {
                existingFile.content = cleanContent;
            } else {
                this.files.push({
                    name: cleanFilename,
                    content: cleanContent,
                    tracked: false
                });
            }
            
            return '';
        }
        
        return text.replace(/['"]/g, '');
    }

    catCommand(args) {
        if (args.length === 0) {
            return 'cat: missing file operand';
        }

        const filename = args[0];
        const file = this.files.find(f => f.name === filename);
        
        if (!file) {
            return `cat: ${filename}: No such file or directory`;
        }
        
        return file.content;
    }

    generateCommitHash() {
        return Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    clearTerminal() {
        this.commandHistory = [];
        this.requestUpdate();
    }

    toggleTutorial() {
        this.tutorialMode = !this.tutorialMode;
        this.currentStep = 0;
    }

    useCommand(command) {
        this.currentInput = command;
        const input = this.shadowRoot.querySelector('.input-field');
        input.focus();
    }

    render() {
        return html`
            ${this.tutorialMode ? html`
                <div class="tutorial-panel">
                    <h3>📚 Git Tutorial Mode</h3>
                    ${this.currentStep < this.tutorialSteps.length ? html`
                        <div class="tutorial-step">
                            <div class="step-number">${this.currentStep + 1}</div>
                            <div class="step-content">
                                <h4>${this.tutorialSteps[this.currentStep].instruction}</h4>
                                <p>Try: <code>${this.tutorialSteps[this.currentStep].command}</code></p>
                                <p><em>${this.tutorialSteps[this.currentStep].hint}</em></p>
                            </div>
                        </div>
                    ` : html`
                        <div class="tutorial-step">
                            <div class="step-number">✅</div>
                            <div class="step-content">
                                <h4>Tutorial Completed!</h4>
                                <p>You've mastered the basic Git workflow. Practice more commands!</p>
                            </div>
                        </div>
                    `}
                </div>
            ` : ''}

            <div class="terminal-container">
                <div class="terminal-header">
                    <div class="terminal-button close"></div>
                    <div class="terminal-button minimize"></div>
                    <div class="terminal-button maximize"></div>
                    <div class="terminal-title">Git Terminal Simulator</div>
                </div>
                
                <div class="terminal-body">
                    ${this.commandHistory.map(entry => html`
                        <div class="terminal-output">
                            ${entry.command ? html`
                                <div class="command-line">
                                    <span class="prompt">${entry.directory || this.currentDirectory}$</span>
                                    <span class="command">${entry.command}</span>
                                </div>
                            ` : ''}
                            ${entry.output ? html`
                                <div class="output ${entry.type || 'output'}">${entry.output}</div>
                            ` : ''}
                        </div>
                    `)}
                </div>

                <div class="input-container">
                    <span class="input-prompt">${this.currentDirectory}$</span>
                    <input 
                        class="input-field" 
                        .value="${this.currentInput}"
                        @input="${this.handleInputChange}"
                        @keypress="${this.handleKeyPress}"
                        ?disabled="${this.isProcessing}"
                        placeholder="Type a command..."
                        autocomplete="off"
                    />
                </div>
            </div>

            <div class="controls">
                <button class="btn" @click="${this.executeCommand}" ?disabled="${this.isProcessing}">
                    Execute
                </button>
                <button class="btn secondary" @click="${this.clearTerminal}">
                    Clear
                </button>
                <button class="btn secondary" @click="${this.toggleTutorial}">
                    ${this.tutorialMode ? 'Exit Tutorial' : 'Start Tutorial'}
                </button>
                <button class="btn secondary" @click="${() => this.showHelp = !this.showHelp}">
                    ${this.showHelp ? 'Hide Help' : 'Show Help'}
                </button>
            </div>

            <div class="suggested-commands">
                ${this.suggestedCommands.map(cmd => html`
                    <button class="command-suggestion" @click="${() => this.useCommand(cmd)}">
                        ${cmd}
                    </button>
                `)}
            </div>

            ${this.showHelp ? html`
                <div class="help-panel">
                    <h3>Available Commands</h3>
                    <div class="help-commands">
                        <div class="help-item">
                            <code>git init</code>
                            <p>Initialize a Git repository</p>
                        </div>
                        <div class="help-item">
                            <code>git status</code>
                            <p>Show repository status</p>
                        </div>
                        <div class="help-item">
                            <code>git add [file]</code>
                            <p>Stage files for commit</p>
                        </div>
                        <div class="help-item">
                            <code>git commit -m "msg"</code>
                            <p>Create a commit</p>
                        </div>
                        <div class="help-item">
                            <code>git log</code>
                            <p>View commit history</p>
                        </div>
                        <div class="help-item">
                            <code>git branch [name]</code>
                            <p>List or create branches</p>
                        </div>
                        <div class="help-item">
                            <code>echo "text" > file</code>
                            <p>Create a file with content</p>
                        </div>
                        <div class="help-item">
                            <code>ls</code>
                            <p>List files in directory</p>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    }
}

customElements.define('git-terminal-simulator', GitTerminalSimulator);