'use client';
import { Box, Grid, useMediaQuery, useTheme as useMuiTheme, Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BannerCard from './BannerCard';
import UserStatsCard from './UserStatsCard';
import MentorCard from './MentorCard';
import AICareerMonitor from './AICareerMonitor';
import CareerRoadmap from './CareerRoadmap';
import ActiveCourses from './ActiveCourses';
import BlockchainCertificates from './BlockchainCertificates';
import JobMatches from './JobMatches';
import TokenEconomy from './TokenEconomy';
import MentorshipHub from './MentorshipHub';
import ProgressTracker from './ProgressTracker';
import NotificationsPanel from './NotificationsPanel';
import QuickAccessPanel from './QuickAccessPanel';
import QuickStats from './QuickStats';
import RecentActivity from './RecentActivity';
import ComponentLoader from './ComponentLoader';
import CoursesPage from './CoursesPage';
import TasksPage from './TasksPage';
import CertificatesPage from './CertificatesPage';
import JobsPage from './JobsPage';
import SettingsPage from './SettingsPage';
import TokensPage from './TokensPage';
import NotificationModal from './NotificationModal';
import MessageModal from './MessageModal';
import ProfileModal from './ProfileModal';
import { useTheme } from '@/contexts/ThemeContext';

const Dashboard = () => {
  const muiTheme = useMuiTheme();
  const { isDark } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced navigation handler with page transitions
  const handlePageNavigation = (page) => {
    if (page !== currentPage) {
      setLoading(true);
      setCurrentPage(page);
      setMobileOpen(false); // Close mobile drawer on navigation
      
      // Simulate loading for smooth transitions
      setTimeout(() => setLoading(false), 800);
    }
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setLoading(false), 1000);
  };

  // Modal handlers
  const handleNotificationClick = () => {
    setNotificationModalOpen(true);
  };

  const handleMessageClick = () => {
    setMessageModalOpen(true);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Systematic spacing values
  const spacing = {
    mobile: { container: 1, grid: 2, card: 2 },
    tablet: { container: 2, grid: 2.5, card: 3 },
    desktop: { container: 3, grid: 3, card: 4 }
  };

  const currentSpacing = isMobile ? spacing.mobile : isTablet ? spacing.tablet : spacing.desktop;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }
    }}>
      {/* Left Sidebar - Desktop & Tablet */}
      {isDesktop && <Sidebar onNavigate={handlePageNavigation} currentPage={currentPage} />}
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            bgcolor: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: 'none'
          },
        }}
      >
        <Sidebar onNavigate={handlePageNavigation} currentPage={currentPage} />
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ 
        flexGrow: 1, 
        ml: isDesktop ? '280px' : 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Navigation */}
        <Box sx={{ position: 'relative', zIndex: 100 }}>
          {!isDesktop && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ 
                position: 'absolute', 
                top: 16, 
                left: 16, 
                zIndex: 102,
                bgcolor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                width: 44,
                height: 44,
                '&:hover': {
                  bgcolor: isDark ? '#2a2a2a' : '#f8f9fc',
                }
              }}
            >
              <Menu sx={{ color: isDark ? '#ffffff' : '#374151' }} />
            </IconButton>
          )}
          <TopNavbar 
            onRefresh={handleRefresh} 
            currentPage={currentPage}
            onNotificationClick={handleNotificationClick}
            onMessageClick={handleMessageClick}
            onProfileClick={handleProfileClick}
            onNavigate={handlePageNavigation}
          />
        </Box>

        {/* Dashboard Content */}
        <Box sx={{ 
          flexGrow: 1,
          p: currentPage === 'courses' ? 0 : currentSpacing.container,
          pt: { xs: 1, md: 1.5 },
          pb: isMobile ? 12 : currentSpacing.container,
          overflow: 'auto',
          maxHeight: 'calc(100vh - 80px)'
        }}>
          {currentPage === 'courses' ? (
            <CoursesPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : currentPage === 'tasks' ? (
            <TasksPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : currentPage === 'certificates' ? (
            <CertificatesPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : currentPage === 'jobs' ? (
            <JobsPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : currentPage === 'settings' ? (
            <SettingsPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : currentPage === 'tokens' ? (
            <TokensPage key={refreshKey} onNavigate={handlePageNavigation} />
          ) : (
            <Grid container spacing={3} key={refreshKey}>
              {/* Main Content Column */}
              <Grid item xs={12} xl={8}>
                <Grid container spacing={3}>
                  {/* Banner */}
                  <Grid item xs={12}>
                    <ComponentLoader loading={loading}>
                      <BannerCard onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* AI Career Monitor & Career Roadmap */}
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <AICareerMonitor onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <CareerRoadmap onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* Active Courses */}
                  <Grid item xs={12}>
                    <ComponentLoader loading={loading}>
                      <ActiveCourses onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* Certificates & Job Matches */}
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <BlockchainCertificates onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <JobMatches onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* Token Economy & Mentorship */}
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <TokenEconomy onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComponentLoader loading={loading}>
                      <MentorshipHub onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* Progress Tracker */}
                  <Grid item xs={12}>
                    <ComponentLoader loading={loading}>
                      <ProgressTracker onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Grid>

                  {/* Mobile Components */}
                  {isMobile && (
                    <>
                      <Grid item xs={12}>
                        <ComponentLoader loading={loading}>
                          <UserStatsCard onNavigate={handlePageNavigation} />
                        </ComponentLoader>
                      </Grid>
                      <Grid item xs={12}>
                        <ComponentLoader loading={loading}>
                          <NotificationsPanel onNavigate={handlePageNavigation} />
                        </ComponentLoader>
                      </Grid>
                      <Grid item xs={12}>
                        <ComponentLoader loading={loading}>
                          <RecentActivity onNavigate={handlePageNavigation} />
                        </ComponentLoader>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              {/* Right Sidebar - Desktop Only */}
              {!isMobile && (
                <Grid item xl={4}>
                  <Box sx={{ 
                    position: 'sticky', 
                    top: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                  }}>
                    <ComponentLoader loading={loading}>
                      <UserStatsCard onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                    <ComponentLoader loading={loading}>
                      <MentorCard onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                    <ComponentLoader loading={loading}>
                      <QuickStats onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                    <ComponentLoader loading={loading}>
                      <NotificationsPanel onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                    <ComponentLoader loading={loading}>
                      <RecentActivity onNavigate={handlePageNavigation} />
                    </ComponentLoader>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Mobile Bottom Navigation */}
      {isMobile && <QuickAccessPanel mobile onNavigate={handlePageNavigation} currentPage={currentPage} />}
      
      {/* Modals */}
      <NotificationModal 
        open={notificationModalOpen} 
        onClose={() => setNotificationModalOpen(false)} 
      />
      <MessageModal 
        open={messageModalOpen} 
        onClose={() => setMessageModalOpen(false)} 
      />
      <ProfileModal 
        open={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)}
        onNavigate={handlePageNavigation}
      />
    </Box>
  );
};

export default Dashboard;