import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Package, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gifting = () => {
    const giftTypes = [
        {
            title: "Heritage Box",
            desc: "A flagship hamper with handcrafted mithai, rich spices, and luxurious heritage packaging.",
            price: "₹1,499",
            image: "https://dadu.co.in/pub/media/catalog/product/cache/1684948a3181829e246995079a4918e9/a/s/assorted_mithai_box.jpg",
            badge: "Signature",
            icon: <Gift size={24} />,
            featured: true,
            meta: "Flagship gifting experience"
        },
        {
            title: "Festival Hamper",
            desc: "A premium seasonal collection of festive sweets, dry fruits and cultural delights.",
            price: "₹2,499",
            image: "https://dadu.co.in/pub/media/catalog/product/cache/1684948a3181829e246995079a4918e9/h/a/hamper_1.jpg",
            badge: "Festival",
            icon: <Star size={22} />,
            meta: "Perfect for Diwali, weddings and celebrations"
        },
        {
            title: "Personalized Mini Box",
            desc: "Choose four favorite treats in a refined box, hand-finished with golden accents.",
            price: "₹499",
            image: "https://dadu.co.in/pub/media/catalog/product/cache/1684948a3181829e246995079a4918e9/m/i/mini_box.jpg",
            badge: "Personalized",
            icon: <Package size={22} />,
            meta: "Ideal for intimate gifting and thank-you moments"
        }
    ];

    return (
        <div className="gifting-page">
            {/* Hero Section */}
            <section className="hero gifting-hero">
                <div className="hero-overlay"></div>
                <div className="hero-texture"></div>
                <div className="hero-glow hero-glow--top"></div>
                <div className="hero-glow hero-glow--bottom"></div>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <span className="hero-badge">Luxury handcrafted gifting</span>
                        <h1 className="gifting-hero-title serif">Luxury handcrafted gifting for meaningful celebrations</h1>
                        <p className="hero-subtitle">A premium collection of festive hampers, heritage sweets and elegant packaging designed for modern rituals and exquisite gifting moments.</p>
                        <div className="hero-actions">
                            <Link to="/menu" className="btn btn-primary">Discover Hampers</Link>
                            <Link to="/gifting" className="btn btn-outline">View Collections</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Collections */}
            <section className="container gifting-collections">
                <div className="section-header section-header--soft">
                    <span className="hero-tagline">Signature Editions</span>
                    <h2 className="serif">Premium gifting stories, curated for every celebration</h2>
                    <p className="section-note">Explore our handcrafted hampers that blend festive heritage, premium presentation and premium indulgence.</p>
                </div>

                <div className="product-grid" style={{ marginTop: '1rem' }}>
                    {giftTypes.map((gift, i) => (
                        <motion.article
                            key={gift.title}
                            className={`product-card ${gift.featured ? 'featured-card' : ''}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="product-card-media">
                                <img src={gift.image} alt={gift.title} />
                                <div className="product-card-tag">{gift.badge}</div>
                            </div>
                            <div className="product-card-body">
                                <div className="product-card-top">
                                    <span className="product-card-icon">{gift.icon}</span>
                                    <span className="product-card-meta">{gift.meta}</span>
                                </div>
                                <h3>{gift.title}</h3>
                                <p>{gift.desc}</p>
                                <div className="product-card-info">
                                    <span className="product-card-price">{gift.price}</span>
                                    <span className="product-card-note">Hand-finished gift packaging with golden details.</span>
                                </div>
                                <Link to="/menu" className="product-card-cta">Customize & Order</Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Corporate Gifting */}
            <section className="corporate-section">
                <div className="container corporate-wrapper">
                    <div className="corporate-panel">
                        <motion.div
                            className="corporate-copy"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="hero-badge hero-badge--light">Concierge gifting for business and ritual</span>
                            <h2 className="serif">A Premium concierge approach to corporate and bulk gifting</h2>
                            <p>Experience elegant business gifting designed with heritage luxury packaging, personalized branding and thoughtful support for every festive order.</p>
                        </motion.div>

                        <motion.div
                            className="corporate-features"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <div className="feature-card">
                                <Gift size={20} />
                                <div>
                                    <h4>Corporate Gifting</h4>
                                    <p>Branded hampers and luxury partner gifts for premium business relationships.</p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <Heart size={20} />
                                <div>
                                    <h4>Wedding Gifting</h4>
                                    <p>Curated boxes for wedding guests, family rituals and special celebrations.</p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <Package size={20} />
                                <div>
                                    <h4>Festive Bulk Orders</h4>
                                    <p>Elegant order management, bulk shipping and climate-safe packaging.</p>
                                </div>
                            </div>
                            <div className="feature-card">
                                <Star size={20} />
                                <div>
                                    <h4>Personalized Packaging</h4>
                                    <p>Hand-finished details, custom notes and golden foil embellishments.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="corporate-action"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <p>Our concierge team will help you engineer each gift to feel warm, premium and beautifully presented.</p>
                            <Link to="/menu" className="btn btn-primary">Book a Consultation</Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gifting;
