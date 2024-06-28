import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "https://backchoice.onrender.com";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await api.post('/token/refresh/', { refresh: refreshToken });
          const newAccessToken = response.data.access;

          localStorage.setItem(ACCESS_TOKEN, newAccessToken);
          api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh token", refreshError);
          // Handle refresh token error (e.g., redirect to login)
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
