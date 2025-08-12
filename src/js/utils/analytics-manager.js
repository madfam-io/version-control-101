/**
 * Analytics Management System
 * Handles user interaction tracking and analytics
 */

export class AnalyticsManager {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.events = [];
        this.userAgent = navigator.userAgent;
        this.startTime = Date.now();
        this.isEnabled = true;
        this.batchSize = 10;
        this.flushInterval = 30000; // 30 seconds
    }

    /**
     * Initialize analytics
     */
    initialize() {
        this.setupEventListeners();
        this.startSession();
        this.setupPeriodicFlush();
        
        console.log('📊 Analytics Manager initialized');
    }

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.track('page_visibility', {
                visible: !document.hidden,
                timestamp: Date.now()
            });
        });

        // Track custom events from components
        document.addEventListener('track-interaction', (e) => {
            this.track('component_interaction', e.detail);
        });

        document.addEventListener('progress-update', (e) => {
            this.track('progress_update', e.detail);
        });

        document.addEventListener('section-changed', (e) => {
            this.trackSectionView(e.detail.section);
        });

        // Track errors
        window.addEventListener('error', (e) => {
            this.trackError(e.error);
        });

        // Track performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => this.trackPerformance(), 1000);
        });
    }

    /**
     * Start analytics session
     */
    startSession() {
        this.track('session_start', {
            sessionId: this.sessionId,
            userAgent: this.userAgent,
            language: navigator.language,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
    }

    /**
     * Track generic event
     */
    track(eventType, data = {}) {
        if (!this.isEnabled) return;

        const event = {
            id: this.generateEventId(),
            sessionId: this.sessionId,
            type: eventType,
            timestamp: Date.now(),
            url: window.location.href,
            data,
            // Add timing information
            sessionDuration: Date.now() - this.startTime
        };

        this.events.push(event);
        
        // Console log for development
        if (this.isDevelopment()) {
            console.log(`📈 Analytics: ${eventType}`, data);
        }

        // Auto-flush if batch size reached
        if (this.events.length >= this.batchSize) {
            this.flush();
        }
    }

    /**
     * Generate unique event ID
     */
    generateEventId() {
        return `${this.sessionId}-${this.events.length + 1}`;
    }

    /**
     * Track section view
     */
    trackSectionView(section) {
        this.track('section_view', {
            section,
            previousSection: this.currentSection,
            timeInPreviousSection: this.currentSection ? Date.now() - this.sectionStartTime : 0
        });

        this.currentSection = section;
        this.sectionStartTime = Date.now();
    }

    /**
     * Track user action
     */
    trackAction(action, data = {}) {
        this.track('user_action', {
            action,
            ...data
        });
    }

    /**
     * Track progress milestone
     */
    trackProgress(data) {
        this.track('progress_milestone', {
            ...data,
            sessionProgress: this.getSessionProgress()
        });
    }

    /**
     * Track error
     */
    trackError(error) {
        this.track('error', {
            message: error.message,
            stack: error.stack,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno
        });
    }

    /**
     * Track performance metrics
     */
    trackPerformance() {
        if (!('performance' in window)) return;

        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        const metrics = {
            // Navigation timing
            domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
            loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
            
            // Paint timing
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,

            // Resource timing
            totalResources: performance.getEntriesByType('resource').length,
            
            // Memory (if available)
            memory: 'memory' in performance ? {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize
            } : null
        };

        this.track('performance', metrics);
    }

    /**
     * Track learning analytics
     */
    trackLearningEvent(eventType, data = {}) {
        this.track('learning_event', {
            eventType,
            learningData: data,
            sessionTime: Date.now() - this.startTime
        });
    }

    /**
     * Track accessibility usage
     */
    trackAccessibility(feature, data = {}) {
        this.track('accessibility', {
            feature,
            ...data
        });
    }

    /**
     * Get session progress
     */
    getSessionProgress() {
        const sessionEvents = this.events.filter(e => e.sessionId === this.sessionId);
        const progressEvents = sessionEvents.filter(e => e.type === 'progress_milestone');
        
        return {
            totalEvents: sessionEvents.length,
            progressEvents: progressEvents.length,
            sessionDuration: Date.now() - this.startTime
        };
    }

    /**
     * Flush events to analytics service
     */
    async flush() {
        if (this.events.length === 0) return;

        const eventsToSend = [...this.events];
        this.events = [];

        try {
            // In a real implementation, this would send to an analytics service
            await this.sendToAnalyticsService(eventsToSend);
            
            if (this.isDevelopment()) {
                console.log(`📤 Flushed ${eventsToSend.length} analytics events`);
            }
        } catch (error) {
            console.warn('Failed to send analytics events:', error);
            // Re-queue events on failure
            this.events.unshift(...eventsToSend);
        }
    }

    /**
     * Send events to analytics service (mock implementation)
     */
    async sendToAnalyticsService(events) {
        // Mock implementation - in production this would hit a real endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.isDevelopment()) {
                    console.log('Analytics Events:', events);
                }
                resolve();
            }, 100);
        });
    }

    /**
     * Setup periodic flushing
     */
    setupPeriodicFlush() {
        setInterval(() => {
            if (this.events.length > 0) {
                this.flush();
            }
        }, this.flushInterval);

        // Flush on page unload
        window.addEventListener('beforeunload', () => {
            if (this.events.length > 0) {
                // Use sendBeacon for more reliable sending on page unload
                this.flushSync();
            }
        });
    }

    /**
     * Synchronous flush for page unload
     */
    flushSync() {
        if (this.events.length === 0) return;

        const data = JSON.stringify({
            sessionId: this.sessionId,
            events: this.events
        });

        if ('sendBeacon' in navigator) {
            navigator.sendBeacon('/api/analytics', data);
        } else {
            // Fallback for browsers without sendBeacon
            fetch('/api/analytics', {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
                keepalive: true
            }).catch(() => {}); // Ignore errors on page unload
        }

        this.events = [];
    }

    /**
     * Check if running in development mode
     */
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('dev');
    }

    /**
     * Generate analytics report
     */
    generateReport() {
        const report = {
            session: {
                id: this.sessionId,
                duration: Date.now() - this.startTime,
                eventCount: this.events.length
            },
            events: this.events.reduce((acc, event) => {
                acc[event.type] = (acc[event.type] || 0) + 1;
                return acc;
            }, {}),
            performance: this.getPerformanceMetrics(),
            userAgent: this.userAgent
        };

        return report;
    }

    /**
     * Get performance metrics summary
     */
    getPerformanceMetrics() {
        const performanceEvents = this.events.filter(e => e.type === 'performance');
        return performanceEvents.length > 0 ? performanceEvents[0].data : null;
    }

    /**
     * Enable/disable analytics
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        
        if (!enabled) {
            this.track('analytics_disabled');
            this.flush();
        } else {
            this.track('analytics_enabled');
        }
    }

    /**
     * Get privacy compliance data
     */
    getPrivacyData() {
        return {
            sessionId: this.sessionId,
            dataCollected: [
                'User interactions with educational components',
                'Learning progress and achievements', 
                'Page navigation and time spent',
                'Error events for debugging',
                'Performance metrics',
                'Accessibility feature usage'
            ],
            dataNotCollected: [
                'Personal identifying information',
                'IP addresses',
                'Exact location data',
                'Third-party account information'
            ],
            retention: '30 days for learning analytics, 7 days for technical metrics'
        };
    }

    /**
     * Development utilities
     */
    dev = {
        // Get current session data
        getSession: () => ({
            sessionId: this.sessionId,
            events: this.events.length,
            duration: Date.now() - this.startTime
        }),

        // Generate and display report
        report: () => {
            const report = this.generateReport();
            console.log('📊 Analytics Report:', report);
            return report;
        },

        // Clear all events
        clear: () => {
            this.events = [];
            console.log('🗑️ Analytics events cleared');
        },

        // Export events as JSON
        export: () => {
            const data = JSON.stringify(this.events, null, 2);
            console.log('📤 Analytics Export:', data);
            return data;
        },

        // Simulate batch of events
        simulate: () => {
            const eventTypes = ['section_view', 'user_action', 'progress_milestone'];
            for (let i = 0; i < 20; i++) {
                const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                this.track(eventType, { simulated: true, index: i });
            }
            console.log('🎯 Simulated 20 analytics events');
        }
    };

    /**
     * Cleanup resources
     */
    destroy() {
        this.flush();
        this.isEnabled = false;
    }
}

export default AnalyticsManager;