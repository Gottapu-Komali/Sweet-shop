import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width: '100%',
  padding: '0.95rem 1rem 0.95rem 3rem',
  borderRadius: 'var(--radius-sm)',
  border: '1.5px solid #e0e0e0',
  outline: 'none',
  fontSize: '0.95rem',
  color: '#1A1A1A',
  background: '#FFFBF5',
  transition: 'border-color 0.2s',
};

function FloatingInput({ icon: Icon, type, placeholder, value, onChange, error, rightEl }) {
  return (
    <div style={{ position: 'relative' }}>
      <Icon size={18} style={{
        position: 'absolute', left: '15px', top: '50%',
        transform: 'translateY(-50%)', color: error ? '#c0392b' : 'var(--primary)',
        pointerEvents: 'none',
      }} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...inputStyle,
          borderColor: error ? '#c0392b' : value ? 'var(--secondary)' : '#e0e0e0',
          paddingRight: rightEl ? '3rem' : '1rem',
        }}
        onFocus={(e) => { e.target.style.borderColor = error ? '#c0392b' : 'var(--secondary)'; }}
        onBlur={(e) => { e.target.style.borderColor = error ? '#c0392b' : value ? 'var(--secondary)' : '#e0e0e0'; }}
      />
      {rightEl && (
        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
          {rightEl}
        </div>
      )}
      {error && (
        <p style={{ color: '#c0392b', fontSize: '0.78rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

const Login = () => {
  const { login, signup, googleLogin } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Initialise Google Identity Services once the SDK loads
  useEffect(() => {
    function initGoogle() {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        // ⚠️  Replace with your real Google Client ID from console.cloud.google.com
        client_id: '354748181591-cakr8m9iu6kl9d88tivdfn2p3e3aibfk.apps.googleusercontent.com',
        callback: (credentialResponse) => {
          const result = googleLogin(credentialResponse);
          if (result.ok) {
            setSuccess('Signed in with Google! Redirecting...');
            setTimeout(() => navigate('/profile'), 1000);
          } else {
            setServerError(result.error);
          }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleBtnRef.current.offsetWidth || 340,
        text: isLogin ? 'signin_with' : 'signup_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      });
    }

    // SDK may already be loaded or still loading
    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) { clearInterval(interval); initGoogle(); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isLogin]); // re-render button when mode switches

  function set(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: '' }));
      setServerError('');
    };
  }

  function validate() {
    const errs = {};
    if (!isLogin && !form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (!isLogin && form.password.length < 6) errs.password = 'Minimum 6 characters.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Small delay for UX feel
    setTimeout(() => {
      const result = isLogin
        ? login(form.email, form.password)
        : signup(form.name, form.email, form.password);

      setLoading(false);
      if (result.ok) {
        setSuccess(isLogin ? 'Welcome back! Redirecting...' : 'Account created! Redirecting...');
        setTimeout(() => navigate('/profile'), 1200);
      } else {
        setServerError(result.error);
      }
    }, 600);
  }

  function switchMode() {
    setIsLogin((v) => !v);
    setForm({ name: '', email: '', password: '' });
    setErrors({});
    setServerError('');
    setSuccess('');
    setShowPw(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(rgba(80,0,0,0.82), rgba(80,0,0,0.82)), url("https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1600&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="product-card"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.3)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #800000, #D4AF37)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.2rem',
            boxShadow: '0 8px 20px rgba(128,0,0,0.3)',
          }}>
            <User size={26} color="white" />
          </div>
          <h2 className="serif" style={{ fontSize: '2.2rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>
            {isLogin ? 'Welcome Back' : 'Join the Family'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isLogin ? 'Sign in to access your account' : 'Create an account for exclusive rewards'}
          </p>
        </div>

        {/* Success Banner */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '10px',
                padding: '12px 16px', marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#2e7d32', fontSize: '0.9rem', fontWeight: '600',
              }}
            >
              <CheckCircle size={18} /> {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Server Error */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                background: '#fdecea', border: '1px solid #f5c6cb', borderRadius: '10px',
                padding: '12px 16px', marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#c0392b', fontSize: '0.9rem', fontWeight: '600',
              }}
            >
              <AlertCircle size={18} /> {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} noValidate>
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}
              >
                <FloatingInput
                  icon={User} type="text" placeholder="Full Name"
                  value={form.name} onChange={set('name')} error={errors.name}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingInput
            icon={Mail} type="email" placeholder="Email Address"
            value={form.email} onChange={set('email')} error={errors.email}
          />

          <FloatingInput
            icon={Lock}
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            rightEl={
              <button type="button" onClick={() => setShowPw((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', display: 'flex' }}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            }
          />

          {isLogin && (
            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
              <a href="#" style={{ fontSize: '0.82rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                Forgot Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%', padding: '1rem', marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '18px', height: '18px', border: '2px solid rgba(128,0,0,0.3)',
                  borderTopColor: '#800000', borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite', display: 'inline-block',
                }} />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ margin: '1.8rem 0 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#eee' }} />
          <span style={{ fontSize: '0.8rem', color: '#bbb', fontWeight: '600' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#eee' }} />
        </div>

        {/* Google Sign-In Button */}
        <div
          ref={googleBtnRef}
          id="google-signin-btn"
          style={{ width: '100%', marginBottom: '1.2rem', minHeight: '44px' }}
        />
        {/* Fallback if GSI hasn't loaded */}
        <noscript>
          <p style={{ color: '#999', fontSize: '0.8rem', textAlign: 'center' }}>Enable JavaScript for Google Sign-In</p>
        </noscript>

        {/* Switch mode */}
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={switchMode} style={{
            background: 'none', border: 'none', color: 'var(--primary)',
            fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem',
          }}>
            {isLogin ? 'Sign Up Free' : 'Log In'}
          </button>
        </p>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </div>
  );
};

export default Login;
