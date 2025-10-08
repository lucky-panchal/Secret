const mongoose = require('mongoose');
const Course = require('../models/Course');
const improvedAnalyzer = require('../services/improvedAIAnalyzer');
require('dotenv').config();

async function debugCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Get all courses and their current analysis
    const courses = await Course.find({}).select('courseTitle courseCategory trend courseDemand confidenceScore aiThreatLevel');
    
    console.log('\n📊 Current Course Analysis:');
    console.log('=' .repeat(80));
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle}`);
      console.log(`   Category: ${course.courseCategory}`);
      console.log(`   Current Trend: ${course.trend || 'Not set'}`);
      console.log(`   Current Demand: ${course.courseDemand || 'Not set'}`);
      console.log(`   Confidence: ${course.confidenceScore?.toFixed(2) || 'N/A'}`);
      console.log(`   AI Threat: ${course.aiThreatLevel?.toFixed(2) || 'N/A'}`);
      
      // Test AI analysis
      const testAnalysis = improvedAnalyzer.analyzeCourseRelevance({
        courseTitle: course.courseTitle,
        courseDescription: 'Test description',
        courseCategory: course.courseCategory
      });
      
      console.log(`   AI Analysis: ${testAnalysis.trend} (${testAnalysis.courseDemand})`);
      console.log(`   Should be: ${testAnalysis.trend === course.trend ? '✅ CORRECT' : '❌ WRONG'}`);
      console.log('');
    });
    
    // Show trend distribution
    const trendStats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 },
          courses: { $push: '$courseTitle' }
        }
      }
    ]);
    
    console.log('\n📈 Trend Distribution:');
    console.log('=' .repeat(50));
    trendStats.forEach(stat => {
      console.log(`${stat._id || 'Unknown'}: ${stat.count} courses`);
      stat.courses.forEach(title => console.log(`  - ${title}`));
    });
    
  } catch (error) {
    console.error('❌ Error debugging courses:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  debugCourses();
}

module.exports = { debugCourses };