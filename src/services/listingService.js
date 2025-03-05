
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

const listingService = {

    // Get listings filters
    getListingFilters: async () => {
      const response = await apiClient2.get(`${API_URL}/listing-filters`);
      return response.data;
    },  
  
    // List all listing details
    list: async (filter=null) => {
      if(filter){
        const query = new URLSearchParams(filter).toString();
        const response = await apiClient2.get(`${API_URL}/listings?${query}`);
        return response.data;
      }else{
        
        const response = await apiClient2.get(`${API_URL}/listings`);
        return response.data;
      }
        
    
    },

    getTagByURL: async (filter)=>{
      const query = new URLSearchParams(filter).toString();
      const response = await apiClient2.get(`${API_URL}/tag-by-url?${query}`);
      return response.data;
    },

    // Get a single listing by ID
    get: async (id) => {
        const response = await apiClient2.get(`${API_URL}/listings/${id}`);
        return response.data;
    },

    // Get a single listing by ID
    getSingle: async (id) => {
        const response = await apiClient.get(`${API_URL}/listings/${id}`);
        return response.data;
    },

    
    // Get a single listing by ID
    myListings: async (filter) => {
      const query = new URLSearchParams(filter).toString();
        const response = await apiClient.get(`${API_URL}/my-listings?${query}`);
        return response.data;
    },


    
    // Get a single listing by Slug
    getBySlug: async (slug) => {
      const response = await apiClient2.get(`${API_URL}/listings-by-slug/${slug}`);
      return response.data;
    },


    // Create a new listing
    create: async (listingData) => {
        const response = await apiClient.post(`${API_URL}/listings`, listingData);
        return response.data;
    },

    // Update an existing listing
    update: async (id, listingData) => {
        const response = await apiClient.post(`${API_URL}/listings/${id}`, listingData);
        return response.data;
    },

    // Delete a listing
    delete: async (id) => {
        const response = await apiClient.delete(`${API_URL}/listings/${id}`);
        return response.data;
    },
};



export default listingService;