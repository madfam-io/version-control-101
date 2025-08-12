/**
 * State Management System
 * Redux-like pattern for predictable state management
 */

/**
 * Initial application state
 */
const initialState = {
    // UI State
    ui: {
        currentSection: 'hero',
        theme: 'auto',
        language: 'es',
        loading: false,
        error: null
    },
    
    // User Progress
    progress: {
        sections: {},
        activities: {},
        completionRate: 0,
        lastUpdated: null
    },
    
    // Interactive Components State
    components: {
        dragDrop: {},
        branchSimulator: {},
        collaborationSim: {},
        terminal: {},
        comparisons: {}
    },
    
    // User Preferences  
    preferences: {
        autoSave: true,
        animations: true,
        soundEffects: false,
        keyboardShortcuts: true,
        highContrast: false
    },
    
    // Analytics Data
    analytics: {
        sessionStart: null,
        pageViews: {},
        interactions: [],
        timeSpent: {}
    }
};

/**
 * Action Types
 */
export const ActionTypes = {
    // UI Actions
    SET_CURRENT_SECTION: 'SET_CURRENT_SECTION',
    SET_THEME: 'SET_THEME',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    
    // Progress Actions
    UPDATE_PROGRESS: 'UPDATE_PROGRESS',
    COMPLETE_ACTIVITY: 'COMPLETE_ACTIVITY',
    RESET_PROGRESS: 'RESET_PROGRESS',
    
    // Component Actions
    UPDATE_COMPONENT_STATE: 'UPDATE_COMPONENT_STATE',
    RESET_COMPONENT_STATE: 'RESET_COMPONENT_STATE',
    
    // Preference Actions
    UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
    
    // Analytics Actions
    TRACK_INTERACTION: 'TRACK_INTERACTION',
    TRACK_TIME_SPENT: 'TRACK_TIME_SPENT',
    
    // App Lifecycle
    APP_INITIALIZED: 'APP_INITIALIZED',
    LOADING_PROGRESS: 'LOADING_PROGRESS'
};

/**
 * Action Creators
 */
export const Actions = {
    setCurrentSection: (section) => ({
        type: ActionTypes.SET_CURRENT_SECTION,
        payload: { section }
    }),
    
    setTheme: (theme) => ({
        type: ActionTypes.SET_THEME,
        payload: { theme }
    }),
    
    setLanguage: (language) => ({
        type: ActionTypes.SET_LANGUAGE,
        payload: { language }
    }),
    
    updateProgress: (section, activity, completed = true) => ({
        type: ActionTypes.UPDATE_PROGRESS,
        payload: { section, activity, completed }
    }),
    
    updateComponentState: (componentId, state) => ({
        type: ActionTypes.UPDATE_COMPONENT_STATE,
        payload: { componentId, state }
    }),
    
    trackInteraction: (type, data) => ({
        type: ActionTypes.TRACK_INTERACTION,
        payload: { type, data, timestamp: Date.now() }
    })
};

/**
 * Reducers
 */
const reducers = {
    [ActionTypes.SET_CURRENT_SECTION]: (state, action) => ({
        ...state,
        ui: {
            ...state.ui,
            currentSection: action.payload.section
        }
    }),
    
    [ActionTypes.SET_THEME]: (state, action) => ({
        ...state,
        ui: {
            ...state.ui,
            theme: action.payload.theme
        }
    }),
    
    [ActionTypes.SET_LANGUAGE]: (state, action) => ({
        ...state,
        ui: {
            ...state.ui,
            language: action.payload.language
        }
    }),
    
    [ActionTypes.SET_LOADING]: (state, action) => ({
        ...state,
        ui: {
            ...state.ui,
            loading: action.payload.loading
        }
    }),
    
    [ActionTypes.SET_ERROR]: (state, action) => ({
        ...state,
        ui: {
            ...state.ui,
            error: action.payload.error
        }
    }),
    
    [ActionTypes.UPDATE_PROGRESS]: (state, action) => {
        const { section, activity, completed } = action.payload;
        const newProgress = {
            ...state.progress,
            sections: {
                ...state.progress.sections,
                [section]: {
                    ...state.progress.sections[section],
                    [activity]: completed
                }
            },
            lastUpdated: Date.now()
        };
        
        // Recalculate completion rate
        newProgress.completionRate = calculateCompletionRate(newProgress);
        
        return {
            ...state,
            progress: newProgress
        };
    },
    
    [ActionTypes.COMPLETE_ACTIVITY]: (state, action) => {
        const { activityId, data } = action.payload;
        return {
            ...state,
            progress: {
                ...state.progress,
                activities: {
                    ...state.progress.activities,
                    [activityId]: {
                        completed: true,
                        completedAt: Date.now(),
                        data
                    }
                }
            }
        };
    },
    
    [ActionTypes.UPDATE_COMPONENT_STATE]: (state, action) => {
        const { componentId, state: componentState } = action.payload;
        return {
            ...state,
            components: {
                ...state.components,
                [componentId]: {
                    ...state.components[componentId],
                    ...componentState
                }
            }
        };
    },
    
    [ActionTypes.UPDATE_PREFERENCES]: (state, action) => ({
        ...state,
        preferences: {
            ...state.preferences,
            ...action.payload
        }
    }),
    
    [ActionTypes.TRACK_INTERACTION]: (state, action) => ({
        ...state,
        analytics: {
            ...state.analytics,
            interactions: [
                ...state.analytics.interactions,
                action.payload
            ]
        }
    }),
    
    [ActionTypes.TRACK_TIME_SPENT]: (state, action) => {
        const { section, timeSpent } = action.payload;
        return {
            ...state,
            analytics: {
                ...state.analytics,
                timeSpent: {
                    ...state.analytics.timeSpent,
                    [section]: (state.analytics.timeSpent[section] || 0) + timeSpent
                }
            }
        };
    }
};

