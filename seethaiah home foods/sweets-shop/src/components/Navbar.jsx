import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart, Package, List, MapPin, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount, hasActiveOrder } = useCart();
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        }

        function handleEsc(e) {
            if (e.key === 'Escape') setShowProfile(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Festival', path: '/festivals' },
        { name: 'Gifting', path: '/gifting' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
        <header className="main-header">
            <div className="container nav-container">
                <Link to="/" className="logo-section">
                    <div className="logo-text">SEETHAIAH<br/><span className="text-gold" style={{fontSize: '0.85rem', letterSpacing: '3px', fontWeight: '800'}}>HOME FOODS</span></div>
                </Link>

                <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="nav-actions">
                    <button className="icon-btn search-trigger" onClick={() => setSearchOpen(true)} aria-label="Open search">
                        <Search size={20} />
                    </button>

                    <div className="profile-wrap" ref={profileRef}>
                        <button className="icon-btn profile-btn" onClick={() => setShowProfile(s => !s)} aria-haspopup="true" aria-expanded={showProfile}>
                            <User size={20} />
                        </button>

                        {showProfile && (
                            <div className="dropdown-menu" role="menu">
                                <Link to="/profile" className="dropdown-item" onClick={() => setShowProfile(false)}><User size={16} className="item-icon"/> My Profile</Link>
                                <Link to="/wishlist" className="dropdown-item" onClick={() => setShowProfile(false)}><Heart size={16} className="item-icon"/> Wishlist</Link>
                                <Link to="/track-order" className="dropdown-item" onClick={() => setShowProfile(false)}><Package size={16} className="item-icon"/> Track Orders</Link>
                                <Link to="/orders" className="dropdown-item" onClick={() => setShowProfile(false)}><List size={16} className="item-icon"/> My Orders</Link>
                                <Link to="/profile#addresses" className="dropdown-item" onClick={() => setShowProfile(false)}><MapPin size={16} className="item-icon"/> Saved Addresses</Link>
                                <div className="dropdown-sep" />
                                <button className="dropdown-item" onClick={() => { setShowProfile(false); navigate('/login'); }}><LogOut size={16} className="item-icon"/> Logout</button>
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="icon-btn" aria-label="Cart">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </Link>

                    <button className="icon-btn mobile-toggle hide-desktop" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

                {searchOpen && (
                    <div className="search-overlay" onClick={(e) => e.currentTarget === e.target && setSearchOpen(false)}>
                        <div className="search-panel">
                            <div className="search-panel-header">
                                <div>
                                    <p className="search-panel-label">Search Seethaiah</p>
                                    <p className="search-panel-note">Find sweets, festival offers, gifts, and curated collections.</p>
                                </div>
                                <button className="icon-btn search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button>
                            </div>
                            <div className="search-input-wrapper">
                                <Search size={18} className="search-icon" />
                                <input
                                    className="search-input-panel"
                                    type="search"
                                    placeholder="Search for sweets, gifts or festivals"
                                    value={searchTerm}
                                    autoFocus
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && searchTerm.trim()) {
                                            navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
                                            setSearchOpen(false);
                                            setSearchTerm("");
                                        }
                                    }}
                                    aria-label="Search site"
                                />
                            </div>
                        </div>
                    </div>
                )}

            {/* Mobile Menu Overlay */}
                {isOpen && (
                <div className="mobile-menu">
                    <div className="mobile-drawer">
                        <div className="mobile-drawer-header">
                            <Link to="/" className="logo-section" onClick={() => setIsOpen(false)}>
                                <div className="logo-text">SEETHAIAH</div>
                            </Link>
                            <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close menu"><X size={20} /></button>
                        </div>

                        <div className="mobile-links">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.path} className="mobile-link" onClick={() => setIsOpen(false)}>{link.name}</Link>
                            ))}
                        </div>

                        <div className="mobile-profile">
                            <h4>Account</h4>
                            <Link to="/profile" className="mobile-link" onClick={() => setIsOpen(false)}>My Profile</Link>
                            <Link to="/wishlist" className="mobile-link" onClick={() => setIsOpen(false)}>Wishlist</Link>
                            <Link to="/track-order" className="mobile-link" onClick={() => setIsOpen(false)}>Track Orders</Link>
                            <Link to="/orders" className="mobile-link" onClick={() => { setIsOpen(false); navigate('/orders'); }}>My Orders</Link>
                            <Link to="/profile#addresses" className="mobile-link" onClick={() => setIsOpen(false)}>Saved Addresses</Link>
                            <button className="mobile-link" onClick={() => { setIsOpen(false); navigate('/login'); }}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </header>

        </>
    );
};

export default Navbar;
