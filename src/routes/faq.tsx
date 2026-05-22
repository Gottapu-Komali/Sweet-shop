const faqs = [
  {
    question: 'How quickly will my order arrive?',
    answer: 'We prepare fresh batches daily. Delivery typically takes 2-4 business days depending on your location.'
  },
  {
    question: 'Do you offer gift packaging?',
    answer: 'Yes. Select gift-ready products and we will pack them in premium presentation boxes with care.'
  },
  {
    question: 'How should I store pickles and sweets?',
    answer: 'Store sweets at room temperature in an airtight container. Refrigerate pickles after opening for best shelf life.'
  },
  {
    question: 'Can I place a bulk order for festivals?',
    answer: 'Absolutely. Contact us via the Contact page for bulk festival and corporate order support.'
  }
];

export default function FAQ() {
  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-12 rounded-[2rem] border border-border bg-white p-10 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">FAQ</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Frequently asked questions</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">Everything you need to know about our Andhra home-food products, shipping, and gifting.</p>
      </div>

      <div className="grid gap-6">
        {faqs.map((item) => (
          <details key={item.question} className="rounded-[2rem] border border-border bg-surface p-6 shadow-soft">
            <summary className="cursor-pointer text-lg font-semibold text-brown">{item.question}</summary>
            <p className="mt-4 text-sm leading-7 text-text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
