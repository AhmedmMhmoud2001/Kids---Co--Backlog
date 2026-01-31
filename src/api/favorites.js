import { API_BASE_URL } from './config';

// Helper to get auth header
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const fetchFavorites = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch favorites');
        return data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

export const addToFavorites = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ productId: parseInt(productId) })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to add favorite');
        return data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

export const removeFromFavorites = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/remove/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to remove favorite');
        return data;
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};
