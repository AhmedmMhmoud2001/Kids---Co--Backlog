import { API_BASE_URL } from './config';

// Helper to normalize product data from backend
export const normalizeProduct = (product) => {
    if (!product) return null;

    // Handle thumbnails
    let thumbnails = [];
    try {
        if (typeof product.thumbnails === 'string') {
            thumbnails = JSON.parse(product.thumbnails);
        } else if (Array.isArray(product.thumbnails)) {
            thumbnails = product.thumbnails;
        }
    } catch (e) {
        console.error("Error parsing thumbnails:", e);
    }

    // Handle colors
    let colors = [];
    try {
        if (typeof product.colors === 'string') {
            colors = JSON.parse(product.colors);
        } else if (Array.isArray(product.colors)) {
            colors = product.colors;
        }
    } catch (e) {
        console.error("Error parsing colors:", e);
    }

    // Handle sizes
    let sizes = [];
    try {
        if (typeof product.sizes === 'string') {
            sizes = JSON.parse(product.sizes);
        } else if (Array.isArray(product.sizes)) {
            sizes = product.sizes;
        }
    } catch (e) {
        console.error("Error parsing sizes:", e);
    }

    const mainImage = product.image || thumbnails[0] || null;
    const allImages = (Array.isArray(product.images) && product.images.length > 0)
        ? product.images
        : (thumbnails.length > 0 ? thumbnails : (mainImage ? [mainImage] : []));

    return {
        ...product,
        name: product.name || product.title || 'Untitled Product',
        image: mainImage,
        images: allImages,
        colors: colors.length > 0 ? colors : null,
        sizes: sizes.length > 0 ? sizes : null,
        // Ensure category is easily accessible
        categorySlug: product.category?.slug || product.categorySlug || (typeof product.category === 'string' ? product.category : null),
        categoryName: product.category?.name || product.categoryDisplay || (typeof product.category === 'string' ? product.category : 'Category')
    };
};

// Get all products with optional filters
export const fetchProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams();

        if (filters.audience) params.append('audience', filters.audience);
        if (filters.bestSeller) params.append('bestSeller', 'true');
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.brands && filters.brands.length > 0) params.append('brands', filters.brands.join(','));
        if (filters.colors && filters.colors.length > 0) params.append('colors', filters.colors.join(','));
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.search) params.append('search', filters.search);

        const url = `${API_BASE_URL}/products${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch products');
        }

        // Normalize all products in the array
        if (data.success && Array.isArray(data.data)) {
            data.data = data.data.map(normalizeProduct);
        }

        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get best seller products
export const fetchBestSellers = async (audience = null) => {
    return fetchProducts({ audience, bestSeller: true });
};

// Get available colors
export const fetchColors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/colors`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch colors');
        }

        return data;
    } catch (error) {
        console.error('Error fetching colors:', error);
        throw error;
    }
};

// Get single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch product');
        }

        // Normalize the single product
        if (data.success && data.data) {
            data.data = normalizeProduct(data.data);
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

