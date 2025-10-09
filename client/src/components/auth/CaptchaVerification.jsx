'use client';
import { useState, useEffect } from 'react';
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function CaptchaVerification({ onSuccess }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      
      // Store verification in session
      sessionStorage.setItem('captcha_verified', 'true');
      
      // Call success callback after animation
      setTimeout(() => {
        onSuccess();
      }, 800);
    }, 2000);
  };

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1.5,
      padding: '12px 16px',
      border: '2px solid #d3d3d3',
      borderRadius: '4px',
      background: '#f9f9f9',
      cursor: isVerified ? 'default' : 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: isVerified ? '#d3d3d3' : '#4285f4',
        boxShadow: isVerified ? 'none' : '0 2px 8px rgba(66, 133, 244, 0.2)'
      }
    }}
    onClick={!isVerified && !isVerifying ? handleVerify : undefined}
    >
      <Box sx={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #555',
        borderRadius: '3px',
        background: 'white',
        position: 'relative'
      }}>
        {isVerifying && (
          <CircularProgress size={16} sx={{ color: '#4285f4' }} />
        )}
        {isVerified && (
          <CheckCircle sx={{ fontSize: 20, color: '#0f9d58' }} />
        )}
        {!isVerifying && !isVerified && (
          <Box sx={{
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }} />
        )}
      </Box>
      
      <Typography sx={{
        fontSize: '14px',
        color: '#555',
        fontFamily: 'Roboto, Arial, sans-serif',
        userSelect: 'none'
      }}>
        I'm not a robot
      </Typography>
      
      <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285f4' d='M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.25 5l4.5 2.26v4.68L12.25 14.5 7.75 12V7.26L12.25 5zM12 6.5L8.5 8.25v3.5L12 13.5l3.5-1.75v-3.5L12 6.5z'/%3E%3C/svg%3E"
          alt="reCAPTCHA"
          style={{ width: 32, height: 32 }}
        />
        <Typography sx={{ fontSize: '9px', color: '#999', mt: 0.5 }}>
          reCAPTCHA
        </Typography>
      </Box>
    </Box>
  );
}
