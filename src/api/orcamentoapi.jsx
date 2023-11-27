import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/budget'; // Adjust as necessary

const getUserToken = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        return user.token;
    }
    return null;
};

export const fetchAllOrcamentos = async () => {
    try {
        const token = getUserToken(); // Get the token and remove extra quotes
        const response = await axios.get('http://127.0.0.1:8000/budget/orcamentos/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data; // This will be an array of Orcamento objects
    } catch (error) {
        console.error('Error fetching Orcamentos:', error);
        throw error;
    }
};


export const fetchOrcamento = async (id) => {
    try {
        const token = getUserToken();
        const response = await axios.get(`http://127.0.0.1:8000/budget/orcamentos/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        // Handle or throw the error as needed
        console.error('Error fetching Orcamento:', error);
        throw error;
    }
};

export const deleteOrcamento = async (id) => {
    try {
        const token = getUserToken();
        await axios.delete(`http://127.0.0.1:8000/budget/orcamentos/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting Orcamento:', error);
        throw error;
    }
};

export const createOrcamento = async (formData) => {
    try {
        const token = getUserToken(); 
        const response = await axios.post('http://127.0.0.1:8000/budget/orcamentos/', formData, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data; // This will be the newly created Orcamento object
    } catch (error) {
        console.error('Error creating Orcamento:', error);
        throw error;
    }
};

export const createOrcamentoItem = async (itemData, budgetId) => {
    const transformedData = transformDataForApi(itemData, budgetId); // Transform the data first
    console.log(transformedData)
    const token = getUserToken();
    try {
        const response = await axios.post(`${BASE_URL}/orcamento_items/`, transformedData, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        const newItemInAppFormat = transformSingleItemToAppFormat(response.data);
        return newItemInAppFormat;
    } catch (error) {
        console.error('Error creating OrcamentoItem:', error);
        throw error;
    }
};

// Update an existing OrcamentoItem
export const updateOrcamentoItem = async (itemId, itemData) => {
    const transformedData = transformDataForApi(itemData);
    const token = getUserToken();
    try {
        const response = await axios.patch(`${BASE_URL}/orcamento_items/${itemId}/`, transformedData, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating OrcamentoItem:', error);
        throw error;
    }
};

// Delete an OrcamentoItem
export const deleteOrcamentoItem = async (itemId) => {
    const token = getUserToken();
    try {
        await axios.delete(`${BASE_URL}/orcamento_items/${itemId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting OrcamentoItem:', error);
        throw error;
    }
};


export const transformApiDataToAppFormat = (apiData) => {
    return {
        ...apiData,
        BDI: parseFloat(apiData.bdi),
        items: apiData.items.map(item => ({
            ...item,
            id: item.id,
            type: item.itemtype,
            refId: item.refid,
            name: item.description,
            quantity: parseFloat(item.quantity),
            total_cost: parseFloat(item.unit_cost),
            material_cost: parseFloat(item.material_cost),
            mo_cost: parseFloat(item.mo_cost),
            unitCost: parseFloat(item.unit_cost),
            idd: uuidv4(), // Generate a new UUID if required
            // Calculate 'totalCost', 'costWithBDI', etc., based on your application logic
        }))
    };
};

export const transformSingleItemToAppFormat = (itemFromApi) => {
    return {
        ...itemFromApi,
        id: itemFromApi.id,
        type: itemFromApi.itemtype,
        refId: itemFromApi.refid,
        name: itemFromApi.description,
        quantity: parseFloat(itemFromApi.quantity),
        total_cost: parseFloat(itemFromApi.unit_cost),
        material_cost: parseFloat(itemFromApi.material_cost),
        mo_cost: parseFloat(itemFromApi.mo_cost),
        unitCost: parseFloat(itemFromApi.unit_cost),
        idd: uuidv4(), // Generate a new UUID if required
        // Map other fields as needed
        // Calculate 'totalCost', 'costWithBDI', etc., based on your application logic
    };
};

const transformDataForApi = (item, budgetId) => {
    return {
        id: item.id,
        refid: item.refId,
        itemtype: item.type,
        codigo: item.codigo,
        description: item.name,
        unit: item.unit,
        quantity: item.quantity,
        unit_cost: item.unitCost,
        mo_cost: item.mo_cost,
        material_cost: item.material_cost,
        orcamento: budgetId
        // Add other fields as needed
    };
};