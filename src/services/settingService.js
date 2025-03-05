
import axios from 'axios';

import { API_URL } from '../config/constants';
import useStore from "../store";
const token = useStore.token;

const apiClient = axios.create({
  baseURL: API_URL,
});

const apiClient2 = axios.create({
  baseURL: API_URL,
});

// A request interceptor to attach the token
apiClient.interceptors.request.use(config => {
  const { token } = useStore.getState();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// A response interceptor to handle unauthorized responses
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response && response.status === 401) {

      const { logout } = useStore.getState();
      logout();

      window.location.href = '/login'; 
    }
    return Promise.reject(error); 
  }
);

const settingService = {
  
    // Get site setting
    getSiteSetting: async () => {
        const response = await apiClient2.get(`${API_URL}/site-settings`);
        return response.data;
    },
    
};



export default settingService;