import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/store/cart";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — SGK Fancy Store" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useCart((s) => s.wishlist);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground mb-10">
          {items.length} saved {items.length === 1 ? "piece" : "pieces"}
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-card border border-border">
            <div className="size-20 mx-auto rounded-full bg-accent/10 grid place-items-center mb-4">
              <Heart className="text-accent" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Tap the heart on any product to save it here
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-luxe text-white px-6 py-3 rounded-full font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
