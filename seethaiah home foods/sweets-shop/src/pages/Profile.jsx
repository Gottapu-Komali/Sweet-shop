import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Star, Edit2, CheckCircle, Phone, Home, Building, Navigation, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputCls = {
  width: '100%',
  padding: '0.8rem 1rem 0.8rem 2.8rem',
  borderRadius: '10px',
  border: '1.5px solid #e0e0e0',
  outline: 'none',
  fontSize: '0.92rem',
  background: '#FFFBF5',
  color: '#1A1A1A',
  transition: 'border-color 0.2s',
};

function Field({ icon: Icon, label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#800000', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }} />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputCls}
          onFocus={e => e.target.style.borderColor = '#D4AF37'}
          onBlur={e => e.target.style.borderColor = '#e0e0e0'}
        />
      </div>
    </div>
  );
}

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });

  // Populate form from user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        pincode: user.address?.pincode || '',
        landmark: user.address?.landmark || '',
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '4rem 2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #800000, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(128,0,0,0.25)' }}>
          <User size={36} color="white" />
        </div>
        <h2 className="serif" style={{ fontSize: '2.2rem', color: 'var(--primary)' }}>Please Log In</h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px' }}>Sign in to view and manage your profile.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ padding: '1rem 3rem' }}>Sign In / Sign Up</button>
      </div>
    );
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: {
        street: form.street.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        landmark: form.landmark.trim(),
      },
    });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const initials = user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const hasAddress = user.address?.city || user.address?.street;

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { id: 'profile', label: 'My Details', icon: <User size={18} /> },
    { id: 'address', label: 'Address', icon: <MapPin size={18} /> },
  ];

  return (
    <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>

      {/* ── Top Profile Card ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="product-card"
        style={{ padding: '2.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%', flexShrink: 0,
          background: user.picture ? 'transparent' : 'linear-gradient(135deg, #800000, #D4AF37)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(128,0,0,0.25)',
          fontSize: '2rem', fontWeight: '700', color: 'white',
          overflow: 'hidden',
        }}>
          {user.picture ? <img src={user.picture} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="serif" style={{ fontSize: '1.9rem', color: 'var(--primary)', marginBottom: '0.3rem' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{user.email}</p>
          {user.phone && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📞 {user.phone}</p>}
          {hasAddress && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              📍 {[user.address.street, user.address.city, user.address.state, user.address.pincode].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
        <button className="btn btn-primary" onClick={() => { setActiveTab('profile'); setEditMode(true); }} style={{ padding: '0.75rem 1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Edit2 size={16} /> Edit Profile
        </button>
      </motion.div>

      {/* ── Saved Toast ── */}
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '12px', padding: '14px 20px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#2e7d32', fontWeight: '600' }}>
            <CheckCircle size={20} /> Profile saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem' }}>

        {/* ── Sidebar Nav ── */}
        <div>
          <div className="product-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditMode(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '0.9rem 1rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #800000, #A00000)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                    fontWeight: '600', fontSize: '0.9rem',
                    transition: 'all 0.2s',
                  }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
              <div style={{ height: '1px', background: '#eee', margin: '0.5rem 0' }} />
              <button onClick={() => { logout(); navigate('/'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.9rem 1rem', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#e53935', fontWeight: '600', fontSize: '0.9rem' }}>
                <LogOut size={18} /> Log Out
              </button>
            </nav>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Orders', value: '0', icon: <Package size={18} color="#D4AF37" /> },
              { label: 'Reward Points', value: '0', icon: <Star size={18} color="#D4AF37" /> },
            ].map((s, i) => (
              <div key={i} className="product-card" style={{ padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {s.icon}
                <div>
                  <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div>

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>My <span className="text-gold">Orders</span></h3>
              <div className="product-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <Package size={52} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>No orders yet</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't placed any orders. Start exploring our menu!</p>
                <button className="btn btn-primary" onClick={() => navigate('/menu')} style={{ padding: '0.85rem 2.5rem' }}>Browse Menu</button>
              </div>
            </motion.div>
          )}

          {/* PROFILE DETAILS TAB */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--primary)' }}>Personal <span className="text-gold">Details</span></h3>
                {!editMode && (
                  <button onClick={() => setEditMode(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <Edit2 size={15} /> Edit
                  </button>
                )}
              </div>

              <div className="product-card" style={{ padding: '2rem' }}>
                {!editMode ? (
                  /* ── View Mode ── */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {[
                      { label: 'Full Name', value: user.name, icon: '👤' },
                      { label: 'Email', value: user.email, icon: '📧' },
                      { label: 'Phone', value: user.phone || '—', icon: '📞' },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', flexDirection: 'column', padding: '1rem', background: '#FFFBF5', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.15)' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#800000', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>{row.icon} {row.label}</span>
                        <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1A1A1A' }}>{row.value}</span>
                      </div>
                    ))}
                    {!user.phone && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem', background: 'rgba(212,175,55,0.06)', borderRadius: '10px' }}>
                        💡 Add your phone number and address for faster checkout!
                      </p>
                    )}
                  </div>
                ) : (
                  /* ── Edit Mode ── */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <Field icon={User} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                    <Field icon={Phone} label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" type="tel" />
                    <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
                      <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1, padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <CheckCircle size={17} /> Save Changes
                      </button>
                      <button onClick={() => setEditMode(false)} style={{ flex: 1, padding: '0.9rem', background: '#f5f5f5', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: '600', color: '#555' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ADDRESS TAB */}
          {activeTab === 'address' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--primary)' }}>Delivery <span className="text-gold">Address</span></h3>
                {!editMode && (
                  <button onClick={() => setEditMode(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <Edit2 size={15} /> {hasAddress ? 'Edit' : 'Add Address'}
                  </button>
                )}
              </div>

              <div className="product-card" style={{ padding: '2rem' }}>
                {!editMode ? (
                  hasAddress ? (
                    /* ── View Address ── */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <div style={{ background: 'linear-gradient(135deg, rgba(128,0,0,0.04), rgba(212,175,55,0.08))', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#800000,#D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Home size={18} color="white" />
                          </div>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px', color: '#1A1A1A' }}>{user.name}</p>
                            {user.address.street && <p style={{ color: '#555', fontSize: '0.9rem' }}>{user.address.street}</p>}
                            {user.address.landmark && <p style={{ color: '#777', fontSize: '0.85rem' }}>Near: {user.address.landmark}</p>}
                            <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '2px' }}>
                              {[user.address.city, user.address.state, user.address.pincode].filter(Boolean).join(', ')}
                            </p>
                            {user.phone && <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '4px' }}>📞 {user.phone}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── No Address ── */
                    <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                      <MapPin size={52} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>No address saved yet</h4>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Add your delivery address for faster, smoother checkout.</p>
                      <button className="btn btn-primary" onClick={() => setEditMode(true)} style={{ padding: '0.85rem 2rem' }}>+ Add Address</button>
                    </div>
                  )
                ) : (
                  /* ── Edit Address ── */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <Field icon={Home} label="Street / House No." name="street" value={form.street} onChange={handleChange} placeholder="e.g. 12-34, MG Road" />
                    <Field icon={Navigation} label="Landmark (optional)" name="landmark" value={form.landmark} onChange={handleChange} placeholder="Near SBI Bank, Opp. Temple..." />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <Field icon={Building} label="City / Town" name="city" value={form.city} onChange={handleChange} placeholder="Kaikalur" />
                      <Field icon={Hash} label="PIN Code" name="pincode" value={form.pincode} onChange={handleChange} placeholder="521333" type="text" />
                    </div>
                    <Field icon={MapPin} label="State" name="state" value={form.state} onChange={handleChange} placeholder="Andhra Pradesh" />
                    <div style={{ display: 'flex', gap: '12px', marginTop: '0.8rem' }}>
                      <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1, padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <CheckCircle size={17} /> Save Address
                      </button>
                      <button onClick={() => setEditMode(false)} style={{ flex: 1, padding: '0.9rem', background: '#f5f5f5', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: '600', color: '#555' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Responsive fix for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
