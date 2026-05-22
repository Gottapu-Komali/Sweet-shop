import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function CategoryCard({ title, description, href }: Props) {
  return (
    <motion.article whileHover={{ y: -3 }} className="rounded-[2rem] border border-border bg-white shadow-soft p-6">
      <div className="h-48 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-sand via-cream to-ivory p-6">
        <div className="flex h-full items-end">
          <div className="rounded-[1.5rem] bg-white/90 p-4 text-brown shadow-sm">
            <p className="text-sm font-semibold">{title}</p>
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-text-muted">{description}</p>
      <Link to={href} className="mt-6 inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-terracotta">
        Browse {title}
      </Link>
    </motion.article>
  );
}
