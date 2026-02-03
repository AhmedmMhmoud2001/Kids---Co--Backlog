import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import * as cartApi from '../api/cart';
import { normalizeProduct } from '../api/products';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

// Helper function to get storage key for user-specific data
const getStorageKey = (key, userId) => {
  return userId ? `${key}_${userId}` : `${key}_guest`;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const abortControllerRef = useRef(null);

  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const currentUser = savedUser ? JSON.parse(savedUser) : null;
      const userId = currentUser?.id || 'guest';
      const savedCart = localStorage.getItem(getStorageKey('cart', userId));
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('appliedCoupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save coupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const userId = user?.id || 'guest';
    localStorage.setItem(getStorageKey('cart', userId), JSON.stringify(cartItems));
  }, [cartItems, user]);

  // Load cart from backend
  const loadCart = useCallback(async (signal) => {
    if (!user) {
      const savedCart = localStorage.getItem(getStorageKey('cart', 'guest'));
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      return;
    }

    try {
      setIsLoading(true);
      const res = await cartApi.fetchCart();
      
      // Check if request was aborted
      if (signal?.aborted) return;

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
      if (err.name !== 'AbortError') {
        console.error('Error loading cart from backend:', err);
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [user]);

  // Sync cart on user change with AbortController
  useEffect(() => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const syncCart = async () => {
      if (user) {
        // User logged in - merge guest cart and load user cart
        const guestCart = localStorage.getItem(getStorageKey('cart', 'guest'));

        // Load user's cart from backend first
        await loadCart(controller.signal);

        // Merge guest cart items with user cart
        if (guestCart && !controller.signal.aborted) {
          try {
            const guestItems = JSON.parse(guestCart);
            for (const item of guestItems) {
              if (controller.signal.aborted) break;
              try {
                await cartApi.addToCart(
                  item.id,
                  item.quantity,
                  item.selectedSize,
                  item.selectedColor
                );
              } catch (err) {
                console.error('Error merging guest cart item:', err);
              }
            }
            // Clear guest cart after merging
            localStorage.removeItem(getStorageKey('cart', 'guest'));
            // Reload cart to get updated data
            if (!controller.signal.aborted) {
              await loadCart(controller.signal);
            }
          } catch (err) {
            console.error('Error parsing guest cart:', err);
          }
        }
      } else {
        // User logged out - load guest data
        loadCart(controller.signal);
      }
    };

    syncCart();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [user, loadCart]);

  const addToCart = useCallback(async (product, quantity = 1, selectedSize = null, selectedColor = null) => {
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
      throw err; // Re-throw for error handling in components
    }
  }, [user, loadCart]);

  const removeFromCart = useCallback(async (itemIdOrProductId) => {
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
        setCartItems(prev => prev.filter(i => i !== item));
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw err;
    }
  }, [user, cartItems, loadCart]);

  const updateCartQuantity = useCallback(async (itemIdOrProductId, quantity) => {
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
      throw err;
    }
  }, [user, cartItems, removeFromCart, loadCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  // Computed values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    let price = 0;
    if (typeof item.price === 'number') {
      price = item.price;
    } else if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    }
    return total + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    appliedCoupon,
    setAppliedCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
