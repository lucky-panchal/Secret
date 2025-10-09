const UserProfile = require('../models/UserProfile');
const Course = require('../models/Course');

class AIInsightsService {
  constructor() {
    this.insightGenerators = this.initializeInsightGenerators();
  }

  // Generate comprehensive AI insights for user
  async generateUserInsights(userId) {
    try {
      const userProfile = await UserProfile.findOne({ userId })
        .populate('skillGaps.recommendedCourses')
        .populate('roadmap.milestones.courses');

      if (!userProfile) {
        return { success: false, message: 'User profile not found' };
      }

      const insights = {
        careerInsights: await this.generateCareerInsights(userProfile),
        learningInsights: await this.generateLearningInsights(userProfile),
        marketInsights: await this.generateMarketInsights(userProfile),
        progressInsights: await this.generateProgressInsights(userProfile),
        recommendationInsights: await this.generateRecommendationInsights(userProfile)
      };

      return { success: true, data: insights };

    } catch (error) {
      console.error('Error generating user insights:', error);
      return { success: false, message: 'Failed to generate insights' };
    }
  }

  // Generate career-specific insights
  async generateCareerInsights(userProfile) {
    const { roadmap, automationRisk, careerViability, recommendedRoles } = userProfile;

    const insights = [];

    // Career viability insights
    if (careerViability > 0.8) {
      insights.push({
        type: 'positive',
        category: 'career_viability',
        title: 'Excellent Career Prospects',
        message: 'Your skills align perfectly with future market demands. You\'re well-positioned for long-term career success.',
        actionable: false,
        priority: 'high'
      });
    } else if (careerViability < 0.5) {
      insights.push({
        type: 'warning',
        category: 'career_viability',
        title: 'Career Transition Recommended',
        message: 'Consider pivoting to more future-proof roles. Our AI has identified several high-potential career paths for you.',
        actionable: true,
        action: 'View recommended career paths',
        priority: 'critical'
      });
    }

    // Automation risk insights
    if (automationRisk > 0.7) {
      insights.push({
        type: 'critical',
        category: 'automation_risk',
        title: 'High Automation Risk Detected',
        message: 'Your current skills face significant automation threats. Immediate reskilling is recommended.',
        actionable: true,
        action: 'Start AI-resistant skill development',
        priority: 'critical'
      });
    } else if (automationRisk < 0.3) {
      insights.push({
        type: 'positive',
        category: 'automation_risk',
        title: 'Future-Proof Skills',
        message: 'Your skills are highly resistant to automation. Focus on deepening your expertise.',
        actionable: false,
        priority: 'low'
      });
    }

    // Target role insights
    if (roadmap?.targetRole) {
      const targetRoleInsight = this.generateTargetRoleInsight(roadmap, recommendedRoles);
      if (targetRoleInsight) insights.push(targetRoleInsight);
    }

    return insights;
  }

  // Generate learning-specific insights
  async generateLearningInsights(userProfile) {
    const { roadmap, skillGaps, transferableSkills } = userProfile;
    const insights = [];

    // Learning efficiency insights
    if (transferableSkills && transferableSkills.length > 0) {
      const highTransferSkills = transferableSkills.filter(skill => 
        skill.transferScore > 0.7
      ).length;

      if (highTransferSkills > 0) {
        insights.push({
          type: 'positive',
          category: 'learning_efficiency',
          title: 'Accelerated Learning Path Available',
          message: `You have ${highTransferSkills} skills that can accelerate your learning by 40-60%. Focus on these quick wins first.`,
          actionable: true,
          action: 'View transferable skills',
          priority: 'medium'
        });
      }
    }

    // Skill gap priority insights
    if (skillGaps && skillGaps.length > 0) {
      const criticalGaps = skillGaps.filter(gap => gap.priority === 'Critical').length;
      const totalLearningTime = skillGaps.reduce((total, gap) => 
        total + (gap.estimatedLearningTime || 0), 0
      );

      if (criticalGaps > 3) {
        insights.push({
          type: 'warning',
          category: 'skill_gaps',
          title: 'Focus Required on Critical Skills',
          message: `You have ${criticalGaps} critical skill gaps. Prioritize these for maximum career impact.`,
          actionable: true,
          action: 'View critical skills',
          priority: 'high'
        });
      }

      if (totalLearningTime > 500) {
        insights.push({
          type: 'info',
          category: 'learning_time',
          title: 'Comprehensive Learning Journey',
          message: `Your learning path requires ~${Math.round(totalLearningTime)} hours. Consider a structured approach over 6-12 months.`,
          actionable: true,
          action: 'Optimize learning schedule',
          priority: 'medium'
        });
      }
    }

    // Progress insights
    if (roadmap?.totalProgress !== undefined) {
      const progressInsight = this.generateProgressInsight(roadmap.totalProgress);
      if (progressInsight) insights.push(progressInsight);
    }

    return insights;
  }

