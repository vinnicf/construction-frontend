
const API_URL = "http://127.0.0.1:8000/api"; // Update with your Django API URL

export const fetchCompositions = async () => {
    const response = await fetch(`${API_URL}/compositions/`);
    const data = await response.json();
    return data;
}