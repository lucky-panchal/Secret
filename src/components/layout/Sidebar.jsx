import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import {
  Dashboard,
  Person,
  Folder,
  Notifications,
  Message,
  HelpCenter,
  Settings,
  Logout
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'My Drive', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Shared Files', icon: <Person />, path: '/shared' },
  { text: 'File Requests', icon: <Folder />, path: '/requests' },
  { text: 'Starred', icon: <Notifications />, path: '/starred' },
  { text: 'Trash', icon: <Message />, path: '/trash' },
  { text: 'Statistics', icon: <HelpCenter />, path: '/stats' },
  { text: 'Task', icon: <Settings />, path: '/tasks' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
          Drive
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              sx={{
                borderRadius: 3,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                '& .MuiListItemIcon-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiListItemText-primary': {
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 3, borderTop: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Logout />}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            borderRadius: 3,
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}