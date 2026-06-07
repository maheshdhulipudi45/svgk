import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Flame, ArrowRight } from "lucide-react";
import { products } from "@/data/catalog";

function useCountdown(targetHours = 8) {
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const e = Date.now() + targetHours * 60 * 60 * 1000;
    setEnd(e);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [targetHours]);
  if (end === null || now === null) return { h: 0, m: 0, s: 0 };
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3.6e6);
  const m = Math.floor((diff % 3.6e6) / 6e4);
  const s = Math.floor((diff % 6e4) / 1000);
  return { h, m, s };
}

export function DealOfDay() {
  const { h, m, s } = useCountdown(12);
  const deal = products[2]; // wine blouse

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
      <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-3xl sm:text-4xl font-bold tabular-nums text-white">
        {String(v).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-widest text-white/60">{l}</span>
    </div>
  );

  return (
    <section className="relative my-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-dark text-white shadow-luxe">
          <img
            src={deal.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-primary/40" />
          <div className="absolute -bottom-32 -right-32 size-[400px] rounded-full bg-accent/30 blur-[100px]" />

          <div className="relative grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                <Flame size={14} /> Deal of the Day
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
                The Master <br />
                <span className="text-gradient-luxe">Weaver's Bundle</span>
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-md">
                Curated bundle: heavy zardosi blouse piece + matching zari border + pearl latkans.
                Save 50% — for the next few hours only.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 mb-9">
                <Box v={h} l="Hours" />
                <span className="text-3xl text-white/40">:</span>
                <Box v={m} l="Mins" />
                <span className="text-3xl text-white/40">:</span>
                <Box v={s} l="Secs" />
              </div>

              <Link
                to="/products/$id"
                params={{ id: deal.id }}
                className="inline-flex items-center gap-2 bg-secondary text-dark px-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors"
              >
                Claim Your 50% Off
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-float-slow">
                <img src={deal.image} alt={deal.name} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
