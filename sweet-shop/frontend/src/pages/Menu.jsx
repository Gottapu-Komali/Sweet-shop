import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertCircle, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useEffect } from 'react';
import WishlistHeart from '../components/WishlistHeart';

const Menu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const querySearch = searchParams.get('search') || "";
    const [searchTerm, setSearchTerm] = useState(querySearch);
    const { products } = useProducts();
    const isLoading = false;

    useEffect(() => {
        if (querySearch) {
            setSearchTerm(querySearch);
        }
    }, [querySearch]);

    const categories = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const matches = (item) =>
            item.name.toLowerCase().includes(lowerSearch) ||
            item.description.toLowerCase().includes(lowerSearch);

        return [
            { id: 'SWEET', title: 'Traditional Mithai', items: products.filter(item => item.category === 'SWEET' && matches(item)) },
            { id: 'SAVORY', title: 'Savory Treats', items: products.filter(item => item.category === 'SAVORY' && matches(item)) },
            { id: 'GIFT', title: 'Gift Boxes', items: products.filter(item => item.category === 'GIFT' && matches(item)) },
        ];
    }, [searchTerm, products]);

    const visibleCategories = categories.filter(cat => cat.items.length > 0);

    return (
        <div className="menu-page">
            <div className="menu-hero">
                <div className="menu-hero-content">
                    <h1>Explore Our <span className="text-gold">Collections</span></h1>
                    <p>Discover handcrafted sweets and delicacies for every occasion</p>
                </div>
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for sweets, gifts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                    )}
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader2 size={32} className="spinner" />
                    </div>
                ) : visibleCategories.length > 0 ? (
                    visibleCategories.map((category) => (
                        <div key={category.id} style={{ marginBottom: '4rem' }}>
                            <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
                                {category.title}
                            </h2>
                            <div className="product-grid">
                                {category.items.map((item, index) => (
                                    <ProductCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: 'var(--text-muted)'
                    }}>
                        <AlertCircle size={48} style={{ margin: '0 auto', marginBottom: '1rem', color: 'var(--primary)' }} />
                        <h3>No products found</h3>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductCard = ({ item, index }) => {
    const { addToCart } = useCart();
    const [selectedWeight, setSelectedWeight] = useState('500g');

    const calculatePrice = () => {
        if (selectedWeight === '250g') return Math.round(item.price / 2);
        if (selectedWeight === '1kg') return item.price * 2;
        return item.price;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="product-card"
            style={{ opacity: item.inStock === false ? 0.7 : 1 }}
        >
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', pointerEvents: item.inStock === false ? 'none' : 'auto' }}>
                <div className="product-image" style={{ filter: item.inStock === false ? 'grayscale(0.5)' : 'none' }}>
                    <WishlistHeart product={item} />
                    <img src={item.image} alt={item.name} />
                    <div className="category-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', padding: '1rem', justifyContent: 'flex-start' }}>
                        <span style={{ background: 'var(--secondary)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>{selectedWeight}</span>
                    </div>
                    {item.inStock === false && (
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                            <span className="product-tag">{item.id % 3 === 0 ? 'Fresh Today' : item.id % 3 === 1 ? 'Best Seller' : 'Limited Stock'}</span>
                            <h3>{item.name}</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(212, 175, 55, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                            <Star size={12} fill="var(--gold)" color="var(--gold)" />
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)' }}>{item.rating}</span>
                        </div>
                    </div>

                    {/* Weight Selector */}
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '1rem' }}>
                        {['250g', '500g', '1kg'].map((w) => (
                            <button
                                key={w}
                                disabled={item.inStock === false}
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
                                    cursor: item.inStock === false ? 'default' : 'pointer',
                                    opacity: item.inStock === false ? 0.5 : 1
                                }}
                            >
                                {w}
                            </button>
                        ))}
                    </div>

                    <div className="product-price">
                        <span>₹{calculatePrice()}</span>
                        <span className="old-price">₹{selectedWeight === '1kg' ? item.price * 2.2 : selectedWeight === '250g' ? Math.round(item.price * 0.55) : item.price * 1.1}</span>
                    </div>
                </div>
            </Link>
            <button
                className="add-btn"
                disabled={item.inStock === false}
                onClick={() => addToCart({ ...item, price: calculatePrice(), unit: selectedWeight })}
                style={{
                    background: item.inStock === false ? '#eee' : 'var(--primary)',
                    color: item.inStock === false ? '#999' : 'white',
                    cursor: item.inStock === false ? 'default' : 'pointer'
                }}
            >
                {item.inStock === false ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </motion.div>
    );
};

export default Menu;