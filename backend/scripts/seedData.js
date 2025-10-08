const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');

const sampleCourses = [
  {
    courseTitle: 'Complete Machine Learning & AI Bootcamp',
    courseDescription: 'Master machine learning algorithms, deep learning, and AI applications with hands-on projects',
    courseCategory: 'AI/ML',
    courseProvider: 'Udemy',
    courseUrl: 'https://example.com/ml-bootcamp',
    starRating: 4.8,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.92,
    status: 'active'
  },
  {
    courseTitle: 'Blockchain Development Masterclass',
    courseDescription: 'Build decentralized applications with Solidity, Web3, and smart contracts',
    courseCategory: 'Blockchain',
    courseProvider: 'Coursera',
    courseUrl: 'https://example.com/blockchain-dev',
    starRating: 4.6,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.88,
    status: 'active'
  },
  {
    courseTitle: 'React Advanced Patterns',
    courseDescription: 'Advanced React concepts, hooks, context, and performance optimization',
    courseCategory: 'Web Development',
    courseProvider: 'LinkedIn Learning',
    courseUrl: 'https://example.com/react-advanced',
    starRating: 4.7,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.85,
    status: 'active'
  },
  {
    courseTitle: 'Python for Data Science',
    courseDescription: 'Learn Python programming for data analysis, visualization, and machine learning',
    courseCategory: 'Data Science',
    courseProvider: 'edX',
    courseUrl: 'https://example.com/python-data-science',
    starRating: 4.5,
    trend: 'Stable',
    courseDemand: 'Medium',
    jobAvailability: 'High',
    confidenceScore: 0.78,
    status: 'active'
  },
  {
    courseTitle: 'Cloud Computing with AWS',
    courseDescription: 'Master Amazon Web Services for cloud infrastructure and deployment',
    courseCategory: 'Cloud Computing',
    courseProvider: 'Other',
    courseUrl: 'https://example.com/aws-cloud',
    starRating: 4.4,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.82,
    status: 'active'
  },
  {
    courseTitle: 'jQuery Fundamentals',
    courseDescription: 'Learn jQuery for DOM manipulation and AJAX requests',
    courseCategory: 'Web Development',
    courseProvider: 'Udemy',
    courseUrl: 'https://example.com/jquery-basics',
    starRating: 3.2,
    trend: 'Outdated',
    courseDemand: 'Declining',
    jobAvailability: 'Low',
    confidenceScore: 0.25,
    status: 'outdated'
  },
  {
    courseTitle: 'Flash Animation Basics',
    courseDescription: 'Create animations using Adobe Flash and ActionScript',
    courseCategory: 'Other',
    courseProvider: 'Skillshare',
    courseUrl: 'https://example.com/flash-animation',
    starRating: 2.8,
    trend: 'Outdated',
    courseDemand: 'Declining',
    jobAvailability: 'None',
    confidenceScore: 0.15,
    status: 'outdated'
  },
  {
    courseTitle: 'Cybersecurity Fundamentals',
    courseDescription: 'Learn ethical hacking, penetration testing, and security best practices',
    courseCategory: 'Cybersecurity',
    courseProvider: 'Pluralsight',
    courseUrl: 'https://example.com/cybersecurity',
    starRating: 4.6,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.89,
    status: 'active'
  },
  {
    courseTitle: 'DevOps with Docker & Kubernetes',
    courseDescription: 'Master containerization and orchestration for modern applications',
    courseCategory: 'DevOps',
    courseProvider: 'Other',
    courseUrl: 'https://example.com/devops-docker',
    starRating: 4.5,
    trend: 'Trending',
    courseDemand: 'High',
    jobAvailability: 'High',
    confidenceScore: 0.87,
    status: 'active'
  },
  {
    courseTitle: 'UI/UX Design Principles',
    courseDescription: 'Learn user interface and user experience design fundamentals',
    courseCategory: 'UI/UX Design',
    courseProvider: 'Other',
    courseUrl: 'https://example.com/ui-ux-design',
    starRating: 4.3,
    trend: 'Stable',
    courseDemand: 'Medium',
    jobAvailability: 'Low',
    confidenceScore: 0.72,
    status: 'active'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    console.log('Cleared existing courses');

    const insertedCourses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${insertedCourses.length} sample courses`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();