import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cart } from '../lib/cart';
import { catalog } from '../lib/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedWeight, setSelectedWeight] = useState('500g');

  const product = useMemo(() => catalog.find((item) => item.id === id), [id]);
  const variant = product?.variants.find((variant) => variant.weight === selectedWeight) ?? product?.variants[0];
  const related = catalog.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 3);

  if (!product) {
    return (
      <section className="container-max mx-auto py-24 px-4 text-center">
        <h1 className="text-4xl font-display text-brown">Product not found</h1>
        <p className="mt-4 text-text-muted">Please return to the shop and choose a different handcrafted item.</p>
      </section>
    );
  }

  const addToCart = () => {
    if (variant) cart.add(product.id, variant.id, 1);
  };

  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 rounded-[2rem] border border-border bg-white p-6 shadow-soft">
          <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-sand via-cream to-ivory p-6">
            <div className="h-[420px] rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(217,145,40,0.2),_transparent_45%)] p-8">
              <div className="h-full rounded-[1.75rem] border border-border bg-white/90 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate">Product gallery</p>
                <div className="mt-10 flex h-full items-center justify-center text-5xl font-semibold text-brown">{product.name.split(' ').map((word) => word[0]).join('')}</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.variants.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedWeight(option.weight)}
                className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${selectedWeight === option.weight ? 'border-saffron bg-saffron/10 text-brown' : 'border-border bg-surface text-text-muted hover:bg-sand'}`}
              >
                {option.weight}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.35em] text-slate">Premium Andhra specialty</p>
            <h1 className="mt-4 text-4xl font-display text-brown">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-text-muted">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {product.features.map((feature) => (
                <span key={feature} className="badge-pill bg-saffron text-ivory">{feature}</span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-surface p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-slate">Price</p>
                <p className="mt-2 text-2xl font-semibold text-brown">₹{variant?.price}</p>
              </div>
              <div className="rounded-3xl bg-surface p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-slate">Shelf life</p>
                <p className="mt-2 text-base font-semibold text-brown">{product.shelfLife}</p>
              </div>
              <div className="rounded-3xl bg-surface p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-slate">Ingredients</p>
                <p className="mt-2 text-base font-semibold text-brown">{product.ingredients.slice(0, 3).join(', ')}...</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button onClick={addToCart} className="rounded-full bg-brown px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-cocoa">Add to cart</button>
              <button onClick={() => navigate('/checkout')} className="rounded-full border border-brown bg-white px-6 py-3 text-sm font-semibold text-brown transition hover:bg-sand">Buy now</button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-slate">Ingredients</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-text-muted">
                {product.ingredients.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-slate">Storage</p>
              <p className="mt-4 text-sm leading-7 text-text-muted">{product.storage}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-display text-brown">Customer reviews</h2>
            <p className="mt-4 text-sm text-text-muted">Our customers love the nostalgia of Andhra flavors and the care in every batch.</p>
            <div className="mt-6 space-y-4">
              {[
                { name: 'Priya R.', rating: '5.0', note: 'The sweetness and texture were perfect, just like home.' },
                { name: 'Anand M.', rating: '4.8', note: 'Beautiful flavors and packaging. Fresh taste arrived right on time.' },
              ].map((review) => (
                <div key={review.name} className="rounded-3xl bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-brown">{review.name}</p>
                    <span className="text-sm text-text-muted">{review.rating}</span>
                  </div>
                  <p className="mt-3 text-sm text-text-muted">{review.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 rounded-[2rem] border border-border bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-display text-brown">Related products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <button onClick={() => navigate(`/product/${item.id}`)} key={item.id} className="rounded-[2rem] border border-border bg-surface p-5 text-left transition hover:border-saffron hover:bg-cream">
              <p className="text-sm uppercase tracking-[0.35em] text-slate">{item.category.replace('-', ' ')}</p>
              <h3 className="mt-3 text-xl font-semibold text-brown">{item.name}</h3>
              <p className="mt-3 text-sm text-text-muted">{item.shortDescription}</p>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
