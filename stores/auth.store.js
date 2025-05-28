import { create } from "zustand";

const userAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user) => set({ isAuthenticated: !!user, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default userAuthStore;