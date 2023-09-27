import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const fetchCompositions = async (codigo) => {
    try {
        const response = await axios.get(`${API_URL}/compositions/${codigo}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching compositions:", error);
        return [];
    }
}
