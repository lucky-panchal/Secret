'use client';
import { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Avatar, Fab, Slide, Chip } from '@mui/material';
import { Send, Close, Chat, AttachFile, EmojiEmotions, MoreVert } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const ProfessionalChat = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'ai', time: '10:30 AM' },
    { id: 2, text: 'I need help with my dashboard analytics', sender: 'user', time: '10:31 AM' },
    { id: 3, text: 'I can help you with that! What specific analytics would you like to explore?', sender: 'ai', time: '10:31 AM' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: 'Thanks for your message! I\'m processing your request...',
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #4a90e2, #357abd)',
          '&:hover': {
            background: 'linear-gradient(45deg, #357abd, #2968a3)',
          }
        }}
      >
        <Chat />
      </Fab>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 380,
              height: 500,
              zIndex: 1000
            }}
          >
            <Paper
              elevation={24}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: isDark 
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: isDark 
                  ? '0 20px 60px rgba(0,0,0,0.5)'
                  : '0 20px 60px rgba(0,0,0,0.15)'
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 2,
                  background: 'linear-gradient(45deg, #4a90e2, #357abd)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    AI
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '-0.01em'
                    }}>
                      KaushalX Assistant
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      opacity: 0.8,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem'
                    }}>
                      Online • Responds instantly
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton size="small" sx={{ color: 'white', mr: 1 }}>
                    <MoreVert />
                  </IconButton>
                  <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                    <Close />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        mb: 1
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '75%',
                          p: 2,
                          borderRadius: 3,
                          background: msg.sender === 'user'
                            ? 'linear-gradient(45deg, #4a90e2, #357abd)'
                            : isDark 
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(0,0,0,0.05)',
                          color: msg.sender === 'user' 
                            ? 'white' 
                            : isDark ? 'white' : 'black',
                          border: msg.sender === 'ai' && !isDark ? '1px solid #e0e0e0' : 'none',
                          boxShadow: msg.sender === 'user' 
                            ? '0 4px 12px rgba(74,144,226,0.3)'
                            : '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Typography variant="body2" sx={{ 
                          fontSize: '0.9rem', 
                          lineHeight: 1.4,
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: '-0.01em'
                        }}>
                          {msg.text}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block', 
                            mt: 1, 
                            opacity: 0.7,
                            fontSize: '0.75rem',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Quick Actions */}
              <Box sx={{ px: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['Analytics Help', 'Course Info', 'Progress Report'].map((action) => (
                    <Chip
                      key={action}
                      label={action}
                      size="small"
                      onClick={() => setMessage(action)}
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                        background: isDark ? 'rgba(74,144,226,0.2)' : 'rgba(74,144,226,0.1)',
                        color: '#4a90e2',
                        '&:hover': {
                          background: isDark ? 'rgba(74,144,226,0.3)' : 'rgba(74,144,226,0.2)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Input */}
              <Box
                sx={{
                  p: 2,
                  borderTop: isDark ? '1px solid #333' : '1px solid #e0e0e0',
                  background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small">
                    <AttachFile sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                        fontSize: '0.9rem'
                      }
                    }}
                  />
                  <IconButton size="small">
                    <EmojiEmotions sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                  <IconButton 
                    onClick={handleSend}
                    sx={{
                      background: 'linear-gradient(45deg, #4a90e2, #357abd)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #357abd, #2968a3)',
                      }
                    }}
                  >
                    <Send sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfessionalChat;