import { Link } from "@tanstack/react-router";
import { Heart, Share2, ShoppingBag, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { type Product, discountPct, formatPrice } from "@/data/catalog";
import { useCart } from "@/store/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggleWishlist = useCart((s) => s.toggleWishlist);
  const wished = useCart((s) => s.wishlist.includes(product.id));
  const pct = discountPct(product.price, product.originalPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative"
    >
      <div className="block relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted ring-1 ring-border shadow-card hover:shadow-luxe transition-shadow">
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="absolute inset-0 z-0"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white ${
                product.badge === "Bestseller"
                  ? "bg-secondary text-dark"
                  : product.badge === "New"
                    ? "bg-success"
                    : product.badge === "Limited"
                      ? "bg-accent"
                      : "bg-primary"
              }`}
            >
              {product.badge}
            </span>
          )}
          {pct > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-dark/85 text-white backdrop-blur">
              {pct}% OFF
            </span>
          )}
        </div>

        {/* quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
              toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
            className={`size-9 grid place-items-center rounded-full backdrop-blur transition-colors ${
              wished ? "bg-accent text-white" : "bg-background/90 hover:bg-accent hover:text-white"
            }`}
            aria-label="Wishlist"
          >
            <Heart size={15} fill={wished ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard?.writeText(window.location.origin + "/products/" + product.id);
              toast.success("Product link copied");
            }}
            className="size-9 grid place-items-center rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground backdrop-blur transition-colors"
            aria-label="Share"
          >
            <Share2 size={15} />
          </button>
        </div>

        {/* dual CTA on hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success("Added to cart");
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-background/95 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur text-[11px] font-bold py-2.5 rounded-lg transition-colors"
          >
            <ShoppingBag size={13} /> Add
          </button>
          <Link
            to="/checkout"
            onClick={(e) => {
              e.stopPropagation();
              add(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-luxe text-white text-[11px] font-bold py-2.5 rounded-lg shadow-lg"
          >
            <Zap size={13} /> Buy Now
          </Link>
        </div>
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={11} className="fill-secondary text-secondary" />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
          <span className="ml-auto text-[10px] font-medium uppercase tracking-wider">
            {product.stock === "in" && <span className="text-success">In Stock</span>}
            {product.stock === "low" && <span className="text-secondary">Limited</span>}
            {product.stock === "out" && <span className="text-destructive">Sold Out</span>}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          <Link to="/products/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.originalPrice)}
          </span>
          {pct > 0 && <span className="text-[11px] font-bold text-accent">{pct}% off</span>}
        </div>
      </div>
    </motion.div>
  );
}