  // Generate market-specific insights
  async generateMarketInsights(userProfile) {
    const { marketAlignment, transferableSkills, skillGaps } = userProfile;
    const insights = [];

    // Market alignment insights
    if (marketAlignment > 0.8) {
      insights.push({
        type: 'positive',
        category: 'market_alignment',
        title: 'Strong Market Position',
        message: 'Your skills are in high demand. Consider premium positioning and salary negotiations.',
        actionable: true,
        action: 'View salary insights',
        priority: 'medium'
      });
    } else if (marketAlignment < 0.4) {
      insights.push({
        type: 'warning',
        category: 'market_alignment',
        title: 'Market Realignment Needed',
        message: 'Your current skills have limited market demand. Focus on trending technologies.',
        actionable: true,
        action: 'View trending skills',
        priority: 'high'
      });
    }

    // Trending skills insights
    const trendingSkillsNeeded = skillGaps?.filter(gap => 
      gap.marketDemand === 'Very High' || gap.marketDemand === 'High'
    ).length || 0;

    if (trendingSkillsNeeded > 0) {
      insights.push({
        type: 'opportunity',
        category: 'trending_skills',
        title: 'High-Demand Skills Identified',
        message: `${trendingSkillsNeeded} of your target skills are in very high market demand. Prioritize these for maximum ROI.`,
        actionable: true,
        action: 'View high-demand skills',
        priority: 'high'
      });
    }

    // Salary potential insights
    const salaryInsight = await this.generateSalaryInsight(userProfile);
    if (salaryInsight) insights.push(salaryInsight);

    return insights;
  }

  // Generate progress-specific insights
  async generateProgressInsights(userProfile) {
    const { roadmap, lastAnalyzed } = userProfile;
    const insights = [];

    // Milestone progress insights
    if (roadmap?.milestones) {
      const completedMilestones = roadmap.milestones.filter(m => m.status === 'Completed').length;
      const inProgressMilestones = roadmap.milestones.filter(m => m.status === 'In Progress').length;
      const totalMilestones = roadmap.milestones.length;

      if (completedMilestones === 0 && totalMilestones > 0) {
        insights.push({
          type: 'info',
          category: 'getting_started',
          title: 'Ready to Begin Your Journey',
          message: 'Your personalized roadmap is ready. Start with the first milestone to build momentum.',
          actionable: true,
          action: 'Start first milestone',
          priority: 'high'
        });
      } else if (completedMilestones > 0) {
        const completionRate = (completedMilestones / totalMilestones) * 100;
        
        if (completionRate >= 75) {
          insights.push({
            type: 'positive',
            category: 'progress',
            title: 'Excellent Progress!',
            message: `You've completed ${Math.round(completionRate)}% of your roadmap. You're almost ready for your target role!`,
            actionable: true,
            action: 'Prepare for job applications',
            priority: 'medium'
          });
        } else if (completionRate >= 50) {
          insights.push({
            type: 'positive',
            category: 'progress',
            title: 'Great Momentum',
            message: `You're halfway through your journey (${Math.round(completionRate)}% complete). Keep up the excellent work!`,
            actionable: false,
            priority: 'low'
          });
        }
      }

      // Stalled progress detection
      if (inProgressMilestones > 0 && lastAnalyzed) {
        const daysSinceUpdate = Math.floor((new Date() - new Date(lastAnalyzed)) / (1000 * 60 * 60 * 24));
        
        if (daysSinceUpdate > 14) {
          insights.push({
            type: 'warning',
            category: 'stalled_progress',
            title: 'Learning Momentum at Risk',
            message: `It's been ${daysSinceUpdate} days since your last update. Consider resuming your learning journey.`,
            actionable: true,
            action: 'Resume learning',
            priority: 'medium'
          });
        }
      }
    }

    return insights;
  }

