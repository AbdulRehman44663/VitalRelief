
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

const reviewsService = {
  
    // List all listing details
    list: async (filter=null) => {
      if(filter){
        const query = new URLSearchParams(filter).toString();
        const response = await apiClient2.get(`${API_URL}/user-reviews?${query}`);
        return response.data;
      }else{
        
        const response = await apiClient2.get(`${API_URL}/user-reviews`);
        return response.data;
      }
    
    },

    // Create a new user review
    submitReview: async (userReviewData) => {
        const response = await apiClient.post(`${API_URL}/submit-review`, userReviewData);
        return response.data;
    },

    // Update an existing user review
    update: async (id, userReviewData) => {
        const response = await apiClient.put(`${API_URL}/user-reviews/${id}`, userReviewData);
        return response.data;
    },

};



export default reviewsService;