const mongoose = require('mongoose');
const dataManager = require('./services/dataManager');
const Course = require('./models/Course');
require('dotenv').config();

async function testAISystem() {
  try {
    console.log('🧪 Testing AI-powered course discovery system...');
    
    // Check API keys
    const hasJina = !!process.env.JINA_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    
    console.log('🔑 API Keys Status:');
    console.log(`  Jina AI: ${hasJina ? '✅' : '❌'} ${hasJina ? 'Configured' : 'Missing'}`);
    console.log(`  OpenAI: ${hasOpenAI ? '✅' : '❌'} ${hasOpenAI ? 'Configured' : 'Missing'}`);
    
    if (!hasJina || !hasOpenAI) {
      console.log('📖 Please check AI_SETUP.md for configuration instructions');
    }
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    // Test data initialization
    await dataManager.initializeData();
    
    // Get comprehensive stats
    const stats = await dataManager.getDataStats();
    const aiThreatened = await Course.getAIThreatenedCourses(5);
    const emerging = await Course.getEmergingCourses(5);
    
    console.log('📊 System Stats:', {
      total: stats.total,
      active: stats.active,
      trending: stats.trending,
      outdated: stats.outdated,
      aiThreatened: aiThreatened.length,
      emerging: emerging.length
    });
    
    console.log('✅ AI-powered course discovery system is working!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAISystem();