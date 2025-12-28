// lib/api.ts
import axios from 'axios';
import keycloak from './keycloak';
import { BASE_URL } from '@/constant/apiConstant';

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor - auto inject token
api.interceptors.request.use(
  async (config) => {
    if (keycloak.token) {
      await keycloak.updateToken(30); // refresh jika expire dalam 30 detik
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      keycloak.login();
    }
    return Promise.reject(error);
  }
);

export default api;
