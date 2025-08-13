var p=Object.defineProperty;var m=(o,t,e)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>m(o,typeof t!="symbol"?t+"":t,e);import{a as h,i as g,x as a}from"./index-DO_oek1i.js";class l extends h{constructor(){super(),this.currentDirectory="/my-project",this.commandHistory=[{command:"Welcome to Git Terminal Simulator",output:"Practice Git commands safely!",type:"system"}],this.currentInput="",this.isProcessing=!1,this.gitInitialized=!1,this.files=[],this.stagedFiles=[],this.commits=[],this.currentBranch="main",this.branches=["main"],this.suggestedCommands=this.getBasicCommands(),this.tutorialMode=!1,this.currentStep=0,this.showHelp=!1,this.tutorialSteps=[{instruction:"Initialize a Git repository",command:"git init",hint:"This creates a new Git repository in the current directory"},{instruction:"Create a file and add some content",command:'echo "Hello World" > README.md',hint:"This creates a new file called README.md"},{instruction:"Check the repository status",command:"git status",hint:"This shows which files are tracked, modified, or staged"},{instruction:"Add the file to staging area",command:"git add README.md",hint:"This stages the file for the next commit"},{instruction:"Commit your changes",command:'git commit -m "Initial commit"',hint:"This saves your changes to the repository history"}]}getBasicCommands(){return["git init","git status","git add .",'git commit -m "message"',"git log","git diff","ls","clear"]}handleKeyPress(t){t.key==="Enter"&&!this.isProcessing&&this.executeCommand()}handleInputChange(t){this.currentInput=t.target.value}executeCommand(){if(!this.currentInput.trim()||this.isProcessing)return;const t=this.currentInput.trim();this.isProcessing=!0,this.commandHistory=[...this.commandHistory,{command:t,type:"command",directory:this.currentDirectory}],setTimeout(()=>{this.processCommand(t),this.currentInput="",this.isProcessing=!1,this.requestUpdate(),setTimeout(()=>{const e=this.shadowRoot.querySelector(".terminal-body");e.scrollTop=e.scrollHeight},100)},300),this.requestUpdate()}processCommand(t){const e=t.trim().split(" "),i=e[0],r=e.slice(1);let s="",n="output";switch(i){case"git":({output:s,type:n}=this.processGitCommand(r));break;case"ls":s=this.listFiles();break;case"echo":s=this.echoCommand(r);break;case"cat":s=this.catCommand(r);break;case"clear":this.commandHistory=[];return;case"help":this.showHelp=!this.showHelp,s="Available commands listed below.";break;case"tutorial":this.toggleTutorial(),s=this.tutorialMode?"Tutorial mode enabled":"Tutorial mode disabled";break;default:s=`Command not found: ${i}
Type 'help' for available commands.`,n="error"}if(s&&(this.commandHistory=[...this.commandHistory,{output:s,type:n}]),this.tutorialMode&&this.currentStep<this.tutorialSteps.length){const c=this.tutorialSteps[this.currentStep].command;t===c&&(this.currentStep++,this.currentStep<this.tutorialSteps.length?this.commandHistory=[...this.commandHistory,{output:`✅ Great! Step ${this.currentStep} completed.`,type:"success"}]:(this.commandHistory=[...this.commandHistory,{output:"🎉 Tutorial completed! You've learned the basic Git workflow.",type:"success"}],this.tutorialMode=!1))}}processGitCommand(t){if(t.length===0)return{output:`usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]`,type:"output"};const e=t[0];switch(e){case"init":return this.gitInit();case"status":return this.gitStatus();case"add":return this.gitAdd(t.slice(1));case"commit":return this.gitCommit(t.slice(1));case"log":return this.gitLog();case"diff":return this.gitDiff();case"branch":return this.gitBranch(t.slice(1));case"checkout":return this.gitCheckout(t.slice(1));case"merge":return this.gitMerge(t.slice(1));default:return{output:`git: '${e}' is not a git command. See 'git --help'.`,type:"error"}}}gitInit(){return this.gitInitialized?{output:"Reinitialized existing Git repository in "+this.currentDirectory+"/.git/",type:"output"}:(this.gitInitialized=!0,{output:"Initialized empty Git repository in "+this.currentDirectory+"/.git/",type:"success"})}gitStatus(){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};let t=`On branch ${this.currentBranch}
`;this.commits.length===0&&(t+=`
No commits yet
`);const e=this.files.filter(r=>!this.stagedFiles.includes(r.name)),i=this.files.filter(r=>!r.tracked);return this.stagedFiles.length>0&&(t+=`
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
`,this.stagedFiles.forEach(r=>{t+=`	new file:   ${r}
`})),e.length>0&&(t+=`
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes)
`,e.forEach(r=>{r.tracked&&(t+=`	modified:   ${r.name}
`)})),i.length>0&&(t+=`
Untracked files:
  (use "git add <file>..." to include in what will be committed)
`,i.forEach(r=>{t+=`	${r.name}
`})),this.stagedFiles.length===0&&e.length===0&&i.length===0&&(t+=`
nothing to commit, working tree clean`),{output:t,type:"output"}}gitAdd(t){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(t.length===0)return{output:`Nothing specified, nothing added.
Maybe you wanted to say 'git add .'?`,type:"error"};const e=t[0];if(e===".")return this.files.forEach(i=>{this.stagedFiles.includes(i.name)||this.stagedFiles.push(i.name),i.tracked=!0}),{output:"",type:"success"};{const i=this.files.find(r=>r.name===e);return i?(this.stagedFiles.includes(e)||this.stagedFiles.push(e),i.tracked=!0,{output:"",type:"success"}):{output:`fatal: pathspec '${e}' did not match any files`,type:"error"}}}gitCommit(t){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(this.stagedFiles.length===0)return{output:`On branch main
nothing to commit, working tree clean`,type:"output"};let e="Update files";const i=t.indexOf("-m");i!==-1&&t[i+1]&&(e=t[i+1].replace(/['"]/g,""));const r={hash:this.generateCommitHash(),message:e,files:[...this.stagedFiles],timestamp:new Date().toISOString()};return this.commits.push(r),this.stagedFiles=[],{output:`[${this.currentBranch} ${r.hash.substring(0,7)}] ${e}
 ${r.files.length} file${r.files.length>1?"s":""} changed`,type:"success"}}gitLog(){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(this.commits.length===0)return{output:"fatal: your current branch 'main' does not have any commits yet",type:"error"};let t="";return this.commits.slice().reverse().forEach((e,i)=>{i>0&&(t+=`
`),t+=`commit ${e.hash}
`,t+=`Date: ${new Date(e.timestamp).toDateString()}

`,t+=`    ${e.message}
`}),{output:t,type:"output"}}gitDiff(){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};const t=this.files.filter(i=>i.tracked&&!this.stagedFiles.includes(i.name));if(t.length===0)return{output:"",type:"output"};let e="";return t.forEach(i=>{e+=`diff --git a/${i.name} b/${i.name}
`,e+=`index 1234567..abcdefg 100644
`,e+=`--- a/${i.name}
`,e+=`+++ b/${i.name}
`,e+=`@@ -1,1 +1,2 @@
`,e+=` ${i.content}
`,e+=`+Modified content
`}),{output:e,type:"output"}}gitBranch(t){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(t.length===0){let i="";return this.branches.forEach(r=>{i+=(r===this.currentBranch?"* ":"  ")+r+`
`}),{output:i,type:"output"}}const e=t[0];return this.branches.includes(e)?{output:`fatal: A branch named '${e}' already exists.`,type:"error"}:(this.branches.push(e),{output:"",type:"success"})}gitCheckout(t){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(t.length===0)return{output:"You are on branch '"+this.currentBranch+"'",type:"output"};if(t[0]==="-b"&&t[1]){const i=t[1];return this.branches.includes(i)?{output:`fatal: A branch named '${i}' already exists.`,type:"error"}:(this.branches.push(i),this.currentBranch=i,{output:`Switched to a new branch '${i}'`,type:"success"})}const e=t[0];return this.branches.includes(e)?(this.currentBranch=e,{output:`Switched to branch '${e}'`,type:"success"}):{output:`error: pathspec '${e}' did not match any file(s) known to git`,type:"error"}}gitMerge(t){if(!this.gitInitialized)return{output:"fatal: not a git repository (or any of the parent directories): .git",type:"error"};if(t.length===0)return{output:"fatal: No merge head specified.",type:"error"};const e=t[0];return this.branches.includes(e)?e===this.currentBranch?{output:`Already on '${e}'`,type:"output"}:{output:`Merge made by the 'recursive' strategy.
Fast-forward`,type:"success"}:{output:`fatal: '${e}' - not something we can merge`,type:"error"}}listFiles(){return this.files.length===0?"":this.files.map(t=>t.name).join(`
`)}echoCommand(t){const e=t.join(" ");if(e.includes(" > ")){const[i,r]=e.split(" > "),s=i.replace(/['"]/g,""),n=r.trim(),c=this.files.find(u=>u.name===n);return c?c.content=s:this.files.push({name:n,content:s,tracked:!1}),""}return e.replace(/['"]/g,"")}catCommand(t){if(t.length===0)return"cat: missing file operand";const e=t[0],i=this.files.find(r=>r.name===e);return i?i.content:`cat: ${e}: No such file or directory`}generateCommitHash(){return Array.from({length:40},()=>Math.floor(Math.random()*16).toString(16)).join("")}clearTerminal(){this.commandHistory=[],this.requestUpdate()}toggleTutorial(){this.tutorialMode=!this.tutorialMode,this.currentStep=0}useCommand(t){this.currentInput=t,this.shadowRoot.querySelector(".input-field").focus()}render(){return a`
            ${this.tutorialMode?a`
                <div class="tutorial-panel">
                    <h3>📚 Git Tutorial Mode</h3>
                    ${this.currentStep<this.tutorialSteps.length?a`
                        <div class="tutorial-step">
                            <div class="step-number">${this.currentStep+1}</div>
                            <div class="step-content">
                                <h4>${this.tutorialSteps[this.currentStep].instruction}</h4>
                                <p>Try: <code>${this.tutorialSteps[this.currentStep].command}</code></p>
                                <p><em>${this.tutorialSteps[this.currentStep].hint}</em></p>
                            </div>
                        </div>
                    `:a`
                        <div class="tutorial-step">
                            <div class="step-number">✅</div>
                            <div class="step-content">
                                <h4>Tutorial Completed!</h4>
                                <p>You've mastered the basic Git workflow. Practice more commands!</p>
                            </div>
                        </div>
                    `}
                </div>
            `:""}

            <div class="terminal-container">
                <div class="terminal-header">
                    <div class="terminal-button close"></div>
                    <div class="terminal-button minimize"></div>
                    <div class="terminal-button maximize"></div>
                    <div class="terminal-title">Git Terminal Simulator</div>
                </div>
                
                <div class="terminal-body">
                    ${this.commandHistory.map(t=>a`
                        <div class="terminal-output">
                            ${t.command?a`
                                <div class="command-line">
                                    <span class="prompt">${t.directory||this.currentDirectory}$</span>
                                    <span class="command">${t.command}</span>
                                </div>
                            `:""}
                            ${t.output?a`
                                <div class="output ${t.type||"output"}">${t.output}</div>
                            `:""}
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
                    ${this.tutorialMode?"Exit Tutorial":"Start Tutorial"}
                </button>
                <button class="btn secondary" @click="${()=>this.showHelp=!this.showHelp}">
                    ${this.showHelp?"Hide Help":"Show Help"}
                </button>
            </div>

            <div class="suggested-commands">
                ${this.suggestedCommands.map(t=>a`
                    <button class="command-suggestion" @click="${()=>this.useCommand(t)}">
                        ${t}
                    </button>
                `)}
            </div>

            ${this.showHelp?a`
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
            `:""}
        `}}d(l,"properties",{currentDirectory:{type:String},commandHistory:{type:Array},currentInput:{type:String},isProcessing:{type:Boolean},gitInitialized:{type:Boolean},files:{type:Array},stagedFiles:{type:Array},commits:{type:Array},currentBranch:{type:String},branches:{type:Array},suggestedCommands:{type:Array},tutorialMode:{type:Boolean},currentStep:{type:Number},showHelp:{type:Boolean}}),d(l,"styles",g`
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
    `);customElements.define("git-terminal-simulator",l);export{l as GitTerminalSimulator};
//# sourceMappingURL=git-terminal-simulator-HZiFxSU5.js.map
