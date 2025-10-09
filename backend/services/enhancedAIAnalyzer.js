const UserProfile = require('../models/UserProfile');
const Course = require('../models/Course');

class EnhancedAIAnalyzer {
  constructor() {
    this.marketTrends = this.initializeMarketTrends();
    this.skillTransferMatrix = this.initializeSkillTransferMatrix();
    this.industryGrowthData = this.initializeIndustryGrowthData();
  }

  // Main analysis function that processes all user data
  async analyzeUserProfile(assessment) {
    try {
      const { skills, interests, education, experience } = assessment;
      
      console.log('🧠 Starting comprehensive AI analysis...');
      
      // Phase 1: Market Intelligence Analysis
      const marketIntelligence = await this.analyzeMarketTrends(skills);
      
      // Phase 2: Skill Transferability Analysis
      const transferabilityAnalysis = await this.analyzeSkillTransferability(skills, marketIntelligence);
      
      // Phase 3: Career Path Optimization
      const careerPathAnalysis = await this.optimizeCareerPaths(
        transferabilityAnalysis, 
        interests, 
        education, 
        experience,
        marketIntelligence
      );
      
      // Phase 4: Personalized Roadmap Generation
      const personalizedRoadmap = await this.generatePersonalizedRoadmap(
        careerPathAnalysis,
        transferabilityAnalysis,
        assessment
      );
      
      // Phase 5: Risk & Viability Assessment
      const riskAssessment = await this.assessCareerRisks(skills, interests, careerPathAnalysis.optimalPath);
      
      console.log('✅ AI analysis completed successfully');
      
      return {
        transferableSkills: transferabilityAnalysis.transferableSkills,
        skillGaps: careerPathAnalysis.skillGaps,
        roadmap: personalizedRoadmap,
        careerMatches: careerPathAnalysis.rankedPaths,
        automationRisk: riskAssessment.automationRisk,
        careerViability: riskAssessment.careerViability,
        marketAlignment: transferabilityAnalysis.marketAlignment,
        confidenceScore: this.calculateOverallConfidence(transferabilityAnalysis, careerPathAnalysis)
      };
      
    } catch (error) {
      console.error('Enhanced AI analysis error:', error);
      return this.getFallbackAnalysis(assessment);
    }
  }

  // Analyze current market trends and demands
  async analyzeMarketTrends(userSkills = []) {
    const trendingSkills = await this.getTrendingSkills();
    const emergingRoles = await this.getEmergingRoles();
    const industryGrowth = this.industryGrowthData;
    
    return {
      trendingSkills,
      emergingRoles,
      industryGrowth,
      userSkills,
      demandMultipliers: this.calculateDemandMultipliers(trendingSkills),
      futureOutlook: this.generateFutureOutlook(trendingSkills, emergingRoles)
    };
  }

  // Advanced skill transferability analysis
  async analyzeSkillTransferability(userSkills, marketIntelligence) {
    const transferableSkills = [];
    const skillTransferMap = new Map();
    let totalTransferScore = 0;
    
    for (const skill of userSkills) {
      const transferAnalysis = this.analyzeIndividualSkillTransfer(skill, marketIntelligence);
      
      if (transferAnalysis.transferScore > 0.3) {
        transferableSkills.push({
          originalSkill: skill,
          transfersTo: transferAnalysis.targetSkills,
          transferScore: transferAnalysis.transferScore,
          marketDemand: transferAnalysis.marketDemand,
          learningEffort: transferAnalysis.learningEffort,
          salaryImpact: transferAnalysis.salaryImpact,
          timeToMarket: transferAnalysis.timeToMarket
        });
        
        totalTransferScore += transferAnalysis.transferScore;
        skillTransferMap.set(skill, transferAnalysis);
      }
    }
    
    const marketAlignment = this.calculateMarketAlignment(transferableSkills, marketIntelligence);
    
    return {
      transferableSkills,
      skillTransferMap,
      overallTransferScore: userSkills.length > 0 ? totalTransferScore / userSkills.length : 0,
      marketAlignment,
      transferabilityTier: this.determineTransferabilityTier(totalTransferScore, userSkills.length)
    };
  }

  // Optimize career paths based on transferable skills and market demand
  async optimizeCareerPaths(transferabilityAnalysis, interests, education, experience, marketIntelligence) {
    const futureProofRoles = await this.getFutureProofRoles();
    const careerPaths = [];
    
    for (const role of futureProofRoles) {
      const pathAnalysis = await this.analyzeCareerPath(
        role,
        transferabilityAnalysis,
        interests,
        education,
        experience,
        marketIntelligence
      );
      
      if (pathAnalysis.viabilityScore > 0.2) {
        careerPaths.push(pathAnalysis);
      }
    }
    
    // Rank paths by viability and market potential
    const rankedPaths = careerPaths.sort((a, b) => b.overallScore - a.overallScore);
    const optimalPath = rankedPaths[0] || {
      role: {
        title: 'Technology Professional',
        description: 'Versatile technology role with growth potential',
        requiredSkills: ['programming', 'problem solving', 'communication'],
        salaryRange: '$60,000 - $120,000',
        jobGrowth: '15% (Faster than average)'
      },
      matchScore: 0.6,
      viabilityScore: 0.6,
      overallScore: 0.6
    };
    
    // Generate skill gaps for optimal path
    const skillGaps = await this.generateOptimizedSkillGaps(
      optimalPath,
      transferabilityAnalysis,
      experience
    );
    
    return {
      rankedPaths: rankedPaths.slice(0, 5),
      optimalPath,
      skillGaps,
      pathDiversity: this.calculatePathDiversity(rankedPaths)
    };
  }