  // Generate recommendation-specific insights
  async generateRecommendationInsights(userProfile) {
    const { recommendedRoles, skillGaps, transferableSkills } = userProfile;
    const insights = [];

    // Multiple career path insights
    if (recommendedRoles && recommendedRoles.length > 1) {
      const topMatch = recommendedRoles[0];
      const secondMatch = recommendedRoles[1];
      
      if (topMatch.matchScore - secondMatch.matchScore < 0.1) {
        insights.push({
          type: 'opportunity',
          category: 'career_options',
          title: 'Multiple Strong Career Matches',
          message: `You have ${recommendedRoles.length} viable career paths with similar match scores. Consider exploring multiple options.`,
          actionable: true,
          action: 'Compare career paths',
          priority: 'medium'
        });
      }
    }

    // Skill leverage insights
    if (transferableSkills && skillGaps) {
      const leverageRatio = transferableSkills.length / (skillGaps.length || 1);
      
      if (leverageRatio > 1.5) {
        insights.push({
          type: 'positive',
          category: 'skill_leverage',
          title: 'Strong Skill Foundation',
          message: 'You have more transferable skills than gaps to fill. This suggests a smooth career transition.',
          actionable: false,
          priority: 'low'
        });
      } else if (leverageRatio < 0.5) {
        insights.push({
          type: 'info',
          category: 'skill_leverage',
          title: 'Significant Learning Opportunity',
          message: 'Your target role requires substantial new learning. Consider a gradual transition approach.',
          actionable: true,
          action: 'View transition strategies',
          priority: 'medium'
        });
      }
    }

    return insights;
  }

  // Helper methods for specific insight generation
  generateTargetRoleInsight(roadmap, recommendedRoles) {
    const targetRole = recommendedRoles?.find(role => role.title === roadmap.targetRole);
    
    if (targetRole) {
      if (targetRole.matchScore > 0.8) {
        return {
          type: 'positive',
          category: 'target_role',
          title: 'Perfect Role Match',
          message: `${roadmap.targetRole} is an excellent fit (${Math.round(targetRole.matchScore * 100)}% match). Focus on skill development for this path.`,
          actionable: false,
          priority: 'low'
        };
      } else if (targetRole.matchScore < 0.6) {
        return {
          type: 'warning',
          category: 'target_role',
          title: 'Consider Alternative Paths',
          message: `Your current target role has a ${Math.round(targetRole.matchScore * 100)}% match. Consider exploring higher-match alternatives.`,
          actionable: true,
          action: 'View alternative roles',
          priority: 'medium'
        };
      }
    }
    
    return null;
  }

  generateProgressInsight(totalProgress) {
    if (totalProgress === 0) {
      return {
        type: 'info',
        category: 'getting_started',
        title: 'Your Journey Awaits',
        message: 'Ready to transform your career? Start with your first learning milestone today.',
        actionable: true,
        action: 'Begin learning',
        priority: 'high'
      };
    } else if (totalProgress >= 90) {
      return {
        type: 'positive',
        category: 'near_completion',
        title: 'Almost There!',
        message: 'You\'re 90%+ complete! Time to start applying for your target roles.',
        actionable: true,
        action: 'Start job search',
        priority: 'high'
      };
    } else if (totalProgress >= 50) {
      return {
        type: 'positive',
        category: 'midpoint',
        title: 'Halfway Milestone Achieved',
        message: 'Great progress! You\'re building solid momentum toward your career goals.',
        actionable: false,
        priority: 'low'
      };
    }
    
    return null;
  }

