export type Category = {
  id: string;
  name: string;
  image: string;
  count: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Limited" | "Trending";
  stock: "in" | "low" | "out";
  description: string;
  specs?: { label: string; value: string }[];
};

export type Machine = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  specs: string[];
  priceRange: string;
};

const img = (q: string, w = 800) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    id: "zari",
    name: "Zari & Borders",
    image: img("photo-1610030469983-98e550d6193c"),
    count: 124,
  },
  {
    id: "embroidery",
    name: "Embroidery Threads",
    image: img("photo-1606216794074-735e91aa2c92"),
    count: 89,
  },
  { id: "maggam", name: "Maggam Work", image: img("photo-1583391733956-3750e0ff4e8b"), count: 67 },
  {
    id: "blouse",
    name: "Blouse Pieces",
    image: img("photo-1610189025157-7d76a8dc4c2c"),
    count: 152,
  },
  {
    id: "fancy",
    name: "Fancy Items & Gifts",
    image: img("photo-1611591437281-460bfbe1220a"),
    count: 186,
  },
  { id: "lace", name: "Lace & Trims", image: img("photo-1620799140408-edc6dcb6d633"), count: 98 },
  {
    id: "tazzles",
    name: "Tazzles & Latkans",
    image: img("photo-1610375461246-83df859d849d"),
    count: 54,
  },
  {
    id: "accessories",
    name: "Bridal Accessories",
    image: img("photo-1611591437281-460bfbe1220a"),
    count: 142,
  },
  {
    id: "machines",
    name: "Embroidery Machines",
    image: img("photo-1581092580497-e0d23cbdf1dc"),
    count: 12,
  },
  {
    id: "matching",
    name: "Matching Materials",
    image: img("photo-1582738411706-bfc8e691d1c2"),
    count: 88,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Banarasi Gold Zari Border — 9m",
    category: "zari",
    image: img("photo-1610030469983-98e550d6193c", 900),
    images: [
      img("photo-1610030469983-98e550d6193c", 1200),
      img("photo-1591375607199-9b4d8e2c1e7c", 1200),
      img("photo-1606216794074-735e91aa2c92", 1200),
    ],
    price: 1499,
    originalPrice: 2200,
    rating: 4.8,
    reviews: 128,
    badge: "Bestseller",
    stock: "in",
    description:
      "Hand-loomed Banarasi gold zari border with intricate floral motifs. Perfect for bridal lehengas, dupattas, and heavy blouse work.",
    specs: [
      { label: "Length", value: "9 metres" },
      { label: "Width", value: "2.5 inches" },
      { label: "Material", value: "Pure Zari with Silk Base" },
      { label: "Origin", value: "Banaras, UP" },
    ],
  },
  {
    id: "p2",
    name: "Premium Maggam Thread Set — 24 Colors",
    category: "maggam",
    image: img("photo-1606216794074-735e91aa2c92", 900),
    price: 850,
    originalPrice: 1100,
    rating: 4.6,
    reviews: 245,
    badge: "Trending",
    stock: "in",
    description:
      "Vibrant 24-color premium maggam embroidery thread set with rich saturation and no-bleed dye.",
    specs: [
      { label: "Colors", value: "24 shades" },
      { label: "Length", value: "100m per spool" },
      { label: "Type", value: "100% Mercerised Cotton" },
    ],
  },
  {
    id: "p3",
    name: "Heavy Zardosi Blouse Piece — Wine",
    category: "blouse",
    image: img("photo-1610189025157-7d76a8dc4c2c", 900),
    price: 2450,
    originalPrice: 3500,
    rating: 4.9,
    reviews: 89,
    badge: "Bestseller",
    stock: "low",
    description:
      "Deep wine velvet blouse piece with intricate hand zardosi work on sleeves and neckline.",
    specs: [
      { label: "Length", value: "1 metre" },
      { label: "Fabric", value: "Premium Velvet" },
      { label: "Work", value: "Hand Zardosi" },
    ],
  },
  {
    id: "p4",
    name: "Bridal Gota Patti Latkan Pair",
    category: "tazzles",
    image: img("photo-1610375461246-83df859d849d", 900),
    price: 420,
    originalPrice: 650,
    rating: 4.7,
    reviews: 312,
    badge: "New",
    stock: "in",
    description:
      "Antique gold gota patti latkans with pearl drops — the perfect finishing touch for bridal blouses.",
    specs: [
      { label: "Quantity", value: "Pair (2 pcs)" },
      { label: "Length", value: "6 inches" },
    ],
  },
  {
    id: "p5",
    name: "Pearl Encrusted Designer Lace — 9m",
    category: "lace",
    image: img("photo-1620799140408-edc6dcb6d633", 900),
    price: 2499,
    originalPrice: 3200,
    rating: 4.8,
    reviews: 67,
    badge: "Limited",
    stock: "low",
    description: "Wide bridal lace border with hand-stitched pearls and crystals on tulle base.",
  },
  {
    id: "p6",
    name: "Kundan Bridal Hair Brooch Set",
    category: "accessories",
    image: img("photo-1611591437281-460bfbe1220a", 900),
    price: 1450,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 156,
    badge: "Bestseller",
    stock: "in",
    description:
      "Hand-set kundan and pearl bridal hair brooches — the perfect fancy accent for juda, veni and bridal hairstyles.",
  },
  {
    id: "p7",
    name: "Designer Bangles Box — Set of 24",
    category: "accessories",
    image: img("photo-1611591437281-460bfbe1220a", 900),
    price: 850,
    originalPrice: 1199,
    rating: 5.0,
    reviews: 421,
    badge: "Trending",
    stock: "in",
    description:
      "Hand-painted lac bangles with stone and meenakari work — full bridal box of 24 pieces in coordinated shades.",
  },
  {
    id: "p8",
    name: "Antique Gold Matching Thread Bundle",
    category: "matching",
    image: img("photo-1582738411706-bfc8e691d1c2", 900),
    price: 380,
    originalPrice: 520,
    rating: 4.5,
    reviews: 198,
    stock: "in",
    description:
      "Pre-curated 12-shade matching thread bundle — designed for blouse, kurti and dupatta color coordination.",
  },
  {
    id: "p9",
    name: "Velvet Kumkum & Sindoor Dabbi — Pair",
    category: "fancy",
    image: img("photo-1610375461246-83df859d849d", 900),
    price: 320,
    originalPrice: 499,
    rating: 4.7,
    reviews: 142,
    badge: "New",
    stock: "in",
    description:
      "Premium velvet-finish kumkum and sindoor boxes with antique brass mirror lid — a luxe return-gift favourite.",
  },
  {
    id: "p10",
    name: "Crystal Bindi Stone Sheet — 200 pcs",
    category: "fancy",
    image: img("photo-1606216794074-735e91aa2c92", 900),
    price: 240,
    originalPrice: 399,
    rating: 4.6,
    reviews: 233,
    stock: "in",
    description:
      "Self-stick crystal bindis in mixed sizes and shapes — perfect for bridal mehndi, festive looks and dance costumes.",
  },
  {
    id: "p11",
    name: "Artificial Jewellery Storage Box — 3 Tier",
    category: "fancy",
    image: img("photo-1611591437281-460bfbe1220a", 900),
    price: 1250,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 96,
    badge: "Limited",
    stock: "low",
    description:
      "Three-tier velvet-lined jewellery organiser with brass clasps — keeps necklaces, jhumkas and bangles bridal-ready.",
  },
  {
    id: "p12",
    name: "Bridal Return Gift Hamper — Set of 10",
    category: "fancy",
    image: img("photo-1610375461246-83df859d849d", 900),
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 78,
    badge: "Bestseller",
    stock: "in",
    description:
      "Curated hamper of 10 fancy return gifts — mini kumkum dabbis, hair clips, potli bags and decorative diyas.",
  },
];

