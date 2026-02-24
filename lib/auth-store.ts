"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  parentMode: boolean;
  setUser: (user: User | null) => void;
  setParentMode: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      parentMode: false,
      setUser: (user) => set({ user, parentMode: false }),
      setParentMode: (v) => set({ parentMode: v }),
      logout: () => set({ user: null, parentMode: false }),
    }),
    { name: "lms-auth" }
  )
);
