export default function Contact() {
  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_0.5fr]">
        <div className="rounded-[2rem] border border-border bg-white p-10 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-slate">Contact</p>
          <h1 className="mt-4 text-4xl font-display text-brown">Get in touch with Seethaiah Home Foods</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted">
            Have a question about an order, want gift recommendations, or need help with a recipe? We are here to make your home-food experience effortless.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-surface p-6">
              <p className="text-sm font-semibold text-brown">Customer care</p>
              <p className="mt-3 text-sm text-text-muted">help@seethaiahhomefoods.com</p>
              <p className="mt-2 text-sm text-text-muted">+91 98765 43210</p>
            </div>
            <div className="rounded-3xl bg-surface p-6">
              <p className="text-sm font-semibold text-brown">Delivery support</p>
              <p className="mt-3 text-sm text-text-muted">track@seethaiahhomefoods.com</p>
              <p className="mt-2 text-sm text-text-muted">Available 9am–7pm IST</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-10 shadow-soft">
          <p className="text-sm font-semibold text-brown">Send us a message</p>
          <form className="mt-8 space-y-5">
            <input type="text" placeholder="Your name" className="w-full rounded-3xl border border-border bg-white px-5 py-4 text-sm text-brown outline-none" />
            <input type="email" placeholder="Email address" className="w-full rounded-3xl border border-border bg-white px-5 py-4 text-sm text-brown outline-none" />
            <textarea rows={5} placeholder="How can we help?" className="w-full rounded-3xl border border-border bg-white px-5 py-4 text-sm text-brown outline-none"></textarea>
            <button type="submit" className="w-full rounded-full bg-brown px-6 py-4 text-sm font-semibold text-ivory transition hover:bg-cocoa">Send message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
