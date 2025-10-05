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
          background: 'rgba(26, 26, 46, 0.95)', 
          backdropFilter: 'blur(20px)', 
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
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
            <Box sx={{ width: { xs: '100%', sm: 280 }, borderRight: { sm: '1px solid rgba(148, 163, 184, 0.2)' }, display: selectedChat && { xs: 'none', sm: 'block' } }}>
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
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)', color: '#ffffff', fontWeight: 600 }}>
                            {conv.avatar}
                          </Avatar>
                          {conv.online && (
                            <Box sx={{ 
                              position: 'absolute', 
                              bottom: 0, 
                              right: 0, 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%', 
                              bgcolor: '#34D399',
                              border: '2px solid rgba(26, 26, 46, 0.95)'
                            }} />
                          )}
                        </Box>
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
                <Box sx={{ p: 2, borderBottom: '1px solid rgba(148, 163, 184, 0.2)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button 
                    variant="text" 
                    sx={{ display: { sm: 'none' }, color: '#A855F7', minWidth: 'auto', p: 1 }}
                    onClick={() => setSelectedChat(null)}
                  >
                    ←
                  </Button>
                  <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)', color: '#ffffff', fontWeight: 600 }}>
                    {selectedChat.avatar}
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
                <Box sx={{ flex: 1, p: 2, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                        bgcolor: msg.isOwn ? 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)' : 'rgba(15, 15, 35, 0.6)',
                        color: '#ffffff',
                        p: 1.5,
                        borderRadius: 2,
                        borderTopLeftRadius: msg.isOwn ? 2 : 0.5,
                        borderTopRightRadius: msg.isOwn ? 0.5 : 2
                      }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {msg.message}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
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
                        background: 'linear-gradient(135deg, #A855F7 0%, #00F5FF 100%)',
                        minWidth: 'auto',
                        px: 2
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