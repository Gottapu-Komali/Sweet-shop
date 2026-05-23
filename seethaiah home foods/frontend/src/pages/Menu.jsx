import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertCircle, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useEffect } from 'react';

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
            { id: 'KOVA', title: 'Kova Specialties', items: products.filter(item => item.category === 'KOVA' && matches(item)) },
            { id: 'HOT', title: 'Savory Hot Snacks', items: products.filter(item => item.category === 'HOT' && matches(item)) },
            { id: 'PICKLE', title: 'Authentic Pickles', items: products.filter(item => item.category === 'PICKLE' && matches(item)) },
            { id: 'SAVORY', title: 'Homemade Podis & Savories', items: products.filter(item => item.category === 'SAVORY' && matches(item)) }
        ];
    }, [products, searchTerm]);

    const hasNoResults = !isLoading && categories.every(cat => cat.items.length === 0);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
                    <h3 className="serif">Preparing Delicacies...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="menu-page pb-20">
            <div className="container">
                <header style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="serif" style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                            Our Signature <span className="text-gold">Collection</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
                            Experience the authentic taste of tradition. Every item in our menu is handcrafted using pure desi ghee and premium ingredients.
                        </p>

                        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
                            <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                            <input
                                type="text"
                                placeholder="Search your favorites..."
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.5rem 1.2rem 3.5rem',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1.5px solid rgba(128, 0, 0, 0.1)',
                                    background: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </header>

                <AnimatePresence mode="wait">
                    {hasNoResults ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', padding: '6rem 0' }}
                        >
                            <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>No delicacies found</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We couldn't find any match for "{searchTerm}". Try a different search.</p>
                            <button className="btn btn-primary" onClick={() => {
                                setSearchTerm("");
                                setSearchParams({});
                            }}>View Full Menu</button>
                        </motion.div>
                    ) : (
                        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {categories.map((cat) => cat.items.length > 0 && (
                                <section key={cat.id} style={{ marginBottom: '6rem' }}>
                                    <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
                                        <h2 className="serif" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            {cat.title}
                                            <span style={{ height: '1px', flex: 1, background: 'rgba(128, 0, 0, 0.1)' }}></span>
                                        </h2>
                                    </div>
                                    <div className="product-grid">
                                        {cat.items.map((item, index) => (
                                            <ProductCard key={item.id} item={item} index={index} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ProductCard = ({ item, index }) => {
    const { addToCart } = useCart();
    const [selectedWeight, setSelectedWeight] = useState('500g');

    const calculatePrice = () => {
        if (selectedWeight === '250g') return item.price / 2;
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
                            padding: '10px 25px',
                            borderRadius: '4px',
                            fontWeight: '900',
                            fontSize: '1.2rem',
                            border: '3px double var(--primary)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            zIndex: 2,
                            whiteSpace: 'nowrap'
                        }}>
                            SOLD OUT
                        </div>
                    )}
                </div>
            </Link>
            <div className="product-info">
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem'}}>
                        <h3>{item.name}</h3>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: '#fff9c4', padding: '2px 8px', borderRadius: '4px'}}>
                            <Star size={12} fill="var(--gold)" color="var(--gold)" />
                            <span style={{fontSize: '0.75rem', fontWeight: '800', color: '#827717'}}>{item.rating}</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', height: '3.6em', overflow: 'hidden' }}>{item.description}</p>
                </Link>

                {/* Weight Selector */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                    {['250g', '500g', '1kg'].map((w) => (
                        <button
                            key={w}
                            disabled={item.inStock === false}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedWeight(w);
                            }}
                            style={{
                                flex: 1,
                                padding: '6px 0',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                borderRadius: '6px',
                                border: '1px solid',
                                borderColor: selectedWeight === w ? 'var(--primary)' : '#eee',
                                background: selectedWeight === w ? 'var(--primary)' : 'white',
                                color: selectedWeight === w ? 'white' : 'var(--text-dark)',
                                cursor: item.inStock === false ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                                opacity: item.inStock === false ? 0.5 : 1
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                <div className="product-price" style={{ marginBottom: '1.5rem', opacity: item.inStock === false ? 0.6 : 1 }}>
                    <span style={{ fontSize: '1.4rem' }}>₹{calculatePrice()}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>/ {selectedWeight}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '400', display: 'block' }}>Incl. all taxes</span>
                </div>

                <button
                    className="add-btn"
                    disabled={item.inStock === false}
                    onClick={() => addToCart({ ...item, price: calculatePrice(), unit: selectedWeight })}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        background: item.inStock === false ? '#eee' : 'var(--primary)',
                        color: item.inStock === false ? '#999' : 'white',
                        cursor: item.inStock === false ? 'default' : 'pointer',
                        border: 'none'
                    }}
                >
                    {item.inStock === false ? <AlertCircle size={18} /> : <ShoppingBag size={18} />}
                    {item.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </motion.div>
    );
};

export default Menu;
