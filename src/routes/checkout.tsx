import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useCartLines, cart } from '../lib/cart';

export default function Checkout() {
  const navigate = useNavigate();
  const { lines, subtotal } = useCartLines();
  const shipping = lines.length > 0 ? 60 : 0;
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-12 rounded-[2rem] border border-border bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">Checkout</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Complete your warm food order</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">Review your items, confirm delivery details, and place your order with care.</p>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-[2rem] border border-border bg-surface p-14 text-center shadow-soft">
          <p className="text-lg font-semibold text-brown">No items ready for checkout</p>
          <p className="mt-3 text-sm text-text-muted">Add premium sweets, pickles, and podis to your cart before proceeding.</p>
          <button onClick={() => navigate('/shop')} className="mt-6 inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-terracotta">
            Browse products
          </button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[0.7fr_0.45fr]">
          <form className="space-y-6 rounded-[2rem] border border-border bg-white p-8 shadow-soft">
            <div>
              <label className="text-sm font-medium text-brown">Name</label>
              <input type="text" placeholder="Full name" className="mt-3 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-sm text-brown outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-brown">Shipping address</label>
              <textarea rows={4} placeholder="Street, city, pin code, state" className="mt-3 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-sm text-brown outline-none"></textarea>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-brown">Phone</label>
                <input type="tel" placeholder="Mobile number" className="mt-3 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-sm text-brown outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-brown">Email</label>
                <input type="email" placeholder="Email address" className="mt-3 w-full rounded-3xl border border-border bg-surface px-5 py-4 text-sm text-brown outline-none" />
              </div>
            </div>
            <div className="rounded-[2rem] border border-border bg-sand p-6 text-sm text-text-muted">
              <p className="font-semibold text-brown">Payment method</p>
              <p className="mt-3">Cash on delivery and UPI payments are available at checkout.</p>
            </div>
          </form>

          <aside className="space-y-6 rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
            <div className="rounded-[2rem] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Order summary</p>
              <div className="mt-5 space-y-4">
                {lines.map((line) => (
                  <div key={line.key} className="flex items-center justify-between text-sm text-text-muted">
                    <div>
                      <p className="font-semibold text-brown">{line.product.name}</p>
                      <p>{line.qty} × {line.variant.name}</p>
                    </div>
                    <p>₹{line.lineTotal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-text-muted">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-lg font-semibold text-brown">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                cart.clear();
                navigate('/thank-you');
              }}
              className="w-full rounded-full bg-brown px-6 py-4 text-sm font-semibold text-ivory transition hover:bg-cocoa"
            >
              Place order
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
