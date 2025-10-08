class AIAnalyzer {
  analyzeCourse(course) {
    // Enhanced analysis based on AI threat level and market trends
    const aiThreatLevel = course.aiThreatLevel || 0;
    const category = course.courseCategory || 'Other';
    
    // Determine trend based on AI threat and category
    let trend = 'Stable';
    let courseDemand = 'Medium';
    let jobAvailability = 'Low';
    let confidenceScore = 0.5;

    // High AI threat = Outdated trend
    if (aiThreatLevel >= 0.7) {
      trend = 'Outdated';
      courseDemand = 'Declining';
      jobAvailability = 'Low';
      confidenceScore = 0.3;
    }
    // AI/ML and emerging tech = Trending
    else if (['AI/ML', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'DevOps'].includes(category)) {
      trend = 'Trending';
      courseDemand = 'High';
      jobAvailability = 'High';
      confidenceScore = 0.85;
    }
    // Traditional tech skills = Stable
    else if (['Web Development', 'Mobile Development'].includes(category)) {
      trend = 'Stable';
      courseDemand = 'Medium';
      jobAvailability = 'Medium';
      confidenceScore = 0.6;
    }
    // Other categories with low AI threat = Stable
    else if (aiThreatLevel < 0.3) {
      trend = 'Stable';
      courseDemand = 'Medium';
      jobAvailability = 'Medium';
      confidenceScore = 0.5;
    }

    return {
      trend,
      courseDemand,
      jobAvailability,
      confidenceScore: Math.min(0.95, Math.max(0.1, confidenceScore))
    };
  }
}

module.exports = new AIAnalyzer();