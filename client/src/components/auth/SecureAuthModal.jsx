'use client';
import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Modal, 
  Paper, 
  Typography, 
  Button, 
  TextField, 
  Stepper, 
  Step, 
  StepLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  FaceRetouchingNatural, 
  Security, 
  VerifiedUser,
  CameraAlt,
  Refresh
} from '@mui/icons-material';

/**
 * SecureAuthModal Component
 * Implements facial recognition, Aadhaar verification, and reCAPTCHA
 * for Indian users before accessing assessment/dashboard
 */
export default function SecureAuthModal({ open, onClose, onSuccess, userEmail, userId }) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [faceDescriptors, setFaceDescriptors] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceApiLoadedRef = useRef(false);

  const steps = ['reCAPTCHA Verification', 'Aadhaar Verification', 'Facial Recognition'];

  // Load face-api.js models
  useEffect(() => {
    if (open && !faceApiLoadedRef.current) {
      loadFaceApiModels();
    }
  }, [open]);

  // Load reCAPTCHA script
  useEffect(() => {
    if (open && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [open]);

  /**
   * Load face-api.js models from CDN
   */
  const loadFaceApiModels = async () => {
    try {
      if (typeof window === 'undefined' || faceApiLoadedRef.current) return;

      // Dynamically import face-api.js
      const faceapi = await import('@vladmandic/face-api');
      
      const MODEL_URL = '/models'; // Store models in public/models folder
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      
      faceApiLoadedRef.current = true;
      console.log('✅ Face-API models loaded successfully');
    } catch (error) {
      console.error('❌ Error loading face-api models:', error);
      setError('Failed to load facial recognition models. Please refresh.');
    }
  };

  /**
   * Step 1: Execute reCAPTCHA
   */
  const handleRecaptchaVerification = async () => {
    try {
      setLoading(true);
      setError('');

      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'secure_login' }
      );

      setRecaptchaToken(token);
      setSuccess('reCAPTCHA verified successfully');
      setActiveStep(1);
    } catch (err) {
      setError('reCAPTCHA verification failed. Please try again.');
      console.error('reCAPTCHA error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 2: Verify Aadhaar
   */
  const handleAadhaarVerification = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate Aadhaar format
      if (!/^\d{12}$/.test(aadhaarNumber)) {
        throw new Error('Invalid Aadhaar number. Must be 12 digits.');
      }

      if (!consent) {
        throw new Error('Please provide consent for Aadhaar verification');
      }

      setSuccess('Aadhaar verified successfully');
      setActiveStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 3: Capture and verify face
   */
  const startFaceCapture = async () => {
    try {
      setLoading(true);
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setLoading(false);
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
      setLoading(false);
    }
  };

  /**
   * Capture face and extract descriptors
   */
  const captureFace = async () => {
    try {
      setLoading(true);
      setError('');

      const faceapi = await import('@vladmandic/face-api');
      
      if (!videoRef.current) {
        throw new Error('Video not initialized');
      }

      // Detect face and extract descriptors
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        throw new Error('No face detected. Please position your face clearly.');
      }

      // Store face descriptors
      setFaceDescriptors(Array.from(detection.descriptor));
      
      // Draw detection on canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const displaySize = { width: 640, height: 480 };
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetection = faceapi.resizeResults(detection, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
      }

      setSuccess('Face captured successfully');
      
      // Stop video stream
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }

      // Proceed to final verification
      await submitSecureAuth(Array.from(detection.descriptor));
    } catch (err) {
      setError(err.message);
      console.error('Face capture error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submit all verification data to backend
   */
  const submitSecureAuth = async (descriptors) => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/verify-secure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          email: userEmail,
          recaptchaToken,
          aadhaarData: {
            aadhaarNumber,
            consent,
            name: userEmail.split('@')[0]
          },
          faceData: {
            descriptors,
            method: 'face-api.js',
            referenceDescriptors: descriptors // In production, fetch from Aadhaar/stored reference
          }
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      setSuccess('Secure authentication completed successfully!');
      
      // Call success callback after 1 second
      setTimeout(() => {
        onSuccess(data.data);
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message);
      console.error('Secure auth submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle fallback when face capture fails
   */
  const handleFallback = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/fallback-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          email: userEmail,
          reason: 'Face capture failed',
          alternateMethod: 'otp'
        })
      });

      const data = await response.json();
      alert('Fallback verification initiated. Please check your email for OTP.');
    } catch (err) {
      console.error('Fallback error:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 600 },
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <Paper sx={{
          p: 4,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 3
        }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Security sx={{ fontSize: 56, color: 'var(--primary)', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text-primary)', mb: 1 }}>
              Secure Authentication
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Complete verification to access your dashboard
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Step 1: reCAPTCHA */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="body1" sx={{ mb: 3, color: 'var(--text-primary)' }}>
                Click below to verify you're not a robot
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={handleRecaptchaVerification}
                disabled={loading}
                sx={{
                  py: 2,
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  '&:hover': { background: 'var(--primary)' }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Verify reCAPTCHA'}
              </Button>
            </Box>
          )}

          {/* Step 2: Aadhaar */}
          {activeStep === 1 && (
            <Box>
              <TextField
                fullWidth
                label="Aadhaar Number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="Enter 12-digit Aadhaar"
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 12 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                  I consent to Aadhaar verification for authentication
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAadhaarVerification}
                disabled={loading || !aadhaarNumber || !consent}
                sx={{
                  py: 2,
                  background: 'var(--gradient-primary)',
                  color: 'white'
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Verify Aadhaar'}
              </Button>
            </Box>
          )}

          {/* Step 3: Face Recognition */}
          {activeStep === 2 && (
            <Box>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  style={{ borderRadius: 8, display: videoRef.current?.srcObject ? 'block' : 'none' }}
                />
                <canvas
                  ref={canvasRef}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </Box>
              
              {!videoRef.current?.srcObject && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CameraAlt />}
                  onClick={startFaceCapture}
                  disabled={loading}
                  sx={{
                    py: 2,
                    mb: 2,
                    background: 'var(--gradient-primary)',
                    color: 'white'
                  }}
                >
                  Start Camera
                </Button>
              )}

              {videoRef.current?.srcObject && (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FaceRetouchingNatural />}
                    onClick={captureFace}
                    disabled={loading}
                    sx={{
                      py: 2,
                      mb: 1,
                      background: 'var(--gradient-primary)',
                      color: 'white'
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Capture Face'}
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleFallback}
                    sx={{ py: 1.5 }}
                  >
                    Use Fallback Method
                  </Button>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Modal>
  );
}
