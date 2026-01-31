import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import * as favoritesApi from '../api/favorites';
import * as cartApi from '../api/cart';
import { normalizeProduct } from '../api/products';

const getStorageKey = (key, userId) => {
    return userId ? `${key}_${userId}` : `${key}_guest`;
};

export const useStore = create(
    devtools(
        (set, get) => ({
            // ============ STATE ============
            user: JSON.parse(localStorage.getItem('user')) || null,
            cartItems: [],
            favorites: [],
            isCartOpen: false,
            appliedCoupon: JSON.parse(localStorage.getItem('appliedCoupon')) || null,
            audience: 'KIDS',

            // ============ COMPUTED VALUES ============
            getCartCount: () => {
                const { cartItems } = get();
                return cartItems.reduce((total, item) => total + item.quantity, 0);
            },

            getFavoritesCount: () => {
                const { favorites } = get();
                return favorites.length;
            },

            getCartTotal: () => {
                const { cartItems } = get();
                return cartItems.reduce((total, item) => {
                    let price = 0;
                    if (typeof item.price === 'number') {
                        price = item.price;
                    } else if (typeof item.price === 'string') {
                        price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                    }
                    return total + price * item.quantity;
                }, 0);
            },

            isFavorite: (productId) => {
                const { favorites } = get();
                return favorites.includes(productId);
            },

            isAuthenticated: () => {
                const { user } = get();
                return user !== null;
            },

            // ============ ACTIONS ============
            setAudience: (audience) => set({ audience }),

            setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

            setAppliedCoupon: (coupon) => {
                set({ appliedCoupon: coupon });
                if (coupon) {
                    localStorage.setItem('appliedCoupon', JSON.stringify(coupon));
                } else {
                    localStorage.removeItem('appliedCoupon');
                }
            },

            removeCoupon: () => {
                set({ appliedCoupon: null });
                localStorage.removeItem('appliedCoupon');
            },

            // ============ AUTH ACTIONS ============
            login: async (userData) => {
                // Save guest data before login
                const guestCart = localStorage.getItem(getStorageKey('cart', 'guest'));
                const guestFavorites = localStorage.getItem(getStorageKey('favorites', 'guest'));

                // Set user
                set({ user: userData });
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    localStorage.removeItem('user');
                }

                // Load user cart and favorites from backend
                await get().loadCart();
                await get().loadFavorites();

                // Merge guest cart items with user cart
                if (guestCart && userData) {
                    const guestItems = JSON.parse(guestCart);
                    for (const item of guestItems) {
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
                    await get().loadCart();
                }

                // Merge guest favorites with user favorites
                if (guestFavorites && userData) {
                    const guestFavs = JSON.parse(guestFavorites);
                    for (const productId of guestFavs) {
                        try {
                            await favoritesApi.addToFavorites(productId);
                        } catch (err) {
                            console.error('Error merging guest favorite:', err);
                        }
                    }
                    // Clear guest favorites after merging
                    localStorage.removeItem(getStorageKey('favorites', 'guest'));
                    // Reload favorites to get updated data
                    await get().loadFavorites();
                }
            },

            logout: () => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                set({ user: null, cartItems: [], favorites: [] });
                // Reload guest data
                get().loadCart();
                get().loadFavorites();
            },

            // ============ CART ACTIONS ============
            loadCart: async () => {
                const { user } = get();

                if (!user) {
                    const savedCart = localStorage.getItem(getStorageKey('cart', 'guest'));
                    set({ cartItems: savedCart ? JSON.parse(savedCart) : [] });
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
                        set({ cartItems: normalizedItems });
                    }
                } catch (err) {
                    console.error('Error loading cart:', err);
                }
            },

            addToCart: async (product, quantity = 1, selectedSize = null, selectedColor = null) => {
                const { user, loadCart } = get();

                if (!user) {
                    set((state) => {
                        const existingItem = state.cartItems.find((item) =>
                            item.id === product.id &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                        );

                        let newItems;
                        if (existingItem) {
                            newItems = state.cartItems.map((item) =>
                                item.id === product.id &&
                                    item.selectedSize === selectedSize &&
                                    item.selectedColor === selectedColor
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            );
                        } else {
                            newItems = [...state.cartItems, { ...product, quantity, selectedSize, selectedColor }];
                        }

                        localStorage.setItem(getStorageKey('cart', 'guest'), JSON.stringify(newItems));
                        return { cartItems: newItems };
                    });
                    return;
                }

                try {
                    await cartApi.addToCart(product.id, quantity, selectedSize, selectedColor);
                    await loadCart();
                } catch (err) {
                    console.error('Error adding to cart:', err);
                }
            },

            removeFromCart: async (itemIdOrProductId) => {
                const { user, cartItems, loadCart } = get();

                if (!user) {
                    set((state) => {
                        const newItems = state.cartItems.filter((item) => item.id !== itemIdOrProductId);
                        localStorage.setItem(getStorageKey('cart', 'guest'), JSON.stringify(newItems));
                        return { cartItems: newItems };
                    });
                    return;
                }

                try {
                    const item = cartItems.find(i => i.cartItemId === itemIdOrProductId || i.id === itemIdOrProductId);
                    if (item && item.cartItemId) {
                        await cartApi.removeCartItem(item.cartItemId);
                        await loadCart();
                    } else if (item) {
                        set(state => ({ cartItems: state.cartItems.filter(i => i !== item) }));
                    }
                } catch (err) {
                    console.error('Error removing from cart:', err);
                }
            },

            updateCartQuantity: async (itemIdOrProductId, quantity) => {
                const { user, cartItems, loadCart, removeFromCart } = get();

                if (quantity < 1) {
                    removeFromCart(itemIdOrProductId);
                    return;
                }

                if (!user) {
                    set((state) => {
                        const newItems = state.cartItems.map((item) =>
                            item.id === itemIdOrProductId ? { ...item, quantity } : item
                        );
                        localStorage.setItem(getStorageKey('cart', 'guest'), JSON.stringify(newItems));
                        return { cartItems: newItems };
                    });
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
            },

            clearCart: () => {
                set({ cartItems: [] });
                const userId = get().user?.id || 'guest';
                localStorage.removeItem(getStorageKey('cart', userId));
            },

            // ============ FAVORITES ACTIONS ============
            loadFavorites: async () => {
                const { user } = get();

                if (!user) {
                    const savedFavorites = localStorage.getItem(getStorageKey('favorites', 'guest'));
                    set({ favorites: savedFavorites ? JSON.parse(savedFavorites) : [] });
                    return;
                }

                try {
                    const res = await favoritesApi.fetchFavorites();
                    if (res.success && Array.isArray(res.data)) {
                        const ids = res.data.map(fav => fav.productId);
                        set({ favorites: ids });
                    }
                } catch (err) {
                    console.error('Error loading favorites:', err);
                }
            },

            toggleFavorite: async (productId) => {
                const { user, favorites, loadFavorites } = get();

                if (!user) {
                    const isFav = favorites.includes(productId);
                    const newFavs = isFav
                        ? favorites.filter((id) => id !== productId)
                        : [...favorites, productId];
                    localStorage.setItem(getStorageKey('favorites', 'guest'), JSON.stringify(newFavs));
                    set({ favorites: newFavs });
                    return;
                }

                try {
                    const isFav = favorites.includes(productId);
                    if (isFav) {
                        set({ favorites: favorites.filter(id => id !== productId) });
                        await favoritesApi.removeFromFavorites(productId);
                    } else {
                        set({ favorites: [...favorites, productId] });
                        await favoritesApi.addToFavorites(productId);
                    }
                } catch (err) {
                    console.error('Error toggling favorite:', err);
                    loadFavorites();
                }
            },
        }),
        { name: 'AppStore' }
    )
);

// Initialize the store on load
useStore.getState().loadCart();
useStore.getState().loadFavorites();
