import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const fetchCompositions = async (params) => {
    try {
        let endpoint;
        if (params.codigo) {
            endpoint = `${API_URL}/search-compositions?codigo=${params.codigo}`;
        } else if (params.name) {
            endpoint = `${API_URL}/search-compositions?name=${params.name}`;
        } else {
            throw new Error("Invalid search params provided");
        }
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching compositions:", error);
        return [];
    }
}