const Course = require('../models/Course');
const aiAnalyzer = require('./aiAnalyzer');
const aiWebSearcher = require('./aiWebSearcher');
const { broadcastUpdate } = require('./websocket');

class DataManager {
  constructor() {
    this.isInitializing = false;
    this.lastRefresh = null;
    this.refreshInterval = 6 * 60 * 60 * 1000; // 6 hours
  }

  async initializeData() {
    if (this.isInitializing) {
      console.log('⚠️ Data initialization already in progress');
      return;
    }

    this.isInitializing = true;
    console.log('🚀 Initializing course data...');

    try {
      // Check if we have recent data
      const courseCount = await Course.countDocuments();
      const recentCourses = await Course.countDocuments({
        lastUpdated: { $gte: new Date(Date.now() - this.refreshInterval) }
      });

      console.log(`📊 Found ${courseCount} total courses, ${recentCourses} recent`);

      // If no courses or all data is stale, refresh immediately
      if (courseCount === 0 || recentCourses === 0) {
        console.log('🔄 No recent data found, refreshing...');
        await this.refreshCourseData();
      } else {
        console.log('✅ Recent data found, running AI analysis...');
        await this.runAIAnalysis();
      }

      this.lastRefresh = new Date();
      
    } catch (error) {
      console.error('❌ Error initializing data:', error);
    } finally {
      this.isInitializing = false;
    }
  }

  async refreshCourseData() {
    console.log('🔄 Starting course data refresh...');
    
    try {
      // Use AI web searcher for dynamic course discovery
      const result = await aiWebSearcher.searchAndAnalyzeCourses();
      
      if (result.success) {
        console.log(`✅ Successfully refreshed ${result.courses} courses`);
        
        // Run AI analysis on all courses
        await this.runAIAnalysis();
        
        // Broadcast update
        broadcastUpdate({
          type: 'data_refresh_complete',
          coursesUpdated: result.courses,
          timestamp: new Date()
        });
        
        return result;
      } else {
        console.warn('⚠️ Data refresh had issues:', result.message);
        
        // Still try to run AI analysis on existing data
        await this.runAIAnalysis();
        
        // Fallback: ensure we have some data
        await this.ensureMinimumData();
        
        return { success: true, courses: 0, message: 'Fallback data used' };
      }
      
    } catch (error) {
      console.error('❌ Course data refresh failed:', error.message);
      
      // Fallback: ensure we have some data
      try {
        await this.ensureMinimumData();
        await this.runAIAnalysis();
        return { success: true, courses: 0, message: 'Fallback data used due to error' };
      } catch (fallbackError) {
        console.error('❌ Fallback data creation also failed:', fallbackError.message);
        throw error;
      }
    }
  }

  async runAIAnalysis() {
    console.log('🤖 Running AI analysis on all courses...');
    
    try {
      const courses = await Course.find({ status: 'active' }).limit(1000);
      
      if (courses.length === 0) {
        console.log('No courses found for AI analysis');
        return;
      }

      let updatedCount = 0;
      const batchSize = 20;

      for (let i = 0; i < courses.length; i += batchSize) {
        const batch = courses.slice(i, i + batchSize);
        
        try {
          // Analyze each course individually for better error handling
          for (const course of batch) {
            try {
              const analysis = aiAnalyzer.analyzeCourse(course);
              
              // Check if analysis results have changed
              const hasChanged = 
                course.trend !== analysis.trend ||
                course.courseDemand !== analysis.courseDemand ||
                course.jobAvailability !== analysis.jobAvailability ||
                Math.abs(course.confidenceScore - analysis.confidenceScore) > 0.1;

              if (hasChanged) {
                course.trend = analysis.trend;
                course.courseDemand = analysis.courseDemand;
                course.jobAvailability = analysis.jobAvailability === 'Medium' ? 'Low' : analysis.jobAvailability;
                course.confidenceScore = analysis.confidenceScore;
                course.lastUpdated = new Date();
                
                await course.save();
                updatedCount++;
              }
            } catch (error) {
              console.error(`Error analyzing course ${course.courseTitle}:`, error.message);
            }
          }
          
          // Small delay between batches
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`Error processing batch ${i}-${i + batchSize}:`, error);
        }
      }

      console.log(`✅ AI analysis complete. Updated ${updatedCount} courses.`);
      
      // Broadcast analysis completion
      broadcastUpdate({
        type: 'ai_analysis_complete',
        coursesAnalyzed: courses.length,
        coursesUpdated: updatedCount,
        timestamp: new Date()
      });
      
      return updatedCount;
      
    } catch (error) {
      console.error('❌ AI analysis failed:', error);
      throw error;
    }
  }

  async ensureMinimumData() {
    console.log('🔧 Ensuring minimum data availability...');
    
    try {
      const courseCount = await Course.countDocuments();
      
      if (courseCount < 5) {
        console.log('📚 Adding fallback course data...');
        
        // Minimal fallback - will be replaced by AI search
        const fallbackCourses = [
          {
            courseTitle: 'AI Course Discovery Pending',
            courseDescription: 'Courses will be discovered through AI web search',
            courseCategory: 'Other',
            courseProvider: 'System',
            starRating: 0,
            courseUrl: 'https://system.placeholder/pending',
            trend: 'Stable',
            courseDemand: 'Medium',
            jobAvailability: 'Low',
            confidenceScore: 0.1,
            aiThreatLevel: 0,
            discoveryMethod: 'manual',
            status: 'active'
          }
        ];
        
        for (const courseData of fallbackCourses) {
          try {
            const existingCourse = await Course.findOne({ courseUrl: courseData.courseUrl });
            if (!existingCourse) {
              const course = new Course(courseData);
              await course.save();
              console.log(`⚠️ Added placeholder course - AI search will replace this`);
            }
          } catch (error) {
            console.error(`Error adding fallback course:`, error.message);
          }
        }
      }
      
    } catch (error) {
      console.error('❌ Error ensuring minimum data:', error);
    }
  }

  async getDataStats() {
    try {
      const [
        totalCourses,
        activeCourses,
        trendingCourses,
        outdatedCourses,
        recentlyUpdated
      ] = await Promise.all([
        Course.countDocuments(),
        Course.countDocuments({ status: 'active' }),
        Course.countDocuments({ trend: 'Trending', status: 'active' }),
        Course.countDocuments({ trend: 'Outdated' }),
        Course.countDocuments({
          lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        })
      ]);

      return {
        total: totalCourses,
        active: activeCourses,
        trending: trendingCourses,
        outdated: outdatedCourses,
        recentlyUpdated,
        lastRefresh: this.lastRefresh,
        needsRefresh: recentlyUpdated === 0 || 
          (this.lastRefresh && Date.now() - this.lastRefresh.getTime() > this.refreshInterval)
      };
    } catch (error) {
      console.error('Error getting data stats:', error);
      return null;
    }
  }

  async scheduleRefresh() {
    const stats = await this.getDataStats();
    
    if (stats && stats.needsRefresh) {
      console.log('⏰ Scheduled refresh triggered');
      await this.refreshCourseData();
    }
  }

  isDataStale() {
    return !this.lastRefresh || 
           Date.now() - this.lastRefresh.getTime() > this.refreshInterval;
  }
}

module.exports = new DataManager();