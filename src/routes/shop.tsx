import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { catalog, categories } from '../lib/products';

type FilterState = {
  category: string;
  sort: string;
  query: string;
};

export default function Shop() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initialCategory = params.get('category') ?? '';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    sort: 'bestselling',
    query: '',
  });

  const filteredProducts = useMemo(() => {
    return catalog
      .filter((product) => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.query && !product.name.toLowerCase().includes(filters.query.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sort === 'low-high') return a.variants[0].price - b.variants[0].price;
        if (filters.sort === 'high-low') return b.variants[0].price - a.variants[0].price;
        if (filters.sort === 'newest') return a.name.localeCompare(b.name);
        return b.rating - a.rating;
      });
  }, [filters]);

  const handleCategoryChange = (category: string) => {
    setFilters((current) => ({ ...current, category }));
    navigate(`/shop?category=${category}`);
  };

  return (
    <section className="container-max mx-auto py-16 px-4 lg:px-0">
      <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading title="Shop Seethaiah Marketplace" subtitle="Premium Andhra sweets, pickles, and daily specialties" />
        <div className="space-y-2 text-sm text-text-muted">
          <p>Browse curated products by category, price, weight, and popularity.</p>
          <p className="text-sm text-brown">{filteredProducts.length} items available</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-8 rounded-[2rem] border border-border bg-white p-6 shadow-soft">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-slate">Filter</p>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brown">Category</label>
              <select
                value={filters.category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-brown outline-none"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brown">Sort by</label>
              <select
                value={filters.sort}
                onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-brown outline-none"
              >
                <option value="bestselling">Bestselling</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">New arrivals</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brown">Search</label>
              <input
                value={filters.query}
                onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
                placeholder="Search products"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-brown outline-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-slate">Popular categories</p>
            <div className="grid gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${filters.category === category.id ? 'bg-saffron text-ivory' : 'bg-surface text-brown hover:bg-sand'}`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Found treats</p>
              <h3 className="text-2xl font-display text-brown">Browse our premium collection</h3>
            </div>
            <p className="text-sm text-text-muted">Handcrafted products, easy to order, fresh to your door.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
