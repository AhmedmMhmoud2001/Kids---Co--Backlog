import { API_BASE_URL } from './config';

// Helper to get auth header
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const fetchCart = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch cart');
        return data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const addToCart = async (productId, quantity, selectedSize = null, selectedColor = null) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                productId: parseInt(productId),
                quantity: parseInt(quantity),
                selectedSize,
                selectedColor
            })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to add to cart');
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const updateCartItem = async (itemId, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ quantity: parseInt(quantity) })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update cart item');
        return data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

export const removeCartItem = async (itemId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to remove cart item');
        return data;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
};
