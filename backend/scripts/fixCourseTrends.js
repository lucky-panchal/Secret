const mongoose = require('mongoose');
const Course = require('../models/Course');
const improvedAnalyzer = require('../services/improvedAIAnalyzer');
require('dotenv').config();

async function fixCourseTrends() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Get all courses
    const courses = await Course.find({});
    console.log(`📊 Found ${courses.length} courses to fix`);
    
    let fixed = 0;
    
    for (const course of courses) {
      try {
        // Re-analyze with improved logic
        const analysis = improvedAnalyzer.analyzeCourseRelevance(course);
        
        // Update the course
        await Course.findByIdAndUpdate(course._id, {
          trend: analysis.trend,
          courseDemand: analysis.courseDemand,
          jobAvailability: analysis.jobAvailability,
          confidenceScore: analysis.confidenceScore,
          aiThreatLevel: analysis.aiThreatLevel,
          lastUpdated: new Date()
        });
        
        console.log(`✅ Fixed: ${course.courseTitle} -> ${analysis.trend} (${analysis.courseDemand})`);
        fixed++;
        
      } catch (error) {
        console.error(`❌ Error fixing ${course.courseTitle}:`, error.message);
      }
    }
    
    // Verify the fix
    console.log(`\n🎉 Fixed ${fixed} courses`);
    
    const finalStats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 },
          courses: { $push: '$courseTitle' }
        }
      }
    ]);
    
    console.log('\n📊 Final Statistics:');
    finalStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
      stat.courses.forEach(title => console.log(`  - ${title}`));
    });
    
    // Test specific courses
    console.log('\n🧪 Testing Specific Courses:');
    const testCourses = [
      'Machine Learning by Andrew Ng',
      'Customer Service',
      'Deep Learning',
      'Manual Testing'
    ];
    
    for (const title of testCourses) {
      const course = await Course.findOne({ courseTitle: { $regex: title, $options: 'i' } });
      if (course) {
        console.log(`${title}: ${course.trend} (${course.courseDemand})`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error fixing course trends:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  fixCourseTrends();
}

module.exports = { fixCourseTrends };