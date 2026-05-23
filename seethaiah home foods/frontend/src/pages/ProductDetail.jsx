import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, UtensilsCrossed, ArrowLeft, Heart, Share2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { products } = useProducts();
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState('500g');

    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <div className="container" style={{paddingTop: '10rem', textAlign: 'center'}}><h2>Delicacy not found</h2></div>;

    const calculatePrice = () => {
        if (selectedWeight === '250g') return product.price / 2;
        if (selectedWeight === '1kg') return product.price * 2;
        return product.price;
    };

    const handleAddToCart = () => {
        addToCart({ ...product, price: calculatePrice(), quantity, unit: selectedWeight });
    };

    return (
        <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem'}}>
            <Link to="/menu" className="nav-link" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem'}}>
                <ArrowLeft size={18} /> Back to Menu
            </Link>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem'}}>
                {/* Image Gallery */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="product-image-gallery"
                >
                    <div className="product-card" style={{height: '500px', marginBottom: '1rem'}}>
                        <img src={product.images[0]} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'}}>
                        {product.images.map((img, i) => (
                            <div key={i} className="product-card" style={{height: '100px', cursor: 'pointer', border: i === 0 ? '2px solid var(--secondary)' : 'none'}}>
                                <img src={img} alt={`${product.name} ${i}`} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Product Info */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="product-info-details"
                >
                    <span className="product-tag">Premium Collection</span>
                    <h1 className="serif" style={{fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '0.5rem'}}>{product.name}</h1>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold)'}}>
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={18} 
                                    fill={i < Math.floor(product.rating) ? "var(--gold)" : "none"} 
                                    strokeWidth={2}
                                />
                            ))}
                            <span style={{marginLeft: '8px', fontWeight: '700', color: 'var(--text-dark)'}}>{product.rating}</span>
                        </div>
                        <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>({product.reviews} Verified Reviews)</span>
                    </div>

                    <div className="product-price" style={{fontSize: '2rem', marginBottom: '2rem'}}>
                        ₹{calculatePrice()} <span style={{fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '8px'}}>per {selectedWeight}</span>
                    </div>

                    <p style={{fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8'}}>
                        {product.description}
                    </p>

                    {/* Weight Selector */}
                    <div style={{marginBottom: '2rem'}}>
                        <h4 style={{marginBottom: '1rem'}}>Select Weight</h4>
                        <div style={{display: 'flex', gap: '10px'}}>
                            {['250g', '500g', '1kg'].map((w) => (
                                <button
                                    key={w}
                                    disabled={product.inStock === false}
                                    onClick={() => setSelectedWeight(w)}
                                    style={{
                                        flex: 1,
                                        padding: '12px 0',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid',
                                        borderColor: selectedWeight === w ? 'var(--primary)' : '#ddd',
                                        background: selectedWeight === w ? 'var(--primary)' : 'white',
                                        color: selectedWeight === w ? 'white' : 'var(--text-dark)',
                                        cursor: product.inStock === false ? 'default' : 'pointer',
                                        transition: 'all 0.3s',
                                        opacity: product.inStock === false ? 0.5 : 1
                                    }}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity and CTA */}
                    <div style={{display: 'flex', gap: '1.5rem', marginBottom: '3rem'}}>
                        <div style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.5rem',
                            opacity: product.inStock === false ? 0.5 : 1
                        }}>
                            <button 
                                disabled={product.inStock === false}
                                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                style={{background: 'none', border: 'none', cursor: product.inStock === false ? 'default' : 'pointer', padding: '0 10px'}}
                            >
                                <Minus size={18}/>
                            </button>
                            <span style={{width: '40px', textAlign: 'center', fontWeight: '600'}}>{quantity}</span>
                            <button 
                                disabled={product.inStock === false}
                                onClick={() => setQuantity(quantity + 1)} 
                                style={{background: 'none', border: 'none', cursor: product.inStock === false ? 'default' : 'pointer', padding: '0 10px'}}
                            >
                                <Plus size={18}/>
                            </button>
                        </div>
                        <button 
                            className="add-btn" 
                            disabled={product.inStock === false}
                            onClick={handleAddToCart} 
                            style={{
                                flex: 1, 
                                padding: '1rem',
                                background: product.inStock === false ? '#eee' : 'var(--primary)',
                                color: product.inStock === false ? '#999' : 'white',
                                cursor: product.inStock === false ? 'default' : 'pointer',
                                border: 'none'
                            }}
                        >
                            {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button className="icon-btn" style={{border: '1px solid #ddd', borderRadius: 'var(--radius-sm)', width: '55px'}}><Heart size={20}/></button>
                    </div>

                    {/* Trust Elements */}
                    <div style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '1rem', 
                        padding: '2rem', 
                        background: 'rgba(212, 175, 55, 0.05)', 
                        borderRadius: 'var(--radius-md)'
                    }}>
                        <div style={{textAlign: 'center'}}>
                            <UtensilsCrossed size={20} color="var(--primary)" style={{marginBottom: '0.5rem'}}/>
                            <p style={{fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase'}}>Pure Ghee</p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <ShieldCheck size={20} color="var(--primary)" style={{marginBottom: '0.5rem'}}/>
                            <p style={{fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase'}}>Safe Packing</p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <Truck size={20} color="var(--primary)" style={{marginBottom: '0.5rem'}}/>
                            <p style={{fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase'}}>Fast Delivery</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
