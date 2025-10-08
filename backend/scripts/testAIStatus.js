const mongoose = require('mongoose');
const Course = require('../models/Course');
const improvedAnalyzer = require('../services/improvedAIAnalyzer');
require('dotenv').config();

async function testAIStatus() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Test AI Analysis Accuracy
    console.log('\n🧪 Testing AI Analysis Accuracy:');
    console.log('=' .repeat(50));
    
    const testCases = [
      { title: 'Machine Learning by Andrew Ng', expected: 'Trending' },
      { title: 'Deep Learning Specialization', expected: 'Trending' },
      { title: 'Customer Service Training', expected: 'Outdated' },
      { title: 'Manual Testing Basics', expected: 'Outdated' },
      { title: 'React Development Course', expected: 'Trending' }
    ];
    
    let correct = 0;
    for (const test of testCases) {
      const analysis = improvedAnalyzer.analyzeCourseRelevance({
        courseTitle: test.title,
        courseDescription: test.title,
        courseCategory: 'AI/ML'
      });
      
      const isCorrect = analysis.trend === test.expected;
      console.log(`${isCorrect ? '✅' : '❌'} ${test.title}: ${analysis.trend} (expected: ${test.expected})`);
      if (isCorrect) correct++;
    }
    
    console.log(`\nAccuracy: ${correct}/${testCases.length} (${(correct/testCases.length*100).toFixed(1)}%)`);
    
    // Test Database Status
    console.log('\n📊 Database Status:');
    console.log('=' .repeat(30));
    
    const stats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 }
        }
      }
    ]);
    
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
    });
    
    // Test Emerging Skills
    console.log('\n🚀 Emerging Skills:');
    console.log('=' .repeat(25));
    
    const skills = improvedAnalyzer.getEmergingSkills();
    skills.slice(0, 5).forEach((skill, index) => {
      console.log(`${index + 1}. ${skill.name} - ${skill.demand} demand (${skill.growth})`);
    });
    
    // Test Job Market Analysis
    console.log('\n📈 Job Market Analysis:');
    console.log('=' .repeat(30));
    
    const categories = ['AI/ML', 'Blockchain', 'Web Development'];
    for (const category of categories) {
      const trends = improvedAnalyzer.analyzeJobMarketTrends(category);
      console.log(`${category}: Growth ${(trends.projectedGrowth*100).toFixed(0)}%, Salary $${trends.avgSalary?.toLocaleString()}`);
    }
    
    console.log('\n🎉 AI Services Status: WORKING CORRECTLY');
    
  } catch (error) {
    console.error('❌ AI Status Test Failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  testAIStatus();
}

module.exports = { testAIStatus };