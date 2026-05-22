import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_0.6fr]">
        <div className="space-y-8 rounded-[2rem] border border-border bg-white p-10 shadow-soft">
          <SectionHeading title="About Seethaiah Home Foods" subtitle="A heritage of taste, prepared with care for modern families." />
          <div className="space-y-6 text-sm leading-7 text-text-muted">
            <p>
              Since 1987, Seethaiah Home Foods has curated Andhra comforts for families who cherish warmth, tradition and ingredients that speak of home.
            </p>
            <p>
              Every recipe is handcrafted with premium jaggery, hand-ground spices, cold-pressed oils and seasonal produce. We package each order for freshness, so your favorite sweets and pickles arrive ready for celebration.
            </p>
            <p>
              Our promise is simple: honest food, thoughtful service, and an experience that reconnects you with the flavors of Andhra every time.
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-border bg-saffron/10 p-8 shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate">Why choose us</p>
            <h2 className="mt-4 text-3xl font-display text-brown">Craft, trust, freshness</h2>
          </div>
          <div className="space-y-4 text-sm text-text-muted">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-brown">Small-batch tradition</p>
              <p className="mt-2">Every product is made in small batches to retain texture, aroma and authentic Andhra balance.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-brown">Trackable delivery</p>
              <p className="mt-2">We ship with care and clear tracking so you know exactly when your home-food order will arrive.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="font-semibold text-brown">Thoughtful packaging</p>
              <p className="mt-2">Designed for gifting and family meals, our packaging protects freshness without wasting style.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
