/* src/components/SiteHeader.tsx */
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { CartBadge } from './CartBadge';
import { Menu as MenuIcon, X as XIcon, ShoppingCart, Search } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur-xl">
      <div className="container-max mx-auto flex items-center gap-4 px-4 py-4 lg:px-0">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron text-sm font-semibold uppercase tracking-[0.3em] text-ivory shadow-soft">SH</span>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate">Seethaiah Home Foods</p>
            <p className="mt-1 text-xl font-display text-brown">Authentic Andhra Kitchen</p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center gap-3 rounded-full border border-border bg-white px-4 py-2 shadow-sm md:flex">
          <Search className="h-4 w-4 text-slate" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sweets, pickles, podis..."
            className="w-full bg-transparent text-sm text-brown placeholder:text-slate outline-none"
          />
        </div>

        <nav className="hidden flex-1 items-center justify-end gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-brown' : 'text-slate hover:text-brown'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative inline-flex items-center justify-center rounded-2xl border border-border bg-white p-3 text-brown shadow-sm transition hover:bg-saffron/10">
            <ShoppingCart className="h-5 w-5" />
            <CartBadge />
          </Link>

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-brown shadow-sm md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-ivory px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-saffron/10 text-brown' : 'text-slate hover:bg-sand'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
