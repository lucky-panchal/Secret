const aiAnalyzer = require('../services/aiAnalyzer');

// Test AI disruption detection
const testCourses = [
  {
    courseTitle: 'Basic Data Entry and Excel Skills',
    courseDescription: 'Learn basic data entry, spreadsheet work, and simple data processing tasks',
    courseCategory: 'Other',
    courseProvider: 'Udemy',
    starRating: 3.2
  },
  {
    courseTitle: 'Content Writing and Copywriting Basics', 
    courseDescription: 'Master basic content writing, blog writing, and article writing skills',
    courseCategory: 'Digital Marketing',
    courseProvider: 'Skillshare',
    starRating: 3.8
  },
  {
    courseTitle: 'Advanced Machine Learning with PyTorch',
    courseDescription: 'Deep dive into neural networks, deep learning, and AI model development',
    courseCategory: 'AI/ML',
    courseProvider: 'Coursera',
    starRating: 4.8
  }
];

console.log('🤖 Testing AI Disruption Detection...\n');

testCourses.forEach((course, i) => {
  console.log(`${i + 1}. Testing: ${course.courseTitle}`);
  console.log('='.repeat(60));
  
  const analysis = aiAnalyzer.analyzeCourse(course);
  
  console.log(`Trend: ${analysis.trend}`);
  console.log(`Demand: ${analysis.courseDemand}`);
  console.log(`Job Availability: ${analysis.jobAvailability}`);
  console.log(`Confidence: ${analysis.confidenceScore.toFixed(3)}`);
  console.log('\nAI Reasoning:');
  analysis.reasoning.forEach((reason, j) => {
    console.log(`  ${j + 1}. ${reason}`);
  });
  console.log('\n');
});

console.log('✅ AI Disruption Detection Test Complete!');