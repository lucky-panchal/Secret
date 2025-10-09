const cron = require('node-cron');
const scraper = require('./scraper');
const dataManager = require('./dataManager');
const Course = require('../models/Course');
const aiAnalyzer = require('./aiAnalyzer');
const { broadcastUpdate } = require('./websocket');

class Scheduler {
  constructor() {
    this.jobs = new Map();
    this.isInitialized = false;
  }

  initializeScheduler() {
    if (this.isInitialized) {
      console.log('⚠️ Scheduler already initialized');
      return;
    }

    console.log('⏰ Initializing automated scheduler...');

    // Main data refresh job - every 6 hours
    const mainScrapeJob = cron.schedule('0 */6 * * *', async () => {
      console.log('🕐 Running scheduled data refresh job...');
      try {
        const webScraper = require('./webScraper');
        await webScraper.refreshAllCourses();
        await webScraper.updateCourseData();
        await dataManager.refreshCourseData();
      } catch (error) {
        console.error('❌ Scheduled data refresh failed:', error);
        // Fallback to simple scraper
        try {
          console.log('🔄 Trying fallback data refresh...');
          await dataManager.ensureMinimumData();
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
        }
      }
    }, {
      scheduled: false,
      timezone: 'UTC'
    });

    // AI analysis job - every 2 hours
    const trendAnalysisJob = cron.schedule('0 */2 * * *', async () => {
      console.log('📊 Running AI analysis job...');
      try {
        await dataManager.runAIAnalysis();
      } catch (error) {
        console.error('❌ AI analysis failed:', error);
      }
    }, {
      scheduled: false,
      timezone: 'UTC'
    });

    // Database cleanup job - daily at 2 AM
    const cleanupJob = cron.schedule('0 2 * * *', async () => {
      console.log('🧹 Running database cleanup job...');
      try {
        await this.runDatabaseCleanup();
      } catch (error) {
        console.error('❌ Database cleanup failed:', error);
      }
    }, {
      scheduled: false,
      timezone: 'UTC'
    });

    // Health check job - every 30 minutes
    const healthCheckJob = cron.schedule('*/30 * * * *', async () => {
      try {
        await this.runHealthCheck();
      } catch (error) {
        console.error('❌ Health check failed:', error);
      }
    }, {
      scheduled: false,
      timezone: 'UTC'
    });

    // Store jobs
    this.jobs.set('mainScrape', mainScrapeJob);
    this.jobs.set('trendAnalysis', trendAnalysisJob);
    this.jobs.set('cleanup', cleanupJob);
    this.jobs.set('healthCheck', healthCheckJob);

    // Start all jobs
    this.startAllJobs();
    
    this.isInitialized = true;
    console.log('✅ Scheduler initialized with 4 jobs');
  }

  startAllJobs() {
    this.jobs.forEach((job, name) => {
      job.start();
      console.log(`▶️ Started job: ${name}`);
    });
  }

