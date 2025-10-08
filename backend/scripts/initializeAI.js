const mongoose = require('mongoose');
const Course = require('../models/Course');
const dynamicDataManager = require('../services/dynamicDataManager');
const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');

async function initializeAIAnalysis() {
  try {
    console.log('🚀 Initializing AI-powered course analysis...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Check if we have courses in the database
    const courseCount = await Course.countDocuments();
    console.log(`📊 Found ${courseCount} courses in database`);
    
    if (courseCount === 0) {
      console.log('🔍 No courses found, adding sample courses...');
      await addSampleCourses();
    }
    
    // Refresh course data with AI analysis
    console.log('🤖 Starting AI analysis of courses...');
    const result = await dynamicDataManager.refreshCourseData();
    console.log('✅ AI analysis completed:', result);
    
    // Search for new courses in trending categories
    const trendingCategories = ['AI/ML', 'Blockchain', 'Data Science', 'Web Development'];
    
    for (const category of trendingCategories) {
      console.log(`🔍 Searching for new ${category} courses...`);
      const searchResult = await dynamicDataManager.searchAndAddCourses(category, 5);
      console.log(`✅ ${category}: ${searchResult.courses?.length || 0} new courses added`);
      
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Get final statistics
    const finalStats = await dynamicDataManager.getCategoryStats();
    console.log('📈 Final statistics:', finalStats);
    
    console.log('🎉 AI initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing AI analysis:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

async function addSampleCourses() {
  const sampleCourses = [
    {
      courseTitle: 'Machine Learning Specialization',
      courseDescription: 'Learn the fundamentals of machine learning with Python and TensorFlow',
      courseCategory: 'AI/ML',
      courseProvider: 'Coursera',
      courseUrl: 'https://coursera.org/specializations/machine-learning',
      starRating: 4.8,
      status: 'active'
    },
    {
      courseTitle: 'Blockchain Basics',
      courseDescription: 'Introduction to blockchain technology and cryptocurrency',
      courseCategory: 'Blockchain',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/blockchain-basics',
      starRating: 4.5,
      status: 'active'
    },
    {
      courseTitle: 'Full Stack Web Development',
      courseDescription: 'Complete web development course with React and Node.js',
      courseCategory: 'Web Development',
      courseProvider: 'edX',
      courseUrl: 'https://edx.org/course/full-stack-web-development',
      starRating: 4.6,
      status: 'active'
    },
    {
      courseTitle: 'Data Science with Python',
      courseDescription: 'Learn data analysis and visualization with Python',
      courseCategory: 'Data Science',
      courseProvider: 'Coursera',
      courseUrl: 'https://coursera.org/specializations/data-science-python',
      starRating: 4.7,
      status: 'active'
    },
    {
      courseTitle: 'AWS Cloud Practitioner',
      courseDescription: 'Get started with Amazon Web Services cloud computing',
      courseCategory: 'Cloud Computing',
      courseProvider: 'LinkedIn Learning',
      courseUrl: 'https://linkedin.com/learning/aws-cloud-practitioner',
      starRating: 4.4,
      status: 'active'
    }
  ];
  
  for (const courseData of sampleCourses) {
    try {
      const course = new Course(courseData);
      await course.save();
      console.log(`✅ Added sample course: ${course.courseTitle}`);
    } catch (error) {
      console.error(`❌ Error adding course ${courseData.courseTitle}:`, error.message);
    }
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  require('dotenv').config();
  initializeAI();
}

module.exports = { initializeAIAnalysis, addSampleCourses };