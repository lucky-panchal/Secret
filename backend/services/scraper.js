const axios = require('axios');
const cheerio = require('cheerio');
const { chromium } = require('playwright');
const Course = require('../models/Course');
const aiAnalyzer = require('./aiAnalyzer');
const { broadcastUpdate } = require('./websocket');

class CourseScraper {
  constructor() {
    this.browser = null;
    this.isRunning = false;
    this.scrapedCount = 0;
    this.errorCount = 0;
    this.startTime = null;
    
    // Rate limiting
    this.requestDelay = parseInt(process.env.REQUEST_DELAY_MS) || 2000;
    this.maxConcurrent = parseInt(process.env.MAX_CONCURRENT_SCRAPES) || 5;
    
    // Scraping sources configuration
    this.sources = [
      {
        name: 'Coursera',
        baseUrl: 'https://www.coursera.org',
        searchEndpoints: [
          '/search?query=artificial+intelligence',
          '/search?query=machine+learning',
          '/search?query=blockchain',
          '/search?query=data+science',
          '/search?query=web+development',
          '/search?query=cloud+computing'
        ],
        parser: this.parseCoursera.bind(this)
      },
      {
        name: 'Udemy',
        baseUrl: 'https://www.udemy.com',
        searchEndpoints: [
          '/courses/search/?q=artificial+intelligence',
          '/courses/search/?q=machine+learning',
          '/courses/search/?q=blockchain',
          '/courses/search/?q=data+science',
          '/courses/search/?q=web+development'
        ],
        parser: this.parseUdemy.bind(this)
      }
    ];
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrapeAllSources() {
    if (this.isRunning) {
      console.log('⚠️ Scraper already running, skipping...');
      return { success: false, message: 'Scraper already running' };
    }

    this.isRunning = true;
    this.scrapedCount = 0;
    this.errorCount = 0;
    this.startTime = new Date();

    console.log('🚀 Starting comprehensive course scraping...');
    
    try {
      await this.initBrowser();
      
      const allCourses = [];
      
      // Scrape from each source
      for (const source of this.sources) {
        try {
          console.log(`📚 Scraping ${source.name}...`);
          const courses = await this.scrapeSource(source);
          allCourses.push(...courses);
          
          // Broadcast progress update
          broadcastUpdate({
            type: 'scrape_progress',
            source: source.name,
            coursesFound: courses.length,
            totalScraped: this.scrapedCount
          });
          
        } catch (error) {
          console.error(`❌ Error scraping ${source.name}:`, error.message);
          this.errorCount++;
        }
      }

      // Process and analyze courses
      console.log(`🔍 Analyzing ${allCourses.length} courses with AI...`);
      const processedCourses = await this.processAndAnalyzeCourses(allCourses);

      // Save to database
      console.log('💾 Saving courses to database...');
      const savedCourses = await this.saveCourses(processedCourses);

      const endTime = new Date();
      const duration = Math.round((endTime - this.startTime) / 1000);

      const result = {
        success: true,
        summary: {
          totalScraped: this.scrapedCount,
          totalSaved: savedCourses.length,
          errors: this.errorCount,
          duration: `${duration}s`,
          sources: this.sources.map(s => s.name)
        },
        courses: savedCourses
      };

      // Broadcast completion
      broadcastUpdate({
        type: 'scrape_complete',
        summary: result.summary
      });

      console.log('✅ Scraping completed successfully');
      return result;

    } catch (error) {
      console.error('❌ Scraping failed:', error);
      return {
        success: false,
        message: error.message,
        summary: {
          totalScraped: this.scrapedCount,
          errors: this.errorCount + 1
        }
      };
    } finally {
      this.isRunning = false;
      await this.closeBrowser();
    }
  }

  async scrapeSource(source) {
    const courses = [];
    
    for (const endpoint of source.searchEndpoints) {
      try {
        await this.delay(this.requestDelay);
        
        const url = source.baseUrl + endpoint;
        console.log(`🔍 Scraping: ${url}`);
        
        const pageData = await this.scrapePage(url);
        const parsedCourses = await source.parser(pageData, url);
        
        courses.push(...parsedCourses);
        this.scrapedCount += parsedCourses.length;
        
      } catch (error) {
        console.error(`❌ Error scraping ${endpoint}:`, error.message);
        this.errorCount++;
      }
    }
    
    return courses;
  }

  async scrapePage(url) {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      // Set user agent and headers
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Navigate to page
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for content to load
      await page.waitForTimeout(2000);
      
      // Get page content
      const content = await page.content();
      const $ = cheerio.load(content);
      
      return { $, url, page };
      
    } finally {
      await page.close();
    }
  }

