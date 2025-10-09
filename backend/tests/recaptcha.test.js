const axios = require('axios');

// Mock verifyRecaptcha for testing
async function verifyRecaptcha(token) {
  const response = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    { params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: token } }
  );
  return { success: response.data.success, score: response.data.score || 1.0 };
}

// Test with Google's test token
async function testRecaptcha() {
  process.env.RECAPTCHA_SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
  
  const result = await verifyRecaptcha('test_token');
  console.log('Test Result:', result);
}

testRecaptcha();
