const { 
  verifyRecaptcha, 
  verifyAadhaar, 
  verifyFace 
} = require('../middleware/secureAuth');

/**
 * Unit Tests for Secure Authentication Middleware
 * Tests facial recognition, Aadhaar verification, and reCAPTCHA
 */

describe('Secure Authentication Tests', () => {
  
  describe('verifyAadhaar', () => {
    test('should validate correct Aadhaar format', async () => {
      const aadhaarData = {
        aadhaarNumber: '123456789012',
        consent: true,
        name: 'Test User'
      };
      
      const result = await verifyAadhaar(aadhaarData);
      expect(result.success).toBe(true);
      expect(result.lastFourDigits).toBe('9012');
    });

    test('should reject invalid Aadhaar format', async () => {
      const aadhaarData = {
        aadhaarNumber: '12345',
        consent: true
      };
      
      const result = await verifyAadhaar(aadhaarData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid Aadhaar format');
    });
  });

  describe('verifyFace', () => {
    test('should verify matching face descriptors', async () => {
      const faceData = {
        descriptors: [0.1, 0.2, 0.3, 0.4, 0.5],
        referenceDescriptors: [0.1, 0.2, 0.3, 0.4, 0.5],
        method: 'face-api.js'
      };
      
      const result = await verifyFace(faceData);
      expect(result.success).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.9);
    });

    test('should reject non-matching face descriptors', async () => {
      const faceData = {
        descriptors: [0.1, 0.2, 0.3, 0.4, 0.5],
        referenceDescriptors: [0.9, 0.8, 0.7, 0.6, 0.5],
        method: 'face-api.js'
      };
      
      const result = await verifyFace(faceData);
      expect(result.success).toBe(false);
    });
  });
});
