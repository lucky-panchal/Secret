const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const scraper = require('../services/scraper');
const { getJobStatus } = require('../services/scheduler');
const { getConnectionCount } = require('../services/websocket');

// GET /api/health - System health check
router.get('/', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Check database connectivity
    const dbCheck = await checkDatabase();
    
    // Check scraper status
    const scraperStatus = scraper.getStatus();
    
    // Check scheduler status
    const schedulerStatus = getJobStatus();
    
    // Check WebSocket connections
    const wsConnections = getConnectionCount();
    
    // System metrics
    const systemMetrics = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      nodeVersion: process.version,
      platform: process.platform
    };
    
    const responseTime = Date.now() - startTime;
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      services: {
        database: dbCheck,
        scraper: {
          status: scraperStatus.isRunning ? 'running' : 'idle',
          scrapedCount: scraperStatus.scrapedCount,
          errorCount: scraperStatus.errorCount,
          lastRun: scraperStatus.startTime
        },
        scheduler: {
          status: 'active',
          jobs: schedulerStatus
        },
        websocket: {
          status: 'active',
          connections: wsConnections
        }
      },
      system: systemMetrics
    };
    
    // Determine overall health status
    if (dbCheck.status !== 'connected' || scraperStatus.errorCount > 10) {
      health.status = 'degraded';
    }
    
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    res.status(statusCode).json({
      success: health.status === 'healthy',
      data: health
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// GET /api/health/database - Database-specific health check
router.get('/database', async (req, res) => {
  try {
    const dbCheck = await checkDatabase();
    
    res.json({
      success: dbCheck.status === 'connected',
      data: dbCheck
    });
    
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(503).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/health/scraper - Scraper-specific health check
router.get('/scraper', async (req, res) => {
  try {
    const scraperStatus = scraper.getStatus();
    
    const health = {
      status: scraperStatus.isRunning ? 'running' : 'idle',
      isHealthy: scraperStatus.errorCount < 10,
      details: scraperStatus,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: health.isHealthy,
      data: health
    });
    
  } catch (error) {
    console.error('Scraper health check failed:', error);
    res.status(503).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/health/stats - System statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalCourses,
      activeCourses,
      trendingCourses,
      outdatedCourses,
      recentlyUpdated,
      avgConfidence
    ] = await Promise.all([
      Course.countDocuments(),
      Course.countDocuments({ status: 'active' }),
      Course.countDocuments({ trend: 'Trending', status: 'active' }),
      Course.countDocuments({ trend: 'Outdated' }),
      Course.countDocuments({
        lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, avgScore: { $avg: '$confidenceScore' } } }
      ])
    ]);
    
    const stats = {
      courses: {
        total: totalCourses,
        active: activeCourses,
        trending: trendingCourses,
        outdated: outdatedCourses,
        recentlyUpdated: recentlyUpdated,
        avgConfidence: avgConfidence[0]?.avgScore || 0
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      },
      scraper: scraper.getStatus(),
      websocket: {
        connections: getConnectionCount()
      },
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Stats health check failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/health/ready - Readiness probe
router.get('/ready', async (req, res) => {
  try {
    // Check if all critical services are ready
    const dbCheck = await checkDatabase();
    const scraperReady = !scraper.getStatus().isRunning || scraper.getStatus().errorCount < 5;
    
    const isReady = dbCheck.status === 'connected' && scraperReady;
    
    res.status(isReady ? 200 : 503).json({
      success: isReady,
      ready: isReady,
      checks: {
        database: dbCheck.status === 'connected',
        scraper: scraperReady
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Readiness check failed:', error);
    res.status(503).json({
      success: false,
      ready: false,
      error: error.message
    });
  }
});

// GET /api/health/live - Liveness probe
router.get('/live', (req, res) => {
  // Simple liveness check - if we can respond, we're alive
  res.json({
    success: true,
    alive: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Helper function to check database connectivity
async function checkDatabase() {
  try {
    const startTime = Date.now();
    
    // Try to count documents (lightweight operation)
    const count = await Course.countDocuments().maxTimeMS(5000);
    
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'connected',
      responseTime: `${responseTime}ms`,
      documentCount: count,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = router;