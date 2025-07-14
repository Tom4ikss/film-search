import axios from 'axios';

export const http = axios.create({
  baseURL: '/api',
  headers: {
    'X-API-KEY': import.meta.env.VITE_KP_API_KEY
  },
  paramsSerializer: {  indexes: null }
});

http.interceptors.response.use(
  r => r,
  e => {
    return Promise.reject(e);
  }
);