import { motion } from "framer-motion";
import { Check, MessageCircle, Cpu } from "lucide-react";
import { machines } from "@/data/catalog";
import { quickInquiryUrl } from "@/lib/store-config";

export function Machines() {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute -top-32 left-1/4 size-[400px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 size-[500px] rounded-full bg-secondary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-secondary mb-3">
            <Cpu size={14} /> Industrial Series
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Computerised Embroidery <span className="text-gradient-luxe">Machines</span>
          </h2>
          <p className="text-white/65 text-base">
            Production-grade multi-needle embroidery machines with on-site setup, full training, and
            lifetime parts support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {machines.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-secondary/50 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-secondary text-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Pro Series
                </span>
              </div>
              <div className="p-8">
                <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                  {m.tagline}
                </div>
                <h3 className="text-2xl font-bold mb-5 leading-tight">{m.name}</h3>
                <ul className="space-y-2.5 mb-7">
                  {m.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Check size={16} className="text-success mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/50">
                      Starting Range
                    </div>
                    <div className="text-xl font-bold text-gradient-luxe">{m.priceRange}</div>
                  </div>
                  <a
                    href={quickInquiryUrl(m.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-white text-sm font-bold rounded-full px-5 py-3 transition-colors"
                  >
                    <MessageCircle size={15} /> WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