  async parseCoursera(pageData, sourceUrl) {
    const { $ } = pageData;
    const courses = [];

    try {
      // Coursera course cards selector (may need adjustment based on current DOM)
      $('.cds-9 .cds-ProductCard-base').each((index, element) => {
        try {
          const $el = $(element);
          
          const title = $el.find('h3').text().trim();
          const description = $el.find('.cds-ProductCard-body p').text().trim();
          const provider = 'Coursera';
          const rating = parseFloat($el.find('[data-testid="rating"]').text()) || 0;
          const courseUrl = $el.find('a').attr('href');
          
          if (title && courseUrl) {
            courses.push({
              courseTitle: title,
              courseDescription: description || 'No description available',
              courseProvider: provider,
              starRating: rating,
              courseUrl: courseUrl.startsWith('http') ? courseUrl : `https://www.coursera.org${courseUrl}`,
              courseCategory: this.categorizeFromTitle(title),
              sources: [{
                sourceName: provider,
                url: sourceUrl,
                lastSeen: new Date()
              }]
            });
          }
        } catch (error) {
          console.error('Error parsing Coursera course:', error);
        }
      });
    } catch (error) {
      console.error('Error in Coursera parser:', error);
    }

    return courses;
  }

  async parseUdemy(pageData, sourceUrl) {
    const { $ } = pageData;
    const courses = [];

    try {
      // Udemy course cards selector
      $('.course-card--container--3zXPS, [data-testid="course-card"]').each((index, element) => {
        try {
          const $el = $(element);
          
          const title = $el.find('h3, [data-testid="course-title"]').text().trim();
          const description = $el.find('.course-card--course-headline--yIrRk').text().trim();
          const provider = 'Udemy';
          const rating = parseFloat($el.find('.star-rating--rating-number--3lVe8').text()) || 0;
          const courseUrl = $el.find('a').attr('href');
          
          if (title && courseUrl) {
            courses.push({
              courseTitle: title,
              courseDescription: description || 'No description available',
              courseProvider: provider,
              starRating: rating,
              courseUrl: courseUrl.startsWith('http') ? courseUrl : `https://www.udemy.com${courseUrl}`,
              courseCategory: this.categorizeFromTitle(title),
              sources: [{
                sourceName: provider,
                url: sourceUrl,
                lastSeen: new Date()
              }]
            });
          }
        } catch (error) {
          console.error('Error parsing Udemy course:', error);
        }
      });
    } catch (error) {
      console.error('Error in Udemy parser:', error);
    }

    return courses;
  }

