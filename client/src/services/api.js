const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
    this.loadToken();
  }

  loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.getAuthHeaders(),
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

  async getTrendingCourses(limit = 20, category = 'all', refresh = false) {
    const params = new URLSearchParams({ limit, category, refresh });
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

  async refreshCourseData(category = null) {
    return this.request('/courses/refresh', {
      method: 'POST',
      body: JSON.stringify({ category })
    });
  }

  async getAIInsights(category = null) {
    const params = category ? new URLSearchParams({ category }) : '';
    return this.request(`/courses/ai-insights?${params}`);
  }

  async getDataFreshness() {
    return this.request('/courses/data-freshness');
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

  // Authentication API
  async signup(userData) {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  // Assessment API
  async saveAssessment(assessmentData) {
    return this.request('/assessment', {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    });
  }

  async getAssessment() {
    return this.request('/assessment');
  }

  // AI Analysis API
  async generateAIProfile() {
    return this.request('/ai-analysis/generate-profile', {
      method: 'POST'
    });
  }

  async getAIProfile() {
    return this.request('/ai-analysis/profile');
  }

  async updateProgress(milestoneId, progress, completedCourses = [], completedProjects = []) {
    return this.request('/ai-analysis/update-progress', {
      method: 'POST',
      body: JSON.stringify({ milestoneId, progress, completedCourses, completedProjects })
    });
  }

  async getDailyRiskUpdate() {
    return this.request('/ai-analysis/daily-risk-update');
  }

  async getAIInsights() {
    return this.request('/ai-analysis/insights');
  }

  async getDailyTips() {
    return this.request('/ai-analysis/daily-tips');
  }

  async signin(credentials) {
    const response = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Health check
  async getHealthStatus() {
    return this.request('/health');
  }
}

export default new ApiService();