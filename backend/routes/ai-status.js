const express = require('express');
const router = express.Router();
const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');
const aiWebSearcher = require('../services/aiWebSearcher');
const dynamicDataManager = require('../services/dynamicDataManager');
const Course = require('../models/Course');

// GET /api/ai-status - Check AI services status
router.get('/', async (req, res) => {
  try {
    const status = {
      timestamp: new Date(),
      services: {},
      environment: {},
      database: {},
      overall: 'checking'
    };

    // Check environment variables
    status.environment = {
      jinaApiKey: !!process.env.JINA_API_KEY,
      huggingfaceApiKey: !!process.env.HUGGINGFACE_API_KEY,
      aiProvider: process.env.AI_PROVIDER || 'none',
      hfModel: process.env.HF_MODEL || 'none',
      confidenceThreshold: process.env.MODEL_CONFIDENCE_THRESHOLD || '0.7'
    };

    // Test AI Course Analyzer
    try {
      const testCourse = {
        courseTitle: 'Machine Learning Test',
        courseDescription: 'Test course for ML',
        courseCategory: 'AI/ML',
        courseProvider: 'Test'
      };
      
      const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(testCourse);
      status.services.aiCourseAnalyzer = {
        status: 'working',
        lastTest: new Date(),
        result: {
          trend: analysis.trend,
          confidence: analysis.confidenceScore
        }
      };
    } catch (error) {
      status.services.aiCourseAnalyzer = {
        status: 'error',
        error: error.message
      };
    }

    // Test Web Searcher
    try {
      const searchResults = await aiWebSearcher.searchWeb('test query', 1);
      status.services.aiWebSearcher = {
        status: 'working',
        lastTest: new Date(),
        resultsCount: searchResults.length
      };
    } catch (error) {
      status.services.aiWebSearcher = {
        status: 'error',
        error: error.message
      };
    }

    // Test Dynamic Data Manager
    try {
      const categoryStats = await dynamicDataManager.getCategoryStats();
      const freshness = await dynamicDataManager.getDataFreshness();
      
      status.services.dynamicDataManager = {
        status: 'working',
        lastTest: new Date(),
        categories: categoryStats.length,
        dataFreshness: freshness
      };
    } catch (error) {
      status.services.dynamicDataManager = {
        status: 'error',
        error: error.message
      };
    }

    // Check database
    try {
      const courseCount = await Course.countDocuments();
      const trendStats = await Course.aggregate([
        {
          $group: {
            _id: '$trend',
            count: { $sum: 1 }
          }
        }
      ]);

      status.database = {
        status: 'connected',
        totalCourses: courseCount,
        trendDistribution: trendStats.reduce((acc, stat) => {
          acc[stat._id || 'unknown'] = stat.count;
          return acc;
        }, {})
      };
    } catch (error) {
      status.database = {
        status: 'error',
        error: error.message
      };
    }

    // Determine overall status
    const serviceStatuses = Object.values(status.services).map(s => s.status);
    const hasErrors = serviceStatuses.includes('error') || status.database.status === 'error';
    
    status.overall = hasErrors ? 'degraded' : 'healthy';

    res.json({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('Error checking AI status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check AI status',
      error: error.message
    });
  }
});

// POST /api/ai-status/test - Run comprehensive AI test
router.post('/test', async (req, res) => {
  try {
    const testResults = {
      timestamp: new Date(),
      tests: []
    };

    // Test 1: Course Analysis Accuracy
    const testCourses = [
      {
        course: {
          courseTitle: 'Machine Learning Specialization',
          courseDescription: 'Learn ML with Python and TensorFlow',
          courseCategory: 'AI/ML',
          courseProvider: 'Coursera'
        },
        expectedTrend: 'Trending'
      },
      {
        course: {
          courseTitle: 'Customer Service Training',
          courseDescription: 'Basic customer service skills',
          courseCategory: 'Other',
          courseProvider: 'Udemy'
        },
        expectedTrend: 'Outdated'
      }
    ];

    for (const test of testCourses) {
      try {
        const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(test.course);
        testResults.tests.push({
          name: `Course Analysis: ${test.course.courseTitle}`,
          status: analysis.trend === test.expectedTrend ? 'pass' : 'fail',
          expected: test.expectedTrend,
          actual: analysis.trend,
          confidence: analysis.confidenceScore
        });
      } catch (error) {
        testResults.tests.push({
          name: `Course Analysis: ${test.course.courseTitle}`,
          status: 'error',
          error: error.message
        });
      }
    }

    // Test 2: Web Search
    try {
      const searchResults = await aiWebSearcher.searchWeb('machine learning courses 2024', 3);
      testResults.tests.push({
        name: 'Web Search Functionality',
        status: searchResults.length > 0 ? 'pass' : 'fail',
        resultsCount: searchResults.length
      });
    } catch (error) {
      testResults.tests.push({
        name: 'Web Search Functionality',
        status: 'error',
        error: error.message
      });
    }

    // Calculate overall test result
    const passCount = testResults.tests.filter(t => t.status === 'pass').length;
    const totalTests = testResults.tests.length;
    
    testResults.summary = {
      passed: passCount,
      total: totalTests,
      success: passCount === totalTests
    };

    res.json({
      success: true,
      data: testResults
    });

  } catch (error) {
    console.error('Error running AI tests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to run AI tests',
      error: error.message
    });
  }
});

module.exports = router;