import { API_BASE_URL } from './config';

export const validateCoupon = async (code, amount) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ code, amount })
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to validate coupon');
        }

        return data;
    } catch (error) {
        console.error('Error validating coupon:', error);
        throw error;
    }
};
