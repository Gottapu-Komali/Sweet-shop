/* src/components/CartBadge.tsx */
import { useCartLines } from "../lib/cart";

export function CartBadge() {
  const { count } = useCartLines();
  return (
    <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-medium text-maroon">
      {count}
    </span>
  );
}
