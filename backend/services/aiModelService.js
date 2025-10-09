const axios = require('axios');
const UserProfile = require('../models/UserProfile');
const Course = require('../models/Course');

class AIModelService {
  constructor() {
    this.huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
    this.jinaApiKey = process.env.JINA_API_KEY;
    this.modelEndpoint = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
  }

  // Phase 1: Enhanced Skill Gap Analysis with Transferability
  async analyzeSkillGaps(userAssessment, marketData) {
    try {
      const { skills, interests, education, experience } = userAssessment;
      
      console.log('🔍 Analyzing user profile:', { skills: skills?.length, interests: interests?.length, education, experience });
      
      // Get comprehensive market data
      const trendingSkills = await this.getTrendingSkills();
      const futureProofRoles = await this.getFutureProofRoles();
      const marketDemandData = await this.getMarketDemandData();
      
      // Analyze transferable skills first
      const transferabilityAnalysis = await this.analyzeSkillTransferability(skills, trendingSkills, marketDemandData);
      
      // Find best matching career paths based on transferable skills
      const careerMatches = await this.findOptimalCareerPaths(transferabilityAnalysis, interests, education, experience);
      
      // Generate skill gaps for top career match
      const topCareerMatch = careerMatches[0];
      const skillGaps = await this.generateSkillGaps(skills, topCareerMatch, trendingSkills, experience);
      
      // Calculate comprehensive scores
      const automationRisk = await this.calculateAutomationRisk(skills, interests);
      const careerViability = await this.calculateCareerViability(transferabilityAnalysis, marketDemandData);
      
      console.log('✅ Analysis complete:', {
        transferableSkills: transferabilityAnalysis.transferableSkills.length,
        skillGaps: skillGaps.length,
        topCareer: topCareerMatch?.title,
        automationRisk: automationRisk.toFixed(2)
      });
      
      return {
        skillGaps,
        transferableSkills: transferabilityAnalysis.transferableSkills,
        transferabilityScore: transferabilityAnalysis.overallScore,
        careerMatches,
        automationRisk,
        careerViability,
        marketAlignment: transferabilityAnalysis.marketAlignment
      };
      
    } catch (error) {
      console.error('Skill gap analysis error:', error);
      return this.getFallbackSkillAnalysis(userAssessment);
    }
  }

  // Phase 2: Advanced Personalized Roadmap Generation
  async generateReskillPathway(analysisResults, userAssessment) {
    try {
      const { careerMatches, skillGaps, transferableSkills, transferabilityScore } = analysisResults;
      const { skills, interests, education, experience } = userAssessment;
      
      console.log('🛤️ Generating personalized roadmap...');
      
      // Select optimal target role
      const targetRole = careerMatches[0];
      
      // Create adaptive learning path based on transferable skills
      const learningPath = await this.createAdaptiveLearningPath({
        targetRole,
        skillGaps,
        transferableSkills,
        userExperience: experience,
        userInterests: interests,
        transferabilityScore
      });
      
      // Generate timeline based on user's current skill level
      const timeline = this.generateRealisticTimeline(learningPath, experience, transferabilityScore);
      
      // Create detailed milestones with projects and assessments
      const detailedMilestones = await this.createDetailedMilestones(learningPath, timeline, targetRole);
      
      const roadmap = {
        targetRole: targetRole.title,
        targetRoleDescription: targetRole.description,
        matchScore: targetRole.matchScore,
        salaryRange: targetRole.salaryRange,
        jobGrowthRate: targetRole.jobGrowth,
        estimatedDuration: timeline.totalDuration,
        difficultyLevel: this.calculateDifficultyLevel(skillGaps, transferabilityScore),
        milestones: detailedMilestones,
        totalProgress: 0,
        transferableSkillsUsed: transferableSkills.length,
        newSkillsToLearn: skillGaps.length,
        careerTransitionType: this.determineTransitionType(transferabilityScore)
      };
      
      console.log('✅ Roadmap generated:', {
        targetRole: roadmap.targetRole,
        duration: roadmap.estimatedDuration,
        milestones: roadmap.milestones.length,
        difficulty: roadmap.difficultyLevel
      });
      
      return roadmap;
      
    } catch (error) {
      console.error('Pathway generation error:', error);
      return this.getFallbackPathway();
    }
  }

  // AI-Powered Skill Similarity Calculation
  calculateSkillSimilarity(skill1, skill2) {
    // Simple similarity for now - can be enhanced with embeddings
    const s1 = skill1.toLowerCase();
    const s2 = skill2.toLowerCase();
    
    if (s1 === s2) return 1.0;
    if (s1.includes(s2) || s2.includes(s1)) return 0.8;
    
    // Check for related terms
    const relatedTerms = {
      'javascript': ['js', 'node', 'react', 'vue'],
      'python': ['django', 'flask', 'pandas', 'numpy'],
      'machine learning': ['ml', 'ai', 'deep learning', 'neural networks'],
      'blockchain': ['crypto', 'web3', 'smart contracts', 'defi']
    };
    
    for (const [key, terms] of Object.entries(relatedTerms)) {
      if ((s1.includes(key) && terms.some(t => s2.includes(t))) ||
          (s2.includes(key) && terms.some(t => s1.includes(t)))) {
        return 0.7;
      }
    }
    
    return 0.0;
  }

  // Calculate skill priority based on market trends
  calculateSkillPriority(skill, trendingSkills) {
    const skillLower = skill.toLowerCase();
    
    if (trendingSkills.some(ts => skillLower.includes(ts.toLowerCase()))) {
      return 'Critical';
    }
    
    const highPrioritySkills = ['ai', 'machine learning', 'blockchain', 'cloud', 'cybersecurity'];
    if (highPrioritySkills.some(hps => skillLower.includes(hps))) {
      return 'High';
    }
    
    return 'Medium';
  }

  // Estimate learning time based on skill complexity and user experience
  estimateLearningTime(skill, experience) {
    const baseHours = {
      'beginner': 80,
      'intermediate': 60,
      'advanced': 40
    };
    
    const skillComplexity = {
      'machine learning': 120,
      'blockchain': 100,
      'cloud computing': 80,
      'web development': 60,
      'data analysis': 70
    };
    
    const experienceLevel = experience?.toLowerCase() || 'beginner';
    const base = baseHours[experienceLevel] || 80;
    
    const skillLower = skill.toLowerCase();
    for (const [skillType, hours] of Object.entries(skillComplexity)) {
      if (skillLower.includes(skillType)) {
        return Math.round(hours * (base / 80));
      }
    }
    
    return base;
  }

  // Find relevant courses for a skill
  async findRelevantCourses(skill) {
    try {
      const courses = await Course.find({
        $or: [
          { courseTitle: { $regex: skill, $options: 'i' } },
          { courseDescription: { $regex: skill, $options: 'i' } },
          { courseCategory: { $regex: skill, $options: 'i' } }
        ],
        status: 'active',
        trend: { $in: ['Trending', 'Stable'] }
      })
      .sort({ confidenceScore: -1, starRating: -1 })
      .limit(3);
      
      return courses.map(c => c._id);
    } catch (error) {
      console.error('Course finding error:', error);
      return [];
    }
  }

