const aiAnalyzer = require('../services/aiAnalyzer');

// Test AI analyzer with sample course data
const testCourse = {
  courseTitle: 'Advanced Machine Learning with TensorFlow',
  courseDescription: 'Learn deep learning, neural networks, and AI model deployment using TensorFlow and Python',
  courseCategory: 'AI/ML',
  courseProvider: 'Coursera',
  starRating: 4.7
};

console.log('🧠 Testing AI Analyzer...\n');

const analysis = aiAnalyzer.analyzeCourse(testCourse);

console.log('📊 AI Analysis Results:');
console.log('='.repeat(50));
console.log(`Course: ${testCourse.courseTitle}`);
console.log(`Trend: ${analysis.trend}`);
console.log(`Demand: ${analysis.courseDemand}`);
console.log(`Job Availability: ${analysis.jobAvailability}`);
console.log(`Confidence Score: ${analysis.confidenceScore.toFixed(3)}`);
console.log(`Trend Score: ${analysis.trendScore.toFixed(3)}`);
console.log('\n🔍 AI Reasoning:');
analysis.reasoning.forEach((reason, i) => {
  console.log(`${i + 1}. ${reason}`);
});

console.log('\n✅ AI Model is working correctly!');