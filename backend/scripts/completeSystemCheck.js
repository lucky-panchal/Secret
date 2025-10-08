const mongoose = require('mongoose');
const Course = require('../models/Course');
const axios = require('axios');
require('dotenv').config();

async function completeSystemCheck() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB\n');
    
    // 1. Check Database Content
    console.log('1️⃣ DATABASE CHECK:');
    console.log('=' .repeat(40));
    
    const allCourses = await Course.find({});
    console.log(`Total courses in DB: ${allCourses.length}`);
    
    const trendStats = await Course.aggregate([
      { $group: { _id: '$trend', count: { $sum: 1 }, courses: { $push: '$courseTitle' } } }
    ]);
    
    trendStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
      stat.courses.slice(0, 3).forEach(title => console.log(`  - ${title}`));
      if (stat.courses.length > 3) console.log(`  ... and ${stat.courses.length - 3} more`);
    });
    
    // 2. Test API Endpoints
    console.log('\n2️⃣ API ENDPOINTS CHECK:');
    console.log('=' .repeat(40));
    
    try {
      const endpoints = [
        { name: 'All Courses', url: 'http://localhost:5000/api/courses' },
        { name: 'Trending', url: 'http://localhost:5000/api/courses/trending' },
        { name: 'Outdated', url: 'http://localhost:5000/api/courses/outdated' },
        { name: 'Categories', url: 'http://localhost:5000/api/courses/categories' }
      ];
      
      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(endpoint.url);
          const count = endpoint.name === 'Categories' ? 
            response.data.data?.length : 
            response.data.data?.courses?.length;
          console.log(`${endpoint.name}: ${count || 0} items`);
          
          if (endpoint.name !== 'Categories' && count > 0) {
            const sample = response.data.data.courses[0];
            console.log(`  Sample: ${sample.courseTitle} (${sample.trend})`);
          }
        } catch (error) {
          console.log(`${endpoint.name}: ERROR - ${error.message}`);
        }
      }
    } catch (error) {
      console.log('API test failed:', error.message);
    }
    
    // 3. Check Specific Queries
    console.log('\n3️⃣ QUERY TESTS:');
    console.log('=' .repeat(40));
    
    const queries = [
      { name: 'Active Courses', filter: { status: 'active' } },
      { name: 'Trending Courses', filter: { trend: 'Trending', status: 'active' } },
      { name: 'Outdated Courses', filter: { trend: 'Outdated' } },
      { name: 'Non-Outdated', filter: { trend: { $ne: 'Outdated' }, status: 'active' } },
      { name: 'AI/ML Courses', filter: { courseCategory: 'AI/ML', status: 'active' } }
    ];
    
    for (const query of queries) {
      const count = await Course.countDocuments(query.filter);
      console.log(`${query.name}: ${count} courses`);
    }
    
    // 4. Suggest Fix
    console.log('\n4️⃣ DIAGNOSIS:');
    console.log('=' .repeat(40));
    
    const activeCourses = await Course.countDocuments({ status: 'active' });
    const trendingCourses = await Course.countDocuments({ trend: 'Trending', status: 'active' });
    const outdatedCourses = await Course.countDocuments({ trend: 'Outdated' });
    
    console.log(`Active courses: ${activeCourses}`);
    console.log(`Trending courses: ${trendingCourses}`);
    console.log(`Outdated courses: ${outdatedCourses}`);
    
    if (trendingCourses === 0) {
      console.log('\n❌ ISSUE: No trending courses found!');
      console.log('Solution: Check course trend values in database');
    } else {
      console.log('\n✅ Database has trending courses');
      console.log('Issue might be in API filtering or frontend logic');
    }
    
  } catch (error) {
    console.error('❌ System check failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  completeSystemCheck();
}

module.exports = { completeSystemCheck };