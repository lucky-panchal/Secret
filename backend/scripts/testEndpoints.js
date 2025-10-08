const axios = require('axios');

async function testEndpoints() {
  const baseURL = 'http://localhost:5000/api';
  
  console.log('🧪 Testing API Endpoints...\n');
  
  try {
    // Test 1: All Courses
    console.log('1. Testing /courses (All Courses):');
    const allCoursesRes = await axios.get(`${baseURL}/courses`);
    console.log(`   Status: ${allCoursesRes.status}`);
    console.log(`   Count: ${allCoursesRes.data.data?.courses?.length || 0}`);
    console.log(`   Sample: ${allCoursesRes.data.data?.courses?.[0]?.courseTitle || 'None'}`);
    console.log('');
    
    // Test 2: Trending Courses
    console.log('2. Testing /courses/trending:');
    const trendingRes = await axios.get(`${baseURL}/courses/trending`);
    console.log(`   Status: ${trendingRes.status}`);
    console.log(`   Count: ${trendingRes.data.data?.courses?.length || 0}`);
    console.log(`   Sample: ${trendingRes.data.data?.courses?.[0]?.courseTitle || 'None'}`);
    console.log('');
    
    // Test 3: Outdated Courses
    console.log('3. Testing /courses/outdated:');
    const outdatedRes = await axios.get(`${baseURL}/courses/outdated`);
    console.log(`   Status: ${outdatedRes.status}`);
    console.log(`   Count: ${outdatedRes.data.data?.courses?.length || 0}`);
    console.log(`   Sample: ${outdatedRes.data.data?.courses?.[0]?.courseTitle || 'None'}`);
    console.log('');
    
    // Test 4: Categories
    console.log('4. Testing /courses/categories:');
    const categoriesRes = await axios.get(`${baseURL}/courses/categories`);
    console.log(`   Status: ${categoriesRes.status}`);
    console.log(`   Count: ${categoriesRes.data.data?.length || 0}`);
    console.log('');
    
    // Test 5: AI/ML Category
    console.log('5. Testing /courses/category/AI%2FML:');
    try {
      const aimlRes = await axios.get(`${baseURL}/courses/category/AI%2FML`);
      console.log(`   Status: ${aimlRes.status}`);
      console.log(`   Count: ${aimlRes.data.data?.courses?.length || 0}`);
    } catch (error) {
      console.log(`   Error: ${error.response?.status || error.message}`);
    }
    console.log('');
    
    // Show detailed course data
    console.log('📊 Detailed Analysis:');
    console.log('All Courses Response:', JSON.stringify(allCoursesRes.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing endpoints:', error.message);
  }
}

if (require.main === module) {
  testEndpoints();
}

module.exports = { testEndpoints };