  // Calculate automation risk using AI analysis
  async calculateAutomationRisk(skills, interests) {
    const highRiskSkills = ['data entry', 'customer service', 'bookkeeping', 'telemarketing'];
    const lowRiskSkills = ['ai', 'machine learning', 'creative', 'leadership', 'strategy'];
    
    let riskScore = 0.5; // baseline
    
    skills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      
      if (highRiskSkills.some(hrs => skillLower.includes(hrs))) {
        riskScore += 0.2;
      }
      
      if (lowRiskSkills.some(lrs => skillLower.includes(lrs))) {
        riskScore -= 0.2;
      }
    });
    
    return Math.max(0.1, Math.min(0.9, riskScore));
  }

  // Get trending skills from market data
  async getTrendingSkills() {
    try {
      const trendingCourses = await Course.find({ 
        trend: 'Trending',
        status: 'active'
      }).limit(50);
      
      const skillFrequency = {};
      
      trendingCourses.forEach(course => {
        const title = course.courseTitle.toLowerCase();
        const category = course.courseCategory.toLowerCase();
        
        // Extract skills from title and category
        const skills = [...title.split(' '), category];
        skills.forEach(skill => {
          if (skill.length > 2) {
            skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
          }
        });
      });
      
      return Object.entries(skillFrequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 20)
        .map(([skill]) => skill);
        
    } catch (error) {
      console.error('Trending skills error:', error);
      return ['ai', 'machine learning', 'blockchain', 'cloud', 'cybersecurity'];
    }
  }

  // Get comprehensive future-proof roles with detailed requirements
  async getFutureProofRoles() {
    return [
      {
        title: 'AI/ML Engineer',
        description: 'Design and implement machine learning systems and AI solutions',
        requiredSkills: ['python', 'machine learning', 'tensorflow', 'pytorch', 'data analysis', 'statistics'],
        transferableFrom: ['programming', 'mathematics', 'data analysis', 'software development'],
        automationResistance: 0.95,
        marketDemand: 'Very High',
        salaryRange: '$120,000 - $200,000',
        jobGrowth: '22% (Much faster than average)',
        industries: ['Technology', 'Healthcare', 'Finance', 'Automotive']
      },
      {
        title: 'Blockchain Developer',
        description: 'Build decentralized applications and smart contract systems',
        requiredSkills: ['solidity', 'web3', 'smart contracts', 'javascript', 'cryptography', 'ethereum'],
        transferableFrom: ['web development', 'javascript', 'programming', 'software engineering'],
        automationResistance: 0.90,
        marketDemand: 'Very High',
        salaryRange: '$100,000 - $180,000',
        jobGrowth: '35% (Much faster than average)',
        industries: ['Cryptocurrency', 'Finance', 'Gaming', 'Supply Chain']
      },
      {
        title: 'Cloud Solutions Architect',
        description: 'Design and oversee cloud computing strategies and implementations',
        requiredSkills: ['aws', 'azure', 'kubernetes', 'devops', 'microservices', 'containerization'],
        transferableFrom: ['system administration', 'networking', 'software architecture', 'devops'],
        automationResistance: 0.85,
        marketDemand: 'Very High',
        salaryRange: '$130,000 - $220,000',
        jobGrowth: '25% (Much faster than average)',
        industries: ['Technology', 'Enterprise', 'Startups', 'Government']
      },
      {
        title: 'Cybersecurity Specialist',
        description: 'Protect organizations from cyber threats and security breaches',
        requiredSkills: ['security', 'penetration testing', 'risk assessment', 'incident response', 'compliance'],
        transferableFrom: ['networking', 'system administration', 'risk management', 'it support'],
        automationResistance: 0.88,
        marketDemand: 'Very High',
        salaryRange: '$95,000 - $160,000',
        jobGrowth: '31% (Much faster than average)',
        industries: ['All Industries', 'Government', 'Healthcare', 'Finance']
      },
      {
        title: 'Data Scientist',
        description: 'Extract insights from complex data to drive business decisions',
        requiredSkills: ['python', 'r', 'statistics', 'machine learning', 'sql', 'data visualization'],
        transferableFrom: ['mathematics', 'statistics', 'research', 'analytics', 'programming'],
        automationResistance: 0.82,
        marketDemand: 'High',
        salaryRange: '$110,000 - $170,000',
        jobGrowth: '22% (Much faster than average)',
        industries: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing']
      },
      {
        title: 'DevOps Engineer',
        description: 'Bridge development and operations to improve software delivery',
        requiredSkills: ['docker', 'kubernetes', 'ci/cd', 'automation', 'monitoring', 'scripting'],
        transferableFrom: ['system administration', 'software development', 'networking', 'scripting'],
        automationResistance: 0.80,
        marketDemand: 'High',
        salaryRange: '$100,000 - $150,000',
        jobGrowth: '20% (Much faster than average)',
        industries: ['Technology', 'Startups', 'Enterprise', 'E-commerce']
      }
    ];
  }

  // Identify best target role for user
  async identifyTargetRole(userProfile) {
    const futureProofRoles = await this.getFutureProofRoles();
    const userSkills = userProfile.currentSkills || [];
    
    let bestMatch = futureProofRoles[0];
    let highestScore = 0;
    
    for (const role of futureProofRoles) {
      let matchScore = 0;
      const requiredSkills = role.requiredSkills || [];
      
      for (const requiredSkill of requiredSkills) {
        const hasSkill = userSkills.some(userSkill => 
          this.calculateSkillSimilarity(userSkill.name || userSkill, requiredSkill) > 0.6
        );
        if (hasSkill) matchScore += 1;
      }
      
      matchScore = matchScore / requiredSkills.length;
      
      if (matchScore > highestScore) {
        highestScore = matchScore;
        bestMatch = { ...role, matchScore };
      }
    }
    
    return bestMatch;
  }

  // Create learning milestones
  async createLearningMilestones(skillGaps, targetRole) {
    const milestones = [];
    const criticalGaps = skillGaps.filter(gap => gap.priority === 'Critical').slice(0, 3);
    const highGaps = skillGaps.filter(gap => gap.priority === 'High').slice(0, 4);
    
    // Milestone 1: Foundation
    if (criticalGaps.length > 0) {
      milestones.push({
        title: 'Foundation Skills',
        description: 'Master critical skills for your target role',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
        skills: criticalGaps.map(gap => gap.requiredSkill),
        courses: criticalGaps.flatMap(gap => gap.recommendedCourses),
        projects: ['Portfolio Setup', 'First Practice Project']
      });
    }
    
    // Milestone 2: Specialization
    if (highGaps.length > 0) {
      milestones.push({
        title: 'Specialization',
        description: 'Develop specialized skills in your chosen field',
        targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
        skills: highGaps.map(gap => gap.requiredSkill),
        courses: highGaps.flatMap(gap => gap.recommendedCourses),
        projects: ['Advanced Project', 'Industry Case Study']
      });
    }
    
    // Milestone 3: Mastery
    milestones.push({
      title: 'Professional Readiness',
      description: 'Achieve job-ready proficiency and build professional network',
      targetDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000), // 9 months
      skills: ['Professional Communication', 'Industry Networking'],
      courses: [],
      projects: ['Capstone Project', 'Open Source Contribution', 'Job Application Portfolio']
    });
    
    return milestones;
  }

  // Calculate total pathway duration
  calculateTotalDuration(milestones) {
    if (milestones.length === 0) return '3-6 months';
    
    const lastMilestone = milestones[milestones.length - 1];
    const monthsFromNow = Math.ceil((lastMilestone.targetDate - new Date()) / (30 * 24 * 60 * 60 * 1000));
    
    return `${Math.max(3, monthsFromNow - 1)}-${monthsFromNow} months`;
  }

  // Fallback methods for error cases
  getFallbackSkillAnalysis(userAssessment) {
    return {
      skillGaps: [
        {
          requiredSkill: 'Python Programming',
          currentLevel: 'None',
          targetLevel: 'Intermediate',
          priority: 'High',
          estimatedLearningTime: 80,
          recommendedCourses: []
        }
      ],
      transferableSkills: userAssessment.skills || [],
      automationRisk: 0.4,
      careerViability: 0.6
    };
  }

  // New AI methods for enhanced analysis
  
  // Analyze skill transferability to trending market skills
  async analyzeSkillTransferability(userSkills, trendingSkills, marketData) {
    const transferableSkills = [];
    const skillTransferMap = new Map();
    let totalTransferScore = 0;
    
    for (const userSkill of userSkills) {
      const transferAnalysis = await this.analyzeSkillTransfer(userSkill, trendingSkills, marketData);
      
      if (transferAnalysis.transferScore > 0.3) {
        transferableSkills.push({
          originalSkill: userSkill,
          transfersTo: transferAnalysis.targetSkills,
          transferScore: transferAnalysis.transferScore,
          marketDemand: transferAnalysis.marketDemand,
          learningEffort: transferAnalysis.learningEffort
        });
        
        totalTransferScore += transferAnalysis.transferScore;
        skillTransferMap.set(userSkill, transferAnalysis);
      }
    }
    
    const overallScore = userSkills.length > 0 ? totalTransferScore / userSkills.length : 0;
    
    return {
      transferableSkills,
      skillTransferMap,
      overallScore,
      marketAlignment: this.calculateMarketAlignment(transferableSkills, marketData)
    };
  }
  
  // Analyze individual skill transfer potential
  async analyzeSkillTransfer(userSkill, trendingSkills, marketData) {
    const skillLower = userSkill.toLowerCase();
    const targetSkills = [];
    let maxTransferScore = 0;
    let marketDemand = 'Medium';
    let learningEffort = 'Medium';
    
    // Define skill transfer mappings
    const transferMappings = {
      // Programming transfers
      'javascript': { transfersTo: ['react', 'node.js', 'typescript', 'web3'], score: 0.8, effort: 'Low' },
      'python': { transfersTo: ['machine learning', 'data science', 'ai', 'automation'], score: 0.9, effort: 'Low' },
      'java': { transfersTo: ['spring boot', 'microservices', 'android', 'enterprise'], score: 0.7, effort: 'Medium' },
      
      // Data & Analytics transfers
      'excel': { transfersTo: ['data analysis', 'sql', 'power bi', 'tableau'], score: 0.6, effort: 'Medium' },
      'sql': { transfersTo: ['data science', 'database administration', 'analytics'], score: 0.8, effort: 'Low' },
      'statistics': { transfersTo: ['data science', 'machine learning', 'research'], score: 0.9, effort: 'Low' },
      
      // Business & Management transfers
      'project management': { transfersTo: ['agile', 'scrum', 'product management'], score: 0.7, effort: 'Medium' },
      'marketing': { transfersTo: ['digital marketing', 'seo', 'social media'], score: 0.6, effort: 'Medium' },
      
      // Technical transfers
      'networking': { transfersTo: ['cloud computing', 'cybersecurity', 'devops'], score: 0.7, effort: 'Medium' },
      'system administration': { transfersTo: ['cloud architecture', 'devops', 'automation'], score: 0.8, effort: 'Medium' }
    };
    
    // Check direct transfers
    for (const [skill, mapping] of Object.entries(transferMappings)) {
      if (skillLower.includes(skill)) {
        targetSkills.push(...mapping.transfersTo);
        maxTransferScore = Math.max(maxTransferScore, mapping.score);
        learningEffort = mapping.effort;
        break;
      }
    }
    
    // Check trending skill alignment
    for (const trendingSkill of trendingSkills) {
      const similarity = this.calculateSkillSimilarity(userSkill, trendingSkill);
      if (similarity > 0.5) {
        targetSkills.push(trendingSkill);
        maxTransferScore = Math.max(maxTransferScore, similarity);
        marketDemand = 'High';
      }
    }
    
    return {
      targetSkills: [...new Set(targetSkills)],
      transferScore: maxTransferScore,
      marketDemand,
      learningEffort
    };
  }
  
  // Find optimal career paths based on transferable skills
  async findOptimalCareerPaths(transferabilityAnalysis, interests, education, experience) {
    const futureProofRoles = await this.getFutureProofRoles();
    const careerMatches = [];
    
    for (const role of futureProofRoles) {
      let matchScore = 0;
      let transferableCount = 0;
      let interestAlignment = 0;
      
      // Calculate skill match score
      for (const requiredSkill of role.requiredSkills) {
        // Check direct transferable skills
        const hasTransferableSkill = transferabilityAnalysis.transferableSkills.some(ts => 
          ts.transfersTo.some(target => 
            this.calculateSkillSimilarity(target, requiredSkill) > 0.6
          )
        );
        
        if (hasTransferableSkill) {
          transferableCount++;
          matchScore += 0.8; // High score for transferable skills
        }
        
        // Check transferable from categories
        const hasTransferableCategory = role.transferableFrom?.some(category => 
          transferabilityAnalysis.transferableSkills.some(ts => 
            this.calculateSkillSimilarity(ts.originalSkill, category) > 0.5
          )
        );
        
        if (hasTransferableCategory) {
          matchScore += 0.6;
        }
      }
      
      // Calculate interest alignment
      if (interests && interests.length > 0) {
        for (const interest of interests) {
          if (role.title.toLowerCase().includes(interest.toLowerCase()) ||
              role.description.toLowerCase().includes(interest.toLowerCase())) {
            interestAlignment += 0.2;
          }
        }
      }
      
      // Normalize match score
      const normalizedScore = (matchScore / role.requiredSkills.length) + interestAlignment;
      
      if (normalizedScore > 0.3) { // Only include viable matches
        careerMatches.push({
          ...role,
          matchScore: Math.min(0.95, normalizedScore),
          transferableSkillsCount: transferableCount,
          interestAlignment,
          viabilityScore: this.calculateViabilityScore(normalizedScore, role.marketDemand, transferableCount)
        });
      }
    }
    
    // Sort by viability score (combination of match score, market demand, and transferability)
    return careerMatches.sort((a, b) => b.viabilityScore - a.viabilityScore);
  }
  
  // Generate skill gaps for optimal career path
  async generateSkillGaps(userSkills, targetRole, trendingSkills, experience) {
    const skillGaps = [];
    
    for (const requiredSkill of targetRole.requiredSkills) {
      const hasSkill = userSkills.some(userSkill => 
        this.calculateSkillSimilarity(userSkill, requiredSkill) > 0.7
      );
      
      if (!hasSkill) {
        const priority = this.calculateSkillPriority(requiredSkill, trendingSkills);
        const learningTime = this.estimateLearningTime(requiredSkill, experience);
        const courses = await this.findRelevantCourses(requiredSkill);
        
        skillGaps.push({
          requiredSkill,
          currentLevel: 'None',
          targetLevel: this.determineTargetLevel(requiredSkill, targetRole),
          priority,
          estimatedLearningTime: learningTime,
          recommendedCourses: courses,
          marketDemand: this.getSkillMarketDemand(requiredSkill, trendingSkills),
          transferDifficulty: this.calculateTransferDifficulty(requiredSkill, userSkills)
        });
      }
    }
    
    // Sort by priority and transfer difficulty
    return skillGaps.sort((a, b) => {
      const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      
      const aScore = priorityOrder[a.priority] * 10 - difficultyOrder[a.transferDifficulty];
      const bScore = priorityOrder[b.priority] * 10 - difficultyOrder[b.transferDifficulty];
      
      return bScore - aScore;
    });
  }
  
  // Helper methods
  calculateMarketAlignment(transferableSkills, marketData) {
    if (!transferableSkills.length) return 0;
    
    const highDemandCount = transferableSkills.filter(skill => 
      skill.marketDemand === 'High' || skill.marketDemand === 'Very High'
    ).length;
    
    return highDemandCount / transferableSkills.length;
  }
  
  calculateViabilityScore(matchScore, marketDemand, transferableCount) {
    const demandMultiplier = {
      'Very High': 1.2,
      'High': 1.0,
      'Medium': 0.8,
      'Low': 0.6
    };
    
    const transferBonus = Math.min(0.3, transferableCount * 0.1);
    
    return (matchScore * (demandMultiplier[marketDemand] || 0.8)) + transferBonus;
  }
  
  determineTargetLevel(skill, role) {
    const criticalSkills = ['machine learning', 'ai', 'blockchain', 'cybersecurity'];
    const skillLower = skill.toLowerCase();
    
    if (criticalSkills.some(cs => skillLower.includes(cs))) {
      return 'Advanced';
    }
    
    return 'Intermediate';
  }
  
  getSkillMarketDemand(skill, trendingSkills) {
    const skillLower = skill.toLowerCase();
    
    if (trendingSkills.some(ts => skillLower.includes(ts.toLowerCase()))) {
      return 'Very High';
    }
    
    const highDemandSkills = ['ai', 'machine learning', 'blockchain', 'cloud', 'cybersecurity'];
    if (highDemandSkills.some(hds => skillLower.includes(hds))) {
      return 'High';
    }
    
    return 'Medium';
  }
  
  calculateTransferDifficulty(requiredSkill, userSkills) {
    const skillLower = requiredSkill.toLowerCase();
    
    // Check if user has related skills
    const hasRelatedSkill = userSkills.some(userSkill => 
      this.calculateSkillSimilarity(userSkill, requiredSkill) > 0.4
    );
    
    if (hasRelatedSkill) return 'Easy';
    
    // Check skill complexity
    const complexSkills = ['machine learning', 'blockchain', 'cybersecurity', 'ai'];
    if (complexSkills.some(cs => skillLower.includes(cs))) {
      return 'Hard';
    }
    
    return 'Medium';
  }
  
  async getMarketDemandData() {
    // Simulate market demand data - in production, this would come from job market APIs
    return {
      highDemandSkills: ['ai', 'machine learning', 'blockchain', 'cloud computing', 'cybersecurity'],
      emergingSkills: ['web3', 'defi', 'nft', 'quantum computing', 'edge computing'],
      decliningSkills: ['flash', 'silverlight', 'cobol', 'fortran'],
      salaryTrends: {
        'ai': { growth: '25%', avgSalary: 150000 },
        'blockchain': { growth: '35%', avgSalary: 140000 },
        'cloud': { growth: '20%', avgSalary: 130000 }
      }
    };
  }
  
  calculateCareerViability(transferabilityAnalysis, marketData) {
    const { transferableSkills, overallScore, marketAlignment } = transferabilityAnalysis;
    
    // Base viability on transferability and market alignment
    const baseViability = (overallScore * 0.6) + (marketAlignment * 0.4);
    
    // Bonus for high-demand transferable skills
    const highDemandBonus = transferableSkills.filter(skill => 
      skill.marketDemand === 'High' || skill.marketDemand === 'Very High'
    ).length * 0.05;
    
    return Math.min(0.95, baseViability + highDemandBonus);
  }
  
  getFallbackPathway() {
    return {
      targetRole: 'Tech Professional',
      estimatedDuration: '6-9 months',
      milestones: [
        {
          title: 'Foundation Building',
          description: 'Learn fundamental skills',
          targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          skills: ['Programming Basics'],
          courses: [],
          projects: ['First Project']
        }
      ],
      totalProgress: 0
    };
  }
}

module.exports = new AIModelService();