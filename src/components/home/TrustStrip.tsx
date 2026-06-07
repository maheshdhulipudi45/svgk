import { motion } from "framer-motion";
import { Truck, ShieldCheck, IndianRupee, Headphones } from "lucide-react";

const items = [
  { icon: Truck, title: "Pan India Shipping", sub: "Free above ₹999 · 2-5 day delivery" },
  { icon: ShieldCheck, title: "100% Authentic", sub: "Verified Banaras & Surat sources" },
  { icon: IndianRupee, title: "Secure UPI", sub: "PhonePe · GPay · Paytm accepted" },
  { icon: Headphones, title: "Boutique Support", sub: "WhatsApp help 9 AM – 9 PM IST" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="size-11 grid place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              <it.icon size={20} />
            </div>
            <div>
              <div className="text-sm font-bold">{it.title}</div>
              <div className="text-[11px] text-muted-foreground">{it.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
