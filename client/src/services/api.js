const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Dashboard API
  async getDashboardTrends() {
    return this.request('/dashboard/trends');
  }

  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async searchCourses(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters });
    return this.request(`/dashboard/search?${params}`);
  }

  // Courses API
  async getCourses(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/courses?${params}`);
  }

  async getTrendingCourses(limit = 20, category = 'all') {
    const params = new URLSearchParams({ limit, category });
    return this.request(`/courses/trending?${params}`);
  }

  async getOutdatedCourses(limit = 20, category = 'all') {
    const params = new URLSearchParams({ limit, category });
    return this.request(`/courses/outdated?${params}`);
  }

  async getCourseById(id) {
    return this.request(`/courses/${id}`);
  }

  async getCoursesByCategory(category, filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/courses/category/${category}?${params}`);
  }

  async getCategories() {
    return this.request('/courses/categories');
  }

  async getProviders() {
    return this.request('/courses/providers');
  }

  async trackCourseView(courseId) {
    return this.request(`/courses/${courseId}/view`, { method: 'POST' });
  }

  // Health check
  async getHealthStatus() {
    return this.request('/health');
  }
}

export default new ApiService();