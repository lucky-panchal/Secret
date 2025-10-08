const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

// Configure proper TLS settings for production
if (process.env.NODE_ENV === 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
} else {
  // For development, we can be more lenient but still secure
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
}

const connectDB = require('./config/database');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const scraperRoutes = require('./routes/scraper');
const healthRoutes = require('./routes/health');
const aiSearchRoutes = require('./routes/ai-search');
const aiStatusRoutes = require('./routes/ai-status');
const { initializeScheduler } = require('./services/scheduler');
const { setupWebSocket } = require('./services/websocket');
const dataManager = require('./services/dataManager');
const dynamicDataManager = require('./services/dynamicDataManager');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB and initialize data
connectDB().then(async () => {
  // Initialize course data on startup
  setTimeout(async () => {
    try {
      console.log('🔄 Initializing course data...');
      await dataManager.initializeData();
      
      // Check if we need to refresh course analysis
      const freshness = await dynamicDataManager.getDataFreshness();
      if (freshness.needsUpdate > freshness.total * 0.5) {
        console.log('🤖 Starting AI analysis refresh...');
        dynamicDataManager.refreshCourseData().catch(error => {
          console.error('❌ Background AI refresh failed:', error);
        });
      }
    } catch (error) {
      console.error('❌ Failed to initialize data on startup:', error);
    }
  }, 2000); // Wait 2 seconds for DB connection to stabilize
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/scrape', scraperRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/ai-search', aiSearchRoutes);
app.use('/api/ai-status', aiStatusRoutes);

// WebSocket setup
setupWebSocket(server);

// Initialize scheduler for automated data management
initializeScheduler();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`🔍 Scraper API: http://localhost:${PORT}/api/scrape`);
  console.log(`🤖 AI Search API: http://localhost:${PORT}/api/ai-search`);
});

module.exports = app;