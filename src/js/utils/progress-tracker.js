/**
 * Progress Tracking System
 * Handles user progress tracking and analytics
 */

export class ProgressTracker {
    constructor(stateManager) {
        this.state = stateManager;
        this.activities = new Map();
        this.milestones = new Map();
        this.achievements = new Set();
    }

    /**
     * Initialize progress tracking
     */
    init() {
        this.setupActivityDefinitions();
        this.setupMilestones();
        this.updateProgressBar();
        
        console.log('📊 Progress Tracker initialized');
    }

    /**
     * Set up activity definitions
     */
    setupActivityDefinitions() {
        const activities = [
            // Part 1 Activities
            { id: 'drag-drop-vcs', section: 'part1', weight: 2, name: 'VCS Concept Match' },
            { id: 'drag-drop-commit', section: 'part1', weight: 2, name: 'Commit Concept Match' },
            { id: 'drag-drop-repository', section: 'part1', weight: 2, name: 'Repository Concept Match' },
            { id: 'drag-drop-branch', section: 'part1', weight: 2, name: 'Branch Concept Match' },
            { id: 'cvcs-explored', section: 'part1', weight: 3, name: 'CVCS Architecture Explored' },
            { id: 'dvcs-explored', section: 'part1', weight: 3, name: 'DVCS Architecture Explored' },
            { id: 'delta-model-explored', section: 'part1', weight: 3, name: 'Delta Model Explored' },
            { id: 'snapshot-model-explored', section: 'part1', weight: 3, name: 'Snapshot Model Explored' },
            { id: 'three-states-demo', section: 'part1', weight: 4, name: 'Three States Demo Completed' },
            { id: 'hash-generator-used', section: 'part1', weight: 2, name: 'Hash Generator Used' },

            // Part 2 Activities  
            { id: 'terminal-commands', section: 'part2', weight: 3, name: 'Terminal Commands Practice' },
            { id: 'branch-commit', section: 'part2', weight: 3, name: 'Branch Commit Created' },
            { id: 'branch-create', section: 'part2', weight: 3, name: 'New Branch Created' },
            { id: 'branch-merge', section: 'part2', weight: 4, name: 'Branch Merge Completed' },
            { id: 'merge-conflict-resolved', section: 'part2', weight: 5, name: 'Merge Conflict Resolved' },

            // Part 3 Activities
            { id: 'collab-commit', section: 'part3', weight: 2, name: 'Collaboration Commit' },
            { id: 'collab-push', section: 'part3', weight: 3, name: 'Push to Fork' },
            { id: 'collab-pr', section: 'part3', weight: 4, name: 'Pull Request Created' },
            { id: 'platform-github', section: 'part3', weight: 2, name: 'GitHub Platform Explored' },
            { id: 'platform-gitlab', section: 'part3', weight: 2, name: 'GitLab Platform Explored' },
            { id: 'platform-bitbucket', section: 'part3', weight: 2, name: 'Bitbucket Platform Explored' },
            { id: 'cicd-demo', section: 'part3', weight: 3, name: 'CI/CD Pipeline Demo' },

            // Part 4 Activities
            { id: 'udl-representation', section: 'part4', weight: 2, name: 'UDL Representation Explored' },
            { id: 'udl-expression', section: 'part4', weight: 2, name: 'UDL Expression Explored' },
            { id: 'udl-engagement', section: 'part4', weight: 2, name: 'UDL Engagement Explored' },
            { id: 'learning-path-completed', section: 'part4', weight: 5, name: 'Learning Path Completed' }
        ];

        activities.forEach(activity => {
            this.activities.set(activity.id, activity);
        });
    }

    /**
     * Set up learning milestones
     */
    setupMilestones() {
        const milestones = [
            {
                id: 'first-concept',
                name: 'First Steps',
                description: 'Complete your first concept match',
                condition: (progress) => this.getCompletedActivitiesCount() >= 1,
                reward: 'Git Novice',
                icon: 'ph-star'
            },
            {
                id: 'part1-complete',
                name: 'Foundation Master',
                description: 'Complete all Part I activities',
                condition: (progress) => this.getSectionProgress('part1') >= 100,
                reward: 'Foundation Expert',
                icon: 'ph-graduation-cap'
            },
            {
                id: 'branching-expert',
                name: 'Branching Expert',
                description: 'Master all branching concepts',
                condition: (progress) => ['branch-commit', 'branch-create', 'branch-merge'].every(id => 
                    progress.activities && progress.activities[id]?.completed),
                reward: 'Branch Master',
                icon: 'ph-git-branch'
            },
            {
                id: 'collaboration-pro',
                name: 'Collaboration Pro',
                description: 'Complete the collaboration workflow',
                condition: (progress) => ['collab-commit', 'collab-push', 'collab-pr'].every(id => 
                    progress.activities && progress.activities[id]?.completed),
                reward: 'Team Player',
                icon: 'ph-users'
            },
            {
                id: 'platform-explorer',
                name: 'Platform Explorer',
                description: 'Explore all three major platforms',
                condition: (progress) => ['platform-github', 'platform-gitlab', 'platform-bitbucket'].every(id => 
                    progress.activities && progress.activities[id]?.completed),
                reward: 'Platform Expert',
                icon: 'ph-globe'
            },
            {
                id: 'git-master',
                name: 'Git Master',
                description: 'Complete the entire learning journey',
                condition: (progress) => this.getOverallProgress() >= 100,
                reward: 'Git Guru',
                icon: 'ph-crown'
            }
        ];

        milestones.forEach(milestone => {
            this.milestones.set(milestone.id, milestone);
        });
    }

