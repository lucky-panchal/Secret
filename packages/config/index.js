// NEW - Shared Configuration
export const API_ENDPOINTS = {
  development: 'http://localhost:3000/api',
  production: 'https://api.kaushalx.com/api'
};

export const APP_CONFIG = {
  name: 'KauShalX',
  version: '1.0.0',
  description: 'Learn. Grow. Succeed.',
  supportEmail: 'support@kaushalx.com'
};

export const THEME_COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' 
    ? API_ENDPOINTS.production 
    : API_ENDPOINTS.development;
};