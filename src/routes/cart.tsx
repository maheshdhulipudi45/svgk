import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — SGK Fancy Store" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.items.reduce((n, i) => n + i.qty * i.product.price, 0));

  const gst = Math.round(subtotal * 0.05);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 79;
  const total = subtotal + gst + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Bag</h1>
        <p className="text-muted-foreground mb-10">
          {items.length} {items.length === 1 ? "item" : "items"} curated for you
        </p>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-card border border-border">
            <div className="size-20 mx-auto rounded-full bg-primary/10 grid place-items-center mb-4">
              <ShoppingBag className="text-primary" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Your bag is empty</h2>
            <p className="text-muted-foreground mb-6">Discover our premium collection</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-luxe text-white px-6 py-3 rounded-full font-semibold"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-card"
                >
                  <Link to="/products/$id" params={{ id: product.id }} className="shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-24 sm:size-32 rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to="/products/$id"
                          params={{ id: product.id }}
                          className="text-sm sm:text-base font-semibold hover:text-primary line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="size-9 grid place-items-center rounded-full hover:bg-destructive/10 hover:text-destructive shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div className="flex items-center bg-muted rounded-full">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="size-9 grid place-items-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="size-9 grid place-items-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-bold">
                          {formatPrice(product.price * qty)}
                        </div>
                        <div className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.originalPrice * qty)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
                <h3 className="text-lg font-bold mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <Row l="Subtotal" v={formatPrice(subtotal)} />
                  <Row l="GST (5%)" v={formatPrice(gst)} />
                  <Row
                    l="Shipping"
                    v={shipping === 0 ? "FREE" : formatPrice(shipping)}
                    accent={shipping === 0 ? "success" : undefined}
                  />
                  <div className="border-t border-border my-3" />
                  <Row l="Total" v={formatPrice(total)} bold />
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 flex items-center justify-center gap-2 bg-gradient-luxe text-white font-bold rounded-full h-14 shadow-luxe hover:opacity-95"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
                <p className="text-[11px] text-muted-foreground mt-3 text-center">
                  Secure UPI checkout · PhonePe · GPay · Paytm
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Row({ l, v, bold, accent }: { l: string; v: string; bold?: boolean; accent?: "success" }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-bold text-base" : "text-muted-foreground"}>{l}</span>
      <span
        className={`${bold ? "font-bold text-base text-gradient-luxe" : "font-semibold"} ${accent === "success" ? "text-success" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}
