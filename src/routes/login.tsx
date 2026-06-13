import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useUser } from "@/store/user";
import { toast } from "sonner";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: (s) => loginSearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign In · SGK Fancy Store" },
      {
        name: "description",
        content:
          "Sign in or create your SGK Fancy Store account to track orders, save wishlists and manage your profile.",
      },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Use at least 6 characters").max(72),
  name: z.string().trim().max(80).optional(),
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect, mode: searchMode } = Route.useSearch();
  const login = useUser((s) => s.login);
  const register = useUser((s) => s.register);
  const [mode, setMode] = useState<"signin" | "signup">(searchMode || "signin");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    if (mode === "signup") {
      register(parsed.data.email, parsed.data.name);
      toast.success("Account created successfully! Welcome to SGK Fancy Store.");
    } else {
      login(parsed.data.email, parsed.data.name);
      toast.success("Signed in successfully! Welcome back.");
    }

    navigate({ to: "/" });
  };


  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-dark">
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=80"
          alt="Luxury embroidery"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-dark/70 to-dark" />
        <div className="relative z-10 p-12 flex flex-col justify-between text-background">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-secondary" />
            <span className="text-xs uppercase tracking-[0.28em] font-semibold">
              SGK Atelier Access
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              The Couture Materials <br />
              <span className="text-secondary italic">Members Club</span>
            </h1>
            <p className="mt-4 text-background/80 max-w-md text-sm">
              Save your wishlist, track orders, manage your address book and get early access to
              bridal drops.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {mode === "signin" ? "Welcome Back" : "Join SGK"}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {mode === "signin" ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Continue shopping where you left off."
              : "It only takes a minute to start your fancy edit."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field icon={<User size={16} />} label="Full Name">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Priya Sharma"
                  maxLength={80}
                  className="input-luxe"
                />
              </Field>
            )}
            <Field icon={<Mail size={16} />} label="Email">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                maxLength={255}
                className="input-luxe"
              />
            </Field>
            <Field icon={<Lock size={16} />} label="Password">
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                minLength={6}
                maxLength={72}
                className="input-luxe"
              />
            </Field>

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 shadow-luxe"
            >
              {mode === "signin" ? "Sign In" : "Create Account"} <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            {mode === "signin" ? "New to SGK?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              ← Back to store
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <div className="[&>input]:w-full [&>input]:h-12 [&>input]:rounded-xl [&>input]:pl-11 [&>input]:pr-4 [&>input]:text-sm [&>input]:bg-muted/60 [&>input]:border [&>input]:border-transparent [&>input]:outline-none [&>input]:transition focus-within:[&>input]:bg-card focus-within:[&>input]:border-primary/30 focus-within:[&>input]:ring-2 focus-within:[&>input]:ring-primary/15">
          {children}
        </div>
      </div>
    </label>
  );
}
