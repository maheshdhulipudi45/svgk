import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/catalog";

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Loved by Designers
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Trusted by India's <span className="text-gradient-luxe">Finest Boutiques</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-3xl bg-card border border-border p-8 shadow-card hover:shadow-luxe transition-shadow"
            >
              <Quote className="absolute top-6 right-6 text-primary/15" size={48} />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed text-sm mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="size-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
