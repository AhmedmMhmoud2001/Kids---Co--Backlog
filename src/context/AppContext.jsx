import { createContext, useContext, useState, useEffect } from 'react';

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

  const [favorites, setFavorites] = useState(() => {
    // On initial mount, user might not be loaded yet, so check localStorage directly
    const savedUser = localStorage.getItem('user');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    const userId = currentUser?.id || 'guest';
    const savedFavorites = localStorage.getItem(getStorageKey('favorites', userId));
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart and favorites from localStorage when user changes (login/logout)
  useEffect(() => {
    const userId = user?.id || 'guest';
    
    // Load cart
    const savedCart = localStorage.getItem(getStorageKey('cart', userId));
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    
    // Load favorites
    const savedFavorites = localStorage.getItem(getStorageKey('favorites', userId));
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

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

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    const userId = user?.id || 'guest';
    localStorage.setItem(getStorageKey('favorites', userId), JSON.stringify(favorites));
  }, [favorites, user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + price * item.quantity;
  }, 0);

  // Authentication functions
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Cart and favorites will be reset by the useEffect when user becomes null
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

