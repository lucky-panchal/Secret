const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');
const aiWebSearcher = require('../services/aiWebSearcher');
require('dotenv').config();

async function quickAITest() {
  console.log('🚀 Quick AI Services Test\n');
  
  // Test 1: Course Analysis
  console.log('📊 Testing Course Analysis...');
  const testCourses = [
    {
      courseTitle: 'Machine Learning with Python',
      courseDescription: 'Learn ML algorithms and deep learning',
      courseCategory: 'AI/ML',
      courseProvider: 'Coursera'
    },
    {
      courseTitle: 'Customer Service Training',
      courseDescription: 'Basic customer service and call center skills',
      courseCategory: 'Other',
      courseProvider: 'Udemy'
    }
  ];
  
  for (const course of testCourses) {
    const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(course);
    console.log(`✅ ${course.courseTitle}:`);
    console.log(`   Trend: ${analysis.trend}`);
    console.log(`   Demand: ${analysis.courseDemand}`);
    console.log(`   Confidence: ${analysis.confidenceScore.toFixed(2)}`);
  }
  
  // Test 2: Web Search
  console.log('\n🔍 Testing Web Search...');
  try {
    const results = await aiWebSearcher.searchWeb('machine learning courses', 2);
    console.log(`✅ Web search returned ${results.length} results:`);
    results.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title}`);
    });
  } catch (error) {
    console.log(`❌ Web search error: ${error.message}`);
  }
  
  // Test 3: Environment Check
  console.log('\n⚙️ Environment Check:');
  console.log(`✅ JINA_API_KEY: ${process.env.JINA_API_KEY ? 'Set' : 'Not set'}`);
  console.log(`✅ HUGGINGFACE_API_KEY: ${process.env.HUGGINGFACE_API_KEY ? 'Set' : 'Not set'}`);
  console.log(`✅ AI_PROVIDER: ${process.env.AI_PROVIDER || 'Not set'}`);
  
  console.log('\n🎉 Quick test completed!');
}

if (require.main === module) {
  quickAITest();
}

module.exports = { quickAITest };