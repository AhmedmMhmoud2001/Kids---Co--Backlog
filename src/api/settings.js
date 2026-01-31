import { API_BASE_URL } from './config';

export const fetchShippingFee = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings/shipping_fee`);
        const result = await response.json();
        if (result.success && result.data) {
            return parseFloat(result.data.value);
        }
        return 150; // Fallback
    } catch (error) {
        console.error('Error fetching shipping fee:', error);
        return 150; // Fallback
    }
};
export const fetchHomeHeroVideo = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings/home2_hero_video`);
        const result = await response.json();
        if (result.success && result.data) {
            return result.data.value;
        }
        return "https://www.pexels.com/download/video/3917742/"; // Original video as fallback
    } catch (error) {
        console.error('Error fetching home hero video:', error);
        return "https://www.pexels.com/download/video/3917742/"; // Fallback
    }
};
