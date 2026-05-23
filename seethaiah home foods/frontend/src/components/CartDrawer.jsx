import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, PackageOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#fffaf5] shadow-2xl z-50 flex flex-col border-l border-orange-100"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-orange-100/50 bg-white/50 backdrop-blur-md flex justify-between items-center sticky top-0 z-10">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-3">
                                    Your Cart
                                    <span className="text-sm font-sans font-medium text-white bg-orange-600 px-2 py-0.5 rounded-full shadow-sm">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-orange-100 rounded-full transition-colors group"
                            >
                                <X className="text-gray-500 group-hover:text-orange-600 transition-colors" size={24} />
                            </button>
                        </div>

                        {/* Items Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                                        <PackageOpen size={48} className="text-orange-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Your cart is empty</h3>
                                    <p className="text-gray-500 max-w-[250px] leading-relaxed">
                                        Looks like you haven't added any sweet treats yet.
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 px-8 py-3 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence initial={false}>
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                className="group relative flex gap-5 bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-orange-100 hover:shadow-md transition-all duration-300"
                                            >
                                                {/* Image */}
                                                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className="font-bold text-lg text-gray-900 leading-snug">
                                                            {item.name}
                                                        </h3>
                                                        <p className="font-bold text-orange-600 whitespace-nowrap">
                                                            ₹{(item.price * item.quantity).toFixed(0)}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm text-gray-500 font-medium">
                                                        ₹{item.price} per {item.unit}
                                                    </p>

                                                    <div className="flex justify-between items-end mt-3">
                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-1.5 py-1 border border-gray-200">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus size={14} strokeWidth={2.5} />
                                                            </button>
                                                            <span className="text-sm font-bold w-4 text-center text-gray-900">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                                            >
                                                                <Plus size={14} strokeWidth={2.5} />
                                                            </button>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 p-2 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                            title="Remove item"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-white border-t border-orange-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600 text-sm">
                                        <span>Taxes & Fees</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-orange-600">₹{cartTotal}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-3 mb-3"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={20} />
                                </button>
                                <p className="text-center text-xs text-gray-400 flex justify-center items-center gap-1">
                                    <ShoppingBag size={12} />
                                    Secure checkout powered by Stripe
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
