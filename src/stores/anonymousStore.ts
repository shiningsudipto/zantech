import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TAnonymous = {
  name: string;
  phone: string;
  address: string;
};

type TAnonymousStore = {
  anonymousUser: null | TAnonymous;
  setUser: (anonymousUser: TAnonymous) => void;
};

export const useAnonymousStore = create<TAnonymousStore>()(
  persist(
    (set) => ({
      anonymousUser: null,
      setUser: (userInfo) =>
        set(() => ({
          anonymousUser: userInfo,
        })),
    }),
    { name: "anonymous-storage-zanTech" }
  )
);
