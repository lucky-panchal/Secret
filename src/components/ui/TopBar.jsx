import { Box, TextField, Typography, Button } from '@mui/material';
import { Search, CloudUpload } from '@mui/icons-material';

export default function TopBar() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, p: 2, backgroundColor: 'background.paper', borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <TextField
        placeholder="Search files..."
        variant="outlined"
        size="small"
        sx={{ 
          width: 350,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'grey.50',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }
        }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        startIcon={<CloudUpload />}
        sx={{ 
          backgroundColor: '#2563eb', 
          '&:hover': { backgroundColor: '#1d4ed8' },
          borderRadius: 2,
          px: 3,
          py: 1.5,
          fontWeight: 600
        }}
      >
        Upload File
      </Button>
    </Box>
  );
}