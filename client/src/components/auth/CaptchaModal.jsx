'use client';
import { Box, Modal, Paper, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';
import CaptchaVerification from './CaptchaVerification';

export default function CaptchaModal({ open, onSuccess }) {
  return (
    <Modal 
      open={open} 
      disableEscapeKeyDown
      sx={{
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 450 }
      }}>
        <Paper sx={{
          p: 4,
          background: 'white',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          textAlign: 'center'
        }}>
          <Security sx={{ fontSize: 64, color: '#4285f4', mb: 2 }} />
          
          <Typography variant="h5" sx={{ 
            fontWeight: 600, 
            color: '#202124', 
            mb: 1,
            fontFamily: 'Roboto, Arial, sans-serif'
          }}>
            Security Verification
          </Typography>
          
          <Typography variant="body2" sx={{ 
            color: '#5f6368', 
            mb: 4,
            fontFamily: 'Roboto, Arial, sans-serif'
          }}>
            Please verify you're human to continue
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 2
          }}>
            <CaptchaVerification onSuccess={onSuccess} />
          </Box>
          
          <Typography variant="caption" sx={{ 
            color: '#999', 
            fontSize: '11px',
            display: 'block',
            mt: 2
          }}>
            Protected by reCAPTCHA
          </Typography>
        </Paper>
      </Box>
    </Modal>
  );
}
