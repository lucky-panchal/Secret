const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const initialCourses = [
  // AI/ML Courses
  {
    courseTitle: "Machine Learning Specialization",
    courseDescription: "Complete machine learning course covering supervised learning, unsupervised learning, and neural networks",
    courseCategory: "AI/ML",
    courseProvider: "Coursera",
    starRating: 4.8,
    courseUrl: "https://www.coursera.org/specializations/machine-learning",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.95,
    aiThreatLevel: 0.1
  },
  {
    courseTitle: "Deep Learning Specialization",
    courseDescription: "Master deep learning and neural networks with hands-on projects",
    courseCategory: "AI/ML",
    courseProvider: "Coursera",
    starRating: 4.7,
    courseUrl: "https://www.coursera.org/specializations/deep-learning",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.92,
    aiThreatLevel: 0.1
  },
  {
    courseTitle: "Python for Data Science and AI",
    courseDescription: "Learn Python programming for data science and artificial intelligence applications",
    courseCategory: "AI/ML",
    courseProvider: "edX",
    starRating: 4.6,
    courseUrl: "https://www.edx.org/course/python-for-data-science",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.88,
    aiThreatLevel: 0.1
  },
  
  // Blockchain Courses
  {
    courseTitle: "Blockchain Fundamentals",
    courseDescription: "Understanding blockchain technology, cryptocurrencies, and smart contracts",
    courseCategory: "Blockchain",
    courseProvider: "Udemy",
    starRating: 4.5,
    courseUrl: "https://www.udemy.com/course/blockchain-fundamentals",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.85,
    aiThreatLevel: 0.1
  },
  {
    courseTitle: "Ethereum Smart Contract Development",
    courseDescription: "Build decentralized applications using Ethereum and Solidity",
    courseCategory: "Blockchain",
    courseProvider: "Udemy",
    starRating: 4.4,
    courseUrl: "https://www.udemy.com/course/ethereum-smart-contracts",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.82,
    aiThreatLevel: 0.1
  },
  
  // Web Development
  {
    courseTitle: "Full Stack Web Development",
    courseDescription: "Complete web development bootcamp covering HTML, CSS, JavaScript, React, and Node.js",
    courseCategory: "Web Development",
    courseProvider: "Udemy",
    starRating: 4.6,
    courseUrl: "https://www.udemy.com/course/full-stack-web-development",
    courseDemand: "High",
    trend: "Stable",
    jobAvailability: "High",
    confidenceScore: 0.78,
    aiThreatLevel: 0.2
  },
  {
    courseTitle: "React.js Complete Course",
    courseDescription: "Master React.js for building modern web applications",
    courseCategory: "Web Development",
    courseProvider: "Udemy",
    starRating: 4.7,
    courseUrl: "https://www.udemy.com/course/react-complete-course",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.85,
    aiThreatLevel: 0.15
  },
  
  // Cloud Computing
  {
    courseTitle: "AWS Cloud Practitioner",
    courseDescription: "Amazon Web Services fundamentals and cloud computing basics",
    courseCategory: "Cloud Computing",
    courseProvider: "Coursera",
    starRating: 4.5,
    courseUrl: "https://www.coursera.org/learn/aws-cloud-practitioner",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.88,
    aiThreatLevel: 0.1
  },
  {
    courseTitle: "Microsoft Azure Fundamentals",
    courseDescription: "Introduction to Microsoft Azure cloud services and solutions",
    courseCategory: "Cloud Computing",
    courseProvider: "edX",
    starRating: 4.4,
    courseUrl: "https://www.edx.org/course/microsoft-azure-fundamentals",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.85,
    aiThreatLevel: 0.1
  },
  
  // Data Science
  {
    courseTitle: "Data Science Professional Certificate",
    courseDescription: "Complete data science program covering statistics, Python, and machine learning",
    courseCategory: "Data Science",
    courseProvider: "Coursera",
    starRating: 4.6,
    courseUrl: "https://www.coursera.org/professional-certificates/data-science",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.90,
    aiThreatLevel: 0.1
  },
  
  // Cybersecurity
  {
    courseTitle: "Cybersecurity Fundamentals",
    courseDescription: "Essential cybersecurity concepts and practices for modern organizations",
    courseCategory: "Cybersecurity",
    courseProvider: "edX",
    starRating: 4.5,
    courseUrl: "https://www.edx.org/course/cybersecurity-fundamentals",
    courseDemand: "High",
    trend: "Trending",
    jobAvailability: "High",
    confidenceScore: 0.87,
    aiThreatLevel: 0.1
  },
  
  // Outdated Courses
  {
    courseTitle: "Basic Data Entry Skills",
    courseDescription: "Traditional data entry techniques and office software basics",
    courseCategory: "Other",
    courseProvider: "Other",
    starRating: 3.2,
    courseUrl: "https://example.com/data-entry",
    courseDemand: "Declining",
    trend: "Outdated",
    jobAvailability: "Low",
    confidenceScore: 0.25,
    aiThreatLevel: 0.8
  },
  {
    courseTitle: "Manual Bookkeeping",
    courseDescription: "Traditional bookkeeping methods without modern software",
    courseCategory: "Other",
    courseProvider: "Other",
    starRating: 3.0,
    courseUrl: "https://example.com/bookkeeping",
    courseDemand: "Declining",
    trend: "Outdated",
    jobAvailability: "Low",
    confidenceScore: 0.20,
    aiThreatLevel: 0.9
  }
];

async function initializeCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️ Cleared existing courses');
    
    // Insert initial courses
    const courses = await Course.insertMany(initialCourses);
    console.log(`✅ Inserted ${courses.length} initial courses`);
    
    // Show summary
    const trendCounts = await Course.aggregate([
      { $group: { _id: '$trend', count: { $sum: 1 } } }
    ]);
    
    console.log('📊 Course distribution:');
    trendCounts.forEach(item => {
      console.log(`  ${item._id}: ${item.count} courses`);
    });
    
  } catch (error) {
    console.error('❌ Error initializing courses:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  initializeCourses();
}

module.exports = { initializeCourses, initialCourses };