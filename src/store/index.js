import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      setAuth: (isAuthenticated) => set({isAuthenticated}),
      setToken: (token) => set({token}),
      setUser: (user) => set({ user}),
      logout: () => set({ isAuthenticated: false, token: null, user: null }),
      setUserInfo: (user) => set((state) => ({ ...state, user })),
      login: () => set({ isAuthenticated: true }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
