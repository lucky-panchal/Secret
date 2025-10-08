const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    const Course = require('../models/Course');
    
    // Create compound indexes for efficient queries
    await Course.collection.createIndex({ trend: 1, lastUpdated: -1 });
    await Course.collection.createIndex({ courseCategory: 1, courseDemand: 1 });
    await Course.collection.createIndex({ status: 1, jobAvailability: 1 });
    await Course.collection.createIndex({ courseProvider: 1, starRating: -1 });
    
    console.log('📊 Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
};

module.exports = connectDB;