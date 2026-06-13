import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Copy, MessageCircle, Upload, IndianRupee, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/catalog";
import { UPI_ID, UPI_PHONE, whatsappUrl } from "@/lib/store-config";
import { useUser } from "@/store/user";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — SGK Fancy Store" }] }),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.items.reduce((n, i) => n + i.qty * i.product.price, 0));
  const gst = Math.round(subtotal * 0.05);
  const shipping = subtotal >= 999 ? 0 : items.length ? 79 : 0;
  const total = subtotal + gst + shipping;

  const profile = useUser((s) => s.profile);
  const addOrder = useUser((s) => s.addOrder);

  const [form, setForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone || profile?.whatsapp || "",
    email: profile?.email || "",
    address: profile?.address || "",
    city: profile?.city || "",
    pincode: profile?.pincode || "",
    txn: "",
  });
  const [screenshot, setScreenshot] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const copy = (txt: string) => {
    navigator.clipboard?.writeText(txt);
    toast.success("Copied");
  };

  const nextStep = () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.pincode.trim()
    ) {
      toast.error("Please fill all required shipping fields");
      return;
    }
    setStep(2);
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
      return;
    }
    if (!form.name || !form.phone || !form.address || !form.txn) {
      toast.error("Please fill all required fields and add your UPI transaction ID");
      return;
    }
    const orderLines = items
      .map((i) => `• ${i.product.name} × ${i.qty} — ${formatPrice(i.product.price * i.qty)}`)
      .join("\n");
    const msg =
      `*🛍️ New Order — SGK Fancy Store*\n\n` +
      `*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n` +
      `*Address:* ${form.address}, ${form.city} - ${form.pincode}\n\n` +
      `*Items:*\n${orderLines}\n\n` +
      `Subtotal: ${formatPrice(subtotal)}\nGST: ${formatPrice(gst)}\nShipping: ${shipping === 0 ? "FREE" : formatPrice(shipping)}\n*Total: ${formatPrice(total)}*\n\n` +
      `*UPI Txn ID:* ${form.txn}\n\nPlease verify and confirm. Thank you!`;

    // Save order history locally
    addOrder({
      id: `SGK-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items: items.map((i) => ({
        product: i.product,
        qty: i.qty,
      })),
      total,
      status: "Processing",
      trackingNumber: `SGK-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      txnId: form.txn,
    });

    window.open(whatsappUrl(msg), "_blank");
    clear();
    toast.success("Order placed! We've opened WhatsApp to confirm.");
    setTimeout(() => navigate({ to: "/account", search: { tab: "orders" } }), 1500);
  };


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-md mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
          <Link to="/products" className="text-primary underline">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">
          Secure UPI payment · Order confirmed on WhatsApp
        </p>

        {/* steps */}
        <div className="flex items-center gap-3 mb-10 max-w-md">
          {[1, 2].map((n) => (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div
                className={`size-9 grid place-items-center rounded-full font-bold text-sm ${step >= n ? "bg-gradient-luxe text-white" : "bg-muted text-muted-foreground"}`}
              >
                {step > n ? <Check size={16} /> : n}
              </div>
              <span
                className={`text-sm font-semibold ${step >= n ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n === 1 ? "Address" : "Payment"}
              </span>
              {n === 1 && (
                <div className={`flex-1 h-px ${step > 1 ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <form onSubmit={placeOrder} className="space-y-6">
            {/* address */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card border border-border p-6"
            >
              <h2 className="text-lg font-bold mb-5">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Input
                  label="Phone *"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  type="tel"
                />
                <Input
                  label="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  type="email"
                  full
                />
                <Input
                  label="Address *"
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                  full
                />
                <Input
                  label="City *"
                  value={form.city}
                  onChange={(v) => setForm({ ...form, city: v })}
                />
                <Input
                  label="Pincode *"
                  value={form.pincode}
                  onChange={(v) => setForm({ ...form, pincode: v })}
                />
              </div>
              {step === 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-6 px-6 py-3 rounded-full bg-dark text-white font-bold text-sm"
                >
                  Continue to Payment →
                </button>
              )}
            </motion.section>

            {/* payment */}
            {step === 2 && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-card border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee size={18} className="text-primary" />
                  <h2 className="text-lg font-bold">UPI Payment</h2>
                  <span className="ml-auto text-[11px] flex items-center gap-1 text-success font-semibold">
                    <ShieldCheck size={12} /> Secure
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  Pay {formatPrice(total)} via PhonePe, Google Pay, Paytm or any UPI app.
                </p>

                <div className="grid sm:grid-cols-[160px_1fr] gap-5 p-5 rounded-xl bg-muted/40 border border-border mb-5">
                  <div className="aspect-square rounded-xl bg-white p-3 grid place-items-center shadow-card">
                    {/* QR placeholder */}
                    <div className="w-full h-full bg-[conic-gradient(at_50%_50%,_#111_25%,_#fff_25%_50%,_#111_50%_75%,_#fff_75%)] bg-[length:24px_24px] rounded-md grid place-items-center">
                      <div className="bg-white px-2 py-1 rounded text-[9px] font-bold text-dark">
                        UPI · SCAN
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <PayRow label="UPI ID" value={UPI_ID} onCopy={() => copy(UPI_ID)} />
                    <PayRow
                      label="PhonePe / GPay"
                      value={UPI_PHONE}
                      onCopy={() => copy(UPI_PHONE)}
                    />
                    <div className="pt-2 text-xs text-muted-foreground">
                      After payment, enter your transaction ID and (optionally) upload screenshot
                      below.
                    </div>
                  </div>
                </div>

                <Input
                  label="UPI Transaction ID *"
                  value={form.txn}
                  onChange={(v) => setForm({ ...form, txn: v })}
                  full
                />

                <label className="mt-4 flex items-center justify-center gap-2 h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setScreenshot(f.name);
                        toast.success("Screenshot attached");
                      }
                    }}
                  />
                  <Upload size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {screenshot || "Upload payment screenshot (optional)"}
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-6 w-full flex items-center justify-center gap-2 h-14 rounded-full bg-success text-white font-bold shadow-luxe hover:opacity-95"
                >
                  <MessageCircle size={18} /> Confirm Order on WhatsApp
                </button>
              </motion.section>
            )}
          </form>

          {/* summary */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
              <h3 className="text-lg font-bold mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto no-scrollbar pr-1">
                {items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-3 text-sm">
                    <img src={product.image} alt="" className="size-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold line-clamp-1">{product.name}</div>
                      <div className="text-xs text-muted-foreground">Qty {qty}</div>
                    </div>
                    <div className="font-bold">{formatPrice(product.price * qty)}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-success font-bold" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-gradient-luxe">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full h-11 rounded-lg bg-muted/50 border border-border px-4 text-sm outline-none focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

function PayRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="flex items-center justify-between mt-0.5">
        <span className="font-bold text-sm">{value}</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-xs flex items-center gap-1 text-primary hover:underline"
        >
          <Copy size={12} /> Copy
        </button>
      </div>
    </div>
  );
}
