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

type UserState = {
  isAuthed: boolean;
  profile: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  update: (patch: Partial<UserProfile>) => void;
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
      profile: null,
      login: (email, name) =>
        set(() => ({
          isAuthed: true,
          profile: get().profile?.email === email ? get().profile : defaultProfile(email, name),
        })),
      logout: () => set({ isAuthed: false }),
      update: (patch) =>
        set((s) => ({ profile: s.profile ? { ...s.profile, ...patch } : s.profile })),
    }),
    { name: "sgk-user-v1" },
  ),
);