export const machines: Machine[] = [
  {
    id: "m1",
    name: "SGK-900 Pro Computerized Embroidery Machine",
    image: img("photo-1581092580497-e0d23cbdf1dc", 1200),
    tagline: "Industrial precision for artisanal output",
    specs: [
      "1200 stitches per minute with active cooling",
      "Auto thread cutter & Maggam-specific hoop",
      "Touchscreen design interface with WiFi sync",
      "Multi-needle: 9 heads · 15 colors",
    ],
    priceRange: "₹1,85,000 – ₹2,45,000",
  },
  {
    id: "m2",
    name: "SGK-450 Studio Series",
    image: img("photo-1581094271901-8022df4466f9", 1200),
    tagline: "Compact studio companion for boutique designers",
    specs: [
      "850 SPM, single-head, perfect for blouse work",
      "Built-in 200 designs library",
      "Auto tension calibration",
    ],
    priceRange: "₹95,000 – ₹1,25,000",
  },
];

export const testimonials = [
  {
    name: "Priya Reddy",
    role: "Bridal Designer, Hyderabad",
    quote:
      "SGK is the only place I trust for authentic zari borders. The quality is unmatched and delivery is always on time.",
    rating: 5,
    image: img("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "Anjali Verma",
    role: "Boutique Owner, Mumbai",
    quote:
      "My go-to for maggam work supplies. The 24-color thread set has been a game changer for my team.",
    rating: 5,
    image: img("photo-1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Lakshmi Iyer",
    role: "Couture Studio, Chennai",
    quote:
      "From silk fabrics to embroidery machines — everything ships beautifully packed. Truly premium.",
    rating: 5,
    image: img("photo-1534528741775-53994a69daeb", 200),
  },
];

export const heroSlides = [
  {
    eyebrow: "The Atelier Collection 2026",
    title: "Couture Materials for",
    highlight: "Master Designers",
    sub: "Hand-curated zari, silk threads, fancy accessories and maggam essentials sourced from the looms of Banaras and the bylanes of Surat.",
    image: img("photo-1583391733956-3750e0ff4e8b", 1920),
  },
  {
    eyebrow: "Bridal Edit · Limited Run",
    title: "The Bridal",
    highlight: "Embroidery Vault",
    sub: "Hand-stitched pearls, antique gota patti and heavy zardosi blouse pieces — ready for your most-special pieces.",
    image: img("photo-1610189025157-7d76a8dc4c2c", 1920),
  },
  {
    eyebrow: "Industrial Excellence",
    title: "Computerised",
    highlight: "Embroidery Machines",
    sub: "SGK-900 Pro multi-head machines with on-call setup and full training included. WhatsApp for pricing.",
    image: img("photo-1581092580497-e0d23cbdf1dc", 1920),
  },
];

export function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function discountPct(price: number, original: number) {
  return Math.round(((original - price) / original) * 100);
}
