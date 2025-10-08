const aiWebSearcher = require('../services/aiWebSearcher');
const mongoose = require('mongoose');
require('dotenv').config();

async function testAISearch() {
  try {
    console.log('🧪 Testing AI-powered course discovery...');
    
    // Check API keys
    if (!process.env.JINA_API_KEY || !process.env.OPENAI_API_KEY) {
      console.error('❌ Missing API keys. Please set JINA_API_KEY and OPENAI_API_KEY in .env');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    const result = await aiWebSearcher.searchAndAnalyzeCourses();
    console.log('🔍 AI Search Result:', result);
    
    if (result.success) {
      console.log('✅ AI course discovery working properly!');
    } else {
      console.log('⚠️ AI search completed with issues:', result.message);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAISearch();