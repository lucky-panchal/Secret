const mongoose = require('mongoose');
const Course = require('../models/Course');
const aiCourseAnalyzer = require('../services/aiCourseAnalyzer');
require('dotenv').config();

async function comprehensiveFix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Get all courses
    const courses = await Course.find({});
    console.log(`📊 Found ${courses.length} courses to analyze`);
    
    if (courses.length === 0) {
      console.log('No courses found. Adding sample courses...');
      await addSampleCourses();
      return;
    }
    
    console.log('\n🔍 Current courses:');
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle} | ${course.courseCategory} | ${course.trend || 'No trend'}`);
    });
    
    console.log('\n🤖 Re-analyzing all courses with improved AI...');
    
    let updated = 0;
    for (const course of courses) {
      try {
        // Use the improved AI analyzer
        const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(course);
        
        // Update the course
        await Course.findByIdAndUpdate(course._id, {
          trend: analysis.trend,
          courseDemand: analysis.courseDemand,
          jobAvailability: analysis.jobAvailability,
          confidenceScore: analysis.confidenceScore,
          aiThreatLevel: analysis.aiThreatLevel,
          lastUpdated: new Date()
        });
        
        console.log(`✅ ${course.courseTitle} -> ${analysis.trend} (${analysis.courseDemand})`);
        updated++;
        
      } catch (error) {
        console.error(`❌ Error analyzing ${course.courseTitle}:`, error.message);
      }
    }
    
    // Show final statistics
    console.log(`\n📈 Analysis complete! Updated ${updated} courses`);
    
    const stats = await Course.aggregate([
      {
        $group: {
          _id: '$trend',
          count: { $sum: 1 },
          courses: { $push: '$courseTitle' }
        }
      }
    ]);
    
    console.log('\n📊 Final Statistics:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} courses`);
      stat.courses.forEach(title => console.log(`  - ${title}`));
    });
    
  } catch (error) {
    console.error('❌ Error in comprehensive fix:', error);
  } finally {
    await mongoose.disconnect();
  }
}

async function addSampleCourses() {
  const sampleCourses = [
    // Trending AI/ML courses
    {
      courseTitle: 'Machine Learning Specialization by Andrew Ng',
      courseDescription: 'Learn machine learning fundamentals with Python, TensorFlow, and real-world applications',
      courseCategory: 'AI/ML',
      courseProvider: 'Coursera',
      courseUrl: 'https://coursera.org/specializations/machine-learning-introduction',
      starRating: 4.9,
      status: 'active'
    },
    {
      courseTitle: 'Deep Learning Specialization',
      courseDescription: 'Master deep learning and neural networks with hands-on projects',
      courseCategory: 'AI/ML',
      courseProvider: 'Coursera',
      courseUrl: 'https://coursera.org/specializations/deep-learning',
      starRating: 4.8,
      status: 'active'
    },
    {
      courseTitle: 'Zero to Mastery Machine Learning',
      courseDescription: 'Complete machine learning course from beginner to advanced with Python',
      courseCategory: 'AI/ML',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/complete-machine-learning-and-data-science-bootcamp',
      starRating: 4.7,
      status: 'active'
    },
    
    // Trending Blockchain courses
    {
      courseTitle: 'Blockchain Development Bootcamp',
      courseDescription: 'Learn blockchain development, smart contracts, and Web3 applications',
      courseCategory: 'Blockchain',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/blockchain-developer',
      starRating: 4.6,
      status: 'active'
    },
    
    // Trending Web Development
    {
      courseTitle: 'Full Stack JavaScript Developer',
      courseDescription: 'Master React, Node.js, and modern web development',
      courseCategory: 'Web Development',
      courseProvider: 'edX',
      courseUrl: 'https://edx.org/course/full-stack-javascript',
      starRating: 4.5,
      status: 'active'
    },
    
    // Outdated courses
    {
      courseTitle: 'Basic Customer Service and Call Center Training',
      courseDescription: 'Learn basic customer service skills and call center operations',
      courseCategory: 'Other',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/customer-service-training',
      starRating: 3.2,
      status: 'active'
    },
    {
      courseTitle: 'Manual Software Testing Fundamentals',
      courseDescription: 'Learn manual testing techniques and basic QA processes',
      courseCategory: 'Other',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/manual-testing',
      starRating: 3.5,
      status: 'active'
    },
    {
      courseTitle: 'Basic Graphic Design with Photoshop',
      courseDescription: 'Learn basic graphic design principles and Photoshop basics',
      courseCategory: 'UI/UX Design',
      courseProvider: 'Skillshare',
      courseUrl: 'https://skillshare.com/classes/basic-graphic-design',
      starRating: 3.8,
      status: 'active'
    },
    {
      courseTitle: 'Content Writing and Copywriting Basics',
      courseDescription: 'Learn basic content writing and copywriting techniques',
      courseCategory: 'Digital Marketing',
      courseProvider: 'Udemy',
      courseUrl: 'https://udemy.com/course/content-writing-basics',
      starRating: 3.4,
      status: 'active'
    }
  ];
  
  for (const courseData of sampleCourses) {
    try {
      const course = new Course(courseData);
      await course.save();
      console.log(`✅ Added: ${course.courseTitle}`);
    } catch (error) {
      console.error(`❌ Error adding ${courseData.courseTitle}:`, error.message);
    }
  }
  
  console.log('\n🤖 Analyzing sample courses...');
  const courses = await Course.find({});
  
  for (const course of courses) {
    const analysis = await aiCourseAnalyzer.analyzeCourseRelevance(course);
    await Course.findByIdAndUpdate(course._id, {
      trend: analysis.trend,
      courseDemand: analysis.courseDemand,
      jobAvailability: analysis.jobAvailability,
      confidenceScore: analysis.confidenceScore,
      aiThreatLevel: analysis.aiThreatLevel,
      lastUpdated: new Date()
    });
    console.log(`✅ Analyzed: ${course.courseTitle} -> ${analysis.trend}`);
  }
}

if (require.main === module) {
  comprehensiveFix();
}

module.exports = { comprehensiveFix };