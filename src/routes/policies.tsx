export default function Policies() {
  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-12 rounded-[2rem] border border-border bg-white p-10 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">Policies</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Shipping, returns, and freshness policy</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">We stand behind every order with quality handling and responsive support.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brown">Shipping</h2>
          <p className="mt-4 text-sm leading-7 text-text-muted">Orders ship within 1-2 business days. You will receive tracking details once your package leaves our kitchen.</p>
        </div>
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brown">Returns</h2>
          <p className="mt-4 text-sm leading-7 text-text-muted">If your product arrives damaged or not fresh, contact our support team within 2 days and we will make it right.</p>
        </div>
        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-brown">Freshness</h2>
          <p className="mt-4 text-sm leading-7 text-text-muted">Our products are prepared in small batches to deliver freshness. Store items as recommended on each product page.</p>
        </div>
      </div>
    </section>
  );
}
