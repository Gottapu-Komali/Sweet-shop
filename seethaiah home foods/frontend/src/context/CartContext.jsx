import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Failed to parse cart from local storage:', error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hasActiveOrder, setHasActiveOrder] = useState(() => {
        return localStorage.getItem('hasActiveOrder') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const placeOrder = () => {
        setHasActiveOrder(true);
        localStorage.setItem('hasActiveOrder', 'true');
        clearCart();
    };

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id && item.unit === product.unit);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.unit === product.unit)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    if (newQty < 1) return item;
                    return { ...item, quantity: newQty };
                }
                return item;
            });
        });
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            toggleCart,
            setIsCartOpen,
            hasActiveOrder,
            placeOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};
