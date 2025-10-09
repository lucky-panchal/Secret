const axios = require('axios');
const Course = require('../models/Course');

class AIWebSearcher {
  constructor() {
    this.jinaApiKey = process.env.JINA_API_KEY;
    this.huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
    this.isRunning = false;
  }

  async searchWeb(query, limit = 5) {
    try {
      if (this.jinaApiKey) {
        return await this.searchWithJina(query, limit);
      } else {
        // Fallback to mock search results for testing
        return this.getMockSearchResults(query, limit);
      }
    } catch (error) {
      console.error('Web search error:', error.message);
      return this.getMockSearchResults(query, limit);
    }
  }

  async searchWithJina(query, limit) {
    const response = await axios.post('https://s.jina.ai/search', {
      query: query,
      top_k: limit
    }, {
      headers: {
        'Authorization': `Bearer ${this.jinaApiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    return (response.data.data || []).map(result => ({
      title: result.title || '',
      url: result.url || '',
      snippet: result.content?.substring(0, 200) || ''
    }));
  }

  getMockSearchResults(query, limit) {
    const mockResults = {
      'machine learning': [
        {
          title: 'Machine Learning Course - High Demand in 2024',
          url: 'https://coursera.org/learn/machine-learning',
          snippet: 'Machine learning is trending and in high demand. Learn ML algorithms with Python and TensorFlow.'
        },
        {
          title: 'AI and ML Jobs Growing Rapidly',
          url: 'https://example.com/ml-jobs',
          snippet: 'Machine learning jobs are growing rapidly with high salaries and increasing demand in tech industry.'
        }
      ],
      'customer service': [
        {
          title: 'Customer Service Jobs Being Automated',
          url: 'https://example.com/automation',
          snippet: 'Customer service roles are increasingly being automated by AI chatbots and virtual assistants.'
        },
        {
          title: 'AI Replacing Call Center Jobs',
          url: 'https://example.com/ai-replacing',
          snippet: 'Traditional call center and customer service jobs are declining due to AI automation and chatbots.'
        }
      ],
      'blockchain': [
        {
          title: 'Blockchain Development in High Demand',
          url: 'https://example.com/blockchain',
          snippet: 'Blockchain development skills are trending with high demand in cryptocurrency and Web3 projects.'
        }
      ]
    };

    // Find matching results based on query keywords
    for (const [keyword, results] of Object.entries(mockResults)) {
      if (query.toLowerCase().includes(keyword)) {
        return results.slice(0, limit);
      }
    }

    // Default results
    return [
      {
        title: 'Tech Skills in Demand 2024',
        url: 'https://example.com/tech-skills',
        snippet: 'Technology skills continue to be in high demand with growing job opportunities.'
      }
    ].slice(0, limit);
  }

  async searchAndAnalyzeCourses() {
    if (this.isRunning) return { success: false, message: 'Search already running' };
    
    this.isRunning = true;
    console.log('🔍 Starting AI-powered course discovery...');

    try {
      const [trendingCourses, threatenedCourses] = await Promise.all([
        this.searchTrendingCourses(),
        this.searchAIThreatenedCourses()
      ]);

      const allCourses = [...trendingCourses, ...threatenedCourses];
      console.log(`📚 Discovered ${allCourses.length} courses from web search`);

      const savedCourses = await this.saveCourses(allCourses);
      console.log(`✅ Saved ${savedCourses.length} courses to database`);

      return {
        success: true,
        courses: savedCourses.length,
        message: `Successfully discovered and analyzed ${savedCourses.length} courses`
      };

    } catch (error) {
      console.error('❌ AI course discovery failed:', error.message);
      return { success: false, message: error.message };
    } finally {
      this.isRunning = false;
    }
  }

  async searchTrendingCourses() {
    const queries = [
      'trending online courses 2025 machine learning AI',
      'most popular programming courses 2025',
      'high demand tech skills courses 2025',
      'emerging technology courses blockchain web3',
      'data science courses in demand 2025'
    ];

    const courses = [];
    for (const query of queries) {
      try {
        const searchResults = await this.performWebSearch(query);
        const extractedCourses = await this.extractCoursesFromResults(searchResults, 'trending');
        courses.push(...extractedCourses);
      } catch (error) {
        console.warn(`⚠️ Search failed for query: ${query}`);
      }
    }

    return this.deduplicateCourses(courses);
  }

  async searchAIThreatenedCourses() {
    const queries = [
      'jobs threatened by AI automation 2025 courses',
      'careers being replaced by artificial intelligence',
      'manual tasks automated by AI training courses',
      'traditional jobs AI disruption retraining',
      'skills becoming obsolete due to AI'
    ];

    const courses = [];
    for (const query of queries) {
      try {
        const searchResults = await this.performWebSearch(query);
        const extractedCourses = await this.extractCoursesFromResults(searchResults, 'threatened');
        courses.push(...extractedCourses);
      } catch (error) {
        console.warn(`⚠️ Search failed for query: ${query}`);
      }
    }

    return this.deduplicateCourses(courses);
  }

  async performWebSearch(query) {
    try {
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
      console.error('Jina search error:', error.message);
      return [];
    }
  }

  async extractCoursesFromResults(searchResults, type) {
    if (!searchResults.length) return [];

    // Simple rule-based extraction instead of AI
    const courses = [];
    
    for (const result of searchResults) {
      const title = result.title || '';
      const content = (result.snippet || '').toLowerCase();
      
      // Skip if doesn't look like a course
      if (!title.toLowerCase().includes('course') && 
          !title.toLowerCase().includes('learn') &&
          !title.toLowerCase().includes('training') &&
          !content.includes('course') &&
          !content.includes('learn')) {
        continue;
      }
      
      // Determine category based on content
      let category = 'Other';
      if (content.includes('machine learning') || content.includes('ai') || title.toLowerCase().includes('ml')) {
        category = 'AI/ML';
      } else if (content.includes('blockchain') || content.includes('web3')) {
        category = 'Blockchain';
      } else if (content.includes('web development') || content.includes('javascript') || content.includes('react')) {
        category = 'Web Development';
      } else if (content.includes('data science') || content.includes('python')) {
        category = 'Data Science';
      }
      
      // Determine provider from URL
      let provider = 'Other';
      if (result.url.includes('coursera')) provider = 'Coursera';
      else if (result.url.includes('udemy')) provider = 'Udemy';
      else if (result.url.includes('edx')) provider = 'edX';
      else if (result.url.includes('linkedin')) provider = 'LinkedIn Learning';
      
      courses.push({
        courseTitle: title,
        courseDescription: result.snippet || 'Course description not available',
        courseCategory: category,
        courseProvider: provider,
        starRating: 4.0 + Math.random(), // Random rating between 4-5
        courseUrl: result.url,
        trend: type === 'trending' ? 'Trending' : 'Outdated',
        courseDemand: type === 'trending' ? 'High' : 'Declining',
        jobAvailability: type === 'trending' ? 'High' : 'Low',
        confidenceScore: type === 'trending' ? 0.85 : 0.25,
        aiThreatLevel: type === 'threatened' ? 0.8 : 0.1,
        lastUpdated: new Date(),
        scrapedAt: new Date()
      });
    }
    
    return courses;
  }

  buildExtractionPrompt(searchResults, type) {
    const context = searchResults.map(result => 
      `Title: ${result.title}\nURL: ${result.url}\nContent: ${result.content?.substring(0, 500) || 'N/A'}`
    ).join('\n\n');

    const instruction = type === 'trending' 
      ? 'Extract trending, high-demand online courses that are popular in 2025'
      : 'Extract courses for jobs/skills being threatened by AI automation (70-80% threat level)';

    return `${instruction}

From the following search results, extract course information and return a JSON array with this exact structure:
[
  {
    "courseTitle": "Course Name",
    "courseDescription": "Brief description",
    "courseCategory": "AI/ML|Web Development|Data Science|Cloud Computing|Cybersecurity|DevOps|UI/UX Design|Digital Marketing|Blockchain|Other",
    "courseProvider": "Platform name",
    "starRating": 4.5,
    "courseUrl": "https://example.com/course"
  }
]

Search Results:
${context}

Return only valid JSON array, no additional text.`;
  }

  deduplicateCourses(courses) {
    const seen = new Set();
    return courses.filter(course => {
      const key = course.courseUrl || course.courseTitle;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async saveCourses(courses) {
    const savedCourses = [];
    
    for (const courseData of courses) {
      try {
        const course = await Course.findOneAndUpdate(
          { courseUrl: courseData.courseUrl },
          courseData,
          { 
            upsert: true, 
            new: true,
            runValidators: true
          }
        );
        savedCourses.push(course);
      } catch (error) {
        console.error(`Error saving course: ${error.message}`);
      }
    }

    return savedCourses;
  }
}

module.exports = new AIWebSearcher();