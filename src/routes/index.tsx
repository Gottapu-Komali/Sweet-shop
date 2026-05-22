import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { catalog } from '../lib/products'

const featuredIds = ['boondi-laddu', 'mysore-pak', 'kaju-katli', 'murukku']
const featuredProducts = catalog.filter((product) => featuredIds.includes(product.id))

export default function Home() {
  return (
    <main className="bg-ivory text-brown">
      <section className="container-max mx-auto py-20">
        <div className="rounded-[2rem] border border-border bg-white p-10 shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">Authentic Andhra Home Foods</p>
          <h1 className="mt-4 text-4xl font-display leading-tight text-brown sm:text-5xl md:text-6xl">
            Authentic Andhra Home Foods,
            <span className="block text-saffron">Made in Small Batches</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-muted">
            Hand-rolled sweets, slow-fried savories, and heirloom Andhra pickles crafted with pure ghee, cold-pressed oils, and grandmother-grade patience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-brown px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-cocoa"
            >
              Shop Bestsellers
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-full border border-brown bg-cream px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brown transition hover:bg-sand"
            >
              Explore Categories
            </Link>
          </div>

          <blockquote className="mt-10 rounded-[2rem] border border-border bg-surface p-8 text-lg leading-8 text-text-muted shadow-soft">
            “The aroma of mustard crackling in oil, the patience of stirring jaggery for an hour, the joy of sealing a pickle jar in May — that is what we ship in every box.”
          </blockquote>
        </div>
      </section>

      <section className="container-max mx-auto py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-saffron">Bestsellers</p>
            <h2 className="mt-3 text-4xl font-display text-brown">Telugu memories in every bite.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-text-muted">
            Discover temple sweets, festive savories, summer pickles, and daily podis crafted for your home table.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-max mx-auto py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-saffron">Our Story</p>
            <h2 className="mt-4 text-4xl font-display text-brown">Handcrafted in small batches with traditional ingredients and time-tested methods.</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-text-muted">
              Each product brings a nostalgic Telugu household flavor to your table.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.35em] text-saffron">Pure ghee, cold-pressed oils, and authentic regional recipes.</p>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft">
            <h3 className="text-3xl font-display text-brown">Our Story</h3>
            <p className="mt-4 text-sm leading-7 text-text-muted">
              Handcrafted in small batches with traditional ingredients and time-tested methods, each product brings a nostalgic Telugu household flavor to your table.
            </p>
            <p className="mt-4 text-sm leading-7 text-brown">
              Pure ghee, cold-pressed oils, and authentic regional recipes.
            </p>
          </div>
        </div>
      </section>

      <section className="container-max mx-auto py-20">
        <div className="rounded-[2rem] border border-border bg-maroon-deep/5 p-10 text-center shadow-soft">
          <p className="text-xs uppercase tracking-[0.35em] text-saffron">Bring Home the Taste of Tradition</p>
          <h2 className="mt-4 text-4xl font-display text-brown">Order authentic homemade sweets and snacks made the way families have always made them.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-muted">
            Order authentic homemade sweets and snacks made the way families have always made them.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-brown px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-cocoa"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="container-max mx-auto pb-20">
        <div className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-soft">
          <p className="text-sm text-text-muted">Seethaiah Home Foods — Crafted in small batches with love, patience, and tradition.</p>
        </div>
      </section>
    </main>
  )
}
