const Course = require('../models/Course');
const aiCourseAnalyzer = require('./aiCourseAnalyzer');
const aiWebSearcher = require('./aiWebSearcher');

class DynamicDataManager {
  constructor() {
    this.isRefreshing = false;
  }

  async refreshCourseData() {
    if (this.isRefreshing) {
      console.log('Data refresh already in progress');
      return { success: false, message: 'Refresh already in progress' };
    }

    this.isRefreshing = true;
    console.log('🔄 Starting dynamic course data refresh...');

    try {
      // Get all active courses
      const courses = await Course.find({ status: 'active' });
      console.log(`📊 Found ${courses.length} courses to analyze`);

      let updated = 0;
      let trending = 0;
      let outdated = 0;

      // Process courses in batches to avoid overwhelming the API
      const batchSize = 5;
      for (let i = 0; i < courses.length; i += batchSize) {
        const batch = courses.slice(i, i + batchSize);
        
        await Promise.all(batch.map(async (course) => {
          try {
            // Analyze course relevance using AI
            const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(course);
            
            // Update course with new analysis
            course.trend = analysis.trend;
            course.courseDemand = analysis.courseDemand;
            course.jobAvailability = analysis.jobAvailability;
            course.confidenceScore = analysis.confidenceScore;
            course.aiThreatLevel = analysis.aiThreatLevel;
            course.lastUpdated = new Date();
            
            await course.save();
            updated++;
            
            if (analysis.trend === 'Trending') trending++;
            if (analysis.trend === 'Outdated') outdated++;
            
            console.log(`✅ Updated: ${course.courseTitle} - ${analysis.trend}`);
            
          } catch (error) {
            console.error(`❌ Error updating course ${course.courseTitle}:`, error.message);
          }
        }));

        // Add delay between batches to respect rate limits
        if (i + batchSize < courses.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      console.log(`🎉 Data refresh completed: ${updated} courses updated, ${trending} trending, ${outdated} outdated`);
      
      return {
        success: true,
        message: 'Course data refreshed successfully',
        stats: {
          totalProcessed: courses.length,
          updated,
          trending,
          outdated
        }
      };

    } catch (error) {
      console.error('❌ Error in data refresh:', error);
      return {
        success: false,
        message: 'Failed to refresh course data',
        error: error.message
      };
    } finally {
      this.isRefreshing = false;
    }
  }

  async searchAndAddCourses(category, limit = 10) {
    console.log(`🔍 Searching for new ${category} courses...`);
    
    try {
      const searchQueries = this.getSearchQueries(category);
      const newCourses = [];

      for (const query of searchQueries) {
        try {
          const searchResults = await aiWebSearcher.searchWeb(query, 5);
          
          for (const result of searchResults) {
            // Check if course already exists
            const existingCourse = await Course.findOne({ courseUrl: result.url });
            if (existingCourse) continue;

            // Extract course information
            const courseData = await this.extractCourseData(result, category);
            if (courseData) {
              // Analyze the course
              const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(courseData);
              
              // Create new course
              const course = new Course({
                ...courseData,
                ...analysis,
                discoveryMethod: 'web_search',
                searchQuery: query,
                scrapedAt: new Date()
              });

              await course.save();
              newCourses.push(course);
              console.log(`➕ Added new course: ${course.courseTitle}`);

              if (newCourses.length >= limit) break;
            }
          }
          
          if (newCourses.length >= limit) break;
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`Error processing query "${query}":`, error.message);
        }
      }

      return {
        success: true,
        message: `Found ${newCourses.length} new courses`,
        courses: newCourses
      };

    } catch (error) {
      console.error('Error searching for courses:', error);
      return {
        success: false,
        message: 'Failed to search for courses',
        error: error.message
      };
    }
  }

  getSearchQueries(category) {
    const queries = {
      'AI/ML': [
        'machine learning courses 2024',
        'artificial intelligence certification',
        'deep learning online course',
        'AI programming tutorial'
      ],
      'Blockchain': [
        'blockchain development course',
        'cryptocurrency programming',
        'web3 development tutorial',
        'smart contracts course'
      ],
      'Data Science': [
        'data science bootcamp',
        'python data analysis course',
        'big data analytics certification',
        'statistics for data science'
      ],
      'Web Development': [
        'full stack web development',
        'react javascript course',
        'frontend development tutorial',
        'backend programming course'
      ],
      'Cloud Computing': [
        'AWS certification course',
        'cloud computing tutorial',
        'kubernetes docker course',
        'serverless development'
      ]
    };

    return queries[category] || [`${category} online course`, `${category} certification`];
  }

  async extractCourseData(searchResult, category) {
    try {
      // Basic course data extraction from search result
      const title = searchResult.title;
      const description = searchResult.snippet || 'Course description not available';
      const url = searchResult.url;

      // Determine provider from URL
      let provider = 'Other';
      if (url.includes('coursera.org')) provider = 'Coursera';
      else if (url.includes('udemy.com')) provider = 'Udemy';
      else if (url.includes('edx.org')) provider = 'edX';
      else if (url.includes('linkedin.com/learning')) provider = 'LinkedIn Learning';
      else if (url.includes('pluralsight.com')) provider = 'Pluralsight';
      else if (url.includes('skillshare.com')) provider = 'Skillshare';

      // Skip if not from a known provider
      if (provider === 'Other') return null;

      return {
        courseTitle: title,
        courseDescription: description,
        courseCategory: category,
        courseProvider: provider,
        courseUrl: url,
        starRating: 0, // Will be updated later if available
        status: 'active'
      };

    } catch (error) {
      console.error('Error extracting course data:', error);
      return null;
    }
  }

  async getCategoryStats() {
    try {
      const stats = await Course.aggregate([
        { $match: { status: 'active' } },
        {
          $group: {
            _id: '$courseCategory',
            total: { $sum: 1 },
            trending: {
              $sum: { $cond: [{ $eq: ['$trend', 'Trending'] }, 1, 0] }
            },
            outdated: {
              $sum: { $cond: [{ $eq: ['$trend', 'Outdated'] }, 1, 0] }
            },
            highDemand: {
              $sum: { $cond: [{ $eq: ['$courseDemand', 'High'] }, 1, 0] }
            },
            avgConfidence: { $avg: '$confidenceScore' },
            avgRating: { $avg: '$starRating' },
            avgAIThreat: { $avg: '$aiThreatLevel' }
          }
        },
        { $sort: { total: -1 } }
      ]);

      return stats;
    } catch (error) {
      console.error('Error getting category stats:', error);
      return [];
    }
  }

  async getDataFreshness() {
    try {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats = await Course.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            updatedToday: {
              $sum: { $cond: [{ $gte: ['$lastUpdated', oneDayAgo] }, 1, 0] }
            },
            updatedThisWeek: {
              $sum: { $cond: [{ $gte: ['$lastUpdated', oneWeekAgo] }, 1, 0] }
            },
            needsUpdate: {
              $sum: { $cond: [{ $lt: ['$lastUpdated', oneWeekAgo] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        total: 0,
        updatedToday: 0,
        updatedThisWeek: 0,
        needsUpdate: 0
      };
    } catch (error) {
      console.error('Error getting data freshness:', error);
      return {
        total: 0,
        updatedToday: 0,
        updatedThisWeek: 0,
        needsUpdate: 0
      };
    }
  }
}

module.exports = new DynamicDataManager();