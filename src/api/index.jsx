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

        const processedData = response.data.map(item => ({
            ...item,
            unitCost: parseFloat(item.comp_cost)  // Convert comp_cost to a number
        }));

        return processedData;
    } catch (error) {
        console.error("Error fetching compositions:", error);
        return [];
    }
}