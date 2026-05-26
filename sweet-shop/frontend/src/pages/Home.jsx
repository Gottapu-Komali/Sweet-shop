import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Truck, UtensilsCrossed, Heart, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from "../assets/hero-sweets.jpg";
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useState } from 'react';

const Home = () => {
    const { products } = useProducts();
    const categories = [
        { name: 'Mithai', image: '/mithai.png', path: '/menu?cat=mithai' },
        { name: 'Gift Boxes', image: '/gifts.png', path: '/menu?cat=gifts' },
        { name: 'Festival Specials', image: 'https://d1n5l80rwxz6pi.cloudfront.net/blog/traditional-indian-sweets-found-in-a-grocery-store.jpg', path: '/festivals' },
    ];
    const featuredProducts = products.slice(0, 4).map(p => ({
        ...p,
        oldPrice: Math.round(p.price * 1.1),
        tag: p.id % 2 === 0 ? 'Fresh Today' : 'Best Seller'
    }));

    const reviews = [
        { name: 'Anjali Sharma', stars: 5, text: "The Kaju Katli was incredibly fresh and melted in my mouth. Packaging was beautiful too!" },
        { name: 'Rahul Verma', stars: 5, text: "Best sweets in town! The same-day delivery service is a lifesaver for last-minute gifts." },
        { name: 'Priya Mani', stars: 4, text: "Authentic taste. Reminded me of my grandmother's handmade sweets." },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <img src={heroImage} alt="Sweets Hero" style={{ position: 'absolute', width: '100%', height: '50', objectFit: 'cover' }} />
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="hero-content"
                    >
                        <span className="hero-tagline">Authentic & Handcrafted</span>
                        <h1>Exquisite Indian Sweets for <span className="text-gold">Every Celebration</span></h1>
                        <p>Experience the rich heritage of Seethaiah Home Foods, where every bite is a journey through traditional flavors and pure ingredients.</p>
                        <div className="hero-btns">
                            <Link to="/menu" className="btn btn-primary">Shop Now</Link>
                            <Link to="/about" className="btn btn-outline">Our Story</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container" style={{ paddingTop: '6rem' }}>
                <div className="section-header">
                    <span className="hero-tagline" style={{ display: 'block', marginBottom: '1rem' }}>Curated for You</span>
                    <h2 className="serif" style={{ fontSize: '3.5rem' }}>Shop by <span className="text-gold">Category</span></h2>
                    <div className="ornament"></div>
                </div>
                <div className="category-grid">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to={cat.path} className="category-card">
                                <img src={cat.image} alt={cat.name} />
                                <div className="category-overlay">
                                    <h3>{cat.name}</h3>
                                    <span>Explore Collection →</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container" style={{ padding: '6rem 0' }}>
                <div className="section-header">
                    <h2>Featured <span className="text-gold">Collections</span></h2>
                    <div className="ornament"></div>
                </div>
                <div className="product-grid">
                    {featuredProducts.map((prod) => (
                        <FeaturedProductCard key={prod.id} prod={prod} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/menu" className="btn btn-primary" style={{ backgroundColor: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)' }}>
                        View All Menu <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="trust-bar">
                <div className="container trust-container">
                    <div className="trust-item">
                        <UtensilsCrossed className="trust-icon" />
                        <h4>Freshly Made</h4>
                        <p>Prepared daily with pure ingredients</p>
                    </div>
                    <div className="trust-item">
                        <ShieldCheck className="trust-icon" />
                        <h4>100% Hygienic</h4>
                        <p>Strict quality and safety standards</p>
                    </div>
                    <div className="trust-item">
                        <Truck className="trust-icon" />
                        <h4>Same Day Delivery</h4>
                        <p>Fast delivery to your doorstep</p>
                    </div>
                    <Link to="/gifting" className="trust-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ShoppingBag className="trust-icon" />
                        <h4>Elegant Gifting</h4>
                        <p>Premium packaging for all occasions</p>
                    </Link>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="container" style={{ paddingBottom: '6rem' }}>
                <div className="section-header">
                    <h2>Customer <span className="text-gold">Stories</span></h2>
                    <div className="ornament"></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {reviews.map((rev, i) => (
                        <motion.div
                            key={i}
                            className="product-card"
                            style={{ padding: '2rem', textAlign: 'center' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1rem' }}>
                                {[...Array(rev.stars)].map((_, i) => <Star key={i} size={16} fill="var(--secondary)" color="var(--secondary)" />)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>\"{ rev.text }\"</p>
                            <h4 style={{ fontWeight: '700' }}>{rev.name}</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>Verified Buyer</span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const FeaturedProductCard = ({ prod }) => {
    const { addToCart } = useCart();
    const [selectedWeight, setSelectedWeight] = useState('500g');

    const calculatePrice = () => {
        if (selectedWeight === '250g') return Math.round(prod.price / 2);
        if (selectedWeight === '1kg') return prod.price * 2;
        return prod.price;
    };

    return (
        <div className="product-card" style={{ opacity: prod.inStock === false ? 0.7 : 1 }}>
            <div className="product-image" style={{ filter: prod.inStock === false ? 'grayscale(0.5)' : 'none' }}>
                <img src={prod.image} alt={prod.name} />
                <button className="wishlist-btn"><Heart size={18} /></button>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'var(--secondary)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>
                    {selectedWeight}
                </div>
                {prod.inStock === false && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-15deg)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: 'var(--primary)',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        fontWeight: '900',
                        fontSize: '1rem',
                        border: '2px double var(--primary)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        zIndex: 2,
                        whiteSpace: 'nowrap'
                    }}>
                        SOLD OUT
                    </div>
                )}
            </div>
            <div className="product-info">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                    <div>
                        <span className="product-tag">{prod.tag}</span>
                        <h3>{prod.name}</h3>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(212, 175, 55, 0.1)', padding: '2px 8px', borderRadius: '4px'}}>
                        <Star size={12} fill="var(--gold)" color="var(--gold)" />
                        <span style={{fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)'}}>{prod.rating}</span>
                    </div>
                </div>
                
                {/* Weight Selector */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '1rem' }}>
                    {['250g', '500g', '1kg'].map((w) => (
                        <button
                            key={w}
                            disabled={prod.inStock === false}
                            onClick={() => setSelectedWeight(w)}
                            style={{
                                flex: 1,
                                padding: '4px 0',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                borderRadius: '4px',
                                border: '1px solid',
                                borderColor: selectedWeight === w ? 'var(--primary)' : '#eee',
                                background: selectedWeight === w ? 'var(--primary)' : 'white',
                                color: selectedWeight === w ? 'white' : 'var(--text-dark)',
                                cursor: prod.inStock === false ? 'default' : 'pointer',
                                opacity: prod.inStock === false ? 0.5 : 1
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                <div className="product-price">
                    <span>₹{calculatePrice()}</span>
                    <span className="old-price">₹{selectedWeight === '1kg' ? prod.oldPrice * 2 : selectedWeight === '250g' ? Math.round(prod.oldPrice / 2) : prod.oldPrice}</span>
                </div>
                <button 
                    className="add-btn" 
                    disabled={prod.inStock === false}
                    onClick={() => addToCart({ ...prod, price: calculatePrice(), unit: selectedWeight })}
                    style={{
                        background: prod.inStock === false ? '#eee' : 'var(--primary)',
                        color: prod.inStock === false ? '#999' : 'white',
                        cursor: prod.inStock === false ? 'default' : 'pointer'
                    }}
                >
                    {prod.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default Home;