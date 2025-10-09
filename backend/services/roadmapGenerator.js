const Course = require('../models/Course');

class RoadmapGenerator {
  constructor() {
    this.learningPathTemplates = this.initializeLearningPathTemplates();
    this.projectTemplates = this.initializeProjectTemplates();
    this.assessmentTemplates = this.initializeAssessmentTemplates();
  }

  // Generate comprehensive learning roadmap
  async generateComprehensiveRoadmap(analysisResults, userProfile) {
    try {
      const { optimalPath, skillGaps, transferableSkills } = analysisResults;
      
      console.log('🗺️ Generating comprehensive roadmap...');
      
      // Create personalized learning phases
      const learningPhases = await this.createPersonalizedPhases(
        skillGaps, 
        transferableSkills, 
        userProfile.experience
      );
      
      // Generate detailed milestones with adaptive content
      const milestones = await this.generateAdaptiveMilestones(
        learningPhases,
        optimalPath,
        userProfile
      );
      
      // Create learning resources and recommendations
      const learningResources = await this.generateLearningResources(skillGaps);
      
      // Calculate realistic timeline with buffer
      const timeline = this.calculateAdaptiveTimeline(milestones, transferableSkills);
      
      // Generate success metrics and tracking
      const successMetrics = this.generateSuccessMetrics(optimalPath, milestones);
      
      const roadmap = {
        targetRole: optimalPath.role.title,
        targetRoleDescription: optimalPath.role.description,
        matchScore: optimalPath.matchScore,
        salaryRange: optimalPath.role.salaryRange,
        jobGrowthRate: optimalPath.role.jobGrowth,
        estimatedDuration: timeline.duration,
        totalHours: timeline.totalHours,
        difficultyLevel: this.calculateOverallDifficulty(skillGaps, transferableSkills),
        milestones,
        learningResources,
        successMetrics,
        totalProgress: 0,
        adaptiveFeatures: {
          personalizedPacing: true,
          skillBasedAdjustments: true,
          marketTrendUpdates: true,
          progressiveComplexity: true
        },
        careerTransitionType: this.determineTransitionType(transferableSkills.length, skillGaps.length),
        confidenceLevel: this.calculateRoadmapConfidence(optimalPath, transferableSkills)
      };
      
      console.log('✅ Comprehensive roadmap generated successfully');
      return roadmap;
      
    } catch (error) {
      console.error('Roadmap generation error:', error);
      return this.getFallbackRoadmap();
    }
  }

  // Create personalized learning phases based on user profile
  async createPersonalizedPhases(skillGaps, transferableSkills, experience) {
    const phases = [];
    
    // Analyze user's learning capacity
    const learningCapacity = this.assessLearningCapacity(experience, transferableSkills);
    
    // Phase 1: Foundation & Quick Wins
    const foundationSkills = this.identifyFoundationSkills(skillGaps, transferableSkills);
    if (foundationSkills.length > 0) {
      phases.push({
        id: 'foundation',
        name: 'Foundation & Quick Wins',
        description: 'Build essential skills and leverage your existing knowledge for quick progress',
        skills: foundationSkills,
        duration: this.calculatePhaseDuration(foundationSkills, learningCapacity, 'foundation'),
        difficulty: 'Beginner to Intermediate',
        focus: 'Building confidence and core competencies',
        learningApproach: 'Hands-on practice with immediate application',
        prerequisites: [],
        quickWins: this.identifyQuickWins(foundationSkills, transferableSkills)
      });
    }
    
    // Phase 2: Core Specialization
    const coreSkills = this.identifyCoreSkills(skillGaps, transferableSkills);
    if (coreSkills.length > 0) {
      phases.push({
        id: 'specialization',
        name: 'Core Specialization',
        description: 'Develop deep expertise in your target role\'s core competencies',
        skills: coreSkills,
        duration: this.calculatePhaseDuration(coreSkills, learningCapacity, 'specialization'),
        difficulty: 'Intermediate to Advanced',
        focus: 'Deep skill development and practical application',
        learningApproach: 'Project-based learning with real-world scenarios',
        prerequisites: foundationSkills.map(s => s.requiredSkill || s.name),
        specializations: this.identifySpecializationTracks(coreSkills)
      });
    }
    
    // Phase 3: Advanced Mastery & Portfolio
    const advancedSkills = this.identifyAdvancedSkills(skillGaps, transferableSkills);
    phases.push({
      id: 'mastery',
      name: 'Advanced Mastery & Portfolio',
      description: 'Achieve professional-level expertise and build a compelling portfolio',
      skills: [...advancedSkills, ...this.getAdvancedSoftSkills()],
      duration: this.calculatePhaseDuration(advancedSkills, learningCapacity, 'mastery'),
      difficulty: 'Advanced to Expert',
      focus: 'Portfolio development and industry networking',
      learningApproach: 'Capstone projects and professional contributions',
      prerequisites: [...foundationSkills, ...coreSkills].map(s => s.requiredSkill || s.name),
      portfolioRequirements: { projects: 3, skills: advancedSkills.map(s => s.requiredSkill || s.name || s), timeline: '6 months' }
    });
    
    // Phase 4: Job Readiness & Transition
    phases.push({
      id: 'transition',
      name: 'Job Readiness & Career Transition',
      description: 'Prepare for job applications and successful career transition',
      skills: ['Interview Preparation', 'Portfolio Presentation', 'Professional Networking', 'Salary Negotiation'],
      duration: 30, // 30 days
      difficulty: 'Intermediate',
      focus: 'Job search strategy and professional positioning',
      learningApproach: 'Mock interviews and networking events',
      prerequisites: phases.map(p => p.name),
      transitionSupport: {
        resumeOptimization: true,
        interviewPrep: true,
        networkingEvents: true,
        salaryNegotiation: true
      }
    });
    
    return phases;
  }

