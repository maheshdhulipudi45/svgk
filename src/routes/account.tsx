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
} from "lucide-react";
import { useUser, type UserProfile } from "@/store/user";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/account")({
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
  const { isAuthed, profile, update, logout } = useUser();
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useCart((s) => s.wishlist.length);

  const [form, setForm] = useState<UserProfile | null>(profile);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthed) navigate({ to: "/login" });
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
    setSaved(false);
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    update(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const onLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const initials = (form.name || form.email).slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
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
            <Link
              to="/wishlist"
              className="flex items-center justify-between px-4 py-3 hover:bg-muted transition"
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

        {/* Form */}
        <form
          onSubmit={onSave}
          className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card"
        >
          <h2 className="text-xl font-bold">Profile Details</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your contact details and delivery address. Your WhatsApp number is used for order
            updates.
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
            <Field icon={<MapPin size={16} />} label="Delivery Address" className="sm:col-span-2">
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

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
            {saved ? (
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <Check size={16} /> Profile updated
              </span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-luxe"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
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
