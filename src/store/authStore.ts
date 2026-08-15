// src/store/authStore.ts
// A box outside the component tree — the nav bar, the login page, and
// ProtectedRoute all need to know who is logged in, without prop drilling.
import { create } from "zustand";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userName: null,
  login: (name) => set({ token: `demo-token-${name}`, userName: name }),
  logout: () => set({ token: null, userName: null }),
}));

export default useAuthStore;
