import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function Categories() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Browse by Craft
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Shop Every Category
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-primary border-b-2 border-primary/30 hover:border-primary pb-0.5 self-start sm:self-auto"
          >
            View All Departments →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 sm:gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link
                to="/products"
                search={{ category: c.id, q: undefined }}
                className="group block text-center"
              >
                <div className="relative mx-auto aspect-square rounded-full overflow-hidden ring-2 ring-border ring-offset-4 ring-offset-background transition-all duration-500 group-hover:ring-secondary group-hover:scale-105">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-3 text-[11px] sm:text-xs font-semibold leading-tight group-hover:text-primary transition-colors">
                  {c.name}
                </div>
                <div className="text-[10px] text-muted-foreground">{c.count} items</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
