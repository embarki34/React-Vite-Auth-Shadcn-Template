import axios from 'axios'
import { baseUrl } from '@/const/const';
import { tokenManagerInstance } from '@/const/TokenManagment';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = tokenManagerInstance.getToken();
    // console.log("accessToken",accessToken)
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = tokenManagerInstance.getRefreshToken();
        // Call refresh token endpoint
        const response = await axios.post(`${baseUrl}/refresh-token`, {
          refreshToken
        });

        const { accessToken } = response.data;
        tokenManagerInstance.setToken(accessToken);

        // Update the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure - logout user
        tokenManagerInstance.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
