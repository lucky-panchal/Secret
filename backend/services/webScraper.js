const axios = require('axios');
const Course = require('../models/Course');

class WebScraper {
  constructor() {
    this.searchQueries = [
      'machine learning course 2024',
      'artificial intelligence certification',
      'blockchain development course',
      'react javascript tutorial',
      'python data science course',
      'aws cloud computing certification',
      'cybersecurity fundamentals course',
      'full stack web development',
      'deep learning neural networks',
      'data analysis with python'
    ];
  }

  async searchCourses(query, limit = 5) {
    try {
      console.log(`🔍 Searching for: ${query}`);
      
      // Simulate course discovery with realistic data
      const mockCourses = this.generateMockCourses(query, limit);
      
      // Save to database
      const savedCourses = [];
      for (const courseData of mockCourses) {
        try {
          const existingCourse = await Course.findOne({ courseUrl: courseData.courseUrl });
          if (!existingCourse) {
            const course = new Course(courseData);
            await course.save();
            savedCourses.push(course);
          }
        } catch (error) {
          console.error(`❌ Error saving course: ${courseData.courseTitle}`, error.message);
        }
      }
      
      console.log(`✅ Found and saved ${savedCourses.length} new courses for query: ${query}`);
      return savedCourses;
      
    } catch (error) {
      console.error(`❌ Error searching for courses with query "${query}":`, error);
      return [];
    }
  }

  generateMockCourses(query, limit) {
    const providers = ['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight'];
    const categories = {
      'machine learning': 'AI/ML',
      'artificial intelligence': 'AI/ML',
      'blockchain': 'Blockchain',
      'react': 'Web Development',
      'javascript': 'Web Development',
      'python': 'Data Science',
      'aws': 'Cloud Computing',
      'cloud': 'Cloud Computing',
      'cybersecurity': 'Cybersecurity',
      'web development': 'Web Development',
      'deep learning': 'AI/ML',
      'data': 'Data Science'
    };

    const courses = [];
    const baseUrl = 'https://example.com/course/';
    
    for (let i = 0; i < limit; i++) {
      const provider = providers[Math.floor(Math.random() * providers.length)];
      const category = this.getCategoryFromQuery(query, categories);
      const rating = (3.5 + Math.random() * 1.5).toFixed(1);
      const confidence = (0.6 + Math.random() * 0.3).toFixed(2);
      
      const course = {
        courseTitle: this.generateCourseTitle(query, i),
        courseDescription: this.generateCourseDescription(query, category),
        courseCategory: category,
        courseProvider: provider,
        starRating: parseFloat(rating),
        courseUrl: `${baseUrl}${query.replace(/\s+/g, '-')}-${i + 1}`,
        courseDemand: this.getDemandLevel(category),
        trend: this.getTrendLevel(category),
        jobAvailability: this.getJobAvailability(category),
        confidenceScore: parseFloat(confidence),
        aiThreatLevel: this.getAIThreatLevel(category),
        lastUpdated: new Date(),
        scrapedAt: new Date(),
        nextScrapeAt: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
      };
      
      courses.push(course);
    }
    
    return courses;
  }

  getCategoryFromQuery(query, categories) {
    const lowerQuery = query.toLowerCase();
    for (const [keyword, category] of Object.entries(categories)) {
      if (lowerQuery.includes(keyword)) {
        return category;
      }
    }
    return 'Other';
  }

  generateCourseTitle(query, index) {
    const titles = [
      `Complete ${query} Masterclass`,
      `${query} for Beginners to Advanced`,
      `Professional ${query} Certification`,
      `${query} Bootcamp 2024`,
      `Master ${query} in 30 Days`
    ];
    return titles[index % titles.length];
  }

  generateCourseDescription(query, category) {
    const descriptions = {
      'AI/ML': `Comprehensive ${query} course covering machine learning algorithms, neural networks, and practical applications in industry.`,
      'Blockchain': `Learn ${query} fundamentals including smart contracts, cryptocurrency, and decentralized applications.`,
      'Web Development': `Master ${query} with hands-on projects, modern frameworks, and industry best practices.`,
      'Data Science': `Complete ${query} program covering data analysis, visualization, and statistical modeling.`,
      'Cloud Computing': `Professional ${query} certification covering cloud architecture, services, and deployment strategies.`,
      'Cybersecurity': `Essential ${query} training covering security protocols, threat analysis, and risk management.`,
      'Other': `Professional ${query} course with practical skills and industry-relevant knowledge.`
    };
    return descriptions[category] || descriptions['Other'];
  }

  getDemandLevel(category) {
    const highDemandCategories = ['AI/ML', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'Blockchain'];
    return highDemandCategories.includes(category) ? 'High' : 'Medium';
  }

  getTrendLevel(category) {
    const trendingCategories = ['AI/ML', 'Blockchain', 'Cloud Computing', 'Cybersecurity'];
    return trendingCategories.includes(category) ? 'Trending' : 'Stable';
  }

  getJobAvailability(category) {
    const highJobCategories = ['AI/ML', 'Data Science', 'Cloud Computing', 'Web Development'];
    return highJobCategories.includes(category) ? 'High' : 'Medium';
  }

  getAIThreatLevel(category) {
    const lowThreatCategories = ['AI/ML', 'Cybersecurity', 'Cloud Computing'];
    return lowThreatCategories.includes(category) ? 0.1 : 0.3;
  }

  async refreshAllCourses() {
    try {
      console.log('🔄 Starting comprehensive course refresh...');
      let totalNewCourses = 0;
      
      for (const query of this.searchQueries) {
        const newCourses = await this.searchCourses(query, 3);
        totalNewCourses += newCourses.length;
        
        // Add delay between searches to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log(`✅ Course refresh completed. Added ${totalNewCourses} new courses.`);
      return totalNewCourses;
      
    } catch (error) {
      console.error('❌ Error during course refresh:', error);
      return 0;
    }
  }

  async updateCourseData() {
    try {
      console.log('🔄 Updating existing course data...');
      
      const courses = await Course.find({
        nextScrapeAt: { $lte: new Date() }
      }).limit(50);
      
      let updatedCount = 0;
      
      for (const course of courses) {
        // Update course metrics
        course.lastUpdated = new Date();
        course.nextScrapeAt = new Date(Date.now() + 6 * 60 * 60 * 1000);
        
        // Simulate some data changes
        if (Math.random() > 0.8) {
          course.starRating = Math.max(3.0, Math.min(5.0, course.starRating + (Math.random() - 0.5) * 0.2));
        }
        
        await course.save();
        updatedCount++;
      }
      
      console.log(`✅ Updated ${updatedCount} courses`);
      return updatedCount;
      
    } catch (error) {
      console.error('❌ Error updating course data:', error);
      return 0;
    }
  }
}

module.exports = new WebScraper();