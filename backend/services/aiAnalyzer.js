const natural = require('natural');
const sentiment = require('sentiment');

class AIAnalyzer {
  constructor() {
    this.sentiment = new sentiment();
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.tfidf = new natural.TfIdf();
    
    // trend skills keywords
    this.trendingKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'deep learning',
      'blockchain', 'cryptocurrency', 'web3', 'nft', 'defi',
      'cloud computing', 'aws', 'azure', 'gcp', 'kubernetes',
      'react', 'nodejs', 'python', 'javascript', 'typescript',
      'cybersecurity', 'ethical hacking', 'penetration testing',
      'data science', 'big data', 'analytics', 'visualization',
      'devops', 'ci/cd', 'docker', 'microservices',
      'mobile development', 'flutter', 'react native', 'swift',
      'ui/ux', 'design thinking', 'figma', 'adobe xd'
    ];
    
    this.outdatedKeywords = [
      'flash', 'silverlight', 'internet explorer', 'jquery mobile',
      'phonegap', 'cordova', 'backbone.js', 'knockout.js',
      'perl', 'cobol', 'fortran', 'pascal', 'visual basic 6',
      'adobe flash', 'actionscript', 'flex', 'air',
      'windows phone', 'blackberry', 'symbian'
    ];
    
    // AI disrupted skills :
    this.aiDisruptedSkills = [
      'data entry', 'basic bookkeeping', 'simple accounting',
      'basic graphic design', 'template design', 'basic photo editing',
      'content writing', 'copywriting', 'blog writing', 'article writing',
      'basic translation', 'language translation', 'document translation',
      'basic customer service', 'call center', 'chat support',
      'basic research', 'market research', 'lead generation',
      'basic coding', 'simple programming', 'repetitive coding',
      'manual testing', 'basic qa testing', 'regression testing',
      'basic video editing', 'simple animation', 'template video',
      'basic seo', 'keyword research', 'basic digital marketing',
      'basic excel', 'spreadsheet work', 'data processing',
      'basic hr tasks', 'resume screening', 'basic recruitment',
      'basic legal research', 'document review', 'contract review',
      'basic financial analysis', 'simple calculations', 'basic reporting'
    ];
  }

  // Analyze course content and determine trend
  analyzeCourse(courseData) {
    try {
      const analysis = {
        trendScore: 0,
        demandScore: 0,
        relevanceScore: 0,
        confidenceScore: 0,
        trend: 'Stable',
        courseDemand: 'Medium',
        jobAvailability: 'Medium',
        reasoning: []
      };

      // Text analysis
      const textAnalysis = this.analyzeText(courseData.courseTitle + ' ' + courseData.courseDescription);
      analysis.trendScore += textAnalysis.trendScore;
      analysis.reasoning.push(...textAnalysis.reasoning);

      // Category-based analysis
      const categoryAnalysis = this.analyzeCategoryTrend(courseData.courseCategory);
      analysis.trendScore += categoryAnalysis.score;
      analysis.reasoning.push(categoryAnalysis.reason);

      // Provider credibility analysis
      const providerAnalysis = this.analyzeProvider(courseData.courseProvider);
      analysis.relevanceScore += providerAnalysis.score;

      // Rating analysis
      if (courseData.starRating) {
        const ratingScore = (courseData.starRating / 5) * 0.2;
        analysis.demandScore += ratingScore;
        analysis.reasoning.push(`Rating: ${courseData.starRating}/5 (${ratingScore.toFixed(2)} points)`);
      }

      // Job market analysis (if available)
      if (courseData.jobPostingsCount !== undefined) {
        const jobScore = this.analyzeJobMarket(courseData.jobPostingsCount);
        analysis.demandScore += jobScore.score;
        analysis.jobAvailability = jobScore.availability;
        analysis.reasoning.push(jobScore.reason);
      }

      // Calculate final scores
      analysis.confidenceScore = Math.min((analysis.trendScore + analysis.demandScore + analysis.relevanceScore) / 3, 1);
      
      // Determine trend classification with AI disruption consideration
      const disruptionAnalysis = this.analyzeText(courseData.courseTitle + ' ' + courseData.courseDescription);
      
      if (disruptionAnalysis.aiDisruptionScore > 0.2) {
        // High AI disruption risk
        analysis.trend = 'Outdated';
        analysis.courseDemand = 'Declining';
        analysis.jobAvailability = 'Low';
        analysis.reasoning.push(`⚠️ AI Disruption Risk: This skill is being automated by AI`);
      } else if (analysis.trendScore >= 0.7) {
        analysis.trend = 'Trending';
        analysis.courseDemand = 'High';
      } else if (analysis.trendScore <= 0.3) {
        analysis.trend = 'Outdated';
        analysis.courseDemand = 'Low';
      } else {
        analysis.trend = 'Stable';
        analysis.courseDemand = 'Medium';
      }

      // Adjust based on job availability
      if (analysis.jobAvailability === 'None') {
        analysis.trend = 'Outdated';
        analysis.courseDemand = 'Declining';
      }

      return analysis;
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return {
        trendScore: 0.5,
        demandScore: 0.5,
        relevanceScore: 0.5,
        confidenceScore: 0.3,
        trend: 'Stable',
        courseDemand: 'Medium',
        jobAvailability: 'Medium',
        reasoning: ['Analysis failed - using default values']
      };
    }
  }

  // Analyze text content for trending/outdated keywords
  analyzeText(text) {
    const lowerText = text.toLowerCase();
    const tokens = this.tokenizer.tokenize(lowerText);
    const stemmedTokens = tokens.map(token => this.stemmer.stem(token));
    
    let trendingScore = 0;
    let outdatedScore = 0;
    let aiDisruptionScore = 0;
    const reasoning = [];

    // Check for trending keywords
    this.trendingKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        const weight = keyword.length > 10 ? 0.15 : 0.1;
        trendingScore += weight;
        reasoning.push(`Trending keyword found: "${keyword}" (+${weight.toFixed(2)})`);
      }
    });

    // Check for outdated keywords
    this.outdatedKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        const weight = 0.2;
        outdatedScore += weight;
        reasoning.push(`Outdated keyword found: "${keyword}" (-${weight.toFixed(2)})`);
      }
    });

    // Check for AI-disrupted skills
    this.aiDisruptedSkills.forEach(skill => {
      if (lowerText.includes(skill)) {
        const weight = 0.25; // Higher weight for AI disruption
        aiDisruptionScore += weight;
        reasoning.push(`AI-disrupted skill found: "${skill}" (AI Risk: -${weight.toFixed(2)})`);
      }
    });

    // Sentiment analysis
    const sentimentResult = this.sentiment.analyze(text);
    const sentimentScore = Math.max(0, sentimentResult.score / 10);
    
    if (sentimentResult.score > 0) {
      reasoning.push(`Positive sentiment: ${sentimentResult.score} (+${sentimentScore.toFixed(2)})`);
    }

    // Calculate final trend score with AI disruption factor
    const totalNegativeScore = outdatedScore + aiDisruptionScore;
    const finalScore = Math.max(0, Math.min(1, (trendingScore - totalNegativeScore + sentimentScore) / 2));

    return {
      trendScore: finalScore,
      aiDisruptionScore: aiDisruptionScore,
      reasoning: reasoning
    };
  }

  // Analyze category trends
  analyzeCategoryTrend(category) {
    const categoryTrends = {
      'AI/ML': { score: 0.9, reason: 'AI/ML is highly trending (+0.9)' },
      'Blockchain': { score: 0.8, reason: 'Blockchain remains in high demand (+0.8)' },
      'Data Science': { score: 0.85, reason: 'Data Science continues to grow (+0.85)' },
      'Cloud Computing': { score: 0.8, reason: 'Cloud Computing is essential (+0.8)' },
      'Cybersecurity': { score: 0.85, reason: 'Cybersecurity is critical (+0.85)' },
      'Web Development': { score: 0.7, reason: 'Web Development remains stable (+0.7)' },
      'Mobile Development': { score: 0.65, reason: 'Mobile Development is steady (+0.65)' },
      'DevOps': { score: 0.75, reason: 'DevOps practices are growing (+0.75)' },
      'UI/UX Design': { score: 0.7, reason: 'UI/UX Design is important (+0.7)' },
      'Digital Marketing': { score: 0.6, reason: 'Digital Marketing is stable (+0.6)' },
      'Other': { score: 0.5, reason: 'Unknown category (neutral)' }
    };

    return categoryTrends[category] || categoryTrends['Other'];
  }

  // Analyze provider credibility
  analyzeProvider(provider) {
    const providerScores = {
      'Coursera': { score: 0.9 },
      'edX': { score: 0.85 },
      'LinkedIn Learning': { score: 0.8 },
      'Udemy': { score: 0.75 },
      'Pluralsight': { score: 0.8 },
      'Skillshare': { score: 0.7 },
      'FutureLearn': { score: 0.75 },
      'Khan Academy': { score: 0.8 },
      'Other': { score: 0.6 }
    };

    return providerScores[provider] || providerScores['Other'];
  }

  // Analyze job market demand
  analyzeJobMarket(jobCount) {
    if (jobCount >= 1000) {
      return {
        score: 0.9,
        availability: 'High',
        reason: `High job demand: ${jobCount} postings (+0.9)`
      };
    } else if (jobCount >= 100) {
      return {
        score: 0.7,
        availability: 'Medium',
        reason: `Medium job demand: ${jobCount} postings (+0.7)`
      };
    } else if (jobCount >= 10) {
      return {
        score: 0.4,
        availability: 'Low',
        reason: `Low job demand: ${jobCount} postings (+0.4)`
      };
    } else {
      return {
        score: 0.1,
        availability: 'None',
        reason: `Very low job demand: ${jobCount} postings (+0.1)`
      };
    }
  }

  // Batch analyze multiple courses
  async batchAnalyzeCourses(courses) {
    const results = [];
    
    for (const course of courses) {
      try {
        const analysis = this.analyzeCourse(course);
        results.push({
          courseId: course._id || course.courseUrl,
          analysis: analysis
        });
      } catch (error) {
        console.error(`Error analyzing course ${course.courseTitle}:`, error);
        results.push({
          courseId: course._id || course.courseUrl,
          analysis: {
            trendScore: 0.5,
            confidenceScore: 0.2,
            trend: 'Stable',
            courseDemand: 'Medium',
            jobAvailability: 'Medium',
            reasoning: ['Analysis failed']
          }
        });
      }
    }

    return results;
  }

  // Update trending keywords based on recent data
  updateTrendingKeywords(newKeywords) {
    this.trendingKeywords = [...new Set([...this.trendingKeywords, ...newKeywords])];
  }

  // Get trend summary statistics
  getTrendSummary(courses) {
    const summary = {
      total: courses.length,
      trending: 0,
      stable: 0,
      outdated: 0,
      highDemand: 0,
      lowDemand: 0,
      averageConfidence: 0
    };

    let totalConfidence = 0;

    courses.forEach(course => {
      switch (course.trend) {
        case 'Trending':
          summary.trending++;
          break;
        case 'Outdated':
          summary.outdated++;
          break;
        default:
          summary.stable++;
      }

      if (course.courseDemand === 'High') {
        summary.highDemand++;
      } else if (course.courseDemand === 'Low' || course.courseDemand === 'Declining') {
        summary.lowDemand++;
      }

      totalConfidence += course.confidenceScore || 0.5;
    });

    summary.averageConfidence = courses.length > 0 ? totalConfidence / courses.length : 0;

    return summary;
  }
}

module.exports = new AIAnalyzer();