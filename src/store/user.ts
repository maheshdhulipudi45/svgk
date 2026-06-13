import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  pincode: string;
  avatar?: string;
};

export type Order = {
  id: string;
  date: string;
  items: any[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  trackingNumber: string;
  txnId: string;
};

type UserState = {
  isAuthed: boolean;
  token: string | null;
  profile: UserProfile | null;
  orders: Order[];
  login: (email: string, name?: string) => void;
  register: (email: string, name?: string) => void;
  logout: () => void;
  update: (patch: Partial<UserProfile>) => void;
  addOrder: (order: Order) => void;
};

const generateMockJWT = (email: string) => {
  try {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }),
    );
    const signature = "mock_signature_sgk";
    return `${header}.${payload}.${signature}`;
  } catch (e) {
    return `mock.jwt.token.${Date.now()}`;
  }
};

const defaultProfile = (email: string, name?: string): UserProfile => ({
  name: name || email.split("@")[0] || "Guest",
  email,
  phone: "",
  whatsapp: "7658956116",
  address: "",
  city: "",
  pincode: "",
});

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthed: false,
      token: null,
      profile: null,
      orders: [],
      login: (email, name) =>
        set(() => ({
          isAuthed: true,
          token: generateMockJWT(email),
          profile: get().profile?.email === email ? get().profile : defaultProfile(email, name),
        })),
      register: (email, name) =>
        set(() => ({
          isAuthed: true,
          token: generateMockJWT(email),
          profile: defaultProfile(email, name),
          orders: [], // clear orders for a brand new register
        })),
      logout: () => set({ isAuthed: false, token: null }),
      update: (patch) =>
        set((s) => ({ profile: s.profile ? { ...s.profile, ...patch } : s.profile })),
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: "sgk-user-v2" },
  ),
);

