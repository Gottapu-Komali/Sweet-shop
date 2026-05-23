import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Award, Users, Phone, Clock, Utensils, Star, Mail } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero" style={{ height: '500px', position: 'relative' }}>
                <div className="hero-overlay" style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))' }}></div>
                <img
                    src="https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1600&auto=format&fit=crop"
                    alt="Traditional Sweet Making"
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-tagline"
                    >
                        Since Generations
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="serif"
                        style={{ fontSize: '5rem', color: 'white', marginBottom: '1rem' }}
                    >
                        Seethaiah <span className="text-gold">Home Foods</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '1.2rem' }}
                    >
                        Crafting authentic Indian delicacies with love, purity, and tradition in the heart of Kaikalur.
                    </motion.p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="container" style={{ padding: '8rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center' }}>
                    {/* Left: Story Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="hero-tagline" style={{ color: 'var(--primary)', marginBottom: '1.2rem', display: 'block' }}>Our Heritage</span>
                        <h2 className="serif" style={{ fontSize: '3.8rem', lineHeight: '1.1', marginBottom: '2rem' }}>
                            Rooted in <span className="text-gold">Tradition</span>
                        </h2>

                        {/* Decorative Quote */}
                        <div style={{
                            borderLeft: '4px solid var(--secondary)',
                            paddingLeft: '1.5rem',
                            marginBottom: '2.5rem',
                            background: 'var(--bg-cream)',
                            padding: '1.5rem 1.5rem 1.5rem 2rem',
                            borderRadius: '0 16px 16px 0'
                        }}>
                            <p className="serif" style={{ fontSize: '1.25rem', color: 'var(--primary)', lineHeight: '1.7', margin: 0 }}>
                                "Every sweet here is prepared with care using time-tested recipes and the finest ingredients — just like it's been done for generations."
                            </p>
                        </div>

                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                            Located near the iconic <strong style={{ color: 'var(--text-dark)' }}>Gandhi Bomma Center</strong> in Kaikalur, Seethaiah Home Foods has been a cornerstone of the local community. We specialize in bringing the authentic taste of traditional Indian sweets and freshly baked goods straight to your table.
                        </p>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '3rem' }}>
                            Our journey began with a simple mission: to preserve time-honored recipes while maintaining the highest standards of hygiene and quality. Today, we are the most trusted name in Kaikalur for festivals, celebrations, and everyday indulgences.
                        </p>

                        {/* Trust Badges */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { icon: '🫙', label: 'Pure Desi Ghee', sub: 'No shortcuts, ever' },
                                { icon: '👨‍🍳', label: 'Family Recipes', sub: 'Passed down for generations' },
                                { icon: '🌅', label: 'Fresh Daily', sub: 'Made every morning' },
                                { icon: '🤲', label: 'Handcrafted', sub: 'With love & care' },
                            ].map((badge, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem 1.2rem',
                                    background: 'var(--bg-cream)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(212,175,55,0.2)'
                                }}>
                                    <span style={{ fontSize: '1.8rem' }}>{badge.icon}</span>
                                    <div>
                                        <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary)', margin: 0 }}>{badge.label}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{badge.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image with overlay */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            height: '580px',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(128,0,0,0.12)'
                        }}>
                            <img
                                src="https://goma.co.in/uploads/blogs/cd2e067a2ef533442f6eaa2301602616.jpg"
                                alt="Sweets Display"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Dark gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                                borderRadius: '40px'
                            }}></div>
                        </div>

                        {/* Floating label at bottom */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2.5rem',
                            left: '2rem',
                            right: '2rem',
                            background: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '20px',
                            padding: '1.5rem 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(212,175,55,0.3)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            <div>
                                <p style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--primary)', margin: 0 }}>Seethaiah Home Foods</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>📍 Kaikalur, Andhra Pradesh</p>
                            </div>
                            <div style={{
                                background: '#e8f5e9',
                                color: '#2e7d32',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '700'
                            }}>
                                ✓ Trusted Since Day One
                            </div>
                        </div>

                        {/* Decorative gold circle */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'var(--gold-gradient)',
                            opacity: 0.15,
                            zIndex: -1
                        }}></div>
                    </motion.div>
                </div>
            </section>

            {/* Excellence Banner */}
            <section style={{ background: 'var(--primary)', padding: '6rem 0', color: 'white' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <Clock size={40} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
                        <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>24/7</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Always Open</p>
                    </div>
                    <div>
                        <Star size={40} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
                        <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>4.2/5</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Guest Rating</p>
                    </div>
                    <div>
                        <Utensils size={40} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
                        <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>50+</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Varieties</p>
                    </div>
                    <div>
                        <Heart size={40} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
                        <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pure</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Desi Ghee Only</p>
                    </div>
                </div>
            </section>

            {/* Specialities Section */}
            <section className="container" style={{ padding: '8rem 2rem' }}>
                <div className="section-header">
                    <h2 className="serif" style={{ fontSize: '3.5rem' }}>Our Master <span className="text-gold">Bakery</span></h2>
                    <div className="ornament"></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                    {[
                        { title: 'Bengali Sweets', desc: 'Exquisite Rasgulla and Sandesh crafted by master artisans.', img: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=600&auto=format' },
                        { title: 'Custom Cakes', desc: 'Premium cakes for birthdays and anniversaries made to order.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format' },
                        { title: 'Signature Ladoos', desc: 'Melt-in-mouth Motichoor and Besan ladoos made with pure ghee.', img: 'https://images.unsplash.com/photo-1605192554106-d549b1b975cd?q=80&w=600&auto=format' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="product-card"
                            style={{ overflow: 'hidden' }}
                        >
                            <div style={{ height: '300px' }}>
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2rem', textAlign: 'center' }}>
                                <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact & Map Section */}
            <section style={{ padding: '8rem 0', background: 'var(--bg-cream)' }}>
                <div className="container">
                    <div className="product-card" style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', background: 'white' }}>
                        <div>
                            <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Visit Our <span className="text-gold">Home</span></h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'var(--bg-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Our Location</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                            Near Gandhi Bomma Center, PP Road,<br />
                                            Kaikalur, Andhra Pradesh - 521333
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'var(--bg-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Call Us</h4>
                                        <a href="https://wa.me/919951734437" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '700', textDecoration: 'none' }}>+91 9951734437</a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'var(--bg-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Store Hours</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Open 24 Hours, 7 Days a Week</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'var(--bg-cream)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Email Us</h4>
                                        <a href="mailto:gsekhar437@gmail.com" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '700', textDecoration: 'none' }}>gsekhar437@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '450px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                            {/* Mock Map with luxury feel */}
                            <img
                                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                                alt="Map Location"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5)' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(128,0,0,0.1)', pointerEvents: 'none' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
