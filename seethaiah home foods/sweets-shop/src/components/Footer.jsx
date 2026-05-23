import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-top-row">
                <div className="footer-col footer-brand">
                    <h2 className="footer-heading">SEETHAIAH</h2>
                    <p>Authentic Telugu sweets, savories & pickles, made the way grandmothers did — with patience, ghee and love.</p>
                    <div className="footer-social mt-4">
                        <a href="https://www.facebook.com/seethaiahhomefoods" target="_blank" rel="noopener noreferrer">
                            <Facebook />
                        </a>
                        <a href="https://www.instagram.com/seethaiahhomefoods" target="_blank" rel="noopener noreferrer">
                            <Instagram />
                        </a>
                        <a href="https://www.youtube.com/seethaiahhomefoods" target="_blank" rel="noopener noreferrer">
    <Youtube />
</a>
                    </div>
                </div>

                <div className="footer-col footer-links">
                    <h2 className="footer-heading">Quick Links</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Shop Menu</Link></li>
                        <li><Link to="/festivals">Festival Specials</Link></li>
                        <li><Link to="/gifting">Gifting</Link></li>
                        <li><Link to="/about">Our Story</Link></li>
                        <li><Link to="/track-order">Track Order</Link></li>
                    </ul>
                </div>

                <div className="footer-col footer-links">
                    <h2 className="footer-heading">Categories</h2>
                    <ul>
                        <li><Link to="/menu?cat=mithai">Traditional Mithai</Link></li>
                        <li><Link to="/menu?cat=gifts">Gift Boxes</Link></li>
                        <li><Link to="/menu?cat=dryfruits">Dry Fruit Sweets</Link></li>
                        <li><Link to="/menu?cat=halwa">Premium Halwa</Link></li>
                    </ul>
                </div>

                <div className="footer-col footer-links">
                    <h2 className="footer-heading">Contact Us</h2>
                    <ul>
                        <li><MapPin size={16} color="var(--secondary)"/> Gandhi Bomma Center, Kaikalur, AP</li>
                        <li><Phone size={16} color="var(--secondary)"/> <a href="https://wa.me/919951734437" target="_blank" rel="noopener noreferrer">+91 9951734437</a></li>
                        <li><Mail size={16} color="var(--secondary)"/> <a href="mailto:gsekhar437@gmail.com">gsekhar437@gmail.com</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Seethaiah Home Foods. All Rights Reserved. Crafted for tradition.</p>
            </div>
        </footer>
    );
};

export default Footer;
