import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(74,15,15,0.82)] via-[rgba(122,31,31,0.55)] to-[rgba(122,31,31,0.35)]" />
      <div className="absolute inset-0 bg-hero-glow opacity-90" />

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <div className="inline-flex rounded-full border border-cream/80 bg-cream/95 px-4 py-2 text-xs uppercase tracking-[0.35em] text-maroon-deep shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
          Authentic Andhra Home Foods
        </div>

        <h1 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-[-0.03em] text-ivory">
          Authentic Andhra Home Foods,
          <span className="block text-saffron">Made in Small Batches</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg leading-8 text-cream/90">
          Hand-rolled sweets, slow-fried savories, and heirloom Andhra pickles crafted with pure ghee, cold-pressed oils, and grandmother-grade patience.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/menu"
            className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-maroon-deep transition hover:bg-saffron"
          >
            Shop Bestsellers
          </Link>
          <Link
            to="/menu"
            className="inline-flex rounded-full border border-cream bg-cream/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-maroon-deep transition hover:bg-cream"
          >
            Explore Categories
          </Link>
        </div>

        <blockquote className="mx-auto mt-10 max-w-2xl rounded-3xl border border-cream/70 bg-white/85 p-8 text-left text-sm leading-7 text-maroon-deep shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          “The aroma of mustard crackling in oil, the patience of stirring jaggery for an hour, the joy of sealing a pickle jar in May — that is what we ship in every box.”
        </blockquote>
      </div>
    </section>
  );
}
