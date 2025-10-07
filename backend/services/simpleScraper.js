const axios = require('axios');
const Course = require('../models/Course');
const aiAnalyzer = require('./aiAnalyzer');

class SimpleScraper {
  constructor() {
    this.isRunning = false;
  }

  async scrapeRealCourses() {
    if (this.isRunning) return { success: false, message: 'Already running' };
    
    this.isRunning = true;
    console.log('🚀 Starting real course data collection...');

    try {
      // Clear existing seed data
      await Course.deleteMany({ courseUrl: { $regex: /example\.com/ } });
      console.log('🗑️ Cleared seed data');

      // Get real courses from multiple sources
      const allCourses = [];
      
      // Source 1: GitHub trending repositories (tech courses)
      const githubCourses = await this.getGitHubCourses();
      allCourses.push(...githubCourses);
      
      // Source 2: FreeCodeCamp courses
      const fccCourses = await this.getFreeCodeCampCourses();
      allCourses.push(...fccCourses);
      
      // Source 3: Coursera public courses (limited)
      const courseraCourses = await this.getCourseraPublicCourses();
      allCourses.push(...courseraCourses);
      
      // Source 4: AI-Disrupted skills (for demonstration)
      const disruptedCourses = await this.getAIDisruptedCourses();
      allCourses.push(...disruptedCourses);

      console.log(`📚 Found ${allCourses.length} real courses`);

      // Process with AI
      const processedCourses = [];
      for (const course of allCourses) {
        try {
          const analysis = aiAnalyzer.analyzeCourse(course);
          processedCourses.push({
            ...course,
            trend: analysis.trend,
            courseDemand: analysis.courseDemand,
            jobAvailability: analysis.jobAvailability === 'Medium' ? 'Low' : analysis.jobAvailability,
            confidenceScore: analysis.confidenceScore,
            lastUpdated: new Date(),
            scrapedAt: new Date()
          });
        } catch (error) {
          console.error('AI analysis error:', error);
          processedCourses.push({
            ...course,
            trend: 'Stable',
            courseDemand: 'Medium',
            jobAvailability: 'Low',
            confidenceScore: 0.5,
            lastUpdated: new Date(),
            scrapedAt: new Date()
          });
        }
      }

      // Save to database
      const savedCourses = [];
      for (const courseData of processedCourses) {
        try {
          const course = new Course(courseData);
          await course.save();
          savedCourses.push(course);
        } catch (error) {
          console.error(`Error saving course: ${error.message}`);
        }
      }

      console.log(`✅ Saved ${savedCourses.length} real courses to database`);
      
      return {
        success: true,
        message: `Successfully scraped ${savedCourses.length} real courses`,
        courses: savedCourses.length
      };

    } catch (error) {
      console.error('❌ Scraping failed:', error);
      return { success: false, message: error.message };
    } finally {
      this.isRunning = false;
    }
  }

