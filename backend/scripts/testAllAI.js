const mongoose = require('mongoose');
const Course = require('../models/Course');
const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');
const aiWebSearcher = require('../services/aiWebSearcher');
const dynamicDataManager = require('../services/dynamicDataManager');
require('dotenv').config();

async function testAllAIServices() {
  console.log('🧪 Testing All AI Services and Models...\n');
  
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Database connected\n');
    
    // Test 1: AI Course Analyzer
    console.log('📊 Test 1: AI Course Analyzer');
    console.log('=' .repeat(50));
    
    const testCourses = [
      {
        courseTitle: 'Machine Learning with Python',
        courseDescription: 'Learn ML algorithms and implementation',
        courseCategory: 'AI/ML',
        courseProvider: 'Coursera'
      },
      {
        courseTitle: 'Customer Service Training',
        courseDescription: 'Basic customer service skills',
        courseCategory: 'Other',
        courseProvider: 'Udemy'
      },
      {
        courseTitle: 'Blockchain Development',
        courseDescription: 'Smart contracts and Web3',
        courseCategory: 'Blockchain',
        courseProvider: 'Udemy'
      }
    ];
    
    for (const course of testCourses) {
      try {
        const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(course);
        console.log(`✅ ${course.courseTitle}:`);
        console.log(`   Trend: ${analysis.trend}`);
        console.log(`   Demand: ${analysis.courseDemand}`);
        console.log(`   Job Availability: ${analysis.jobAvailability}`);
        console.log(`   Confidence: ${analysis.confidenceScore.toFixed(2)}`);
        console.log(`   AI Threat: ${analysis.aiThreatLevel.toFixed(2)}\n`);
      } catch (error) {
        console.log(`❌ Error analyzing ${course.courseTitle}: ${error.message}\n`);
      }
    }
    
    // Test 2: Web Searcher
    console.log('🔍 Test 2: AI Web Searcher');
    console.log('=' .repeat(50));
    
    try {
      const searchResults = await aiWebSearcher.searchWeb('machine learning courses 2024', 3);
      console.log(`✅ Web search returned ${searchResults.length} results:`);
      searchResults.forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.title}`);
        console.log(`      URL: ${result.url}`);
        console.log(`      Snippet: ${result.snippet?.substring(0, 100)}...\n`);
      });
    } catch (error) {
      console.log(`❌ Web search error: ${error.message}\n`);
    }
    
    // Test 3: Emerging Skills Detection
    console.log('🚀 Test 3: Emerging Skills Detection');
    console.log('=' .repeat(50));
    
    try {
      const emergingSkills = await aiCourseAnalyzer.getEmergingSkills();
      console.log(`✅ Found ${emergingSkills.length} emerging skills:`);
      emergingSkills.slice(0, 5).forEach((skill, index) => {
        console.log(`   ${index + 1}. ${skill.name} - ${skill.demand} demand`);
      });
      console.log();
    } catch (error) {
      console.log(`❌ Emerging skills error: ${error.message}\n`);
    }
    
    // Test 4: Job Market Analysis
    console.log('📈 Test 4: Job Market Analysis');
    console.log('=' .repeat(50));
    
    const categories = ['AI/ML', 'Blockchain', 'Web Development'];
    for (const category of categories) {
      try {
        const jobTrends = await aiCourseAnalyzer.analyzeJobMarketTrends(category);
        console.log(`✅ ${category} Job Market:`);
        console.log(`   Market Score: ${jobTrends.marketScore.toFixed(2)}`);
        console.log(`   Salary Trend: ${jobTrends.salaryTrend.toFixed(2)}`);
        console.log(`   Job Growth: ${jobTrends.jobGrowth.toFixed(2)}\n`);
      } catch (error) {
        console.log(`❌ Job market analysis error for ${category}: ${error.message}\n`);
      }
    }
    
    // Test 5: Dynamic Data Manager
    console.log('🔄 Test 5: Dynamic Data Manager');
    console.log('=' .repeat(50));
    
    try {
      const categoryStats = await dynamicDataManager.getCategoryStats();
      console.log(`✅ Category Statistics (${categoryStats.length} categories):`);
      categoryStats.forEach(stat => {
        console.log(`   ${stat._id}: ${stat.total} courses, ${stat.trending} trending`);
      });
      console.log();
      
      const freshness = await dynamicDataManager.getDataFreshness();
      console.log(`✅ Data Freshness:`);
      console.log(`   Total: ${freshness.total}`);
      console.log(`   Updated Today: ${freshness.updatedToday}`);
      console.log(`   Needs Update: ${freshness.needsUpdate}\n`);
    } catch (error) {
      console.log(`❌ Dynamic data manager error: ${error.message}\n`);
    }
    
    // Test 6: Database Course Analysis
    console.log('💾 Test 6: Database Course Analysis');
    console.log('=' .repeat(50));
    
    try {
      const courseCount = await Course.countDocuments();
      console.log(`✅ Total courses in database: ${courseCount}`);
      
      if (courseCount > 0) {
        const trendStats = await Course.aggregate([
          {
            $group: {
              _id: '$trend',
              count: { $sum: 1 }
            }
          }
        ]);
        
        console.log('✅ Trend distribution:');
        trendStats.forEach(stat => {
          console.log(`   ${stat._id || 'Unknown'}: ${stat.count} courses`);
        });
        
        const sampleCourses = await Course.find({}).limit(3).select('courseTitle trend courseDemand confidenceScore');
        console.log('\n✅ Sample course analysis:');
        sampleCourses.forEach(course => {
          console.log(`   ${course.courseTitle}: ${course.trend} (${course.courseDemand}) - Confidence: ${course.confidenceScore?.toFixed(2) || 'N/A'}`);
        });
      }
      console.log();
    } catch (error) {
      console.log(`❌ Database analysis error: ${error.message}\n`);
    }
    
    // Test 7: API Configuration
    console.log('⚙️ Test 7: API Configuration');
    console.log('=' .repeat(50));
    
    console.log('✅ Environment Variables:');
    console.log(`   AI_PROVIDER: ${process.env.AI_PROVIDER || 'Not set'}`);
    console.log(`   HF_MODEL: ${process.env.HF_MODEL || 'Not set'}`);
    console.log(`   HUGGINGFACE_API_KEY: ${process.env.HUGGINGFACE_API_KEY ? 'Set' : 'Not set'}`);
    console.log(`   JINA_API_KEY: ${process.env.JINA_API_KEY ? 'Set' : 'Not set'}`);
    console.log(`   OLLAMA_BASE_URL: ${process.env.OLLAMA_BASE_URL || 'Not set'}`);
    console.log(`   MODEL_CONFIDENCE_THRESHOLD: ${process.env.MODEL_CONFIDENCE_THRESHOLD || 'Not set'}\n`);
    
    // Test 8: Performance Test
    console.log('⚡ Test 8: Performance Test');
    console.log('=' .repeat(50));
    
    const startTime = Date.now();
    try {
      const testCourse = {
        courseTitle: 'React Development Bootcamp',
        courseDescription: 'Modern React with hooks and context',
        courseCategory: 'Web Development',
        courseProvider: 'Udemy'
      };
      
      const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(testCourse);
      const endTime = Date.now();
      
      console.log(`✅ Analysis completed in ${endTime - startTime}ms`);
      console.log(`   Result: ${analysis.trend} (${analysis.courseDemand})\n`);
    } catch (error) {
      console.log(`❌ Performance test error: ${error.message}\n`);
    }
    
    console.log('🎉 All AI Services Test Completed!');
    console.log('=' .repeat(50));
    
  } catch (error) {
    console.error('❌ Critical error in AI testing:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Database disconnected');
  }
}

// Test individual components
async function testIndividualComponents() {
  console.log('\n🔧 Testing Individual Components...\n');
  
  // Test AI Course Analyzer keywords
  console.log('📝 Testing AI Course Analyzer Keywords:');
  const analyzer = require('../services/aiCourseAnalyzer');
  
  const keywordTests = [
    { title: 'machine learning python', expected: 'Trending' },
    { title: 'customer service training', expected: 'Outdated' },
    { title: 'blockchain development', expected: 'Trending' },
    { title: 'manual testing basics', expected: 'Outdated' },
    { title: 'react javascript course', expected: 'Trending' }
  ];
  
  for (const test of keywordTests) {
    const mockCourse = {
      courseTitle: test.title,
      courseDescription: test.title,
      courseCategory: 'Other',
      courseProvider: 'Test'
    };
    
    const result = await analyzer.analyzeCourseRelevance(mockCourse);
    const status = result.trend === test.expected ? '✅' : '❌';
    console.log(`   ${status} "${test.title}" -> ${result.trend} (expected: ${test.expected})`);
  }
}

if (require.main === module) {
  testAllAIServices().then(() => {
    return testIndividualComponents();
  });
}

module.exports = { testAllAIServices, testIndividualComponents };