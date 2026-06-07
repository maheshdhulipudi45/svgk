import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products } from "@/data/catalog";
import { SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["popular", "low", "high", "rating"]).optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop All — SGK Fancy Store" },
      {
        name: "description",
        content: "Browse premium tailoring, embroidery and designer materials.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q, sort = "popular" } = Route.useSearch();
  const navigate = useNavigate();

  const list = useMemo(() => {
    let r = [...products];
    if (category) r = r.filter((p) => p.category === category);
    if (q) {
      const Q = q.toLowerCase();
      r = r.filter(
        (p) => p.name.toLowerCase().includes(Q) || p.description.toLowerCase().includes(Q),
      );
    }
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, q, sort]);

  const activeCat = categories.find((c) => c.id === category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-gradient-luxe text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              {activeCat ? "Category" : "Shop All"}
            </p>
            <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight">
              {activeCat ? activeCat.name : q ? `Results for "${q}"` : "All Premium Materials"}
            </h1>
            <p className="mt-2 text-white/80">{list.length} curated products</p>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[240px_1fr] gap-10">
            <aside className="hidden lg:block sticky top-28 self-start">
              <div className="rounded-2xl bg-card border border-border p-5">
                <div className="flex items-center gap-2 text-sm font-bold mb-4">
                  <SlidersHorizontal size={16} /> Categories
                </div>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() =>
                        navigate({ to: "/products", search: { category: undefined, q, sort } })
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-primary/8 ${!category ? "bg-primary/10 text-primary font-semibold" : ""}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() =>
                          navigate({ to: "/products", search: { category: c.id, q, sort } })
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center hover:bg-primary/8 ${category === c.id ? "bg-primary/10 text-primary font-semibold" : ""}`}
                      >
                        <span>{c.name}</span>
                        <span className="text-[11px] text-muted-foreground">{c.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              <div className="flex items-center justify-between mb-6 gap-3">
                <div className="text-sm text-muted-foreground">Showing {list.length} items</div>
                <select
                  value={sort}
                  onChange={(e) =>
                    navigate({
                      to: "/products",
                      search: {
                        category,
                        q,
                        sort: e.target.value as "popular" | "low" | "high" | "rating",
                      },
                    })
                  }
                  className="h-10 rounded-full bg-card border border-border px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="popular">Sort: Popular</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {list.length === 0 ? (
                <div className="text-center py-24 text-muted-foreground">
                  <p className="text-lg">No products match your filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-7">
                  {list.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
