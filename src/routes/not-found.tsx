import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container-max mx-auto py-24 px-4 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-slate">Page not found</p>
      <h1 className="mt-4 text-5xl font-display text-brown">Lost in the kitchen?</h1>
      <p className="mt-6 max-w-2xl mx-auto text-base leading-8 text-text-muted">
        The page you are looking for is not on our menu yet. Return to the marketplace and continue shopping the authentic Andhra home-food collection.
      </p>
      <Link to="/" className="mt-10 inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-terracotta">
        Back to Home
      </Link>
    </section>
  );
}
