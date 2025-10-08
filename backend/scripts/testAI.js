const mongoose = require('mongoose');
const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');
const dynamicDataManager = require('../services/dynamicDataManager');
require('dotenv').config();

async function testAIFunctionality() {
  try {
    console.log('🧪 Testing AI functionality...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Test 1: Analyze a sample course
    console.log('\n📊 Test 1: Course Analysis');
    const sampleCourse = {
      courseTitle: 'Machine Learning with Python',
      courseDescription: 'Learn machine learning algorithms and implementation with Python',
      courseCategory: 'AI/ML',
      courseProvider: 'Coursera'
    };
    
    const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(sampleCourse);
    console.log('Analysis result:', analysis);
    
    // Test 2: Get emerging skills
    console.log('\n🚀 Test 2: Emerging Skills');
    const emergingSkills = await aiCourseAnalyzer.getEmergingSkills();
    console.log('Emerging skills:', emergingSkills.slice(0, 5));
    
    // Test 3: Job market trends
    console.log('\n📈 Test 3: Job Market Trends');
    const jobTrends = await aiCourseAnalyzer.analyzeJobMarketTrends('AI/ML');
    console.log('Job market trends for AI/ML:', jobTrends);
    
    // Test 4: Category stats
    console.log('\n📊 Test 4: Category Statistics');
    const categoryStats = await dynamicDataManager.getCategoryStats();
    console.log('Category statistics:', categoryStats);
    
    // Test 5: Data freshness
    console.log('\n🕒 Test 5: Data Freshness');
    const freshness = await dynamicDataManager.getDataFreshness();
    console.log('Data freshness:', freshness);
    
    console.log('\n✅ All AI tests completed successfully!');
    
  } catch (error) {
    console.error('❌ AI test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  testAIFunctionality();
}

module.exports = { testAIFunctionality };