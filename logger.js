const fs = require('fs');
const path = require('path');

class ConversationLogger {
    constructor() {
        this.logFile = path.join(__dirname, 'conversation_logs.jsonl');
        this.ensureLogFile();
    }

    ensureLogFile() {
        if (!fs.existsSync(this.logFile)) {
            fs.writeFileSync(this.logFile, '');
        }
    }

    log(sessionId, userMessage, assistantResponse, metadata = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            sessionId: sessionId,
            userMessage: userMessage,
            assistantResponse: assistantResponse,
            responseTime: metadata.responseTime || null,
            model: metadata.model || null,
            tokens: metadata.tokens || null,
            userAgent: metadata.userAgent || null,
            ip: metadata.ip || null
        };

        // Append as JSON Line (one JSON object per line)
        const logLine = JSON.stringify(logEntry) + '\n';
        
        try {
            fs.appendFileSync(this.logFile, logLine);
        } catch (error) {
            console.error('Failed to write log:', error);
        }
    }

    getStats() {
        try {
            const logs = this.readLogs();
            const totalConversations = logs.length;
            const uniqueSessions = new Set(logs.map(log => log.sessionId)).size;
            
            // Most common problems (basic keyword analysis)
            const problems = {};
            logs.forEach(log => {
                const message = log.userMessage.toLowerCase();
                
                // Simple keyword categorization
                if (message.includes('coin') || message.includes('change')) {
                    problems['Coin Issues'] = (problems['Coin Issues'] || 0) + 1;
                } else if (message.includes('bill') || message.includes('dollar')) {
                    problems['Bill Issues'] = (problems['Bill Issues'] || 0) + 1;
                } else if (message.includes('cool') || message.includes('temperature') || message.includes('warm')) {
                    problems['Cooling Issues'] = (problems['Cooling Issues'] || 0) + 1;
                } else if (message.includes('vend') || message.includes('dispense') || message.includes('stuck')) {
                    problems['Vending Issues'] = (problems['Vending Issues'] || 0) + 1;
                } else if (message.includes('power') || message.includes('dead') || message.includes('display')) {
                    problems['Power Issues'] = (problems['Power Issues'] || 0) + 1;
                } else {
                    problems['Other'] = (problems['Other'] || 0) + 1;
                }
            });

            return {
                totalConversations,
                uniqueSessions,
                problemBreakdown: problems,
                logFile: this.logFile
            };
        } catch (error) {
            console.error('Failed to get stats:', error);
            return { error: 'Failed to read logs' };
        }
    }

    readLogs(limit = null) {
        try {
            const data = fs.readFileSync(this.logFile, 'utf-8');
            const lines = data.trim().split('\n').filter(line => line.length > 0);
            const logs = lines.map(line => JSON.parse(line));
            
            return limit ? logs.slice(-limit) : logs;
        } catch (error) {
            console.error('Failed to read logs:', error);
            return [];
        }
    }

    getRecentConversations(limit = 20) {
        return this.readLogs(limit);
    }

    clearLogs() {
        try {
            fs.writeFileSync(this.logFile, '');
            return { success: true };
        } catch (error) {
            console.error('Failed to clear logs:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = ConversationLogger;