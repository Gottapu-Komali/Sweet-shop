/* src/components/SiteFooter.tsx */
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ivory py-16 text-brown">
      <div className="container-max mx-auto grid gap-10 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate">Seethaiah Home Foods</p>
          <h2 className="mt-3 text-2xl font-display text-brown">Crafted in small batches with love, patience, and tradition.</h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-muted">
            A warm Andhra home-food kitchen reimagined for modern celebrations, trusted by families who love authentic taste.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg text-brown">Quick links</h3>
          <ul className="mt-5 space-y-3 text-sm text-text-muted">
            <li><Link to="/" className="transition hover:text-brown">Home</Link></li>
            <li><Link to="/shop" className="transition hover:text-brown">Shop</Link></li>
            <li><Link to="/categories" className="transition hover:text-brown">Categories</Link></li>
            <li><Link to="/about" className="transition hover:text-brown">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-brown">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-text-muted">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> hello@seethaiah.in</li>
            <li className="text-sm leading-6">Kitchen address available on request for bulk festival orders.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-brown">Delivery</h3>
          <p className="mt-5 text-sm leading-7 text-text-muted">
            Nationwide delivery with fresh dispatch and gentle premium packaging for sweets, savories, and pickles.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-brown">
            <span className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-white px-3">IG</span>
            <span className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-white px-3">FB</span>
            <span className="inline-flex h-10 items-center justify-center rounded-2xl border border-border bg-white px-3">WA</span>
          </div>
        </div>
      </div>
      <div className="container-max mx-auto mt-12 border-t border-border pt-6 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} Seethaiah Home Foods. All rights reserved.
      </div>
    </footer>
  );
}