  // Generate personalized learning roadmap
  async generatePersonalizedRoadmap(careerPathAnalysis, transferabilityAnalysis, assessment) {
    const { optimalPath, skillGaps } = careerPathAnalysis;
    const { transferableSkills } = transferabilityAnalysis;
    
    // Create adaptive learning phases
    const learningPhases = await this.createAdaptiveLearningPhases(
      skillGaps,
      transferableSkills,
      assessment.experience
    );
    
    // Generate detailed milestones
    const milestones = await this.generateDetailedMilestones(
      learningPhases,
      optimalPath,
      transferableSkills
    );
    
    // Calculate realistic timeline
    const timeline = this.calculateRealisticTimeline(milestones, transferableSkills.length);
    
    return {
      targetRole: optimalPath.role.title,
      targetRoleDescription: optimalPath.role.description,
      matchScore: optimalPath.matchScore,
      salaryRange: optimalPath.role.salaryRange,
      jobGrowthRate: optimalPath.role.jobGrowth,
      estimatedDuration: timeline.duration,
      difficultyLevel: this.calculateDifficultyLevel(skillGaps, transferableSkills),
      milestones,
      totalProgress: 0,
      learningPath: this.generateLearningPath(milestones),
      careerTransitionType: this.determineTransitionType(transferableSkills.length, skillGaps.length)
    };
  }

  // Enhanced skill transfer analysis - recommends NEW trending skills based on existing skills
  analyzeIndividualSkillTransfer(skill, marketIntelligence) {
    const skillLower = skill.toLowerCase();
    const trendingSkills = marketIntelligence.trendingSkills;
    
    // Market-driven transfer mappings - maps existing skills to NEW trending skills
    const marketTransferMatrix = {
      'javascript': ['artificial intelligence', 'machine learning', 'blockchain', 'web3', 'cloud computing'],
      'python': ['artificial intelligence', 'deep learning', 'data science', 'machine learning', 'automation'],
      'java': ['cloud computing', 'microservices', 'kubernetes', 'cybersecurity', 'blockchain'],
      'html': ['react', 'vue.js', 'ui/ux design', 'frontend frameworks', 'web3'],
      'css': ['ui/ux design', 'react', 'frontend frameworks', 'design systems', 'figma'],
      'sql': ['big data', 'data science', 'machine learning', 'business intelligence', 'cloud databases'],
      'excel': ['data science', 'python', 'power bi', 'machine learning', 'business intelligence'],
      'project management': ['agile coaching', 'product management', 'devops', 'scrum master', 'digital transformation'],
      'marketing': ['digital marketing', 'growth hacking', 'data analytics', 'ai marketing', 'automation'],
      'design': ['ui/ux design', 'figma', 'design systems', 'user research', 'prototyping'],
      'networking': ['cloud computing', 'cybersecurity', 'devops', 'kubernetes', 'aws'],
      'mathematics': ['data science', 'machine learning', 'artificial intelligence', 'quantitative analysis', 'deep learning'],
      'communication': ['digital marketing', 'content creation', 'social media', 'copywriting', 'brand strategy'],
      'sales': ['digital marketing', 'crm systems', 'sales automation', 'data analytics', 'customer success']
    };
    
    let bestTransfer = {
      targetSkills: [],
      transferScore: 0,
      marketDemand: 'Medium',
      learningEffort: 'Medium',
      salaryImpact: 'Positive',
      timeToMarket: '3-6 months'
    };
    
    // Find best transfer match
    for (const [sourceSkill, newSkills] of Object.entries(marketTransferMatrix)) {
      if (skillLower.includes(sourceSkill)) {
        // Prioritize trending skills that are different from user's existing skills
        const relevantNewSkills = newSkills.filter(newSkill => {
          const newSkillLower = newSkill.toLowerCase();
          
          // Check if user already has this skill
          const userAlreadyHas = (marketIntelligence.userSkills || []).some(userSkill => {
            const userSkillLower = userSkill.toLowerCase();
            return userSkillLower.includes(newSkillLower) || 
                   newSkillLower.includes(userSkillLower) ||
                   this.calculateSkillSimilarity(userSkill, newSkill) > 0.7;
          });
          
          if (userAlreadyHas) return false;
          
          // Check if it's trending
          return trendingSkills.some(trending => 
            trending.toLowerCase().includes(newSkillLower) ||
            newSkillLower.includes(trending.toLowerCase())
          );
        });
        
        if (relevantNewSkills.length > 0) {
          bestTransfer = {
            targetSkills: relevantNewSkills.slice(0, 3),
            transferScore: 0.85,
            marketDemand: 'Very High',
            learningEffort: 'Medium',
            salaryImpact: 'Very High',
            timeToMarket: '3-6 months'
          };
          break;
        } else {
          // Use high-demand skills even if not trending
          bestTransfer = {
            targetSkills: newSkills.slice(0, 3),
            transferScore: 0.7,
            marketDemand: 'High',
            learningEffort: 'Medium',
            salaryImpact: 'High',
            timeToMarket: '4-8 months'
          };
        }
      }
    }
    
    // If no direct match, suggest high-demand skills based on skill category
    if (bestTransfer.transferScore === 0) {
      const skillCategory = this.categorizeSkill(skill);
      const categoryRecommendations = {
        'technical': ['artificial intelligence', 'machine learning', 'cloud computing', 'cybersecurity'],
        'creative': ['ui/ux design', 'digital marketing', 'content creation', 'brand strategy'],
        'analytical': ['data science', 'machine learning', 'business intelligence', 'automation'],
        'business': ['product management', 'digital transformation', 'agile coaching', 'growth hacking'],
        'general': ['cloud computing', 'data analysis', 'digital marketing', 'automation']
      };
      
      const recommendations = categoryRecommendations[skillCategory] || categoryRecommendations['general'];
      
      bestTransfer = {
        targetSkills: recommendations.slice(0, 3),
        transferScore: 0.5,
        marketDemand: 'High',
        learningEffort: 'Medium',
        salaryImpact: 'Positive',
        timeToMarket: '6-12 months'
      };
    }
    
    return bestTransfer;
  }

