import { API_BASE_URL } from './config';

// All requests use credentials: 'include' for httpOnly cookies

export const createOrder = async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData)
    });
    return response.json();
};

export const fetchMyOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        credentials: 'include'
    });
    return response.json();
};

export const fetchOrderById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        credentials: 'include'
    });
    return response.json();
};

export const updateOrderDetails = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/details`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    return response.json();
};

export const updateOrderItems = async (id, items) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/items`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items })
    });
    return response.json();
};