  async generateSalaryInsight(userProfile) {
    const { recommendedRoles, roadmap } = userProfile;
    
    if (recommendedRoles && recommendedRoles.length > 0) {
      const targetRole = recommendedRoles[0];
      
      // Extract salary range if available
      if (targetRole.salaryRange) {
        const salaryMatch = targetRole.salaryRange.match(/\$(\d+),?(\d+)?\s*-\s*\$(\d+),?(\d+)?/);
        
        if (salaryMatch) {
          const minSalary = parseInt(salaryMatch[1] + (salaryMatch[2] || '000'));
          const maxSalary = parseInt(salaryMatch[3] + (salaryMatch[4] || '000'));
          const avgSalary = (minSalary + maxSalary) / 2;
          
          if (avgSalary > 100000) {
            return {
              type: 'opportunity',
              category: 'salary_potential',
              title: 'High Earning Potential',
              message: `Your target role offers excellent compensation (${targetRole.salaryRange}). The investment in learning will pay off significantly.`,
              actionable: false,
              priority: 'medium'
            };
          }
        }
      }
    }
    
    return null;
  }

  // Generate daily personalized tips
  async generateDailyTips(userId) {
    try {
      const userProfile = await UserProfile.findOne({ userId });
      
      if (!userProfile) {
        return this.getGenericTips();
      }

      const tips = [];
      const { roadmap, skillGaps, transferableSkills, automationRisk } = userProfile;

      // Learning tips based on current progress
      if (roadmap?.milestones) {
        const activeMilestone = roadmap.milestones.find(m => m.status === 'In Progress');
        
        if (activeMilestone) {
          tips.push({
            type: 'learning',
            title: 'Today\'s Focus',
            message: `Continue working on "${activeMilestone.title}". Dedicate 30 minutes today to make progress.`,
            action: 'View milestone details'
          });
        } else {
          const nextMilestone = roadmap.milestones.find(m => m.status === 'Not Started');
          
          if (nextMilestone) {
            tips.push({
              type: 'motivation',
              title: 'Ready for the Next Step?',
              message: `Start "${nextMilestone.title}" today. Small consistent steps lead to big achievements.`,
              action: 'Start milestone'
            });
          }
        }
      }

      // Skill-specific tips
      if (transferableSkills && transferableSkills.length > 0) {
        const quickWinSkill = transferableSkills.find(skill => 
          skill.learningEffort === 'Low' && skill.marketDemand === 'High'
        );
        
        if (quickWinSkill) {
          tips.push({
            type: 'opportunity',
            title: 'Quick Win Opportunity',
            message: `Your ${quickWinSkill.originalSkill} can easily transfer to ${quickWinSkill.transfersTo[0]}. This could boost your profile quickly.`,
            action: 'Learn more'
          });
        }
      }

      // Automation awareness tips
      if (automationRisk > 0.6) {
        tips.push({
          type: 'urgent',
          title: 'Stay Ahead of Automation',
          message: 'Focus on developing uniquely human skills like creativity, emotional intelligence, and strategic thinking.',
          action: 'View AI-resistant skills'
        });
      }

      return tips.length > 0 ? tips : this.getGenericTips();

    } catch (error) {
      console.error('Error generating daily tips:', error);
      return this.getGenericTips();
    }
  }

  getGenericTips() {
    const tips = [
      {
        type: 'learning',
        title: 'Consistent Learning',
        message: 'Dedicate at least 30 minutes daily to skill development. Consistency beats intensity.',
        action: 'Set learning reminder'
      },
      {
        type: 'career',
        title: 'Network Building',
        message: 'Connect with one professional in your target field today. Networking opens doors.',
        action: 'Find professionals'
      },
      {
        type: 'motivation',
        title: 'Progress Tracking',
        message: 'Document your learning journey. Seeing progress motivates continued effort.',
        action: 'Update progress'
      }
    ];

    return [tips[Math.floor(Math.random() * tips.length)]];
  }

  // Initialize insight generators
  initializeInsightGenerators() {
    return {
      careerViability: this.generateCareerViabilityInsights,
      automationRisk: this.generateAutomationRiskInsights,
      marketAlignment: this.generateMarketAlignmentInsights,
      learningProgress: this.generateLearningProgressInsights,
      skillGaps: this.generateSkillGapInsights
    };
  }
}

module.exports = new AIInsightsService();