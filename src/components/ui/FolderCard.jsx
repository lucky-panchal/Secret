import { Card, CardContent, Typography, Box, Avatar, AvatarGroup } from '@mui/material';
import { Folder } from '@mui/icons-material';

export default function FolderCard({ name, color, users, files, date }) {
  return (
    <Card 
      sx={{ 
        height: 200, 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`, 
        color: 'white', 
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: 'none',
        '&:hover': { 
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
        },
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Folder sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {name}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
              {users?.map((user, i) => (
                <Avatar key={i} sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>{user}</Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{files} files</Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Created {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}