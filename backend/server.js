const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

const connectDB = require('./config/database');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const scraperRoutes = require('./routes/scraper');
const healthRoutes = require('./routes/health');
const { initializeScheduler } = require('./services/scheduler');
const { setupWebSocket } = require('./services/websocket');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

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

// WebSocket setup
setupWebSocket(server);

// Initialize scheduler for automated scraping
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
});

module.exports = app;