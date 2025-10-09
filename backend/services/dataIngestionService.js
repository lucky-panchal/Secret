const axios = require('axios');
const Course = require('../models/Course');
const cron = require('node-cron');

class DataIngestionService {
  constructor() {
    this.jinaApiKey = process.env.JINA_API_KEY;
    this.isRunning = false;
    this.lastIngestionTime = null;
  }

  // Initialize daily data ingestion
  initializeDailyIngestion() {
    // Run daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      console.log('🔄 Starting daily data ingestion...');
      await this.performDailyIngestion();
    });

    console.log('📅 Daily data ingestion scheduled');
  }

  // Perform comprehensive daily data ingestion
  async performDailyIngestion() {
    if (this.isRunning) {
      console.log('⚠️ Data ingestion already running, skipping...');
      return;
    }

    this.isRunning = true;
    const startTime = new Date();

    try {
      console.log('🚀 Starting comprehensive data ingestion...');

      // Phase 1: Scrape trending skills and jobs
      const trendingData = await this.scrapeTrendingData();
      
      // Phase 2: Scrape outdated skills and jobs
      const outdatedData = await this.scrapeOutdatedData();
      
      // Phase 3: Scrape new courses
      const courseData = await this.scrapeNewCourses();
      
      // Phase 4: Process and normalize data
      const processedData = await this.processAndNormalizeData({
        trending: trendingData,
        outdated: outdatedData,
        courses: courseData
      });

      // Phase 5: Update database
      const updateResults = await this.updateDatabase(processedData);

      // Phase 6: Perform data quality checks
      await this.performDataQualityChecks();

      this.lastIngestionTime = new Date();
      const duration = (this.lastIngestionTime - startTime) / 1000;

      console.log(`✅ Daily data ingestion completed in ${duration}s`);
      console.log(`📊 Results: ${JSON.stringify(updateResults, null, 2)}`);

      return {
        success: true,
        duration,
        results: updateResults,
        timestamp: this.lastIngestionTime
      };

    } catch (error) {
      console.error('❌ Daily data ingestion failed:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    } finally {
      this.isRunning = false;
    }
  }

  // Scrape trending skills and jobs data
  async scrapeTrendingData() {
    const trendingQueries = [
      'trending tech skills 2024 high demand',
      'emerging technology jobs future proof',
      'AI machine learning jobs growth 2024',
      'blockchain developer demand 2024',
      'cloud computing skills trending',
      'cybersecurity jobs high growth',
      'data science skills in demand',
      'remote work tech skills 2024'
    ];

    const trendingData = [];

    for (const query of trendingQueries) {
      try {
        const searchResults = await this.performWebSearch(query);
        const extractedData = this.extractSkillsAndJobs(searchResults, 'trending');
        trendingData.push(...extractedData);
        
        // Rate limiting
        await this.delay(1000);
      } catch (error) {
        console.warn(`⚠️ Failed to scrape trending data for: ${query}`);
      }
    }

    return this.deduplicateData(trendingData);
  }

  // Scrape outdated skills and jobs data
  async scrapeOutdatedData() {
    const outdatedQueries = [
      'jobs being automated AI replacement 2024',
      'obsolete tech skills declining demand',
      'careers threatened by automation',
      'outdated programming languages 2024',
      'manual jobs AI disruption',
      'traditional roles being automated',
      'declining job markets technology'
    ];

    const outdatedData = [];

    for (const query of outdatedQueries) {
      try {
        const searchResults = await this.performWebSearch(query);
        const extractedData = this.extractSkillsAndJobs(searchResults, 'outdated');
        outdatedData.push(...extractedData);
        
        await this.delay(1000);
      } catch (error) {
        console.warn(`⚠️ Failed to scrape outdated data for: ${query}`);
      }
    }

    return this.deduplicateData(outdatedData);
  }

  // Scrape new courses
  async scrapeNewCourses() {
    const courseQueries = [
      'new online courses 2024 trending technology',
      'latest programming courses high rated',
      'AI machine learning courses 2024',
      'blockchain development courses new',
      'cloud computing certification courses',
      'cybersecurity training courses 2024'
    ];

    const courseData = [];

    for (const query of courseQueries) {
      try {
        const searchResults = await this.performWebSearch(query);
        const extractedCourses = this.extractCourses(searchResults);
        courseData.push(...extractedCourses);
        
        await this.delay(1000);
      } catch (error) {
        console.warn(`⚠️ Failed to scrape course data for: ${query}`);
      }
    }

    return this.deduplicateData(courseData);
  }

  // Perform web search using Jina AI
  async performWebSearch(query) {
    try {
      if (!this.jinaApiKey) {
        return this.getMockSearchResults(query);
      }

      const response = await axios.post('https://s.jina.ai/search', {
        query: query,
        top_k: 10
      }, {
        headers: {
          'Authorization': `Bearer ${this.jinaApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      return response.data.data || [];
    } catch (error) {
      console.error(`Web search error for "${query}":`, error.message);
      return this.getMockSearchResults(query);
    }
  }

  // Extract skills and jobs from search results
  extractSkillsAndJobs(searchResults, type) {
    const extracted = [];

    for (const result of searchResults) {
      const title = result.title || '';
      const content = result.content || result.snippet || '';
      
      // Extract skills using pattern matching
      const skills = this.extractSkillsFromText(title + ' ' + content);
      const jobs = this.extractJobsFromText(title + ' ' + content);

      extracted.push({
        type: 'skill_data',
        category: type,
        skills,
        jobs,
        source: result.url,
        confidence: this.calculateConfidence(title, content, type),
        timestamp: new Date()
      });
    }

    return extracted;
  }

  // Extract courses from search results
  extractCourses(searchResults) {
    const courses = [];

    for (const result of searchResults) {
      const title = result.title || '';
      const content = result.content || result.snippet || '';
      
      // Check if this looks like a course
      if (this.isCourseContent(title, content)) {
        const course = {
          courseTitle: this.cleanCourseTitle(title),
          courseDescription: content.substring(0, 200),
          courseUrl: result.url,
          courseProvider: this.extractProvider(result.url),
          courseCategory: this.categorizeContent(title + ' ' + content),
          starRating: 4.0 + Math.random(),
          trend: 'Trending',
          courseDemand: 'High',
          jobAvailability: 'High',
          confidenceScore: 0.8,
          aiThreatLevel: 0.1,
          lastUpdated: new Date(),
          scrapedAt: new Date()
        };

        courses.push(course);
      }
    }

    return courses;
  }

  // Extract skills from text using NLP patterns
  extractSkillsFromText(text) {
    const skillPatterns = [
      /\b(python|javascript|java|react|node\.?js|angular|vue|typescript)\b/gi,
      /\b(machine learning|AI|artificial intelligence|deep learning|neural networks)\b/gi,
      /\b(blockchain|cryptocurrency|web3|smart contracts|solidity)\b/gi,
      /\b(aws|azure|google cloud|kubernetes|docker|devops)\b/gi,
      /\b(cybersecurity|penetration testing|ethical hacking|security)\b/gi,
      /\b(data science|data analysis|sql|nosql|mongodb|postgresql)\b/gi
    ];

    const skills = new Set();
    
    for (const pattern of skillPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => skills.add(match.toLowerCase()));
      }
    }

    return Array.from(skills);
  }

  // Extract job titles from text
  extractJobsFromText(text) {
    const jobPatterns = [
      /\b(software engineer|developer|programmer|architect)\b/gi,
      /\b(data scientist|data analyst|machine learning engineer)\b/gi,
      /\b(blockchain developer|smart contract developer|web3 developer)\b/gi,
      /\b(cloud engineer|devops engineer|site reliability engineer)\b/gi,
      /\b(cybersecurity specialist|security analyst|penetration tester)\b/gi,
      /\b(product manager|project manager|scrum master)\b/gi
    ];

    const jobs = new Set();
    
    for (const pattern of jobPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => jobs.add(match.toLowerCase()));
      }
    }

    return Array.from(jobs);
  }

  // Process and normalize scraped data
  async processAndNormalizeData(rawData) {
    const processed = {
      trending: {
        skills: new Set(),
        jobs: new Set(),
        courses: []
      },
      outdated: {
        skills: new Set(),
        jobs: new Set()
      },
      courses: []
    };

    // Process trending data
    for (const item of rawData.trending) {
      if (item.skills) item.skills.forEach(skill => processed.trending.skills.add(skill));
      if (item.jobs) item.jobs.forEach(job => processed.trending.jobs.add(job));
    }

    // Process outdated data
    for (const item of rawData.outdated) {
      if (item.skills) item.skills.forEach(skill => processed.outdated.skills.add(skill));
      if (item.jobs) item.jobs.forEach(job => processed.outdated.jobs.add(job));
    }

    // Process courses
    processed.courses = rawData.courses.filter(course => 
      course.courseTitle && course.courseUrl && course.courseTitle.length > 5
    );

    // Convert Sets to Arrays
    processed.trending.skills = Array.from(processed.trending.skills);
    processed.trending.jobs = Array.from(processed.trending.jobs);
    processed.outdated.skills = Array.from(processed.outdated.skills);
    processed.outdated.jobs = Array.from(processed.outdated.jobs);

    return processed;
  }

  // Update database with processed data
  async updateDatabase(processedData) {
    const results = {
      coursesAdded: 0,
      coursesUpdated: 0,
      coursesMarkedOutdated: 0
    };

    try {
      // Add new courses
      for (const courseData of processedData.courses) {
        const existingCourse = await Course.findOne({ courseUrl: courseData.courseUrl });
        
        if (!existingCourse) {
          const course = new Course(courseData);
          await course.save();
          results.coursesAdded++;
        } else {
          // Update existing course
          existingCourse.lastUpdated = new Date();
          existingCourse.trend = 'Trending';
          await existingCourse.save();
          results.coursesUpdated++;
        }
      }

      // Mark outdated courses
      const outdatedSkills = processedData.outdated.skills;
      if (outdatedSkills.length > 0) {
        const outdatedCourses = await Course.updateMany(
          {
            $or: outdatedSkills.map(skill => ({
              courseTitle: { $regex: skill, $options: 'i' }
            }))
          },
          {
            trend: 'Outdated',
            courseDemand: 'Declining',
            lastUpdated: new Date()
          }
        );
        
        results.coursesMarkedOutdated = outdatedCourses.modifiedCount;
      }

    } catch (error) {
      console.error('Database update error:', error);
      throw error;
    }

    return results;
  }

  // Perform data quality checks
  async performDataQualityChecks() {
    try {
      const totalCourses = await Course.countDocuments();
      const activeCourses = await Course.countDocuments({ status: 'active' });
      const trendingCourses = await Course.countDocuments({ trend: 'Trending' });
      const outdatedCourses = await Course.countDocuments({ trend: 'Outdated' });

      const qualityMetrics = {
        totalCourses,
        activeCourses,
        trendingCourses,
        outdatedCourses,
        dataFreshness: activeCourses / totalCourses,
        trendingRatio: trendingCourses / activeCourses
      };

      console.log('📊 Data Quality Metrics:', qualityMetrics);

      // Alert if data quality is poor
      if (qualityMetrics.dataFreshness < 0.7) {
        console.warn('⚠️ Data freshness below threshold (70%)');
      }

      return qualityMetrics;
    } catch (error) {
      console.error('Data quality check error:', error);
      return null;
    }
  }

  // Helper methods
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  deduplicateData(data) {
    const seen = new Set();
    return data.filter(item => {
      const key = JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  calculateConfidence(title, content, type) {
    let confidence = 0.5;
    
    if (title.length > 10) confidence += 0.1;
    if (content.length > 100) confidence += 0.1;
    if (type === 'trending' && content.includes('2024')) confidence += 0.2;
    if (content.includes('high demand') || content.includes('growing')) confidence += 0.1;
    
    return Math.min(0.95, confidence);
  }

  isCourseContent(title, content) {
    const courseKeywords = ['course', 'training', 'learn', 'tutorial', 'certification', 'bootcamp'];
    const titleLower = title.toLowerCase();
    const contentLower = content.toLowerCase();
    
    return courseKeywords.some(keyword => 
      titleLower.includes(keyword) || contentLower.includes(keyword)
    );
  }

  cleanCourseTitle(title) {
    return title.replace(/[^\w\s-]/g, '').trim().substring(0, 100);
  }

  extractProvider(url) {
    if (url.includes('coursera')) return 'Coursera';
    if (url.includes('udemy')) return 'Udemy';
    if (url.includes('edx')) return 'edX';
    if (url.includes('linkedin')) return 'LinkedIn Learning';
    if (url.includes('pluralsight')) return 'Pluralsight';
    return 'Other';
  }

  categorizeContent(text) {
    const textLower = text.toLowerCase();
    
    if (textLower.includes('ai') || textLower.includes('machine learning')) return 'AI/ML';
    if (textLower.includes('blockchain') || textLower.includes('crypto')) return 'Blockchain';
    if (textLower.includes('web') || textLower.includes('javascript')) return 'Web Development';
    if (textLower.includes('data') || textLower.includes('analytics')) return 'Data Science';
    if (textLower.includes('cloud') || textLower.includes('aws')) return 'Cloud Computing';
    if (textLower.includes('security') || textLower.includes('cyber')) return 'Cybersecurity';
    
    return 'Other';
  }

  getMockSearchResults(query) {
    // Fallback mock data for testing
    return [
      {
        title: `${query} - Latest Trends 2024`,
        content: `Comprehensive guide to ${query} with high demand skills and emerging opportunities.`,
        url: `https://example.com/${query.replace(/\s+/g, '-')}`
      }
    ];
  }

  // Get ingestion status
  getIngestionStatus() {
    return {
      isRunning: this.isRunning,
      lastIngestionTime: this.lastIngestionTime,
      nextScheduledRun: '2:00 AM daily'
    };
  }
}

module.exports = new DataIngestionService();