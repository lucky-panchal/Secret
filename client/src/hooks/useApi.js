import { useState, useEffect } from 'react';
import apiService from '@/services/api';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

export const useCourses = (filters = {}) => {
  return useApi(() => apiService.getCourses(filters), [JSON.stringify(filters)]);
};

export const useTrendingCourses = (limit = 20, category = 'all') => {
  return useApi(() => apiService.getTrendingCourses(limit, category), [limit, category]);
};

export const useDashboardStats = () => {
  return useApi(() => apiService.getDashboardStats(), []);
};

export const useDashboardTrends = () => {
  return useApi(() => apiService.getDashboardTrends(), []);
};

export const useCategories = () => {
  return useApi(() => apiService.getCategories(), []);
};