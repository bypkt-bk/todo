import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5555',
});

apiClient.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
       window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;