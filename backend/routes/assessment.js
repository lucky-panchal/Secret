const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const Course = require('../models/Course');
const { authenticateToken } = require('../middleware/auth');

// POST /api/assessment - Save user assessment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { skills, interests, education, experience } = req.body;
    const userId = req.user._id;

    // Check if user already has an assessment
    let assessment = await Assessment.findOne({ userId });

    if (assessment) {
      // Update existing assessment
      assessment.skills = skills || [];
      assessment.interests = interests || [];
      assessment.education = education || '';
      assessment.experience = experience || '';
      assessment.completedAt = new Date();
    } else {
      // Create new assessment
      assessment = new Assessment({
        userId,
        skills: skills || [],
        interests: interests || [],
        education: education || '',
        experience: experience || ''
      });
    }

    await assessment.save();

    // Generate course recommendations
    const recommendations = await generateRecommendations(assessment);
    assessment.recommendations = recommendations;
    await assessment.save();

    res.json({
      success: true,
      message: 'Assessment saved successfully',
      data: {
        assessment,
        recommendations
      }
    });

  } catch (error) {
    console.error('Save assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save assessment',
      error: error.message
    });
  }
});

// GET /api/assessment - Get user's assessment
router.get('/', authenticateToken, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ userId: req.user._id })
      .populate('recommendations.courses.courseId');

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'No assessment found'
      });
    }

    res.json({
      success: true,
      data: assessment
    });

  } catch (error) {
    console.error('Get assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assessment',
      error: error.message
    });
  }
});

// Generate course recommendations based on assessment
async function generateRecommendations(assessment) {
  try {
    const { skills, interests, education, experience } = assessment;
    
    // Get all active courses
    const courses = await Course.find({ status: 'active' }).limit(100);
    
    const recommendations = {
      courses: [],
      learningPath: [],
      generatedAt: new Date()
    };

    // Simple recommendation algorithm
    for (const course of courses) {
      let relevanceScore = 0;
      let reasons = [];

      // Check skill matches
      const courseTitle = course.courseTitle.toLowerCase();
      const courseCategory = course.courseCategory.toLowerCase();
      
      skills.forEach(skill => {
        const skillLower = skill.toLowerCase();
        if (courseTitle.includes(skillLower) || courseCategory.includes(skillLower)) {
          relevanceScore += 0.3;
          reasons.push(`Matches your ${skill} skills`);
        }
      });

      // Check interest matches
      interests.forEach(interest => {
        const interestLower = interest.toLowerCase();
        if (courseTitle.includes(interestLower) || courseCategory.includes(interestLower)) {
          relevanceScore += 0.2;
          reasons.push(`Aligns with your interest in ${interest}`);
        }
      });

      // Boost trending courses
      if (course.trend === 'Trending') {
        relevanceScore += 0.2;
        reasons.push('Currently trending in the market');
      }

      // Boost high-demand courses
      if (course.courseDemand === 'High') {
        relevanceScore += 0.1;
        reasons.push('High market demand');
      }

      // Add course if relevant
      if (relevanceScore > 0.2) {
        recommendations.courses.push({
          courseId: course._id,
          relevanceScore: Math.min(relevanceScore, 1),
          reason: reasons.join(', ')
        });
      }
    }

    // Sort by relevance score
    recommendations.courses.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Keep top 10 recommendations
    recommendations.courses = recommendations.courses.slice(0, 10);

    // Generate learning path
    recommendations.learningPath = generateLearningPath(skills, interests, experience);

    return recommendations;

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      courses: [],
      learningPath: [],
      generatedAt: new Date()
    };
  }
}

// Generate learning path based on assessment
function generateLearningPath(skills, interests, experience) {
  const path = [];
  
  // Determine starting level
  const isBeginnerLevel = experience === 'No experience' || experience === 'Less than 1 year';
  
  if (isBeginnerLevel) {
    path.push({
      step: 1,
      title: 'Foundation Building',
      description: 'Start with programming fundamentals and basic concepts',
      estimatedDuration: '2-3 months',
      skills: ['Programming Basics', 'Problem Solving', 'Logic Building']
    });
  }

  // Add AI/ML specific path if interested
  if (interests.some(i => i.toLowerCase().includes('ai') || i.toLowerCase().includes('machine learning'))) {
    path.push({
      step: path.length + 1,
      title: 'AI/ML Fundamentals',
      description: 'Learn machine learning algorithms and data science basics',
      estimatedDuration: '3-4 months',
      skills: ['Python', 'Statistics', 'Machine Learning', 'Data Analysis']
    });

    path.push({
      step: path.length + 1,
      title: 'Advanced AI/ML',
      description: 'Deep learning, neural networks, and specialized applications',
      estimatedDuration: '4-6 months',
      skills: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch']
    });
  }

  // Add blockchain path if interested
  if (interests.some(i => i.toLowerCase().includes('blockchain') || i.toLowerCase().includes('crypto'))) {
    path.push({
      step: path.length + 1,
      title: 'Blockchain Development',
      description: 'Smart contracts, DApps, and blockchain fundamentals',
      estimatedDuration: '3-4 months',
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'DApp Development']
    });
  }

  // Add practical application step
  path.push({
    step: path.length + 1,
    title: 'Project Portfolio',
    description: 'Build real-world projects to showcase your skills',
    estimatedDuration: '2-3 months',
    skills: ['Project Management', 'Portfolio Building', 'Industry Applications']
  });

  return path;
}

module.exports = router;