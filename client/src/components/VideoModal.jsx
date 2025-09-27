'use client';
import { useState, useEffect } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const VideoModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setVideoReady(false);
      // 3-4 second loading animation
      const timer = setTimeout(() => {
        setLoading(false);
        setTimeout(() => setVideoReady(true), 300);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: 'relative',
          width: '90vw',
          maxWidth: '1000px',
          height: '70vh',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            zIndex: 1000,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
          }}
        >
          <Close />
        </IconButton>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              {/* Loading Animation */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  borderTop: '4px solid #00bcd4',
                  borderRadius: '50%',
                  marginBottom: '20px',
                }}
              />
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                Loading Demo Video...
              </motion.div>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    position: 'absolute',
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00bcd4',
                    filter: 'blur(1px)',
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: '20px',
                borderRadius: '15px',
                overflow: 'hidden',
                background: '#000',
                boxShadow: 'inset 0 0 50px rgba(0, 188, 212, 0.2)',
              }}
            >
              {videoReady && (
                <video
                  controls
                  autoPlay
                  controlsList="nodownload"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                >
                  <source src="/videos/career guidence.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
};

export default VideoModal;