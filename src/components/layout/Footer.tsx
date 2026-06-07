import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { STORE_EMAIL, UPI_PHONE, whatsappUrl } from "@/lib/store-config";
import { categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="bg-dark text-background pt-20 pb-10 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold tracking-tight mb-4">
              <span className="text-gradient-luxe">SGK</span>
              <span className="ml-1 text-background/80 font-medium">Fancy Store</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs mb-6">
              India's destination for premium tailoring, embroidery and designer materials — crafted
              for boutique designers and master tailors.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="size-9 grid place-items-center rounded-full bg-background/10 hover:bg-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-background/70 mb-5">
              Shop Categories
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/products"
                    search={{ category: c.id, q: undefined }}
                    className="text-sm text-background/70 hover:text-secondary transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-background/70 mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <Link to="/cart" className="hover:text-secondary">
                  My Cart
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-secondary">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-background/70 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-secondary" /> {UPI_PHONE}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-secondary" /> {STORE_EMAIL}
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-secondary mt-0.5" /> SGK Fancy Store,
                <br />
                Tamil Nadu, India
              </li>
            </ul>
            <a
              href={whatsappUrl("Hi SGK Fancy Store, I'd like to place an order")}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-success/90 hover:bg-success text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-background/50">
          <p>
            © {new Date().getFullYear()} SGK Fancy Store. Crafted with care for India's finest
            boutiques.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background">
              Privacy
            </a>
            <a href="#" className="hover:text-background">
              Terms
            </a>
            <a href="#" className="hover:text-background">
              GST · Refunds
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
