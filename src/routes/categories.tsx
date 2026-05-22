import { categories } from '../lib/products';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate">Categories</p>
        <h1 className="mt-4 text-4xl font-display text-brown">Explore our pantry of tradition.</h1>
        <p className="mt-5 text-sm leading-7 text-text-muted">
          Discover the rituals behind every category: temple sweets, festive savories, summer pickles, and daily podis.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            href={`/shop?category=${category.id}`}
          />
        ))}
      </div>
    </section>
  );
}
