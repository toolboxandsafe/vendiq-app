const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const SupabaseLogger = require('./supabase-logger');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: [
    'https://vendiq-app.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

// Rate limiting - 20 chat requests per minute per IP
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please wait a moment and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for destructive endpoints - 5 per hour
const destructiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Rate limit exceeded. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Load knowledge bases safely (#5 - knowledge base loading can crash)
function loadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`Warning: Could not load ${filePath}`);
    return '';
  }
}

let bevmaxKB, gryphonKB, billKB, systemPrompt;

// Try parent directory first (local development), then knowledge/ subdirectory
const parentDir = path.join(__dirname, '..');
const knowledgeDir = path.join(__dirname, 'knowledge');

bevmaxKB = loadFile(path.join(parentDir, 'bevmax-5800-4-complete-database.md'))
  || loadFile(path.join(knowledgeDir, 'bevmax-5800-4-complete-database.md'));
gryphonKB = loadFile(path.join(parentDir, 'cpi-gryphon-knowledge-base.md'))
  || loadFile(path.join(knowledgeDir, 'cpi-gryphon-knowledge-base.md'));
billKB = loadFile(path.join(parentDir, 'cpi-bill-validator-knowledge-base.md'))
  || loadFile(path.join(knowledgeDir, 'cpi-bill-validator-knowledge-base.md'));
systemPrompt = loadFile(path.join(__dirname, 'system-prompt.md'));

if (!bevmaxKB && !gryphonKB && !billKB) {
  console.error('ERROR: No knowledge base files found. The assistant will have no troubleshooting data.');
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

// Store conversation history per session (#8 - bounded Map with eviction)
const MAX_SESSIONS = 500;
const conversations = new Map();

function getOrCreateHistory(sessionId) {
  // Evict oldest sessions if at capacity
  if (!conversations.has(sessionId) && conversations.size >= MAX_SESSIONS) {
    const oldest = conversations.keys().next().value;
    conversations.delete(oldest);
  }
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, []);
  }
  return conversations.get(sessionId);
}

// Chat endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
  const startTime = Date.now();

  try {
    const { message, sessionId = 'default' } = req.body;

    // #6 - validate input length
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long. Please keep it under 2000 characters.' });
    }

    const history = getOrCreateHistory(sessionId);

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

    // #4 - validate API response before accessing
    const assistantMessage = response?.content?.[0]?.text;
    if (!assistantMessage) {
      console.error('Unexpected API response format:', JSON.stringify(response?.content));
      return res.status(500).json({ error: 'Received an unexpected response. Please try again.' });
    }

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
    // #7 - clamp limit to 1-100
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const conversations = await logger.getRecentConversations(limit);
    res.json(conversations);
  } catch (error) {
    console.error('Failed to get conversations:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

app.post('/api/clear-logs', destructiveLimiter, async (req, res) => {
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
