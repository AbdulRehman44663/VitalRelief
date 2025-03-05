import axios from 'axios';

import { API_URL } from '../config/constants';

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

const register = async (data) => {
    const response = await axios.post(`${API_URL}/register`, data );
    return response.data;
};


const resendVerification = async (data) => {
    const response = await axios.post(`${API_URL}/resend-verification`, data );
    return response.data;
};


const checkVerification = async (data) => {
    const response = await axios.post(`${API_URL}/check-verification`, data );
    return response.data;
};


export default {
    login,register,resendVerification,checkVerification
};