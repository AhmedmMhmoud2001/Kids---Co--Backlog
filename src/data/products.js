// Import products from JSON file
import productsData from './products.json';

// Product images - using dynamic URL helper for local assets (fallback only)
const getImageUrl = (name) => {
  try {
    return new URL(`../assets/${name}`, import.meta.url).href;
  } catch {
    // Fallback to a placeholder if the local image doesn't exist
    return `https://via.placeholder.com/400x400/FFC0CB/FFFFFF?text=Product`;
  }
};

// Load products from JSON - use images directly from JSON (they're already URLs from the internet)
export const products = productsData.products.map(product => ({
  ...product,
  // Ensure images array exists and has at least 6 images
  images: product.images && product.images.length >= 6 
    ? product.images 
    : product.images && product.images.length > 0
    ? [...product.images, ...Array(6 - product.images.length).fill(product.image)]
    : Array(6).fill(product.image || 'https://via.placeholder.com/600x600/FFC0CB/FFFFFF?text=Product'),
  // Ensure single image property exists
  image: product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600x600/FFC0CB/FFFFFF?text=Product',
}));

// Cart mock data (using products from the loaded data)
export const initialCartItems = [
  {
    id: 1,
    name: 'Baker by Ted Baker Knitted Glitter Mesh Mockable Dress',
    price: '3,650.00 EE',
    image: products[0]?.image || 'https://via.placeholder.com/600x600/FFC0CB/FFFFFF?text=Product',
    quantity: 1,
    categoryDisplay: 'Girls',
  },
  {
    id: 2,
    name: 'TED Baker Girls Party Dress',
    price: '3,850.00 EE',
    image: products[1]?.image || 'https://via.placeholder.com/600x600/FFC0CB/FFFFFF?text=Product',
    quantity: 1,
    categoryDisplay: 'Girls',
  },
];

// Brands for homepage
export const brands = [
  { name: 'River Island', logo: 'https://via.placeholder.com/200x60/E5E5E5/999999?text=River+Island' },
  { name: 'GUCCI', logo: 'https://via.placeholder.com/200x60/E5E5E5/999999?text=GUCCI' },
  { name: 'TED BAKER', logo: 'https://via.placeholder.com/200x60/E5E5E5/999999?text=TED+BAKER' },
  { name: 'GOLDEN GOOSE', logo: 'https://via.placeholder.com/200x60/E5E5E5/999999?text=GOLDEN+GOOSE' },
];

// Categories for homepage (using data from JSON - images are now URLs from the internet)
export const categories = productsData.categories 
  ? productsData.categories.map(cat => ({
      name: cat.name,
      // Use image directly from JSON (it's already a URL from the internet)
      image: cat.image.startsWith('http') 
        ? cat.image 
        : getImageUrl(cat.image.replace('/src/assets/', '')),
    }))
  : [
      {
        name: 'Boy',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&auto=format',
      },
      {
        name: 'Girl',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format',
      },
      {
        name: 'Baby Boy',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&auto=format',
      },
      {
        name: 'Baby Girl',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&auto=format',
      },
      {
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
      },
      {
        name: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
      },
    ];
