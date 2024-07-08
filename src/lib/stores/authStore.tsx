import { create } from "zustand";

type User = {
  jwt?: string;
  id: number;
  username: string;
  email: string;
};

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
  logout: () => void;
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const useAuth = create<State & Actions>((set) => ({
  user: getUserFromLocalStorage(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    set({ user: null });
  },
}));
