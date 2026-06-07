import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { heroSlides } from "@/data/catalog";

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[i];

  return (
    <section className="relative h-[88vh] min-h-[600px] overflow-hidden bg-dark text-white">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* decorative glow */}
      <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 size-[400px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary mb-5">
              <Sparkles size={14} /> {slide.eyebrow}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              {slide.title}
              <span className="block text-gradient-luxe">{slide.highlight}</span>
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-xl mb-9 leading-relaxed">
              {slide.sub}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-white text-dark px-7 py-4 rounded-full font-bold text-sm hover:bg-secondary transition-colors"
              >
                Shop Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border border-white/25 backdrop-blur-md bg-white/5 text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* slide indicators */}
        <div className="absolute bottom-10 left-4 sm:left-6 flex items-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-12 bg-secondary" : "w-6 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* stats */}
        <div className="hidden lg:flex absolute bottom-10 right-6 gap-8 text-right">
          {[
            { v: "10K+", l: "Happy Customers" },
            { v: "500+", l: "Premium SKUs" },
            { v: "25+", l: "Years of Craft" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold text-gradient-luxe">{s.v}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
