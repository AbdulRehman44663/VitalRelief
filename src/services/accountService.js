
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

const accountService = {
  
    // update profile
    updateProfile: async (data) => {
        const response = await apiClient.post(`${API_URL}/update-profile`, data);
        return response.data;
    },

    // Update password
    updatePassword: async (data) => {
        const response = await apiClient.post(`${API_URL}/update-password`, data);
        return response.data;
    },

    
    // Send account deleteion code
    sendAccountDeletionCode: async (data) => {
      const response = await apiClient.post(`${API_URL}/send-delete-verificaiton`, data);
      return response.data;
    },

  
    // Delete account 
    deleteAccount: async (data) => {
      const response = await apiClient.post(`${API_URL}/delete-account`, data);
      return response.data;
    },

    // Recovery Link
    sendRecoveryLink: async (data) => {
      const response = await apiClient2.post(`${API_URL}/send-recovery-link`, data);
      return response.data;
    },

    // Verify Reset Code
    verifyResetCode: async (data) => {
      const response = await apiClient2.post(`${API_URL}/verify-reset-code`, data);
      return response.data;
    },

    // Reset Password
    resetPassword: async (data) => {
      const response = await apiClient2.post(`${API_URL}/reset-password`, data);
      return response.data;
    },

     // Check status for account 
     checkUserStatus: async (data) => {
      const response = await apiClient.post(`${API_URL}/check-account-status`, data);
      return response.data;
    },

};



export default accountService;