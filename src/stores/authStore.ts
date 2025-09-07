import { create } from "zustand";
import { persist } from "zustand/middleware";

type TUser = {
  id: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  setUser: (user: TUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) =>
        set(() => ({
          user,
          token,
        })),
      logout: () =>
        set(() => ({
          user: null,
          token: null,
        })),
    }),
    { name: "auth-storage-zanTech" }
  )
);
