import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <section className="container-max mx-auto py-24 px-4 lg:px-0 text-center">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-white p-12 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">Order confirmed</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Thank you for your order</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">
          Your Andhra home-food selection is being prepared with care. We will update you with shipping details shortly.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/shop" className="inline-flex rounded-full bg-brown px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-cocoa">
            Continue shopping
          </Link>
          <Link to="/" className="inline-flex rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-brown transition hover:bg-sand">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
