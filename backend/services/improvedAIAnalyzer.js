class ImprovedAIAnalyzer {
  constructor() {
    // Job market data based on real industry trends
    this.jobMarketData = {
      'AI/ML': {
        projectedGrowth: 0.35, // 35% growth
        avgSalary: 120000,
        jobOpenings: 85000,
        replacementNeeds: 0.15,
        demandScore: 0.95
      },
      'Data Science': {
        projectedGrowth: 0.28,
        avgSalary: 110000,
        jobOpenings: 75000,
        replacementNeeds: 0.12,
        demandScore: 0.90
      },
      'Blockchain': {
        projectedGrowth: 0.42,
        avgSalary: 130000,
        jobOpenings: 25000,
        replacementNeeds: 0.08,
        demandScore: 0.85
      },
      'Web Development': {
        projectedGrowth: 0.22,
        avgSalary: 85000,
        jobOpenings: 120000,
        replacementNeeds: 0.18,
        demandScore: 0.80
      },
      'Cloud Computing': {
        projectedGrowth: 0.30,
        avgSalary: 115000,
        jobOpenings: 65000,
        replacementNeeds: 0.10,
        demandScore: 0.88
      },
      'Cybersecurity': {
        projectedGrowth: 0.25,
        avgSalary: 105000,
        jobOpenings: 55000,
        replacementNeeds: 0.08,
        demandScore: 0.85
      },
      'DevOps': {
        projectedGrowth: 0.27,
        avgSalary: 108000,
        jobOpenings: 45000,
        replacementNeeds: 0.12,
        demandScore: 0.82
      },
      'Mobile Development': {
        projectedGrowth: 0.18,
        avgSalary: 95000,
        jobOpenings: 40000,
        replacementNeeds: 0.15,
        demandScore: 0.75
      },
      'UI/UX Design': {
        projectedGrowth: 0.15,
        avgSalary: 80000,
        jobOpenings: 35000,
        replacementNeeds: 0.20,
        demandScore: 0.70
      },
      'Digital Marketing': {
        projectedGrowth: 0.08,
        avgSalary: 65000,
        jobOpenings: 50000,
        replacementNeeds: 0.35,
        demandScore: 0.45
      }
    };

    // High-value course indicators
    this.trendingIndicators = [
      'machine learning', 'deep learning', 'artificial intelligence', 'ai',
      'data science', 'python', 'tensorflow', 'pytorch', 'neural networks',
      'blockchain', 'web3', 'cryptocurrency', 'smart contracts', 'ethereum',
      'cloud computing', 'aws', 'azure', 'kubernetes', 'docker', 'serverless',
      'cybersecurity', 'ethical hacking', 'penetration testing', 'security',
      'devops', 'ci/cd', 'automation', 'terraform', 'ansible',
      'react', 'node.js', 'javascript', 'typescript', 'full stack',
      'mobile development', 'flutter', 'react native', 'swift', 'kotlin'
    ];

    // Outdated/declining indicators
    this.outdatedIndicators = [
      'customer service', 'call center', 'manual testing', 'basic graphic',
      'content writing', 'copywriting basics', 'data entry', 'basic office',
      'microsoft office basics', 'basic accounting', 'receptionist',
      'traditional marketing', 'basic administration', 'manual data'
    ];

    // AI threat indicators
    this.aiThreatIndicators = [
      'customer service', 'call center', 'data entry', 'basic writing',
      'manual testing', 'basic design', 'traditional marketing',
      'basic accounting', 'receptionist', 'basic administration',
      'manual data processing', 'basic customer support'
    ];
  }

  analyzeCourseRelevance(course) {
    const titleLower = course.courseTitle.toLowerCase();
    const descLower = (course.courseDescription || '').toLowerCase();
    const content = titleLower + ' ' + descLower;
    const category = course.courseCategory;

    // Get market data for category
    const marketData = this.jobMarketData[category] || {
      projectedGrowth: 0.05,
      avgSalary: 60000,
      jobOpenings: 10000,
      replacementNeeds: 0.25,
      demandScore: 0.40
    };

    // Calculate base scores from market data
    let trendScore = marketData.demandScore;
    let demandScore = marketData.demandScore;
    let aiThreatLevel = 0.1;

    // Adjust based on course content
    for (const indicator of this.trendingIndicators) {
      if (content.includes(indicator)) {
        trendScore += 0.15;
        demandScore += 0.15;
        break;
      }
    }

    for (const indicator of this.outdatedIndicators) {
      if (content.includes(indicator)) {
        trendScore -= 0.4;
        demandScore -= 0.4;
        break;
      }
    }

    for (const indicator of this.aiThreatIndicators) {
      if (content.includes(indicator)) {
        aiThreatLevel += 0.6;
        break;
      }
    }

    // Apply job placement rate calculation
    const jobPlacementRate = this.calculateJobPlacementRate(category, marketData);
    trendScore *= jobPlacementRate;
    demandScore *= jobPlacementRate;

    // Normalize scores
    trendScore = Math.min(Math.max(trendScore, 0), 1);
    demandScore = Math.min(Math.max(demandScore, 0), 1);
    aiThreatLevel = Math.min(Math.max(aiThreatLevel, 0), 1);

    // Force correct categorization based on content
    let trend = 'Stable';
    let courseDemand = 'Medium';
    let jobAvailability = 'Low';
    
    // Check for explicit trending keywords first
    const hasTrendingKeyword = this.trendingIndicators.some(keyword => content.includes(keyword));
    const hasOutdatedKeyword = this.outdatedIndicators.some(keyword => content.includes(keyword));
    
    if (hasTrendingKeyword) {
      trend = 'Trending';
      courseDemand = 'High';
      jobAvailability = 'High';
    } else if (hasOutdatedKeyword) {
      trend = 'Outdated';
      courseDemand = 'Declining';
      jobAvailability = 'None';
    } else {
      // Use score-based analysis for unclear cases
      if (trendScore >= 0.75) {
        trend = 'Trending';
        courseDemand = 'High';
        jobAvailability = 'High';
      } else if (trendScore <= 0.35) {
        trend = 'Outdated';
        courseDemand = 'Low';
        jobAvailability = 'None';
      }
    }

    return {
      trend,
      courseDemand,
      jobAvailability,
      confidenceScore: (trendScore + demandScore) / 2,
      aiThreatLevel,
      trendScore,
      demandScore,
      marketData,
      lastAnalyzed: new Date()
    };
  }

  calculateJobPlacementRate(category, marketData) {
    // Simulate job placement rate calculation
    // Higher job openings and lower replacement needs = higher placement rate
    const baseRate = 0.7;
    const growthFactor = marketData.projectedGrowth * 2;
    const demandFactor = marketData.demandScore * 0.5;
    const replacementFactor = (1 - marketData.replacementNeeds) * 0.3;
    
    return Math.min(baseRate + growthFactor + demandFactor + replacementFactor, 1);
  }

  getEmergingSkills() {
    return [
      { name: 'AI Prompt Engineering', demand: 'High', growth: '+45%' },
      { name: 'Machine Learning', demand: 'High', growth: '+35%' },
      { name: 'Blockchain Development', demand: 'High', growth: '+42%' },
      { name: 'Cloud Architecture', demand: 'High', growth: '+30%' },
      { name: 'Cybersecurity', demand: 'High', growth: '+25%' },
      { name: 'Data Science', demand: 'High', growth: '+28%' },
      { name: 'DevOps Engineering', demand: 'High', growth: '+27%' },
      { name: 'Full Stack Development', demand: 'Medium', growth: '+22%' },
      { name: 'Mobile Development', demand: 'Medium', growth: '+18%' },
      { name: 'UI/UX Design', demand: 'Medium', growth: '+15%' }
    ];
  }

  analyzeJobMarketTrends(category) {
    const marketData = this.jobMarketData[category];
    if (!marketData) {
      return {
        marketScore: 0.5,
        salaryTrend: 0.5,
        jobGrowth: 0.5,
        analyzedAt: new Date()
      };
    }

    return {
      marketScore: marketData.demandScore,
      salaryTrend: Math.min(marketData.avgSalary / 100000, 1),
      jobGrowth: Math.min(marketData.projectedGrowth * 2, 1),
      jobOpenings: marketData.jobOpenings,
      avgSalary: marketData.avgSalary,
      projectedGrowth: marketData.projectedGrowth,
      analyzedAt: new Date()
    };
  }
}

module.exports = new ImprovedAIAnalyzer();