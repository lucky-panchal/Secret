const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses - Get all courses with advanced filtering
router.get('/', async (req, res) => {
  try {
    const {
      category,
      trend,
      demand,
      provider,
      status = 'active',
      minRating,
      maxRating,
      search,
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

    if (minRating || maxRating) {
      filter.starRating = {};
      if (minRating) filter.starRating.$gte = parseFloat(minRating);
      if (maxRating) filter.starRating.$lte = parseFloat(maxRating);
    }

    if (search) {
      filter.$or = [
        { courseTitle: { $regex: search, $options: 'i' } },
        { courseDescription: { $regex: search, $options: 'i' } }
      ];
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
          hasPrev: parseInt(page) > 1,
          limit: parseInt(limit)
        },
        filters: {
          category,
          trend,
          demand,
          provider,
          status,
          minRating,
          maxRating,
          search
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

// GET /api/courses/trending - Get trending courses
router.get('/trending', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    
    const filter = {
      trend: 'Trending',
      status: 'active'
    };

    if (category && category !== 'all') {
      filter.courseCategory = category;
    }

    const trendingCourses = await Course.find(filter)
      .sort({ confidenceScore: -1, starRating: -1, lastUpdated: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      data: {
        courses: trendingCourses,
        count: trendingCourses.length,
        category: category || 'all'
      }
    });

  } catch (error) {
    console.error('Error fetching trending courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending courses',
      error: error.message
    });
  }
});

// GET /api/courses/outdated - Get outdated courses
router.get('/outdated', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    
    const filter = {
      $or: [
        { trend: 'Outdated' },
        { status: 'outdated' },
        { jobAvailability: 'None' },
        { courseDemand: 'Declining' }
      ]
    };

    if (category && category !== 'all') {
      filter.courseCategory = category;
    }

    const outdatedCourses = await Course.find(filter)
      .sort({ lastUpdated: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      data: {
        courses: outdatedCourses,
        count: outdatedCourses.length,
        category: category || 'all'
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

// GET /api/courses/categories - Get all categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Course.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$courseCategory',
          count: { $sum: 1 },
          trending: {
            $sum: { $cond: [{ $eq: ['$trend', 'Trending'] }, 1, 0] }
          },
          outdated: {
            $sum: { $cond: [{ $eq: ['$trend', 'Outdated'] }, 1, 0] }
          },
          avgRating: { $avg: '$starRating' },
          avgConfidence: { $avg: '$confidenceScore' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// GET /api/courses/providers - Get all providers with counts
router.get('/providers', async (req, res) => {
  try {
    const providers = await Course.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$courseProvider',
          count: { $sum: 1 },
          avgRating: { $avg: '$starRating' },
          trending: {
            $sum: { $cond: [{ $eq: ['$trend', 'Trending'] }, 1, 0] }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: providers
    });

  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch providers',
      error: error.message
    });
  }
});

// GET /api/courses/:id - Get single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get related courses in the same category
    const relatedCourses = await Course.find({
      courseCategory: course.courseCategory,
      _id: { $ne: course._id },
      status: 'active'
    })
    .sort({ starRating: -1, confidenceScore: -1 })
    .limit(6)
    .select('courseTitle courseProvider starRating trend courseDemand courseUrl');

    // Get similar trending courses
    const similarTrending = await Course.find({
      trend: 'Trending',
      courseCategory: course.courseCategory,
      _id: { $ne: course._id },
      status: 'active'
    })
    .sort({ confidenceScore: -1 })
    .limit(3)
    .select('courseTitle courseProvider starRating confidenceScore courseUrl');

    res.json({
      success: true,
      data: {
        course,
        relatedCourses,
        similarTrending
      }
    });

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
});

// POST /api/courses/:id/view - Track course view (for analytics)
router.post('/:id/view', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Increment view count (you might want to add a views field to the schema)
    // For now, we'll just return success
    
    res.json({
      success: true,
      message: 'View tracked successfully'
    });

  } catch (error) {
    console.error('Error tracking course view:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track view',
      error: error.message
    });
  }
});

// GET /api/courses/category/:category - Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20, trend, demand, sort = 'starRating', order = 'desc' } = req.query;

    const filter = {
      courseCategory: category,
      status: 'active'
    };

    if (trend && trend !== 'all') {
      filter.trend = trend;
    }

    if (demand && demand !== 'all') {
      filter.courseDemand = demand;
    }

    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const courses = await Course.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .lean();

    // Get category statistics
    const categoryStats = await Course.aggregate([
      { $match: { courseCategory: category, status: 'active' } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          trending: {
            $sum: { $cond: [{ $eq: ['$trend', 'Trending'] }, 1, 0] }
          },
          outdated: {
            $sum: { $cond: [{ $eq: ['$trend', 'Outdated'] }, 1, 0] }
          },
          avgRating: { $avg: '$starRating' },
          avgConfidence: { $avg: '$confidenceScore' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        category,
        courses,
        stats: categoryStats[0] || {
          total: 0,
          trending: 0,
          outdated: 0,
          avgRating: 0,
          avgConfidence: 0
        }
      }
    });

  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses by category',
      error: error.message
    });
  }
});

module.exports = router;