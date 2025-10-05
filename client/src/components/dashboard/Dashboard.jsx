'use client';
import { Box, Grid, useMediaQuery, useTheme as useMuiTheme, Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
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

const Dashboard = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

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
      bgcolor: '#f8fafc',
      display: 'flex',
      overflow: 'hidden'
    }}>
      {/* Left Sidebar - Desktop & Tablet */}
      {isDesktop && <Sidebar />}
      
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
            bgcolor: '#ffffff'
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ 
        flexGrow: 1, 
        ml: isDesktop ? '280px' : 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
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
          <TopNavbar />
        </Box>

        {/* Dashboard Content */}
        <Box sx={{ 
          flexGrow: 1,
          p: currentSpacing.container,
          pt: { xs: 1, md: 1.5 },
          pb: isMobile ? 12 : currentSpacing.container,
          overflow: 'auto',
          maxHeight: 'calc(100vh - 80px)'
        }}>
          <Grid container spacing={3}>
            {/* Main Content Column */}
            <Grid item xs={12} xl={8}>
              <Grid container spacing={3}>
                {/* Banner */}
                <Grid item xs={12}>
                  <BannerCard />
                </Grid>

                {/* AI Career Monitor & Career Roadmap */}
                <Grid item xs={12} md={6}>
                  <AICareerMonitor />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CareerRoadmap />
                </Grid>

                {/* Active Courses */}
                <Grid item xs={12}>
                  <ActiveCourses />
                </Grid>

                {/* Certificates & Job Matches */}
                <Grid item xs={12} md={6}>
                  <BlockchainCertificates />
                </Grid>
                <Grid item xs={12} md={6}>
                  <JobMatches />
                </Grid>

                {/* Token Economy & Mentorship */}
                <Grid item xs={12} md={6}>
                  <TokenEconomy />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MentorshipHub />
                </Grid>

                {/* Progress Tracker */}
                <Grid item xs={12}>
                  <ProgressTracker />
                </Grid>

                {/* Mobile Components */}
                {isMobile && (
                  <>
                    <Grid item xs={12}>
                      <UserStatsCard />
                    </Grid>
                    <Grid item xs={12}>
                      <NotificationsPanel />
                    </Grid>
                    <Grid item xs={12}>
                      <RecentActivity />
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
                  <UserStatsCard />
                  <MentorCard />
                  <QuickStats />
                  <NotificationsPanel />
                  <RecentActivity />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Mobile Bottom Navigation */}
      {isMobile && <QuickAccessPanel mobile />}
    </Box>
  );
};

export default Dashboard;