import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappUrl } from "@/lib/store-config";
import { useState } from "react";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 150 }}
      className="fixed bottom-6 right-6 z-[60]"
    >
      <div className="relative flex items-center justify-end">
        {/* Tooltip for desktop */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 mr-2 hidden md:block whitespace-nowrap bg-background/80 backdrop-blur-md border border-border text-foreground px-4 py-2 rounded-xl text-xs font-bold shadow-luxe"
            >
              Chat With Us
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.a
          href={whatsappUrl("Hi SGK Fancy Store, I need help with my order")}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center size-14 md:size-15 rounded-full bg-emerald-500/90 text-white backdrop-blur-md border border-emerald-400/30 shadow-[0_12px_40px_rgba(16,185,129,0.4)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.6)] hover:bg-emerald-500 hover:scale-108 active:scale-95 transition-all duration-300 group"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping group-hover:animate-none opacity-75" />

          <motion.div
            className="relative z-10"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle size={24} className="stroke-[2.2]" />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}

