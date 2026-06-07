import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/store-config";

export function FloatingWhatsApp() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      href={whatsappUrl("Hi SGK Fancy Store, I need help with my order")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[60] group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-success/40 animate-ping" />
      <span className="relative flex items-center gap-2 bg-success text-white shadow-luxe rounded-full pl-3 pr-5 py-3 font-semibold text-sm hover:scale-105 active:scale-95 transition-transform">
        <span className="grid size-9 place-items-center rounded-full bg-white/20">
          <MessageCircle size={18} />
        </span>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </span>
    </motion.a>
  );
}
