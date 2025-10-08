'use client';
import { Box, Grid, Card, CardContent, Typography, Switch, Button, TextField, Avatar, Divider, Chip } from '@mui/material';
import { Settings, Person, Notifications, Security, Palette, Language, Storage } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const SettingsPage = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
    twoFactorAuth: true,
    profileVisibility: 'public',
    autoSave: true,
    dataSharing: false
  });

  const [profile, setProfile] = useState({
    name: 'Anmol Sinha',
    email: 'anmol@example.com',
    bio: 'Full-stack developer passionate about AI and blockchain technologies.',
    location: 'India',
    website: 'https://anmol.dev'
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings, profile);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export initiated. You will receive an email with your data.');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };

  return (
    <Box sx={{ p: 3, maxHeight: 'calc(100vh - 80px)', overflow: 'auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8FAFC', mb: 1 }}>
            Settings & Preferences
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            Customize your learning experience and manage your account.
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          {/* Profile Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Person sx={{ color: '#00F5FF' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                    Profile Information
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Avatar sx={{ width: 80, height: 80, background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', fontSize: '2rem', fontWeight: 600 }}>
                    A
                  </Avatar>
                  <Box>
                    <Button variant="outlined" size="small" sx={{ borderColor: 'rgba(0, 245, 255, 0.3)', color: '#00F5FF', textTransform: 'none', mr: 1 }}>
                      Change Photo
                    </Button>
                    <Button variant="text" size="small" sx={{ color: '#94A3B8', textTransform: 'none' }}>
                      Remove
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(15, 15, 35, 0.6)',
                          color: '#F8FAFC',
                          '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                        },
                        '& .MuiInputLabel-root': { color: '#94A3B8' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(15, 15, 35, 0.6)',
                          color: '#F8FAFC',
                          '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                        },
                        '& .MuiInputLabel-root': { color: '#94A3B8' }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      fullWidth
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(15, 15, 35, 0.6)',
                          color: '#F8FAFC',
                          '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#00F5FF' }
                        },
                        '& .MuiInputLabel-root': { color: '#94A3B8' }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Notifications sx={{ color: '#A855F7' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                    Notification Preferences
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive course updates and announcements via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time notifications in your browser' },
                    { key: 'weeklyDigest', label: 'Weekly Progress Digest', desc: 'Summary of your learning progress and achievements' },
                    { key: 'marketingEmails', label: 'Marketing Communications', desc: 'Promotional emails about new courses and features' }
                  ].map((item) => (
                    <Box key={item.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                          {item.desc}
                        </Typography>
                      </Box>
                      <Switch
                        checked={settings[item.key]}
                        onChange={() => handleSettingChange(item.key)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#00F5FF' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00F5FF' }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Security sx={{ color: '#FBBF24' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                    Privacy & Security
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
                    { key: 'profileVisibility', label: 'Profile Visibility', desc: 'Control who can see your profile and progress', isSelect: true },
                    { key: 'autoSave', label: 'Auto-save Progress', desc: 'Automatically save your course progress' },
                    { key: 'dataSharing', label: 'Anonymous Data Sharing', desc: 'Help improve our platform with anonymous usage data' }
                  ].map((item) => (
                    <Box key={item.key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                          {item.desc}
                        </Typography>
                      </Box>
                      {item.isSelect ? (
                        <Chip label="Public" size="small" sx={{ bgcolor: 'rgba(0, 245, 255, 0.2)', color: '#00F5FF' }} />
                      ) : (
                        <Switch
                          checked={settings[item.key]}
                          onChange={() => handleSettingChange(item.key)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#FBBF24' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FBBF24' }
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} xl={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Appearance */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Palette sx={{ color: '#00F5FF' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                      Appearance
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ color: '#F8FAFC' }}>
                      Dark Mode
                    </Typography>
                    <Switch
                      checked={isDark}
                      onChange={toggleTheme}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#00F5FF' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#00F5FF' }
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                    Language: English (US)
                  </Typography>
                  <Button variant="outlined" fullWidth sx={{ borderColor: 'rgba(0, 245, 255, 0.3)', color: '#00F5FF', textTransform: 'none' }}>
                    Change Language
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Management */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <Card elevation={0} sx={{ background: 'rgba(26, 26, 46, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Storage sx={{ color: '#EF4444' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#F8FAFC' }}>
                      Data Management
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" fullWidth onClick={handleExportData} sx={{ borderColor: 'rgba(251, 191, 36, 0.3)', color: '#FBBF24', textTransform: 'none' }}>
                      Export My Data
                    </Button>
                    <Divider sx={{ borderColor: 'rgba(239, 68, 68, 0.2)' }} />
                    <Button variant="outlined" fullWidth onClick={handleDeleteAccount} sx={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#EF4444', textTransform: 'none' }}>
                      Delete Account
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSave}
                sx={{ 
                  background: 'linear-gradient(135deg, #00F5FF 0%, #A855F7 100%)', 
                  textTransform: 'none', 
                  fontWeight: 600, 
                  py: 1.5,
                  '&:hover': { 
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Save All Changes
              </Button>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;