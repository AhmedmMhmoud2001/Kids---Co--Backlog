import { createContext, useContext, useState, useEffect } from 'react';
import * as favoritesApi from '../api/favorites';
import * as cartApi from '../api/cart';
import { fetchMe } from '../api/auth';
import { normalizeProduct } from '../api/products';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Helper function to get storage key for user-specific data
const getStorageKey = (key, userId) => {
  return userId ? `${key}_${userId}` : `${key}_guest`;
};

export const AppProvider = ({ children }) => {
  // Load user from localStorage on mount
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize cart and favorites - load from localStorage on mount
  const [cartItems, setCartItems] = useState(() => {
    // On initial mount, user might not be loaded yet, so check localStorage directly
    const savedUser = localStorage.getItem('user');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    const userId = currentUser?.id || 'guest';
    const savedCart = localStorage.getItem(getStorageKey('cart', userId));
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('appliedCoupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);


  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const userId = user?.id || 'guest';
    localStorage.setItem(getStorageKey('cart', userId), JSON.stringify(cartItems));
  }, [cartItems, user]);


  const loadCart = async () => {
    if (!user) {
      const savedCart = localStorage.getItem(getStorageKey('cart', 'guest'));
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      return;
    }

    try {
      const res = await cartApi.fetchCart();
      if (res.success && res.data && Array.isArray(res.data.items)) {
        const normalizedItems = res.data.items.map(item => ({
          ...normalizeProduct(item.product),
          quantity: item.quantity,
          cartItemId: item.id,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }));
        setCartItems(normalizedItems);
      }
    } catch (err) {
      console.error('Error loading cart from backend:', err);
    }
  };

  // Sync cart and favorites on user change
  useEffect(() => {
    loadCart();
    loadFavorites();
  }, [user]);

  const addToCart = async (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    if (!user) {
      setCartItems((prev) => {
        const existingItem = prev.find((item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        );

        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity, selectedSize, selectedColor }];
      });
      return;
    }

    try {
      await cartApi.addToCart(product.id, quantity, selectedSize, selectedColor);
      await loadCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (itemIdOrProductId) => {
    if (!user) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemIdOrProductId));
      return;
    }

    try {
      const item = cartItems.find(i => i.cartItemId === itemIdOrProductId || i.id === itemIdOrProductId);
      if (item && item.cartItemId) {
        await cartApi.removeCartItem(item.cartItemId);
        await loadCart();
      } else if (item) {
        // Fallback for items without cartItemId if any
        setCartItems(prev => prev.filter(i => i !== item));
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const updateCartQuantity = async (itemIdOrProductId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemIdOrProductId);
      return;
    }

    if (!user) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemIdOrProductId ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      const item = cartItems.find(i => i.cartItemId === itemIdOrProductId || i.id === itemIdOrProductId);
      if (item && item.cartItemId) {
        await cartApi.updateCartItem(item.cartItemId, quantity);
        await loadCart();
      }
    } catch (err) {
      console.error('Error updating cart quantity:', err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    // Backend clear cart could be added here if there's an endpoint
  };

  const toggleFavorite = async (productId) => {
    // If not logged in, just use local storage (existing behavior)
    if (!user) {
      setFavorites((prev) => {
        const isFav = prev.includes(productId);
        const newFavs = isFav
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
        localStorage.setItem(getStorageKey('favorites', 'guest'), JSON.stringify(newFavs));
        return newFavs;
      });
      return;
    }

    // If logged in, sync with backend
    try {
      const isFav = favorites.includes(productId);
      if (isFav) {
        // Optimistic update
        setFavorites(prev => prev.filter(id => id !== productId));
        await favoritesApi.removeFromFavorites(productId);
      } else {
        // Optimistic update
        setFavorites(prev => [...prev, productId]);
        await favoritesApi.addToFavorites(productId);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      // Revert on error? (optional)
      // For now just refresh to be safe
      loadFavorites();
    }
  };

  const loadFavorites = async () => {
    if (!user) {
      const savedFavorites = localStorage.getItem(getStorageKey('favorites', 'guest'));
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      return;
    }

    try {
      const res = await favoritesApi.fetchFavorites();
      if (res.success && Array.isArray(res.data)) {
        // Extract product IDs
        const ids = res.data.map(fav => fav.productId);
        setFavorites(ids);
      }
    } catch (err) {
      console.error('Error loading favorites from backend:', err);
    }
  };

  // Sync favorites on user change
  useEffect(() => {
    loadFavorites();
  }, [user]);

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  const cartTotal = cartItems.reduce((total, item) => {
    let price = 0;
    if (typeof item.price === 'number') {
      price = item.price;
    } else if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    }
    return total + price * item.quantity;
  }, 0);

  // Authentication functions
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // Cart and favorites will be reset by the useEffect when user becomes null
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const [audience, setAudience] = useState('KIDS');

  const value = {
    audience,
    setAudience,
    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartTotal,
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount,
    // Cart UI
    isCartOpen,
    setIsCartOpen,
    // Authentication
    user,
    login,
    logout,
    isAuthenticated,
    // Coupons
    appliedCoupon,
    setAppliedCoupon,
    removeCoupon: () => setAppliedCoupon(null),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