/**
 * Calculate completion rate based on progress
 */
function calculateCompletionRate(progress) {
    const totalActivities = Object.values(progress.sections)
        .reduce((total, section) => total + Object.keys(section).length, 0);
    
    const completedActivities = Object.values(progress.sections)
        .reduce((total, section) => 
            total + Object.values(section).filter(Boolean).length, 0);
    
    return totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
}

/**
 * State Manager Class
 */
export class StateManager {
    constructor() {
        this.state = { ...initialState };
        this.listeners = new Map();
        this.middleware = [];
        this.isHydrated = false;
    }

    /**
     * Initialize the state manager
     */
    async init() {
        // Load persisted state
        await this.loadPersistedState();
        
        // Set up auto-save
        this.setupAutoSave();
        
        // Initialize session tracking
        this.state.analytics.sessionStart = Date.now();
        
        console.log('🏪 State Manager initialized');
    }

    /**
     * Dispatch an action
     */
    dispatch(type, payload = {}) {
        const action = { type, payload };
        
        // Apply middleware
        for (const middleware of this.middleware) {
            middleware(action, this.state);
        }
        
        // Apply reducer
        const reducer = reducers[type];
        if (reducer) {
            const newState = reducer(this.state, action);
            this.setState(newState);
        } else {
            console.warn(`No reducer found for action type: ${type}`);
        }
        
        // Notify listeners
        this.notifyListeners(type, payload);
    }

    /**
     * Subscribe to state changes
     */
    subscribe(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        
        this.listeners.get(eventType).push(callback);
        
        // Return unsubscribe function
        return () => {
            const listeners = this.listeners.get(eventType);
            if (listeners) {
                const index = listeners.indexOf(callback);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        };
    }

    /**
     * Get current state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Get specific state slice
     */
    getStateSlice(path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], this.state);
    }

    /**
     * Set state (internal use)
     */
    setState(newState) {
        this.state = newState;
        
        // Auto-save if enabled
        if (this.state.preferences.autoSave) {
            this.saveState();
        }
    }

    /**
     * Add middleware
     */
    use(middleware) {
        this.middleware.push(middleware);
    }

    /**
     * Notify listeners
     */
    notifyListeners(eventType, payload) {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            listeners.forEach(callback => {
                try {
                    callback(payload);
                } catch (error) {
                    console.error('Error in state listener:', error);
                }
            });
        }
    }

    /**
     * Load persisted state from localStorage
     */
    async loadPersistedState() {
        try {
            const persistedState = localStorage.getItem('gitPedagogy:state');
            if (persistedState) {
                const parsed = JSON.parse(persistedState);
                
                // Merge with initial state to handle new fields
                this.state = {
                    ...initialState,
                    ...parsed,
                    // Always reset UI state on load
                    ui: {
                        ...initialState.ui,
                        theme: parsed.ui?.theme || 'auto',
                        language: parsed.ui?.language || 'es'
                    }
                };
                
                this.isHydrated = true;
                console.log('💾 State hydrated from localStorage');
            }
        } catch (error) {
            console.warn('Failed to load persisted state:', error);
        }
    }

    /**
     * Save state to localStorage
     */
    saveState() {
        try {
            // Don't persist temporary UI state
            const stateToSave = {
                ...this.state,
                ui: {
                    theme: this.state.ui.theme,
                    language: this.state.ui.language
                }
            };
            
            localStorage.setItem('gitPedagogy:state', JSON.stringify(stateToSave));
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    }

    /**
     * Setup auto-save functionality
     */
    setupAutoSave() {
        // Save state every 30 seconds
        setInterval(() => {
            if (this.state.preferences.autoSave) {
                this.saveState();
            }
        }, 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });
    }

    /**
     * Reset all state
     */
    reset() {
        this.state = { ...initialState };
        localStorage.removeItem('gitPedagogy:state');
        this.notifyListeners('STATE_RESET', {});
    }

    /**
     * Export state for debugging
     */
    exportState() {
        return JSON.stringify(this.state, null, 2);
    }

    /**
     * Import state (for debugging/testing)
     */
    importState(stateJson) {
        try {
            const imported = JSON.parse(stateJson);
            this.setState(imported);
            console.log('State imported successfully');
        } catch (error) {
            console.error('Failed to import state:', error);
        }
    }
}

/**
 * Built-in Middleware
 */
export const loggerMiddleware = (action, state) => {
    console.log('🎬 Action:', action.type, action.payload);
};

export const analyticsMiddleware = (action, state) => {
    // Track certain actions for analytics
    const trackableActions = [
        ActionTypes.COMPLETE_ACTIVITY,
        ActionTypes.SET_CURRENT_SECTION,
        ActionTypes.UPDATE_PROGRESS
    ];
    
    if (trackableActions.includes(action.type)) {
        // This would integrate with actual analytics service
        console.log('📊 Analytics:', action.type, action.payload);
    }
};

export default StateManager;