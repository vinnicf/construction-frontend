// authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/usuario/api';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
    // Further implementation include token validation
};
