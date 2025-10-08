const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

async function fixCourseAnalysis() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Get all courses to see what we're working with
    const courses = await Course.find({}).select('courseTitle courseCategory trend courseDemand');
    console.log(`📊 Found ${courses.length} courses`);
    
    // Show current categorization
    console.log('\n📋 Current Course Analysis:');
    courses.forEach(course => {
      console.log(`${course.courseTitle} | ${course.courseCategory} | ${course.trend} | ${course.courseDemand}`);
    });
    
    // Fix the analysis based on course content
    for (const course of courses) {
      const title = course.courseTitle.toLowerCase();
      let newTrend = 'Stable';
      let newDemand = 'Medium';
      let newJobAvailability = 'Low';
      let aiThreatLevel = 0.1;
      
      // High-demand, trending courses
      if (title.includes('machine learning') || title.includes('deep learning') || 
          title.includes('artificial intelligence') || title.includes('ai') ||
          title.includes('data science') || title.includes('python') ||
          title.includes('blockchain') || title.includes('react') ||
          title.includes('node.js') || title.includes('javascript') ||
          title.includes('cloud') || title.includes('aws') ||
          title.includes('cybersecurity') || title.includes('devops')) {
        newTrend = 'Trending';
        newDemand = 'High';
        newJobAvailability = 'High';
        aiThreatLevel = 0.2;
      }
      
      // Outdated courses
      else if (title.includes('customer service') || title.includes('call center') ||
               title.includes('manual testing') || title.includes('basic graphic') ||
               title.includes('content writing') || title.includes('copywriting') ||
               title.includes('basic') || title.includes('manual') ||
               title.includes('traditional') || title.includes('old')) {
        newTrend = 'Outdated';
        newDemand = 'Declining';
        newJobAvailability = 'None';
        aiThreatLevel = 0.8;
      }
      
      // Update the course
      await Course.findByIdAndUpdate(course._id, {
        trend: newTrend,
        courseDemand: newDemand,
        jobAvailability: newJobAvailability,
        aiThreatLevel: aiThreatLevel,
        confidenceScore: newTrend === 'Trending' ? 0.9 : newTrend === 'Outdated' ? 0.1 : 0.5,
        lastUpdated: new Date()
      });
      
      console.log(`✅ Updated: ${course.courseTitle} -> ${newTrend} (${newDemand})`);
    }
    
    console.log('\n🎉 Course analysis fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing course analysis:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  fixCourseAnalysis();
}

module.exports = { fixCourseAnalysis };