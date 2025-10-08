const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function testCoursesAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Test the same query as the API
    const filter = {};
    const limit = 50;
    const sortObj = { lastUpdated: -1 };
    
    console.log('🔍 Filter:', JSON.stringify(filter));
    console.log('🔍 Limit:', limit);
    
    const [courses, totalCount] = await Promise.all([
      Course.find(filter)
        .sort(sortObj)
        .limit(parseInt(limit))
        .lean(),
      Course.countDocuments(filter)
    ]);
    
    console.log('🔍 Found courses:', courses.length, 'Total:', totalCount);
    
    // Check trend distribution
    const trendCounts = courses.reduce((acc, course) => {
      acc[course.trend] = (acc[course.trend] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Trend distribution:', trendCounts);
    
    // Check status distribution
    const statusCounts = courses.reduce((acc, course) => {
      acc[course.status] = (acc[course.status] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Status distribution:', statusCounts);
    
    // Show all courses with their status and trend
    console.log('\n📋 All courses:');
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle} - ${course.trend} (${course.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  testCoursesAPI();
}

module.exports = { testCoursesAPI };