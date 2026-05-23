import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email, phone, picture, address, provider }
  const [loading, setLoading] = useState(true);

  // Rehydrate session on page reload
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shf_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  }, []);

  /** Register a new account. Returns { ok, error } */
  function signup(name, email, password) {
    if (!name.trim() || !email.trim() || !password.trim())
      return { ok: false, error: 'All fields are required.' };
    if (password.length < 6)
      return { ok: false, error: 'Password must be at least 6 characters.' };

    const accounts = JSON.parse(localStorage.getItem('shf_accounts') || '{}');
    if (accounts[email.toLowerCase()])
      return { ok: false, error: 'An account with this email already exists.' };

    accounts[email.toLowerCase()] = { name: name.trim(), password, phone: '', address: {} };
    localStorage.setItem('shf_accounts', JSON.stringify(accounts));

    const profile = { name: name.trim(), email: email.toLowerCase(), phone: '', address: {} };
    localStorage.setItem('shf_user', JSON.stringify(profile));
    setUser(profile);
    return { ok: true };
  }

  /** Log in an existing account. Returns { ok, error } */
  function login(email, password) {
    if (!email.trim() || !password.trim())
      return { ok: false, error: 'Please enter your email and password.' };

    const accounts = JSON.parse(localStorage.getItem('shf_accounts') || '{}');
    const account = accounts[email.toLowerCase()];

    if (!account || account.password !== password)
      return { ok: false, error: 'Incorrect email or password.' };

    const profile = {
      name: account.name,
      email: email.toLowerCase(),
      phone: account.phone || '',
      address: account.address || {},
    };
    localStorage.setItem('shf_user', JSON.stringify(profile));
    setUser(profile);
    return { ok: true };
  }

  /** Google Sign-In – decodes the JWT and stores the user session. */
  function googleLogin(credentialResponse) {
    try {
      const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      const { name, email, picture } = payload;

      const accounts = JSON.parse(localStorage.getItem('shf_accounts') || '{}');
      if (!accounts[email.toLowerCase()]) {
        accounts[email.toLowerCase()] = { name, password: null, picture, provider: 'google', phone: '', address: {} };
        localStorage.setItem('shf_accounts', JSON.stringify(accounts));
      }

      const existing = accounts[email.toLowerCase()];
      const profile = {
        name: existing.name || name,
        email: email.toLowerCase(),
        picture: existing.picture || picture,
        provider: 'google',
        phone: existing.phone || '',
        address: existing.address || {},
      };
      localStorage.setItem('shf_user', JSON.stringify(profile));
      setUser(profile);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Google sign-in failed. Please try again.' };
    }
  }

  /**
   * Update customer profile details (name, phone, address, etc.).
   * Merges with existing user data and persists to localStorage.
   */
  function updateProfile(updates) {
    if (!user) return { ok: false, error: 'Not logged in.' };

    const updated = { ...user, ...updates };
    localStorage.setItem('shf_user', JSON.stringify(updated));

    // Also sync to the accounts store
    try {
      const accounts = JSON.parse(localStorage.getItem('shf_accounts') || '{}');
      if (accounts[user.email]) {
        accounts[user.email] = { ...accounts[user.email], ...updates };
        localStorage.setItem('shf_accounts', JSON.stringify(accounts));
      }
    } catch (_) {}

    setUser(updated);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem('shf_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, googleLogin, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
