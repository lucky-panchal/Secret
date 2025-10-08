const mongoose = require('mongoose');
const dataManager = require('../services/dataManager');
require('dotenv').config();

// Check for required API keys
if (!process.env.JINA_API_KEY || !process.env.OPENAI_API_KEY) {
  console.warn('⚠️ AI API keys not configured. Please set JINA_API_KEY and OPENAI_API_KEY in .env');
  console.warn('📖 See AI_SETUP.md for setup instructions');
}

async function startup() {
  try {
    console.log('🚀 Starting up AI-powered course discovery system...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    // Initialize data
    await dataManager.initializeData();
    
    // Get final stats
    const stats = await dataManager.getDataStats();
    console.log('📊 Final data stats:', {
      total: stats.total,
      active: stats.active,
      trending: stats.trending,
      outdated: stats.outdated,
      recentlyUpdated: stats.recentlyUpdated
    });
    
    console.log('✅ Startup complete - data is ready!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Startup failed:', error);
    process.exit(1);
  }
}

startup();