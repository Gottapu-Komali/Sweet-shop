import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { cart } from '../lib/cart';
import type { Product } from '../lib/products';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const handleAdd = () => {
    const variant = product.variants[0];
    cart.add(product.id, variant.id, 1);
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="group rounded-[2rem] border border-border bg-surface shadow-soft overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gradient-to-br from-sand via-cream to-ivory transition duration-500 group-hover:scale-[1.01] sm:hover:scale-[1.01]">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,145,40,0.22),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02))]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="rounded-[1.75rem] border border-border bg-white/80 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.35em] text-slate">Product Image</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-cream px-2.5 py-1 text-brown">{tag}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-brown">{product.name}</h3>
          <span className="text-sm font-semibold text-brown">₹{product.variants[0].price}</span>
        </div>
        <p className="mt-3 text-sm leading-7 text-text-muted">{product.shortDescription}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="badge-pill bg-saffron text-ivory">Selected: 500g</span>
          <span className="badge-pill bg-sand text-brown">{product.variants[0].weight}</span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-full bg-brown px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-cocoa">
            <Plus className="h-4 w-4" /> Add
          </button>
          <Link to={`/product/${product.id}`} className="text-sm font-medium text-terracotta transition hover:text-brown">
            View
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
