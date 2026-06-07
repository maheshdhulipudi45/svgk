import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Heart,
  Share2,
  Star,
  ShoppingBag,
  Zap,
  MessageCircle,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ProductCard } from "@/components/products/ProductCard";
import { products, formatPrice, discountPct, type Product } from "@/data/catalog";
import { useCart } from "@/store/cart";
import { quickInquiryUrl } from "@/lib/store-config";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — SGK Fancy Store` : "Product" },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: p?.name ?? "Product" },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:image", content: p?.image ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Product not found</h1>
        <Link to="/products" className="text-primary underline">
          Browse all products
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const toggleWish = useCart((s) => s.toggleWishlist);
  const wished = useCart((s) => s.wishlist.includes(product.id));

  const images = product.images?.length ? product.images : [product.image];
  const pct = discountPct(product.price, product.originalPrice);
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* gallery */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-card group">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {pct > 0 && (
                <span className="absolute top-5 left-5 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {pct}% OFF
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`size-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-primary shadow-card" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* info */}
          <div>
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-5 text-sm">
              <div className="flex items-center gap-1.5 bg-success/15 text-success font-bold px-2.5 py-1 rounded">
                <Star size={12} className="fill-current" /> {product.rating}
              </div>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
              <span className="text-muted-foreground">·</span>
              {product.stock === "in" && (
                <span className="text-success font-semibold">In Stock</span>
              )}
              {product.stock === "low" && (
                <span className="text-secondary font-semibold">Limited Stock</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gradient-luxe">
                {formatPrice(product.price)}
              </span>
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {pct > 0 && <span className="text-sm font-bold text-accent">({pct}% off)</span>}
            </div>
            <p className="text-xs text-muted-foreground mb-7">
              Inclusive of all taxes · Free shipping above ₹999
            </p>

            <p className="text-foreground/80 leading-relaxed mb-7">{product.description}</p>

            {product.specs && (
              <div className="rounded-2xl border border-border bg-card p-5 mb-7">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Specifications
                </h3>
                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                  {product.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="text-muted-foreground text-xs">{s.label}</dt>
                      <dd className="font-semibold">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* qty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold">Quantity:</span>
              <div className="flex items-center bg-card border border-border rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="size-10 grid place-items-center hover:bg-muted rounded-full"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="size-10 grid place-items-center hover:bg-muted rounded-full"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  add(product, qty);
                  toast.success("Added to cart");
                }}
                className="flex items-center justify-center gap-2 h-14 rounded-full bg-dark text-white font-bold hover:bg-primary transition-colors"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <Link
                to="/checkout"
                onClick={() => add(product, qty)}
                className="flex items-center justify-center gap-2 h-14 rounded-full bg-gradient-luxe text-white font-bold shadow-luxe hover:opacity-95"
              >
                <Zap size={18} /> Buy Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-7">
              <a
                href={quickInquiryUrl(product.name)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 h-11 rounded-full bg-success/10 text-success font-semibold text-sm hover:bg-success hover:text-white transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <button
                onClick={() => {
                  toggleWish(product.id);
                  toast.success(wished ? "Removed" : "Wishlisted");
                }}
                className={`flex items-center justify-center gap-2 h-11 rounded-full font-semibold text-sm transition-colors ${wished ? "bg-accent text-white" : "bg-muted hover:bg-accent hover:text-white"}`}
              >
                <Heart size={15} fill={wished ? "currentColor" : "none"} />{" "}
                {wished ? "Saved" : "Wishlist"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("Link copied");
                }}
                className="flex items-center justify-center gap-2 h-11 rounded-full bg-muted hover:bg-foreground/10 font-semibold text-sm"
              >
                <Share2 size={15} /> Share
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: ShieldCheck, label: "Authentic Quality" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map((it) => (
                <div key={it.label} className="rounded-xl bg-muted/50 p-3">
                  <it.icon className="mx-auto mb-1.5 text-primary" size={18} />
                  <div className="font-semibold">{it.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
