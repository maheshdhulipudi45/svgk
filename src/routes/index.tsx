import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { TrustStrip } from "@/components/home/TrustStrip";
import { DealOfDay } from "@/components/home/DealOfDay";
import { Machines } from "@/components/home/Machines";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/catalog";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SGK Fancy Store — Premium Embroidery, Zari & Tailoring Materials" },
      {
        name: "description",
        content:
          "Shop premium zari borders, maggam threads, designer blouse pieces, lace, fabrics and embroidery machines. Pan-India delivery, secure UPI checkout, WhatsApp support.",
      },
      { property: "og:title", content: "SGK Fancy Store — Premium Embroidery Marketplace" },
      {
        property: "og:description",
        content: "Curated luxury embroidery and tailoring materials for India's finest boutiques.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Categories />

        {/* Trending products */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Trending Now
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                  Most-Loved by Designers
                </h2>
              </div>
              <Link to="/products" className="text-sm font-semibold text-primary hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
              {products.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        <DealOfDay />

        {/* New arrivals */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  Fresh from the Loom
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">New Arrivals</h2>
              </div>
              <Link to="/products" className="text-sm font-semibold text-primary hover:underline">
                See More →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
              {products.slice(4, 8).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        <Machines />
        <Testimonials />

        {/* Newsletter */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-gradient-luxe text-white p-10 sm:p-16 overflow-hidden text-center shadow-luxe"
            >
              <div className="absolute -top-20 -right-20 size-72 rounded-full bg-secondary/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-white/20 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Join the Atelier List
                </h2>
                <p className="text-white/85 mb-7 max-w-xl mx-auto">
                  Get early access to new arrivals, designer drops and bridal-season exclusives.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="flex-1 h-12 rounded-full px-5 text-sm text-foreground bg-white outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button className="h-12 px-7 rounded-full bg-dark text-white font-bold text-sm hover:bg-secondary hover:text-dark transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
