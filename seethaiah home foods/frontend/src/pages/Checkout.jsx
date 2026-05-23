import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, ShieldCheck, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const { placeOrder } = useCart();
    const navigate = useNavigate();

    return (
        <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
            <div className="section-header">
                <h2>Secure Checkout</h2>
                <div className="ornament"></div>
            </div>

            {/* Step Indicator */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto 4rem',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative'
            }}>
                <div style={{position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: '#eee', zIndex: 0}}>
                    <div style={{width: step === 1 ? '0%' : step === 2 ? '50%' : '100%', height: '100%', background: 'var(--secondary)', transition: 'width 0.3s'}}></div>
                </div>
                {[1, 2, 3].map((s) => (
                    <div key={s} style={{position: 'relative', zIndex: 1, textAlign: 'center'}}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: step >= s ? 'var(--secondary)' : 'white',
                            border: '2px solid var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 0.5rem',
                            color: step >= s ? 'var(--primary)' : 'var(--secondary)',
                            fontWeight: '700'
                        }}>
                            {step > s ? <CheckCircle size={18}/> : s}
                        </div>
                        <span style={{fontSize: '0.8rem', fontWeight: '600', color: step >= s ? 'var(--primary)' : 'var(--text-muted)'}}>
                            {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                        </span>
                    </div>
                ))}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1100px', margin: '0 auto'}}>
                {/* Form Section */}
                <div style={{flex: 2}}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="shipping"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="product-card"
                                style={{padding: '2.5rem'}}
                            >
                                <h3 className="serif" style={{fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px'}}>
                                    <MapPin color="var(--primary)" /> Shipping Details
                                </h3>
                                <form style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                                    <div style={{gridColumn: 'span 2'}}>
                                        <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600'}}>Full Name</label>
                                        <input type="text" placeholder="John Doe" style={{width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd'}} />
                                    </div>
                                    <div style={{gridColumn: 'span 2'}}>
                                        <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600'}}>Street Address</label>
                                        <input type="text" placeholder="House No, Building Name" style={{width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd'}} />
                                    </div>
                                    <div>
                                        <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600'}}>City</label>
                                        <input type="text" placeholder="Hyderabad" style={{width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd'}} />
                                    </div>
                                    <div>
                                        <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600'}}>Pincode</label>
                                        <input type="text" placeholder="500081" style={{width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd'}} />
                                    </div>
                                    <div style={{gridColumn: 'span 2'}}>
                                        <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600'}}>Phone Number</label>
                                        <input type="tel" placeholder="+91 98765 43210" style={{width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd'}} />
                                    </div>
                                </form>
                                <button className="btn btn-primary" onClick={() => setStep(2)} style={{marginTop: '2.5rem', width: '100%'}}>
                                    Continue to Payment <ArrowRight size={18} style={{marginLeft: '10px'}}/>
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="payment"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="product-card"
                                style={{padding: '2.5rem'}}
                            >
                                <h3 className="serif" style={{fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px'}}>
                                    <CreditCard color="var(--primary)" /> Payment Method
                                </h3>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem'}}>
                                    {['Credit / Debit Card', 'UPI (Google Pay, PhonePe)', 'Net Banking', 'Cash on Delivery'].map((method) => (
                                        <label key={method} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '1.2rem',
                                            border: '1px solid #eee',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            gap: '15px'
                                        }}>
                                            <input type="radio" name="payment" />
                                            <span style={{fontWeight: '600'}}>{method}</span>
                                        </label>
                                    ))}
                                </div>
                                <div style={{display: 'flex', gap: '1rem'}}>
                                    <button className="btn btn-outline" onClick={() => setStep(1)} style={{flex: 1, color: 'var(--primary)', borderColor: 'var(--primary)'}}>Back</button>
                                    <button className="btn btn-primary" onClick={() => setStep(3)} style={{flex: 2}}>Review Order</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="confirm"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="product-card"
                                style={{padding: '3rem', textAlign: 'center'}}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: '#e8f5e9',
                                    color: '#2e7d32',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem'
                                }}>
                                    <ShieldCheck size={40} />
                                </div>
                                <h3 className="serif" style={{fontSize: '2.2rem', marginBottom: '1rem'}}>Ready to Place Order?</h3>
                                <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem'}}>Your payment is secure. We'll start preparing your sweets as soon as you confirm.</p>
                                <div style={{display: 'flex', gap: '1rem'}}>
                                    <button className="btn btn-outline" onClick={() => setStep(2)} style={{flex: 1, color: 'var(--primary)', borderColor: 'var(--primary)'}}>Back</button>
                                    <button 
                                        className="btn btn-primary" 
                                        style={{flex: 2}}
                                        onClick={() => {
                                            placeOrder();
                                            navigate('/track-order');
                                        }}
                                    >
                                        Place Order Now
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Summary Section */}
                <div style={{flex: 1}}>
                    <div className="product-card" style={{padding: '2rem', position: 'sticky', top: '120px'}}>
                        <h4 className="serif" style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Order Summary</h4>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                                <span>Subtotal (2 items)</span>
                                <span>₹1,070</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                                <span>Shipping Fee</span>
                                <span style={{color: '#2e7d32', fontWeight: '700'}}>FREE</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                                <span>GST (5%)</span>
                                <span>₹53.50</span>
                            </div>
                            <div style={{height: '1px', background: '#eee', margin: '0.5rem 0'}}></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)'}}>
                                <span>Total Amount</span>
                                <span>₹1,123.50</span>
                            </div>
                        </div>
                        <div style={{
                            background: 'var(--bg-cream)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px dashed var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '0.85rem'
                        }}>
                            <ShieldCheck size={18} color="var(--primary)" />
                            <span>Safe & Secure checkout guaranteed.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
