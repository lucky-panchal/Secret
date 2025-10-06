'use client';
import { Box, Modal, Card, CardContent, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, Button, Divider, Chip } from '@mui/material';
import { Close, Message, Send, Person, School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const MessageModal = ({ open, onClose }) => {
  const { isDark } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'AI Tutor',
      avatar: 'S',
      lastMessage: 'Great progress on your React course! Keep it up.',
      time: '2 min ago',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'Sarah Chen', message: 'Hi! How are you finding the React course?', time: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'It\'s challenging but really interesting!', time: '10:32 AM', isOwn: true },
        { id: 3, sender: 'Sarah Chen', message: 'Great progress on your React course! Keep it up.', time: '10:35 AM', isOwn: false }
      ]
    },
    {
      id: 2,
      name: 'Mike Johnson',
      role: 'Mentor',
      avatar: 'M',
      lastMessage: 'Let\'s schedule a call to discuss your career goals.',
      time: '1 hour ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'Mike Johnson', message: 'Hey! I saw you completed the blockchain course. Congratulations!', time: '9:15 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Thank you! It was really comprehensive.', time: '9:20 AM', isOwn: true },
        { id: 3, sender: 'Mike Johnson', message: 'Let\'s schedule a call to discuss your career goals.', time: '9:25 AM', isOwn: false }
      ]
    },
    {
      id: 3,
      name: 'Course Support',
      role: 'Support Team',
      avatar: 'CS',
      lastMessage: 'Your certificate has been generated successfully.',
      time: '3 hours ago',
      unread: 0,
      online: true,
      messages: [
        { id: 1, sender: 'Course Support', message: 'Your certificate has been generated successfully.', time: '8:00 AM', isOwn: false }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      // Here you would typically update the conversation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={0} sx={{ 
          width: { xs: '90vw', sm: 700 }, 
          height: { xs: '80vh', sm: 600 },
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(15, 15, 35, 0.95) 100%)', 
          backdropFilter: 'blur(25px)', 
          borderRadius: 2,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            p: 3, 
            background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Message sx={{ color: '#A855F7' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                Messages
              </Typography>
              {totalUnread > 0 && (
                <Chip label={totalUnread} size="small" sx={{ bgcolor: '#EF4444', color: '#ffffff', fontWeight: 600 }} />
              )}
            </Box>
            <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Conversations List */}
            <Box sx={{ width: { xs: '100%', sm: 280 }, borderRight: 'none', display: selectedChat && { xs: 'none', sm: 'block' } }}>
              <List sx={{ p: 0, height: '100%', overflow: 'auto' }}>
                {conversations.map((conv, index) => (
                  <Box key={conv.id}>
                    <ListItem 
                      sx={{ 
                        py: 2, 
                        px: 3, 
                        cursor: 'pointer',
                        bgcolor: selectedChat?.id === conv.id ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                        '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.05)' }
                      }}
                      onClick={() => setSelectedChat(conv)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)', color: '#ffffff', fontWeight: 600, position: 'relative' }}>
                          {conv.avatar}
                          {conv.online && (
                            <Box sx={{ 
                              position: 'absolute', 
                              top: 2, 
                              right: 2, 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              bgcolor: '#34D399',
                              border: '1px solid rgba(26, 26, 46, 0.95)'
                            }} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                              {conv.name}
                            </Typography>
                            {conv.unread > 0 && (
                              <Chip label={conv.unread} size="small" sx={{ bgcolor: '#A855F7', color: '#ffffff', fontWeight: 600, minWidth: 20, height: 20 }} />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" sx={{ color: '#A855F7', fontWeight: 600 }}>
                              {conv.role}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {conv.lastMessage}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {conv.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < conversations.length - 1 && <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.1)' }} />}
                  </Box>
                ))}
              </List>
            </Box>

            {/* Chat Area */}
            {selectedChat ? (
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <Box sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2 
                }}>
                  <Button 
                    variant="text" 
                    sx={{ display: { sm: 'none' }, color: '#A855F7', minWidth: 'auto', p: 1 }}
                    onClick={() => setSelectedChat(null)}
                  >
                    ←
                  </Button>
                  <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)', color: '#ffffff', fontWeight: 600, position: 'relative' }}>
                    {selectedChat.avatar}
                    {selectedChat.online && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 2, 
                        right: 2, 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#34D399',
                        border: '1px solid rgba(26, 26, 46, 0.95)'
                      }} />
                    )}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                      {selectedChat.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: selectedChat.online ? '#34D399' : '#94A3B8' }}>
                      {selectedChat.online ? 'Online' : 'Offline'} • {selectedChat.role}
                    </Typography>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ 
                  flex: 1, 
                  p: 3, 
                  overflow: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  background: 'linear-gradient(180deg, rgba(15, 15, 35, 0.3) 0%, rgba(26, 26, 46, 0.5) 100%)'
                }}>
                  {selectedChat.messages.map((msg) => (
                    <Box 
                      key={msg.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: msg.isOwn ? 'flex-end' : 'flex-start',
                        mb: 1
                      }}
                    >
                      <Box sx={{ 
                        maxWidth: '70%',
                        background: msg.isOwn 
                          ? 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)' 
                          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)',
                        '& .MuiTypography-root': {
                          color: '#ffffff !important'
                        },
                        p: 2,
                        borderRadius: msg.isOwn ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                        boxShadow: 'none',
                        position: 'relative',
                        '&::before': msg.isOwn ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          right: -8,
                          width: 0,
                          height: 0,
                          borderLeft: '8px solid #A855F7',
                          borderTop: '8px solid transparent'
                        } : {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: -8,
                          width: 0,
                          height: 0,
                          borderRight: '8px solid rgba(51, 65, 85, 0.8)',
                          borderTop: '8px solid transparent'
                        }
                      }}>
                        <Typography variant="body2" sx={{ 
                          mb: 1, 
                          fontSize: '0.95rem',
                          lineHeight: 1.4,
                          fontWeight: 400,
                          color: '#ffffff !important'
                        }}>
                          {msg.message}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: 'rgba(255,255,255,0.8)', 
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}>
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      placeholder="Type your message..."
                      variant="outlined"
                      fullWidth
                      multiline
                      maxRows={3}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(15, 15, 35, 0.6)',
                          color: '#F8FAFC',
                          '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(148, 163, 184, 0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#A855F7' }
                        }
                      }}
                    />
                    <Button 
                      variant="contained" 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      sx={{ 
                        background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                        minWidth: 'auto',
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: 'none',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      <Send />
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </motion.div>
    </Modal>
  );
};

export default MessageModal;