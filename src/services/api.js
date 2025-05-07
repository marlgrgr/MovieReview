import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
        window.location.replace('/session-expired');
    }
    return Promise.reject(error);
  }
);

export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);
