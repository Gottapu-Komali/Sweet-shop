import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="product-card"
                    style={{padding: '4rem', maxWidth: '600px'}}
                >
                    <ShoppingBag size={80} color="var(--primary)" style={{marginBottom: '2rem'}} />
                    <h2 className="serif" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Your cart is empty</h2>
                    <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem'}}>Indulge in our collection of handcrafted sweets. Explore our menu to find your perfect treat.</p>
                    <Link to="/menu" className="btn btn-primary">Start Shopping</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
                <div>
                    <h1 className="serif" style={{fontSize: '3rem'}}>Your Shopping Cart</h1>
                    <p style={{color: 'var(--text-muted)'}}>{cartItems.length} items selected</p>
                </div>
                <button onClick={clearCart} style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline'}}>Clear All</button>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start'}}>
                {/* Cart Items */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div 
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="product-card"
                                style={{display: 'flex', padding: '1rem', gap: '1.5rem', alignItems: 'center'}}
                            >
                                <div style={{width: '120px', height: '120px', borderRadius: 'var(--radius-sm)', overflow: 'hidden'}}>
                                    <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                </div>
                                <div style={{flex: 1}}>
                                    <h3 style={{fontSize: '1.2rem', marginBottom: '0.2rem'}}>{item.name}</h3>
                                    <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.8rem'}}>{item.weight || '500g'}</p>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                        <div style={{display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 'var(--radius-sm)'}}>
                                            <button onClick={() => updateQuantity(item.id, -1)} style={{padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer'}}><Minus size={14}/></button>
                                            <span style={{width: '30px', textAlign: 'center', fontWeight: '600'}}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} style={{padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer'}}><Plus size={14}/></button>
                                        </div>
                                        <span style={{fontWeight: '700', color: 'var(--primary)'}}>₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} style={{background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', padding: '10px'}} className="wishlist-btn">
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="product-card" style={{padding: '2.5rem', position: 'sticky', top: '120px'}}>
                    <h2 className="serif" style={{fontSize: '1.8rem', marginBottom: '2rem'}}>Order Summary</h2>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #eee'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span style={{color: 'var(--text-muted)'}}>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span style={{color: 'var(--text-muted)'}}>Shipping</span>
                            <span style={{color: 'green', fontWeight: '600'}}>FREE</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span style={{color: 'var(--text-muted)'}}>Tax (5%)</span>
                            <span>₹{(cartTotal * 0.05).toFixed(0)}</span>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem'}}>
                        <span style={{fontSize: '1.2rem', fontWeight: '700'}}>Total Payable</span>
                        <span style={{fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)'}}>₹{(cartTotal * 1.05).toFixed(0)}</span>
                    </div>
                    <button className="btn btn-primary" style={{width: '100%', padding: '1.2rem'}}>Proceed to Checkout <ArrowRight size={18} style={{marginLeft: '8px'}}/></button>
                    
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1.5rem', opacity: 0.5, fontSize: '0.8rem'}}>
                        <ShieldCheck size={14} /> 100% Secure Checkout
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
