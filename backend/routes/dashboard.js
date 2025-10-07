const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const aiAnalyzer = require('../services/aiAnalyzer');

// GET /api/dashboard/trends - Get trending and outdated courses summary
router.get('/trends', async (req, res) => {
  try {
    const [
      trendingCourses,
      outdatedCourses,
      categoryStats,
      demandStats,
      recentUpdates
    ] = await Promise.all([
      Course.getTrendingCourses(10),
      Course.getOutdatedCourses(10),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$courseCategory', count: { $sum: 1 }, avgRating: { $avg: '$starRating' } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$courseDemand', count: { $sum: 1 } } }
      ]),
      Course.find({ status: 'active' })
        .sort({ lastUpdated: -1 })
        .limit(5)
        .select('courseTitle courseCategory trend courseDemand lastUpdated')
    ]);

    const summary = {
      trending: {
        count: trendingCourses.length,
        courses: trendingCourses
      },
      outdated: {
        count: outdatedCourses.length,
        courses: outdatedCourses
      },
      categories: categoryStats,
      demandDistribution: demandStats,
      recentUpdates: recentUpdates,
      lastUpdated: new Date()
    };

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Error fetching dashboard trends:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trends data',
      error: error.message
    });
  }
});

// GET /api/dashboard/courses - Get all courses with filtering
router.get('/courses', async (req, res) => {
  try {
    const {
      category,
      trend,
      demand,
      provider,
      status = 'active',
      page = 1,
      limit = 20,
      sort = 'lastUpdated',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { status };
    
    if (category && category !== 'all') {
      filter.courseCategory = category;
    }
    
    if (trend && trend !== 'all') {
      filter.trend = trend;
    }
    
    if (demand && demand !== 'all') {
      filter.courseDemand = demand;
    }
    
    if (provider && provider !== 'all') {
      filter.courseProvider = provider;
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [courses, totalCount] = await Promise.all([
      Course.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Course.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        },
        filters: {
          category,
          trend,
          demand,
          provider,
          status
        }
      }
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
});

// GET /api/dashboard/courses/:id - Get single course details
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get related courses
    const relatedCourses = await Course.find({
      courseCategory: course.courseCategory,
      _id: { $ne: course._id },
      status: 'active'
    })
    .sort({ starRating: -1, confidenceScore: -1 })
    .limit(5)
    .select('courseTitle courseProvider starRating trend courseDemand');

    res.json({
      success: true,
      data: {
        course,
        relatedCourses
      }
    });

  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course details',
      error: error.message
    });
  }
});

// GET /api/dashboard/courses/outdated - Get outdated courses only
router.get('/courses/outdated', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [outdatedCourses, totalCount] = await Promise.all([
      Course.find({
        $or: [
          { trend: 'Outdated' },
          { status: 'outdated' },
          { jobAvailability: 'None' },
          { courseDemand: 'Declining' }
        ]
      })
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
      Course.countDocuments({
        $or: [
          { trend: 'Outdated' },
          { status: 'outdated' },
          { jobAvailability: 'None' },
          { courseDemand: 'Declining' }
        ]
      })
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      success: true,
      data: {
        courses: outdatedCourses,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching outdated courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outdated courses',
      error: error.message
    });
  }
});

// GET /api/dashboard/stats - Get comprehensive statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalCourses,
      activeCourses,
      trendingCount,
      outdatedCount,
      categoryBreakdown,
      providerBreakdown,
      demandBreakdown,
      avgConfidenceScore,
      recentActivity
    ] = await Promise.all([
      Course.countDocuments(),
      Course.countDocuments({ status: 'active' }),
      Course.countDocuments({ trend: 'Trending', status: 'active' }),
      Course.countDocuments({ trend: 'Outdated' }),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$courseCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$courseProvider', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$courseDemand', count: { $sum: 1 } } }
      ]),
      Course.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, avgScore: { $avg: '$confidenceScore' } } }
      ]),
      Course.aggregate([
        {
          $match: {
            lastUpdated: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $hour: '$lastUpdated' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    const stats = {
      overview: {
        total: totalCourses,
        active: activeCourses,
        trending: trendingCount,
        outdated: outdatedCount,
        avgConfidence: avgConfidenceScore[0]?.avgScore || 0
      },
      breakdown: {
        categories: categoryBreakdown,
        providers: providerBreakdown,
        demand: demandBreakdown
      },
      activity: {
        last24Hours: recentActivity
      },
      lastUpdated: new Date()
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// GET /api/dashboard/search - Search courses
router.get('/search', async (req, res) => {
  try {
    const { q, category, trend, limit = 10 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    const filter = {
      status: 'active',
      $or: [
        { courseTitle: { $regex: q, $options: 'i' } },
        { courseDescription: { $regex: q, $options: 'i' } }
      ]
    };

    if (category && category !== 'all') {
      filter.courseCategory = category;
    }

    if (trend && trend !== 'all') {
      filter.trend = trend;
    }

    const courses = await Course.find(filter)
      .sort({ confidenceScore: -1, starRating: -1 })
      .limit(parseInt(limit))
      .select('courseTitle courseDescription courseCategory courseProvider starRating trend courseDemand jobAvailability confidenceScore courseUrl');

    res.json({
      success: true,
      data: {
        query: q,
        results: courses,
        count: courses.length
      }
    });

  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

module.exports = router;