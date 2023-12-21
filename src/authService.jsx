// authService.js
import axios from 'axios';

const API_URL = 'https://orcamentor.com/usuario/api';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    if (response.data.token) {
        // Store token and user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            token: response.data.token,
            user_id: response.data.user_id,
            username: response.data.username,
            firstName: response.data.first_name,
            lastName: response.data.last_name
        }));
    }
    return response.data;
};

// Function to get user data from localStorage
export const getUser = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
    // Further implementation include token validation
};