  // Categorize skill for better recommendations
  categorizeSkill(skill) {
    const skillLower = skill.toLowerCase();
    
    if (['javascript', 'python', 'java', 'programming', 'coding', 'development'].some(s => skillLower.includes(s))) {
      return 'technical';
    }
    if (['design', 'creative', 'art', 'graphics', 'ui', 'ux'].some(s => skillLower.includes(s))) {
      return 'creative';
    }
    if (['data', 'analysis', 'statistics', 'math', 'research'].some(s => skillLower.includes(s))) {
      return 'analytical';
    }
    if (['management', 'business', 'strategy', 'planning', 'leadership'].some(s => skillLower.includes(s))) {
      return 'business';
    }
    
    return 'general';
  }

  // Analyze individual career path viability
  async analyzeCareerPath(role, transferabilityAnalysis, interests, education, experience, marketIntelligence) {
    const { transferableSkills } = transferabilityAnalysis;
    
    // Calculate skill match score
    const skillMatchScore = this.calculateSkillMatch(role.requiredSkills, transferableSkills);
    
    // Calculate interest alignment
    const interestAlignment = this.calculateInterestAlignment(role, interests);
    
    // Calculate education relevance
    const educationRelevance = this.calculateEducationRelevance(role, education);
    
    // Calculate experience leverage
    const experienceLeverage = this.calculateExperienceLeverage(role, experience);
    
    // Calculate market potential
    const marketPotential = this.calculateMarketPotential(role, marketIntelligence);
    
    // Calculate overall viability
    const viabilityScore = (
      skillMatchScore * 0.35 +
      interestAlignment * 0.20 +
      educationRelevance * 0.15 +
      experienceLeverage * 0.15 +
      marketPotential * 0.15
    );
    
    const overallScore = viabilityScore * marketPotential; // Weight by market potential
    
    return {
      role,
      skillMatchScore,
      interestAlignment,
      educationRelevance,
      experienceLeverage,
      marketPotential,
      viabilityScore,
      overallScore,
      matchScore: skillMatchScore,
      transitionDifficulty: this.calculateTransitionDifficulty(skillMatchScore, experienceLeverage),
      timeToTransition: this.estimateTransitionTime(skillMatchScore, experienceLeverage)
    };
  }

