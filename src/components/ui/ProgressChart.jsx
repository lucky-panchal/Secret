'use client';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@/contexts/ThemeContext';

const ProgressChart = ({ data, title }) => {
  const { isDark } = useTheme();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: isDark ? 'white' : '#2c1810' }}>
        {title}
      </Typography>
      <Box sx={{ height: 200, position: 'relative' }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(44,24,16,0.7)' }}>
              {item.label}
            </Typography>
            <Box sx={{ flex: 1, mx: 2, position: 'relative' }}>
              <Box
                sx={{
                  height: 8,
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(44,24,16,0.1)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${item.value}%`,
                    background: `linear-gradient(90deg, #ffd700, #ffed4e)`,
                    borderRadius: 4,
                    transition: 'width 1s ease',
                  }}
                />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right', color: isDark ? 'white' : '#2c1810' }}>
              {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressChart;