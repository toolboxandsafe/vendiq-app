const { createClient } = require('@supabase/supabase-js');

class SupabaseLogger {
    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );
    }

    async log(sessionId, userMessage, assistantResponse, metadata = {}) {
        try {
            const logEntry = {
                session_id: sessionId,
                user_message: userMessage,
                assistant_response: assistantResponse,
                response_time: metadata.responseTime || null,
                model: metadata.model || null,
                tokens_used: metadata.tokens || null,
                user_agent: metadata.userAgent || null,
                ip_address: metadata.ip || null,
                timestamp: new Date().toISOString()
            };

            const { data, error } = await this.supabase
                .from('conversations')
                .insert([logEntry]);

            if (error) {
                console.error('Failed to log conversation:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Supabase logging error:', error);
            return false;
        }
    }

    async getStats() {
        try {
            // Get total conversations
            const { count: totalConversations } = await this.supabase
                .from('conversations')
                .select('*', { count: 'exact', head: true });

            // Get unique sessions
            const { data: sessionData } = await this.supabase
                .from('conversations')
                .select('session_id');
            
            const uniqueSessions = new Set(sessionData?.map(row => row.session_id) || []).size;

            // Get problem breakdown (last 100 conversations)
            const { data: recentData } = await this.supabase
                .from('conversations')
                .select('user_message')
                .order('timestamp', { ascending: false })
                .limit(100);

            const problems = {};
            recentData?.forEach(row => {
                const message = row.user_message.toLowerCase();
                
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
                totalConversations: totalConversations || 0,
                uniqueSessions,
                problemBreakdown: problems
            };
        } catch (error) {
            console.error('Failed to get stats:', error);
            return { error: 'Failed to retrieve stats' };
        }
    }

    async getRecentConversations(limit = 20) {
        try {
            const { data, error } = await this.supabase
                .from('conversations')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Failed to get recent conversations:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Failed to get recent conversations:', error);
            return [];
        }
    }

    async logError(sessionId, userMessage, errorMessage, metadata = {}) {
        try {
            const logEntry = {
                session_id: sessionId || 'unknown',
                user_message: userMessage || '',
                assistant_response: `[ERROR] ${errorMessage}`,
                response_time: metadata.responseTime || null,
                model: metadata.model || null,
                tokens_used: null,
                user_agent: metadata.userAgent || null,
                ip_address: metadata.ip || null,
                timestamp: new Date().toISOString()
            };

            await this.supabase
                .from('conversations')
                .insert([logEntry]);
        } catch (err) {
            console.error('Failed to log error to Supabase:', err);
        }
    }

    async clearLogs() {
        try {
            const { error } = await this.supabase
                .from('conversations')
                .delete()
                .neq('id', 0); // Delete all rows

            if (error) {
                console.error('Failed to clear logs:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Failed to clear logs:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = SupabaseLogger;