  stopAllJobs() {
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`⏸️ Stopped job: ${name}`);
    });
  }

  async runTrendAnalysis() {
    console.log('🔍 Starting comprehensive trend analysis...');
    
    try {
      // Get all active courses
      const courses = await Course.find({ status: 'active' }).limit(1000);
      
      if (courses.length === 0) {
        console.log('No courses found for trend analysis');
        return;
      }

      let updatedCount = 0;
      const batchSize = 50;

      // Process courses in batches
      for (let i = 0; i < courses.length; i += batchSize) {
        const batch = courses.slice(i, i + batchSize);
        
        try {
          const analyses = await aiAnalyzer.batchAnalyzeCourses(batch);
          
          // Update courses with new analysis
          for (let j = 0; j < batch.length; j++) {
            const course = batch[j];
            const analysis = analyses[j]?.analysis;
            
            if (analysis) {
              const hasChanged = 
                course.trend !== analysis.trend ||
                course.courseDemand !== analysis.courseDemand ||
                course.jobAvailability !== analysis.jobAvailability;

              if (hasChanged) {
                course.trend = analysis.trend;
                course.courseDemand = analysis.courseDemand;
                course.jobAvailability = analysis.jobAvailability;
                course.confidenceScore = analysis.confidenceScore;
                course.lastUpdated = new Date();
                
                await course.save();
                updatedCount++;

                // Broadcast individual course update
                broadcastUpdate({
                  type: 'course_trend_update',
                  courseId: course._id,
                  oldTrend: batch[j].trend,
                  newTrend: analysis.trend,
                  confidence: analysis.confidenceScore
                });
              }
            }
          }
        } catch (error) {
          console.error(`Error processing batch ${i}-${i + batchSize}:`, error);
        }
      }

      // Generate and broadcast trend summary
      const trendSummary = await this.generateTrendSummary();
      broadcastUpdate({
        type: 'trend_analysis_complete',
        summary: trendSummary,
        updatedCourses: updatedCount
      });

      console.log(`✅ Trend analysis complete. Updated ${updatedCount} courses.`);
      
    } catch (error) {
      console.error('❌ Error in trend analysis:', error);
      throw error;
    }
  }

  async runDatabaseCleanup() {
    console.log('🧹 Starting database cleanup...');
    
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

      // Mark old outdated courses as removed
      const outdatedResult = await Course.updateMany(
        {
          trend: 'Outdated',
          lastUpdated: { $lt: ninetyDaysAgo },
          status: { $ne: 'removed' }
        },
        {
          status: 'removed',
          removed_at: new Date()
        }
      );

      // Remove very old removed courses
      const removeResult = await Course.deleteMany({
        status: 'removed',
        removed_at: { $lt: ninetyDaysAgo }
      });

      // Update courses that haven't been scraped recently
      const staleResult = await Course.updateMany(
        {
          lastUpdated: { $lt: thirtyDaysAgo },
          status: 'active'
        },
        {
          status: 'outdated'
        }
      );

      console.log(`✅ Cleanup complete:
        - Marked ${outdatedResult.modifiedCount} outdated courses as removed
        - Deleted ${removeResult.deletedCount} old removed courses  
        - Marked ${staleResult.modifiedCount} stale courses as outdated`);

      broadcastUpdate({
        type: 'database_cleanup_complete',
        stats: {
          markedRemoved: outdatedResult.modifiedCount,
          deleted: removeResult.deletedCount,
          markedStale: staleResult.modifiedCount
        }
      });

    } catch (error) {
      console.error('❌ Error in database cleanup:', error);
      throw error;
    }
  }

  async runHealthCheck() {
    try {
      // Check database connection
      const courseCount = await Course.countDocuments();
      
      // Check scraper status
      const scraperStatus = scraper.getStatus();
      
      // Check recent activity
      const recentCourses = await Course.countDocuments({
        lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });

      const health = {
        timestamp: new Date(),
        database: {
          connected: true,
          totalCourses: courseCount,
          recentlyUpdated: recentCourses
        },
        scraper: scraperStatus,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      };

      // Only broadcast if there are issues or every hour
      const shouldBroadcast = 
        courseCount === 0 || 
        recentCourses === 0 || 
        scraperStatus.errorCount > 10 ||
        new Date().getMinutes() === 0; // Every hour

      if (shouldBroadcast) {
        broadcastUpdate({
          type: 'health_check',
          health: health
        });
      }

    } catch (error) {
      console.error('❌ Health check failed:', error);
      
      broadcastUpdate({
        type: 'health_check',
        health: {
          timestamp: new Date(),
          database: { connected: false, error: error.message },
          status: 'unhealthy'
        }
      });
    }
  }

  async generateTrendSummary() {
    try {
      const [
        totalCourses,
        trendingCourses,
        outdatedCourses,
        highDemandCourses,
        lowDemandCourses,
        categoryStats
      ] = await Promise.all([
        Course.countDocuments({ status: 'active' }),
        Course.countDocuments({ trend: 'Trending', status: 'active' }),
        Course.countDocuments({ trend: 'Outdated' }),
        Course.countDocuments({ courseDemand: 'High', status: 'active' }),
        Course.countDocuments({ courseDemand: { $in: ['Low', 'Declining'] } }),
        Course.aggregate([
          { $match: { status: 'active' } },
          { $group: { _id: '$courseCategory', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ])
      ]);

      return {
        total: totalCourses,
        trending: trendingCourses,
        outdated: outdatedCourses,
        highDemand: highDemandCourses,
        lowDemand: lowDemandCourses,
        categories: categoryStats,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error generating trend summary:', error);
      return null;
    }
  }

  // Manual job triggers
  async triggerScraping() {
    console.log('🔄 Manually triggering data refresh...');
    return await dataManager.refreshCourseData();
  }

  async triggerTrendAnalysis() {
    console.log('🔄 Manually triggering AI analysis...');
    return await dataManager.runAIAnalysis();
  }

  async triggerCleanup() {
    console.log('🔄 Manually triggering cleanup job...');
    return await this.runDatabaseCleanup();
  }

  getJobStatus() {
    const status = {};
    this.jobs.forEach((job, name) => {
      status[name] = {
        running: job.running,
        scheduled: job.scheduled
      };
    });
    return status;
  }

  destroy() {
    this.stopAllJobs();
    this.jobs.clear();
    this.isInitialized = false;
    console.log('🛑 Scheduler destroyed');
  }
}

const scheduler = new Scheduler();

module.exports = {
  initializeScheduler: () => scheduler.initializeScheduler(),
  triggerScraping: () => scheduler.triggerScraping(),
  triggerTrendAnalysis: () => scheduler.triggerTrendAnalysis(),
  triggerCleanup: () => scheduler.triggerCleanup(),
  getJobStatus: () => scheduler.getJobStatus(),
  destroy: () => scheduler.destroy()
};