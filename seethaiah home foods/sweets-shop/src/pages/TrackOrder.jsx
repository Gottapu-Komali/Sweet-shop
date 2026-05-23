import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Phone, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const previousOrders = [
    {
        id: "SF-82941",
        date: "2026-05-11",
        time: "10:15 AM",
        status: "In Transit",
        items: [
            { name: "Royal Kaju Katli", qty: "500g", price: 450 },
            { name: "Special Spicy Mixture", qty: "500g", price: 180 }
        ],
        total: 630,
        address: "Kondapur, Hyderabad",
        progress: 75
    }
];

const TrackOrder = () => {
    const { hasActiveOrder } = useCart();

    return (
        <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem'}}>
            <div className="section-header">
                <h2>Track Your Orders</h2>
                <p style={{color: 'var(--text-muted)'}}>Monitor your delicious deliveries in real-time.</p>
                <div className="ornament" style={{marginTop: '1.5rem'}}></div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '900px', margin: '0 auto'}}>
                {!hasActiveOrder ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{textAlign: 'center', padding: '4rem 0'}}
                        className="product-card"
                    >
                        <Package size={60} color="var(--secondary)" style={{margin: '0 auto 2rem'}} />
                        <h3 className="serif" style={{fontSize: '2rem', marginBottom: '1rem'}}>No Active Orders</h3>
                        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>You haven't placed any orders yet. Explore our delicious sweets and place your first order!</p>
                        <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
                    </motion.div>
                ) : (
                    previousOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="product-card"
                            style={{padding: '2.5rem', borderLeft: `6px solid ${order.status === 'Delivered' ? '#4caf50' : 'var(--secondary)'}`}}
                        >
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
                                <div>
                                    <span style={{fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px'}}>Order ID</span>
                                    <h3 className="serif" style={{fontSize: '1.8rem', color: 'var(--primary)'}}>#{order.id}</h3>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <div style={{
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        padding: '6px 16px', 
                                        borderRadius: 'var(--radius-full)',
                                        background: order.status === 'Delivered' ? '#e8f5e9' : 'var(--bg-cream)',
                                        color: order.status === 'Delivered' ? '#2e7d32' : 'var(--primary)',
                                        fontWeight: '600',
                                        fontSize: '0.9rem'
                                    }}>
                                        {order.status === 'Delivered' ? <CheckCircle size={16}/> : <Clock size={16}/>}
                                        {order.status}
                                    </div>
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>{order.date} • {order.time}</p>
                                </div>
                            </div>

                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '2rem'}}>
                                <div>
                                    <h4 style={{marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Items Ordered</h4>
                                    <ul style={{listStyle: 'none'}}>
                                        {order.items.map((item, i) => (
                                            <li key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem'}}>
                                                <span>{item.name} ({item.qty})</span>
                                                <span style={{fontWeight: '600'}}>₹{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px dashed #eee', fontWeight: '700', color: 'var(--primary)'}}>
                                        <span>Total Paid</span>
                                        <span>₹{order.total}</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Delivery Progress</h4>
                                    <div style={{height: '8px', background: '#eee', borderRadius: '4px', margin: '2rem 0', overflow: 'hidden'}}>
                                        <div style={{width: `${order.progress}%`, height: '100%', background: 'var(--secondary)', transition: 'width 1s ease'}}></div>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: order.progress >= 25 ? 1 : 0.4}}>
                                            <Package size={20} color={order.progress >= 25 ? 'var(--primary)' : '#999'}/>
                                            <span style={{fontSize: '0.7rem', fontWeight: '600'}}>Packed</span>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: order.progress >= 75 ? 1 : 0.4}}>
                                            <Truck size={20} color={order.progress >= 75 ? 'var(--primary)' : '#999'}/>
                                            <span style={{fontSize: '0.7rem', fontWeight: '600'}}>Transit</span>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: order.progress >= 100 ? 1 : 0.4}}>
                                            <CheckCircle size={20} color={order.progress >= 100 ? 'var(--primary)' : '#999'}/>
                                            <span style={{fontSize: '0.7rem', fontWeight: '600'}}>Delivered</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {order.status !== 'Delivered' && (
                                <div style={{display: 'flex', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid #eee'}}>
                                    <button className="btn btn-primary" style={{flex: 1, padding: '0.8rem'}}><Phone size={16} style={{marginRight: '8px'}}/> Call Courier</button>
                                    <button className="btn btn-outline" style={{flex: 1, padding: '0.8rem', color: 'var(--primary)', borderColor: 'var(--primary)'}}><MessageSquare size={16} style={{marginRight: '8px'}}/> Chat Support</button>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
