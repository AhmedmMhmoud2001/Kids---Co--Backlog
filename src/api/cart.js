import { API_BASE_URL } from './config';

// All requests use credentials: 'include' for httpOnly cookies

export const fetchCart = async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch cart');
    return data;
};

export const addToCart = async (productId, quantity, selectedSize = null, selectedColor = null) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quantity: parseInt(quantity) })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update cart item');
    return data;
};

export const removeCartItem = async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to remove cart item');
    return data;
};
