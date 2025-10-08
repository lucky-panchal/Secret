const simpleScraper = require('../services/simpleScraper');
require('dotenv').config();
const mongoose = require('mongoose');

async function testScraper() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const result = await simpleScraper.scrapeRealCourses();
    console.log('Scraper result:', result);
    
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testScraper();