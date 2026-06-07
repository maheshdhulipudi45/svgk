import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { categories } from "@/data/catalog";
import { useUser } from "@/store/user";

function AccountLink() {
  const isAuthed = useUser((s) => s.isAuthed);
  return (
    <Link
      to={isAuthed ? "/account" : "/login"}
      aria-label={isAuthed ? "My Account" : "Sign in"}
      className="hidden sm:grid p-2.5 rounded-full hover:bg-foreground/5 transition-colors place-items-center"
    >
      <User size={18} />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useCart((s) => s.wishlist.length);
  const isAuthed = useUser((s) => s.isAuthed);
  const { dark, toggle } = useDarkMode();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatsOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: query || undefined, category: undefined } });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-panel shadow-soft" : "bg-background/60 backdrop-blur-md"
      }`}
    >
      {/* top strip */}
      <div className="bg-dark text-background/90 text-[11px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-8 flex items-center justify-between">
          <span className="tracking-[0.18em] uppercase">
            Free shipping across India on orders above ₹999
          </span>
          <div className="hidden sm:flex items-center gap-5 opacity-80">
            <span>WhatsApp: +91 76589 56116</span>
            <span>·</span>
            <span>GST Billing Available</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 lg:h-20 flex items-center gap-4 lg:gap-6">
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 -ml-2 rounded-full hover:bg-foreground/5"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl lg:text-2xl font-bold tracking-tight">
            <span className="text-gradient-luxe">SGK</span>
            <span className="ml-1 text-foreground/80 font-medium">Fancy</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4 relative">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <button
            onMouseEnter={() => setCatsOpen(true)}
            onMouseLeave={() => setCatsOpen(false)}
            onClick={() => setCatsOpen((v) => !v)}
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            Categories <ChevronDown size={14} />
          </button>
          <Link
            to="/products"
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
          >
            Shop All
          </Link>
          <Link
            to="/products"
            search={{ category: "machines", q: undefined }}
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
          >
            Machines
          </Link>

          <AnimatePresence>
            {catsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onMouseEnter={() => setCatsOpen(true)}
                onMouseLeave={() => setCatsOpen(false)}
                className="absolute top-full left-0 mt-1 w-[640px] rounded-2xl glass-panel shadow-luxe p-6 grid grid-cols-2 gap-2"
              >
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/products"
                    search={{ category: c.id, q: undefined }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/8 transition-colors group"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-sm font-semibold group-hover:text-primary">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">{c.count} products</div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-lg ml-auto">
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search zari, maggam, blouse pieces…"
              className="w-full h-11 rounded-full pl-11 pr-4 text-sm bg-muted/80 border border-transparent focus:bg-card focus:border-primary/30 focus:ring-2 focus:ring-primary/15 outline-none transition-all"
            />
          </div>
        </form>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto md:ml-0">
          <button
            aria-label="Toggle dark mode"
            onClick={toggle}
            className="p-2.5 rounded-full hover:bg-foreground/5 transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/wishlist"
            className="relative p-2.5 rounded-full hover:bg-foreground/5 transition-colors"
          >
            <Heart size={18} />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full size-4 grid place-items-center">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-foreground/5 transition-colors"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full size-4 grid place-items-center">
                {cartCount}
              </span>
            )}
          </Link>
          <AccountLink />
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-1">
              <form onSubmit={submitSearch}>
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products…"
                    className="w-full h-11 rounded-full pl-11 pr-4 text-sm bg-muted outline-none"
                  />
                </div>
              </form>
              <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-muted">
                Home
              </Link>
              <Link to="/products" className="block px-3 py-2 rounded-lg hover:bg-muted">
                Shop All
              </Link>
              <Link
                to={isAuthed ? "/account" : "/login"}
                className="block px-3 py-2 rounded-lg hover:bg-muted font-medium text-primary"
              >
                {isAuthed ? "My Account" : "Sign In / Sign Up"}
              </Link>
              <div className="pt-2 pb-1 px-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/products"
                    search={{ category: c.id, q: undefined }}
                    className="px-3 py-2 rounded-lg text-sm hover:bg-muted"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
