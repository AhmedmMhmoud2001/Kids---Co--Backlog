import { API_BASE_URL } from './config';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
};

export const fetchMe = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return { success: false };

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user');
    }
    return data;
};

export const updateProfile = async (userData) => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Update failed');
    }
    return data;
};
