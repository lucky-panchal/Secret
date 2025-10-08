'use client';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import apiService from '@/services/api';

const CoursesPageDebug = () => {
  const [debugData, setDebugData] = useState({});
  const [loading, setLoading] = useState(false);

  const testAllEndpoints = async () => {
    setLoading(true);
    const results = {};
    
    try {
      // Test all endpoints
      console.log('🧪 Testing all endpoints...');
      
      const allCoursesRes = await apiService.getCourses();
      results.allCourses = {
        success: true,
        count: allCoursesRes.data?.courses?.length || 0,
        data: allCoursesRes.data?.courses || [],
        sample: allCoursesRes.data?.courses?.[0]?.courseTitle || 'None'
      };
      
      const trendingRes = await apiService.getTrendingCourses();
      results.trending = {
        success: true,
        count: trendingRes.data?.courses?.length || 0,
        data: trendingRes.data?.courses || [],
        sample: trendingRes.data?.courses?.[0]?.courseTitle || 'None'
      };
      
      const outdatedRes = await apiService.getOutdatedCourses();
      results.outdated = {
        success: true,
        count: outdatedRes.data?.courses?.length || 0,
        data: outdatedRes.data?.courses || [],
        sample: outdatedRes.data?.courses?.[0]?.courseTitle || 'None'
      };
      
      const categoriesRes = await apiService.getCategories();
      results.categories = {
        success: true,
        count: categoriesRes.data?.length || 0,
        data: categoriesRes.data || []
      };
      
    } catch (error) {
      console.error('❌ Error testing endpoints:', error);
      results.error = error.message;
    }
    
    setDebugData(results);
    setLoading(false);
    console.log('📊 Debug results:', results);
  };

  useEffect(() => {
    testAllEndpoints();
  }, []);

  return (
    <Box sx={{ p: 3, color: '#F8FAFC' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🔍 Courses Debug Panel
      </Typography>
      
      <Button 
        onClick={testAllEndpoints} 
        disabled={loading}
        sx={{ mb: 3, color: '#00F5FF', borderColor: '#00F5FF' }}
        variant="outlined"
      >
        {loading ? <CircularProgress size={20} /> : 'Test All Endpoints'}
      </Button>
      
      {Object.keys(debugData).length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>📊 API Results:</Typography>
          
          <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(26, 26, 46, 0.8)', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#00F5FF' }}>All Courses:</Typography>
            <Typography>Count: {debugData.allCourses?.count || 0}</Typography>
            <Typography>Sample: {debugData.allCourses?.sample || 'None'}</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              Trends: {debugData.allCourses?.data?.map(c => c.trend).join(', ') || 'None'}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(26, 26, 46, 0.8)', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#22C55E' }}>Trending Courses:</Typography>
            <Typography>Count: {debugData.trending?.count || 0}</Typography>
            <Typography>Sample: {debugData.trending?.sample || 'None'}</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              Trends: {debugData.trending?.data?.map(c => c.trend).join(', ') || 'None'}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(26, 26, 46, 0.8)', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#EF4444' }}>Outdated Courses:</Typography>
            <Typography>Count: {debugData.outdated?.count || 0}</Typography>
            <Typography>Sample: {debugData.outdated?.sample || 'None'}</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              Trends: {debugData.outdated?.data?.map(c => c.trend).join(', ') || 'None'}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(26, 26, 46, 0.8)', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#A855F7' }}>Categories:</Typography>
            <Typography>Count: {debugData.categories?.count || 0}</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              {debugData.categories?.data?.map(c => `${c._id}: ${c.count}`).join(', ') || 'None'}
            </Typography>
          </Box>
          
          {debugData.error && (
            <Box sx={{ p: 2, bgcolor: 'rgba(239, 68, 68, 0.2)', borderRadius: 2 }}>
              <Typography sx={{ color: '#EF4444' }}>Error: {debugData.error}</Typography>
            </Box>
          )}
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(15, 15, 35, 0.8)', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Raw Data:</Typography>
            <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
              {JSON.stringify(debugData, null, 2)}
            </pre>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoursesPageDebug;