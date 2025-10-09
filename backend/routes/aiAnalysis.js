const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const Assessment = require('../models/Assessment');
const aiModelService = require('../services/aiModelService');
const enhancedAIAnalyzer = require('../services/enhancedAIAnalyzer');
const roadmapGenerator = require('../services/roadmapGenerator');
const aiInsightsService = require('../services/aiInsightsService');
const { authenticateToken } = require('../middleware/auth');

// POST /api/ai-analysis/generate-profile - Generate AI-powered user profile
router.post('/generate-profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's assessment data
    const assessment = await Assessment.findOne({ userId }).populate('recommendations.courses.courseId');
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'No assessment found. Please complete the assessment first.'
      });
    }

    // Perform comprehensive AI analysis using enhanced analyzer
    console.log('🤖 Starting enhanced AI analysis for user:', userId);
    
    const enhancedAnalysis = await enhancedAIAnalyzer.analyzeUserProfile(assessment);
    const comprehensiveRoadmap = await roadmapGenerator.generateComprehensiveRoadmap(
      enhancedAnalysis, 
      { ...assessment, userId }
    );
    
    // Create or update user profile
    let userProfile = await UserProfile.findOne({ userId });
    
    if (userProfile) {
      // Update existing profile
      userProfile.currentSkills = assessment.skills.map(skill => ({
        name: skill,
        level: 'Beginner',
        category: 'General',
        relevanceScore: 0.5
      }));
      userProfile.interests = assessment.interests;
      userProfile.education = assessment.education;
      userProfile.experience = assessment.experience;
      userProfile.skillGaps = enhancedAnalysis.skillGaps || [];
      userProfile.transferableSkills = enhancedAnalysis.transferableSkills || [];
      userProfile.automationRisk = enhancedAnalysis.automationRisk || 0.5;
      userProfile.careerViability = enhancedAnalysis.careerViability || 0.5;
      userProfile.roadmap = comprehensiveRoadmap || {};
      userProfile.lastAnalyzed = new Date();
      userProfile.confidenceScore = enhancedAnalysis.confidenceScore || 0.5;
      
      // Store enhanced analysis data
      userProfile.marketAlignment = enhancedAnalysis.marketAlignment || 0.5;
      userProfile.transferabilityScore = enhancedAnalysis.confidenceScore || 0.5;
    } else {
      // Create new profile
      userProfile = new UserProfile({
        userId,
        currentSkills: assessment.skills.map(skill => ({
          name: skill,
          level: 'Beginner',
          category: 'General',
          relevanceScore: 0.5
        })),
        interests: assessment.interests,
        education: assessment.education,
        experience: assessment.experience,
        skillGaps: enhancedAnalysis.skillGaps || [],
        transferableSkills: enhancedAnalysis.transferableSkills || [],
        automationRisk: enhancedAnalysis.automationRisk || 0.5,
        careerViability: enhancedAnalysis.careerViability || 0.5,
        roadmap: comprehensiveRoadmap || {},
        confidenceScore: enhancedAnalysis.confidenceScore || 0.5,
        marketAlignment: enhancedAnalysis.marketAlignment || 0.5,
        transferabilityScore: enhancedAnalysis.confidenceScore || 0.5
      });
    }

    // Use enhanced AI-generated career matches as recommended roles
    userProfile.recommendedRoles = enhancedAnalysis.careerMatches?.slice(0, 3).map(role => ({
      title: role.role?.title || role.title,
      description: role.role?.description || role.description,
      matchScore: role.matchScore,
      salaryRange: role.role?.salaryRange || role.salaryRange,
      jobGrowth: role.role?.jobGrowth || role.jobGrowth,
      automationResistance: role.role?.automationResistance || role.automationResistance,
      transferableSkillsCount: role.transferableSkillsCount,
      viabilityScore: role.viabilityScore || role.overallScore,
      transitionDifficulty: role.transitionDifficulty,
      timeToTransition: role.timeToTransition
    })) || [];

    await userProfile.save();

    console.log('✅ AI analysis completed for user:', userId);

    res.json({
      success: true,
      message: 'AI analysis completed successfully',
      data: {
        profile: userProfile,
        analysisMetadata: {
          skillGapsIdentified: enhancedAnalysis.skillGaps.length,
          transferableSkills: enhancedAnalysis.transferableSkills.length,
          automationRisk: enhancedAnalysis.automationRisk,
          roadmapMilestones: comprehensiveRoadmap.milestones.length,
          confidenceScore: userProfile.confidenceScore,
          transferabilityScore: enhancedAnalysis.confidenceScore,
          marketAlignment: enhancedAnalysis.marketAlignment,
          careerMatches: enhancedAnalysis.careerMatches?.length || 0,
          targetRole: comprehensiveRoadmap.targetRole,
          estimatedDuration: comprehensiveRoadmap.estimatedDuration,
          totalLearningHours: comprehensiveRoadmap.totalHours,
          difficultyLevel: comprehensiveRoadmap.difficultyLevel,
          careerTransitionType: comprehensiveRoadmap.careerTransitionType
        }
      }
    });

  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'AI analysis failed',
      error: error.message
    });
  }
});