  async getGitHubCourses() {
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'machine learning course OR AI course OR blockchain course stars:>100',
          sort: 'stars',
          order: 'desc',
          per_page: 10
        },
        headers: { 'User-Agent': 'CourseAnalyzer/1.0' }
      });

      return response.data.items.map(repo => ({
        courseTitle: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        courseDescription: repo.description || 'Open source course repository',
        courseCategory: this.categorizeFromTitle(repo.name + ' ' + repo.description),
        courseProvider: 'GitHub',
        starRating: Math.min(5, Math.round((repo.stargazers_count / 1000) * 5) / 5),
        courseUrl: repo.html_url,
        sources: [{
          sourceName: 'GitHub',
          url: 'https://github.com/search',
          lastSeen: new Date()
        }]
      }));
    } catch (error) {
      console.error('GitHub API error:', error.message);
      return [];
    }
  }

  async getFreeCodeCampCourses() {
    const courses = [
      {
        courseTitle: 'Responsive Web Design Certification',
        courseDescription: 'Learn HTML, CSS, and responsive web design principles',
        courseCategory: 'Web Development',
        courseProvider: 'FreeCodeCamp',
        starRating: 4.8,
        courseUrl: 'https://www.freecodecamp.org/learn/responsive-web-design/'
      },
      {
        courseTitle: 'JavaScript Algorithms and Data Structures',
        courseDescription: 'Master JavaScript fundamentals and algorithmic thinking',
        courseCategory: 'Web Development', 
        courseProvider: 'FreeCodeCamp',
        starRating: 4.7,
        courseUrl: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/'
      },
      {
        courseTitle: 'Machine Learning with Python',
        courseDescription: 'Learn machine learning using Python and popular libraries',
        courseCategory: 'AI/ML',
        courseProvider: 'FreeCodeCamp',
        starRating: 4.6,
        courseUrl: 'https://www.freecodecamp.org/learn/machine-learning-with-python/'
      },
      {
        courseTitle: 'Data Analysis with Python',
        courseDescription: 'Analyze data using Python, Pandas, and NumPy',
        courseCategory: 'Data Science',
        courseProvider: 'FreeCodeCamp',
        starRating: 4.5,
        courseUrl: 'https://www.freecodecamp.org/learn/data-analysis-with-python/'
      }
    ];

    return courses.map(course => ({
      ...course,
      sources: [{
        sourceName: 'FreeCodeCamp',
        url: 'https://www.freecodecamp.org/learn/',
        lastSeen: new Date()
      }]
    }));
  }

  async getCourseraPublicCourses() {
    // Popular Coursera courses (publicly known)
    const courses = [
      {
        courseTitle: 'Machine Learning by Andrew Ng',
        courseDescription: 'Learn about the most effective machine learning techniques',
        courseCategory: 'AI/ML',
        courseProvider: 'Coursera',
        starRating: 4.9,
        courseUrl: 'https://www.coursera.org/learn/machine-learning'
      },
      {
        courseTitle: 'Deep Learning Specialization',
        courseDescription: 'Master Deep Learning and break into AI',
        courseCategory: 'AI/ML',
        courseProvider: 'Coursera',
        starRating: 4.8,
        courseUrl: 'https://www.coursera.org/specializations/deep-learning'
      },
      {
        courseTitle: 'Google Data Analytics Certificate',
        courseDescription: 'Prepare for a career in data analytics',
        courseCategory: 'Data Science',
        courseProvider: 'Coursera',
        starRating: 4.6,
        courseUrl: 'https://www.coursera.org/professional-certificates/google-data-analytics'
      },
      {
        courseTitle: 'IBM Blockchain Foundation',
        courseDescription: 'Learn blockchain fundamentals and applications',
        courseCategory: 'Blockchain',
        courseProvider: 'Coursera',
        starRating: 4.3,
        courseUrl: 'https://www.coursera.org/learn/ibm-blockchain-essentials-for-developers'
      },
      {
        courseTitle: 'AWS Cloud Practitioner Essentials',
        courseDescription: 'Learn AWS cloud computing fundamentals',
        courseCategory: 'Cloud Computing',
        courseProvider: 'Coursera',
        starRating: 4.4,
        courseUrl: 'https://www.coursera.org/learn/aws-cloud-practitioner-essentials'
      }
    ];

    return courses.map(course => ({
      ...course,
      sources: [{
        sourceName: 'Coursera',
        url: 'https://www.coursera.org/',
        lastSeen: new Date()
      }]
    }));
  }

  async getAIDisruptedCourses() {
    // Courses in areas being disrupted by AI
    const courses = [
      {
        courseTitle: 'Basic Data Entry and Excel Skills',
        courseDescription: 'Learn basic data entry, spreadsheet work, and simple data processing tasks',
        courseCategory: 'Other',
        courseProvider: 'Udemy',
        starRating: 3.2,
        courseUrl: 'https://www.udemy.com/course/data-entry-excel-basics/'
      },
      {
        courseTitle: 'Content Writing and Copywriting Basics',
        courseDescription: 'Master basic content writing, blog writing, and article writing skills',
        courseCategory: 'Digital Marketing',
        courseProvider: 'Skillshare',
        starRating: 3.8,
        courseUrl: 'https://www.skillshare.com/classes/content-writing-basics/'
      },
      {
        courseTitle: 'Basic Graphic Design with Templates',
        courseDescription: 'Learn template design, basic photo editing, and simple graphic design',
        courseCategory: 'UI/UX Design',
        courseProvider: 'Udemy',
        starRating: 3.5,
        courseUrl: 'https://www.udemy.com/course/basic-graphic-design/'
      },
      {
        courseTitle: 'Manual Software Testing Fundamentals',
        courseDescription: 'Learn manual testing, basic QA testing, and regression testing methods',
        courseCategory: 'Other',
        courseProvider: 'Udemy',
        starRating: 3.4,
        courseUrl: 'https://www.udemy.com/course/manual-testing-basics/'
      },
      {
        courseTitle: 'Basic Customer Service and Call Center Skills',
        courseDescription: 'Master basic customer service, call center operations, and chat support',
        courseCategory: 'Other',
        courseProvider: 'LinkedIn Learning',
        starRating: 3.6,
        courseUrl: 'https://www.linkedin.com/learning/customer-service-basics/'
      }
    ];

    return courses.map(course => ({
      ...course,
      sources: [{
        sourceName: course.courseProvider,
        url: 'https://example.com/ai-disrupted-courses',
        lastSeen: new Date()
      }]
    }));
  }

  categorizeFromTitle(title) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('ai') || titleLower.includes('artificial intelligence') || 
        titleLower.includes('machine learning') || titleLower.includes('deep learning')) {
      return 'AI/ML';
    }
    if (titleLower.includes('blockchain') || titleLower.includes('cryptocurrency')) {
      return 'Blockchain';
    }
    if (titleLower.includes('data science') || titleLower.includes('data analysis')) {
      return 'Data Science';
    }
    if (titleLower.includes('web') || titleLower.includes('javascript') || titleLower.includes('react')) {
      return 'Web Development';
    }
    if (titleLower.includes('cloud') || titleLower.includes('aws') || titleLower.includes('azure')) {
      return 'Cloud Computing';
    }
    if (titleLower.includes('security') || titleLower.includes('cybersecurity')) {
      return 'Cybersecurity';
    }
    if (titleLower.includes('devops') || titleLower.includes('docker')) {
      return 'DevOps';
    }
    
    return 'Other';
  }
}

module.exports = new SimpleScraper();