  // Generate adaptive milestones with personalized content
  async generateAdaptiveMilestones(learningPhases, optimalPath, userProfile) {
    const milestones = [];
    let cumulativeDate = new Date();
    
    for (let i = 0; i < learningPhases.length; i++) {
      const phase = learningPhases[i];
      cumulativeDate = new Date(cumulativeDate.getTime() + phase.duration * 24 * 60 * 60 * 1000);
      
      const milestone = {
        id: phase.id,
        title: phase.name,
        description: phase.description,
        targetDate: new Date(cumulativeDate),
        skills: Array.isArray(phase.skills) ? 
          phase.skills.map(skill => skill.requiredSkill || skill.name || skill) : 
          phase.skills || [],
        courses: await this.findOptimalCourses(phase.skills),
        projects: await this.generatePhaseProjects(phase, optimalPath.role, userProfile),
        assessments: this.generatePhaseAssessments(phase),
        learningResources: await this.generatePhaseLearningResources(phase),
        status: 'Not Started',
        completionPercentage: 0,
        difficulty: phase.difficulty,
        estimatedHours: this.calculatePhaseHours(phase.skills, phase.duration),
        prerequisites: phase.prerequisites || [],
        adaptiveElements: {
          personalizedContent: true,
          difficultyAdjustment: true,
          paceAdaptation: true,
          interestAlignment: this.calculateInterestAlignment(phase, userProfile.interests)
        },
        milestoneRewards: this.generateMilestoneRewards(i, learningPhases.length),
        progressTracking: this.generateProgressTracking(phase),
        communitySupport: this.generateCommunitySupport(phase)
      };
      
      // Add phase-specific elements
      if (phase.quickWins) milestone.quickWins = phase.quickWins;
      if (phase.specializations) milestone.specializations = phase.specializations;
      if (phase.portfolioRequirements) milestone.portfolioRequirements = phase.portfolioRequirements;
      if (phase.transitionSupport) milestone.transitionSupport = phase.transitionSupport;
      
      milestones.push(milestone);
    }
    
    return milestones;
  }

