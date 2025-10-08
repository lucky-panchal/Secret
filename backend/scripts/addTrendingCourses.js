const mongoose = require('mongoose');
const Course = require('../models/Course');
const improvedAnalyzer = require('../services/improvedAIAnalyzer');
require('dotenv').config();

async function addTrendingCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaushalx');
    console.log('✅ Connected to MongoDB');
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️ Cleared existing courses');
    
    // Add trending courses with proper analysis
    const trendingCourses = [
      {
        courseTitle: 'Machine Learning by Andrew Ng',
        courseDescription: 'Complete machine learning course covering algorithms, neural networks, and practical applications with Python and TensorFlow',
        courseCategory: 'AI/ML',
        courseProvider: 'Coursera',
        courseUrl: 'https://coursera.org/learn/machine-learning',
        starRating: 4.9,
        status: 'active'
      },
      {
        courseTitle: 'Deep Learning Specialization',
        courseDescription: 'Master deep learning and neural networks. Build and train deep neural networks, CNNs, RNNs, and more',
        courseCategory: 'AI/ML',
        courseProvider: 'Coursera',
        courseUrl: 'https://coursera.org/specializations/deep-learning',
        starRating: 4.8,
        status: 'active'
      },
      {
        courseTitle: 'IBM Blockchain Foundation',
        courseDescription: 'Learn blockchain fundamentals, smart contracts, and cryptocurrency development with hands-on projects',
        courseCategory: 'Blockchain',
        courseProvider: 'edX',
        courseUrl: 'https://edx.org/course/blockchain-fundamentals',
        starRating: 4.6,
        status: 'active'
      },
      {
        courseTitle: 'AWS Cloud Practitioner Essentials',
        courseDescription: 'Master Amazon Web Services cloud computing fundamentals, architecture, and best practices',
        courseCategory: 'Cloud Computing',
        courseProvider: 'AWS',
        courseUrl: 'https://aws.amazon.com/training/cloud-practitioner',
        starRating: 4.7,
        status: 'active'
      },
      {
        courseTitle: 'Google Data Analytics Certificate',
        courseDescription: 'Complete data analytics program covering Python, R, SQL, Tableau, and data visualization',
        courseCategory: 'Data Science',
        courseProvider: 'Coursera',
        courseUrl: 'https://coursera.org/professional-certificates/google-data-analytics',
        starRating: 4.8,
        status: 'active'
      },
      {
        courseTitle: 'Full Stack Web Development Bootcamp',
        courseDescription: 'Learn React, Node.js, MongoDB, and modern web development technologies',
        courseCategory: 'Web Development',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/the-complete-web-development-bootcamp',
        starRating: 4.7,
        status: 'active'
      },
      {
        courseTitle: 'Cybersecurity Fundamentals',
        courseDescription: 'Learn ethical hacking, penetration testing, and cybersecurity best practices',
        courseCategory: 'Cybersecurity',
        courseProvider: 'Coursera',
        courseUrl: 'https://coursera.org/specializations/cyber-security',
        starRating: 4.5,
        status: 'active'
      },
      {
        courseTitle: 'DevOps Engineering on AWS',
        courseDescription: 'Master CI/CD, automation, infrastructure as code with AWS DevOps tools',
        courseCategory: 'DevOps',
        courseProvider: 'AWS',
        courseUrl: 'https://aws.amazon.com/training/path-devops',
        starRating: 4.6,
        status: 'active'
      },
      {
        courseTitle: 'React Native Mobile Development',
        courseDescription: 'Build cross-platform mobile apps with React Native, JavaScript, and modern development practices',
        courseCategory: 'Mobile Development',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/react-native-the-practical-guide',
        starRating: 4.5,
        status: 'active'
      },
      {
        courseTitle: 'UX/UI Design Fundamentals',
        courseDescription: 'Learn user experience design, Figma, prototyping, and design thinking methodologies',
        courseCategory: 'UI/UX Design',
        courseProvider: 'Coursera',
        courseUrl: 'https://coursera.org/specializations/ui-ux-design',
        starRating: 4.4,
        status: 'active'
      }
    ];
    
    // Add outdated courses
    const outdatedCourses = [
      {
        courseTitle: 'Basic Customer Service and Call Center Skills',
        courseDescription: 'Learn basic customer service techniques and call center operations',
        courseCategory: 'Other',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/customer-service-training',
        starRating: 3.2,
        status: 'active'
      },
      {
        courseTitle: 'Manual Software Testing Fundamentals',
        courseDescription: 'Learn manual testing techniques and basic QA processes without automation',
        courseCategory: 'Other',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/manual-testing',
        starRating: 3.5,
        status: 'active'
      },
      {
        courseTitle: 'Basic Graphic Design with Templates',
        courseDescription: 'Learn basic graphic design principles using pre-made templates',
        courseCategory: 'UI/UX Design',
        courseProvider: 'Skillshare',
        courseUrl: 'https://skillshare.com/classes/basic-graphic-design',
        starRating: 3.8,
        status: 'active'
      },
      {
        courseTitle: 'Content Writing and Copywriting Basics',
        courseDescription: 'Learn basic content writing and copywriting techniques for beginners',
        courseCategory: 'Digital Marketing',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/content-writing-basics',
        starRating: 3.4,
        status: 'active'
      },
      {
        courseTitle: 'Basic Data Entry and Excel Skills',
        courseDescription: 'Learn basic data entry techniques and Microsoft Excel fundamentals',
        courseCategory: 'Other',
        courseProvider: 'Udemy',
        courseUrl: 'https://udemy.com/course/data-entry-excel',
        starRating: 3.1,
        status: 'active'
      }
    ];
    
    const allCourses = [...trendingCourses, ...outdatedCourses];
    
    // Add courses with AI analysis
    for (const courseData of allCourses) {
      try {
        // Analyze with improved AI
        const analysis = improvedAnalyzer.analyzeCourseRelevance(courseData);
        
        // Create course with analysis
        const course = new Course({
          ...courseData,
          ...analysis,
          scrapedAt: new Date(),
          nextScrapeAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
        });
        
        await course.save();
        console.log(`✅ Added: ${course.courseTitle} -> ${analysis.trend} (${analysis.courseDemand})`);
        
      } catch (error) {
        console.error(`❌ Error adding ${courseData.courseTitle}:`, error.message);
      }
    }
    
    // Show final statistics
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
    
    console.log('\n🎉 Trending courses added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding trending courses:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  addTrendingCourses();
}

module.exports = { addTrendingCourses };