    /**
     * Update activity progress
     */
    updateProgress(activityId, completed = true, data = {}) {
        if (!this.activities.has(activityId)) {
            console.warn(`Unknown activity: ${activityId}`);
            return;
        }

        const activity = this.activities.get(activityId);
        
        // Update state
        this.state.dispatch('COMPLETE_ACTIVITY', {
            activityId,
            data: {
                ...data,
                timestamp: Date.now(),
                section: activity.section,
                weight: activity.weight
            }
        });

        // Update section progress
        this.state.dispatch('UPDATE_PROGRESS', {
            section: activity.section,
            activity: activityId,
            completed
        });

        // Check for new achievements
        this.checkAchievements();

        // Update progress bar
        this.updateProgressBar();

        console.log(`📈 Progress updated: ${activity.name}`);
    }

    /**
     * Get overall progress percentage
     */
    getOverallProgress() {
        const totalWeight = Array.from(this.activities.values())
            .reduce((sum, activity) => sum + activity.weight, 0);
        
        const completedWeight = this.getCompletedActivities()
            .reduce((sum, activity) => sum + activity.weight, 0);

        return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    }

    /**
     * Get section progress percentage
     */
    getSectionProgress(sectionId) {
        const sectionActivities = Array.from(this.activities.values())
            .filter(activity => activity.section === sectionId);
        
        const totalWeight = sectionActivities.reduce((sum, activity) => sum + activity.weight, 0);
        
        const completedActivities = this.getCompletedActivities()
            .filter(activity => activity.section === sectionId);
        
        const completedWeight = completedActivities.reduce((sum, activity) => sum + activity.weight, 0);

        return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    }

    /**
     * Get completed activities
     */
    getCompletedActivities() {
        const state = this.state.getState();
        const completedActivityIds = Object.keys(state.progress.activities || {})
            .filter(id => state.progress.activities[id]?.completed);
        
        return completedActivityIds
            .map(id => this.activities.get(id))
            .filter(Boolean);
    }

    /**
     * Get completed activities count
     */
    getCompletedActivitiesCount() {
        return this.getCompletedActivities().length;
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = this.getOverallProgress();
            progressBar.style.transform = `scaleX(${progress / 100})`;
            progressBar.setAttribute('aria-valuenow', progress);
        }
    }

    /**
     * Check for new achievements
     */
    checkAchievements() {
        const currentState = this.state.getState();
        
        this.milestones.forEach((milestone, id) => {
            if (!this.achievements.has(id) && milestone.condition(currentState.progress)) {
                this.unlockAchievement(id, milestone);
            }
        });
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(achievementId, milestone) {
        this.achievements.add(achievementId);
        
        // Show achievement notification
        this.showAchievementNotification(milestone);
        
        // Track achievement
        this.state.dispatch('TRACK_INTERACTION', {
            type: 'achievement_unlocked',
            data: {
                achievementId,
                name: milestone.name,
                reward: milestone.reward
            }
        });

        console.log(`🏆 Achievement unlocked: ${milestone.name}`);
    }

    /**
     * Show achievement notification
     */
    showAchievementNotification(milestone) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <i class="${milestone.icon} achievement-icon"></i>
                <div class="achievement-text">
                    <div class="achievement-title">${milestone.name}</div>
                    <div class="achievement-reward">${milestone.reward}</div>
                </div>
                <i class="ph-x close-btn"></i>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Manual close
        notification.querySelector('.close-btn').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    /**
     * Get progress summary
     */
    getProgressSummary() {
        const sections = ['part1', 'part2', 'part3', 'part4'];
        const sectionTitles = {
            part1: 'Fundamentos Conceptuales',
            part2: 'Ruta de Aprendizaje', 
            part3: 'Ecosistema Extendido',
            part4: 'Pedagogía Inclusiva'
        };

        return {
            overall: this.getOverallProgress(),
            completed: this.getCompletedActivitiesCount(),
            total: this.activities.size,
            achievements: this.achievements.size,
            sections: sections.map(section => ({
                id: section,
                title: sectionTitles[section],
                progress: this.getSectionProgress(section)
            }))
        };
    }

    /**
     * Export progress data
     */
    exportProgress() {
        const summary = this.getProgressSummary();
        const completedActivities = this.getCompletedActivities();
        
        return {
            summary,
            activities: completedActivities.map(activity => ({
                id: activity.id,
                name: activity.name,
                section: activity.section,
                weight: activity.weight,
                completedAt: this.state.getState().progress.activities[activity.id]?.completedAt
            })),
            achievements: Array.from(this.achievements),
            exportedAt: Date.now()
        };
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        this.achievements.clear();
        this.state.dispatch('RESET_PROGRESS');
        this.updateProgressBar();
        
        console.log('🔄 Progress reset');
    }

    /**
     * Development utilities
     */
    dev = {
        // Get current progress
        getProgress: () => this.getProgressSummary(),
        
        // Complete all activities (for testing)
        completeAll: () => {
            this.activities.forEach((activity, id) => {
                this.updateProgress(id, true);
            });
        },

        // Complete section (for testing)
        completeSection: (sectionId) => {
            const sectionActivities = Array.from(this.activities.entries())
                .filter(([id, activity]) => activity.section === sectionId);
            
            sectionActivities.forEach(([id, activity]) => {
                this.updateProgress(id, true);
            });
        },

        // Show all achievements
        showAchievements: () => {
            console.table(Array.from(this.milestones.entries()).map(([id, milestone]) => ({
                id,
                name: milestone.name,
                unlocked: this.achievements.has(id),
                reward: milestone.reward
            })));
        }
    };
}

export default ProgressTracker;