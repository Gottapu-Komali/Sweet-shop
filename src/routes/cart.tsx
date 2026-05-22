import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useCartLines, cart } from '../lib/cart';

export default function Cart() {
  const { lines, subtotal, count } = useCartLines();
  const total = useMemo(() => subtotal + 60, [subtotal]);
  const shippingText = subtotal > 0 ? 'Standard shipping included' : 'Add items to see checkout details.';

  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-12 rounded-[2rem] border border-border bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">Your cart</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Review your selections</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">{count} item{count === 1 ? '' : 's'} added. Ready for a warm, premium checkout.</p>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-[2rem] border border-border bg-surface p-14 text-center shadow-soft">
          <p className="text-lg font-semibold text-brown">Your cart is empty</p>
          <p className="mt-3 text-sm text-text-muted">Browse our collection to add fresh sweets, savories, and pickles.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-terracotta">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            {lines.map((line) => (
              <div key={line.key} className="rounded-[2rem] border border-border bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate">{line.product.category.replace('-', ' ')}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-brown">{line.product.name}</h2>
                    <p className="mt-2 text-sm text-text-muted">{line.variant.name} • ₹{line.variant.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => cart.setQty(line.product.id, line.variant.id, line.qty - 1)}
                      className="rounded-full border border-border bg-surface px-3 py-2 text-sm"
                    >
                      –
                    </button>
                    <span className="text-sm font-semibold text-brown">{line.qty}</span>
                    <button
                      onClick={() => cart.setQty(line.product.id, line.variant.id, line.qty + 1)}
                      className="rounded-full border border-border bg-surface px-3 py-2 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
                  <p>Line total: ₹{line.lineTotal}</p>
                  <button
                    onClick={() => cart.remove(line.product.id, line.variant.id)}
                    className="text-terracotta hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Order summary</p>
              <p className="mt-4 text-sm text-text-muted">{shippingText}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-6">
              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-text-muted">
                <span>Shipping</span>
                <span>₹60</span>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-6 text-xl font-semibold text-brown">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="inline-flex w-full items-center justify-center rounded-full bg-brown px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-cocoa"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