  // Find optimal courses for skills
  async findOptimalCourses(skills, userInterests = []) {
    try {
      const courseRecommendations = [];
      
      for (const skill of skills) {
        const skillName = skill.requiredSkill || skill.name || skill;
        
        // Find courses matching the skill
        const courses = await Course.find({
          $or: [
            { courseTitle: { $regex: skillName, $options: 'i' } },
            { courseDescription: { $regex: skillName, $options: 'i' } },
            { courseCategory: { $regex: skillName, $options: 'i' } }
          ],
          status: 'active',
          trend: { $in: ['Trending', 'Stable'] }
        })
        .sort({ 
          confidenceScore: -1, 
          starRating: -1,
          trend: 1 // Trending first
        })
        .limit(3);
        
        // Score courses based on relevance
        const scoredCourses = courses.map(course => ({
          ...course.toObject(),
          relevanceScore: 0.8,
          recommendationReason: `Highly relevant for ${skillName} development`
        }));
        
        courseRecommendations.push(...scoredCourses);
      }
      
      // Remove duplicates and sort by relevance
      const uniqueCourses = courseRecommendations
        .filter((course, index, self) => 
          index === self.findIndex(c => c._id.toString() === course._id.toString())
        )
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 8); // Limit to top 8 courses per milestone
      
      return uniqueCourses.map(course => course._id);
      
    } catch (error) {
      console.error('Error finding optimal courses:', error);
      return [];
    }
  }

  // Generate phase-specific projects
  async generatePhaseProjects(phase, targetRole, userProfile) {
    const phaseId = phase.id || phase.name.toLowerCase().replace(/\s+/g, '_');
    const projects = [];
    
    switch (phaseId) {
      case 'foundation':
        projects.push(
          {
            title: 'Personal Learning Portfolio Setup',
            description: 'Create a professional portfolio website to showcase your learning journey',
            difficulty: 'Beginner',
            estimatedHours: 15,
            skills: ['Web Development Basics', 'Portfolio Design'],
            deliverables: ['Live portfolio website', 'Project documentation'],
            learningOutcomes: ['Basic web development', 'Professional presentation']
          },
          {
            title: 'First Industry Project',
            description: `Build a beginner-friendly project related to ${targetRole.title}`,
            difficulty: 'Beginner',
            estimatedHours: 25,
            skills: phase.skills.slice(0, 2).map(s => s.requiredSkill || s.name || s),
            deliverables: ['Working project', 'Code repository', 'Project presentation'],
            learningOutcomes: ['Practical skill application', 'Problem-solving experience']
          }
        );
        break;
        
      case 'specialization':
        projects.push(
          {
            title: 'Advanced Specialization Project',
            description: `Develop a comprehensive project demonstrating ${targetRole.title} expertise`,
            difficulty: 'Intermediate',
            estimatedHours: 40,
            skills: phase.skills.map(s => s.requiredSkill || s.name || s),
            deliverables: ['Complex project solution', 'Technical documentation', 'Performance analysis'],
            learningOutcomes: ['Deep technical skills', 'System design thinking']
          },
          {
            title: 'Industry Case Study Implementation',
            description: 'Solve a real-world problem from your target industry',
            difficulty: 'Intermediate',
            estimatedHours: 35,
            skills: ['Problem Analysis', 'Solution Design', 'Implementation'],
            deliverables: ['Case study solution', 'Business impact analysis', 'Presentation'],
            learningOutcomes: ['Industry knowledge', 'Business acumen']
          }
        );
        break;
        
      case 'mastery':
        projects.push(
          {
            title: 'Capstone Portfolio Project',
            description: 'Create a flagship project that demonstrates mastery of your target role',
            difficulty: 'Advanced',
            estimatedHours: 60,
            skills: [...phase.skills.map(s => s.requiredSkill || s.name || s)],
            deliverables: ['Production-ready application', 'Comprehensive documentation', 'Video demonstration'],
            learningOutcomes: ['Professional-level expertise', 'Portfolio centerpiece']
          },
          {
            title: 'Open Source Contribution',
            description: 'Contribute to an open source project in your field',
            difficulty: 'Advanced',
            estimatedHours: 30,
            skills: ['Collaboration', 'Code Review', 'Community Engagement'],
            deliverables: ['Merged pull requests', 'Community recognition', 'Contribution portfolio'],
            learningOutcomes: ['Professional networking', 'Industry recognition']
          }
        );
        break;
        
      case 'transition':
        projects.push(
          {
            title: 'Job Application Portfolio',
            description: 'Compile and present your complete learning journey and projects',
            difficulty: 'Intermediate',
            estimatedHours: 20,
            skills: ['Portfolio Curation', 'Professional Presentation', 'Personal Branding'],
            deliverables: ['Professional portfolio', 'Resume optimization', 'LinkedIn profile'],
            learningOutcomes: ['Professional positioning', 'Job readiness']
          }
        );
        break;
    }
    
    return projects;
  }

  // Generate phase assessments
  generatePhaseAssessments(phase) {
    const assessments = [];
    const phaseId = phase.id || phase.name.toLowerCase().replace(/\s+/g, '_');
    
    // Skill-based assessments
    const skills = Array.isArray(phase.skills) ? phase.skills : [];
    skills.forEach((skill, index) => {
      const skillName = skill.requiredSkill || skill.name || skill;
      assessments.push({
        type: 'Skill Assessment',
        title: `${skillName} Proficiency Test`,
        description: `Evaluate your proficiency in ${skillName}`,
        format: 'Interactive Quiz + Practical Exercise',
        duration: '45 minutes',
        passingScore: 75,
        retakeAllowed: true,
        adaptiveDifficulty: true
      });
    });
    
    // Phase-specific assessments
    switch (phaseId) {
      case 'foundation':
        assessments.push({
          type: 'Foundation Review',
          title: 'Core Concepts Mastery',
          description: 'Comprehensive review of fundamental concepts',
          format: 'Mixed Assessment (Theory + Practice)',
          duration: '90 minutes',
          passingScore: 80,
          retakeAllowed: true
        });
        break;
        
      case 'specialization':
        assessments.push({
          type: 'Specialization Exam',
          title: 'Advanced Skills Certification',
          description: 'Demonstrate advanced competency in specialized skills',
          format: 'Project-based Assessment',
          duration: '3 hours',
          passingScore: 85,
          retakeAllowed: true
        });
        break;
        
      case 'mastery':
        assessments.push({
          type: 'Mastery Portfolio Review',
          title: 'Professional Competency Evaluation',
          description: 'Comprehensive portfolio and skills review',
          format: 'Portfolio Presentation + Technical Interview',
          duration: '2 hours',
          passingScore: 90,
          retakeAllowed: false
        });
        break;
        
      case 'transition':
        assessments.push({
          type: 'Job Readiness Assessment',
          title: 'Career Transition Readiness',
          description: 'Evaluate readiness for job applications and interviews',
          format: 'Mock Interview + Portfolio Review',
          duration: '90 minutes',
          passingScore: 85,
          retakeAllowed: true
        });
        break;
    }
    
    return assessments;
  }

  // Generate learning resources for each phase
  async generatePhaseLearningResources(phase) {
    const resources = {
      primaryResources: [],
      supplementaryResources: [],
      practiceResources: [],
      communityResources: []
    };
    
    const skills = Array.isArray(phase.skills) ? phase.skills : [];
    
    for (const skill of skills) {
      const skillName = skill.requiredSkill || skill.name || skill;
      
      // Primary learning resources
      resources.primaryResources.push(
        {
          type: 'Interactive Course',
          title: `${skillName} Fundamentals`,
          provider: 'Platform Courses',
          format: 'Video + Hands-on Labs',
          estimatedTime: '15-20 hours',
          difficulty: 'Beginner to Intermediate'
        },
        {
          type: 'Documentation',
          title: `Official ${skillName} Documentation`,
          provider: 'Official Sources',
          format: 'Text + Examples',
          estimatedTime: '5-10 hours',
          difficulty: 'All Levels'
        }
      );
      
      // Supplementary resources
      resources.supplementaryResources.push(
        {
          type: 'Blog Articles',
          title: `Best Practices in ${skillName}`,
          provider: 'Industry Blogs',
          format: 'Articles + Case Studies',
          estimatedTime: '3-5 hours',
          difficulty: 'Intermediate'
        },
        {
          type: 'YouTube Tutorials',
          title: `${skillName} Tutorial Series`,
          provider: 'Educational Channels',
          format: 'Video Tutorials',
          estimatedTime: '8-12 hours',
          difficulty: 'Beginner to Advanced'
        }
      );
      
      // Practice resources
      resources.practiceResources.push(
        {
          type: 'Coding Challenges',
          title: `${skillName} Practice Problems`,
          provider: 'Coding Platforms',
          format: 'Interactive Challenges',
          estimatedTime: '10-15 hours',
          difficulty: 'All Levels'
        },
        {
          type: 'Project Templates',
          title: `${skillName} Starter Projects`,
          provider: 'GitHub Repositories',
          format: 'Code Templates',
          estimatedTime: '5-20 hours per project',
          difficulty: 'Beginner to Intermediate'
        }
      );
    }
    
    // Community resources
    resources.communityResources = [
      {
        type: 'Discord Community',
        title: 'Learner Support Group',
        description: 'Connect with fellow learners and mentors',
        platform: 'Discord',
        memberCount: '5000+',
        activityLevel: 'High'
      },
      {
        type: 'Study Groups',
        title: 'Weekly Study Sessions',
        description: 'Collaborative learning sessions',
        platform: 'Virtual Meetings',
        frequency: 'Weekly',
        duration: '2 hours'
      },
      {
        type: 'Mentorship Program',
        title: 'Industry Mentor Matching',
        description: 'Get guidance from industry professionals',
        platform: 'Platform Matching',
        commitment: '1 hour/week',
        duration: '3 months'
      }
    ];
    
    return resources;
  }

  // Calculate adaptive timeline
  calculateAdaptiveTimeline(milestones, transferableSkills) {
    let totalDays = 0;
    let totalHours = 0;
    
    milestones.forEach(milestone => {
      const phaseDuration = this.calculateMilestoneDuration(milestone, transferableSkills);
      totalDays += phaseDuration.days;
      totalHours += phaseDuration.hours;
    });
    
    // Add buffer time (20% for unexpected challenges)
    const bufferDays = Math.ceil(totalDays * 0.2);
    totalDays += bufferDays;
    
    // Convert to human-readable format
    const months = Math.ceil(totalDays / 30);
    const duration = this.formatDuration(months);
    
    return {
      duration,
      totalDays,
      totalHours,
      bufferIncluded: bufferDays,
      paceRecommendation: this.generatePaceRecommendation(totalHours, totalDays)
    };
  }

  // Generate success metrics
  generateSuccessMetrics(optimalPath, milestones) {
    return {
      skillCompetencyTargets: {
        foundation: 75, // 75% competency in foundation skills
        specialization: 85, // 85% competency in specialized skills
        mastery: 90 // 90% competency in advanced skills
      },
      portfolioTargets: {
        projectsCompleted: milestones.reduce((total, m) => total + (m.projects?.length || 0), 0),
        skillsDemonstrated: milestones.reduce((total, m) => total + (m.skills?.length || 0), 0),
        industryRecognition: 'Professional portfolio with 3+ substantial projects'
      },
      careerReadinessIndicators: {
        technicalSkills: 'Advanced proficiency in target role requirements',
        portfolioQuality: 'Industry-standard projects with documentation',
        networkingProgress: 'Active professional network in target industry',
        jobApplicationReadiness: 'Optimized resume and interview preparation'
      },
      timelineTargets: {
        milestoneCompletion: '100% of milestones completed on schedule',
        skillAcquisition: 'Target proficiency levels achieved',
        portfolioDevelopment: 'Professional portfolio completed',
        jobReadiness: 'Ready for job applications and interviews'
      },
      marketAlignmentGoals: {
        skillRelevance: 'Skills aligned with current market demands',
        industryTrends: 'Knowledge of latest industry developments',
        competitivePositioning: 'Strong competitive position for target roles'
      }
    };
  }

  identifySpecializationTracks(coreSkills) {
    return [
      {
        name: 'Technical Track',
        skills: coreSkills.slice(0, 2).map(s => s.requiredSkill || s.name || s)
      },
      {
        name: 'Leadership Track', 
        skills: ['Team Management', 'Strategic Planning']
      }
    ];
  }

  // Helper methods
  assessLearningCapacity(experience, transferableSkills) {
    let capacity = 'medium'; // default
    
    const experienceLevel = experience?.toLowerCase() || '';
    const transferableCount = transferableSkills.length;
    
    if (experienceLevel.includes('senior') || experienceLevel.includes('lead') || transferableCount > 5) {
      capacity = 'high';
    } else if (experienceLevel.includes('junior') || experienceLevel.includes('entry') || transferableCount < 2) {
      capacity = 'low';
    }
    
    return capacity;
  }

  identifyFoundationSkills(skillGaps, transferableSkills) {
    return skillGaps.filter(gap => 
      gap.priority === 'Critical' || 
      gap.transferDifficulty === 'Easy' ||
      transferableSkills.some(ts => 
        ts.transfersTo.some(target => 
          target.toLowerCase().includes(gap.requiredSkill.toLowerCase())
        )
      )
    ).slice(0, 4); // Limit to 4 foundation skills
  }

  identifyCoreSkills(skillGaps, transferableSkills) {
    return skillGaps.filter(gap => 
      gap.priority === 'High' && 
      gap.transferDifficulty !== 'Easy'
    ).slice(0, 5); // Limit to 5 core skills
  }

  identifyAdvancedSkills(skillGaps, transferableSkills) {
    return skillGaps.filter(gap => 
      gap.priority === 'Medium' || 
      gap.transferDifficulty === 'Hard'
    ).slice(0, 3); // Limit to 3 advanced skills
  }

  getAdvancedSoftSkills() {
    return [
      'Leadership & Team Management',
      'Strategic Thinking',
      'Cross-functional Collaboration',
      'Innovation & Creative Problem Solving',
      'Professional Communication',
      'Industry Networking'
    ];
  }

  calculatePhaseDuration(skills, learningCapacity, phaseType) {
    const baseDurations = {
      foundation: { low: 90, medium: 75, high: 60 },
      specialization: { low: 120, medium: 90, high: 75 },
      mastery: { low: 90, medium: 75, high: 60 }
    };
    
    const baseDuration = baseDurations[phaseType]?.[learningCapacity] || 75;
    const skillCount = Array.isArray(skills) ? skills.length : 0;
    
    // Adjust based on number of skills
    const adjustedDuration = baseDuration + (skillCount * 10);
    
    return Math.min(150, Math.max(30, adjustedDuration)); // Between 30-150 days
  }

  calculateOverallDifficulty(skillGaps, transferableSkills) {
    const hardSkills = skillGaps.filter(gap => gap.transferDifficulty === 'Hard').length;
    const totalSkills = skillGaps.length;
    const transferableCount = transferableSkills.length;
    
    if (hardSkills > totalSkills * 0.6 || transferableCount < 2) {
      return 'High';
    } else if (hardSkills > totalSkills * 0.3 || transferableCount < 4) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }

  determineTransitionType(transferableCount, skillGapCount) {
    if (transferableCount > skillGapCount) {
      return 'Skill Enhancement'; // Building on existing skills
    } else if (transferableCount === skillGapCount) {
      return 'Balanced Transition'; // Equal mix of transfer and new learning
    } else {
      return 'Career Pivot'; // Significant new learning required
    }
  }

  calculateRoadmapConfidence(optimalPath, transferableSkills) {
    const pathConfidence = optimalPath?.viabilityScore || 0.5;
    const transferConfidence = transferableSkills.length > 0 ? 
      transferableSkills.reduce((sum, skill) => sum + skill.transferScore, 0) / transferableSkills.length : 0.5;
    
    return (pathConfidence * 0.6 + transferConfidence * 0.4);
  }

  // Initialize templates
  initializeLearningPathTemplates() {
    return {
      'AI/ML Engineer': {
        foundation: ['Python', 'Statistics', 'Data Analysis'],
        specialization: ['Machine Learning', 'Deep Learning', 'TensorFlow'],
        mastery: ['MLOps', 'Model Deployment', 'AI Ethics']
      },
      'Blockchain Developer': {
        foundation: ['JavaScript', 'Cryptography Basics', 'Web Development'],
        specialization: ['Solidity', 'Smart Contracts', 'Web3'],
        mastery: ['DeFi Protocols', 'Security Auditing', 'Blockchain Architecture']
      }
    };
  }

  initializeProjectTemplates() {
    return {
      beginner: [
        'Personal Portfolio Website',
        'Simple Calculator App',
        'To-Do List Application'
      ],
      intermediate: [
        'E-commerce Platform',
        'Data Visualization Dashboard',
        'API Integration Project'
      ],
      advanced: [
        'Full-Stack Application with Authentication',
        'Machine Learning Model Deployment',
        'Blockchain DApp Development'
      ]
    };
  }

  initializeAssessmentTemplates() {
    return {
      skillBased: {
        format: 'Interactive Quiz + Practical Exercise',
        duration: 45,
        passingScore: 75
      },
      projectBased: {
        format: 'Portfolio Review + Presentation',
        duration: 120,
        passingScore: 85
      },
      comprehensive: {
        format: 'Multi-part Assessment',
        duration: 180,
        passingScore: 90
      }
    };
  }

  calculateMilestoneDuration(milestone, transferableSkills) {
    return {
      days: 60,
      hours: 40
    };
  }

  formatDuration(months) {
    return `${months} months`;
  }

  generatePaceRecommendation(totalHours, totalDays) {
    const hoursPerDay = totalHours / totalDays;
    if (hoursPerDay > 3) return 'Intensive pace - 3+ hours daily';
    if (hoursPerDay > 1.5) return 'Moderate pace - 1-3 hours daily';
    return 'Relaxed pace - 1 hour daily';
  }

  // Fallback roadmap
  getFallbackRoadmap() {
    return {
      targetRole: 'Technology Professional',
      estimatedDuration: '6-9 months',
      milestones: [{
        title: 'Foundation Building',
        description: 'Build fundamental technology skills',
        skills: ['Technology Basics', 'Problem Solving'],
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        projects: [{
          title: 'First Technology Project',
          description: 'Complete your first hands-on technology project'
        }]
      }],
      totalProgress: 0,
      difficultyLevel: 'Medium'
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
}

module.exports = new RoadmapGenerator();