const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const SupabaseLogger = require('./supabase-logger');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load knowledge bases
let bevmaxKB, gryphonKB, billKB, systemPrompt;

try {
  // Try parent directory first (local development)
  const knowledgeDir = path.join(__dirname, '..');
  bevmaxKB = fs.readFileSync(path.join(knowledgeDir, 'bevmax-5800-4-complete-database.md'), 'utf-8');
  gryphonKB = fs.readFileSync(path.join(knowledgeDir, 'cpi-gryphon-knowledge-base.md'), 'utf-8');
  billKB = fs.readFileSync(path.join(knowledgeDir, 'cpi-bill-validator-knowledge-base.md'), 'utf-8');
  systemPrompt = fs.readFileSync(path.join(__dirname, 'system-prompt.md'), 'utf-8');
} catch (e) {
  // Fall back to knowledge directory (for deployment)
  const knowledgeDir = path.join(__dirname, 'knowledge');
  bevmaxKB = fs.readFileSync(path.join(knowledgeDir, 'bevmax-5800-4-complete-database.md'), 'utf-8');
  gryphonKB = fs.readFileSync(path.join(knowledgeDir, 'cpi-gryphon-knowledge-base.md'), 'utf-8');
  billKB = fs.readFileSync(path.join(knowledgeDir, 'cpi-bill-validator-knowledge-base.md'), 'utf-8');
  systemPrompt = fs.readFileSync(path.join(__dirname, 'system-prompt.md'), 'utf-8');
}

// Combine into full system context
const fullSystemPrompt = `${systemPrompt}

---
# KNOWLEDGE BASE - BEVMAX 5800-4 MACHINE
${bevmaxKB}

---
# KNOWLEDGE BASE - CPI GRYPHON COIN CHANGER
${gryphonKB}

---
# KNOWLEDGE BASE - CPI BILL ACCEPTOR
${billKB}
`;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize Supabase logger
const logger = new SupabaseLogger();

// Store conversation history per session (simple in-memory for now)
const conversations = new Map();

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    const history = conversations.get(sessionId);
    
    // Add user message to history
    history.push({ role: 'user', content: message });
    
    // Keep only last 10 messages to manage context
    const recentHistory = history.slice(-10);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: fullSystemPrompt,
      messages: recentHistory,
    });

    const assistantMessage = response.content[0].text;
    
    // Add assistant response to history
    history.push({ role: 'assistant', content: assistantMessage });

    // Log the conversation (async, don't wait for it)
    const responseTime = Date.now() - startTime;
    const metadata = {
      responseTime,
      model: 'claude-sonnet-4-20250514',
      tokens: response.usage ? (response.usage.input_tokens + response.usage.output_tokens) : null,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress
    };
    
    logger.log(sessionId, message, assistantMessage, metadata)
      .catch(err => console.error('Logging failed:', err));

    res.json({ 
      response: assistantMessage,
      sessionId 
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Clear conversation endpoint
app.post('/api/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  conversations.delete(sessionId);
  res.json({ success: true });
});

// Analytics endpoints
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await logger.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Failed to get stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.get('/api/conversations', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const conversations = await logger.getRecentConversations(limit);
    res.json(conversations);
  } catch (error) {
    console.error('Failed to get conversations:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

app.post('/api/clear-logs', async (req, res) => {
  try {
    const result = await logger.clearLogs();
    res.json(result);
  } catch (error) {
    console.error('Failed to clear logs:', error);
    res.status(500).json({ error: 'Failed to clear logs' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VendiQ API' });
});

// Export for Vercel serverless
module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`VendiQ API running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
  });
}
