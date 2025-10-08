const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function fixCourseStatus() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Get all courses with incorrect status
    const courses = await Course.find({});
    console.log(`📊 Found ${courses.length} courses to check`);
    
    let fixed = 0;
    
    for (const course of courses) {
      let shouldUpdate = false;
      let newStatus = course.status;
      
      // Fix status based on trend
      if (course.trend === 'Trending' || course.trend === 'Stable') {
        if (course.status !== 'active') {
          newStatus = 'active';
          shouldUpdate = true;
        }
      } else if (course.trend === 'Outdated') {
        // Only set to outdated if jobAvailability is None
        if (course.jobAvailability === 'None' && course.status !== 'outdated') {
          newStatus = 'outdated';
          shouldUpdate = true;
        } else if (course.jobAvailability !== 'None' && course.status !== 'active') {
          // Outdated courses with job availability should still be active
          newStatus = 'active';
          shouldUpdate = true;
        }
      }
      
      if (shouldUpdate) {
        console.log(`🔧 Fixing: ${course.courseTitle}`);
        console.log(`   Trend: ${course.trend}, JobAvailability: ${course.jobAvailability}`);
        console.log(`   Status: ${course.status} → ${newStatus}`);
        
        await Course.updateOne(
          { _id: course._id },
          { $set: { status: newStatus } }
        );
        fixed++;
      }
    }
    
    console.log(`\n✅ Fixed ${fixed} courses`);
    
    // Show final status distribution
    const statusStats = await Course.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          trends: { $push: '$trend' }
        }
      }
    ]);
    
    console.log('\n📈 Final Status Distribution:');
    statusStats.forEach(stat => {
      const trendCounts = stat.trends.reduce((acc, trend) => {
        acc[trend] = (acc[trend] || 0) + 1;
        return acc;
      }, {});
      console.log(`${stat._id}: ${stat.count} courses`);
      console.log(`  Trends: ${JSON.stringify(trendCounts)}`);
    });
    
  } catch (error) {
    console.error('❌ Error fixing course status:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  fixCourseStatus();
}

module.exports = { fixCourseStatus };