  // Generate optimized skill gaps
  async generateOptimizedSkillGaps(optimalPath, transferabilityAnalysis, experience) {
    const { role } = optimalPath;
    const { transferableSkills } = transferabilityAnalysis;
    const skillGaps = [];
    
    for (const requiredSkill of role.requiredSkills) {
      const hasTransferableSkill = transferableSkills.some(ts => 
        ts.transfersTo.some(target => 
          this.calculateSkillSimilarity(target, requiredSkill) > 0.6
        )
      );
      
      if (!hasTransferableSkill) {
        const gap = await this.createSkillGap(requiredSkill, role, experience);
        skillGaps.push(gap);
      }
    }
    
    // Sort by learning priority
    return skillGaps.sort((a, b) => {
      const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Create adaptive learning phases
  async createAdaptiveLearningPhases(skillGaps, transferableSkills, experience) {
    const phases = [];
    
    // Phase 1: Foundation (Critical skills)
    const criticalSkills = skillGaps.filter(gap => gap.priority === 'Critical');
    if (criticalSkills.length > 0) {
      phases.push({
        name: 'Foundation Building',
        description: 'Master critical skills for your target role',
        skills: criticalSkills,
        duration: this.calculatePhaseDuration(criticalSkills, experience),
        difficulty: 'High',
        prerequisites: []
      });
    }
    
    // Phase 2: Specialization (High priority skills)
    const highPrioritySkills = skillGaps.filter(gap => gap.priority === 'High');
    if (highPrioritySkills.length > 0) {
      phases.push({
        name: 'Specialization',
        description: 'Develop specialized expertise in your field',
        skills: highPrioritySkills,
        duration: this.calculatePhaseDuration(highPrioritySkills, experience),
        difficulty: 'Medium',
        prerequisites: criticalSkills.map(s => s.requiredSkill)
      });
    }
    
    // Phase 3: Mastery (Medium priority skills + soft skills)
    const mediumSkills = skillGaps.filter(gap => gap.priority === 'Medium');
    phases.push({
      name: 'Professional Mastery',
      description: 'Achieve professional-level competency and industry recognition',
      skills: [...mediumSkills, ...this.getSoftSkills()],
      duration: this.calculatePhaseDuration(mediumSkills, experience),
      difficulty: 'Medium',
      prerequisites: [...criticalSkills, ...highPrioritySkills].map(s => s.requiredSkill)
    });
    
    return phases;
  }

  // Generate detailed milestones with projects and assessments
  async generateDetailedMilestones(learningPhases, optimalPath, transferableSkills) {
    const milestones = [];
    let cumulativeDate = new Date();
    
    for (let i = 0; i < learningPhases.length; i++) {
      const phase = learningPhases[i];
      cumulativeDate = new Date(cumulativeDate.getTime() + phase.duration * 24 * 60 * 60 * 1000);
      
      const milestone = {
        title: phase.name,
        description: phase.description,
        targetDate: new Date(cumulativeDate),
        skills: phase.skills.map(skill => skill.requiredSkill || skill.name || skill),
        courses: await this.findRelevantCourses('general'),
        projects: await this.generatePhaseProjects(phase, optimalPath.role),
        assessments: this.generatePhaseAssessments(phase),
        status: 'Not Started',
        completionPercentage: 0,
        difficulty: phase.difficulty,
        estimatedHours: this.calculatePhaseHours(phase.skills),
        prerequisites: phase.prerequisites,
        learningResources: await this.generateLearningResources(phase.skills),
        milestoneRewards: this.generateMilestoneRewards(i, learningPhases.length)
      };
      
      milestones.push(milestone);
    }
    
    return milestones;
  }

  // Calculate skill similarity using advanced matching
  calculateSkillSimilarity(skill1, skill2) {
    const s1 = skill1.toLowerCase().trim();
    const s2 = skill2.toLowerCase().trim();
    
    if (s1 === s2) return 1.0;
    if (s1.includes(s2) || s2.includes(s1)) return 0.8;
    
    // Semantic similarity mapping
    const semanticGroups = {
      programming: ['javascript', 'python', 'java', 'coding', 'development', 'programming'],
      data: ['data', 'analytics', 'statistics', 'analysis', 'sql', 'database'],
      ai: ['ai', 'machine learning', 'ml', 'artificial intelligence', 'deep learning'],
      cloud: ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker'],
      web: ['web', 'frontend', 'backend', 'fullstack', 'react', 'angular', 'vue'],
      mobile: ['mobile', 'ios', 'android', 'react native', 'flutter'],
      design: ['design', 'ui', 'ux', 'user experience', 'user interface', 'figma']
    };
    
    for (const [category, terms] of Object.entries(semanticGroups)) {
      const s1InCategory = terms.some(term => s1.includes(term));
      const s2InCategory = terms.some(term => s2.includes(term));
      
      if (s1InCategory && s2InCategory) {
        return 0.7;
      }
    }
    
    // Levenshtein distance for fuzzy matching
    const distance = this.levenshteinDistance(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity > 0.6 ? similarity : 0;
  }

  // Helper methods
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Initialize market trends data
  initializeMarketTrends() {
    return {
      trending: ['ai', 'machine learning', 'blockchain', 'cloud computing', 'cybersecurity', 'data science'],
      emerging: ['quantum computing', 'edge computing', 'web3', 'metaverse', 'sustainable tech'],
      declining: ['flash', 'silverlight', 'legacy systems', 'manual testing']
    };
  }

  // Initialize skill transfer matrix
  initializeSkillTransferMatrix() {
    return {
      'JavaScript': [
        { target: 'React', score: 0.9, effort: 'Low', salaryImpact: 'High', timeToMarket: '2-3 months' },
        { target: 'Node.js', score: 0.8, effort: 'Low', salaryImpact: 'High', timeToMarket: '1-2 months' },
        { target: 'TypeScript', score: 0.7, effort: 'Low', salaryImpact: 'Medium', timeToMarket: '1 month' },
        { target: 'Web3', score: 0.6, effort: 'Medium', salaryImpact: 'Very High', timeToMarket: '3-4 months' }
      ],
      'Python': [
        { target: 'Machine Learning', score: 0.9, effort: 'Medium', salaryImpact: 'Very High', timeToMarket: '4-6 months' },
        { target: 'Data Science', score: 0.9, effort: 'Medium', salaryImpact: 'Very High', timeToMarket: '3-5 months' },
        { target: 'AI Development', score: 0.8, effort: 'High', salaryImpact: 'Very High', timeToMarket: '6-8 months' },
        { target: 'Automation', score: 0.7, effort: 'Low', salaryImpact: 'Medium', timeToMarket: '2-3 months' }
      ],
      'Excel': [
        { target: 'Data Analysis', score: 0.7, effort: 'Medium', salaryImpact: 'Medium', timeToMarket: '2-4 months' },
        { target: 'SQL', score: 0.6, effort: 'Medium', salaryImpact: 'Medium', timeToMarket: '3-4 months' },
        { target: 'Power BI', score: 0.8, effort: 'Low', salaryImpact: 'Medium', timeToMarket: '1-2 months' },
        { target: 'Tableau', score: 0.7, effort: 'Medium', salaryImpact: 'Medium', timeToMarket: '2-3 months' }
      ],
      'Project Management': [
        { target: 'Agile', score: 0.8, effort: 'Low', salaryImpact: 'Medium', timeToMarket: '1-2 months' },
        { target: 'Scrum Master', score: 0.9, effort: 'Low', salaryImpact: 'High', timeToMarket: '2-3 months' },
        { target: 'Product Management', score: 0.7, effort: 'Medium', salaryImpact: 'High', timeToMarket: '3-6 months' }
      ]
    };
  }

  // Initialize industry growth data
  initializeIndustryGrowthData() {
    return {
      'Technology': { growth: 25, demand: 'Very High', automation: 'Low' },
      'Healthcare': { growth: 18, demand: 'High', automation: 'Low' },
      'Finance': { growth: 15, demand: 'High', automation: 'Medium' },
      'Education': { growth: 12, demand: 'Medium', automation: 'Low' },
      'Manufacturing': { growth: 8, demand: 'Medium', automation: 'High' },
      'Retail': { growth: 5, demand: 'Medium', automation: 'High' }
    };
  }

  // Get emerging roles data
  async getEmergingRoles() {
    return [
      {
        title: 'AI Ethics Specialist',
        growth: '45%',
        demand: 'Very High',
        description: 'Ensure responsible AI development and deployment'
      },
      {
        title: 'Quantum Computing Engineer', 
        growth: '60%',
        demand: 'High',
        description: 'Develop quantum algorithms and systems'
      },
      {
        title: 'Metaverse Architect',
        growth: '40%', 
        demand: 'High',
        description: 'Design virtual worlds and experiences'
      }
    ];
  }

  calculateDemandMultipliers(trendingSkills) {
    const multipliers = {};
    trendingSkills.forEach(skill => {
      multipliers[skill] = 1.5;
    });
    return multipliers;
  }

  generateFutureOutlook(trendingSkills, emergingRoles) {
    return {
      topTrends: trendingSkills.slice(0, 5),
      emergingOpportunities: emergingRoles.slice(0, 3),
      marketDirection: 'AI and automation driving demand for human-AI collaboration skills'
    };
  }

  // Get trending skills from database and market analysis
  async getTrendingSkills() {
    try {
      const trendingCourses = await Course.find({ 
        trend: 'Trending',
        status: 'active'
      }).limit(100);
      
      const skillFrequency = {};
      
      trendingCourses.forEach(course => {
        const skills = [
          ...course.courseTitle.toLowerCase().split(/[\s,.-]+/),
          course.courseCategory.toLowerCase()
        ];
        
        skills.forEach(skill => {
          if (skill.length > 2) {
            skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
          }
        });
      });
      
      const dbSkills = Object.entries(skillFrequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 20)
        .map(([skill]) => skill);
      
      // Combine with predefined trending skills
      const marketTrendingSkills = [
        'artificial intelligence', 'machine learning', 'blockchain', 'cloud computing',
        'cybersecurity', 'data science', 'react', 'python', 'javascript', 'aws',
        'kubernetes', 'docker', 'devops', 'ui/ux design', 'digital marketing',
        'automation', 'big data', 'web3', 'defi', 'nft', 'metaverse', 'quantum computing'
      ];
      
      return [...new Set([...dbSkills, ...marketTrendingSkills])].slice(0, 30);
        
    } catch (error) {
      console.error('Error getting trending skills:', error);
      return [
        'artificial intelligence', 'machine learning', 'blockchain', 'cloud computing',
        'cybersecurity', 'data science', 'react', 'python', 'javascript', 'aws',
        'kubernetes', 'docker', 'devops', 'ui/ux design', 'digital marketing'
      ];
    }
  }

  // Get future-proof roles with comprehensive data
  async getFutureProofRoles() {
    return [
      {
        title: 'AI/ML Engineer',
        description: 'Design and implement machine learning systems and AI solutions for real-world problems',
        requiredSkills: ['python', 'machine learning', 'tensorflow', 'pytorch', 'data analysis', 'statistics', 'deep learning'],
        transferableFrom: ['programming', 'mathematics', 'data analysis', 'software development', 'statistics'],
        automationResistance: 0.95,
        marketDemand: 'Very High',
        salaryRange: '$120,000 - $200,000',
        jobGrowth: '22% (Much faster than average)',
        industries: ['Technology', 'Healthcare', 'Finance', 'Automotive', 'Research'],
        futureOutlook: 'Excellent - AI adoption accelerating across all industries',
        keyResponsibilities: ['Develop ML models', 'Deploy AI systems', 'Optimize algorithms', 'Research new techniques']
      },
      {
        title: 'Blockchain Developer',
        description: 'Build decentralized applications and smart contract systems for Web3 ecosystem',
        requiredSkills: ['solidity', 'web3', 'smart contracts', 'javascript', 'cryptography', 'ethereum', 'defi'],
        transferableFrom: ['web development', 'javascript', 'programming', 'software engineering', 'cryptography'],
        automationResistance: 0.90,
        marketDemand: 'Very High',
        salaryRange: '$100,000 - $180,000',
        jobGrowth: '35% (Much faster than average)',
        industries: ['Cryptocurrency', 'Finance', 'Gaming', 'Supply Chain', 'Healthcare'],
        futureOutlook: 'Excellent - Web3 and DeFi growth driving demand',
        keyResponsibilities: ['Smart contract development', 'DApp creation', 'Protocol design', 'Security auditing']
      },
      {
        title: 'Cloud Solutions Architect',
        description: 'Design and oversee cloud computing strategies and implementations for enterprises',
        requiredSkills: ['aws', 'azure', 'kubernetes', 'devops', 'microservices', 'containerization', 'terraform'],
        transferableFrom: ['system administration', 'networking', 'software architecture', 'devops', 'infrastructure'],
        automationResistance: 0.85,
        marketDemand: 'Very High',
        salaryRange: '$130,000 - $220,000',
        jobGrowth: '25% (Much faster than average)',
        industries: ['Technology', 'Enterprise', 'Startups', 'Government', 'Healthcare'],
        futureOutlook: 'Excellent - Cloud adoption continuing to accelerate',
        keyResponsibilities: ['Cloud strategy design', 'Architecture planning', 'Migration oversight', 'Cost optimization']
      },
      {
        title: 'Cybersecurity Specialist',
        description: 'Protect organizations from cyber threats and ensure data security compliance',
        requiredSkills: ['security', 'penetration testing', 'risk assessment', 'incident response', 'compliance', 'ethical hacking'],
        transferableFrom: ['networking', 'system administration', 'risk management', 'it support', 'programming'],
        automationResistance: 0.88,
        marketDemand: 'Very High',
        salaryRange: '$95,000 - $160,000',
        jobGrowth: '31% (Much faster than average)',
        industries: ['All Industries', 'Government', 'Healthcare', 'Finance', 'Technology'],
        futureOutlook: 'Excellent - Increasing cyber threats drive constant demand',
        keyResponsibilities: ['Security monitoring', 'Threat analysis', 'Incident response', 'Security auditing']
      },
      {
        title: 'Data Scientist',
        description: 'Extract insights from complex data to drive strategic business decisions',
        requiredSkills: ['python', 'r', 'statistics', 'machine learning', 'sql', 'data visualization', 'big data'],
        transferableFrom: ['mathematics', 'statistics', 'research', 'analytics', 'programming', 'excel'],
        automationResistance: 0.82,
        marketDemand: 'High',
        salaryRange: '$110,000 - $170,000',
        jobGrowth: '22% (Much faster than average)',
        industries: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Research'],
        futureOutlook: 'Very Good - Data-driven decision making becoming standard',
        keyResponsibilities: ['Data analysis', 'Model building', 'Insight generation', 'Business consulting']
      },
      {
        title: 'DevOps Engineer',
        description: 'Bridge development and operations to improve software delivery and system reliability',
        requiredSkills: ['docker', 'kubernetes', 'ci/cd', 'automation', 'monitoring', 'scripting', 'cloud platforms'],
        transferableFrom: ['system administration', 'software development', 'networking', 'scripting', 'infrastructure'],
        automationResistance: 0.80,
        marketDemand: 'High',
        salaryRange: '$100,000 - $150,000',
        jobGrowth: '20% (Much faster than average)',
        industries: ['Technology', 'Startups', 'Enterprise', 'E-commerce', 'SaaS'],
        futureOutlook: 'Very Good - DevOps practices becoming industry standard',
        keyResponsibilities: ['Pipeline automation', 'Infrastructure management', 'Monitoring setup', 'Deployment optimization']
      }
    ];
  }

  // Missing helper methods
  async createSkillGap(requiredSkill, role, experience) {
    const courses = await this.findRelevantCourses(requiredSkill);
    
    return {
      requiredSkill,
      currentLevel: 'None',
      targetLevel: this.determineTargetLevel(requiredSkill, role),
      priority: this.calculateSkillPriority(requiredSkill, []),
      estimatedLearningTime: this.estimateLearningTime(requiredSkill, experience),
      recommendedCourses: courses,
      marketDemand: this.getSkillMarketDemand(requiredSkill, []),
      transferDifficulty: 'Medium'
    };
  }

  async findRelevantCourses(skill) {
    try {
      const courses = await Course.find({
        $or: [
          { courseTitle: { $regex: skill, $options: 'i' } },
          { courseDescription: { $regex: skill, $options: 'i' } }
        ],
        status: 'active'
      }).limit(3);
      
      return courses.map(c => c._id);
    } catch (error) {
      return [];
    }
  }

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

  estimateLearningTime(skill, experience) {
    const baseHours = 60;
    const skillComplexity = {
      'machine learning': 120,
      'blockchain': 100,
      'ai': 100,
      'cloud': 80
    };
    
    const skillLower = skill.toLowerCase();
    for (const [skillType, hours] of Object.entries(skillComplexity)) {
      if (skillLower.includes(skillType)) {
        return hours;
      }
    }
    
    return baseHours;
  }

  determineTargetLevel(skill, role) {
    const criticalSkills = ['ai', 'machine learning', 'blockchain'];
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
    
    const highDemandSkills = ['ai', 'machine learning', 'cloud', 'cybersecurity'];
    if (highDemandSkills.some(hds => skillLower.includes(hds))) {
      return 'High';
    }
    
    return 'Medium';
  }

  calculateTransitionDifficulty(skillMatchScore, experienceLeverage) {
    const combinedScore = (skillMatchScore + experienceLeverage) / 2;
    
    if (combinedScore > 0.7) return 'Easy';
    if (combinedScore > 0.4) return 'Medium';
    return 'Hard';
  }

  estimateTransitionTime(skillMatchScore, experienceLeverage) {
    const combinedScore = (skillMatchScore + experienceLeverage) / 2;
    
    if (combinedScore > 0.7) return '3-6 months';
    if (combinedScore > 0.4) return '6-12 months';
    return '12-18 months';
  }

  calculatePhaseDuration(skills, experience) {
    const baseTime = 60;
    const skillCount = Array.isArray(skills) ? skills.length : 0;
    return baseTime + (skillCount * 10);
  }

  getSoftSkills() {
    return [
      { requiredSkill: 'Communication', priority: 'High' },
      { requiredSkill: 'Problem Solving', priority: 'High' },
      { requiredSkill: 'Teamwork', priority: 'Medium' }
    ];
  }

  calculatePhaseHours(skills) {
    return Array.isArray(skills) ? skills.length * 20 : 40;
  }

  async generateLearningResources(skills) {
    return {
      primaryResources: [],
      supplementaryResources: [],
      practiceResources: [],
      communityResources: []
    };
  }

  generateMilestoneRewards(index, total) {
    return {
      badge: `Milestone ${index + 1} Complete`,
      points: (index + 1) * 100,
      certificate: index === total - 1
    };
  }

  calculateInterestAlignment(phase, interests) {
    if (!interests || interests.length === 0) return 0.5;
    
    const phaseText = `${phase.name} ${phase.description}`.toLowerCase();
    let alignmentScore = 0;
    
    for (const interest of interests) {
      if (phaseText.includes(interest.toLowerCase())) {
        alignmentScore += 0.2;
      }
    }
    
    return Math.min(1.0, alignmentScore + 0.3);
  }

  generateProgressTracking(phase) {
    return {
      skillProgress: {},
      projectProgress: {},
      assessmentResults: {},
      timeSpent: 0,
      lastActivity: null
    };
  }

  generateCommunitySupport(phase) {
    return {
      studyGroups: [],
      mentorMatching: false,
      peerConnections: [],
      forumAccess: true
    };
  }

  identifyQuickWins(foundationSkills, transferableSkills) {
    return foundationSkills.slice(0, 2).map(skill => ({
      skill: skill.requiredSkill || skill.name || skill,
      timeToComplete: '1-2 weeks',
      impact: 'High confidence boost'
    }));
  }

  async generatePhaseProjects(phase, role) {
    return [{
      title: `${phase.name} Project`,
      description: `Complete a project for ${phase.name}`,
      difficulty: phase.difficulty,
      estimatedHours: 20
    }];
  }

  generatePhaseAssessments(phase) {
    return [{
      type: 'Quiz',
      title: `${phase.name} Assessment`,
      format: 'Multiple Choice',
      duration: '30 minutes',
      passingScore: 75
    }];
  }

  calculateRealisticTimeline(milestones, transferableCount) {
    const totalDays = milestones.reduce((sum, m) => sum + 60, 0);
    const months = Math.ceil(totalDays / 30);
    return {
      duration: `${months} months`,
      totalDays,
      totalHours: milestones.length * 40
    };
  }

  calculateDifficultyLevel(skillGaps, transferableSkills) {
    const hardSkills = skillGaps.filter(gap => gap.transferDifficulty === 'Hard').length;
    const totalSkills = skillGaps.length;
    
    if (hardSkills > totalSkills * 0.6) return 'High';
    if (hardSkills > totalSkills * 0.3) return 'Medium';
    return 'Low';
  }

  generateLearningPath(milestones) {
    return milestones.map(m => m.title);
  }

  determineTransitionType(transferableCount, skillGapCount) {
    if (transferableCount > skillGapCount) return 'Skill Enhancement';
    if (transferableCount === skillGapCount) return 'Balanced Transition';
    return 'Career Pivot';
  }

  calculatePathDiversity(rankedPaths) {
    return rankedPaths.length > 3 ? 'High' : rankedPaths.length > 1 ? 'Medium' : 'Low';
  }

  identifyRiskFactors(skills, optimalPath) {
    return ['Market volatility', 'Technology changes'];
  }

  generateMitigationStrategies(automationRisk, optimalPath) {
    return ['Continuous learning', 'Skill diversification'];
  }

  getMarketDemand(skill, marketIntelligence) {
    const trendingSkills = marketIntelligence.trendingSkills || [];
    const skillLower = skill.toLowerCase();
    
    if (trendingSkills.some(ts => skillLower.includes(ts.toLowerCase()))) {
      return 'Very High';
    }
    
    return 'Medium';
  }

  // Additional helper methods for comprehensive analysis
  calculateMarketAlignment(transferableSkills, marketIntelligence) {
    if (!transferableSkills.length) return 0;
    
    const highDemandCount = transferableSkills.filter(skill => 
      skill.marketDemand === 'High' || skill.marketDemand === 'Very High'
    ).length;
    
    return highDemandCount / transferableSkills.length;
  }

  determineTransferabilityTier(totalTransferScore, skillCount) {
    if (skillCount === 0) return 'No Skills';
    
    const avgScore = totalTransferScore / skillCount;
    
    if (avgScore > 0.7) return 'High Transferability';
    if (avgScore > 0.5) return 'Medium Transferability';
    return 'Low Transferability';
  }

  calculateOverallConfidence(transferabilityAnalysis, careerPathAnalysis) {
    const transferConfidence = transferabilityAnalysis.overallTransferScore;
    const pathConfidence = careerPathAnalysis.optimalPath?.viabilityScore || 0.5;
    const marketConfidence = transferabilityAnalysis.marketAlignment;
    
    return (transferConfidence * 0.4 + pathConfidence * 0.4 + marketConfidence * 0.2);
  }

  // Fallback analysis for error cases
  getFallbackAnalysis(assessment) {
    const fallbackTransferableSkills = assessment.skills?.map(skill => ({
      originalSkill: skill,
      transfersTo: ['cloud computing', 'data analysis', 'digital marketing'],
      transferScore: 0.6,
      marketDemand: 'High',
      learningEffort: 'Medium',
      salaryImpact: 'Positive',
      timeToMarket: '3-6 months'
    })) || [];

    const fallbackCareerMatches = [
      {
        role: {
          title: 'Technology Professional',
          description: 'Versatile technology role with growth opportunities',
          requiredSkills: ['programming', 'problem solving', 'communication'],
          salaryRange: '$60,000 - $120,000',
          jobGrowth: '15% (Faster than average)',
          automationResistance: 0.7
        },
        matchScore: 0.7,
        viabilityScore: 0.7,
        overallScore: 0.7,
        transitionDifficulty: 'Medium',
        timeToTransition: '6-12 months'
      },
      {
        role: {
          title: 'Digital Marketing Specialist',
          description: 'Drive digital growth through marketing strategies',
          requiredSkills: ['digital marketing', 'analytics', 'content creation'],
          salaryRange: '$50,000 - $90,000',
          jobGrowth: '10% (Faster than average)',
          automationResistance: 0.6
        },
        matchScore: 0.6,
        viabilityScore: 0.6,
        overallScore: 0.6,
        transitionDifficulty: 'Easy',
        timeToTransition: '3-6 months'
      }
    ];

    return {
      transferableSkills: fallbackTransferableSkills,
      skillGaps: [{
        requiredSkill: 'Technology Fundamentals',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High',
        estimatedLearningTime: 60,
        marketDemand: 'High',
        transferDifficulty: 'Medium'
      }],
      careerMatches: fallbackCareerMatches,
      automationRisk: 0.4,
      careerViability: 0.7,
      marketAlignment: 0.6,
      confidenceScore: 0.6
    };
  }

  // Additional calculation methods
  calculateSkillMatch(requiredSkills, transferableSkills) {
    let matchCount = 0;
    
    for (const required of requiredSkills) {
      const hasMatch = transferableSkills.some(ts => 
        ts.transfersTo.some(target => 
          this.calculateSkillSimilarity(target, required) > 0.6
        )
      );
      if (hasMatch) matchCount++;
    }
    
    return requiredSkills.length > 0 ? matchCount / requiredSkills.length : 0;
  }

  calculateInterestAlignment(role, interests) {
    if (!interests || interests.length === 0) return 0.5;
    
    let alignmentScore = 0;
    const roleText = `${role.title} ${role.description}`.toLowerCase();
    
    for (const interest of interests) {
      if (roleText.includes(interest.toLowerCase())) {
        alignmentScore += 0.3;
      }
    }
    
    return Math.min(1.0, alignmentScore);
  }

  calculateEducationRelevance(role, education) {
    if (!education) return 0.5;
    
    const educationLower = education.toLowerCase();
    const roleTitle = role.title.toLowerCase();
    
    // Direct field matches
    const fieldMatches = {
      'computer science': ['ai', 'software', 'developer', 'engineer'],
      'engineering': ['engineer', 'technical', 'systems'],
      'mathematics': ['data', 'analytics', 'ai', 'ml'],
      'business': ['management', 'analyst', 'consultant']
    };
    
    for (const [field, keywords] of Object.entries(fieldMatches)) {
      if (educationLower.includes(field)) {
        const hasKeyword = keywords.some(keyword => roleTitle.includes(keyword));
        if (hasKeyword) return 0.8;
      }
    }
    
    return 0.5; // Neutral if no clear match
  }

  calculateExperienceLeverage(role, experience) {
    if (!experience) return 0.3;
    
    const experienceLower = experience.toLowerCase();
    const roleRequirements = role.transferableFrom || [];
    
    let leverageScore = 0.3; // Base score
    
    for (const requirement of roleRequirements) {
      if (experienceLower.includes(requirement.toLowerCase())) {
        leverageScore += 0.2;
      }
    }
    
    return Math.min(1.0, leverageScore);
  }

  calculateMarketPotential(role, marketIntelligence) {
    const demandMultiplier = {
      'Very High': 1.0,
      'High': 0.8,
      'Medium': 0.6,
      'Low': 0.4
    };
    
    return demandMultiplier[role.marketDemand] || 0.6;
  }

  // Assessment and risk calculation methods
  async assessCareerRisks(skills, interests, optimalPath) {
    const automationRisk = this.calculateAutomationRisk(skills, optimalPath);
    const careerViability = this.calculateCareerViability(optimalPath, skills);
    
    return {
      automationRisk,
      careerViability,
      riskFactors: this.identifyRiskFactors(skills, optimalPath),
      mitigationStrategies: this.generateMitigationStrategies(automationRisk, optimalPath)
    };
  }

  calculateAutomationRisk(skills, optimalPath) {
    const highRiskSkills = ['data entry', 'customer service', 'bookkeeping', 'telemarketing', 'manual testing'];
    const lowRiskSkills = ['ai', 'machine learning', 'creative', 'leadership', 'strategy', 'innovation'];
    
    let riskScore = 0.5; // baseline
    
    skills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      
      if (highRiskSkills.some(hrs => skillLower.includes(hrs))) {
        riskScore += 0.15;
      }
      
      if (lowRiskSkills.some(lrs => skillLower.includes(lrs))) {
        riskScore -= 0.15;
      }
    });
    
    // Factor in target role automation resistance
    if (optimalPath?.role?.automationResistance) {
      riskScore = riskScore * (1 - optimalPath.role.automationResistance);
    }
    
    return Math.max(0.1, Math.min(0.9, riskScore));
  }

  calculateCareerViability(optimalPath, skills) {
    if (!optimalPath) return 0.5;
    
    const baseViability = optimalPath.viabilityScore || 0.5;
    const marketPotential = optimalPath.marketPotential || 0.5;
    const skillRelevance = this.calculateSkillRelevance(skills, optimalPath.role);
    
    return (baseViability * 0.5 + marketPotential * 0.3 + skillRelevance * 0.2);
  }

  calculateSkillRelevance(skills, role) {
    if (!skills || !role?.requiredSkills) return 0.5;
    
    let relevanceScore = 0;
    
    for (const skill of skills) {
      const hasRelevance = role.requiredSkills.some(required => 
        this.calculateSkillSimilarity(skill, required) > 0.4
      );
      if (hasRelevance) relevanceScore += 1;
    }
    
    return Math.min(1.0, relevanceScore / Math.max(skills.length, 1));
  }
}

module.exports = new EnhancedAIAnalyzer();