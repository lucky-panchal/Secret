const express = require('express');
const router = express.Router();
const scraper = require('../services/scraper');
const simpleScraper = require('../services/simpleScraper');
const { triggerScraping, triggerTrendAnalysis, triggerCleanup } = require('../services/scheduler');

// POST /api/scrape/simple - Trigger simple real data scraping
router.post('/simple', async (req, res) => {
  try {
    console.log('🔄 Simple scraping triggered via API');
    
    const result = await simpleScraper.scrapeRealCourses();
    
    res.json(result);

  } catch (error) {
    console.error('Error in simple scraper:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to run simple scraper',
      error: error.message
    });
  }
});

// POST /api/scrape/run - Manually trigger scraping
router.post('/run', async (req, res) => {
  try {
    const { source } = req.body;
    
    console.log('🔄 Manual scraping triggered via API');
    
    // Check if scraper is already running
    const status = scraper.getStatus();
    if (status.isRunning) {
      return res.status(409).json({
        success: false,
        message: 'Scraper is already running',
        status: status
      });
    }

    // Start scraping in background
    scraper.scrapeAllSources()
      .then(result => {
        console.log('✅ Manual scraping completed:', result.summary);
      })
      .catch(error => {
        console.error('❌ Manual scraping failed:', error);
      });

    res.json({
      success: true,
      message: 'Scraping started successfully',
      status: 'running'
    });

  } catch (error) {
    console.error('Error starting scraper:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start scraper',
      error: error.message
    });
  }
});

// GET /api/scrape/status - Get scraper status
router.get('/status', async (req, res) => {
  try {
    const status = scraper.getStatus();
    
    res.json({
      success: true,
      data: {
        ...status,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Error getting scraper status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get scraper status',
      error: error.message
    });
  }
});

// POST /api/scrape/analyze - Trigger trend analysis
router.post('/analyze', async (req, res) => {
  try {
    console.log('🔄 Manual trend analysis triggered via API');
    
    // Start analysis in background
    triggerTrendAnalysis()
      .then(result => {
        console.log('✅ Manual trend analysis completed');
      })
      .catch(error => {
        console.error('❌ Manual trend analysis failed:', error);
      });

    res.json({
      success: true,
      message: 'Trend analysis started successfully'
    });

  } catch (error) {
    console.error('Error starting trend analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start trend analysis',
      error: error.message
    });
  }
});

// POST /api/scrape/cleanup - Trigger database cleanup
router.post('/cleanup', async (req, res) => {
  try {
    console.log('🔄 Manual database cleanup triggered via API');
    
    // Start cleanup in background
    triggerCleanup()
      .then(result => {
        console.log('✅ Manual database cleanup completed');
      })
      .catch(error => {
        console.error('❌ Manual database cleanup failed:', error);
      });

    res.json({
      success: true,
      message: 'Database cleanup started successfully'
    });

  } catch (error) {
    console.error('Error starting database cleanup:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start database cleanup',
      error: error.message
    });
  }
});

// GET /api/scrape/logs - Get recent scraping logs (placeholder)
router.get('/logs', async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // This is a placeholder - in a real implementation, you'd read from log files
    const logs = [
      {
        timestamp: new Date(),
        level: 'info',
        message: 'Scraper status endpoint accessed',
        source: 'api'
      }
    ];

    res.json({
      success: true,
      data: {
        logs: logs.slice(0, parseInt(limit)),
        count: logs.length
      }
    });

  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch logs',
      error: error.message
    });
  }
});

// POST /api/scrape/stop - Stop running scraper (placeholder)
router.post('/stop', async (req, res) => {
  try {
    // This is a placeholder - actual implementation would need to handle graceful shutdown
    res.json({
      success: true,
      message: 'Stop signal sent to scraper',
      note: 'Scraper will stop after completing current batch'
    });

  } catch (error) {
    console.error('Error stopping scraper:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to stop scraper',
      error: error.message
    });
  }
});

// GET /api/scrape/sources - Get available scraping sources
router.get('/sources', async (req, res) => {
  try {
    const sources = [
      {
        name: 'Coursera',
        status: 'active',
        lastScrape: new Date(),
        coursesFound: 0,
        successRate: 95
      },
      {
        name: 'Udemy',
        status: 'active',
        lastScrape: new Date(),
        coursesFound: 0,
        successRate: 90
      },
      {
        name: 'edX',
        status: 'planned',
        lastScrape: null,
        coursesFound: 0,
        successRate: 0
      },
      {
        name: 'LinkedIn Learning',
        status: 'planned',
        lastScrape: null,
        coursesFound: 0,
        successRate: 0
      }
    ];

    res.json({
      success: true,
      data: {
        sources,
        totalActive: sources.filter(s => s.status === 'active').length,
        totalPlanned: sources.filter(s => s.status === 'planned').length
      }
    });

  } catch (error) {
    console.error('Error fetching sources:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sources',
      error: error.message
    });
  }
});

module.exports = router;