const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Check all courses and their trends
    const courses = await Course.find({}).select('courseTitle courseCategory trend courseDemand status');
    
    console.log('\n📊 Database Contents:');
    console.log('=' .repeat(80));
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle}`);
      console.log(`   Category: ${course.courseCategory}`);
      console.log(`   Trend: ${course.trend}`);
      console.log(`   Demand: ${course.courseDemand}`);
      console.log(`   Status: ${course.status}`);
      console.log('');
    });
    
    // Show statistics
    const stats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 },
          courses: { $push: '$courseTitle' }
        }
      }
    ]);
    
    console.log('\n📈 Trend Statistics:');
    console.log('=' .repeat(40));
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
    });
    
    // Test API endpoints
    console.log('\n🔍 Testing API Filters:');
    console.log('=' .repeat(30));
    
    const allActive = await Course.find({ status: 'active', trend: { $ne: 'Outdated' } });
    console.log(`All Courses (non-outdated): ${allActive.length}`);
    
    const trending = await Course.find({ trend: 'Trending', status: 'active' });
    console.log(`Trending Courses: ${trending.length}`);
    
    const outdated = await Course.find({ trend: 'Outdated' });
    console.log(`Outdated Courses: ${outdated.length}`);
    
    const aiml = await Course.find({ courseCategory: 'AI/ML', status: 'active' });
    console.log(`AI/ML Courses: ${aiml.length}`);
    
    const blockchain = await Course.find({ courseCategory: 'Blockchain', status: 'active' });
    console.log(`Blockchain Courses: ${blockchain.length}`);
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  checkDatabase();
}

module.exports = { checkDatabase };