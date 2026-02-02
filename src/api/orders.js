import { API_BASE_URL } from './config';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(orderData)
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchMyOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: getHeaders()
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchOrderById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
            headers: getHeaders()
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
export const updateOrderDetails = async (id, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}/details`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateOrderItems = async (id, items) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${id}/items`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ items })
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
