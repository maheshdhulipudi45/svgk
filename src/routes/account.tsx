import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  LogOut,
  Check,
  ShoppingBag,
  Heart,
  Package,
  Truck,
} from "lucide-react";
import { useUser, type UserProfile } from "@/store/user";
import { useCart } from "@/store/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

const accountSearchSchema = z.object({
  tab: z.enum(["profile", "orders"]).fallback("profile"),
});

export const Route = createFileRoute("/account")({
  validateSearch: (s) => accountSearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "My Account · SGK Fancy Store" },
      {
        name: "description",
        content: "Manage your SGK Fancy Store profile, delivery address and WhatsApp contact.",
      },
    ],
  }),
  component: AccountPage,
});

const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a 10-digit phone number")
    .or(z.literal("")),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a 10-digit WhatsApp number"),
  address: z.string().trim().max(200),
  city: z.string().trim().max(60),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a 6-digit pincode")
    .or(z.literal("")),
});

function AccountPage() {
  const navigate = useNavigate();
  const { tab = "profile" } = Route.useSearch();
  const { isAuthed, profile, orders, update, logout } = useUser();
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useCart((s) => s.wishlist.length);

  const [form, setForm] = useState<UserProfile | null>(profile);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthed) {
      navigate({
        to: "/login",
        search: { redirect: window.location.pathname + window.location.search },
      });
    }
  }, [isAuthed, navigate]);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  if (!form) return null;

  const onChange =
    (k: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    update(form);
    toast.success("Profile updated successfully!");
    navigate({ to: "/" });
  };

  const onLogout = () => {
    logout();
    toast.success("Signed out successfully.");
    navigate({ to: "/" });
  };

  const initials = (form.name || form.email).slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Member Area
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">My Account</h1>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-xl font-bold shadow-luxe">
                {initials}
              </div>
              <div className="mt-3 font-bold">{form.name}</div>
              <div className="text-xs text-muted-foreground break-all">{form.email}</div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => navigate({ to: "/account", search: { tab: "profile" } })}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                  tab === "profile"
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "hover:bg-muted"
                }`}
              >
                <User size={16} /> Profile Details
              </button>
              <button
                onClick={() => navigate({ to: "/account", search: { tab: "orders" } })}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition border-t border-border ${
                  tab === "orders"
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "hover:bg-muted"
                }`}
              >
                <ShoppingBag size={16} /> Order History
              </button>
              <Link
                to="/wishlist"
                className="flex items-center justify-between px-4 py-3 hover:bg-muted transition border-t border-border"
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Heart size={16} /> Wishlist
                </span>
                <span className="text-xs text-muted-foreground">{wishCount}</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center justify-between px-4 py-3 hover:bg-muted transition border-t border-border"
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <ShoppingBag size={16} /> Cart
                </span>
                <span className="text-xs text-muted-foreground">{cartCount}</span>
              </Link>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition border-t border-border"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </aside>

          {/* Tab Content */}
          <div className="min-w-0">
            {tab === "orders" ? (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card"
              >
                <h2 className="text-xl font-bold">Order History & Tracking</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your pending boutique orders and view transaction records.
                </p>

                {orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package
                      className="mx-auto text-muted-foreground mb-4 opacity-40 animate-pulse"
                      size={48}
                    />
                    <p className="text-base font-semibold text-muted-foreground">
                      No orders placed yet.
                    </p>
                    <Link
                      to="/products"
                      className="mt-5 inline-flex items-center gap-2 bg-gradient-luxe text-white px-6 py-3 rounded-full text-xs font-semibold hover:opacity-90 transition shadow-luxe"
                    >
                      Start Browsing
                    </Link>
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6 space-y-4 hover:shadow-soft transition-all duration-300"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                              Order ID
                            </span>
                            <div className="font-bold text-sm text-foreground">{o.id}</div>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                              Date Placed
                            </span>
                            <div className="font-semibold text-xs text-foreground mt-0.5">
                              {o.date}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                              UPI Txn ID
                            </span>
                            <div className="font-mono text-xs text-foreground mt-0.5">
                              {o.txnId}
                            </div>
                          </div>
                          <div className="text-right sm:text-left">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                              Status
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 mt-0.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                o.status === "Delivered"
                                  ? "bg-success/15 text-success"
                                  : o.status === "Shipped"
                                    ? "bg-primary/15 text-primary"
                                    : "bg-secondary/15 text-secondary"
                              }`}
                            >
                              <span className="size-1.5 rounded-full bg-current animate-ping" />
                              {o.status}
                            </span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-4 py-2">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                              <img
                                src={it.product.image}
                                alt=""
                                className="size-12 rounded-lg object-cover ring-1 ring-border shadow-sm"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                                  {it.product.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">Qty: {it.qty}</p>
                              </div>
                              <div className="text-sm font-bold text-foreground">
                                {formatPrice(it.product.price * it.qty)}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tracking details */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border text-xs">
                          <div className="flex items-center gap-1.5">
                            <Truck size={14} className="text-primary" />
                            <span className="text-muted-foreground font-medium">
                              Tracking Number:
                            </span>{" "}
                            <span className="font-mono font-bold text-primary">
                              {o.trackingNumber}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground font-medium">Total Paid:</span>{" "}
                            <span className="font-bold text-gradient-luxe">
                              {formatPrice(o.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={onSave}
                className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card"
              >
                <h2 className="text-xl font-bold">Profile Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Update your contact details and delivery address. Your WhatsApp number is used for
                  order updates.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <Field icon={<User size={16} />} label="Full Name">
                    <input
                      className="input-luxe"
                      value={form.name}
                      onChange={onChange("name")}
                      maxLength={80}
                      required
                    />
                  </Field>
                  <Field icon={<Mail size={16} />} label="Email">
                    <input
                      type="email"
                      className="input-luxe"
                      value={form.email}
                      onChange={onChange("email")}
                      maxLength={255}
                      required
                    />
                  </Field>
                  <Field icon={<Phone size={16} />} label="Phone (10 digits)">
                    <input
                      inputMode="numeric"
                      className="input-luxe"
                      value={form.phone}
                      onChange={onChange("phone")}
                      maxLength={10}
                      placeholder="9876543210"
                    />
                  </Field>
                  <Field icon={<MessageCircle size={16} />} label="WhatsApp Number">
                    <input
                      inputMode="numeric"
                      className="input-luxe"
                      value={form.whatsapp}
                      onChange={onChange("whatsapp")}
                      maxLength={10}
                      required
                      placeholder="7658956116"
                    />
                  </Field>
                  <Field icon={<MapPin size={16} />} label="City" className="sm:col-span-1">
                    <input
                      className="input-luxe"
                      value={form.city}
                      onChange={onChange("city")}
                      maxLength={60}
                      placeholder="Hyderabad"
                    />
                  </Field>
                  <Field icon={<MapPin size={16} />} label="Pincode" className="sm:col-span-1">
                    <input
                      inputMode="numeric"
                      className="input-luxe"
                      value={form.pincode}
                      onChange={onChange("pincode")}
                      maxLength={6}
                      placeholder="500001"
                    />
                  </Field>
                  <Field
                    icon={<MapPin size={16} />}
                    label="Delivery Address"
                    className="sm:col-span-2"
                  >
                    <textarea
                      className="input-luxe min-h-24 py-3"
                      value={form.address}
                      onChange={onChange("address")}
                      maxLength={200}
                      placeholder="House no, street, area, landmark"
                    />
                  </Field>
                </div>

                {error && (
                  <div className="mt-6 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-luxe"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Field({
  icon,
  label,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5 relative">
        <span className="absolute left-4 top-4 text-muted-foreground">{icon}</span>
        <div className="[&>input]:w-full [&>input]:h-12 [&>input]:rounded-xl [&>input]:pl-11 [&>input]:pr-4 [&>input]:text-sm [&>input]:bg-muted/60 [&>input]:border [&>input]:border-transparent [&>input]:outline-none [&>input]:transition focus-within:[&>input]:bg-card focus-within:[&>input]:border-primary/30 focus-within:[&>input]:ring-2 focus-within:[&>input]:ring-primary/15 [&>textarea]:w-full [&>textarea]:rounded-xl [&>textarea]:pl-11 [&>textarea]:pr-4 [&>textarea]:text-sm [&>textarea]:bg-muted/60 [&>textarea]:border [&>textarea]:border-transparent [&>textarea]:outline-none focus-within:[&>textarea]:bg-card focus-within:[&>textarea]:border-primary/30 focus-within:[&>textarea]:ring-2 focus-within:[&>textarea]:ring-primary/15">
          {children}
        </div>
      </div>
    </label>
  );
}