  categorizeFromTitle(title) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('ai') || titleLower.includes('artificial intelligence') || 
        titleLower.includes('machine learning') || titleLower.includes('deep learning') ||
        titleLower.includes('neural network')) {
      return 'AI/ML';
    }
    
    if (titleLower.includes('blockchain') || titleLower.includes('cryptocurrency') ||
        titleLower.includes('bitcoin') || titleLower.includes('ethereum') ||
        titleLower.includes('web3') || titleLower.includes('defi')) {
      return 'Blockchain';
    }
    
    if (titleLower.includes('data science') || titleLower.includes('data analysis') ||
        titleLower.includes('analytics') || titleLower.includes('big data')) {
      return 'Data Science';
    }
    
    if (titleLower.includes('web development') || titleLower.includes('javascript') ||
        titleLower.includes('react') || titleLower.includes('node') ||
        titleLower.includes('html') || titleLower.includes('css')) {
      return 'Web Development';
    }
    
    if (titleLower.includes('mobile') || titleLower.includes('android') ||
        titleLower.includes('ios') || titleLower.includes('flutter') ||
        titleLower.includes('react native')) {
      return 'Mobile Development';
    }
    
    if (titleLower.includes('cloud') || titleLower.includes('aws') ||
        titleLower.includes('azure') || titleLower.includes('gcp') ||
        titleLower.includes('kubernetes') || titleLower.includes('docker')) {
      return 'Cloud Computing';
    }
    
    if (titleLower.includes('security') || titleLower.includes('cybersecurity') ||
        titleLower.includes('ethical hacking') || titleLower.includes('penetration')) {
      return 'Cybersecurity';
    }
    
    if (titleLower.includes('devops') || titleLower.includes('ci/cd') ||
        titleLower.includes('jenkins') || titleLower.includes('terraform')) {
      return 'DevOps';
    }
    
    if (titleLower.includes('design') || titleLower.includes('ui') ||
        titleLower.includes('ux') || titleLower.includes('figma')) {
      return 'UI/UX Design';
    }
    
    if (titleLower.includes('marketing') || titleLower.includes('seo') ||
        titleLower.includes('social media') || titleLower.includes('advertising')) {
      return 'Digital Marketing';
    }
    
    return 'Other';
  }

  async processAndAnalyzeCourses(courses) {
    console.log(`🤖 Processing ${courses.length} courses with AI analysis...`);
    
    const processedCourses = [];
    
    for (let i = 0; i < courses.length; i += 10) {
      const batch = courses.slice(i, i + 10);
      
      try {
        const analyses = await aiAnalyzer.batchAnalyzeCourses(batch);
        
        for (let j = 0; j < batch.length; j++) {
          const course = batch[j];
          const analysis = analyses[j]?.analysis || {};
          
          processedCourses.push({
            ...course,
            trend: analysis.trend || 'Stable',
            courseDemand: analysis.courseDemand || 'Medium',
            jobAvailability: analysis.jobAvailability || 'Medium',
            confidenceScore: analysis.confidenceScore || 0.5,
            lastUpdated: new Date(),
            scrapedAt: new Date()
          });
        }
        
        // Small delay between batches
        await this.delay(500);
        
      } catch (error) {
        console.error('Error in batch analysis:', error);
        // Add courses with default values if analysis fails
        batch.forEach(course => {
          processedCourses.push({
            ...course,
            trend: 'Stable',
            courseDemand: 'Medium',
            jobAvailability: 'Medium',
            confidenceScore: 0.3,
            lastUpdated: new Date(),
            scrapedAt: new Date()
          });
        });
      }
    }
    
    return processedCourses;
  }

  async saveCourses(courses) {
    const savedCourses = [];
    
    for (const courseData of courses) {
      try {
        // Check if course already exists
        const existingCourse = await Course.findOne({ courseUrl: courseData.courseUrl });
        
        if (existingCourse) {
          // Update existing course
          Object.assign(existingCourse, courseData);
          await existingCourse.save();
          savedCourses.push(existingCourse);
        } else {
          // Create new course
          const newCourse = new Course(courseData);
          await newCourse.save();
          savedCourses.push(newCourse);
        }
      } catch (error) {
        console.error(`Error saving course ${courseData.courseTitle}:`, error.message);
      }
    }
    
    return savedCourses;
  }

  async scrapeJobData() {
    // Placeholder for job market data scraping
    // This would integrate with job boards like Indeed, LinkedIn Jobs, etc.
    console.log('📊 Job market data scraping not implemented yet');
    return [];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      scrapedCount: this.scrapedCount,
      errorCount: this.errorCount,
      startTime: this.startTime,
      sources: this.sources.map(s => s.name)
    };
  }
}

module.exports = new CourseScraper();