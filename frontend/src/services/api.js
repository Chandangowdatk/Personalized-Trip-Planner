import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const chatAPI = {
  startSession: async (userId) => {
    const response = await api.post('/api/v1/chat/session', null, {
      params: { user_id: userId }
    });
    return response.data;
  },

  sendMessage: async (data) => {
    const response = await api.post('/api/v1/chat/message', data);
    return response.data;
  },

  getHistory: async (sessionId) => {
    const response = await api.get(`/api/v1/chat/history/${sessionId}`);
    return response.data;
  },
};

export const itineraryAPI = {
  generate: async (data) => {
    const response = await api.post('/api/v1/itinerary/generate', data);
    return response.data;
  },
};

export const bookingAPI = {
  checkout: async (data) => {
    const response = await api.post('/api/v1/booking/checkout', data);
    return response.data;
  },
};

export const tripAPI = {
  getLiveUpdates: async (sessionId) => {
    const response = await api.get(`/api/v1/trip/live/${sessionId}`);
    return response.data;
  },
};

export default api;
