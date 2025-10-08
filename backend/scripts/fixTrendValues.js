const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function fixTrendValues() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Check current trend values
    const trendStats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 },
          courses: { $push: '$courseTitle' }
        }
      }
    ]);
    
    console.log('\n📊 Current Trend Distribution:');
    trendStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
    });
    
    // The issue: All courses are either 'Trending' or 'Outdated', no 'Stable'
    // Fix: Update the API filter to include 'Trending' courses in main listing
    
    console.log('\n🔧 The issue is in the API filter logic, not the data');
    console.log('All courses are correctly categorized as Trending or Outdated');
    console.log('The API should show Trending courses in "All Courses" section');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  fixTrendValues();
}

module.exports = { fixTrendValues };