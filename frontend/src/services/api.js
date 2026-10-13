import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('thirupathi_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (window.location.hash.includes('admin') && !window.location.hash.includes('login')) {
        localStorage.removeItem('thirupathi_admin_token');
        localStorage.removeItem('thirupathi_admin_user');
        window.location.hash = '#admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/update-password', data)
};

export const portfolioAPI = {
  getAll: () => api.get('/all'),
  getDashboardStats: () => api.get('/dashboard/stats'),

  // Single Sections
  getHero: () => api.get('/hero'),
  updateHero: (data) => api.put('/hero', data),

  getAbout: () => api.get('/about'),
  updateAbout: (data) => api.put('/about', data),

  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),

  // Services
  getServices: (all = false) => api.get(`/services${all ? '?all=true' : ''}`),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  toggleService: (id) => api.patch(`/services/${id}/toggle`),

  // Projects
  getProjects: (all = false) => api.get(`/projects${all ? '?all=true' : ''}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  toggleProject: (id) => api.patch(`/projects/${id}/toggle`),

  // Experience
  getExperience: (all = false) => api.get(`/experience${all ? '?all=true' : ''}`),
  createExperience: (data) => api.post('/experience', data),
  updateExperience: (id, data) => api.put(`/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),
  toggleExperience: (id) => api.patch(`/experience/${id}/toggle`),

  // Achievements
  getAchievements: (all = false) => api.get(`/achievements${all ? '?all=true' : ''}`),
  createAchievement: (data) => api.post('/achievements', data),
  updateAchievement: (id, data) => api.put(`/achievements/${id}`, data),
  deleteAchievement: (id) => api.delete(`/achievements/${id}`),
  toggleAchievement: (id) => api.patch(`/achievements/${id}/toggle`),

  // Team
  getTeam: (all = false) => api.get(`/team${all ? '?all=true' : ''}`),
  createTeam: (data) => api.post('/team', data),
  updateTeam: (id, data) => api.put(`/team/${id}`, data),
  deleteTeam: (id) => api.delete(`/team/${id}`),
  toggleTeam: (id) => api.patch(`/team/${id}/toggle`),

  // Testimonials
  getTestimonials: (all = false) => api.get(`/testimonials${all ? '?all=true' : ''}`),
  createTestimonial: (data) => api.post('/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
  toggleTestimonial: (id) => api.patch(`/testimonials/${id}/toggle`),

  // Gallery
  getGallery: (all = false) => api.get(`/gallery${all ? '?all=true' : ''}`),
  createGallery: (data) => api.post('/gallery', data),
  updateGallery: (id, data) => api.put(`/gallery/${id}`, data),
  deleteGallery: (id) => api.delete(`/gallery/${id}`),
  toggleGallery: (id) => api.patch(`/gallery/${id}/toggle`),

  // Messages / Contact
  sendContactMessage: (data) => api.post('/contact', data),
  getInquiries: () => api.get('/inquiries'),
  updateInquiryStatus: (id, status) => api.patch(`/inquiries/${id}`, { status }),
  deleteInquiry: (id) => api.delete(`/inquiries/${id}`)
};

export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export default api;