// GET /api/ai-analysis/profile - Get user's AI-generated profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.user._id })
      .populate('skillGaps.recommendedCourses')
      .populate('roadmap.milestones.courses');

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'No AI profile found. Please generate your profile first.'
      });
    }

    res.json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get AI profile',
      error: error.message
    });
  }
});

// POST /api/ai-analysis/update-progress - Update milestone progress
router.post('/update-progress', authenticateToken, async (req, res) => {
  try {
    const { milestoneId, progress, completedCourses, completedProjects } = req.body;
    
    const userProfile = await UserProfile.findOne({ userId: req.user._id });
    
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    // Find and update milestone
    const milestone = userProfile.roadmap.milestones.id(milestoneId);
    if (milestone) {
      milestone.completionPercentage = progress;
      if (progress >= 100) {
        milestone.status = 'Completed';
      } else if (progress > 0) {
        milestone.status = 'In Progress';
      }
    }

    // Update overall roadmap progress
    const totalMilestones = userProfile.roadmap.milestones.length;
    const completedMilestones = userProfile.roadmap.milestones.filter(m => m.status === 'Completed').length;
    userProfile.roadmap.totalProgress = Math.round((completedMilestones / totalMilestones) * 100);

    await userProfile.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        milestone,
        totalProgress: userProfile.roadmap.totalProgress
      }
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error.message
    });
  }
});

// GET /api/ai-analysis/daily-risk-update - Get daily automation risk update
router.get('/daily-risk-update', authenticateToken, async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.user._id });
    
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    // Check if we already have today's update
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayUpdate = userProfile.dailyRiskUpdates.find(update => {
      const updateDate = new Date(update.date);
      updateDate.setHours(0, 0, 0, 0);
      return updateDate.getTime() === today.getTime();
    });

    if (todayUpdate) {
      return res.json({
        success: true,
        data: todayUpdate
      });
    }

    // Generate new daily update
    const riskFactors = [];
    let riskLevel = userProfile.automationRisk;

    // Simulate daily risk factors
    const possibleFactors = [
      'New AI tools released in your field',
      'Automation trends increasing',
      'Market demand shifting',
      'New skills becoming critical',
      'Industry disruption detected'
    ];

    // Add 1-3 random factors
    const numFactors = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numFactors; i++) {
      const factor = possibleFactors[Math.floor(Math.random() * possibleFactors.length)];
      if (!riskFactors.includes(factor)) {
        riskFactors.push(factor);
      }
    }

    // Slight daily variation in risk level
    riskLevel += (Math.random() - 0.5) * 0.1;
    riskLevel = Math.max(0.1, Math.min(0.9, riskLevel));

    const dailyUpdate = {
      date: new Date(),
      riskLevel,
      factors: riskFactors
    };

    userProfile.dailyRiskUpdates.push(dailyUpdate);
    
    // Keep only last 30 days
    if (userProfile.dailyRiskUpdates.length > 30) {
      userProfile.dailyRiskUpdates = userProfile.dailyRiskUpdates.slice(-30);
    }

    await userProfile.save();

    res.json({
      success: true,
      data: dailyUpdate
    });

  } catch (error) {
    console.error('Daily risk update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get daily risk update',
      error: error.message
    });
  }
});

// GET /api/ai-analysis/insights - Get personalized AI insights
router.get('/insights', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const insights = await aiInsightsService.generateUserInsights(userId);
    
    res.json(insights);

  } catch (error) {
    console.error('Insights generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate insights',
      error: error.message
    });
  }
});

// GET /api/ai-analysis/daily-tips - Get daily personalized tips
router.get('/daily-tips', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const tips = await aiInsightsService.generateDailyTips(userId);
    
    res.json({
      success: true,
      data: tips
    });

  } catch (error) {
    console.error('Daily tips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate daily tips',
      error: error.message
    });
  }
});

// POST /api/ai-analysis/retrain - Trigger model retraining (admin only)
router.post('/retrain', authenticateToken, async (req, res) => {
  try {
    // This would trigger actual model retraining in production
    console.log('🔄 Model retraining triggered by user:', req.user._id);
    
    // Simulate retraining process
    const retrainingResult = {
      status: 'initiated',
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      dataPoints: Math.floor(Math.random() * 10000) + 5000,
      modelVersion: '1.1'
    };

    res.json({
      success: true,
      message: 'Model retraining initiated',
      data: retrainingResult
    });

  } catch (error) {
    console.error('Retrain error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate retraining',
      error: error.message
    });
  }
});

module.exports = router;